// Vercel serverless function: scroll reminders. While she's on TikTok or Instagram, her
// phone gets a notification every 5 minutes with an English word and a fact about scrolling.
//
// How it fits together:
//   1. In the app (Me → Scroll reminders) she turns on notifications. The phone gives us a
//      push subscription, saved here under a random key.
//   2. Two iPhone Shortcuts automations call this function: "TikTok/Instagram is opened"
//      → GET /api/nudge?do=start&key=…&app=TikTok, "is closed" → GET /api/nudge?do=stop&key=….
//   3. Vercel Cron calls /api/nudge-tick every minute (vercel.json), which runs ?do=tick here. Every live session
//      that's due gets a notification, then the next one is 5 minutes later.
//
// From the app (POST, JSON, all need the passcode):
//   { passcode, action: 'subscribe', subscription, tz, key? } -> { key }
//   { passcode, action: 'unsubscribe', key }                  -> { ok }
//   { passcode, action: 'status', key }                       -> { subscribed, live, today }
//   { passcode, action: 'test', key }                         -> { ok }   (one reminder now)
// GET ?do=key -> { publicKey }
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY  push keys: `npx web-push generate-vapid-keys`
//   CRON_SECRET     any long random string; Vercel sends it with each cron call
//   APP_PASSCODE    the same one as the AI partner and cloud save
//   KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_*): set by Upstash, as for cloud save
//   VAPID_SUBJECT   optional contact for the push services (mailto:… or https://…);
//                   the site's own address is used if it's missing
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import webpush from 'web-push';

const SUBS = 'dale:nudge:subs';   // hash: key -> { sub, tz, recent, facts }
const LIVE = 'dale:nudge:live';   // hash: key -> the scrolling session going on now
const DAY = 'dale:nudge:day:';    // + key + ':' + date -> ms scrolled that day (finished sessions)
const EVERY = 5 * 60_000;         // a reminder every 5 minutes
const RESUME = 3 * 60_000;        // back within 3 minutes (a quick WhatsApp) = the same session
const FORGOTTEN = 3 * 3600_000;   // no "closed" after 3 hours: assume we missed it

/* ---------- storage (Upstash Redis REST, as in api/progress.mjs) ---------- */

function redisEnv() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}
async function redis(env, command) {
  const r = await fetch(env.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command)
  });
  if (!r.ok) throw new Error('redis ' + r.status);
  return (await r.json()).result;
}
async function hgetJSON(env, hash, key) {
  const v = await redis(env, ['HGET', hash, key]);
  return v ? JSON.parse(v) : null;
}
const hset = (env, hash, key, value) => redis(env, ['HSET', hash, key, JSON.stringify(value)]);

/* ---------- content: the app's own words and the facts in data/nudges.js ---------- */

let content = null;
function loadContent() {
  if (content) return content;
  const root = process.cwd();
  const ctx = { window: {} };
  vm.createContext(ctx);
  const run = (p) => vm.runInContext(fs.readFileSync(path.join(root, p), 'utf8'), ctx, { filename: p });
  const unitDir = path.join(root, 'data/units');
  fs.readdirSync(unitDir).filter((f) => f.endsWith('.js')).forEach((f) => run('data/units/' + f));
  run('data/wordlist.js');
  run('data/nudges.js');
  // the same keys as APP.wordKey in js/core.js, so the page can find the word again
  const words = [];
  (ctx.window.UNITS || []).forEach((u) => u.vocab.forEach((v) => words.push({ ...v, key: u.id + ':' + v.w })));
  (ctx.window.WORDLIST || []).forEach((g) => g.items.forEach((v) => words.push({ ...v, key: 'b2:' + v.w })));
  content = { words, facts: ctx.window.NUDGE_FACTS || [] };
  return content;
}

// Something she hasn't seen lately: the last 40 words and 5 facts are skipped.
function choose(list, recent, id, keep) {
  const fresh = list.filter((x) => !recent.includes(id(x)));
  const pick = (fresh.length ? fresh : list)[crypto.randomInt((fresh.length ? fresh : list).length)];
  return { pick, recent: [id(pick), ...recent].slice(0, keep) };
}

