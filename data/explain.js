// Explanations: short answers to "why does English do that?" questions, at
// #/explain and #/explain/<id>. Format: see CONTENT.md ("Explanations").
window.EXPLAIN = [
  {
    id: 'to-after-verbs', emoji: '➡️',
    q: 'Why does “to” come after a verb in positive sentences?',
    short: '“to + verb” is just how English writes the infinitive, like the -ar, -er, -ir ending in Spanish. It appears when a second verb follows verbs like want, need or decide, whether the sentence is positive or negative.',
    parts: [
      { h: '“to” is the English infinitive', t: 'In Spanish, the infinitive has its own ending: bailar, comer, vivir. English verbs have no ending for that, so English puts “to” in front: to dance, to eat, to live. When you say “Quiero bailar”, the “-ar” is doing the job that “to” does in “I want to dance”.' },
      { h: 'When do you need it?', t: 'When a second verb comes after verbs like want, need, would like, decide, hope, plan, try, learn, forget, promise, agree, seem, manage and afford. The first verb changes (want, wants, wanted) and the second stays as “to + verb”.' },
      { h: 'Why only in positive sentences?', t: 'It isn’t really about positive or negative. It’s about which verb comes first. In negatives and questions, do/does/did come first, and they never take “to”: “I don’t dance”, “Do you dance?”. But if “want” is still there, its “to” stays: “I don’t want to dance”, “Do you want to dance?”.' },
      { h: 'Verbs that never take “to”', t: 'Modal verbs are followed by the bare verb: can, could, will, would, shall, should, must, may, might. So “I can dance”, never “I can to dance”. The same goes for let, make, had better and would rather: “Let me go”, “She made me laugh”.' },
      { h: 'Verbs that take -ing instead', t: 'Some verbs want -ing, not “to”: enjoy, finish, mind, avoid, keep, miss, suggest, practise. “I enjoy dancing”, not “I enjoy to dance”. A few take both with the same meaning: like, love, start, begin (“I love to dance” = “I love dancing”).' },
      { h: 'The tricky “to”: a preposition', t: 'Sometimes “to” is a preposition, not part of the verb, and then the verb takes -ing: look forward to, get used to, be used to, object to. “I’m looking forward to seeing you.” A test: if you can put a noun after “to” (“I’m looking forward to the party”), use -ing for a verb.' },
      { h: '“to” for a reason (para)', t: '“to + verb” also explains why: “I came to London to study.” Spanish says “para estudiar”, but English doesn’t say “for study” or “for to study”, just “to study”.' }
    ],
    examples: [
      { en: 'I want to learn salsa.', ok: true, note: 'want + to + verb' },
      { en: 'I want learn salsa.', ok: false, note: 'needs “to”: I want to learn' },
      { en: 'I don’t want to go.', ok: true, note: 'don’t takes no “to”, but want still does' },
      { en: 'I can to swim.', ok: false, note: 'modals take no “to”: I can swim' },
      { en: 'I enjoy cooking.', ok: true, note: 'enjoy + -ing' },
      { en: 'I’m looking forward to see you.', ok: false, note: '“to” is a preposition here: looking forward to seeing you' },
      { en: 'I’m saving money to travel.', ok: true, note: 'to = para, for a reason' }
    ],
    tip: 'The two mistakes Colombian speakers make most: “I can to…” (no “to” after can, must or should) and “for + verb” for a reason (“I came for learn” → “I came to learn”).',
    check: [
      { q: 'I decided {gap} law.', right: 'to study', wrong: ['study', 'studying'] },
      { q: 'You should {gap} a coat.', right: 'bring', wrong: ['to bring', 'bringing'] },
      { q: 'Do you want {gap} later?', right: 'to dance', wrong: ['dance', 'dancing'] },
      { q: 'I’m used to {gap} up early.', right: 'getting', wrong: ['get', 'got'] }
    ]
  },

  {
    id: 'perfect-yesterday', emoji: '⏰',
    q: 'Why can’t I say “I have seen him yesterday”?',
    short: 'The present perfect connects the past to now, so it can’t go with a finished time like yesterday, last week or in 2020. For a finished time, use the past simple.',
    parts: [
      { h: 'Two different questions', t: 'The present perfect answers “Has it happened (up to now)?”. The past simple answers “When did it happen?”. As soon as you say when (yesterday, on Monday, two years ago), use the past simple.' },
      { h: 'Spanish does it differently', t: 'In Colombia you’d usually say “Lo vi ayer” (past simple), which is right in English too: “I saw him yesterday.” The trouble comes from Spain’s Spanish, or from translating “he visto” word for word.' },
      { h: 'Words that go with the present perfect', t: 'ever, never, already, yet, just, so far, recently, since, for (up to now), this week (when it isn’t over).' }
    ],
    examples: [
      { en: 'I’ve seen that film.', ok: true, note: 'no time said: it’s about my experience' },
      { en: 'I’ve seen it last night.', ok: false, note: 'finished time → I saw it last night' },
      { en: 'Have you ever been to London?', ok: true, note: 'ever → present perfect' },
      { en: 'When have you arrived?', ok: false, note: '“when” asks for a time → When did you arrive?' }
    ],
    tip: 'If the sentence says or asks when, use the past simple. No exceptions.',
    check: [
      { q: 'I {gap} her at the party on Saturday.', right: 'met', wrong: ['have met', 'have meet'] },
      { q: '{gap} you ever tried arepas?', right: 'Have', wrong: ['Did', 'Do'] }
    ]
  },

  {
    id: 'make-do', emoji: '🛠️',
    q: 'Make or do? They’re both “hacer”!',
    short: 'Roughly: “do” is for activities and jobs, “make” is for creating or producing something. But many are fixed pairs that you simply learn.',
    parts: [
      { h: 'Do = the activity', t: 'do homework, do the dishes, do the shopping, do exercise, do a course, do your best, do someone a favour, do business. Also “What do you do?” (your job).' },
      { h: 'Make = you create something', t: 'make a cake, make coffee, make a mess, make a plan, make a decision, make a mistake, make money, make friends, make noise, make a phone call.' },
      { h: 'Neither!', t: 'Some Spanish “hacer” phrases use another verb: hacer una pregunta = ask a question; hacer una fiesta = have / throw a party; hace calor = it’s hot; hace dos años = two years ago; hacer caso = pay attention.' }
    ],
    examples: [
      { en: 'I made a mistake.', ok: true },
      { en: 'Can I do you a question?', ok: false, note: 'Can I ask you a question?' },
      { en: 'She does yoga every morning.', ok: true },
      { en: 'Let’s make a party!', ok: false, note: 'Let’s have (or throw) a party!' }
    ],
    tip: 'When you learn a noun, learn its verb with it: “a decision” → make, “a favour” → do, “a question” → ask.',
    check: [
      { q: 'I need to {gap} a decision today.', right: 'make', wrong: ['do', 'take'] },
      { q: 'Could you {gap} me a favour?', right: 'do', wrong: ['make', 'give'] }
    ]
  },

  {
    id: 'for-since-ago', emoji: '📅',
    q: 'For, since or ago?',
    short: '“for” + a length of time, “since” + a starting point, “ago” after a length of time to say when in the past.',
    parts: [
      { h: 'For = how long', t: 'for two years, for ten minutes, for ages. “I’ve lived here for two years.”' },
      { h: 'Since = from when', t: 'since 2022, since Monday, since I was a child. “I’ve lived here since 2022.”' },
      { h: 'Ago = how long before now', t: 'It goes after the time and takes the past simple: “I moved here two years ago.” It’s “hace” in Spanish, but it comes at the end.' },
      { h: 'Hace dos años que vivo aquí', t: 'Spanish uses the present, but English needs the present perfect: “I’ve lived here for two years”, not “I live here since two years”.' }
    ],
    examples: [
      { en: 'I’ve known her since 2019.', ok: true },
      { en: 'I live here since two years.', ok: false, note: 'I’ve lived here for two years.' },
      { en: 'We met three years ago.', ok: true },
      { en: 'We met ago three years.', ok: false, note: '“ago” goes after: three years ago' }
    ],
    tip: 'Count it: if you can say the number of days, months or years, use “for”. If it’s a date or an event, use “since”.',
    check: [
      { q: 'She’s been a lawyer {gap} 2021.', right: 'since', wrong: ['for', 'ago'] },
      { q: 'I called you ten minutes {gap}.', right: 'ago', wrong: ['for', 'since'] }
    ]
  },

  {
    id: 'people-are', emoji: '👥',
    q: 'Why “people are” but “the news is”?',
    short: 'English decides singular or plural by grammar, not meaning. “People” is plural (la gente is singular!), while “news”, “advice” and “information” are uncountable, so they’re singular and have no -s.',
    parts: [
      { h: 'People is plural', t: '“People are friendly here.” “La gente es” is singular, so Spanish speakers often say “people is”. Think of “people” as the plural of “person”.' },
      { h: 'Uncountable nouns', t: 'information, advice, news, furniture, luggage, homework, money, hair (on your head). They take a singular verb and no “a” or -s: “some advice”, “a piece of information”, “The news is good.”' },
      { h: 'The police are', t: '“The police” is always plural: “The police are on their way.”' }
    ],
    examples: [
      { en: 'People are very kind here.', ok: true },
      { en: 'Can you give me an advice?', ok: false, note: 'some advice / a piece of advice' },
      { en: 'The news is on at nine.', ok: true },
      { en: 'I need some informations.', ok: false, note: 'some information' }
    ],
    tip: 'If a noun is uncountable in English, use “some”, “a lot of” or “a piece of”, never “a/an” or -s.',
    check: [
      { q: 'People {gap} always late in Barranquilla!', right: 'are', wrong: ['is', 'be'] },
      { q: 'Thanks for the {gap}.', right: 'advice', wrong: ['advices', 'an advice'] }
    ]
  },

  {
    id: 'the-general', emoji: '🐶',
    q: 'Why “I love dogs”, not “I love the dogs”?',
    short: 'When you talk about things in general, English uses no article: dogs, music, love. “The” means specific ones that you both know about.',
    parts: [
      { h: 'General = no article', t: 'Spanish says “Me encantan los perros”, but English says “I love dogs.” The same goes for abstract ideas: “Life is short”, “Music makes me happy”, “Coffee keeps me awake.”' },
      { h: 'Specific = the', t: '“The dogs next door bark all night” means particular dogs. “The music at the party was great” means that music.' },
      { h: 'Places and routines', t: 'No “the” in: go to bed, go to work, at home, at school, by bus, on Monday, next week. “I go to work by bus,” not “to the work by the bus”.' }
    ],
    examples: [
      { en: 'I love dogs.', ok: true, note: 'dogs in general' },
      { en: 'The life is beautiful.', ok: false, note: 'Life is beautiful.' },
      { en: 'The coffee in this café is excellent.', ok: true, note: 'specific coffee' },
      { en: 'I’m going to the bed.', ok: false, note: 'I’m going to bed.' }
    ],
    tip: 'Before saying “the”, ask yourself: “Which one(s)?” If you can’t answer, leave it out.',
    check: [
      { q: '{gap} is the best medicine.', right: 'Laughter', wrong: ['The laughter', 'A laughter'] },
      { q: 'Can you pass me {gap} salt, please?', right: 'the', wrong: ['a', '(nothing)'] }
    ]
  },

  {
    id: 'i-agree', emoji: '🤝',
    q: 'Why is “I am agree” wrong?',
    short: '“Agree” is already a verb, so it doesn’t need “am”. In Spanish it’s “estoy de acuerdo”, which uses estar, but English just says “I agree”.',
    parts: [
      { h: 'One verb is enough', t: '“I agree”, “I don’t agree”, “Do you agree?”. Adding “am” makes two verbs: “I am agree” is like saying “Yo estoy acuerdo”.' },
      { h: 'Where English uses “be” but Spanish doesn’t', t: 'Spanish uses “tener” where English uses “be”: I’m 26 (tengo 26 años), I’m hungry, I’m thirsty, I’m cold, I’m right, I’m afraid, I’m in a hurry.' },
      { h: 'Bored vs boring', t: '“I’m bored” = estoy aburrida. “I’m boring” = soy aburrida! -ed is how you feel; -ing is what causes the feeling.' }
    ],
    examples: [
      { en: 'I agree with you.', ok: true },
      { en: 'I am agree with you.', ok: false, note: 'I agree with you.' },
      { en: 'I have 26 years.', ok: false, note: 'I’m 26 (years old).' },
      { en: 'You’re right!', ok: true, note: 'tienes razón = you’re right' }
    ],
    tip: 'Say “I agree” and “I’m 26” out loud a few times. The more you say them, the less the Spanish pattern will come out.',
    check: [
      { q: 'I {gap} with you completely.', right: 'agree', wrong: ['am agree', 'am agreed'] },
      { q: 'The film was so long, I was {gap}.', right: 'bored', wrong: ['boring', 'bore'] }
    ]
  }
];
