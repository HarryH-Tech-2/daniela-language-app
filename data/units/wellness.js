(window.UNITS = window.UNITS || []).push({
  id: "wellness",
  stage: 2,
  order: 10,
  emoji: "🧘‍♀️",
  title: "Body & mind",
  topic: "Wellness",
  intro: "Goodbye gym, hello dance fitness! You'll learn when to use -ing and when to use to + infinitive, and why 'stop', 'remember' and 'try' change meaning.",

  vocab: [
    { w: "work out", pos: "phrasal verb", def: "to do physical exercise to get fitter and stronger",
      ex: "I try to work out three times a week.", es: "hacer ejercicio, entrenar" },
    { w: "get in shape", pos: "phrase", def: "to become fit and healthy",
      ex: "I want to get in shape before Carnaval.", es: "ponerse en forma" },
    { w: "stretch", pos: "verb", def: "to make your arms, legs or body as long as possible to relax your muscles",
      ex: "Always stretch before you start dancing.", es: "estirar" },
    { w: "sore", pos: "adjective", def: "painful, especially after a lot of exercise",
      ex: "My legs were sore for two days after the class.", es: "adolorido" },
    { w: "stamina", pos: "noun", def: "the physical energy to keep doing something for a long time",
      ex: "You need a lot of stamina to dance for six hours at Carnaval.", es: "resistencia, aguante" },
    { w: "hydrated", pos: "adjective", def: "having enough water in your body",
      ex: "In Barranquilla's heat, it's important to stay hydrated.", es: "hidratado" },
    { w: "cut down on", pos: "phrasal verb", def: "to eat, drink or do less of something",
      ex: "I'm trying to cut down on sugar.", es: "reducir, consumir menos" },
    { w: "unwind", pos: "verb", def: "to relax after a period of work or stress",
      ex: "Cooking is how I unwind after a long day.", es: "relajarse, desconectarse" },
    { w: "nap", pos: "noun", def: "a short sleep during the day",
      ex: "A twenty-minute nap after lunch changes my whole afternoon.", es: "siesta" },
    { w: "exhausted", pos: "adjective", def: "extremely tired",
      ex: "I was exhausted after the parade.", es: "agotado" }
  ],

  reading: {
    title: "Goodbye, treadmill",
    text: [
      "In January, like half of Barranquilla, I decided to get in shape. I joined a gym, promised to go every day and bought a very expensive pair of trainers. By February, I had stopped going. I just don't enjoy running on a machine while staring at a wall.",
      "Then Camila suggested trying a dance fitness class. I was nervous about joining, but from the first song I knew I had found my thing. It's basically salsa, champeta and reggaetón at full speed for an hour. You work out hard without noticing, because you're too busy having fun. The next morning, I was so sore that I couldn't get out of bed without groaning.",
      "Our teacher, Mauricio, is strict but funny. He makes us stretch before we start, and if anyone stops to check their phone, the whole class has to do ten squats. He also keeps reminding us to stay hydrated. Last week I forgot to bring my water bottle and had to buy one that cost more than the class.",
      "Dancing has changed more than my stamina. I've cut down on sugar, I've stopped scrolling on my phone in bed, and I try to be asleep by eleven. I remember feeling exhausted all the time last year; now I actually look forward to waking up. Well, most days.",
      "When work gets stressful, I've learnt to unwind instead of complaining. I tried meditating, but my mind kept wandering to what I was going to cook for dinner. So now I just put on some cumbia and dance around the kitchen. Lola, my neighbour's dog, seems to enjoy watching."
    ]
  },

  grammar: {
    title: "Gerunds and infinitives",
    explain: [
      "Some verbs are followed by -ing: enjoy, avoid, finish, mind, suggest, keep, give up, can't stand. 'I enjoy dancing.'",
      "Others are followed by to + infinitive: decide, want, hope, promise, agree, manage, learn, refuse. 'I decided to join a class.'",
      "After a preposition, always use -ing: nervous about joining, good at cooking, instead of complaining, before going to bed. Careful: in 'look forward to', 'to' is a preposition, so: 'I look forward to seeing you.'",
      "Some verbs change meaning. Stop doing = quit; stop to do = pause in order to do something. Remember/forget doing = a memory of the past; remember/forget to do = a task you need to do. Try doing = do it as an experiment; try to do = make an effort (it may be difficult).",
      "Use -ing when an action is the subject of a sentence: 'Dancing is my favourite exercise.'"
    ],
    examples: [
      { en: "I don't enjoy running on a machine.", note: "enjoy + -ing" },
      { en: "I decided to get in shape.", note: "decide + to + infinitive" },
      { en: "I've stopped scrolling on my phone in bed.", note: "stop + -ing = quit" },
      { en: "He stopped to check his phone.", note: "stop + to = pause in order to" },
      { en: "I remember feeling exhausted last year. / Remember to bring water!", note: "a memory vs a task" },
      { en: "I tried meditating, but it didn't work for me.", note: "try + -ing = an experiment" }
    ],
    tip: "In Spanish, the infinitive does everything: 'Bailar es mi pasión', 'antes de dormir', 'gracias por venir'. So Colombians often say 'Dance is my passion' (for the activity), 'before to sleep' or 'thanks for come'. In English, use -ing as the subject and after every preposition: 'Dancing is my passion', 'before sleeping / before I sleep', 'thanks for coming'. The classic email mistake is 'I look forward to hear from you': it should be 'I look forward to hearing from you'."
  },

  exercises: [
    { kind: "tf", s: "Daniela still goes to the gym every day.", answer: false,
      why: "'By February, I had stopped going.' She does a dance fitness class now." },
    { kind: "choice", q: "What happens if someone stops to check their phone in Mauricio's class?",
      right: "The whole class has to do ten squats.",
      wrong: ["That person has to leave the class.", "Mauricio takes the phone away."],
      why: "'If anyone stops to check their phone, the whole class has to do ten squats.'" },
    { kind: "tf", s: "Mauricio often reminds his students to drink water.", answer: true,
      why: "'He also keeps reminding us to stay hydrated.'" },
    { kind: "gap", text: "I really enjoy {gap} to cumbia while I cook.",
      right: "dancing",
      wrong: ["to dance", "dance", "danced"],
      why: "Enjoy is always followed by -ing, never by an infinitive." },
    { kind: "gap", text: "We've decided {gap} a salsa class together on Thursdays.",
      right: "to take",
      wrong: ["taking", "take", "to taking"],
      why: "Decide is followed by to + infinitive: decide to do something." },
    { kind: "type", text: "I'm really looking forward to {gap} (see) you at Carnaval.",
      answers: ["seeing"],
      why: "In 'look forward to', 'to' is a preposition, and prepositions are followed by -ing." },
    { kind: "type", text: "Did you remember {gap} (bring) your water bottle today?",
      answers: ["to bring"],
      why: "Remember to do = remember a task before you do it. 'Remember doing' is for memories of things you did in the past." },
    { kind: "gap", text: "Mauricio was really thirsty, so halfway through the class he stopped {gap} some water.",
      right: "to drink",
      wrong: ["drinking", "drink", "to drinking"],
      why: "Stop to do = pause one activity in order to do another. 'He stopped drinking' would mean he quit drinking, which is the opposite of what a thirsty person does!" },
    { kind: "choice", q: "'I've stopped eating sugar.' What does this mean?",
      right: "I don't eat sugar any more.",
      wrong: ["I paused what I was doing so that I could eat sugar.", "I tried to eat sugar, but I couldn't."],
      why: "Stop + -ing means you quit a habit. To pause in order to eat sugar, you'd say 'I stopped to eat some sugar'." },
    { kind: "choice", q: "'I tried meditating, but my mind kept wandering.' What does 'tried meditating' mean here?",
      right: "She meditated as an experiment, to see if it would help.",
      wrong: ["She wanted to meditate, but she never actually started.", "She meditated successfully for many years."],
      why: "Try + -ing = do something as an experiment to see what happens. 'Try to do' focuses on making an effort to do something difficult." },
    { kind: "gap", text: "After my first dance class, my legs were so {gap} that I could hardly walk up the stairs.",
      right: "sore",
      wrong: ["hydrated", "stamina", "unwind"],
      why: "Sore = painful after exercise. 'Stamina' is a noun and 'unwind' is a verb, so neither fits after 'so'." },
    { kind: "match", q: "Match the words to their meanings.",
      pairs: [
        ["unwind", "relax after work or stress"],
        ["stamina", "energy to keep going for a long time"],
        ["cut down on", "eat, drink or do less of something"],
        ["work out", "do physical exercise"],
        ["nap", "a short sleep during the day"]
      ] },
    { kind: "order", q: "Build the sentence.",
      words: ["She", "is", "good", "at", "cooking", "healthy", "meals."],
      why: "After the preposition 'at', we use -ing: good at cooking." },
    { kind: "listen", say: "I'm thinking about joining a dance class instead of going to the gym.",
      why: "Two prepositions (about, instead of), both followed by -ing." }
  ],

  speak: [
    "What do you enjoy doing to stay fit? Is there any exercise you can't stand doing?",
    "Talk about a healthy habit you have stopped, started or tried. What happened?",
    "How do you unwind after a stressful day? Describe your perfect evening."
  ],

  write: {
    prompt: "Write a message to a friend persuading them to join a dance class with you. Explain what you enjoy about it, what you've stopped or started doing since you began, and what you're looking forward to. Use at least three verbs + -ing, two verbs + to + infinitive and one preposition + -ing.",
    min: 80,
    useWords: ["work out", "stamina", "sore", "unwind"]
  }
});
