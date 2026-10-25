(window.UNITS = window.UNITS || []).push({
  id: "stage",
  stage: 4,
  order: 17,
  emoji: "🏆",
  title: "On stage",
  topic: "Competition",
  intro: "Forgotten shoes, a broken zip and two thousand people watching. You'll tell the dramatic story of a salsa championship using inversion for emphasis: Never have I..., Little did I know..., No sooner had... than...",

  vocab: [
    { w: "routine", pos: "noun", def: "a fixed sequence of steps that dancers perform",
      ex: "We had rehearsed our routine for six months.", es: "rutina (de baile)" },
    { w: "choreography", pos: "noun", def: "the planned steps and movements of a dance, or the art of creating them",
      ex: "The choreography flowed beautifully.", es: "coreografía" },
    { w: "rehearse", pos: "verb", def: "to practise a performance before doing it in front of an audience",
      ex: "We rehearsed four evenings a week.", es: "ensayar" },
    { w: "flawless", pos: "adjective", def: "perfect; without any mistakes",
      ex: "The first minute was flawless.", es: "impecable" },
    { w: "stamina", pos: "noun", def: "the physical energy to keep doing something for a long time",
      ex: "You need a lot of stamina to dance salsa for three minutes.", es: "resistencia / aguante" },
    { w: "nerve-racking", pos: "adjective", def: "making you feel very nervous",
      ex: "It was the most nerve-racking three minutes of my life.", es: "angustiante / de infarto" },
    { w: "standing ovation", pos: "noun", def: "when an audience stands up to applaud",
      ex: "Row by row, they stood up: a standing ovation!", es: "ovación de pie" },
    { w: "spotlight", pos: "noun", def: "a strong beam of light that shines on one performer",
      ex: "The spotlight followed us across the stage.", es: "foco / reflector" },
    { w: "wardrobe malfunction", pos: "noun", def: "an embarrassing moment when a piece of clothing breaks or slips in public",
      ex: "My zip broke: a wardrobe malfunction in front of two thousand people.", es: "accidente de vestuario" },
    { w: "pull off", pos: "phrasal verb", def: "to succeed in doing something difficult",
      ex: "We pulled it off so well that people thought it was part of the show.", es: "lograr / sacar adelante" }
  ],

  reading: {
    title: "The zip that nearly ruined everything",
    text: [
      "Never have I been as terrified as I was on the night of the national salsa championship. Andrés and I had rehearsed our routine for six months, four evenings a week, until our neighbours knew the music better than we did. Not only had we perfected every spin, but we had also built up enough stamina to dance for three minutes without looking as if we were dying. On paper, we were ready.",
      "Little did I know that the night would go wrong before we even reached the stage. No sooner had we arrived at the theatre than I realised I had left my shoes at home: my special, comfortable, lucky shoes. Valentina drove across the city in the Carnaval traffic to fetch them, which, as anyone from Barranquilla knows, is an act of true love. Hardly had she run through the stage door when the presenter called our names.",
      "The first minute was flawless. The choreography flowed, the spotlight followed us, and the judges were smiling. Then, halfway through the hardest lift, I heard a terrible sound: the zip on my dress had broken. A wardrobe malfunction, live, in front of two thousand people. Under no circumstances, I told myself, was I going to stop dancing.",
      "So I improvised. I held the back of my dress with one hand and turned the rest of the routine into something that looked, I hoped, deliberate. Andrés, who is a genius, understood immediately and changed his steps to match mine. Rarely have two people communicated so much without saying a single word. It was the most nerve-racking three minutes of my life.",
      "When the music stopped, there was silence. Only then did I dare to look at the audience. And then, row by row, they stood up: a standing ovation! We didn't win. We came second, behind a couple from Cali who had clearly never had a problem with a zip. But not until the judges gave us a special prize for 'artistic courage' did I start to cry.",
      "Only later did I discover that we had pulled it off so well that most people thought the dress was part of the show. Never again will I trust a cheap zip. And never again will I leave my shoes at home."
    ]
  },

  grammar: {
    title: "Inversion for emphasis",
    explain: [
      "When a negative or limiting expression (never, rarely, little, not only, under no circumstances) begins a sentence, the auxiliary comes before the subject, as in a question: Never have I seen...",
      "If there is no auxiliary (present or past simple), add do, does or did: Little did I know...",
      "Hardly ... when and No sooner ... than show that one thing happened immediately after another. They usually take the past perfect.",
      "With Only then, Only after..., Only when... and Not until..., the inversion comes in the main clause: Only after the show did I relax.",
      "Inversion is formal or dramatic, perfect for stories and speeches. In everyday conversation, normal word order is more natural: I had no idea the zip would break."
    ],
    examples: [
      { en: "Never have I been so terrified.", note: "negative adverb + auxiliary + subject" },
      { en: "Little did I know that the zip would break.", note: "no auxiliary in 'I knew', so add did" },
      { en: "No sooner had we arrived than I realised I had forgotten my shoes.", note: "no sooner + past perfect ... than" },
      { en: "Hardly had she run in when the presenter called our names.", note: "hardly + past perfect ... when" },
      { en: "Not only did we dance well, but we also had fun.", note: "inversion only in the first part" },
      { en: "Only then did I dare to look at the audience.", note: "only + time expression → inversion" },
      { en: "Under no circumstances should you stop dancing.", note: "a strong prohibition" }
    ],
    tip: "Spanish puts adverbs first freely ('Nunca he estado tan nerviosa') without changing anything else, so it's tempting to write 'Never I have been so nervous'. In English, a negative adverb at the start pulls the auxiliary in front of the subject: 'Never have I been so nervous.' Keep the pairs fixed: No sooner... than (not when), Hardly... when (not than). And only invert when the expression comes first: 'I have never been so nervous' has normal order."
  },

  exercises: [
    { kind: "tf", s: "Daniela and Andrés won first prize in the championship.", answer: false,
      why: "They came second, although they also received a special prize for 'artistic courage'." },
    { kind: "tf", s: "Andrés changed his steps to help Daniela after her zip broke.", answer: true,
      why: "'Andrés... understood immediately and changed his steps to match mine.'" },
    { kind: "choice", q: "Why does Daniela call Valentina's drive 'an act of true love'?",
      right: "She crossed the city in heavy Carnaval traffic to fetch the shoes.",
      wrong: ["She drove all night from another city.", "She lent Daniela her own lucky shoes.", "She repaired Daniela's zip in the car."],
      why: "Anyone who has driven in Barranquilla during Carnaval knows how bad the traffic is!" },
    { kind: "gap", text: "Never {gap} so terrified in my life.",
      right: "have I been", wrong: ["I have been", "I was", "been I have"],
      why: "After Never at the start of a sentence, the auxiliary comes before the subject: have I been." },
    { kind: "gap", text: "No sooner had we arrived {gap} I realised I had forgotten my shoes.",
      right: "than", wrong: ["when", "that", "then"],
      why: "No sooner always pairs with than." },
    { kind: "gap", text: "Hardly had Valentina run in {gap} the presenter called our names.",
      right: "when", wrong: ["than", "that", "then"],
      why: "Hardly (and scarcely) pair with when, not than." },
    { kind: "type", text: "Little {gap} (I / know) that the zip was about to break.",
      answers: ["did I know"],
      why: "'I knew' has no auxiliary, so after Little we add did and use the infinitive: did I know." },
    { kind: "type", text: "Only then {gap} (I / understand) how lucky we were.",
      answers: ["did I understand"],
      why: "Only then + inversion. In the past simple, add did: did I understand." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "Not only did we dance well, but we also had fun.",
      wrong: ["Not only we danced well, but we also had fun.", "Not only did we dance well, but did we also have fun."],
      why: "Invert after Not only, but use normal word order in the second part (but we also...)." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "Under no circumstances should you stop dancing.",
      wrong: ["Under no circumstances you should stop dancing.", "Under no circumstances should not you stop dancing."],
      why: "Under no circumstances needs inversion (should you), and it is already negative, so no 'not'." },
    { kind: "order", q: "Build a sentence with inversion.",
      words: ["Never", "have", "I", "seen", "such", "a", "flawless", "routine."],
      why: "Never + auxiliary (have) + subject (I) + past participle (seen)." },
    { kind: "match", q: "Match the performance words to their meanings.",
      pairs: [
        ["choreography", "the planned steps of a dance"],
        ["stamina", "the energy to keep going for a long time"],
        ["flawless", "perfect, without mistakes"],
        ["standing ovation", "when an audience stands up to applaud"],
        ["spotlight", "a strong light that shines on a performer"]
      ],
      why: "All five appear in Daniela's championship story." },
    { kind: "gap", text: "The lift was incredibly difficult, but they managed to {gap} perfectly.",
      right: "pull it off", wrong: ["pull it out", "put it off", "take it off"],
      why: "To pull something off is to succeed in doing something difficult. Put off = postpone; take off = remove." },
    { kind: "listen", say: "Not only did she dance beautifully, but she also smiled.",
      why: "Not only + inversion in the first part, normal order after but." }
  ],

  speak: [
    "Describe the most nerve-racking performance, exam or interview of your life. Try to start at least two sentences with 'Never have I...' or 'Little did I know...'.",
    "Tell a story about something that went wrong at the last minute. Use 'No sooner had... than' or 'Hardly had... when'.",
    "Give a friend three strict rules before a dance competition, starting with 'Under no circumstances...'."
  ],

  write: {
    prompt: "Write a dramatic account of a performance, competition or big event in your life, as if for a magazine. Use at least four different inversion structures from this unit (for example Never have I..., Little did I know..., No sooner had... than...).",
    min: 120,
    useWords: ["rehearse", "flawless", "nerve-racking", "standing ovation"]
  }
});
