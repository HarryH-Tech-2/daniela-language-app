// Runs api/nudge.mjs against an in-memory Redis and a fake push service: subscribe, the
// Shortcuts start/stop calls, the cron tick every 5 minutes, quick app switches, and the
// facts in data/nudges.js. Run: node test/nudge.test.mjs
import webpush from 'web-push';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

process.chdir(path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
const keys = webpush.generateVAPIDKeys();
Object.assign(process.env, {
  VAPID_PUBLIC_KEY: keys.publicKey, VAPID_PRIVATE_KEY: keys.privateKey, CRON_SECRET: 'cron-s3cret',
  APP_PASSCODE: 'pass', KV_REST_API_URL: 'https://redis.test', KV_REST_API_TOKEN: 't'
});

// in-memory Redis behind fetch
const db = new Map();
const hash = (k) => db.get(k) || (db.set(k, new Map()), db.get(k));
globalThis.fetch = async (url, opts) => {
  const [cmd, k, ...a] = JSON.parse(opts.body);
  let result = null;
  if (cmd === 'HGET') result = hash(k).get(a[0]) ?? null;
  else if (cmd === 'HSET') { hash(k).set(a[0], a[1]); result = 1; }
  else if (cmd === 'HDEL') result = hash(k).delete(a[0]) ? 1 : 0;
  else if (cmd === 'HGETALL') result = [...hash(k)].flat();
  else if (cmd === 'GET') result = db.get(k) ?? null;
  else if (cmd === 'INCRBY') { result = (Number(db.get(k)) || 0) + Number(a[0]); db.set(k, String(result)); }
  else if (cmd === 'EXPIRE') result = 1;
  else throw new Error('unexpected redis command ' + cmd);
  return { ok: true, json: async () => ({ result }) };
};

const sent = [];
let gone = false;
webpush.sendNotification = async (sub, payload) => {
  if (gone) { const e = new Error('gone'); e.statusCode = 410; throw e; }
  sent.push(JSON.parse(payload));
};

const { default: nudge } = await import('../api/nudge.mjs');
const { default: tickFn } = await import('../api/nudge-tick.mjs');

let clock = Date.parse('2026-11-11T20:00:00Z');
Date.now = () => clock;
const later = (min) => { clock += min * 60_000; };

function call(method, { query = {}, body, headers = {} } = {}) {
  return new Promise((resolve) => {
    const res = {
      code: 200, headers: {},
      status(c) { this.code = c; return this; },
      setHeader(k, v) { this.headers[k] = v; },
      json(d) { resolve({ code: this.code, data: d }); },
      send(d) { resolve({ code: this.code, data: d }); }
    };
    nudge({ method, query, body, headers }, res);
  });
}
const tick = () => new Promise((resolve) => {
  const res = { code: 200, status(c) { this.code = c; return this; }, setHeader() {}, json(d) { resolve({ code: this.code, data: d }); }, send(d) { resolve({ code: this.code, data: d }); } };
  tickFn({ method: 'GET', query: {}, headers: { authorization: 'Bearer cron-s3cret' } }, res);
});

let failures = 0;
function check(ok, what) { console.log((ok ? 'ok   ' : 'FAIL ') + what); if (!ok) failures++; }

const sub = { endpoint: 'https://web.push.apple.com/abc', keys: { p256dh: 'p', auth: 'a' } };

check((await call('GET', { query: { do: 'key' } })).data.publicKey === keys.publicKey, 'serves the public key');
check((await call('POST', { body: { passcode: 'nope', action: 'subscribe', subscription: sub } })).code === 401, 'wrong passcode is refused');
const { data: { key } } = await call('POST', { body: { passcode: 'pass', action: 'subscribe', subscription: sub, tz: 'America/Bogota' } });
check(/^[a-f0-9]{32}$/.test(key), 'subscribe gives a key');
const again = await call('POST', { body: { passcode: 'pass', action: 'subscribe', subscription: sub, tz: 'America/Bogota', key } });
check(again.data.key === key, 'subscribing again keeps the same key');

check((await call('GET', { query: { do: 'start', key: 'x' } })).code === 400, 'start with a bad key is refused');
check((await call('GET', { query: { do: 'start', key: 'a'.repeat(32) } })).code === 404, 'start with an unknown key says so');
const noAuth = await new Promise((r) => tickFn({ method: 'GET', query: {}, headers: {} }, { status(c) { return { send: () => r(c), json: () => r(c) }; }, setHeader() {} }));
check(noAuth === 401, 'tick without the cron secret is refused');

// open TikTok
check((await call('GET', { query: { do: 'start', key, app: 'TikTok' } })).data === 'ok', 'start from Shortcuts');
later(4); await tick();
check(sent.length === 0, 'nothing in the first 5 minutes');
later(1); await tick();
check(sent.length === 1, 'first reminder at 5 minutes');
const n = sent[0];
check(/^5 min on TikTok · word: “.+”$/.test(n.title), 'title: ' + n.title);
check(n.body.includes(' = ') && n.body.includes('📊') && !n.body.includes('{mins}') && !n.body.includes('..'), 'body has word, Spanish and a fact');
check(n.url.startsWith('./#/nudge/'), 'opens the nudge page: ' + n.url);
later(1); await tick();
check(sent.length === 1, 'not again a minute later');
later(4); await tick();
check(sent.length === 2 && sent[1].title.startsWith('10 min'), 'second reminder at 10 minutes');

// a quick trip to WhatsApp doesn't restart the count
later(1); await call('GET', { query: { do: 'stop', key } });
later(1); await tick();
check(sent.length === 2, 'no reminders while the app is closed');
await call('GET', { query: { do: 'start', key, app: 'TikTok' } });
later(3); await tick();
check(sent.length === 3 && sent[2].title.startsWith('14 min'), 'carries on after a short break: ' + sent[2].title);

// close for good
await call('GET', { query: { do: 'stop', key } });
later(10); await tick(); await tick();
check(sent.length === 3, 'nothing after closing');
const st = await call('POST', { body: { passcode: 'pass', action: 'status', key } });
check(st.data.subscribed && !st.data.live && st.data.today === 14, 'status counts today’s minutes: ' + st.data.today);

// a new session later starts from zero, but today's total carries on
await call('GET', { query: { do: 'start', key, app: 'Instagram' } });
later(5); await tick();
check(sent.length === 4 && sent[3].title.startsWith('5 min on Instagram'), 'new session counts from zero');
check(decodeURIComponent(sent[3].url.split('/').pop()) === '19', 'page gets today’s total (19 min)');

// words don't repeat soon
const words = sent.map((s) => s.title.match(/“(.+)”/)[1]);
check(new Set(words).size === words.length, 'no repeated words');

// test button
await call('POST', { body: { passcode: 'pass', action: 'test', key } });
check(sent.at(-1).title.startsWith('Your word:'), 'test reminder');

// a phone that's gone away is forgotten
gone = true;
later(5); await tick();
check(!(await call('POST', { body: { passcode: 'pass', action: 'status', key } })).data.subscribed, 'expired subscription is removed');

// 3 words a day: notifications at 09:00, 14:00 and 19:00 her time, with today's words
{
  const vmD = await import('node:vm'), fsD = await import('node:fs');
  const c = { window: {} }; vmD.createContext(c);
  for (const f of fsD.readdirSync('data/units')) vmD.runInContext(fsD.readFileSync('data/units/' + f, 'utf8'), c);
  vmD.runInContext(fsD.readFileSync('data/wordlist.js', 'utf8'), c);
  vmD.runInContext(fsD.readFileSync('js/daily-pick.js', 'utf8'), c);
  const all = [];
  c.window.UNITS.forEach((u) => u.vocab.forEach((v) => all.push({ ...v, key: u.id + ':' + v.w })));
  c.window.WORDLIST.forEach((g) => g.items.forEach((v) => all.push({ ...v, group: g.id, key: 'b2:' + v.w })));
  const pick = c.window.DAILY_PICK;
  check(pick(all, '2026-11-13').map((v) => v.w).join() === 'shelves,towards,abnormal', 'the first day has the first 3 new reading words');
  check(pick(all, '2026-11-14').map((v) => v.w).join() === 'width,pamphlet,reached', 'the next day has the next 3');
  check(pick(all.slice().reverse(), '2026-12-20').map((v) => v.key).join() === pick(all, '2026-12-20').map((v) => v.key).join(), 'the order of the word files doesn’t change the words');
  const days = new Set();
  for (let d = 0; d < Math.ceil(all.length / 3); d++) pick(all, new Date(Date.UTC(2026, 10, 13 + d)).toISOString().slice(0, 10)).forEach((v) => days.add(v.key));
  check(days.size === all.length, 'every word gets its day before any repeats (' + all.length + ' words)');

  gone = false;
  const sub2 = { endpoint: 'https://web.push.apple.com/daily', keys: { p256dh: 'p', auth: 'a' } };
  const { data: { key: dk } } = await call('POST', { body: { passcode: 'pass', action: 'subscribe', subscription: sub2, tz: 'America/Bogota' } });
  clock = Date.parse('2026-11-13T20:00:00Z'); // 15:00 in Bogotá
  const before = sent.length;
  const on = await call('POST', { body: { passcode: 'pass', action: 'daily', key: dk, on: true } });
  check(on.data.daily.on && on.data.daily.sent.n === 2, 'turning on at 15:00 skips the 09:00 and 14:00 ones');
  await tick();
  check(sent.length === before, 'nothing straight away');
  clock = Date.parse('2026-11-14T00:00:00Z'); // 19:00 in Bogotá
  await tick(); await tick();
  const last = sent.slice(before).filter((x) => x.tag.startsWith('dale-daily'));
  check(last.length === 1 && last[0].title === 'Word 3 of 3 today: “abnormal”', '19:00: word 3 once: ' + (last[0] || {}).title);
  check(last[0].url === './#/daily' && last[0].body.includes('/æbˈnɔːməl/') && last[0].body.includes('quiz'), 'with its pronunciation and the quiz');
  clock = Date.parse('2026-11-14T14:01:00Z'); // 09:01 the next day
  await tick();
  const next = sent.slice(before).filter((x) => x.tag.startsWith('dale-daily'));
  check(next.length === 2 && next[1].title === 'Word 1 of 3 today: “width”', 'next morning: the new day’s first word');
  clock = Date.parse('2026-11-14T22:30:00Z'); // 17:30: the 14:00 one is too late now
  await tick();
  check(sent.slice(before).filter((x) => x.tag.startsWith('dale-daily')).length === 2, 'a reminder more than 2 hours late is skipped');
  const ds = await call('POST', { body: { passcode: 'pass', action: 'status', key: dk } });
  check(ds.data.daily && ds.data.daily.on && ds.data.daily.times.join() === '09:00,14:00,19:00', 'status shows the daily setting');
  check((await call('POST', { body: { passcode: 'pass', action: 'daily', key: dk, on: true, times: ['08:00', '25:00', '20:00'] } })).data.daily.times.join() === '09:00,14:00,19:00', 'bad times are ignored');
  await call('POST', { body: { passcode: 'pass', action: 'daily', key: dk, on: false } });
  clock = Date.parse('2026-11-15T14:00:00Z');
  await tick();
  check(sent.slice(before).filter((x) => x.tag.startsWith('dale-daily')).length === 2, 'turned off: no more');
  await call('POST', { body: { passcode: 'pass', action: 'unsubscribe', key: dk } });
}

// facts
const vm = await import('node:vm');
const fs = await import('node:fs');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data/nudges.js', 'utf8'), ctx);
const facts = ctx.window.NUDGE_FACTS;
check(facts.length >= 8, facts.length + ' facts');
check(facts.every((f) => f.id && f.short && f.long && f.short.length <= 120), 'every fact has id, short (≤120 chars) and long');
check(new Set(facts.map((f) => f.id)).size === facts.length, 'fact ids are unique');

console.log(failures ? failures + ' failure(s).' : 'Scroll reminders and daily words work.');
process.exit(failures ? 1 : 0);
