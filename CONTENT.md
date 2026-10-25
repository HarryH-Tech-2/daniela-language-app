# Content format

Everything Daniela studies lives in `data/`. Plain JavaScript files, no build step.
Run `node test/content.test.js` after any change: it checks every field below.

English is **British** (colour, practise, favourite, flat, holiday). Where American English
differs in a way she'll meet often, a `why` or grammar note may mention it.

## Units: `data/units/<id>.js`

One file per unit. Each file is exactly:

```js
(window.UNITS = window.UNITS || []).push({
  id: 'dance',                 // same as the file name
  stage: 1,                    // 1 = B1+, 2 = B2, 3 = B2+, 4 = C1
  order: 2,                    // position on the path (1..22)
  emoji: '💃',
  title: 'A night of salsa',   // short, fun
  topic: 'Dance',              // one or two words
  intro: 'One or two sentences, speaking to Daniela as "you", saying what she will learn.',

  vocab: [                     // exactly 10 items
    { w: 'rhythm', pos: 'noun', def: 'a regular, repeated pattern of sounds or movements',
      ex: 'She has an amazing sense of rhythm.', es: 'ritmo' }
    // pos: noun | verb | adjective | adverb | phrase | phrasal verb | idiom | preposition | conjunction
    // ex must contain the word (or an inflected form of it)
  ],

  reading: {
    title: 'Saturday at La Troja',
    text: ['paragraph one', 'paragraph two', '...'],   // 3-6 paragraphs
    // B1+: 180-250 words, B2: 220-300, B2+: 260-340, C1: 300-420
    // Uses most of the vocab and plenty of examples of the grammar point.
    // Daniela can be the main character or the narrator ("I"). Friends: Camila, Valentina,
    // Andrés, Sofía; a neighbour's dog called Lola; other names are fine too.
  },

  grammar: {
    title: 'Narrative tenses',
    explain: ['Short, clear sentence or two per item.', '...'],          // 2-5 items
    examples: [{ en: 'I was dancing when the lights went out.', note: 'past continuous + past simple' }], // 3-6
    tip: 'A tip aimed at a Spanish speaker: the mistake people from Colombia typically make here, and how to avoid it.'
  },

  exercises: [ /* 12-14 items, see kinds below */ ],

  speak: ['Three questions or prompts', 'for her to answer out loud', 'and record herself'],

  write: {
    prompt: 'A writing task of a few sentences, related to the theme, that needs the grammar point.',
    min: 60,                                   // minimum words: B1+ 60, B2 80, B2+ 100, C1 120
    useWords: ['rhythm', 'stunning', 'nervous']  // 3-5 words from this unit's vocab
  }
});
```

## Exercise kinds

Every exercise may have `why`: one or two sentences explaining the answer. Give one almost always:
that is where the teaching happens. Wrong options must be clearly wrong to a C1 speaker,
never debatable.

| kind | fields | notes |
|------|--------|-------|
| `choice` | `q`, `right`, `wrong` (2-3 strings) | multiple choice |
| `gap` | `text` (contains `{gap}` once), `right`, `wrong` (2-3) | pick the word for the gap |
| `tf` | `s`, `answer` (true/false) | true or false; good for reading comprehension |
| `type` | `text` (contains `{gap}` once), `answers` (array of accepted strings) | she types the gap. Put the base word in brackets in `text`, e.g. `She {gap} (live) here since 2019.` List every acceptable answer, including contractions (`"has lived", "'s lived"`). Matching ignores case and extra spaces. |
| `order` | `q` (optional), `words` (array, correct order) | tiles to put in order to build a sentence. 5-10 tiles. Only use sentences with ONE natural word order. Punctuation is attached to its word ("Monday."). |
| `match` | `q` (optional), `pairs` (4-5 `[left, right]` arrays) | tap pairs; all lefts and rights unique |
| `listen` | `say` (a sentence, 6-14 words) | the app reads it aloud; she types what she hears. Avoid numbers and names with odd spellings. |

Mix per unit: at least 2 reading-comprehension items (`choice`/`tf` about the story),
at least 4 on the grammar point, at least 2 on the vocab, 2 `type`, 1 `order`, 1 `match`, 1 `listen`.

## Games: `data/games.js`

```js
window.GAMES = {
  falseFriends: [ { en: 'actually', es: 'actualmente', means: 'en realidad / de hecho', instead: 'currently',
                    ex: 'Actually, I prefer cumbia to salsa.' } ],
  mistakes:     [ { s: 'I have 26 years.', ok: false, fix: 'I am 26 years old.', why: '...' },
                  { s: 'She explained the problem to me.', ok: true, why: '...' } ],
  phrasal:      [ { pv: 'look after', def: 'take care of', ex: 'I look after my neighbour\'s dog at weekends.' } ],
  idioms:       [ { idiom: 'a piece of cake', meaning: 'very easy', wrong: ['a dessert', 'a small reward'],
                    ex: 'The exam was a piece of cake.' } ],
  pairs:        [ { a: 'ship', b: 'sheep', sound: 'short i /ɪ/ vs long ee /iː/' } ],
  rescue:       [ { w: 'lawyer', clue: 'a person whose job is to give legal advice' } ]
};
```
