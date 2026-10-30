// Vercel serverless function: the AI conversation partner.
// POST /api/talk  (this file is api/talk.mjs) { passcode, mode: 'turn' | 'feedback', scenario, messages }
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   ANTHROPIC_API_KEY  required
//   APP_PASSCODE       recommended; the app asks for it once, so strangers can't spend your credits
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();
const MODEL = 'claude-opus-5-5';

const TURN_SCHEMA = {
  type: 'object',
  properties: {
    reply: { type: 'string', description: 'What your character says next, spoken aloud. 1-3 short sentences, ending with a question or prompt unless the conversation is over.' },
    correction: {
      type: 'object',
      properties: {
        needed: { type: 'boolean' },
        youSaid: { type: 'string', description: 'The part of her last message with the mistake, quoted exactly. Empty if none.' },
        better: { type: 'string', description: 'The natural, correct way to say it. Empty if none.' },
        why: { type: 'string', description: 'One short, friendly sentence explaining the fix. Empty if none.' }
      },
      required: ['needed', 'youSaid', 'better', 'why'],
      additionalProperties: false
    },
    hint: { type: 'string', description: 'A short example of something she could say next, at her level.' },
    done: { type: 'boolean', description: 'True once the conversation has reached a natural end and your reply closes it.' }
  },
  required: ['reply', 'correction', 'hint', 'done'],
  additionalProperties: false
};

const FEEDBACK_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string', description: 'Two or three warm, honest sentences on how the conversation went, addressed to her as "you".' },
    strengths: { type: 'array', items: { type: 'string' }, description: '2-3 specific things she did well.' },
    fixes: {
      type: 'array',
      items: {
        type: 'object',
        properties: { youSaid: { type: 'string' }, better: { type: 'string' }, why: { type: 'string' } },
        required: ['youSaid', 'better', 'why'],
        additionalProperties: false
      },
      description: 'Up to 5 of the most useful corrections, most important first.'
    },
    phrases: { type: 'array', items: { type: 'string' }, description: '3-5 natural phrases a fluent speaker would have used here, for her to learn.' },
    level: { type: 'string', description: 'Rough CEFR estimate for this conversation, e.g. "B1+", "B2".' }
  },
  required: ['summary', 'strengths', 'fixes', 'phrases', 'level'],
  additionalProperties: false
};

function str(v, max) { return typeof v === 'string' ? v.slice(0, max) : ''; }

function system(s, name) {
  return [
    `You are role-playing a spoken English conversation with ${name}, a 26-year-old from Barranquilla, Colombia. Her English is around B1 and she is working towards B2/C1. She loves dancing, cooking, law, dogs and fashion.`,
    '',
    `Scene: ${str(s.setting, 300)}`,
    `You are ${str(s.name, 40) || 'the other person'}, ${str(s.them, 100)}. She is ${str(s.you, 100)}.`,
    `Your character: ${str(s.ai, 600)}`,
    `Her goal in this conversation: ${str(s.goal, 400)}`,
    `Target level: ${str(s.level, 10) || 'B2'}.`,
    '',
    'How to play it:',
    '- Stay in character and keep it natural, warm and a little playful. Use natural British English.',
    '- Your reply is read aloud by a speech synthesiser, so keep it to 1-3 short sentences, with no emoji, lists, stage directions or brackets.',
    '- End most replies with a question or prompt so she always knows it is her turn. Ask follow-up questions about what she actually said.',
    '- Pitch your language just above her level: clear, but not childish. At C1 level use idioms and nuance.',
    '- If she goes off topic or makes a joke, go along with it briefly, then steer back towards her goal.',
    '- Her messages come from speech recognition. Ignore punctuation, capitalisation and words that look like recognition errors (wrong homophones, odd single words). Do not correct those.',
    '- Correct at most one real grammar or vocabulary mistake per turn: the one that matters most (typical Spanish-speaker errors such as missing subjects, "I have 26 years", "explain me", wrong prepositions, tense mistakes). If her sentence was fine or the only issues are tiny, set needed to false. Never break character in the reply to correct her; the correction is shown separately.',
    '- After roughly 8-12 exchanges, or once her goal is achieved, bring the conversation to a natural close and set done to true.'
  ].join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  if (process.env.APP_PASSCODE && body.passcode !== process.env.APP_PASSCODE) {
    return res.status(401).json({ error: 'passcode' });
  }
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: 'not configured' });

  const s = body.scenario || {};
  const name = str(body.name, 40) || 'Daniela';
  const history = (Array.isArray(body.messages) ? body.messages : []).slice(-40)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1200) }));
  // The API needs the conversation to start with a user turn; the opening line is the partner's.
  const messages = [{ role: 'user', content: '(The conversation starts. Say your opening line.)' }, ...history];
  const feedback = body.mode === 'feedback';
  if (feedback) {
    messages.push({ role: 'user', content: 'The role-play is over. Step out of character and give her feedback on her English in this conversation, as her friendly tutor.' });
  }
  if (messages[messages.length - 1].role !== 'user') return res.status(400).json({ error: 'last message must be hers' });

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: feedback ? 4000 : 1500,
      system: system(s, name),
      messages,
      output_config: { effort: 'low', format: { type: 'json_schema', schema: feedback ? FEEDBACK_SCHEMA : TURN_SCHEMA } },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default'
    });
    if (response.stop_reason === 'refusal') return res.status(422).json({ error: 'refused' });
    const text = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    return res.status(200).json(JSON.parse(text));
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return res.status(429).json({ error: 'busy' });
    if (err instanceof Anthropic.APIError) {
      // passed back so the app (behind the passcode) can show what went wrong
      console.error('Claude API error', err.status, err.message);
      return res.status(502).json({ error: 'upstream ' + (err.status || ''), detail: String(err.message || '').slice(0, 300) });
    }
    if (err instanceof SyntaxError) return res.status(502).json({ error: 'bad reply' });
    return res.status(500).json({ error: 'failed' });
  }
}
