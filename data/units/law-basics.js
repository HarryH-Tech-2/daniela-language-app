(window.UNITS = window.UNITS || []).push({
  id: "law-basics",
  stage: 2,
  order: 6,
  emoji: "⚖️",
  title: "Law 101",
  topic: "Law",
  intro: "Your first day on a law course, with a visit to a real law firm. You'll learn the zero, first and second conditionals, the basic vocabulary of the courtroom, and a few false friends that can make a Spanish speaker sound very confused.",

  vocab: [
    { w: "lawyer", pos: "noun", def: "a person whose job is to give legal advice and represent people in legal matters", ex: "If you get into trouble, call a lawyer.", es: "abogado" },
    { w: "court", pos: "noun", def: "the place where legal cases are heard and decided", ex: "The case went to court last year.", es: "tribunal, juzgado" },
    { w: "sue", pos: "verb", def: "to take legal action against someone to get money or compensation from them", ex: "She decided to sue her landlord.", es: "demandar" },
    { w: "judge", pos: "noun", def: "the person who controls a trial in court and decides the result or punishment", ex: "The judge listened carefully to both sides.", es: "juez" },
    { w: "witness", pos: "noun", def: "a person who saw something happen and tells a court about it", ex: "The witness said she saw the car go through a red light.", es: "testigo" },
    { w: "evidence", pos: "noun", def: "facts, objects or documents that show whether something is true (uncountable)", ex: "There wasn't enough evidence to prove he did it.", es: "pruebas" },
    { w: "guilty", pos: "adjective", def: "responsible for breaking a law, according to a court", ex: "The jury found him guilty of fraud.", es: "culpable" },
    { w: "rights", pos: "noun", def: "the things the law says every person is allowed to have or do", ex: "Everyone should know their rights.", es: "derechos" },
    { w: "degree", pos: "noun", def: "the qualification you get after studying at university", ex: "She's doing a law degree at the Universidad del Norte.", es: "carrera universitaria, título" },
    { w: "case", pos: "noun", def: "a legal matter that a court has to decide", ex: "Lawyers can't win every case.", es: "caso, proceso" }
  ],

  reading: {
    title: "Day one at the law firm",
    text: [
      "Today I started a short evening course in law, and our first activity was a visit to a law firm in the north of the city. I was so excited that I arrived forty minutes early. If I'm nervous, I always arrive too early. It's a terrible habit.",
      "A senior lawyer, Ms Herrera, showed us around. She told us that the most important thing in her job is evidence. 'If you don't have evidence, you don't have a case,' she said. 'If a witness says one thing and the documents say another, the judge usually believes the documents. The judge decides if someone is guilty, but a good lawyer decides what the judge sees.'",
      "Then she described a real situation. A woman's neighbour had cut down a tree in her garden without permission. 'If she sues him, she'll probably win,' Ms Herrera explained, 'but if they go to court, it will take at least two years. So I'm going to advise her to negotiate first.'",
      "At lunch I made a funny mistake. I told a trainee from London that I wanted to be an 'advocate'. She smiled. 'An advocate for what? In everyday English, an advocate is someone who publicly supports a cause. You mean a lawyer!' Then I told her my 'career' was very difficult, and she thought I was talking about my job, not my university degree.",
      "On the bus home I kept thinking about the day. If I studied law full-time, I would specialise in human rights. If I had more money, I would start tomorrow. And if I were a judge, I would ban loud music on buses. Well, maybe not all music. But definitely people who play it without headphones."
    ]
  },

  grammar: {
    title: "Zero, first and second conditionals",
    explain: [
      "Zero conditional: If + present simple, present simple. For things that are always or generally true, and habits. If you don't have evidence, you don't have a case.",
      "First conditional: If + present simple, will + verb. For real possibilities in the future. If she sues him, she'll probably win.",
      "Second conditional: If + past simple, would + verb. For imaginary or unlikely situations in the present or future. The past form does not refer to the past. If I had more money, I would study full-time.",
      "In the second conditional, 'If I were' is the standard form for every person (If I were a judge, if she were rich). 'If I was' is common in conversation, but 'were' is safer in exams and formal writing.",
      "Never put will or would in the if-part of these conditionals: If it rains, not 'If it will rain'; If I had, not 'If I would have'."
    ],
    examples: [
      { en: "If a witness lies in court, it's a crime.", note: "zero conditional: always true" },
      { en: "If they go to court, it will take two years.", note: "first conditional: a real future possibility" },
      { en: "If I studied law full-time, I would specialise in human rights.", note: "second conditional: an imaginary situation" },
      { en: "If I were you, I'd call a lawyer.", note: "second conditional for advice: 'If I were you'" },
      { en: "You'll lose the case unless you find more evidence.", note: "unless = if not" }
    ],
    tip: "Spanish speakers often put will or would after if: 'If I will see him' or 'If I would have money' (from 'si tuviera'). English uses the past simple: 'If I had money, I would travel'. Watch out for legal false friends, too: 'abogado' is a lawyer (an 'advocate' usually means a supporter of a cause), 'carrera' is a degree or course (a 'career' is your professional life), and 'demandar' is to sue (to 'demand' means to ask for something forcefully). And it's 'depend on', never 'depend of': 'It depends on the evidence'."
  },

  exercises: [
    { kind: "tf", s: "Ms Herrera thinks the woman should go to court immediately.", answer: false,
      why: "She's going to advise her 'to negotiate first', because going to court will take at least two years." },
    { kind: "choice", q: "Why did Daniela arrive forty minutes early?",
      right: "She always arrives early when she's nervous.",
      wrong: ["Her bus was faster than usual.", "Ms Herrera asked the students to come early."],
      why: "She says: 'If I'm nervous, I always arrive too early.' That's a zero conditional: a habit that is always true for her." },
    { kind: "choice", q: "In everyday English, what is an 'advocate'?",
      right: "Someone who publicly supports a cause",
      wrong: ["A judge's assistant", "A university law student"],
      why: "An advocate is a supporter: 'an advocate of animal rights'. The everyday word for 'abogado' is 'lawyer'." },
    { kind: "gap", text: "If you {gap} enough evidence, you'll lose the case.",
      right: "don't have", wrong: ["won't have", "wouldn't have"],
      why: "First conditional: if + present simple, then will. 'Will' and 'would' never go in the if-part." },
    { kind: "gap", text: "If I {gap} a judge, I would ban loud music on buses.",
      right: "were", wrong: ["am", "will be"],
      why: "This is imaginary (she isn't a judge), so it's a second conditional: if + past simple, would. 'If I were' is the standard form." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "If I had a law degree, I would work for a human rights organisation.",
      wrong: ["If I would have a law degree, I would work for a human rights organisation.", "If I have a law degree, I would work for a human rights organisation."],
      why: "Second conditional: if + past simple ('had'), then 'would'. Don't put 'would' after 'if', and don't mix the present ('have') with 'would'." },
    { kind: "type", text: "If I {gap} (have) more money, I would study law full-time.",
      answers: ["had"],
      why: "An imaginary situation takes the second conditional, so the if-part uses the past simple: 'If I had'. It talks about now, not the past." },
    { kind: "type", text: "If they go to court, it {gap} (take) at least two years.",
      answers: ["will take", "'ll take", "is going to take", "'s going to take"],
      why: "This is a real future possibility, so it's a first conditional: if + present simple ('go'), then 'will take'." },
    { kind: "order", q: "Build the sentence.",
      words: ["If", "she", "sues", "him,", "she'll", "probably", "win."],
      why: "First conditional: if + present simple ('sues'), then will ('she'll win'). The comma goes after the if-part when it comes first." },
    { kind: "match", q: "Match the legal words to their meanings.",
      pairs: [
        ["lawyer", "a person who gives legal advice"],
        ["judge", "the person who controls a trial and decides the result"],
        ["witness", "a person who saw something happen"],
        ["evidence", "facts or documents that prove something"],
        ["sue", "take legal action to get money from someone"]
      ] },
    { kind: "choice", q: "'Estoy estudiando la carrera de Derecho.' Which is the correct translation?",
      right: "I'm doing a law degree.",
      wrong: ["I'm doing a law career.", "I'm studying a law race."],
      why: "'Carrera' (at university) is a 'degree' or 'course'. A 'career' is your professional life over many years: 'She had a long career as a judge'." },
    { kind: "gap", text: "The jury decided he was {gap}, so he went to prison.",
      right: "guilty", wrong: ["innocent", "witness"],
      why: "'Guilty' means responsible for the crime, which is why he went to prison. If he were innocent, he would go free, and 'witness' is a noun for a person." },
    { kind: "listen", say: "If you don't have evidence, you don't have a case.",
      why: "Zero conditional: present simple in both parts, because it's always true. Note that 'evidence' is uncountable: no 'an' and no '-s'." },
    { kind: "tf", s: "Daniela would like to specialise in human rights.", answer: true,
      why: "She says: 'If I studied law full-time, I would specialise in human rights.' The second conditional shows it's a dream, not a plan yet." }
  ],

  speak: [
    "If you were a lawyer, what kind of cases would you like to work on, and why?",
    "What will you do if you have some free time this weekend?",
    "Explain the difference between 'career' and 'degree', and between 'lawyer' and 'advocate', as if you were teaching a friend."
  ],

  write: {
    prompt: "Imagine you have just finished your first week on a law course. Write an email to a friend about it. Include one general truth about the law (zero conditional), one real plan or possibility (first conditional) and what you would do if you were a judge or a lawyer (second conditional).",
    min: 80,
    useWords: ["lawyer", "court", "evidence", "rights", "degree"]
  }
});
