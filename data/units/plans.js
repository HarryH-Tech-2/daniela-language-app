(window.UNITS = window.UNITS || []).push({
  id: "plans",
  stage: 1,
  order: 5,
  emoji: "🏖️",
  title: "Weekend plans",
  topic: "Travel",
  intro: "Four friends, one old Renault and a weekend in Cartagena. You'll learn when to use will, be going to, the present continuous and might, and why we say 'when we arrive', not 'when we will arrive'.",

  vocab: [
    { w: "book", pos: "verb", def: "to arrange to have a room, seat, ticket, etc. at a future time", ex: "We've booked a cheap flat in Getsemaní.", es: "reservar" },
    { w: "pack", pos: "verb", def: "to put clothes and other things into a bag for a trip", ex: "I always pack the night before I travel.", es: "empacar, hacer la maleta" },
    { w: "forecast", pos: "noun", def: "a statement about what the weather will be like", ex: "The forecast says it's going to be sunny all weekend.", es: "pronóstico" },
    { w: "split", pos: "verb", def: "to share the cost of something between people", ex: "Let's split the bill four ways.", es: "dividir (los gastos)" },
    { w: "set off", pos: "phrasal verb", def: "to start a journey", ex: "We're setting off at six in the morning.", es: "salir, ponerse en camino" },
    { w: "look forward to", pos: "phrasal verb", def: "to feel happy and excited about something that is going to happen", ex: "I'm really looking forward to the weekend.", es: "tener muchas ganas de, esperar con ilusión" },
    { w: "budget", pos: "noun", def: "the amount of money you have to spend on something", ex: "Our budget for the trip is very small.", es: "presupuesto" },
    { w: "spontaneous", pos: "adjective", def: "doing things without planning them first", ex: "Sofía is very spontaneous. She hates plans.", es: "espontáneo" },
    { w: "sunscreen", pos: "noun", def: "a cream that protects your skin from the sun", ex: "Don't forget to put on sunscreen.", es: "protector solar, bloqueador" },
    { w: "cancel", pos: "verb", def: "to decide that a planned event will not happen", ex: "If it rains, we'll cancel the boat trip.", es: "cancelar" }
  ],

  reading: {
    title: "Cartagena, here we come",
    text: [
      "It's Wednesday, and our group chat is on fire. Valentina, Andrés, Sofía and I are going to Cartagena this weekend. We've booked a cheap flat in Getsemaní, and Andrés is driving us there in his old Renault. We're setting off on Friday at six in the morning, because Andrés says the traffic will be terrible if we leave later.",
      "Valentina is the organised one. She has already decided that we're going to explore the walled city on Saturday and take a boat to the Rosario Islands on Sunday. Sofía is more spontaneous. 'Let's see what happens,' she says. 'We might go to the islands, or we might just stay on the beach all day.'",
      "The forecast says it will be sunny and very hot, so I'm going to pack three bottles of sunscreen. Last time I got so sunburnt that I looked like a lobster. Our budget is small, so we're going to split everything: petrol, food and the flat. Nobody is allowed to cancel.",
      "I'm really looking forward to it. As soon as we arrive, I'll jump in the sea. When the sun goes down, we'll find a bar with live champeta. And if Andrés's car breaks down on the way? Then we'll take the bus. But I'm sure it won't come to that. Probably."
    ]
  },

  grammar: {
    title: "Future forms",
    explain: [
      "Be going to: plans and intentions you have already decided (I'm going to pack tonight), and predictions based on what you can see now (Look at those clouds! It's going to rain).",
      "Present continuous: fixed arrangements with other people, usually with a time or place (We're leaving at six. Andrés is driving).",
      "Will: decisions you make at the moment of speaking, offers and promises (I'll help you!), and predictions based on opinion (I think you'll love Cartagena).",
      "Might + verb: something is possible, but not certain (We might go to the islands).",
      "After when, as soon as, before, after, until and if, use the present simple for the future, never will: When we arrive, I'll call you."
    ],
    examples: [
      { en: "We're setting off on Friday at six.", note: "present continuous: a fixed arrangement" },
      { en: "I'm going to pack three bottles of sunscreen.", note: "going to: a plan already decided" },
      { en: "The car won't start? Don't worry, I'll call a taxi.", note: "will: a decision made right now" },
      { en: "We might stay on the beach all day.", note: "might: a possibility" },
      { en: "As soon as we arrive, I'll jump in the sea.", note: "as soon as + present simple, then will" }
    ],
    tip: "In Spanish you say 'cuando lleguemos', so many Colombians say 'when we will arrive'. English uses the present simple after time words: 'When we arrive', 'As soon as I get there'. Another common mistake is using the present simple for personal plans: 'I go to Cartagena tomorrow' should be 'I'm going to Cartagena tomorrow'."
  },

  exercises: [
    { kind: "tf", s: "Daniela and her friends are flying to Cartagena.", answer: false,
      why: "Andrés is driving them there in his old Renault. 'Is driving' is the present continuous for an arrangement." },
    { kind: "choice", q: "Why are they leaving at six on Friday morning?",
      right: "To avoid the traffic.",
      wrong: ["Because the flat is only available in the morning.", "Because the boat to the islands leaves on Friday."],
      why: "Andrés says 'the traffic will be terrible if we leave later'." },
    { kind: "gap", text: "As soon as we {gap}, I'll jump in the sea.",
      right: "arrive", wrong: ["will arrive", "are going to arrive"],
      why: "After 'as soon as' (and 'when', 'before', 'after', 'if') we use the present simple to talk about the future, never 'will' or 'going to'." },
    { kind: "gap", text: "Look at those black clouds! {gap} rain.",
      right: "It's going to", wrong: ["It's raining to", "It will to"],
      why: "When we can see evidence now (black clouds), we use 'be going to' for the prediction. 'Will' is never followed by 'to'." },
    { kind: "gap", text: "A: Oh no, the car won't start! B: Don't worry, {gap} you a lift.",
      right: "I'll give", wrong: ["I give", "I gave"],
      why: "This is an offer made at the moment of speaking, so we use 'will': 'I'll give you a lift'." },
    { kind: "choice", q: "'Mañana voy a Santa Marta' (it's already planned). Which is the best translation?",
      right: "I'm going to Santa Marta tomorrow.",
      wrong: ["I go to Santa Marta tomorrow.", "I'll going to Santa Marta tomorrow."],
      why: "For personal plans and arrangements, English uses the present continuous (or 'going to'), not the present simple. 'I'll going' mixes two forms and is impossible." },
    { kind: "type", text: "When the sun {gap} (go) down, we'll find a bar with live champeta.",
      answers: ["goes"],
      why: "After 'when', use the present simple even though we're talking about the future: 'When the sun goes down'." },
    { kind: "type", text: "I'm sure you {gap} (love) Cartagena. Everyone does.",
      answers: ["will love", "'ll love", "are going to love", "'re going to love"],
      why: "A prediction based on your opinion ('I'm sure', 'I think') usually takes 'will': 'you'll love it'. 'You're going to love it' is also natural here." },
    { kind: "order", q: "Build the sentence.",
      words: ["We're", "setting", "off", "early", "on", "Friday", "morning."],
      why: "Present continuous for an arrangement. 'Set off' is a phrasal verb meaning 'start a journey'." },
    { kind: "match", q: "Match the words to their meanings.",
      pairs: [
        ["book", "reserve a room or ticket"],
        ["pack", "put things in a bag for a trip"],
        ["split", "share the cost"],
        ["set off", "start a journey"],
        ["forecast", "what the weather will be like"]
      ] },
    { kind: "gap", text: "I can't wait for the trip! I'm really {gap} it.",
      right: "looking forward to", wrong: ["looking forward", "looking for"],
      why: "The phrasal verb is 'look forward to' + noun or -ing: 'I'm looking forward to it'. Don't forget the 'to'! 'Look for' means 'buscar'." },
    { kind: "listen", say: "As soon as we get there, I'll send you a photo.",
      why: "'As soon as' + present simple ('get'), then 'will' in the main part of the sentence." },
    { kind: "gap", text: "I'm not sure about Sunday. We {gap} go to the islands, or we might just stay on the beach.",
      right: "might", wrong: ["must", "are going to"],
      why: "'I'm not sure' tells us it's only a possibility, so we use 'might'. 'Are going to' shows a decided plan, and 'must' is obligation." },
    { kind: "tf", s: "Sofía likes to plan every detail of the trip.", answer: false,
      why: "Valentina is the organised one. Sofía is 'more spontaneous' and says 'Let's see what happens'." }
  ],

  speak: [
    "What are you doing this weekend? Talk about one arrangement, one plan and one thing you might do.",
    "Describe your dream trip in Colombia. Where will you go first when you have the time and the money?",
    "Are you an organised traveller like Valentina or spontaneous like Sofía? Give examples."
  ],

  write: {
    prompt: "Write a message to your friends' group chat about a weekend trip to Santa Marta. Say what you've already arranged (present continuous), what you're going to do, what you might do, and what you'll do as soon as you arrive.",
    min: 60,
    useWords: ["book", "budget", "set off", "look forward to"]
  }
});
