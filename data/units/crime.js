(window.UNITS = window.UNITS || []).push({
  id: "crime",
  stage: 2,
  order: 7,
  emoji: "⚖️",
  title: "On trial",
  topic: "Crime & law",
  intro: "You're going to watch a real trial in London and learn the passive voice in every main tense, plus 'be supposed to' and 'is said to'. Perfect for a future lawyer!",

  vocab: [
    { w: "arrest", pos: "verb", def: "(of the police) to take someone away because they think that person has committed a crime",
      ex: "The police arrested him outside the gallery.", es: "arrestar, detener" },
    { w: "charge", pos: "verb", def: "to say officially that someone is accused of a crime",
      ex: "She was charged with fraud.", es: "acusar formalmente, imputar" },
    { w: "plead", pos: "verb", def: "to say in court whether you are guilty or not guilty",
      ex: "He pleaded not guilty to all the charges.", es: "declararse (culpable / inocente)" },
    { w: "defendant", pos: "noun", def: "the person in a court case who is accused of a crime",
      ex: "The defendant looked calm as the trial began.", es: "acusado/a" },
    { w: "jury", pos: "noun", def: "a group of ordinary people who listen to a trial and decide if someone is guilty",
      ex: "The jury took four hours to make their decision.", es: "jurado" },
    { w: "witness", pos: "noun", def: "a person who saw something happen and tells a court about it",
      ex: "The witness said she had seen him leaving the building.", es: "testigo" },
    { w: "evidence", pos: "noun", def: "facts, objects or information that help to prove whether something is true",
      ex: "There wasn't enough evidence to prove she was guilty.", es: "pruebas" },
    { w: "verdict", pos: "noun", def: "the official decision of a jury or judge: guilty or not guilty",
      ex: "Everyone in the courtroom went quiet as the verdict was read out.", es: "veredicto" },
    { w: "sentence", pos: "verb", def: "(of a judge) to give someone an official punishment",
      ex: "He was sentenced to two years in prison.", es: "condenar, sentenciar" },
    { w: "acquit", pos: "verb", def: "to decide officially that someone is not guilty of a crime",
      ex: "After a long trial, she was acquitted of all charges.", es: "absolver" }
  ],

  reading: {
    title: "The flamingo affair",
    text: [
      "On my trip to London last month, I did something I'd been dreaming about for years: I watched a real trial at the Old Bailey. In Colombia, criminal cases aren't decided by a jury, so I was dying to see one in action. The case is known in the newspapers as 'the flamingo affair'.",
      "In March, a painting called Flamingos at Dawn, by a Colombian artist, was stolen from a small gallery in London. It is said to be worth more than a hundred thousand pounds. For weeks, nobody knew where it was. Then a man was arrested after he had been seen on CCTV leaving the gallery with a very large 'yoga mat'. He was charged with theft, but he pleaded not guilty.",
      "In court, the evidence was presented by the prosecutor, piece by piece. The jury were shown the CCTV footage, and a witness was questioned for almost an hour. The defendant's lawyer insisted that the painting had been given to his client as a present. Nobody believed him, and I suspect that included the judge.",
      "While the jury were making their decision, we all waited outside. After four hours, we were called back in, and the verdict was read out: guilty. His friend, who had been accused of helping him, was acquitted. The painting has now been returned to the gallery, and the man will be sentenced next month.",
      "The best part? On my way out, I was asked by a journalist what I thought. I'm supposed to be studying for my English exam, but honestly, I learnt more vocabulary in one afternoon at the Old Bailey than in a month of textbooks."
    ]
  },

  grammar: {
    title: "The passive voice",
    explain: [
      "Form the passive with the verb be + past participle. Only be changes tense: is stolen, is being stolen, was stolen, has been stolen, had been stolen, will be stolen.",
      "Use the passive when the action is more important than who did it, or when we don't know or don't care who did it: 'My phone was stolen.' It is very common in news reports and legal language.",
      "To say who did the action, add by: 'The evidence was presented by the prosecutor.' Only do this when the information is useful.",
      "After a modal verb, use be + past participle: 'He could be sent to prison.' 'The verdict must be respected.'",
      "'Be supposed to' means something is expected or planned (often it doesn't happen): 'I'm supposed to be studying.' 'Is said to' + infinitive reports what people generally say: 'The painting is said to be worth a fortune.'"
    ],
    examples: [
      { en: "The painting was stolen in March.", note: "past simple passive" },
      { en: "The witness is being questioned right now.", note: "present continuous passive" },
      { en: "The painting has been returned to the gallery.", note: "present perfect passive" },
      { en: "He had been seen on CCTV before he was arrested.", note: "past perfect passive + past simple passive" },
      { en: "He will be sentenced next month.", note: "future passive" },
      { en: "The judge is said to be very strict.", note: "is said to + infinitive" }
    ],
    tip: "Spanish often uses 'se' where English uses the passive: 'Se arrestó a dos hombres' = 'Two men were arrested' (not 'It arrested two men'). 'Se dice que es rico' = 'He is said to be rich' or 'It is said that he is rich' (never 'It says he is rich'). And don't drop the verb be: 'The painting stolen in March' is only part of a sentence; you need 'The painting was stolen in March.'"
  },

  exercises: [
    { kind: "tf", s: "Before the trial, the defendant admitted that he had stolen the painting.", answer: false,
      why: "He pleaded not guilty, and his lawyer said the painting had been given to him as a present." },
    { kind: "choice", q: "Why was the man arrested?",
      right: "He had been seen on CCTV leaving the gallery with something large.",
      wrong: ["He had been caught trying to sell the painting online.", "His friend had told the police everything."],
      why: "The text says he was arrested 'after he had been seen on CCTV leaving the gallery with a very large yoga mat'." },
    { kind: "tf", s: "The jury needed about four hours to reach their verdict.", answer: true,
      why: "'After four hours, we were called back in, and the verdict was read out.'" },
    { kind: "type", text: "The man {gap} (arrest) last May, two months after the theft.",
      answers: ["was arrested", "got arrested"],
      why: "A finished action at a past time (last May), and the man didn't do the arresting, so we need the past simple passive: was + arrested." },
    { kind: "type", text: "Shh! The witness {gap} (question) by the lawyer right now.",
      answers: ["is being questioned", "'s being questioned"],
      why: "'Right now' needs the present continuous, and the witness receives the action, so: is being + past participle." },
    { kind: "gap", text: "The stolen necklace {gap} yet. The police are still looking for it.",
      right: "hasn't been found",
      wrong: ["hasn't found", "isn't finding", "hasn't been finding"],
      why: "A necklace can't find anything: it is found by someone. 'Yet' points to the present perfect, so the present perfect passive: hasn't been found." },
    { kind: "choice", q: "Change to the passive: 'The judge will sentence him next month.'",
      right: "He will be sentenced next month.",
      wrong: ["He will sentenced next month.", "He will being sentenced next month.", "He is sentencing next month."],
      why: "Future passive = will + be + past participle. Without 'be' the sentence is wrong, and 'He is sentencing' means he is the judge!" },
    { kind: "choice", q: "Which sentence is correct?",
      right: "The suspect is said to have left the country.",
      wrong: ["The suspect is said that he left the country.", "The suspect says to have left the country."],
      why: "The pattern is subject + is said + to-infinitive. For a past action, use 'to have' + past participle. You can also say 'It is said that the suspect left the country.'" },
    { kind: "gap", text: "The defendant {gap} to arrive at ten, but he was forty minutes late.",
      right: "was supposed",
      wrong: ["was supposing", "supposed", "was suppose"],
      why: "'Be supposed to' (what was planned or expected) always needs be + supposed with -ed: 'was supposed to arrive'." },
    { kind: "gap", text: "After two days, the jury finally reached a {gap}: not guilty.",
      right: "verdict",
      wrong: ["sentence", "charge", "witness"],
      why: "The verdict is the decision: guilty or not guilty. The sentence is the punishment the judge gives afterwards, only if the person is guilty." },
    { kind: "choice", q: "If a defendant 'pleads guilty', he...",
      right: "admits in court that he committed the crime.",
      wrong: ["asks the judge to forgive him.", "says in court that he is innocent."],
      why: "To plead guilty is to accept, officially, that you did it. To say you're innocent is to plead not guilty. Note: in British English the past is 'pleaded'; Americans also say 'pled'." },
    { kind: "match", q: "Match the words to their meanings.",
      pairs: [
        ["acquit", "decide officially that someone is not guilty"],
        ["witness", "a person who saw something and tells the court"],
        ["jury", "ordinary people who decide if someone is guilty"],
        ["sentence", "give someone an official punishment"],
        ["evidence", "information or objects that help to prove something"]
      ] },
    { kind: "order", q: "Build the sentence.",
      words: ["The", "painting", "was", "stolen", "from", "a", "gallery", "in", "March."],
      why: "Passive word order: subject + was + past participle. Then place (from a gallery) before time (in March)." },
    { kind: "listen", say: "The defendant was found not guilty and walked out of court smiling.",
      why: "'Was found not guilty' is a passive: the jury found him not guilty." }
  ],

  speak: [
    "Describe a famous court case you know about, from Colombia or anywhere else. What was the person accused of, and what was the verdict? Use at least three passive verbs.",
    "In Colombia, criminal cases are decided by judges, not juries. Which system do you think is fairer, and why?",
    "Talk about something you were supposed to do this week but didn't. What happened?"
  ],

  write: {
    prompt: "Write a short news report about an invented crime in Barranquilla: maybe a stolen Carnaval costume, or a celebrity selling fake designer handbags. Say what happened, who was arrested and charged, and what happened in court. Use at least five passive forms in different tenses.",
    min: 80,
    useWords: ["arrest", "charge", "evidence", "verdict"]
  }
});
