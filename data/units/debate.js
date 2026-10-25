(window.UNITS = window.UNITS || []).push({
  id: "debate",
  stage: 4,
  order: 20,
  emoji: "🎤",
  title: "Make your case",
  topic: "Debate",
  intro: "Should dogs be allowed in restaurants and offices? You'll argue your case like a university debater, learning to hedge your claims (arguably, it seems likely, there is little evidence to suggest) and to persuade with rhetorical questions and strong collocations.",

  vocab: [
    { w: "arguably", pos: "adverb", def: "used to say that something can reasonably be claimed, although not everyone may agree",
      ex: "Lola is arguably the best-behaved dog in the building.", es: "posiblemente, se podría decir que" },
    { w: "compelling", pos: "adjective", def: "so strong or convincing that you have to accept it",
      ex: "She made a compelling argument for allowing dogs at work.", es: "convincente, contundente" },
    { w: "raise concerns", pos: "phrase", def: "make people aware that there may be a problem",
      ex: "Several restaurant owners have raised concerns about hygiene.", es: "expresar preocupación, plantear inquietudes" },
    { w: "address", pos: "verb", def: "start dealing with a problem or question",
      ex: "The new policy addresses the issue of allergies.", es: "abordar, tratar (un problema)" },
    { w: "tend to", pos: "phrase", def: "usually do something or be likely to happen",
      ex: "Dogs tend to be calmer when they are walked regularly.", es: "tender a, soler" },
    { w: "evidence", pos: "noun", def: "facts or information that show whether something is true",
      ex: "There is little evidence that well-trained dogs cause health problems.", es: "pruebas, evidencia" },
    { w: "undermine", pos: "verb", def: "make something weaker or less effective, often gradually",
      ex: "One badly behaved dog could undermine the whole idea.", es: "socavar, debilitar" },
    { w: "counterargument", pos: "noun", def: "an argument against another argument or idea",
      ex: "A good speaker always prepares for the strongest counterargument.", es: "contraargumento" },
    { w: "outweigh", pos: "verb", def: "be greater or more important than something else",
      ex: "In my view, the benefits clearly outweigh the risks.", es: "pesar más que, superar" },
    { w: "hygiene", pos: "noun", def: "keeping yourself and your surroundings clean to prevent illness",
      ex: "Food hygiene rules are very strict in British restaurants.", es: "higiene" }
  ],

  reading: {
    title: "This house would let the dogs in",
    text: [
      "Last Thursday, the university debating society met to discuss a motion close to my heart: ‘This house believes that dogs should be allowed in restaurants and offices.’ I was proposing. My opponent, Andrés, is allergic to dogs, slightly terrified of Lola and, unfortunately, very good at arguing. Here is part of my opening speech.",
      "‘Madam Chair, members of the house. Opponents of this motion tend to make one argument above all others: hygiene. They raise legitimate concerns, and I do not intend to dismiss them. But let us look at the evidence. There is little evidence to suggest that clean, well-behaved dogs pose a significant health risk to diners, and in many European cities dogs have been lying quietly under café tables for decades. Are Parisians falling ill in their thousands? I think not.’",
      "‘Secondly, the case for dogs in the workplace is arguably even more compelling. It seems likely that having a dog in the office reduces stress and encourages people to take breaks. Several studies point in this direction, although, admittedly, the research is still limited. And who among us has not felt their mood lift when a dog wanders over to say hello?’",
      "‘It could be argued, of course, that not everyone loves dogs. Some people are allergic; others are frightened. This is a serious counterargument, and we must address it. We are not proposing that every dog should be allowed everywhere, but that businesses should be free to choose, with clear rules, dog-free areas and calm, vaccinated animals. Surely the benefits outweigh the risks when those risks can be managed so easily?’",
      "Andrés's reply was sharp. He argued that dog-free areas would undermine my whole case, because a restaurant with a dog-free area is, in practice, still a restaurant with dogs. It was, I have to admit, a compelling point. In the end, we lost the vote by three. Lola, when I told her, did not seem particularly bothered."
    ]
  },

  grammar: {
    title: "Hedging and persuasive language",
    explain: [
      "Hedging makes a claim more cautious, so it is harder to attack and sounds more academic: tend to, appear to, it seems likely that, arguably, may/might, there is little evidence to suggest that.",
      "Distancing structures let you present an idea without fully owning it, which is perfect for introducing a counterargument: It could be argued that..., It is often claimed that..., Some would argue that...",
      "'Little' (no article) means 'almost none' and sounds negative: There is little evidence = hardly any evidence. 'A little' means 'some': There is a little evidence. Evidence is uncountable, so never 'few evidence' or 'evidences'.",
      "Persuasion comes from rhetorical questions (Who among us has not...? Are we really saying that...?), 'surely' to invite agreement, and strong collocations: a compelling argument, raise concerns, address an issue, the benefits outweigh the risks.",
      "A strong debater combines both: concede a point with a hedge, then push back firmly. While it is true that some people are allergic, surely that is a reason for clear rules, not a ban?"
    ],
    examples: [
      { en: "It could be argued that dogs distract employees.", note: "distancing: presenting a view you may not share" },
      { en: "There is little evidence to suggest that clean dogs pose a health risk.", note: "little = almost no; very common in academic writing" },
      { en: "Dogs tend to be calmer in quiet environments.", note: "tend to + infinitive: generally true, not always" },
      { en: "This is arguably the most compelling argument of all.", note: "arguably usually goes before the word or phrase it modifies" },
      { en: "Are Parisians falling ill in their thousands? I think not.", note: "a rhetorical question: the speaker expects the answer 'no'" },
      { en: "Surely the benefits outweigh the risks?", note: "surely invites the audience to agree" }
    ],
    tip: "Two classic Colombian slips here. First, Spanish 'se podría argumentar que' has no subject, so people write 'Could be argued that...'. English needs the dummy subject: 'It could be argued that...'. Second, don't add prepositions where Spanish has them: you 'discuss an issue' (not 'discuss about'), 'address a problem' (not 'address to') and 'debate a motion'. And remember: 'evidence' is uncountable. Say 'a piece of evidence' or 'some evidence', never 'an evidence' or 'evidences'."
  },

  exercises: [
    { kind: "tf", s: "Daniela's side won the debate.", answer: false,
      why: "'In the end, we lost the vote by three.'" },
    { kind: "choice", q: "How does Daniela deal with the argument that some people are allergic to or frightened of dogs?",
      right: "She accepts it is serious and suggests clear rules and dog-free areas.",
      wrong: ["She says there is no evidence that allergies exist.", "She ignores it and only talks about hygiene."],
      why: "She calls it 'a serious counterargument' that 'we must address', then proposes rules, dog-free areas and calm, vaccinated animals." },
    { kind: "tf", s: "Daniela claims that research has definitely proved that dogs reduce stress in offices.", answer: false,
      why: "She hedges: 'It seems likely that...' and admits 'the research is still limited'. A good debater doesn't overstate the evidence." },
    { kind: "choice", q: "Why does Daniela ask 'Are Parisians falling ill in their thousands?'",
      right: "To make a point: she expects the answer to be 'no'.",
      wrong: ["Because she wants the audience to give her statistics.", "To admit that her hygiene argument is weak."],
      why: "It's a rhetorical question. Nobody is expected to answer; it suggests that if dogs in cafés were dangerous, we would already know." },
    { kind: "gap", text: "{gap} be argued that dogs distract employees from their work.", right: "It could",
      wrong: ["Could", "There could", "It could to"],
      why: "English needs a subject, so we use the dummy 'It': It could be argued that... After a modal, the verb has no 'to'." },
    { kind: "gap", text: "There is {gap} evidence to suggest that dogs make restaurants less hygienic.", right: "little",
      wrong: ["few", "a few", "many"],
      why: "'Evidence' is uncountable, so 'few', 'a few' and 'many' are impossible. 'Little' = almost none, a typical academic hedge." },
    { kind: "choice", q: "Which is the most cautious (hedged) version of 'Dogs reduce stress at work'?",
      right: "Dogs appear to reduce stress in some workplaces.",
      wrong: ["Dogs always reduce stress at work.", "It is a fact that dogs reduce stress at work.", "Dogs definitely reduce stress at work."],
      why: "'Appear to' and 'in some workplaces' both soften the claim. 'Always', 'it is a fact' and 'definitely' make it stronger and easier to attack." },
    { kind: "type", text: "{gap} (argue), the strongest reason to allow dogs in offices is their effect on mental health.", answers: ["Arguably"],
      why: "The adverb 'arguably' hedges the claim: you think it's true, but you accept that others may disagree." },
    { kind: "type", text: "The proposal has {gap} (raise) serious concerns among restaurant owners.", answers: ["raised"],
      why: "'Has' + past participle: present perfect. 'Raise concerns' is a strong collocation meaning 'make people worry about a possible problem'." },
    { kind: "gap", text: "Before the policy is introduced, we need to {gap} the issue of allergies.", right: "address",
      wrong: ["discuss about", "address to", "talk"],
      why: "'Address an issue' takes a direct object, with no preposition. 'Discuss about' is a common error (just 'discuss the issue'), and 'talk' would need 'about'." },
    { kind: "order", q: "Build a sentence that introduces a counterargument.", words: ["It", "could", "be", "argued", "that", "dogs", "belong", "outside."],
      why: "It + could be argued + that-clause: a distancing structure that presents an opinion without saying it's yours." },
    { kind: "match", q: "Match each word or phrase to its meaning.", pairs: [
      ["tend to", "usually do something"],
      ["it seems likely", "it is probably true"],
      ["there is little evidence", "almost nothing proves it"],
      ["outweigh", "be more important than"],
      ["undermine", "make something weaker"]
    ], why: "The first three are hedges; 'outweigh' and 'undermine' are powerful verbs for weighing up arguments." },
    { kind: "gap", text: "Andrés made a {gap} point: a restaurant with a dog-free area is still a restaurant with dogs.", right: "compelling",
      wrong: ["compelled", "complaining", "convinced"],
      why: "A 'compelling' point or argument is so convincing that it's hard to reject. 'Compelled' means forced, and 'convinced' describes a person, not an argument." },
    { kind: "listen", say: "There is little evidence to suggest that dogs pose a serious risk.",
      why: "'There is little evidence to suggest that...' is one of the most useful hedges in academic English." }
  ],

  speak: [
    "Give a one-minute speech for or against this motion: 'Dogs should be allowed in restaurants and offices.' Include one rhetorical question and one hedge.",
    "Now argue the opposite side. Start with 'It could be argued that...' and address at least one counterargument.",
    "Should Carnaval de Barranquilla have stricter rules about noise and alcohol? Give a balanced answer using 'tend to', 'arguably' and 'the benefits outweigh...'."
  ],

  write: {
    prompt: "Write the opening paragraph of a debate speech on the motion 'This house believes that dogs should be allowed in offices.' Choose a side, present your main argument, introduce one counterargument and respond to it. Use at least three hedging expressions and one rhetorical question.",
    min: 120,
    useWords: ["compelling", "address", "evidence", "outweigh", "arguably"]
  }
});
