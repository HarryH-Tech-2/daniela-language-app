(window.UNITS = window.UNITS || []).push({
  id: "critic",
  stage: 4,
  order: 18,
  emoji: "🍽️",
  title: "The food critic",
  topic: "Food",
  intro: "You're turning into a food blogger! You'll learn cleft sentences (It was the dessert that..., What I love is..., All I wanted was...) to put the spotlight exactly where you want it, plus precise adjectives to describe flavour and texture like a real critic.",

  vocab: [
    { w: "succulent", pos: "adjective", def: "(of meat or fruit) juicy, tender and delicious",
      ex: "The beef was so succulent that it fell apart on my fork.", es: "suculento, jugoso" },
    { w: "bland", pos: "adjective", def: "having very little flavour; boring to eat",
      ex: "The rice was a bit bland, so I added some hot sauce.", es: "insípido, soso" },
    { w: "overpowering", pos: "adjective", def: "so strong that it hides every other flavour or smell",
      ex: "The garlic was overpowering; I couldn't taste the fish at all.", es: "abrumador, demasiado fuerte" },
    { w: "tangy", pos: "adjective", def: "having a pleasantly sharp, slightly sour taste",
      ex: "I love the tangy lime dressing on their ceviche.", es: "ácido (de forma agradable), con un toque cítrico" },
    { w: "velvety", pos: "adjective", def: "very smooth and soft, like velvet",
      ex: "The coconut soup had a rich, velvety texture.", es: "aterciopelado, suave" },
    { w: "overrated", pos: "adjective", def: "thought to be better than it really is",
      ex: "Honestly, I think that famous burger place is overrated.", es: "sobrevalorado" },
    { w: "palate", pos: "noun", def: "a person's ability to taste and judge flavours",
      ex: "After so many spicy dishes, my palate needed a rest.", es: "paladar" },
    { w: "a hint of", pos: "phrase", def: "a very small amount of a flavour or quality",
      ex: "The sauce has just a hint of cinnamon.", es: "un toque de, una pizca de" },
    { w: "live up to", pos: "phrasal verb", def: "be as good as people say or expect",
      ex: "The new restaurant didn't live up to the hype.", es: "estar a la altura de" },
    { w: "understated", pos: "adjective", def: "attractive in a quiet, simple way, without trying to impress",
      ex: "The décor is understated: white walls, wooden tables and lots of plants.", es: "sobrio, discreto, elegante sin exagerar" }
  ],

  reading: {
    title: "Review: Mar y Coco, El Prado",
    text: [
      "Let me start with a confession: it wasn't the food that brought me to Mar y Coco. It was the dog. Every evening a scruffy little mongrel called Pimienta sits at the door greeting customers, and after three weeks of walking past, I finally gave in. What I didn't expect was to find one of the most exciting kitchens in Barranquilla hiding behind her.",
      "Everyone raves about the fried fish here, and I'm afraid I have to be honest: it's overrated. The fish itself was beautifully crisp, but the coconut rice beside it was surprisingly bland, and the garlic sauce was so overpowering that I could taste nothing else for the rest of the evening. All I wanted was a little restraint.",
      "The thing that rescued the meal was the starter my friend Camila insisted on ordering: carimañolas filled with slow-cooked beef so succulent it practically melted, served with a tangy suero dip with a hint of lime that cut through the richness perfectly. What makes them special is the cassava dough, which is light, crunchy and never greasy.",
      "It was the dessert, though, that won me over completely. The coconut flan was velvety, understated and not too sweet: exactly what a tired palate needs after a heavy main course. Where most places drown their flan in caramel, Mar y Coco lets the coconut speak for itself.",
      "The setting deserves a mention too. What you get is simple: plastic chairs, fairy lights and a speaker playing old champeta hits a little too loudly. It's not glamorous, but it feels like a Saturday night at your auntie's house, in the best possible way.",
      "So, does Mar y Coco live up to the hype? Partly. My advice is this: skip the famous fish, order everything Camila ordered, and save room for the flan. And say hello to Pimienta on your way in. She's the one who really runs the place. Four mangoes out of five."
    ]
  },

  grammar: {
    title: "Cleft sentences",
    explain: [
      "Cleft sentences split one idea into two parts so you can put the spotlight on one element. They are very common in reviews, arguments and when you correct someone.",
      "It-clefts: It + be + focus + that/who + rest of the sentence. It was the dessert that won me over (not the main course). Use who for people: It was Camila who chose the restaurant.",
      "Wh-clefts: What + clause + be + focus. What I love is the music. What surprised me was the price. When the focus is an action, use do: What she did was (to) send the soup back.",
      "All-clefts mean 'the only thing': All I wanted was a glass of water. All you need to do is book a table.",
      "The thing / The reason / The person / The place + clause + be: The thing that annoyed me was the wait. The reason I went back is the flan."
    ],
    examples: [
      { en: "It wasn't the food that brought me here; it was the dog.", note: "it-cleft used to correct an assumption" },
      { en: "It was Camila who insisted on the carimañolas.", note: "it-cleft with who for a person" },
      { en: "What I didn't expect was such a creative menu.", note: "wh-cleft: the surprise goes at the end, where it has most impact" },
      { en: "What the chef does is grill everything over coconut husks.", note: "wh-cleft focusing on an action, with do" },
      { en: "All I wanted was a little restraint.", note: "all-cleft = the only thing I wanted" },
      { en: "The thing that rescued the meal was the starter.", note: "the thing + relative clause + be" }
    ],
    tip: "Spanish has its own clefts (Fue el postre lo que me conquistó / Lo que me encanta es...), and translating them word for word causes three classic mistakes. 1) Never drop 'it': say 'It was the dessert that...', not 'Was the dessert that...'. 2) After the focus in an it-cleft, use that or who, never what: 'It was the dessert that won me over', not 'It was the dessert what...'. 'Lo que' only becomes 'What' at the START of a wh-cleft. 3) Don't add an extra 'it' in a wh-cleft: 'What I love is the music', not 'What I love it is the music'. Also, the verb after 'It' is always singular: 'It was the empanadas that...'."
  },

  exercises: [
    { kind: "tf", s: "Daniela first went to Mar y Coco because of its reputation for fried fish.", answer: false,
      why: "She says 'it wasn't the food that brought me to Mar y Coco. It was the dog' — Pimienta, who greets customers at the door." },
    { kind: "choice", q: "What did Daniela think of the famous fried fish dish?", right: "It didn't live up to its reputation.",
      wrong: ["It was the best dish of the evening.", "It was far too sweet for her palate."],
      why: "She calls it 'overrated': the fish was crisp, but the rice was bland and the garlic sauce was overpowering." },
    { kind: "tf", s: "According to Daniela, Mar y Coco serves its flan with less caramel than most places.", answer: true,
      why: "She says most places 'drown their flan in caramel', but Mar y Coco 'lets the coconut speak for itself'." },
    { kind: "gap", text: "It was the coconut flan {gap} won me over.", right: "that", wrong: ["what", "it", "where"],
      why: "An it-cleft follows the pattern It + be + focus + that/who. 'What' is a very common mistake from Spanish 'lo que', but it never goes after the focus." },
    { kind: "choice", q: "Which sentence is correct?", right: "What I love about this place is the music.",
      wrong: ["What I love about this place it is the music.", "The thing what I love about this place is the music.", "Is the music what I love about this place."],
      why: "A wh-cleft is What + clause + be + focus, with no extra 'it'. After 'the thing', use 'that' (or nothing), not 'what'. And English sentences need a subject, so you can't start with 'Is'." },
    { kind: "choice", q: "Which sentence emphasises that it was Camila, not Andrés, who chose the restaurant?", right: "It was Camila who chose the restaurant.",
      wrong: ["It was Camila what chose the restaurant.", "Was Camila who chose the restaurant.", "Camila was who chose the restaurant."],
      why: "It-cleft: It + was + Camila + who + chose... Use 'who' for people, and don't drop the 'It'." },
    { kind: "type", text: "The waiter was so rude that what my friend {gap} (do) was walk straight out.", answers: ["did", "had done", "'d done"],
      why: "A wh-cleft focusing on an action uses do: What she did was (to) walk out. The past context ('was so rude') needs the past simple 'did'." },
    { kind: "gap", text: "The thing {gap} annoyed me most was the forty-minute wait.", right: "that", wrong: ["what", "it", "who"],
      why: "'The thing' is followed by a relative clause: the thing that annoyed me. 'What' already means 'the thing that', so 'the thing what' says it twice. 'Who' is only for people." },
    { kind: "order", q: "Build an it-cleft.", words: ["It", "was", "the", "dessert", "that", "won", "me", "over."],
      why: "It + was + focus (the dessert) + that + rest. With the phrasal verb 'win over', a pronoun object goes in the middle: won me over." },
    { kind: "match", q: "Match each adjective to its meaning.", pairs: [
      ["succulent", "juicy and tender"],
      ["bland", "with very little flavour"],
      ["tangy", "pleasantly sharp or sour"],
      ["velvety", "very smooth and soft"],
      ["overpowering", "so strong it hides other flavours"]
    ], why: "Precise adjectives are what make a review sound professional: 'tasty' tells your reader nothing, 'tangy' tells them exactly what to expect." },
    { kind: "type", text: "The garlic sauce was so {gap} (overpower) that I couldn't taste the fish.", answers: ["overpowering"],
      why: "The -ing adjective 'overpowering' describes something too strong. We say 'an overpowering flavour/smell'." },
    { kind: "gap", text: "Everyone raves about that place, but honestly, I think it's {gap}. It's fine, nothing special.", right: "overrated",
      wrong: ["underrated", "succulent", "velvety"],
      why: "'Overrated' = people think it's better than it really is. 'Underrated' is the opposite, which can't be true if everyone raves about it." },
    { kind: "choice", q: "Which word best describes a soup that tastes of almost nothing?", right: "bland", wrong: ["tangy", "overpowering", "succulent"],
      why: "'Bland' means lacking flavour. 'Tangy' and 'overpowering' describe strong flavours, and 'succulent' is for juicy meat or fruit." },
    { kind: "listen", say: "What surprised me most was how velvety the sauce was.",
      why: "A wh-cleft: the surprise (how velvety the sauce was) comes at the end, where it has the most impact." }
  ],

  speak: [
    "Describe the best meal you've ever had. Use at least two cleft sentences, e.g. 'What made it special was...' and 'It was the ... that...'.",
    "Name a famous restaurant or dish in Barranquilla that you think is overrated (or underrated). Explain why, using precise adjectives.",
    "What's one thing about Colombian food that foreigners don't understand? Start with 'The thing that people don't realise is...'"
  ],

  write: {
    prompt: "Write a short review for your food blog of a restaurant, street-food stall or family meal you remember well. Say what was good and what disappointed you. Use at least three different cleft sentences (It was... that..., What I loved was..., All I wanted was..., The thing that...).",
    min: 120,
    useWords: ["succulent", "bland", "overrated", "live up to", "a hint of"]
  }
});
