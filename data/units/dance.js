(window.UNITS = window.UNITS || []).push({
  id: "dance",
  stage: 1,
  order: 2,
  emoji: "💃",
  title: "A night of salsa",
  topic: "Dance",
  intro: "A night at La Troja, an old man in a white hat and a lot of sore toes. You'll learn to tell a story with the past simple, past continuous and past perfect.",

  vocab: [
    { w: "rhythm", pos: "noun", def: "a regular, repeated pattern of sounds or movements", ex: "She has an amazing sense of rhythm.", es: "ritmo" },
    { w: "spin", pos: "verb", def: "to turn round and round quickly (past: spun)", ex: "He kept spinning me until I nearly fell over.", es: "girar, dar vueltas" },
    { w: "queue", pos: "noun", def: "a line of people waiting for something", ex: "There was a long queue outside the club.", es: "fila, cola" },
    { w: "step on", pos: "phrasal verb", def: "to put your foot on something or someone, often by accident", ex: "Sorry, I stepped on your foot!", es: "pisar" },
    { w: "sweaty", pos: "adjective", def: "wet with sweat because you are hot or have been active", ex: "After three songs I was hot and sweaty.", es: "sudado" },
    { w: "exhausted", pos: "adjective", def: "extremely tired", ex: "We got home at four, completely exhausted.", es: "agotado" },
    { w: "nervous", pos: "adjective", def: "worried and a little afraid about something", ex: "I was nervous before my first salsa class.", es: "nervioso" },
    { w: "stunning", pos: "adjective", def: "extremely beautiful or impressive", ex: "Camila looked stunning in her red dress.", es: "impresionante, bellísimo" },
    { w: "show off", pos: "phrasal verb", def: "to try to make people notice and admire you or something you have", ex: "He loves showing off his dance moves.", es: "presumir, lucirse" },
    { w: "recognise", pos: "verb", def: "to know who someone is because you have seen them before", ex: "I didn't recognise him with his new beard.", es: "reconocer" }
  ],

  reading: {
    title: "Saturday at La Troja",
    text: [
      "Last Saturday, Camila and I went to La Troja, the most famous salsa bar in Barranquilla. When we arrived, a long queue was already waiting outside. I was nervous because I hadn't danced salsa for months. I had been too busy with work.",
      "We were standing at the bar and drinking lemonade when an old man in a white hat asked me to dance. He was about seventy, so I said yes to be kind. Big mistake. As soon as the song started, he spun me three times and I almost fell over. He had perfect rhythm, and soon everyone was watching us.",
      "While we were dancing, I stepped on his foot twice. He just laughed and said, 'Don't worry, mija. My wife did that for forty years.' By the end of the song I was sweaty and exhausted, but I was smiling like a child.",
      "Later, Camila told me who he was. He had won a national salsa competition in the eighties, and people had come from all over the city to see him. I hadn't recognised him! I felt a little embarrassed, because earlier that evening I had shown off my stunning new red shoes to everyone and told Camila I was the best dancer in the bar.",
      "When we left at three in the morning, the street was still full of music. I had lost an earring and my feet were killing me, but it was the best night of the year."
    ]
  },

  grammar: {
    title: "Narrative tenses",
    explain: [
      "Past simple: the main events of the story, one after another. He asked me to dance. I said yes.",
      "Past continuous (was/were + -ing): the background, or an action in progress when something else happened. We were standing at the bar when he arrived.",
      "Past perfect (had + past participle): an action that happened before another past action. It takes the story further back. I hadn't recognised him.",
      "Use 'when' + past simple for the short action that interrupts, and 'while' + past continuous for the longer action: While we were dancing, I stepped on his foot."
    ],
    examples: [
      { en: "I was dancing when the lights went out.", note: "past continuous (longer action) + past simple (interruption)" },
      { en: "When we arrived, the show had already started.", note: "past perfect: the show started before we arrived" },
      { en: "When we arrived, the show started.", note: "past simple: the show started at the moment we arrived" },
      { en: "He had won a national competition years before.", note: "past perfect: further back in the past" },
      { en: "While Camila was buying drinks, I was looking for a table.", note: "two longer actions happening at the same time" }
    ],
    tip: "Spanish speakers often use the past simple where English needs the past perfect: 'When I arrived, the show already started' should be 'the show had already started'. Also, the Spanish imperfecto is not always the past continuous. For habits, use the past simple or 'used to': 'Cuando era niña, bailaba cumbia' = 'When I was a child, I danced (or used to dance) cumbia', not 'I was dancing cumbia'."
  },

  exercises: [
    { kind: "tf", s: "Daniela had danced salsa a lot in the weeks before that night.", answer: false,
      why: "She says: 'I hadn't danced salsa for months. I had been too busy with work.' That's why she was nervous." },
    { kind: "choice", q: "Who was the old man in the white hat?",
      right: "A former national salsa champion.",
      wrong: ["Camila's grandfather.", "The owner of La Troja."],
      why: "Camila told her that 'he had won a national salsa competition in the eighties'." },
    { kind: "gap", text: "We {gap} at the bar when an old man asked me to dance.",
      right: "were standing", wrong: ["are standing", "have stood", "stand"],
      why: "This is the background action in progress when something interrupted it, so we need the past continuous: 'were standing'. The interruption ('asked') is past simple." },
    { kind: "gap", text: "When we got to the club, the show {gap}, so we missed the first song.",
      right: "had already started", wrong: ["already starts", "has already started"],
      why: "The show started before we got there, so we use the past perfect: 'had already started'. The present perfect ('has started') connects to now, not to another past moment." },
    { kind: "choice", q: "Which sentence means the band started playing BEFORE we arrived?",
      right: "When we arrived, the band had started playing.",
      wrong: ["When we arrived, the band started playing.", "When we arrived, the band was going to start playing."],
      why: "The past perfect ('had started') shows the earlier action. With the past simple ('started'), the band began at the moment we arrived." },
    { kind: "type", text: "I {gap} (not / dance) salsa for months, so I was nervous.",
      answers: ["hadn't danced", "had not danced"],
      why: "Not dancing for months happened before the moment she felt nervous, so we go further back with the past perfect: 'hadn't danced'." },
    { kind: "type", text: "While we {gap} (dance), I stepped on his foot twice.",
      answers: ["were dancing"],
      why: "'While' introduces the longer action in progress, so we use the past continuous: 'were dancing'." },
    { kind: "order", q: "Build the sentence.",
      words: ["He", "had", "won", "a", "national", "competition", "years", "before."],
      why: "Past perfect: the competition happened long before the night at La Troja." },
    { kind: "match", q: "Match the words to their meanings.",
      pairs: [
        ["rhythm", "a regular pattern of sounds or movements"],
        ["queue", "a line of people waiting"],
        ["stunning", "extremely beautiful"],
        ["exhausted", "extremely tired"],
        ["show off", "try to make people admire you"]
      ] },
    { kind: "gap", text: "Ouch! Sorry, I {gap} your foot again!",
      right: "stepped on", wrong: ["showed off", "spun"],
      why: "'Step on' means to put your foot on something, often by accident. 'Show off' means to try to impress people, and you can't 'spin' someone's foot." },
    { kind: "choice", q: "'Cuando era niña, bailaba cumbia todos los días.' Which is the correct translation?",
      right: "When I was a child, I danced cumbia every day.",
      wrong: ["When I was being a child, I danced cumbia every day.", "When I had been a child, I danced cumbia every day."],
      why: "For a past state ('era niña') and a past habit ('bailaba'), English uses the past simple (or 'used to dance'). 'Be' as a state doesn't go in the continuous, and the past perfect makes no sense here." },
    { kind: "listen", say: "We were dancing when the lights suddenly went out.",
      why: "Past continuous for the action in progress ('were dancing') and past simple for the sudden event ('went out')." },
    { kind: "gap", text: "By the time we left the club, my feet {gap}.",
      right: "were killing me", wrong: ["are killing me", "had killing me"],
      why: "'My feet are killing me' is an informal way to say they hurt a lot. In a past story it becomes the past continuous: 'were killing me'. 'Had killing' isn't a real form." },
    { kind: "tf", s: "Daniela lost something that night.", answer: true,
      why: "At the end she says: 'I had lost an earring.' The past perfect shows it happened before they left." }
  ],

  speak: [
    "Tell the story of the best night out you've ever had. Where were you, who were you with, and what happened?",
    "Describe a moment when something went wrong while you were dancing or at a party.",
    "Think about your first dance class or your first Carnaval. Had you ever danced in public before? How did you feel?"
  ],

  write: {
    prompt: "Write a short story about a memorable night out dancing. Set the scene with the past continuous, tell the main events with the past simple, and use the past perfect at least twice to talk about things that had happened earlier.",
    min: 60,
    useWords: ["rhythm", "nervous", "exhausted", "stunning"]
  }
});
