(window.UNITS = window.UNITS || []).push({
  id: "native",
  stage: 4,
  order: 21,
  emoji: "🍔",
  title: "Sound like a native",
  topic: "Small talk",
  intro: "You're invited to a British barbecue! You'll learn the little words that make spoken English sound natural (mind you, I mean, anyway, fair enough), how to soften requests politely, and how to decode British understatement.",

  vocab: [
    { w: "mind you", pos: "phrase", def: "used to add a point that contrasts with or slightly changes what you just said",
      ex: "The flat is tiny. Mind you, it's right next to the beach.", es: "aunque, eso sí, claro que" },
    { w: "fair enough", pos: "phrase", def: "used to say that something seems reasonable, even if you don't completely agree",
      ex: "'I can't come, I'm working.' 'Fair enough. Next time, then.'", es: "vale, es razonable, entiendo" },
    { w: "I was wondering if", pos: "phrase", def: "a polite, indirect way to start a request",
      ex: "I was wondering if you could help me with my CV.", es: "me preguntaba si (podrías...)" },
    { w: "would you mind", pos: "phrase", def: "a polite way to ask someone to do something (+ -ing)",
      ex: "Would you mind passing the ketchup?", es: "¿te importaría...?" },
    { w: "a bit of a", pos: "phrase", def: "(British understatement) used to make something sound smaller than it really is",
      ex: "Getting home was a bit of a nightmare: three buses and no umbrella.", es: "un poco (aunque a menudo significa 'muy')" },
    { w: "not the end of the world", pos: "idiom", def: "not as serious or bad as it might seem",
      ex: "You missed the bus? It's not the end of the world; there's another in ten minutes.", es: "no es el fin del mundo" },
    { w: "pop", pos: "verb", def: "(informal, British) go somewhere quickly or for a short time",
      ex: "I'm just popping to the shop. Do you need anything?", es: "ir un momento, pasar rápido" },
    { w: "knackered", pos: "adjective", def: "(informal, British) extremely tired",
      ex: "After six hours of dancing at Carnaval, I was absolutely knackered.", es: "molido, rendido, muerto de cansancio" },
    { w: "put your foot in it", pos: "idiom", def: "accidentally say something that embarrasses or upsets someone",
      ex: "I really put my foot in it when I asked if she was his mum.", es: "meter la pata" },
    { w: "help yourself", pos: "phrase", def: "used to invite someone to take food or drink without asking",
      ex: "There's cake in the kitchen, so help yourself.", es: "sírvete (lo que quieras)" }
  ],

  reading: {
    title: "Barbecue weather",
    text: [
      "‘It's a bit nippy, isn't it?’ said Emily's dad, Graham, as I arrived at the barbecue. It was fourteen degrees and drizzling. In Barranquilla, that would count as a natural disaster; in Brighton, apparently, it's barbecue weather. ‘Lovely to meet you,’ he added. ‘Help yourself to a drink. There's beer, wine and some sort of pink thing Emily made.’",
      "I had been warned about British small talk, so I came prepared. I commented on the garden, the weather and the sausages, in that order. Then I risked a joke. ‘In Colombia,’ I said, ‘we'd call this weather winter.’ Graham laughed. ‘Fair enough,’ he said. ‘Mind you, this is our summer, so don't tell anyone.’",
      "The real lesson came later. Emily's aunt asked how I was finding England. ‘To be honest, the food has been a bit of a shock,’ I said, and immediately realised I'd put my foot in it: she had made the potato salad. ‘I mean, not this food,’ I added quickly. ‘This is lovely.’ She smiled. ‘Don't worry, love, it's not the end of the world. My potato salad is a bit of an acquired taste.’ That was when I understood British understatement: ‘a bit of a problem’ can mean a disaster, and ‘not bad at all’ can mean fantastic.",
      "I also noticed how much people softened their requests. Nobody said ‘Give me the ketchup.’ Instead it was ‘Would you mind passing the ketchup?’ or ‘I was wondering if you could pop inside and grab some more ice.’ When I finally asked Graham, very politely, whether I could take some leftover sausages home for Lola, my neighbour's dog, he looked delighted. ‘Of course! Anyway, you'd be doing us a favour. We've got enough for a week.’",
      "By ten o'clock I was knackered. Eight hours of being polite is harder than an entire Carnaval parade. As I left, Graham said, ‘You must come again.’ Emily whispered that, this time, he actually meant it."
    ]
  },

  grammar: {
    title: "Discourse markers, softening and understatement",
    explain: [
      "Discourse markers organise a conversation. Anyway: changes the subject or returns to the main point. Mind you: adds a contrasting point. I mean: clarifies or corrects what you just said. To be honest: introduces a frank opinion. Fair enough: accepts that something is reasonable.",
      "To soften a request, add distance with past forms and indirect questions: I was wondering if you could..., I wondered whether..., Could you possibly...? These sound much more polite than a direct question.",
      "'Would you mind' is followed by -ing: Would you mind closing the door? To ask permission, use 'Would you mind if I + past simple': Would you mind if I opened the window?",
      "Careful with the answer! 'Would you mind...?' literally asks 'Is it a problem for you?', so 'Not at all' or 'No, go ahead' means YES, you can. Answering 'Yes' means you object.",
      "British understatement: people often say less than they mean. 'A bit of a problem' = a big problem; 'not bad' = good; 'not ideal' = bad; 'I'm not sure that's the best idea' = that's a terrible idea."
    ],
    examples: [
      { en: "I was wondering if you could give me a lift to the station.", note: "past continuous makes the request softer" },
      { en: "Would you mind turning the music down a bit?", note: "would you mind + -ing" },
      { en: "Would you mind if I brought my friend? – Not at all!", note: "'Not at all' = yes, that's fine" },
      { en: "It's expensive. Mind you, the food is amazing.", note: "mind you adds a contrasting point" },
      { en: "She's a bit of a nightmare, I mean, she's lovely, but...", note: "I mean clarifies or corrects" },
      { en: "Anyway, enough about me. How was your holiday?", note: "anyway changes the subject" }
    ],
    tip: "In Colombia, 'Dame un tinto' or 'Pásame la sal' sounds perfectly normal, but a direct imperative like 'Give me the salt' can sound rude in British English. Soften it: 'Could you pass the salt?' or 'Would you mind passing the salt?'. Watch the form: it's 'Would you mind passing', never 'Would you mind to pass' (Spanish 'te importaría pasar' tempts you to use the infinitive). And if someone asks 'Do you mind if I sit here?', don't answer 'Yes!' to be friendly: 'Yes' means you DO mind. Say 'No, not at all' or 'No, go ahead'."
  },

  exercises: [
    { kind: "tf", s: "Emily's aunt had made the potato salad.", answer: true,
      why: "Daniela realised she had put her foot in it because the aunt 'had made the potato salad'." },
    { kind: "choice", q: "Why did Daniela feel she had 'put her foot in it'?",
      right: "She criticised the food without realising the aunt had cooked some of it.",
      wrong: ["She stepped in the potato salad by accident.", "She refused to try the pink drink Emily had made."],
      why: "'Put your foot in it' means saying something embarrassing by accident. She said the food had been 'a bit of a shock' to the woman who had made the potato salad." },
    { kind: "tf", s: "According to Emily, her dad didn't really mean it when he invited Daniela to come again.", answer: false,
      why: "Emily whispered that 'this time, he actually meant it', suggesting British people sometimes say this without meaning it, but not this time." },
    { kind: "gap", text: "Would you mind {gap} the window? It's freezing in here.", right: "closing",
      wrong: ["to close", "close", "closed"],
      why: "'Would you mind' is always followed by the -ing form: Would you mind closing...? 'To close' is a typical calque from Spanish." },
    { kind: "choice", q: "Your friend asks, 'Would you mind if I brought my dog?' You're happy for her to bring him. What do you say?",
      right: "Not at all, bring him along!", wrong: ["Yes, I would.", "Yes, I mind it."],
      why: "'Would you mind...?' asks whether it's a problem for you. 'Not at all' means no problem, so yes, bring him. 'Yes, I would' means you object." },
    { kind: "gap", text: "The flat is tiny. {gap}, it's right next to the beach, so I'm not complaining.", right: "Mind you",
      wrong: ["Fair enough", "As a result", "Would you mind"],
      why: "'Mind you' adds a point that contrasts with what came before (tiny, but next to the beach). 'As a result' would mean the beach is a consequence of the flat being tiny." },
    { kind: "type", text: "Would you mind {gap} (turn) the music down a little? The baby's asleep.", answers: ["turning"],
      why: "Would you mind + -ing. This is one of the most polite ways to ask someone to do something." },
    { kind: "type", text: "I was {gap} (wonder) if you could give me a lift to the station later.", answers: ["wondering"],
      why: "'I was wondering if...' uses the past continuous, not to talk about the past, but to make a request sound softer and less direct." },
    { kind: "match", q: "Match each discourse marker to what it does.", pairs: [
      ["anyway", "changes the subject or returns to the main point"],
      ["mind you", "adds a contrasting point"],
      ["I mean", "clarifies or corrects what you just said"],
      ["fair enough", "accepts that something is reasonable"],
      ["to be honest", "introduces a frank opinion"]
    ], why: "These tiny phrases carry no real information, but without them your English can sound like a textbook." },
    { kind: "choice", q: "A British colleague says your presentation was 'not bad at all'. What does she most likely mean?",
      right: "She thought it was good.", wrong: ["She thought it was terrible.", "She hasn't formed an opinion yet."],
      why: "British understatement: 'not bad at all' is real praise. Like 'a bit of a nightmare' (= a real nightmare), it says less than it means." },
    { kind: "choice", q: "Which is the most natural, polite way to ask someone at a dinner party for the salt?",
      right: "Sorry, would you mind passing the salt?",
      wrong: ["Give me the salt, please.", "I want the salt.", "Would you mind to pass the salt?"],
      why: "'Would you mind + -ing' is polite and natural. A direct imperative or 'I want' sounds rude, and 'mind to pass' is grammatically wrong." },
    { kind: "order", q: "Build a polite request.", words: ["I", "was", "wondering", "if", "you", "could", "help", "me."],
      why: "I was wondering + if + subject + could + verb. Notice there's no question order and no question mark: it's an indirect request." },
    { kind: "gap", text: "Oh no, I think I've just {gap}. I had no idea she was his ex-wife!", right: "put my foot in it",
      wrong: ["popped over", "helped myself", "minded you"],
      why: "'Put your foot in it' = say something embarrassing without realising. In Spanish: meter la pata." },
    { kind: "gap", text: "Could you {gap} to the shop and get some more ice? It'll only take five minutes.", right: "pop",
      wrong: ["knacker", "mind", "help"],
      why: "'Pop' (to the shop, over, round) is very common British English for going somewhere quickly." },
    { kind: "listen", say: "Mind you, it's not the end of the world.",
      why: "'Mind you' adds a contrasting thought, and 'it's not the end of the world' means the problem isn't that serious." }
  ],

  speak: [
    "You're at a British dinner party and someone asks, 'So, how are you finding England?' Answer with natural small talk, using 'to be honest' and 'mind you'.",
    "Make three polite requests to a host you've just met: ask to use the bathroom, ask for the Wi-Fi password and ask if you can bring a friend next time.",
    "Tell a story about a time you put your foot in it. What did you say, and how did you fix it?"
  ],

  write: {
    prompt: "Write a message to a friend about a party or dinner where you met new people. Describe one awkward moment and how you handled it. Make it sound like natural spoken English: include at least three discourse markers, one softened request and one example of understatement.",
    min: 120,
    useWords: ["mind you", "fair enough", "knackered", "put your foot in it", "a bit of a"]
  }
});
