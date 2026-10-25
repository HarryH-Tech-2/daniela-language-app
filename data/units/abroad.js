(window.UNITS = window.UNITS || []).push({
  id: "abroad",
  stage: 2,
  order: 12,
  emoji: "🇬🇧",
  title: "Life abroad",
  topic: "Moving abroad",
  intro: "Your cousin Mariana has moved to London, and she has a lot to tell you about drizzle, queues and terrible coffee. You'll learn used to, would, be used to and get used to.",

  vocab: [
    { w: "queue", pos: "noun", def: "a line of people waiting for something",
      ex: "There was a long queue outside the bakery.", es: "fila, cola" },
    { w: "drizzle", pos: "verb", def: "to rain lightly, in very small drops",
      ex: "It drizzled all day, so I never knew if I needed an umbrella.", es: "lloviznar" },
    { w: "chilly", pos: "adjective", def: "cold enough to be unpleasant",
      ex: "It's a bit chilly this morning, so take a jacket.", es: "fresco, frío" },
    { w: "homesick", pos: "adjective", def: "sad because you are far from your home and family",
      ex: "I felt homesick when I heard my favourite salsa song.", es: "nostálgico (con nostalgia de casa)" },
    { w: "culture shock", pos: "noun", def: "the confused feeling you can have when you start living in a very different country",
      ex: "The culture shock was hardest in the first month.", es: "choque cultural" },
    { w: "small talk", pos: "noun", def: "polite conversation about unimportant things, such as the weather",
      ex: "British people are experts at small talk about the weather.", es: "charla trivial" },
    { w: "flatmate", pos: "noun", def: "a person you share a flat with",
      ex: "My flatmate is teaching me to make a proper cup of tea.", es: "compañero/a de piso" },
    { w: "apologise", pos: "verb", def: "to say sorry",
      ex: "He apologised even though I had stepped on his foot.", es: "pedir disculpas" },
    { w: "adjust", pos: "verb", def: "to slowly become familiar with a new situation",
      ex: "It took me a few months to adjust to the dark winters.", es: "adaptarse" },
    { w: "take some getting used to", pos: "phrase", def: "to be strange or difficult at first, until you become familiar with it",
      ex: "Driving on the left takes some getting used to.", es: "cuesta acostumbrarse" }
  ],

  reading: {
    title: "A letter from London",
    text: [
      "Querida Dani, I've been in London for six months now, and I promised to tell you everything. First, the weather. In Barranquilla, I used to complain when it was 'only' thirty degrees. Here, it's chilly even in June, and it doesn't really rain: it drizzles, quietly, all day, as if the sky were apologising.",
      "I'm still not used to the dark winters. At four o'clock it's already night! But I'm getting used to carrying an umbrella everywhere, and I've finally stopped wearing sandals in October. My flatmate, Emma, laughs at me because I wear a coat when she's in a T-shirt.",
      "The culture shock has been real. British people queue for everything: the bus, the coffee machine, even the toilets at a party. Once, I walked straight to the front of a queue without realising. Nobody said a word, but the silence was terrifying. People here also apologise constantly. Someone stepped on my foot yesterday, and I was the one who said sorry! Small talk about the weather takes some getting used to, but I'm getting better at it.",
      "Sometimes I miss home terribly. On Sundays, Grandma would make sancocho, and the whole family would sit on the patio arguing about football. I used to think those lunches were too long; now I'd give anything for one. When I feel homesick, I put on some Joe Arroyo and make arepas, which Emma says are 'life-changing'.",
      "Honestly, I'm adjusting slowly, and London is amazing. But please send coffee. I'm used to good Colombian coffee, and I refuse to get used to whatever they serve at my office. Besos, Mariana"
    ]
  },

  grammar: {
    title: "Used to, would, be used to, get used to",
    explain: [
      "Used to + infinitive talks about past habits and states that are no longer true: 'I used to live in Barranquilla.' Negative: didn't use to. Question: Did you use to...? There is no present form: for present habits, use usually.",
      "Would + infinitive can also describe repeated past actions, especially in memories and stories: 'Every Sunday, Grandma would make sancocho.' But it can't describe past states: 'I used to have a dog', not 'I would have a dog'.",
      "Be used to + noun or -ing means something is normal and familiar for you: 'I'm used to the heat.' 'I'm not used to queuing.'",
      "Get used to + noun or -ing describes the process of something becoming normal. It works in every tense: 'I'm getting used to it', 'I got used to it', 'You'll get used to it.'",
      "In be used to and get used to, 'to' is a preposition, so it is followed by -ing, not the infinitive: 'I'm used to getting up early.'"
    ],
    examples: [
      { en: "I used to complain when it was thirty degrees.", note: "past habit, not true now" },
      { en: "I didn't use to like tea, but now I love it.", note: "negative: didn't use to" },
      { en: "On Sundays, Grandma would make sancocho.", note: "would for a repeated past action" },
      { en: "I'm used to good coffee.", note: "be used to + noun = it's normal for me" },
      { en: "I'm getting used to carrying an umbrella.", note: "get used to + -ing = it's becoming normal" },
      { en: "You'll soon get used to the weather.", note: "get used to in the future" }
    ],
    tip: "Spanish 'soler' works in the present ('suelo ir al gimnasio'), so Colombians often say 'I use to go to the gym' for a present habit. In English, used to is only for the past: say 'I usually go to the gym.' And don't mix up the patterns: 'I'm used to get up early' is wrong, because after 'be/get used to' you need -ing: 'I'm used to getting up early.' Think of it like 'acostumbrarse a': 'estoy acostumbrada a madrugar' = 'I'm used to getting up early.'"
  },

  exercises: [
    { kind: "tf", s: "Mariana once walked to the front of a queue by mistake.", answer: true,
      why: "'Once, I walked straight to the front of a queue without realising.'" },
    { kind: "choice", q: "What does Emma think of Mariana's arepas?",
      right: "She thinks they're life-changing.",
      wrong: ["She thinks they're too heavy.", "She thinks they take some getting used to."],
      why: "'I make arepas, which Emma says are life-changing.'" },
    { kind: "tf", s: "Mariana has got used to the coffee at her office.", answer: false,
      why: "She says she refuses to get used to the coffee at her office." },
    { kind: "gap", text: "When I was a child, I {gap} spend every December at my grandparents' house.",
      right: "used to",
      wrong: ["was used to", "use to", "got used to"],
      why: "A past habit that has finished: used to + infinitive. 'Was used to' and 'got used to' would need -ing (spending), and 'use to' without -d is only for negatives and questions." },
    { kind: "gap", text: "I've lived in London for years, so I {gap} the cold weather now.",
      right: "am used to",
      wrong: ["used to", "am use to", "use to"],
      why: "The cold is normal for her now: be used to + noun. 'I used to the cold weather' has no verb, so it isn't a sentence." },
    { kind: "type", text: "It took me months to get used to {gap} (drive) on the left.",
      answers: ["driving"],
      why: "After get used to (and be used to), 'to' is a preposition, so the verb takes -ing." },
    { kind: "type", text: "I {gap} (not / use to) like tea, but now I drink three cups a day.",
      answers: ["didn't use to", "did not use to", "never used to"],
      why: "The negative is didn't use to: after did/didn't, the verb goes back to its base form, so 'use' has no -d. 'Never used to' is also correct." },
    { kind: "choice", q: "Which sentence is NOT correct?",
      right: "When I was little, I would have a dog called Toby.",
      wrong: ["When I was little, I used to have a dog called Toby.", "When I was little, my dad would take me to the beach every Sunday."],
      why: "Would is only for repeated past actions (like going to the beach), not for states like having a dog. For states, use used to." },
    { kind: "gap", text: "Don't worry about the food. You'll soon {gap} to it.",
      right: "get used",
      wrong: ["be use", "used", "use"],
      why: "Get used to describes the process of something becoming normal, and after will we need the base form: you'll get used to it." },
    { kind: "choice", q: "'I'm used to getting up early.' This means...",
      right: "getting up early is normal for me, so it isn't difficult.",
      wrong: ["I got up early in the past, but I don't any more.", "I'm trying to start getting up early."],
      why: "Be used to = something is familiar and normal. A finished past habit would be 'I used to get up early'." },
    { kind: "gap", text: "I felt really {gap} on my birthday, so I video-called my family in Barranquilla.",
      right: "homesick",
      wrong: ["chilly", "drizzle", "queue"],
      why: "Homesick = sad because you miss your home and family. 'Drizzle' and 'queue' aren't adjectives, and feeling chilly isn't a reason to call your family." },
    { kind: "match", q: "Match the words to their meanings.",
      pairs: [
        ["queue", "a line of people waiting"],
        ["drizzle", "rain lightly"],
        ["small talk", "polite conversation about unimportant things"],
        ["flatmate", "a person you share a flat with"],
        ["culture shock", "the confusion of living in a very different country"]
      ] },
    { kind: "order", q: "Build the sentence.",
      words: ["She", "is", "getting", "used", "to", "living", "in", "London."],
      why: "Get used to + -ing: living in London is slowly becoming normal for her." },
    { kind: "listen", say: "My grandmother would tell us stories every night before we went to bed.",
      why: "Would + infinitive for a repeated action in the past." }
  ],

  speak: [
    "What did you use to do as a child that you don't do any more? What would your family do on Sundays?",
    "Imagine you moved to London tomorrow. What do you think would be hardest to get used to? What would you miss most about Barranquilla?",
    "What are you so used to that you never think about it, but a foreign visitor might find strange?"
  ],

  write: {
    prompt: "Imagine you have been living abroad for six months. Write an email home describing what you used to do in Barranquilla, what you are getting used to in your new city, and what you will never get used to. Use used to, would, be used to and get used to at least once each.",
    min: 80,
    useWords: ["homesick", "queue", "culture shock", "adjust"]
  }
});
