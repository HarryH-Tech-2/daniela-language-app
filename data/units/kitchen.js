(window.UNITS = window.UNITS || []).push({
  id: "kitchen",
  stage: 1,
  order: 3,
  emoji: "🍳",
  title: "In my kitchen",
  topic: "Cooking",
  intro: "Sancocho, patacones and arepas de huevo for six hungry friends! You'll learn countable and uncountable nouns, words like much, many, a few and enough, and the verbs you need to cook in English.",

  vocab: [
    { w: "chop", pos: "verb", def: "to cut something into pieces with a knife", ex: "Can you chop the onions while I wash the yuca?", es: "picar, cortar" },
    { w: "fry", pos: "verb", def: "to cook something in hot oil", ex: "You have to fry the patacones twice.", es: "freír" },
    { w: "stir", pos: "verb", def: "to move a spoon round and round in a liquid or mixture", ex: "Stir the sauce so it doesn't burn.", es: "revolver, remover" },
    { w: "boil", pos: "verb", def: "to cook something in very hot water; for water, to reach 100°C", ex: "Let the soup boil for an hour.", es: "hervir" },
    { w: "season", pos: "verb", def: "to add salt, pepper, herbs or spices to food", ex: "I seasoned the chicken with garlic and cumin.", es: "sazonar, condimentar" },
    { w: "ingredient", pos: "noun", def: "one of the foods you use to make a dish", ex: "The secret ingredient is a little coconut milk.", es: "ingrediente" },
    { w: "recipe", pos: "noun", def: "a set of instructions for cooking a dish", ex: "This is my grandmother's sancocho recipe.", es: "receta (de cocina)" },
    { w: "dough", pos: "noun", def: "a soft mixture of flour and water that you shape before cooking", ex: "The dough for arepas is made with corn flour.", es: "masa" },
    { w: "crispy", pos: "adjective", def: "hard and dry on the outside in a pleasant way", ex: "I love my patacones really crispy.", es: "crujiente, crocante" },
    { w: "leftovers", pos: "noun", def: "food that is not eaten at a meal and is kept for later", ex: "We ate the leftovers for lunch the next day.", es: "sobras" }
  ],

  reading: {
    title: "Lunch for six (food for twenty)",
    text: [
      "Last Sunday I invited six friends for lunch, which in my family means cooking enough food for twenty. My grandmother's rule is simple: if there isn't too much food, there isn't enough food. So I made a list: a lot of green plantains, some yuca, a few potatoes, a chicken, a little coriander and lots of eggs.",
      "The sancocho came first, because it needs a lot of time. I chopped the vegetables, put everything in a huge pot of water and let it boil for over an hour. Then I seasoned it with salt, garlic and coriander. My kitchen was so hot that I needed a lot of patience and two fans.",
      "Next came the arepas de huevo, the hardest recipe of the day. You make the dough with corn flour, water and a little salt, fry the arepa until it puffs up, open it carefully, put a raw egg inside and fry it again. I dropped a few eggs on the floor, but not many. Camila, who can't cook at all, stirred the hogao for twenty minutes and was very proud of herself.",
      "Finally, the patacones. I fried slices of green plantain, flattened them and fried them again until they were crispy. How many did I make? Too many, of course. My friends ate until they couldn't move, and there were enough leftovers for the whole week. How much money did I spend? Let's not talk about that."
    ]
  },

  grammar: {
    title: "Countable and uncountable nouns; quantifiers",
    explain: [
      "Countable nouns have a plural: an egg, two eggs. Uncountable nouns have no plural and take a singular verb: water, salt, rice, money, advice, information. The salt is on the table.",
      "Use many and a few with plural countable nouns (many eggs, a few potatoes). Use much and a little with uncountable nouns (much time, a little salt). A lot of, lots of, some and enough work with both.",
      "In positive sentences, much sounds very formal. Say 'We've got a lot of rice', not 'We've got much rice'. Much and many are most common in questions and negatives: How much time? Not many people.",
      "Too much / too many = more than you want. Not enough = less than you need. Enough goes before a noun (enough chairs) but after an adjective (hot enough).",
      "A few / a little = some, a small amount (positive). Few / little without 'a' = almost none (negative): Few people know this recipe."
    ],
    examples: [
      { en: "How many plantains do we need?", note: "many + plural countable noun" },
      { en: "How much rice is there?", note: "much + uncountable noun; singular verb 'is'" },
      { en: "Add a little salt and a few onions.", note: "a little + uncountable; a few + countable" },
      { en: "There's too much oil in this pan.", note: "too much = more than you want" },
      { en: "We haven't got enough chairs, and the soup isn't hot enough.", note: "enough before a noun, after an adjective" }
    ],
    tip: "Spanish speakers often add -s to uncountable nouns: 'informations', 'advices', 'furnitures'. In English they have no plural: 'some information', 'a piece of advice'. Watch out for 'people' too: it is plural, so say 'people are', never 'people is'. And remember: how much money, but how many eggs."
  },

  exercises: [
    { kind: "tf", s: "Camila did most of the cooking.", answer: false,
      why: "Daniela did almost everything. Camila 'can't cook at all' and only stirred the hogao." },
    { kind: "choice", q: "Why did Daniela make the sancocho first?",
      right: "Because it needs a lot of time.",
      wrong: ["Because her friends were already hungry.", "Because it was the easiest dish."],
      why: "The story says: 'The sancocho came first, because it needs a lot of time.' It had to boil for over an hour." },
    { kind: "gap", text: "How {gap} eggs do we need for the arepas?",
      right: "many", wrong: ["much", "little"],
      why: "'Eggs' is a plural countable noun, so we ask 'How many?'. 'How much?' is for uncountable nouns like salt or money." },
    { kind: "gap", text: "There's only {gap} coriander left, but it's enough for the soup.",
      right: "a little", wrong: ["a few", "many"],
      why: "Coriander is uncountable here (we don't say 'two corianders'), so we use 'a little'. 'A few' and 'many' are for plural countable nouns." },
    { kind: "gap", text: "Don't put {gap} salt in the sancocho. My uncle has high blood pressure!",
      right: "too much", wrong: ["too many", "a few"],
      why: "Salt is uncountable, so 'more than you want' is 'too much', not 'too many'." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "Can you give me some advice about this recipe?",
      wrong: ["Can you give me an advice about this recipe?", "Can you give me some advices about this recipe?"],
      why: "'Advice' is uncountable in English: no 'an' and no plural. If you need to count it, say 'a piece of advice'." },
    { kind: "type", text: "The soup isn't hot {gap}. Can you heat it up a bit more? (= sufficiently)",
      answers: ["enough"],
      why: "'Enough' comes after an adjective: 'hot enough', 'big enough'. Before a noun it comes first: 'enough soup'." },
    { kind: "type", text: "Yesterday Camila {gap} (stir) the hogao for twenty minutes.",
      answers: ["stirred"],
      why: "Short verbs ending in one vowel + one consonant double the consonant in the past: stir → stirred, chop → chopped." },
    { kind: "order", q: "Build the question.",
      words: ["How", "many", "plantains", "do", "we", "need", "for", "the", "patacones?"],
      why: "'Plantains' is countable and plural, so the question uses 'How many'." },
    { kind: "match", q: "Match the cooking verbs to their meanings.",
      pairs: [
        ["chop", "cut into pieces"],
        ["fry", "cook in hot oil"],
        ["stir", "move a spoon round in a liquid"],
        ["boil", "cook in very hot water"],
        ["season", "add salt, pepper or spices"]
      ] },
    { kind: "gap", text: "The patacones were perfect: golden and {gap}.",
      right: "crispy", wrong: ["raw", "soggy"],
      why: "'Crispy' means pleasantly hard on the outside, exactly what perfect patacones should be. 'Raw' means not cooked, and 'soggy' means wet and soft, which is the opposite." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "The people in my family eat a lot.",
      wrong: ["The people in my family eats a lot.", "The peoples in my family eat a lot."],
      why: "'People' is already plural (one person, two people), so it takes 'eat', not 'eats'. 'Peoples' means nations or ethnic groups, not individual persons." },
    { kind: "listen", say: "There was too much food, so we had leftovers for days.",
      why: "'Food' is uncountable, so we say 'too much food'. 'Leftovers' is the food you keep for later." },
    { kind: "tf", s: "Daniela made more patacones than her friends could eat.", answer: true,
      why: "She made 'too many, of course', and there were enough leftovers for the whole week." }
  ],

  speak: [
    "Explain how to make your favourite Colombian dish. What ingredients do you need, and how much or how many of each?",
    "Describe the last time you cooked for friends. Was there enough food, or too much?",
    "What food do you always have in your kitchen, and what do you never have enough of?"
  ],

  write: {
    prompt: "Write the recipe for a dish you love (it can be arepa de huevo, patacones, sancocho or anything else). List the ingredients with quantifiers (a few, a little, some, a lot of) and explain the steps with cooking verbs.",
    min: 60,
    useWords: ["chop", "fry", "season", "crispy", "ingredient"]
  }
});
