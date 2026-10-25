(window.UNITS = window.UNITS || []).push({
  id: "mystery",
  stage: 3,
  order: 14,
  emoji: "🕵️‍♀️",
  title: "Who ate the empanadas?",
  topic: "Mystery",
  intro: "Fifty empanadas have vanished from Grandma's birthday party, and you're the detective. You'll learn to make deductions about the present and the past with must, might, could and can't.",

  vocab: [
    { w: "clue", pos: "noun", def: "a piece of information that helps you solve a mystery",
      ex: "The tiny footprints were the most important clue.", es: "pista" },
    { w: "alibi", pos: "noun", def: "proof that you were somewhere else when something happened",
      ex: "Andrés had a perfect alibi: twenty people saw him dancing.", es: "coartada" },
    { w: "suspect", pos: "noun", def: "a person who might have done something wrong (stress on the first syllable: SUS-pect)",
      ex: "The first suspect was my cousin Andrés.", es: "sospechoso / sospechosa" },
    { w: "footprint", pos: "noun", def: "a mark left on the ground by a foot or a shoe",
      ex: "There were tiny footprints in the ají sauce.", es: "huella" },
    { w: "crumb", pos: "noun", def: "a very small piece of bread, cake or pastry",
      ex: "There was a crumb on Lola's nose.", es: "miga / migaja" },
    { w: "culprit", pos: "noun", def: "the person (or animal!) who did something wrong",
      ex: "The culprit wasn't a thief at all.", es: "culpable" },
    { w: "guilty", pos: "adjective", def: "responsible for doing something wrong",
      ex: "Lola was definitely guilty of stealing one.", es: "culpable" },
    { w: "sneak", pos: "verb", def: "to go somewhere quietly and secretly so that nobody sees you",
      ex: "Someone must have sneaked into the kitchen.", es: "colarse / meterse a escondidas" },
    { w: "deny", pos: "verb", def: "to say that something is not true, especially that you did something",
      ex: "Sofía denied everything.", es: "negar" },
    { w: "give away", pos: "phrasal verb", def: "to show something that someone is trying to hide",
      ex: "Lola's guilty face always gives her away.", es: "delatar" }
  ],

  reading: {
    title: "The case of the vanishing empanadas",
    text: [
      "It was my grandmother's eightieth birthday, and the whole family was squeezed into her house in Barrio Abajo. My aunt Marta had made fifty empanadas and left them on the kitchen table to cool. At nine o'clock she went to get them. The plate was empty. Only a few crumbs remained. 'Somebody,' she announced, turning off the music, 'is going to confess.'",
      "Naturally, I took charge of the investigation. 'Someone must have sneaked into the kitchen while we were dancing,' I said. The first suspect was my cousin Andrés, who eats like three people. But he had a perfect alibi: he had been dancing champeta in the living room all evening, and twenty people had seen him. 'It can't have been Andrés,' I declared. 'He never left the dance floor.'",
      "Next was my cousin Sofía, who had arrived late with a suspicious smile. She denied everything and swore she was vegan now. 'She might be lying,' whispered Uncle Rafa, 'but she can't have eaten fifty empanadas in ten minutes. Nobody could.' Then I found the real clue: tiny footprints in ají sauce leading from the kitchen to the patio. They were far too small for a person. They must have belonged to someone with four legs.",
      "Everyone turned to look at Lola, our neighbour's dog, who comes to every party without an invitation. She was lying under the table, licking her lips, with a crumb on her nose. 'Lola must have eaten them!' cried Aunt Marta. But something didn't make sense. Lola is a very small dog. She could have eaten one or two, but fifty? She might be greedy, but she isn't a magician.",
      "At that moment, Grandma walked in from the patio, looking very innocent. 'Are you looking for the empanadas?' she asked. 'I hid them in the oven. You lot would have eaten them all before the cake.' So the culprit wasn't a thief at all, just a very clever grandmother. Lola, however, was definitely guilty of stealing one. Her face gave her away."
    ]
  },

  grammar: {
    title: "Modals of deduction: present and past",
    explain: [
      "must + infinitive = I'm sure it's true. can't + infinitive = I'm sure it isn't true.",
      "might, may or could + infinitive = it's possible, but I'm not sure.",
      "For the past, add have + past participle: must have eaten, can't / couldn't have eaten, might / may / could have eaten.",
      "For something in progress, use be + -ing: She might be lying. He must have been dancing.",
      "The opposite of must (deduction) is can't, not mustn't. Mustn't means something is forbidden."
    ],
    examples: [
      { en: "Someone must have sneaked into the kitchen.", note: "must have + past participle: I'm sure it happened" },
      { en: "It can't have been Andrés. He never left the dance floor.", note: "can't have: I'm sure it didn't happen" },
      { en: "She might be lying.", note: "might be + -ing: possibly happening now" },
      { en: "Lola could have eaten one or two.", note: "could have: it's possible that it happened" },
      { en: "You must be joking!", note: "must + infinitive: I'm sure (present)" }
    ],
    tip: "Spanish 'puede ser que' tempts you to say 'It can be Sofía'. For a possibility about one specific situation, use might, may or could: 'It could be Sofía.' The opposite of must is can't, not mustn't: 'It can't be Lola' (I'm sure it isn't), but 'You mustn't feed Lola' (it's forbidden). And for the past, don't forget have: 'She must have eaten them', not 'She must ate them' or 'She must to eat them'."
  },

  exercises: [
    { kind: "choice", q: "Why couldn't Andrés be the thief?",
      right: "Lots of people saw him dancing all evening.",
      wrong: ["He was on a diet.", "He arrived after nine o'clock.", "He was asleep in a hammock."],
      why: "His alibi: he had been dancing champeta all evening, and twenty people had seen him." },
    { kind: "tf", s: "Lola ate all fifty empanadas.", answer: false,
      why: "Lola only stole one. Grandma had hidden the rest in the oven." },
    { kind: "tf", s: "Grandma hid the empanadas so that nobody would eat them before the cake.", answer: true,
      why: "'I hid them in the oven. You lot would have eaten them all before the cake.'" },
    { kind: "gap", text: "Andrés was dancing all night, so he {gap} eaten them.",
      right: "can't have", wrong: ["must have", "can't", "should have"],
      why: "You're sure it didn't happen in the past: can't have + past participle. 'Can't eaten' is missing have." },
    { kind: "gap", text: "There's a crumb on Lola's nose. She {gap} eaten at least one.",
      right: "must have", wrong: ["can't have", "must", "might not have"],
      why: "The crumb makes you sure: must have + past participle." },
    { kind: "choice", q: "You are sure that Sofía is NOT at home. Which sentence is correct?",
      right: "She can't be at home.",
      wrong: ["She mustn't be at home.", "She might not be at home.", "She doesn't have to be at home."],
      why: "Can't is the opposite of must for deductions. 'Mustn't' means it's forbidden, and 'might not' only means it's possible." },
    { kind: "type", text: "Sofía arrived late. She {gap} (might / get) lost on the way.",
      answers: ["might have got", "might've got", "might have gotten", "might've gotten"],
      why: "A possible explanation for the past: might have + past participle. British English says got; American English says gotten." },
    { kind: "type", text: "Whose are these tiny footprints? They {gap} (must / be) Lola's.",
      answers: ["must be"],
      why: "A present deduction ('Whose are...?'): must + infinitive." },
    { kind: "gap", text: "Andrés isn't answering his phone. He {gap} still.",
      right: "must be dancing", wrong: ["must dance", "must have danced", "can dance"],
      why: "A deduction about something in progress now: must be + -ing. 'Must dance' sounds like an obligation." },
    { kind: "gap", text: "Fifty empanadas in ten minutes? Impossible! A small dog {gap} eaten them all.",
      right: "couldn't have", wrong: ["could have", "must have", "couldn't"],
      why: "You're sure it was impossible in the past: couldn't have (or can't have) + past participle." },
    { kind: "gap", text: "Andrés had a perfect {gap}: twenty people saw him dancing.",
      right: "alibi", wrong: ["clue", "culprit", "footprint"],
      why: "An alibi is proof that you were somewhere else when something happened." },
    { kind: "match", q: "Match the detective words to their meanings.",
      pairs: [
        ["clue", "information that helps solve a mystery"],
        ["crumb", "a tiny piece of bread or pastry"],
        ["culprit", "the one who did something wrong"],
        ["suspect", "someone who might have committed a crime"],
        ["footprint", "a mark left by a foot or shoe"]
      ],
      why: "Every good whodunnit needs all five." },
    { kind: "order", q: "Put the detective's conclusion in order.",
      words: ["It", "can't", "have", "been", "my", "cousin", "Andrés."],
      why: "Subject + can't have + past participle (been)." },
    { kind: "listen", say: "Lola must have eaten one because there was a crumb on her nose.",
      why: "In speech, 'must have' often sounds like 'must've'." }
  ],

  speak: [
    "Look around the room you're in. Make three deductions about who was there before you, or what happened there earlier (for example, 'Someone must have...').",
    "Has anything ever mysteriously disappeared in your house? What do you think must have happened to it?",
    "Your friend hasn't answered your messages all day. Give four possible explanations using must, might, could and can't."
  ],

  write: {
    prompt: "Write your own short mystery: something has disappeared at a party or at home (food, shoes, the TV remote...). Describe the clues and the suspects, and use modals of deduction to explain who must, might or can't have done it.",
    min: 100,
    useWords: ["clue", "alibi", "suspect", "culprit"]
  }
});
