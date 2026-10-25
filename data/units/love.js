(window.UNITS = window.UNITS || []).push({
  id: "love",
  stage: 2,
  order: 11,
  emoji: "💍",
  title: "Love & relationships",
  topic: "Relationships",
  intro: "Camila, who once said love was a waste of good dancing time, is getting married! You'll learn phrasal verbs about relationships, and where to put the object: 'asked her out', not 'asked out her'.",

  vocab: [
    { w: "ask out", pos: "phrasal verb", def: "to invite someone to go on a date with you",
      ex: "He finally asked her out after three rehearsals.", es: "invitar a salir" },
    { w: "turn down", pos: "phrasal verb", def: "to say no to an offer or invitation",
      ex: "She turned him down the first time he asked.", es: "rechazar" },
    { w: "fall for", pos: "phrasal verb", def: "to start to love someone",
      ex: "It's easy to fall for someone who dances like that.", es: "enamorarse de" },
    { w: "get on with", pos: "phrasal verb", def: "to have a friendly relationship with someone",
      ex: "I get on with my sister's boyfriend really well.", es: "llevarse bien con" },
    { w: "put up with", pos: "phrasal verb", def: "to accept something or someone annoying without complaining",
      ex: "I can't put up with his snoring any more!", es: "aguantar, soportar" },
    { w: "break up", pos: "phrasal verb", def: "to end a romantic relationship",
      ex: "They decided to break up after two years.", es: "terminar, romper (una relación)" },
    { w: "split up", pos: "phrasal verb", def: "to end a relationship or marriage and separate",
      ex: "My aunt and uncle split up last year.", es: "separarse" },
    { w: "make up", pos: "phrasal verb", def: "to become friends again after an argument",
      ex: "They always argue, and they always make up an hour later.", es: "reconciliarse, hacer las paces" },
    { w: "settle down", pos: "phrasal verb", def: "to start a calmer life in one place, often with a partner",
      ex: "My mum keeps asking me when I'm going to settle down.", es: "sentar cabeza" },
    { w: "look forward to", pos: "phrasal verb", def: "to feel happy and excited about something that is going to happen",
      ex: "I'm really looking forward to the wedding.", es: "tener muchas ganas de" }
  ],

  reading: {
    title: "Camila's love story",
    text: [
      "If you had told me five years ago that Camila would be the first of us to settle down, I would have laughed. Camila used to say that love was 'a waste of good dancing time'. Then she met Julián.",
      "They met at a Carnaval rehearsal. He played the drums in her dance group, and she fell for him the moment he missed a beat because he was staring at her. A week later, he asked her out. She turned him down, of course. 'I'm not going to make it easy for him,' she told us. He asked again, and this time she said yes.",
      "They got on with each other brilliantly from the start, although not everything was perfect. Julián is always late, and Camila talks all the way through films. They have both learnt to put up with each other's bad habits. Once, they split up for two whole days after an argument about pineapple on pizza. They made up when he appeared at her door with a homemade arepa de huevo.",
      "Last month, Julián proposed in the middle of a champeta party, with the whole dance floor watching. Camila cried, laughed and then made him dance before she gave him an answer. The wedding is in December, and I'm one of the bridesmaids.",
      "Meanwhile, Sofía has just broken up with her boyfriend, and Valentina says she has given up on love completely. Personally, I'm just looking forward to the party. If Julián's band plays at the reception, nobody will be sitting down all night."
    ]
  },

  grammar: {
    title: "Phrasal verbs: separable or not?",
    explain: [
      "A phrasal verb is a verb + a particle (up, down, out, for, with...). Together they often have a new meaning that you can't guess from the parts: 'fall for' has nothing to do with falling.",
      "Separable phrasal verbs can have the object after the particle or in the middle: 'He asked Camila out' / 'He asked out Camila'. But a pronoun (me, you, him, her, it, us, them) must go in the middle: 'He asked her out', never 'He asked out her'.",
      "Inseparable phrasal verbs always keep the verb and particle together: 'She fell for him', not 'She fell him for'. Phrasal verbs with two particles are always inseparable: 'put up with', 'get on with', 'look forward to'.",
      "Some phrasal verbs have no object at all: 'They broke up.' 'When will you settle down?' To mention the other person, add with: 'She broke up with him.' 'He made up with her.'",
      "In 'look forward to', 'to' is a preposition, so it is followed by a noun or -ing: 'I'm looking forward to seeing you.'"
    ],
    examples: [
      { en: "He asked her out. / He asked Camila out. / He asked out Camila.", note: "separable: a pronoun goes in the middle" },
      { en: "She turned the invitation down. / She turned it down.", note: "separable" },
      { en: "She fell for him straight away.", note: "inseparable" },
      { en: "I can't put up with his bad habits.", note: "three-part verb: always together" },
      { en: "Sofía has just broken up with her boyfriend.", note: "no object; add 'with' for the person" },
      { en: "I'm looking forward to dancing at the wedding.", note: "look forward to + -ing" }
    ],
    tip: "Spanish doesn't have phrasal verbs, so Colombians often choose formal one-word verbs: 'tolerate' instead of 'put up with', 'reconcile' instead of 'make up'. They are correct, but they sound stiff in conversation. The most common grammar mistake is the position of pronouns: 'He asked out me', 'She turned down it'. With separable verbs, the pronoun always goes in the middle: 'He asked me out', 'She turned it down'. Also, 'terminar con alguien' is 'break up with someone', never 'break with someone'."
  },

  exercises: [
    { kind: "tf", s: "Camila said yes the first time Julián asked her out.", answer: false,
      why: "'She turned him down, of course.' She only said yes the second time." },
    { kind: "choice", q: "Why did Camila and Julián split up for two days?",
      right: "They had an argument about pineapple on pizza.",
      wrong: ["He was late for a rehearsal.", "She talked all the way through a film."],
      why: "Lateness and talking during films are their bad habits, but the two-day split was about pineapple on pizza." },
    { kind: "tf", s: "Camila made Julián dance before she answered his proposal.", answer: true,
      why: "'Camila cried, laughed and then made him dance before she gave him an answer.'" },
    { kind: "choice", q: "Which sentence is correct?",
      right: "He asked her out.",
      wrong: ["He asked out her.", "He out asked her."],
      why: "'Ask out' is separable, and when the object is a pronoun (her), it must go between the verb and the particle." },
    { kind: "gap", text: "She got a job offer in Medellín, but she turned {gap}.",
      right: "it down",
      wrong: ["down it", "down", "it"],
      why: "'Turn down' needs an object, and because the object is a pronoun (it), it goes in the middle: turned it down." },
    { kind: "gap", text: "Her husband is so messy. I don't know how she puts {gap} him.",
      right: "up with",
      wrong: ["with up", "up to", "up"],
      why: "The phrasal verb is 'put up with' (= tolerate). It has two particles, so it's inseparable: puts up with him." },
    { kind: "choice", q: "Which sentence is NOT correct?",
      right: "She fell him for immediately.",
      wrong: ["She fell for him immediately.", "He turned the invitation down.", "He turned down the invitation."],
      why: "'Fall for' is inseparable, so the object always goes after 'for'. 'Turn down' is separable, so both positions are fine with a noun." },
    { kind: "type", text: "Do you get {gap} (particle) with your sister's new boyfriend?",
      answers: ["on", "along"],
      why: "'Get on with' and 'get along with' both mean to have a friendly relationship. 'Get on with' is especially common in British English." },
    { kind: "type", text: "Last year, Camila {gap} (fall for) a drummer.",
      answers: ["fell for"],
      why: "Only the verb changes tense: fall → fell. The particle 'for' stays the same." },
    { kind: "gap", text: "Valentina {gap} her boyfriend because he never put his phone down.",
      right: "broke up with",
      wrong: ["broke up", "split up", "made up with"],
      why: "'Break up' has no direct object, so to mention the person you need 'with': broke up with her boyfriend. 'Made up with' means they became friends again, which doesn't fit 'because he never put his phone down'." },
    { kind: "choice", q: "'After years of travelling, he wants to settle down.' He wants to...",
      right: "start a calmer life in one place, maybe with a partner.",
      wrong: ["end his relationship.", "travel to even more countries."],
      why: "Settle down = stop moving around and live a more stable life, often getting married or buying a home." },
    { kind: "match", q: "Match the phrasal verbs to their meanings.",
      pairs: [
        ["fall for", "start to love someone"],
        ["turn down", "say no to an offer or invitation"],
        ["get on with", "have a friendly relationship with"],
        ["make up", "become friends again after an argument"],
        ["put up with", "accept something annoying"]
      ] },
    { kind: "order", q: "Build the sentence.",
      words: ["I'm", "looking", "forward", "to", "meeting", "her", "new", "boyfriend."],
      why: "Look forward to + -ing: 'to' is a preposition here, so 'to meeting', not 'to meet'." },
    { kind: "listen", say: "They broke up last year, but now they are back together.",
      why: "'Broke up' is the past of 'break up' (end a relationship). 'Back together' is the opposite." }
  ],

  speak: [
    "Tell the story of how a couple you know (friends, family or a famous couple) met. Who asked who out?",
    "What bad habits could you put up with in a partner, and which ones would be a deal-breaker?",
    "Describe a wedding you've been to or would love to go to. What were you most looking forward to?"
  ],

  write: {
    prompt: "Write an email to a friend telling them the latest news about someone's love life (real or invented): how they met, who asked who out, any arguments, and what happens next. Use at least five different phrasal verbs, including one with a pronoun in the middle (for example 'turned him down').",
    min: 80,
    useWords: ["ask out", "fall for", "break up", "settle down"]
  }
});
