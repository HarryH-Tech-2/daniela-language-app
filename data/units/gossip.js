(window.UNITS = window.UNITS || []).push({
  id: "gossip",
  stage: 2,
  order: 8,
  emoji: "☕",
  title: "Did you hear?",
  topic: "Gossip",
  intro: "Coffee, cheesecake and the latest news about Andrés. You'll learn reported speech: how tenses change, how to report questions, and verbs like tell, admit, deny and suggest.",

  vocab: [
    { w: "gossip", pos: "noun", def: "conversation about other people's private lives, often unkind or not true",
      ex: "We spent the whole afternoon drinking coffee and sharing gossip.", es: "chisme, cotilleo" },
    { w: "rumour", pos: "noun", def: "a story that people pass on, which may or may not be true",
      ex: "There's a rumour going round that our boss is leaving.", es: "rumor" },
    { w: "spill the beans", pos: "idiom", def: "to tell people something that was supposed to be a secret",
      ex: "Come on, spill the beans! Who was that guy?", es: "soltar la sopa, contar el chisme" },
    { w: "whisper", pos: "verb", def: "to speak very quietly, so that only people close to you can hear",
      ex: "She whispered the news so the waiter wouldn't hear.", es: "susurrar" },
    { w: "swear", pos: "verb", def: "to promise very seriously that something is true",
      ex: "I swear I didn't tell anyone!", es: "jurar" },
    { w: "admit", pos: "verb", def: "to agree, often unwillingly, that something is true",
      ex: "He admitted that he had eaten the last arepa.", es: "admitir, reconocer" },
    { w: "deny", pos: "verb", def: "to say that something is not true",
      ex: "She denied reading my messages.", es: "negar" },
    { w: "suspicious", pos: "adjective", def: "making you feel that something is wrong or secret",
      ex: "Isn't it a bit suspicious that he checks his phone every two minutes?", es: "sospechoso" },
    { w: "keep it to yourself", pos: "phrase", def: "to not tell anyone else a secret",
      ex: "I'll tell you, but please keep it to yourself.", es: "no contárselo a nadie" },
    { w: "in my defence", pos: "phrase", def: "used before giving a reason that makes your mistake seem less bad",
      ex: "I forgot your birthday, but in my defence, you changed the date of the party twice.", es: "en mi defensa" }
  ],

  reading: {
    title: "Saturday coffee",
    text: [
      "Every Saturday, Camila, Valentina, Sofía and I meet for coffee in a little café near the Malecón. Officially, we go for the cheesecake. Unofficially, we go for the gossip.",
      "This week, Valentina couldn't wait to spill the beans. She whispered that she had seen Andrés leaving a dance studio at ten o'clock at night. 'Andrés? Our Andrés?' Sofía asked. Valentina swore it was true. She said he had looked 'suspiciously happy'.",
      "Then Camila admitted that Andrés had told her he couldn't go out on Fridays any more because he was busy. Sofía asked what he could possibly be doing every Friday night. Nobody knew. Within ten minutes, a full rumour had been born: Andrés had a secret girlfriend, and she was a professional dancer.",
      "I suggested asking him. The others looked at me as if I had suggested walking to Bogotá. So I sent him a message and asked him if he was seeing someone. He denied it immediately. He explained that he had been taking champeta classes for three months because he wanted to surprise us at Carnaval. Then he told me not to tell anyone.",
      "I promised that I would keep it to myself. Then I put my phone down, and three faces were staring at me. I lasted about four seconds. In my defence, they all said they would act surprised."
    ]
  },

  grammar: {
    title: "Reported speech",
    explain: [
      "When the reporting verb is in the past (said, told, asked), the tense usually moves one step back: present → past, past simple / present perfect → past perfect, will → would, can → could. If the reporting verb is present ('He says...') or the fact is still true, you don't have to change it.",
      "Change pronouns and time or place words when the situation changes: 'I' → he/she, today → that day, tomorrow → the next day, here → there.",
      "Say vs tell: you say something (to someone), but you tell someone something. 'She said (that) she was tired.' 'She told me (that) she was tired.'",
      "Reported questions use normal statement word order, with no do/does/did and no question mark: 'Where do you live?' → She asked where I lived. For yes/no questions, use if or whether: She asked if I was free.",
      "Many reporting verbs have their own pattern: tell/ask someone (not) to do; suggest + -ing or suggest that someone (should) do; admit/deny + -ing or + that; promise to do or promise that."
    ],
    examples: [
      { en: "'I saw him at the studio.' → She said she had seen him at the studio.", note: "past simple → past perfect" },
      { en: "'I'll call him tomorrow.' → She said she would call him the next day.", note: "will → would, tomorrow → the next day" },
      { en: "'Are you seeing someone?' → I asked him if he was seeing someone.", note: "yes/no question: if + statement order" },
      { en: "'What is he doing?' → Sofía asked what he was doing.", note: "wh- question: statement order" },
      { en: "'Don't tell anyone!' → He told me not to tell anyone.", note: "tell someone (not) to do" },
      { en: "'Let's ask him.' → I suggested asking him.", note: "suggest + -ing" }
    ],
    tip: "Three classic mistakes from Spanish: (1) 'She said me...': with say, you need 'to': 'She said to me' or, more naturally, 'She told me'. (2) 'She asked me where did I live': in reported questions there's no inversion and no did: 'She asked me where I lived.' (3) 'He suggested me to go': suggest never takes person + to-infinitive. Say 'He suggested going' or 'He suggested that I (should) go.'"
  },

  exercises: [
    { kind: "tf", s: "Valentina saw Andrés leaving a dance studio late at night.", answer: true,
      why: "'She whispered that she had seen Andrés leaving a dance studio at ten o'clock at night.'" },
    { kind: "choice", q: "Why had Andrés been busy on Friday nights?",
      right: "He had been taking champeta classes.",
      wrong: ["He had been seeing a professional dancer.", "He had been working late at a dance studio."],
      why: "The secret girlfriend was only a rumour. Andrés explained that he had been taking champeta classes to surprise everyone at Carnaval." },
    { kind: "tf", s: "Daniela kept Andrés's secret for the rest of the afternoon.", answer: false,
      why: "She 'lasted about four seconds' before telling her friends!" },
    { kind: "gap", text: "Andrés {gap} me not to tell anyone.",
      right: "told",
      wrong: ["said", "explained", "suggested"],
      why: "The pattern 'verb + person + (not) to do' works with tell and ask. You can't 'say someone', 'explain someone' or 'suggest someone to do' something." },
    { kind: "gap", text: "Sofía asked me {gap}.",
      right: "what Andrés was doing",
      wrong: ["what was Andrés doing", "what did Andrés do", "what is Andrés doing"],
      why: "A reported question is not a real question any more, so it uses statement word order: subject (Andrés) + verb (was doing), with no inversion and no 'did'." },
    { kind: "gap", text: "'Are you seeing someone?' → I asked him {gap} seeing someone.",
      right: "if he was",
      wrong: ["was he", "if was he", "that he was"],
      why: "Report yes/no questions with if (or whether) + statement word order: 'if he was seeing someone'. 'That' is for statements, not questions." },
    { kind: "type", text: "At the party, Valentina said, 'I can't dance tonight.' → Valentina said she {gap} (not / can) dance that night.",
      answers: ["couldn't", "could not"],
      why: "Can moves back to could in reported speech, and 'tonight' becomes 'that night' because the night is now in the past." },
    { kind: "type", text: "Last Saturday, Camila said, 'I'll call him tomorrow.' → Last Saturday, Camila said she {gap} (call) him the next day.",
      answers: ["would call", "'d call"],
      why: "Will becomes would after a past reporting verb, and 'tomorrow' becomes 'the next day'." },
    { kind: "choice", q: "'Let's ask him directly,' I said. How do you report this?",
      right: "I suggested asking him directly.",
      wrong: ["I suggested to ask him directly.", "I suggested them to ask him directly."],
      why: "Suggest is followed by -ing (suggested asking) or by that + clause (suggested that we should ask him). It never takes a to-infinitive." },
    { kind: "choice", q: "'I didn't take your lipstick!' Valentina said. How do you report this?",
      right: "Valentina denied taking my lipstick.",
      wrong: ["Valentina denied to take my lipstick.", "Valentina admitted taking my lipstick."],
      why: "Deny = say something is not true, and it is followed by -ing (or that + clause). 'Admitted' means the opposite: she said she did take it." },
    { kind: "gap", text: "There's a {gap} going round that our teacher is moving to Spain, but nobody knows if it's true.",
      right: "rumour",
      wrong: ["witness", "defence", "whisper"],
      why: "A rumour is a story that spreads and may not be true. 'Going round' is the typical expression: 'There's a rumour going round...'. Note the British spelling: rumour (American: rumor)." },
    { kind: "match", q: "Match the words to their meanings.",
      pairs: [
        ["spill the beans", "tell a secret"],
        ["whisper", "speak very quietly"],
        ["deny", "say something is not true"],
        ["swear", "promise seriously that something is true"],
        ["gossip", "talk about other people's private lives"]
      ] },
    { kind: "order", q: "Report the question: 'Where did you buy your dress?'",
      words: ["She", "asked", "me", "where", "I", "had", "bought", "my", "dress."],
      why: "Statement order (I had bought), no 'did', and the past simple moves back to the past perfect." },
    { kind: "listen", say: "She told me she had never seen him so happy.",
      why: "Told + person, then the past perfect (had never seen) for something that happened before she spoke." }
  ],

  speak: [
    "Think of the best piece of gossip you heard this year (no real names needed!). Report what people said, using said, told, asked and admitted.",
    "Is gossip always bad, or can it be useful? Give your opinion and an example.",
    "Tell a story about a time someone asked you to keep a secret. Did you keep it to yourself?"
  ],

  write: {
    prompt: "Write a message to a friend who missed Saturday coffee. Report what everyone said and asked, and what happened at the end. Use at least three different reporting verbs (for example: admit, deny, suggest, explain) and one reported question.",
    min: 80,
    useWords: ["rumour", "whisper", "admit", "deny"]
  }
});
