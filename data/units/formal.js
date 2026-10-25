(window.UNITS = window.UNITS || []).push({
  id: "formal",
  stage: 3,
  order: 16,
  emoji: "✉️",
  title: "Dear Sir or Madam",
  topic: "Formal writing",
  intro: "Your Carnaval dress has arrived late, in the wrong colour and torn. You'll learn to turn an angry midnight message into a formal email, with linking words like however, despite and therefore, and formal verbs like request and assist.",

  vocab: [
    { w: "request", pos: "verb", def: "to ask for something formally or politely",
      ex: "I am writing to request a full refund.", es: "solicitar" },
    { w: "assist", pos: "verb", def: "to help (formal). Careful: it doesn't mean 'attend'",
      ex: "A manager offered to assist me personally.", es: "ayudar" },
    { w: "receive", pos: "verb", def: "to get something that someone sends or gives you",
      ex: "The item I received is not the one I ordered.", es: "recibir" },
    { w: "regarding", pos: "preposition", def: "about; on the subject of (formal)",
      ex: "I am writing regarding my recent order.", es: "con respecto a" },
    { w: "inconvenience", pos: "noun", def: "trouble or problems caused to someone",
      ex: "We apologise for any inconvenience.", es: "molestia / inconveniente" },
    { w: "refund", pos: "noun", def: "money that is given back to you, for example when you return something",
      ex: "I would like a full refund.", es: "reembolso" },
    { w: "enclose", pos: "verb", def: "to send something together with a letter or email",
      ex: "I have enclosed two photographs of the damage.", es: "adjuntar" },
    { w: "faulty", pos: "adjective", def: "not working properly or badly made",
      ex: "One of the sleeves is faulty.", es: "defectuoso / defectuosa" },
    { w: "compensation", pos: "noun", def: "money or something else given to someone because they have suffered a loss or a problem",
      ex: "They sent me a voucher as compensation.", es: "compensación / indemnización" },
    { w: "I look forward to hearing from you", pos: "phrase", def: "a formal way to end a letter or email when you expect a reply",
      ex: "I look forward to hearing from you. Yours faithfully, Daniela", es: "quedo atenta a su respuesta" }
  ],

  reading: {
    title: "Write it like a lawyer",
    text: [
      "Two weeks before Carnaval, I ordered a cumbia dress from an online shop. It cost a fortune, but it was perfect: red, with three layers of ruffles. It arrived four days late. Worse, it was green, and one sleeve was torn. My first email, written at midnight, said: 'Hi! The dress you sent me is a disaster. I want my money back NOW. Pls help!!!' My sister Valentina read it and laughed. 'Nobody will take that seriously,' she said. 'Write it like a lawyer.' So I did.",
      "'Dear Sir or Madam, I am writing regarding an order which I placed on your website on 3 February. Although I paid for express delivery, the dress did not arrive until 14 February, four days after the promised date.",
      "Furthermore, the item I received is not the one I ordered. Whereas your website clearly showed a red dress, the one delivered to me is green. In addition, one of the sleeves is faulty, as you can see in the photographs I have enclosed. Despite contacting your customer service team twice, I have not yet received a reply.",
      "Owing to my participation in the Carnaval parade on 20 February, I require the correct dress urgently. I would therefore like to request either a replacement before that date or a full refund. Nevertheless, I have always been satisfied with your products in the past, and I hope we can resolve this matter quickly. I look forward to hearing from you. Yours faithfully, Daniela'",
      "The shop replied within two hours. A manager apologised for the inconvenience, offered to assist me personally and sent the red dress by courier, together with a voucher as compensation. In spite of all the stress, I danced in the parade in the right colour. Valentina says it was the tone of the email. I say it was the word 'nevertheless'."
    ]
  },

  grammar: {
    title: "Linking words and formal register",
    explain: [
      "Contrast: however and nevertheless start a new sentence and are followed by a comma. Although + subject + verb. Despite / in spite of + noun or -ing. Whereas compares two different facts.",
      "Adding ideas: furthermore and in addition usually start a sentence, followed by a comma.",
      "Cause and result: owing to + noun means 'because of'. Therefore means 'so'; in formal writing it often goes after the subject or auxiliary: I would therefore be grateful...",
      "Formal register: avoid contractions, slang and most phrasal verbs. Get → receive, ask for → request, help → assist, want → would like, tell → inform.",
      "Openings and closings: Dear Sir or Madam → Yours faithfully. Dear Ms López → Yours sincerely."
    ],
    examples: [
      { en: "Although I paid for express delivery, the dress arrived late.", note: "although + subject + verb" },
      { en: "Despite contacting your team twice, I have not received a reply.", note: "despite / in spite of + -ing (or a noun)" },
      { en: "Whereas your website showed a red dress, the one I received is green.", note: "whereas: two contrasting facts" },
      { en: "Owing to the delay, I missed the rehearsal.", note: "owing to + noun = because of" },
      { en: "I would therefore be grateful if you could provide a refund.", note: "therefore = so (formal)" },
      { en: "Informal: Can you help me? → Formal: I would be grateful if you could assist me.", note: "indirect request + formal verb" }
    ],
    tip: "Spanish 'a pesar de' makes many Colombians write 'despite of', which doesn't exist: say 'despite the delay' or 'in spite of the delay'. Despite can't be followed by a full clause either: not 'despite I paid' but 'although I paid' or 'despite paying'. And don't copy 'aunque... pero': 'Although it was expensive, but I bought it' is wrong. Use although OR but, never both."
  },

  exercises: [
    { kind: "choice", q: "Why did Daniela rewrite her first email?",
      right: "Her sister said nobody would take it seriously.",
      wrong: ["The shop asked her to write again.", "She had sent it to the wrong address.", "Her boss corrected it."],
      why: "Valentina laughed and said, 'Nobody will take that seriously. Write it like a lawyer.'" },
    { kind: "tf", s: "The dress arrived on time but in the wrong colour.", answer: false,
      why: "It arrived four days late, and it was the wrong colour, and torn." },
    { kind: "tf", s: "After the formal email, the shop sent Daniela the red dress.", answer: true,
      why: "They replied within two hours and sent the red dress by courier." },
    { kind: "gap", text: "{gap} paying for express delivery, I had to wait four extra days.",
      right: "Despite", wrong: ["Despite of", "However", "Whereas"],
      why: "Despite + -ing. 'Despite of' doesn't exist (In spite of is fine)." },
    { kind: "gap", text: "{gap} I paid for express delivery, the dress arrived late.",
      right: "Although", wrong: ["Despite", "In spite of", "Nevertheless"],
      why: "A full clause (subject + verb: I paid) needs although. Despite and in spite of need a noun or -ing." },
    { kind: "gap", text: "The website showed a red dress, {gap} the one I received is green.",
      right: "whereas", wrong: ["therefore", "furthermore", "despite"],
      why: "Whereas joins two facts that contrast with each other in one sentence." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "Owing to the delay, I missed the rehearsal.",
      wrong: ["Owing to the dress arrived late, I missed the rehearsal.", "Owing the delay, I missed the rehearsal."],
      why: "Owing to is followed by a noun (the delay), not a clause." },
    { kind: "choice", q: "What is the most formal way to say 'Can you help me?'",
      right: "I would be grateful if you could assist me.",
      wrong: ["Could you help me out?", "Help me, please!"],
      why: "Formal writing prefers indirect requests (I would be grateful if...) and formal verbs (assist instead of help)." },
    { kind: "type", text: "I am writing to {gap} a full refund. (formal verb meaning 'ask for')",
      answers: ["request"],
      why: "Request is the formal equivalent of ask for, and it takes no preposition: request a refund, not 'request for a refund'." },
    { kind: "type", text: "The dress is damaged. I would {gap} be grateful for a full refund. (formal word meaning 'so')",
      answers: ["therefore", "thus"],
      why: "Therefore means 'so' and in formal writing often goes after the auxiliary: I would therefore be grateful..." },
    { kind: "match", q: "Match each informal verb to its formal equivalent.",
      pairs: [
        ["get", "receive"],
        ["ask for", "request"],
        ["help", "assist"],
        ["want", "would like"],
        ["tell", "inform"]
      ],
      why: "Switching to these verbs instantly makes an email sound more professional." },
    { kind: "choice", q: "Your email begins 'Dear Sir or Madam'. How should you end it?",
      right: "Yours faithfully,",
      wrong: ["Yours sincerely,", "Lots of love,"],
      why: "In British English, use Yours faithfully when you don't know the person's name and Yours sincerely when you do (Dear Ms López)." },
    { kind: "order", q: "Build the classic formal closing sentence.",
      words: ["I", "look", "forward", "to", "hearing", "from", "you."],
      why: "Look forward to is followed by -ing, because to here is a preposition: hearing, not hear." },
    { kind: "listen", say: "I would be grateful if you could reply as soon as possible.",
      why: "'I would be grateful if you could...' is a polite, formal way to make a request." }
  ],

  speak: [
    "Tell the story of a time you bought something that went wrong. What did you do about it?",
    "Say these out loud in a formal way: 'I want my money back', 'Can you help me?', 'I got your email'.",
    "Do you find it easier to complain in person, by phone or in writing? Why?"
  ],

  write: {
    prompt: "Write a formal email of complaint to a restaurant, an airline or a shop that disappointed you. Explain the problem, say what you would like them to do, and use at least four linking words from this unit (for example although, despite, furthermore, therefore).",
    min: 100,
    useWords: ["regarding", "request", "refund", "inconvenience"]
  }
});
