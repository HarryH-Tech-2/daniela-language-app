(window.UNITS = window.UNITS || []).push({
  id: "regrets",
  stage: 3,
  order: 13,
  emoji: "⚖️",
  title: "The case I lost",
  topic: "Law",
  intro: "You'll look back on a case that went wrong because of tiny mistakes, and learn to talk about the past that never happened with the third conditional and mixed conditionals.",

  vocab: [
    { w: "appeal", pos: "verb", def: "to formally ask a higher court to change a decision",
      ex: "We lost the case, so we decided to appeal.", es: "apelar" },
    { w: "deadline", pos: "noun", def: "the latest time or date by which something must be done",
      ex: "The deadline for the appeal was Friday at five o'clock.", es: "plazo / fecha límite" },
    { w: "clause", pos: "noun", def: "a section of a legal document, such as a contract",
      ex: "There was a clause on page fourteen that nobody had read.", es: "cláusula" },
    { w: "settle", pos: "verb", def: "to end a legal dispute by reaching an agreement, without waiting for a judge to decide",
      ex: "The landlord offered to settle, but she refused.", es: "llegar a un acuerdo (extrajudicial)" },
    { w: "testimony", pos: "noun", def: "what a witness formally says in court",
      ex: "His testimony fell apart in front of the judge.", es: "testimonio / declaración" },
    { w: "overturn", pos: "verb", def: "to officially change a legal decision so that it no longer applies",
      ex: "A higher court might have overturned the verdict.", es: "revocar / anular" },
    { w: "witness", pos: "noun", def: "a person who saw or heard something and describes it in court",
      ex: "Our key witness was the neighbour.", es: "testigo" },
    { w: "verdict", pos: "noun", def: "the official decision made at the end of a trial",
      ex: "We were all disappointed with the verdict.", es: "veredicto / fallo" },
    { w: "file", pos: "verb", def: "to officially give a document to a court or public office",
      ex: "I was in charge of filing the documents.", es: "radicar / presentar" },
    { w: "in hindsight", pos: "phrase", def: "thinking about the past with the knowledge you have now",
      ex: "In hindsight, I should have read the contract more carefully.", es: "en retrospectiva / visto ahora" }
  ],

  reading: {
    title: "Ninety days and one tinto",
    text: [
      "Last year, during my internship at a small law firm in Barranquilla, I worked on my first real case. Our client, Doña Carmen, ran a bakery near Paseo Bolívar, and her landlord wanted her out. My boss, Dr Restrepo, handed me the contract and said, 'Read every clause, Daniela. Every single one.' I thought I had.",
      "I hadn't. On page fourteen there was a clause that allowed the landlord to end the contract with ninety days' notice. If I had read it properly, I would have warned Doña Carmen. If she had known about it, she would probably have accepted the landlord's offer to settle: six months' rent if she left quietly. She refused, because I had told her she had a strong case.",
      "Then came the hearing. Our key witness was her neighbour, Don Julio, the most honest man in Barranquilla, who said he had heard the landlord promise her a five-year contract. Unfortunately, his testimony fell apart when he admitted that he had been watching a football match at the time and was 'only half listening'. If I had interviewed him properly before the hearing, that detail wouldn't have taken me by surprise.",
      "We lost, so we decided to appeal, and I was in charge of filing the documents. The deadline was Friday at five o'clock. I arrived at the court at seven minutes past five, because I had stopped to buy a tinto. If I hadn't stopped for that coffee, we would have filed on time, and a higher court might have overturned the verdict.",
      "In hindsight, that case taught me more than any lecture. If I hadn't made those mistakes, I wouldn't be so careful today: I check every deadline twice, and I read contracts the way other people read gossip magazines. If Dr Restrepo hadn't been so patient, I wouldn't be working at the firm now, but he just laughed and bought me another tinto. And Doña Carmen? She moved her bakery to a better street, and she still sends me pandebono every Friday. If she were still angry with me, she wouldn't do that, would she?"
    ]
  },

  grammar: {
    title: "Third and mixed conditionals",
    explain: [
      "Third conditional: if + past perfect, would have + past participle. It imagines a different past, the opposite of what really happened.",
      "Use might have or could have instead of would have when the result was only possible, not certain.",
      "Mixed conditional (past → present): if + past perfect, would + infinitive. A past action changes the present.",
      "Mixed conditional (present → past): if + past simple, would have + past participle. A present fact or personality trait explains a past result.",
      "In speech, 'd can mean had (in the if-clause) or would (in the result): If I'd known, I'd have called."
    ],
    examples: [
      { en: "If I had read the clause, I would have warned her.", note: "third conditional: I didn't read it, so I didn't warn her" },
      { en: "If I'd known about the deadline, I'd have left earlier.", note: "first 'd = had, second 'd = would" },
      { en: "If we had filed on time, the court might have overturned the verdict.", note: "might have = possible, not certain" },
      { en: "If I hadn't made those mistakes, I wouldn't be so careful today.", note: "mixed: past cause → present result" },
      { en: "If I were more organised, I wouldn't have missed the deadline.", note: "mixed: present fact (I'm not organised) → past result" }
    ],
    tip: "In Spanish you can say 'Si lo hubiera sabido, lo hubiera dicho', with the same form in both halves. English doesn't allow that: never put would in the if-clause, and never put had alone in the result. Not 'If I would have known...' or 'If I had known, I had told you', but 'If I had known, I would have told you.' And when you hear /ˈwʊdəv/, it's would've (would have), never 'would of'."
  },

  exercises: [
    { kind: "choice", q: "Why didn't Daniela file the appeal on time?",
      right: "She stopped to buy a coffee.",
      wrong: ["She thought the deadline was the following week.", "Dr Restrepo told her to wait.", "The court closed early."],
      why: "She arrived at seven minutes past five because she had stopped to buy a tinto." },
    { kind: "tf", s: "The landlord offered Doña Carmen money to leave the bakery.", answer: true,
      why: "He offered to settle: six months' rent if she left quietly." },
    { kind: "tf", s: "Don Julio lied in court about the landlord's promise.", answer: false,
      why: "He was 'the most honest man in Barranquilla'. His testimony fell apart because he honestly admitted he was only half listening." },
    { kind: "type", text: "If I {gap} (read) the clause properly, I would have warned Doña Carmen.",
      answers: ["had read", "'d read"],
      why: "The if-clause of a third conditional uses the past perfect: had + past participle." },
    { kind: "type", text: "If we had filed on time, a higher court might {gap} (overturn) the verdict.",
      answers: ["have overturned"],
      why: "After might in a third conditional we need have + past participle: might have overturned." },
    { kind: "gap", text: "If she had known about the clause, she {gap} the landlord's offer.",
      right: "would have accepted", wrong: ["had accepted", "accepted", "will have accepted"],
      why: "The result clause of a third conditional uses would have + past participle. 'Had accepted' is a typical Spanish-speaker mistake (from 'hubiera aceptado')." },
    { kind: "choice", q: "Which sentence means: 'I made mistakes in the past, and because of that I'm careful now'?",
      right: "If I hadn't made those mistakes, I wouldn't be so careful now.",
      wrong: ["If I didn't make those mistakes, I wouldn't be so careful now.", "If I hadn't made those mistakes, I won't be so careful now.", "If I wouldn't have made those mistakes, I wouldn't be so careful now."],
      why: "Past cause → present result is a mixed conditional: if + past perfect, would + infinitive." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "If I'd known about the deadline, I'd have left earlier.",
      wrong: ["If I would have known about the deadline, I'd have left earlier.", "If I had known about the deadline, I had left earlier."],
      why: "Would never goes in the if-clause, and the result needs would have. Here the first 'd = had and the second 'd = would." },
    { kind: "gap", text: "If I {gap} a more organised person, I wouldn't have missed the deadline.",
      right: "were", wrong: ["have been", "would be", "am"],
      why: "Being disorganised is a present, permanent fact, so the if-clause uses the past simple (were; 'was' is also common in speech). The result is in the past: a mixed conditional. ('Had been' would also be possible, as a normal third conditional.)" },
    { kind: "gap", text: "Instead of going to trial, the two companies decided to {gap} out of court.",
      right: "settle", wrong: ["overturn", "appeal", "file"],
      why: "To settle (out of court) means to end a dispute with an agreement instead of a judge's decision." },
    { kind: "match", q: "Match the legal words to their meanings.",
      pairs: [
        ["deadline", "the latest time something must be done"],
        ["clause", "a section of a contract"],
        ["testimony", "what a witness says in court"],
        ["overturn", "to officially reverse a court's decision"],
        ["appeal", "to ask a higher court to change a decision"]
      ],
      why: "All five appear in Daniela's story about Doña Carmen's case." },
    { kind: "choice", q: "'In hindsight, I should have read the contract.' What does 'in hindsight' mean?",
      right: "looking back, with the knowledge you have now",
      wrong: ["at the very last minute", "without anybody knowing"],
      why: "Hindsight is understanding a situation only after it has happened." },
    { kind: "order", q: "Build a third conditional sentence.",
      words: ["If", "I", "had", "read", "the", "contract,", "I", "would", "have", "known."],
      why: "If + past perfect (had read), then would have + past participle (would have known)." },
    { kind: "listen", say: "If I had checked the deadline, we would have filed the appeal on time.",
      why: "In fast speech, 'would have' sounds like 'would've' /ˈwʊdəv/." }
  ],

  speak: [
    "Tell the story of a time something went wrong because of a small mistake. What would have happened if you had done things differently?",
    "Think of a decision you made in the past that changed your life. If you hadn't made it, how would your life be different now?",
    "If you had been born in another city, would you still love dancing? Why or why not?"
  ],

  write: {
    prompt: "Write about a mistake you made at work, at university or in your personal life. Explain what happened, what would have happened if you had acted differently, and how it affects you today. Use at least one third conditional and one mixed conditional.",
    min: 100,
    useWords: ["deadline", "in hindsight", "settle"]
  }
});
