(window.UNITS = window.UNITS || []).push({
  id: "contracts",
  stage: 4,
  order: 19,
  emoji: "⚖️",
  title: "Legal English: contracts",
  topic: "Law",
  intro: "Time to put your legal brain to work in English. You'll learn the formal language of contracts (shall, hereby, whereas, notwithstanding, pursuant to) and nominalisation, then translate real-looking clauses into plain English.",

  vocab: [
    { w: "shall", pos: "verb", def: "(in contracts) must; used to create a legal obligation",
      ex: "The Tenant shall pay the rent on the first day of each month.", es: "deberá (obligación contractual)" },
    { w: "hereby", pos: "adverb", def: "(formal) by means of this document or these words",
      ex: "I hereby resign from my position as dance instructor.", es: "por la presente, por medio del presente" },
    { w: "whereas", pos: "conjunction", def: "(in a contract) considering that; introduces the background facts at the start",
      ex: "Whereas the School wishes to engage the Instructor, the parties agree as follows.", es: "considerando que, por cuanto" },
    { w: "notwithstanding", pos: "preposition", def: "(formal) in spite of; even though something else says otherwise",
      ex: "Notwithstanding clause 3, the School may cancel classes during Carnaval.", es: "no obstante, sin perjuicio de" },
    { w: "pursuant to", pos: "preposition", def: "(formal) in accordance with; under",
      ex: "Payment shall be made pursuant to clause 9.", es: "de conformidad con, en virtud de" },
    { w: "liable", pos: "adjective", def: "legally responsible for paying for something or for the results of something",
      ex: "The Tenant shall be liable for any damage caused by her dog.", es: "responsable (legalmente)" },
    { w: "breach", pos: "noun", def: "a failure to do what a contract or law requires",
      ex: "Not paying the rent for three months is a serious breach of the agreement.", es: "incumplimiento" },
    { w: "terminate", pos: "verb", def: "(formal) end a contract or agreement officially",
      ex: "Either party may terminate the contract with four weeks' notice.", es: "rescindir, dar por terminado" },
    { w: "indemnify", pos: "verb", def: "promise to pay for someone else's losses or legal costs if something goes wrong",
      ex: "The Instructor shall indemnify the School against all claims.", es: "indemnizar, mantener indemne" },
    { w: "party", pos: "noun", def: "one of the people or organisations who sign and are bound by a contract",
      ex: "Both parties must sign every page of the agreement.", es: "parte (de un contrato)" }
  ],

  reading: {
    title: "The small print",
    text: [
      "When a salsa school in Bristol offered me a summer contract to teach beginners' classes, I nearly said yes on the spot. Then the contract arrived: eleven pages of dense legal English. Fortunately, my law lectures in Barranquilla taught me one golden rule: never sign anything you can't explain to your grandmother. So I made a coffee, told Lola, my neighbour's dog, that our walk would have to wait, and started translating.",
      "It opens with a recital: ‘Whereas the School wishes to engage the Instructor to deliver dance classes, the parties hereby agree as follows.’ In plain English: the school wants to hire you, so this is what you are both agreeing to. The parties are simply the people signing (the school and me), and ‘hereby’ just means ‘by this document’.",
      "Clause 4 is where things get serious. ‘The Instructor shall deliver no fewer than twelve classes per month.’ In legal drafting, ‘shall’ is not about the future; it creates an obligation. Translation: you must teach at least twelve classes. Clause 7 states that ‘the Instructor shall be liable for any damage to School property caused by her negligence.’ So if I break a mirror practising my spins, I pay for it. Fair enough.",
      "Then came the clause that made me put my coffee down: ‘The Instructor shall indemnify the School against all claims arising from injuries sustained during classes.’ To indemnify someone is to promise to cover their losses. In other words, if a student twisted an ankle during a cumbia class, I, not the school, could end up paying. Much as I love dancing, that is not a risk I'm prepared to take on a teacher's salary.",
      "Finally, termination. ‘Either party may terminate this Agreement by giving four weeks' written notice. Notwithstanding the foregoing, the School may terminate this Agreement with immediate effect in the event of a material breach by the Instructor.’ Plain English: either of us can end the contract with a month's notice, but if I seriously break the rules, they can end it at once. And pursuant to clause 9.3 (‘under clause 9.3’, to you and me), any fees owed to me must be paid within thirty days of termination.",
      "I emailed the school that evening. I didn't turn the job down; I simply asked them to delete the indemnity clause. They agreed the next morning. Sometimes the best dance move is knowing when to take a step back."
    ]
  },

  grammar: {
    title: "Legal register and nominalisation",
    explain: [
      "In contracts, 'shall' expresses an obligation, not the future: The Tenant shall pay = the tenant must pay. 'Shall not' = must not. 'May' gives a right or permission: Either party may terminate.",
      "A few fixed formal words do a lot of work: hereby (by means of this document), whereas (introduces the background facts in a recital), notwithstanding (in spite of / even though something else says otherwise), pursuant to (in accordance with / under).",
      "Nominalisation means turning verbs and adjectives into nouns. It makes a text more formal, impersonal and precise: terminate → termination, pay → payment, fail → failure, liable → liability, breach (verb) → a breach (noun).",
      "Nominalised legal English often uses a noun with a 'light' verb or a preposition: give notice, make payment, accept liability for, be in breach of, upon termination of this Agreement.",
      "Watch the prepositions: liable for something (and liable to someone), in breach of, pursuant to. 'Notwithstanding' takes no preposition at all: notwithstanding clause 3."
    ],
    examples: [
      { en: "The Tenant shall not keep pets without the Landlord's written consent.", note: "shall not = must not" },
      { en: "Notwithstanding clause 5, the School may cancel classes during Carnaval week.", note: "notwithstanding = in spite of what clause 5 says" },
      { en: "Payment shall be made pursuant to Schedule 2.", note: "pursuant to = in accordance with" },
      { en: "If the Instructor ends the contract early → Early termination by the Instructor shall...", note: "nominalisation: a verb phrase becomes a noun phrase" },
      { en: "The School accepts no liability for personal belongings left in the studio.", note: "liable (adjective) → liability (noun)" },
      { en: "Failure to give notice shall constitute a breach of this Agreement.", note: "fail → failure; a breach of" }
    ],
    tip: "Spanish 'responsable de' leads many Colombians to write 'liable of'. In English you are always liable FOR something (liable for damage) and liable TO someone. Similarly, it's 'in breach of' (not 'in breach to'), 'pursuant to' (not 'pursuant of') and just 'notwithstanding clause 3' with no 'of'. Also be careful with 'rescind': Spanish 'rescindir un contrato' is usually 'terminate a contract' in English. 'Rescind' exists, but it means cancelling a contract as if it had never been made."
  },

  exercises: [
    { kind: "tf", s: "Daniela turned the job down because of the indemnity clause.", answer: false,
      why: "She says 'I didn't turn the job down; I simply asked them to delete the indemnity clause', and the school agreed." },
    { kind: "choice", q: "According to Daniela, what does 'shall' mean in clause 4?", right: "It creates an obligation: the instructor must do it.",
      wrong: ["It describes something that will probably happen in the future.", "It gives the instructor permission to do it if she wants to."],
      why: "In legal drafting 'shall' is 'not about the future; it creates an obligation'. Permission is expressed with 'may'." },
    { kind: "tf", s: "The school can end the contract immediately if Daniela commits a material breach.", answer: true,
      why: "'The School may terminate this Agreement with immediate effect in the event of a material breach by the Instructor.'" },
    { kind: "match", q: "Match the legal term to its plain-English meaning.", pairs: [
      ["hereby", "by means of this document"],
      ["notwithstanding", "in spite of"],
      ["pursuant to", "in accordance with"],
      ["whereas (in a recital)", "considering that"],
      ["indemnify", "promise to cover someone's losses"]
    ], why: "These words are the backbone of contract language. Outside a recital, 'whereas' has its everyday meaning of contrast: 'I love salsa, whereas my sister prefers reggaeton.'" },
    { kind: "type", text: "Either party may give written notice of {gap} (terminate) at any time.", answers: ["termination"],
      why: "After 'notice of' we need a noun: terminate → termination. This is nominalisation, typical of formal legal English." },
    { kind: "type", text: "The Landlord accepts no {gap} (liable) for damage caused by the Tenant's dog.", answers: ["liability"],
      why: "'Accept no ...' needs a noun: liable (adjective) → liability (noun). Compare: 'The Landlord is not liable for...'." },
    { kind: "gap", text: "In a contract: 'The Tenant {gap} pay the rent no later than the fifth day of each month.'", right: "shall",
      wrong: ["would", "might", "could"],
      why: "'Shall' creates a legal obligation. 'Would', 'might' and 'could' express hypothesis, possibility or ability, so they would make the duty to pay optional." },
    { kind: "gap", text: "The Instructor shall be liable {gap} any damage caused by her negligence.", right: "for",
      wrong: ["of", "about", "with"],
      why: "Liable FOR something, never 'liable of' (a typical calque of Spanish 'responsable de')." },
    { kind: "choice", q: "Which is the best formal, nominalised version of 'If the tenant doesn't pay, the landlord can end the agreement'?",
      right: "Failure to make payment shall entitle the Landlord to terminate the Agreement.",
      wrong: ["If the tenant fails paying, the landlord can terminating the agreement.", "The landlord can just end it if the tenant doesn't pay up."],
      why: "'Failure to make payment' nominalises 'doesn't pay', and 'shall entitle... to terminate' is formal and precise. The first option has grammar errors (fails to pay, can terminate), and the second is very informal." },
    { kind: "gap", text: "{gap} clause 3, which guarantees twelve classes a month, the School may cancel classes during Carnaval week.",
      right: "Notwithstanding", wrong: ["Pursuant to", "Whereas", "Hereby"],
      why: "The sentence contrasts with clause 3 (it guarantees classes, but the school can still cancel), so we need 'notwithstanding' = in spite of. 'Pursuant to' would mean the cancellation follows from clause 3, which makes no sense." },
    { kind: "choice", q: "In the contract, a 'material breach' is...", right: "a serious failure to do what the contract requires.",
      wrong: ["a problem with the materials used in the dance studio.", "a short delay that has no legal consequences."],
      why: "In legal English 'material' means important or significant, and a 'breach' is a failure to keep the terms of a contract." },
    { kind: "gap", text: "I {gap} resign from my position as instructor, with effect from 1 March.", right: "hereby",
      wrong: ["whereas", "notwithstanding", "pursuant"],
      why: "'Hereby' means 'by means of this document': the act of resigning happens through the letter itself." },
    { kind: "order", q: "Build a clause from a rental agreement.", words: ["The", "Tenant", "shall", "not", "keep", "pets", "without", "written", "consent."],
      why: "'Shall not' = must not. In formal English, negatives go straight after 'shall': shall not keep." },
    { kind: "listen", say: "Either party may terminate this agreement by giving written notice.",
      why: "'May' gives each party the right to do something; 'terminate' is the formal verb for ending a contract." }
  ],

  speak: [
    "Explain in plain English what 'shall', 'hereby' and 'notwithstanding' mean, as if you were talking to a friend who is about to sign a contract.",
    "Have you ever signed a contract (for a flat, a job or a phone) without reading it properly? What happened, or what could have happened?",
    "In your opinion, should contracts be written in plain English instead of legal language? Give two reasons."
  ],

  write: {
    prompt: "You are drafting a short agreement for walking your neighbour's dog, Lola, three times a week. Write four or five clauses in formal legal English (use shall, may, liable, terminate and at least two nominalisations), then add a plain-English translation of each clause.",
    min: 120,
    useWords: ["shall", "liable", "terminate", "breach", "party"]
  }
});
