// Vercel Cron calls this every minute (vercel.json): it sends any scroll reminders that are due.
// All the work is in api/nudge.mjs; Vercel sends `Authorization: Bearer $CRON_SECRET`.
import nudge from './nudge.mjs';

export default function handler(req, res) {
  req.query = { ...(req.query || {}), do: 'tick' };
  return nudge(req, res);
}