function dayOf(ms, tz) {
  try { return new Intl.DateTimeFormat('en-CA', { timeZone: tz || 'America/Bogota' }).format(ms); }
  catch { return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(ms); }
}

/* ---------- push ---------- */

function pushReady() {
  const pub = process.env.VAPID_PUBLIC_KEY, priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) return false;
  const site = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || (site ? 'https://' + site : 'mailto:nobody@example.com'), pub, priv);
  return true;
}

// Builds and sends one reminder. Returns false if the phone has gone (subscription removed).
async function remind(env, key, rec, info) {
  const { words, facts } = loadContent();
  const w = choose(words, rec.recent || [], (x) => x.key, 40);
  const f = choose(facts, rec.facts || [], (x) => x.id, 5);
  rec.recent = w.recent; rec.facts = f.recent;
  const word = w.pick, fact = f.pick, mins = info.mins;

  const title = info.test
    ? `Your word: “${word.w}”`
    : `${mins} min ${info.app ? 'on ' + info.app : 'scrolling'} · word: “${word.w}”`;
  const body = `${word.w} = ${word.es}: ${word.def.replace(/[.!?]$/, "")}.\n📊 ${fact.short.replace('{mins}', String(Math.max(mins, 1)))}`;
  const url = './#/nudge/' + [word.key, fact.id, mins, info.today].map(encodeURIComponent).join('/');
  const payload = JSON.stringify({ title, body, url, tag: 'dale-nudge' });

  try {
    await webpush.sendNotification(rec.sub, payload, { TTL: 240, urgency: 'high' });
  } catch (e) {
    if (e.statusCode === 404 || e.statusCode === 410) {
      await redis(env, ['HDEL', SUBS, key]);
      await redis(env, ['HDEL', LIVE, key]);
      return false;
    }
    throw e;
  }
  await hset(env, SUBS, key, rec);
  return true;
}

/* ---------- sessions ---------- */

const dayKey = (key, date) => DAY + key + ':' + date;

async function todayMinutes(env, key, rec, live, now) {
  const done = Number(await redis(env, ['GET', dayKey(key, dayOf(now, rec.tz))])) || 0;
  const going = live && !live.stopped ? now - live.resumed : 0;
  return Math.round((done + going) / 60_000);
}

async function start(env, key, app, now) {
  const live = await hgetJSON(env, LIVE, key);
  if (live && live.stopped && now - live.stopped < RESUME) {
    // back after a quick break: carry on the same session
    live.resumed = now; live.stopped = null; live.app = app || live.app;
    if (live.next < now + 60_000) live.next = now + 60_000;
    return hset(env, LIVE, key, live);
  }
  if (live && !live.stopped) { live.app = app || live.app; return hset(env, LIVE, key, live); }
  return hset(env, LIVE, key, { app, start: now, resumed: now, scrolled: 0, next: now + EVERY, stopped: null });
}

async function stop(env, key, rec, now) {
  const live = await hgetJSON(env, LIVE, key);
  if (!live || live.stopped) return;
  const ms = Math.min(now - live.resumed, FORGOTTEN);
  live.scrolled += ms; live.stopped = now;
  const k = dayKey(key, dayOf(now, rec.tz));
  await redis(env, ['INCRBY', k, ms]);
  await redis(env, ['EXPIRE', k, 3 * 86400]);
  await hset(env, LIVE, key, live);
}

async function tick(env, now) {
  const flat = (await redis(env, ['HGETALL', LIVE])) || [];
  let sent = 0;
  for (let i = 0; i < flat.length; i += 2) {
    const key = flat[i], live = JSON.parse(flat[i + 1]);
    if (live.stopped) {
      if (now - live.stopped >= RESUME) await redis(env, ['HDEL', LIVE, key]);
      continue;
    }
    const rec = await hgetJSON(env, SUBS, key);
    if (!rec) { await redis(env, ['HDEL', LIVE, key]); continue; }
    if (now - live.resumed > FORGOTTEN) { await stop(env, key, rec, now); continue; }
    if (now < live.next) continue;
    const mins = Math.round((live.scrolled + now - live.resumed) / 60_000);
    const today = await todayMinutes(env, key, rec, live, now);
    if (!(await remind(env, key, rec, { app: live.app, mins, today }))) continue;
    while (live.next <= now) live.next += EVERY;
    await hset(env, LIVE, key, live);
    sent++;
  }
  return sent;
}

