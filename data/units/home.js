(window.UNITS = window.UNITS || []).push({
  id: "home",
  stage: 1,
  order: 1,
  emoji: "🌴",
  title: "Barranquilla, my city",
  topic: "Hometown",
  intro: "You're showing a visitor around La Arenosa! You'll learn when to use the present perfect and when to use the past simple, and how to use for and since without translating from Spanish.",

  vocab: [
    { w: "humid", pos: "adjective", def: "hot and wet, so the air feels heavy", ex: "Barranquilla is so humid that my hair has its own personality.", es: "húmedo" },
    { w: "breeze", pos: "noun", def: "a light, pleasant wind", ex: "In the evening there's a lovely breeze from the river.", es: "brisa" },
    { w: "nickname", pos: "noun", def: "an informal name for a person or place", ex: "Barranquilla's nickname is La Arenosa.", es: "apodo" },
    { w: "landmark", pos: "noun", def: "a famous building or place that is easy to recognise", ex: "The Malecón has become one of the city's best-known landmarks.", es: "lugar emblemático, punto de referencia" },
    { w: "stroll", pos: "verb", def: "to walk slowly and in a relaxed way", ex: "We strolled along the river until the sun went down.", es: "pasear, caminar sin prisa" },
    { w: "lively", pos: "adjective", def: "full of energy, people and activity", ex: "The streets are especially lively during Carnaval.", es: "animado, lleno de vida" },
    { w: "crowded", pos: "adjective", def: "full of people", ex: "The bus was so crowded that I couldn't move my arms.", es: "lleno de gente, abarrotado" },
    { w: "proud", pos: "adjective", def: "feeling happy and pleased about something connected to you", ex: "I'm really proud of my city.", es: "orgulloso" },
    { w: "hometown", pos: "noun", def: "the town or city where you were born or grew up", ex: "My hometown is hot, loud and wonderful.", es: "ciudad natal" },
    { w: "renovate", pos: "verb", def: "to repair an old building or area so it is in good condition again", ex: "They renovated the old customs building a few years ago.", es: "renovar, remodelar" }
  ],

  reading: {
    title: "Welcome to La Arenosa",
    text: [
      "Welcome to Barranquilla! I've lived here all my life, so I've had twenty-six years to learn its secrets. People call it La Arenosa, 'the sandy one', a nickname that comes from the sandy streets of the past. My friend Tom arrived from Manchester on Monday, and he has already asked me three times if it is always this hot. The answer is yes. The air is so humid that your sunglasses steam up when you leave a shop.",
      "Yesterday afternoon we went for a stroll along the Malecón, the walkway next to the Magdalena River. The city renovated the riverside a few years ago, and since then it has become one of my favourite landmarks. When I was a child, nobody walked there. Now it is lively every evening, full of families, joggers and people selling cold drinks. The breeze from the river is the best air conditioning in town.",
      "Tom has never been to a carnival like ours. I have danced in the Carnaval de Barranquilla since I was eight, and I have never missed a year. Last February I danced cumbia for four hours in the Batalla de Flores, and my feet hurt for a week.",
      "We've eaten arepas de huevo three times since Monday. Tom has only been here for four days, but he already says 'ajá' like a real barranquillero. I'm so proud of my hometown, and I think he has fallen in love with it too."
    ]
  },

  grammar: {
    title: "Present perfect vs past simple; for and since",
    explain: [
      "Use the past simple for finished actions at a finished time: yesterday, last February, a few years ago, when I was a child.",
      "Use the present perfect (have/has + past participle) for life experiences up to now, when the exact time isn't important: I've never been to Bogotá.",
      "Use the present perfect with for and since for situations that started in the past and are still true now: I've lived here all my life.",
      "For + a period of time (for four days, for ten years). Since + a starting point (since Monday, since 2019, since I was eight).",
      "Never use the present perfect with a finished time expression: say 'I visited the Malecón yesterday', not 'I have visited the Malecón yesterday'."
    ],
    examples: [
      { en: "I've lived in Barranquilla since I was born.", note: "present perfect + since: it started at birth and is still true" },
      { en: "Tom has been here for four days.", note: "present perfect + for: a period of time up to now" },
      { en: "We went to the Malecón yesterday.", note: "past simple: finished time (yesterday)" },
      { en: "Have you ever danced champeta?", note: "present perfect: experience at any time in your life" },
      { en: "I moved to this flat three years ago.", note: "past simple + ago: a finished moment in the past" }
    ],
    tip: "Spanish uses the present for things that are still happening, so people say 'I live here since three years' or 'I am here for four days'. English needs the present perfect: 'I've lived here for three years', 'I've been here for four days'. A quick rule: 'desde hace tres años' = 'for three years' (present perfect), but 'hace tres años' = 'three years ago' (past simple)."
  },

  exercises: [
    { kind: "tf", s: "Tom arrived in Barranquilla on Monday.", answer: true,
      why: "The story says: 'My friend Tom arrived from Manchester on Monday.' Notice the past simple with a finished time (on Monday)." },
    { kind: "choice", q: "Why does Daniela love the Malecón in the evening?",
      right: "It's lively and there's a breeze from the river.",
      wrong: ["It's quiet and nobody goes there.", "It's the only place with air-conditioned shops."],
      why: "She says it is 'lively every evening' and that 'the breeze from the river is the best air conditioning in town'. Nobody walked there when she was a child, but that has changed." },
    { kind: "gap", text: "I'm 26 and I {gap} in Barranquilla all my life. I've never lived anywhere else.",
      right: "have lived", wrong: ["live", "am living", "was living"],
      why: "The situation started in the past and is still true now, so we need the present perfect: 'I have lived'. Spanish says 'vivo aquí toda mi vida', but English can't use the present here." },
    { kind: "gap", text: "We went for a stroll along the Malecón {gap}.",
      right: "yesterday", wrong: ["since Monday", "ever", "yet"],
      why: "'Went' is past simple, so it needs a finished time like 'yesterday'. 'Since Monday', 'ever' and 'yet' go with the present perfect." },
    { kind: "gap", text: "Tom has been here {gap} four days.",
      right: "for", wrong: ["since", "during", "ago"],
      why: "'Four days' is a period of time, so we use 'for'. 'Since' needs a starting point (since Monday), and 'ago' goes with the past simple (four days ago)." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "I've danced in the Carnaval since I was eight.",
      wrong: ["I dance in the Carnaval since I was eight.", "I've danced in the Carnaval since eighteen years.", "I'm dancing in the Carnaval since I was eight."],
      why: "With 'since' we need the present perfect ('I've danced'), not the present simple or present continuous. 'Since eighteen years' is wrong because a period of time needs 'for': 'for eighteen years'." },
    { kind: "type", text: "Tom {gap} (never / be) to a carnival like ours.",
      answers: ["has never been", "'s never been"],
      why: "A life experience up to now takes the present perfect: 'has never been'. Use 'been' (not 'gone') to talk about visiting a place and coming back." },
    { kind: "type", text: "Last February I {gap} (dance) cumbia for four hours.",
      answers: ["danced"],
      why: "'Last February' is a finished time, so we use the past simple: 'danced'. Here 'for four hours' describes a finished period, so no present perfect." },
    { kind: "order", q: "Build the sentence.",
      words: ["The", "city", "has", "changed", "a", "lot", "since", "then."],
      why: "Present perfect + since: the change started at a point in the past ('then') and the result is visible now." },
    { kind: "match", q: "Match the words to their meanings.",
      pairs: [
        ["humid", "hot and wet"],
        ["breeze", "a light, pleasant wind"],
        ["landmark", "a famous place that is easy to recognise"],
        ["crowded", "full of people"],
        ["stroll", "walk slowly and calmly"]
      ] },
    { kind: "gap", text: "The air in Barranquilla is hot and wet. It's very {gap}.",
      right: "humid", wrong: ["crowded", "proud", "lively"],
      why: "'Humid' describes air that is hot and full of water. 'Crowded' and 'lively' describe places with people, and 'proud' describes a feeling." },
    { kind: "listen", say: "I've lived in this city since I was born.",
      why: "'I've' is the contraction of 'I have'. Present perfect + since + a starting point." },
    { kind: "choice", q: "'Hace cinco años que vivo aquí.' Which is the correct translation?",
      right: "I've lived here for five years.",
      wrong: ["I live here since five years.", "I lived here five years ago."],
      why: "You still live there, so English uses the present perfect with 'for': 'I've lived here for five years'. 'I lived here five years ago' means you don't live there any more." },
    { kind: "tf", s: "Daniela has missed the Carnaval a few times.", answer: false,
      why: "She says: 'I have never missed a year.' She has danced in every Carnaval since she was eight." }
  ],

  speak: [
    "How long have you lived in your neighbourhood? What has changed since you were a child?",
    "Tell a visitor about your favourite place in Barranquilla. When did you last go there, and what did you do?",
    "What's the craziest thing you've ever seen at Carnaval?"
  ],

  write: {
    prompt: "A friend from England is visiting Barranquilla next month. Write them a message about your city: how long you've lived there, places you've visited recently, and something you did last Carnaval. Use the present perfect and the past simple, and at least one 'for' and one 'since'.",
    min: 60,
    useWords: ["humid", "lively", "landmark", "proud"]
  }
});
