// Vercel serverless function: keeps a copy of her progress in the cloud.
// POST /api/progress  { passcode, action: 'load' }                  -> { data, saved } (data null if none yet)
//                     { passcode, action: 'save', data, force }     -> { saved }
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   APP_PASSCODE   required here, so nobody else can read or overwrite her progress
//   KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
//                  set for you when you add Upstash Redis from Vercel → Storage
const KEY = 'dale:progress';
const MAX = 900_000; // Upstash takes up to 1 MB per request

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

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}); }
  catch { return res.status(400).json({ error: 'bad json' }); }

  const env = redisEnv();
  if (!process.env.APP_PASSCODE || !env) return res.status(503).json({ error: 'not configured' });
  if (body.passcode !== process.env.APP_PASSCODE) return res.status(401).json({ error: 'passcode' });

  try {
    const stored = await redis(env, ['GET', KEY]);
    const current = stored ? JSON.parse(stored) : null;

    if (body.action === 'load') {
      return res.status(200).json(current ? { data: current.data, saved: current.saved } : { data: null, saved: null });
    }

    if (body.action === 'save') {
      const data = body.data;
      if (!data || typeof data !== 'object' || typeof data.xp !== 'number') return res.status(400).json({ error: 'bad data' });
      // a new phone starts at 0 XP; never let an automatic save wipe out more progress
      if (!body.force && current && current.data.xp > data.xp) return res.status(409).json({ error: 'cloud is ahead', xp: current.data.xp });
      const saved = new Date().toISOString();
      const value = JSON.stringify({ data, saved });
      if (value.length > MAX) return res.status(413).json({ error: 'too big' });
      await redis(env, ['SET', KEY, value]);
      return res.status(200).json({ saved });
    }

    return res.status(400).json({ error: 'unknown action' });
  } catch {
    return res.status(502).json({ error: 'storage failed' });
  }
}
