// Vercel serverless function: checks a journal entry and lists her mistakes.
// POST /api/review  { passcode, name, prompt, text }
// Same environment variables as api/talk.mjs (ANTHROPIC_API_KEY, APP_PASSCODE, ANTHROPIC_WORKSPACE_ID).
import Anthropic from '@anthropic-ai/sdk';

const WORKSPACE = process.env.ANTHROPIC_WORKSPACE_ID;
const client = new Anthropic(WORKSPACE ? { defaultHeaders: { 'anthropic-workspace-id': WORKSPACE } } : {});
const MODEL = 'claude-opus-5-5';

const SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string', description: 'Two or three warm, honest sentences about the piece, addressed to her as "you": what works, and the main thing to work on.' },
    mistakes: {
      type: 'array',
      description: 'Every real mistake, in the order they appear in the text.',
      items: {
        type: 'object',
        properties: {
          wrong: { type: 'string', description: 'The words with the mistake, copied EXACTLY from her text (same spelling, capitals and punctuation), as short as possible while still making sense: usually 1-5 words.' },
          right: { type: 'string', description: 'What should replace those exact words.' },
          why: { type: 'string', description: 'One short, friendly sentence explaining the rule, in simple English. Mention the Spanish influence if there is one.' },
          kind: { type: 'string', enum: ['grammar', 'vocabulary', 'spelling', 'punctuation', 'style'] }
        },
        required: ['wrong', 'right', 'why', 'kind'],
        additionalProperties: false
      }
    },
    corrected: { type: 'string', description: 'Her whole text with every mistake fixed, keeping her words, ideas and paragraphs. Do not rewrite what was already correct.' },
    level: { type: 'string', description: 'Rough CEFR estimate for this piece of writing, e.g. "B1+", "B2".' }
  },
  required: ['summary', 'mistakes', 'corrected', 'level'],
  additionalProperties: false
};

function str(v, max) { return typeof v === 'string' ? v.slice(0, max) : ''; }

function system(name) {
  return [
    `You are a kind, precise English teacher checking a piece of writing by ${name}, a 26-year-old from Barranquilla, Colombia whose English is around B1-B2 and who is working towards C1.`,
    'Use British English as the standard (colour, flat, holiday), but do not mark American spellings or words as mistakes.',
    '',
    'What counts as a mistake:',
    '- Grammar, vocabulary, spelling and punctuation errors, and phrases that are clearly unnatural for a native speaker (kind "style").',
    '- Typical Spanish-speaker errors: missing subjects ("Is very nice"), "I have 26 years", "explain me", false friends, wrong prepositions, tense mistakes, word order, missing articles.',
    '- Do not mark things that are correct but different from how you would say them. Do not invent mistakes. A short, good text may have none.',
    '',
    'Each "wrong" must be copied character for character from her text so the app can find and highlight it. If the same mistake appears twice, list it twice.'
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  if (process.env.APP_PASSCODE && body.passcode !== process.env.APP_PASSCODE) {
    return res.status(401).json({ error: 'passcode' });
  }
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: 'not configured' });

  const text = str(body.text, 8000).trim();
  if (!text) return res.status(400).json({ error: 'no text' });
  const prompt = str(body.prompt, 500);

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system: system(str(body.name, 40) || 'Daniela'),
      messages: [{ role: 'user', content: (prompt ? `The task she was given: ${prompt}\n\n` : '') + `Her text:\n<text>\n${text}\n</text>` }],
      output_config: { effort: 'medium', format: { type: 'json_schema', schema: SCHEMA } },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default'
    });
    if (response.stop_reason === 'refusal') return res.status(422).json({ error: 'refused' });
    const out = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    return res.status(200).json(JSON.parse(out));
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return res.status(429).json({ error: 'busy' });
    if (err instanceof Anthropic.APIError) {
      console.error('Claude API error', err.status, err.message);
      return res.status(502).json({ error: 'upstream ' + (err.status || ''), detail: String(err.message || '').slice(0, 300) });
    }
    if (err instanceof SyntaxError) return res.status(502).json({ error: 'bad reply' });
    return res.status(500).json({ error: 'failed' });
  }
}
