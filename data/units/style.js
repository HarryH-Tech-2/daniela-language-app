(window.UNITS = window.UNITS || []).push({
  id: "style",
  stage: 2,
  order: 9,
  emoji: "👗",
  title: "Style & beauty",
  topic: "Fashion",
  intro: "A shopping trip, a skincare routine and a party to get ready for. You'll learn relative clauses with who, which, that, whose and where, and when you can leave the pronoun out.",

  vocab: [
    { w: "outfit", pos: "noun", def: "a set of clothes that you wear together",
      ex: "I need a new outfit for Valentina's party.", es: "conjunto, look" },
    { w: "flattering", pos: "adjective", def: "making you look more attractive",
      ex: "That colour is really flattering on you.", es: "favorecedor" },
    { w: "trendy", pos: "adjective", def: "fashionable at the moment",
      ex: "She always knows the trendiest cafés in town.", es: "de moda" },
    { w: "bargain", pos: "noun", def: "something you buy for much less than its usual price",
      ex: "These sandals were half price. What a bargain!", es: "ganga, chollo" },
    { w: "fitting room", pos: "noun", def: "a small room in a shop where you try clothes on",
      ex: "There was a long queue for the fitting room.", es: "probador" },
    { w: "skincare routine", pos: "noun", def: "the products you use on your face, in order, every day",
      ex: "My skincare routine takes ten minutes every night.", es: "rutina de cuidado de la piel" },
    { w: "moisturiser", pos: "noun", def: "a cream that stops your skin from getting dry",
      ex: "In this heat, I use a very light moisturiser.", es: "crema hidratante" },
    { w: "hairdresser", pos: "noun", def: "a person whose job is to cut, colour and style hair",
      ex: "My hairdresser always knows the latest gossip.", es: "peluquero/a" },
    { w: "heels", pos: "noun", def: "shoes with a high part under the back of the foot",
      ex: "I can dance salsa in heels, but not for five hours.", es: "tacones" },
    { w: "dress up", pos: "phrasal verb", def: "to put on smarter or more elegant clothes than usual",
      ex: "Do we need to dress up for the party, or is it casual?", es: "arreglarse, vestirse elegante" }
  ],

  reading: {
    title: "Nothing to wear",
    text: [
      "Valentina's birthday party was on Saturday, and I had nothing to wear. Well, I had a wardrobe full of clothes, but nothing in it was the dress I had imagined. So on Thursday, Sofía, who has the best taste of anyone I know, came shopping with me.",
      "We went to Buenavista, the shopping centre where we spent every weekend as teenagers. In the first shop, I tried on a yellow dress which made me look like a giant mango. Sofía laughed so much that the shop assistant, whose name was Marta, had to bring her a glass of water. In the second shop, I found a green dress that was perfect: elegant, flattering and, best of all, half price. A real bargain!",
      "On Saturday afternoon, I followed the skincare routine my cousin swears by: cleanser, serum and a moisturiser that smells of coconut. Then I went to the salon on my street, where Doña Rosa, the hairdresser who has been doing my hair since I was eight, gave me a blow-dry that could survive any Barranquilla breeze.",
      "The only problem was the shoes. The heels I wanted to wear were the ones that Lola, my neighbour's dog, had chewed last month. In the end, I wore a pair of gold sandals which I had bought for Carnaval, and nobody noticed.",
      "At the party, a woman whose daughter is a fashion designer asked me where I had bought my dress. I just smiled and said, 'It's a secret.' Sofía, who knew it had cost me less than a pizza, nearly choked on her drink."
    ]
  },

  grammar: {
    title: "Relative clauses",
    explain: [
      "Defining relative clauses tell us which person or thing we mean. Without them, the sentence is incomplete. No commas: 'The dress that I bought is green.'",
      "Non-defining relative clauses add extra information about someone or something we have already identified. They go between commas, and you can't use that: 'Sofía, who has great taste, came with me.'",
      "Use who for people, which for things, that for people or things (only in defining clauses), whose for possession (= cuyo), and where for places.",
      "In defining clauses, you can leave out who, which or that when it is the object of the verb: 'the dress (that) I bought'. You can't leave it out when it is the subject: 'the dress that suits me'. In non-defining clauses, you can never leave it out."
    ],
    examples: [
      { en: "The dress that I bought was half price.", note: "defining; 'that' could be left out" },
      { en: "I found a dress that was perfect.", note: "defining; 'that' is the subject, so it must stay" },
      { en: "Doña Rosa, who has been doing my hair for years, is a genius.", note: "non-defining: commas, no 'that'" },
      { en: "A woman whose daughter is a designer liked my dress.", note: "whose = possession" },
      { en: "That's the salon where I get my hair done.", note: "where for places" },
      { en: "The sandals I wore were gold.", note: "object pronoun left out" }
    ],
    tip: "In Spanish, 'que' does every job, so Colombians often write 'the girl which...' or use 'that' after a comma ('My sister, that lives in London...'). Remember: people = who, and never that after a comma. Another very common mistake is repeating the object: 'the dress that I bought it'. The relative pronoun already replaces 'it', so just say 'the dress (that) I bought'. And careful: 'cuyo' is whose, not who's (= who is)."
  },

  exercises: [
    { kind: "tf", s: "Daniela bought the yellow dress because Sofía loved it.", answer: false,
      why: "The yellow dress made her look 'like a giant mango'. She bought the green dress in the second shop." },
    { kind: "choice", q: "Why didn't Daniela wear the heels she wanted?",
      right: "Lola, her neighbour's dog, had chewed them.",
      wrong: ["They didn't go with the green dress.", "Sofía said they weren't flattering."],
      why: "'The heels I wanted to wear were the ones that Lola, my neighbour's dog, had chewed last month.'" },
    { kind: "tf", s: "Daniela's hairdresser has known her since she was a child.", answer: true,
      why: "Doña Rosa 'has been doing my hair since I was eight'." },
    { kind: "gap", text: "Sofía, {gap} has amazing taste, helped me choose.",
      right: "who",
      wrong: ["that", "which", "whose"],
      why: "This is a non-defining clause (between commas) about a person, so we need who. 'That' is never used after a comma." },
    { kind: "gap", text: "That's the salon {gap} I always get my hair done.",
      right: "where",
      wrong: ["which", "who", "whose"],
      why: "Where = in which place. 'The salon which I get my hair done' is wrong because it is missing 'in': 'the salon which I get my hair done in'." },
    { kind: "gap", text: "I've got a friend {gap} sister is a make-up artist.",
      right: "whose",
      wrong: ["who's", "who", "that"],
      why: "Whose shows possession: her sister → whose sister. 'Who's' sounds the same but means 'who is'." },
    { kind: "type", text: "This is the moisturiser {gap} (relative pronoun) smells of coconut.",
      answers: ["that", "which"],
      why: "A defining clause about a thing: that or which. The pronoun is the subject of 'smells', so you can't leave it out." },
    { kind: "type", text: "Barranquilla is the city {gap} (relative pronoun) I was born.",
      answers: ["where", "in which"],
      why: "For places, use where. 'In which' is also correct but more formal. Without a preposition at the end, 'which' or 'that' alone is wrong." },
    { kind: "choice", q: "In which sentence can you leave out the relative pronoun?",
      right: "The shoes that I bought yesterday are too small.",
      wrong: ["The shoes that hurt my feet are new.", "My sandals, which I bought for Carnaval, are gold."],
      why: "In the first sentence, 'that' is the object (I bought the shoes), so 'The shoes I bought yesterday' is fine. In the second, 'that' is the subject (the shoes hurt). In the third, it's a non-defining clause, so the pronoun must stay." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "The dress I tried on was too big.",
      wrong: ["The dress I tried it on was too big.", "The dress what I tried on was too big."],
      why: "Don't repeat 'it': the (hidden) relative pronoun already refers to the dress. 'What' is never a relative pronoun after a noun." },
    { kind: "gap", text: "That colour is really {gap} on you. It brings out your eyes.",
      right: "flattering",
      wrong: ["bargain", "outfit", "fitting"],
      why: "Flattering = it makes you look more attractive. We often say something is 'flattering on you'." },
    { kind: "match", q: "Match the words to their meanings.",
      pairs: [
        ["bargain", "something bought for much less than usual"],
        ["hairdresser", "a person whose job is to style hair"],
        ["fitting room", "where you try on clothes in a shop"],
        ["moisturiser", "a cream that stops skin getting dry"],
        ["outfit", "a set of clothes worn together"]
      ] },
    { kind: "order", q: "Build the sentence.",
      words: ["My", "sister,", "who", "lives", "in", "London,", "loves", "vintage", "clothes."],
      why: "A non-defining clause sits between commas, straight after the person it describes." },
    { kind: "listen", say: "The shoes that I wanted to wear had been chewed by the dog.",
      why: "'That I wanted to wear' is a defining clause: it tells us which shoes." }
  ],

  speak: [
    "Describe your favourite outfit. Where did you buy it, and when do you wear it? Use at least two relative clauses.",
    "Talk about a shop, salon or market in Barranquilla where you love to go. What makes it special?",
    "Describe a person whose style you admire. What do they wear that you love?"
  ],

  write: {
    prompt: "Write about getting ready for a special event: a wedding, a graduation or a night out at Carnaval. Describe the outfit you chose, the place where you bought it and the people who helped you. Use at least four relative clauses, including one with whose or where.",
    min: 80,
    useWords: ["outfit", "flattering", "bargain", "dress up"]
  }
});
