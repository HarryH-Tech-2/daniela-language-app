(window.UNITS = window.UNITS || []).push({
  id: "dogs",
  stage: 1,
  order: 4,
  emoji: "🐶",
  title: "Puppy school",
  topic: "Dogs",
  intro: "Lola, the most stubborn beagle in Barranquilla, is going to school, and you're taking her. You'll learn how to talk about rules and give advice with must, have to, mustn't, don't have to, should and ought to.",

  vocab: [
    { w: "lead", pos: "noun", def: "a long strap you attach to a dog's collar to walk it (American English: leash)", ex: "Lola pulls so hard on her lead that my arm hurts.", es: "correa (del perro)" },
    { w: "treat", pos: "noun", def: "a small piece of special food you give an animal as a reward", ex: "She'll do anything for a treat.", es: "premio, golosina" },
    { w: "obedient", pos: "adjective", def: "doing what you are told to do", ex: "After four classes, Lola was much more obedient.", es: "obediente" },
    { w: "bark", pos: "verb", def: "to make the short, loud sound that dogs make", ex: "Lola barks at every motorbike in the street.", es: "ladrar" },
    { w: "reward", pos: "verb", def: "to give someone something good because they did something well", ex: "Reward your dog as soon as it sits.", es: "premiar, recompensar" },
    { w: "trainer", pos: "noun", def: "a person whose job is to teach people or animals a skill", ex: "Our trainer has worked with dogs for twenty years.", es: "entrenador, adiestrador" },
    { w: "behave", pos: "verb", def: "to act in a particular way, especially in a good or polite way", ex: "Lola behaves much better when she's tired.", es: "portarse, comportarse" },
    { w: "sniff", pos: "verb", def: "to smell something by taking short breaths through the nose", ex: "Dogs love sniffing every tree in the park.", es: "olfatear, husmear" },
    { w: "stubborn", pos: "adjective", def: "refusing to change what you think or do", ex: "Beagles are clever but very stubborn.", es: "terco, testarudo" },
    { w: "patient", pos: "adjective", def: "able to wait or deal with problems calmly, without getting angry", ex: "You have to be patient with puppies.", es: "paciente" }
  ],

  reading: {
    title: "Lola goes to school",
    text: [
      "My neighbour, Doña Marta, has a beagle called Lola. Lola is adorable, but she is also the most stubborn dog in Barranquilla. She barks at motorbikes, steals socks and pulls so hard on her lead that walking her feels like water-skiing. So when Doña Marta had to travel to Bogotá for a month, she asked me a favour: 'You have to take Lola to puppy school on Saturdays.'",
      "The trainer, a tall woman called Paola, explained the rules on the first day. 'You must bring treats to every class, and you mustn't feed the dogs before the lesson, because a hungry dog learns faster. You don't have to buy an expensive lead. A cheap one is fine.' Then she looked at Lola, who was sniffing another dog's bottom, and added, 'And you should be very patient.'",
      "The first class was a disaster. Lola wouldn't sit, wouldn't come, and ate a whole bag of treats in thirty seconds. Paola gave me some advice: 'You ought to reward her the moment she does something right, not five seconds later. Dogs live in the present.'",
      "By the fourth week, Lola could sit, wait and walk next to me without pulling. She still barks at motorbikes (nobody's perfect), but she behaves much better. When Doña Marta came back, she couldn't believe it. 'What did you do to my dog? She's so obedient!' I just smiled. She doesn't need to know about the socks under my bed."
    ]
  },

  grammar: {
    title: "Obligation and advice: must, have to, should",
    explain: [
      "Must and have to both express strong obligation. Must often shows the speaker's own feeling or rule (I must call my mum); have to often shows a rule from outside (We have to wear a seatbelt). For the past, use had to for both.",
      "Mustn't means it is not allowed: don't do it! Don't have to means it isn't necessary: you can do it if you want, but you don't need to.",
      "Should and ought to give advice: it's a good idea. They mean the same, but ought to is a little more formal and much less common in questions and negatives.",
      "After must and should, use the verb without 'to': You must bring treats. You should be patient. But remember: have to and ought to always include 'to'."
    ],
    examples: [
      { en: "You must bring treats to every class.", note: "strong obligation (the trainer's rule)" },
      { en: "You mustn't feed the dogs before the lesson.", note: "prohibition: it's not allowed" },
      { en: "You don't have to buy an expensive lead.", note: "no obligation: it isn't necessary" },
      { en: "You should be very patient with her.", note: "advice" },
      { en: "You ought to reward her immediately.", note: "advice, a little more formal" },
      { en: "Last week I had to take Lola to the vet.", note: "past obligation: had to (never 'musted')" }
    ],
    tip: "The biggest trap for Spanish speakers: 'mustn't' does NOT mean 'no tener que'. 'No tienes que comprar una correa cara' is 'You don't have to buy an expensive lead'. If you say 'You mustn't buy an expensive lead', it means buying one is forbidden! Also, never say 'must to' or 'musted': it's 'You must go' and, in the past, 'I had to go'."
  },

  exercises: [
    { kind: "tf", s: "Lola pulled on her lead before she started the classes.", answer: true,
      why: "The story says she 'pulls so hard on her lead that walking her feels like water-skiing'. By the fourth week she could walk without pulling." },
    { kind: "choice", q: "What did Paola say about the lead?",
      right: "Daniela didn't need to buy an expensive one.",
      wrong: ["Daniela had to buy an expensive one.", "Dogs mustn't wear a lead in class."],
      why: "Paola said: 'You don't have to buy an expensive lead. A cheap one is fine.' 'Don't have to' = it isn't necessary." },
    { kind: "gap", text: "You {gap} feed the dogs before class. A hungry dog learns faster.",
      right: "mustn't", wrong: ["don't have to", "must"],
      why: "It's a rule: feeding them is not allowed, so we use 'mustn't'. 'Don't have to' would mean feeding them is optional, which isn't what the trainer means." },
    { kind: "gap", text: "You {gap} buy an expensive lead. A cheap one is fine.",
      right: "don't have to", wrong: ["mustn't", "have to"],
      why: "An expensive lead isn't necessary, but it isn't forbidden either, so we use 'don't have to'. 'Mustn't' would mean you're not allowed to buy one." },
    { kind: "gap", text: "Lola is so stubborn. I think you {gap} be more patient with her.",
      right: "should", wrong: ["ought", "don't have to", "mustn't"],
      why: "This is advice, so we use 'should'. 'Ought' needs 'to' ('ought to be'), so 'ought be' is wrong." },
    { kind: "choice", q: "Yesterday I ___ take Lola to the vet.",
      right: "had to",
      wrong: ["must", "musted"],
      why: "'Must' has no past form. For obligation in the past, use 'had to'. 'Musted' doesn't exist." },
    { kind: "type", text: "You {gap} (not / have to) come every week, but it really helps.",
      answers: ["don't have to", "do not have to"],
      why: "Coming every week isn't necessary, so we use 'don't have to'. Remember that 'have to' makes its negative with 'don't', like a normal verb." },
    { kind: "type", text: "Paola said: 'You {gap} (ought) reward her the moment she does something right.'",
      answers: ["ought to"],
      why: "'Ought' is always followed by 'to': 'You ought to reward her'. It means the same as 'should'." },
    { kind: "order", q: "Build the sentence.",
      words: ["You", "should", "bring", "some", "treats", "to", "every", "class."],
      why: "'Should' + the verb without 'to': 'should bring', never 'should to bring'." },
    { kind: "match", q: "Match the words to their meanings.",
      pairs: [
        ["bark", "make the loud sound a dog makes"],
        ["sniff", "smell with short breaths"],
        ["treat", "a small piece of food given as a reward"],
        ["lead", "a strap for walking a dog"],
        ["stubborn", "refusing to change what you do"]
      ] },
    { kind: "gap", text: "After four weeks, Lola was much more {gap}. She sat as soon as I asked.",
      right: "obedient", wrong: ["stubborn", "noisy"],
      why: "'Obedient' means doing what you are told. A stubborn dog refuses to do what you ask, and 'noisy' has nothing to do with sitting." },
    { kind: "listen", say: "You don't have to buy an expensive lead for your dog.",
      why: "'Don't have to' = it isn't necessary. In British English the strap for walking a dog is a 'lead'; Americans say 'leash'." },
    { kind: "choice", q: "Which sentence means 'it is not allowed'?",
      right: "You mustn't let her off the lead in the park.",
      wrong: ["You don't have to let her off the lead in the park.", "You ought to let her off the lead in the park."],
      why: "'Mustn't' expresses prohibition. 'Don't have to' means it isn't necessary, and 'ought to' is advice to do it." },
    { kind: "tf", s: "Lola stopped barking at motorbikes completely.", answer: false,
      why: "'She still barks at motorbikes (nobody's perfect).' 'Still' tells us it hasn't stopped." }
  ],

  speak: [
    "Imagine a friend is getting a puppy. What should they do in the first week? What mustn't they do?",
    "What rules did you have to follow at home when you were a child? Which ones do you think were unfair?",
    "In your job or studies, what do you have to do every day, and what don't you have to do?"
  ],

  write: {
    prompt: "Doña Marta is going away again, and this time a friend is looking after Lola. Write a note with Lola's rules: what your friend must and mustn't do, what they don't have to worry about, and some advice with should or ought to.",
    min: 60,
    useWords: ["lead", "treat", "bark", "stubborn", "patient"]
  }
});