/* ---------- the handler ---------- */

const KEY_RE = /^[a-f0-9]{32}$/;

function parse(req) {
  if (typeof req.body === 'string') { try { return JSON.parse(req.body || '{}'); } catch { return null; } }
  return req.body || {};
}

export default async function handler(req, res) {
  const env = redisEnv();
  const q = req.query || {};
  const now = Date.now();

  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'no-store');
    if (q.do === 'key') {
      if (!process.env.VAPID_PUBLIC_KEY) return res.status(503).json({ error: 'not configured' });
      return res.status(200).json({ publicKey: process.env.VAPID_PUBLIC_KEY });
    }
    if (!env || !pushReady()) return res.status(503).send('Scroll reminders are not set up on the server yet.');

    if (q.do === 'tick') {
      if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).send('no');
      try { return res.status(200).json({ sent: await tick(env, now) }); }
      catch (e) { return res.status(502).json({ error: String(e.message || e) }); }
    }

    // from the Shortcuts automations
    if (q.do === 'start' || q.do === 'stop') {
      const key = String(q.key || '');
      if (!KEY_RE.test(key)) return res.status(400).send('Missing or wrong key. Copy the link again from the app.');
      try {
        const rec = await hgetJSON(env, SUBS, key);
        if (!rec) return res.status(404).send('Reminders are off for this key. Turn them on again in the app.');
        if (q.do === 'start') await start(env, key, String(q.app || '').replace(/[^\p{L}\p{N} ]/gu, '').slice(0, 20), now);
        else await stop(env, key, rec, now);
        return res.status(200).send('ok');
      } catch { return res.status(502).send('storage failed'); }
    }
    return res.status(400).send('unknown');
  }

  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ error: 'GET or POST' }); }
  const body = parse(req);
  if (!body) return res.status(400).json({ error: 'bad json' });
  if (!process.env.APP_PASSCODE || !env || !pushReady()) return res.status(503).json({ error: 'not configured' });
  if (body.passcode !== process.env.APP_PASSCODE) return res.status(401).json({ error: 'passcode' });

  try {
    if (body.action === 'subscribe') {
      const sub = body.subscription;
      if (!sub || typeof sub.endpoint !== 'string' || !/^https:\/\//.test(sub.endpoint) || !sub.keys) return res.status(400).json({ error: 'bad subscription' });
      // turning it on again on the same phone keeps the key, so her Shortcuts still work
      const key = KEY_RE.test(body.key || '') ? body.key : crypto.randomBytes(16).toString('hex');
      const old = (await hgetJSON(env, SUBS, key)) || {};
      const tz = typeof body.tz === 'string' ? body.tz.slice(0, 60) : 'America/Bogota';
      await hset(env, SUBS, key, { ...old, sub: { endpoint: sub.endpoint, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth } }, tz, created: old.created || now });
      return res.status(200).json({ key });
    }

    const key = String(body.key || '');
    if (!KEY_RE.test(key)) return res.status(400).json({ error: 'key' });

    if (body.action === 'unsubscribe') {
      await redis(env, ['HDEL', SUBS, key]);
      await redis(env, ['HDEL', LIVE, key]);
      return res.status(200).json({ ok: true });
    }
    const rec = await hgetJSON(env, SUBS, key);
    if (body.action === 'status') {
      if (!rec) return res.status(200).json({ subscribed: false });
      const live = await hgetJSON(env, LIVE, key);
      return res.status(200).json({ subscribed: true, live: !!(live && !live.stopped), app: live && live.app, today: await todayMinutes(env, key, rec, live, now) });
    }
    if (body.action === 'test') {
      if (!rec) return res.status(404).json({ error: 'not subscribed' });
      const ok = await remind(env, key, rec, { test: true, app: '', mins: 0, today: await todayMinutes(env, key, rec, null, now) });
      return ok ? res.status(200).json({ ok: true }) : res.status(410).json({ error: 'gone' });
    }
    return res.status(400).json({ error: 'unknown action' });
  } catch (e) {
    return res.status(502).json({ error: 'failed', detail: String(e.message || e).slice(0, 200) });
  }
}
