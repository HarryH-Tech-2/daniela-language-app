(window.UNITS = window.UNITS || []).push({
  id: "true-crime",
  stage: 4,
  order: 22,
  emoji: "🎙️",
  title: "True crime podcast",
  topic: "Crime",
  intro: "Welcome to your own true-crime podcast! You'll narrate the story of an art forgery with a legal twist, using participle clauses (Having studied..., Arrested in 2022..., Walking home...) to tell a story the way professional storytellers do.",

  vocab: [
    { w: "forgery", pos: "noun", def: "a copy of a painting, document or signature made to deceive people; also the crime of making one",
      ex: "The painting in the museum turned out to be a forgery.", es: "falsificación" },
    { w: "fraud", pos: "noun", def: "the crime of deceiving people to get money or advantages",
      ex: "She was convicted of fraud for selling fake paintings.", es: "fraude, estafa" },
    { w: "provenance", pos: "noun", def: "the documented history of where an artwork comes from and who has owned it",
      ex: "The buyer asked for proof of the painting's provenance.", es: "procedencia" },
    { w: "authenticate", pos: "verb", def: "prove or confirm that something is genuine",
      ex: "An expert was asked to authenticate the painting.", es: "autenticar, certificar la autenticidad" },
    { w: "mastermind", pos: "noun", def: "the person who plans and controls a complicated crime or project",
      ex: "Police believed he was the mastermind behind the scheme.", es: "cerebro (de una operación)" },
    { w: "acquit", pos: "verb", def: "decide officially in court that someone is not guilty",
      ex: "After a two-week trial, the jury acquitted him.", es: "absolver" },
    { w: "loophole", pos: "noun", def: "a small mistake or gap in a law that lets people avoid obeying it",
      ex: "His lawyers found a loophole in the tax law.", es: "vacío legal, resquicio" },
    { w: "get away with", pos: "phrasal verb", def: "do something wrong and not be caught or punished",
      ex: "Did she really think she would get away with it?", es: "salirse con la suya, quedar impune" },
    { w: "unravel", pos: "verb", def: "(of a plan or story) start to fail or fall apart",
      ex: "Once the expert found the mistake, the whole scheme began to unravel.", es: "desmoronarse, desenmarañarse" },
    { w: "on the surface", pos: "phrase", def: "when you look at something quickly, not deeply",
      ex: "On the surface, she was a respectable gallery owner.", es: "en apariencia, a simple vista" }
  ],

  reading: {
    title: "Cold Canvas, episode 14: The painter who wasn't",
    text: [
      "Welcome back to Cold Canvas, the podcast about art, money and the people who confuse the two. I'm Daniela. Tonight's story begins in Cartagena in 2017, in a tiny studio above a bakery. Working late into the night, a young artist called Tomás Rivero was finishing a painting that would one day sell for two million dollars. It was his painting. But the signature that would later appear in the corner belonged to someone else.",
      "Trained as a restorer, Tomás could copy almost anything. He specialised in Elena Marquina, a Barranquilla painter famous for her Carnaval scenes, who had died in 1989. Having studied her brushstrokes for years, he could reproduce her style perfectly. He sold his copies openly, each one clearly labelled ‘after Marquina’, to a Bogotá gallery owner named Victoria Hale.",
      "This is where things get interesting. Removing the labels and inventing a provenance for each painting (a forgotten collector here, a family inheritance there), Hale sold the copies to buyers in Miami and Madrid as genuine Marquinas. Asked to authenticate one of them in 2021, an expert in Madrid noticed something odd: the paint contained a pigment that did not exist until 1995. On the surface, the painting was perfect. Underneath, the whole story was about to unravel.",
      "Acting on an anonymous tip, police raided Tomás's studio and found dozens of unfinished ‘Marquinas’. Arrested in March 2022, he was charged with forgery and fraud. Everyone assumed he was the mastermind. His lawyer, however, had other ideas.",
      "Here's the legal twist. Producing every invoice, email and label, the defence showed that Tomás had never once claimed his paintings were originals. Painting in someone's style is not a crime; selling a copy as the real thing is. There was no clever loophole: Tomás simply hadn't committed fraud, and he was acquitted. Hale was not so lucky. Having signed every fake certificate herself, she had nowhere to hide. Convicted of fraud, she is now serving eight years.",
      "So did Tomás get away with it? Not exactly. There was nothing to get away with. Today he paints under his own name, and his first exhibition sold out in a week. I'm Daniela, and this has been Cold Canvas."
    ]
  },

  grammar: {
    title: "Participle clauses",
    explain: [
      "Participle clauses make a narrative shorter and more elegant. They replace a full clause with a participle and are typical of written stories, news and podcasts.",
      "Present participle (-ing): an active action happening at the same time, or just before, the main action. Walking home, she noticed a light. = While she was walking home...",
      "Perfect participle (having + past participle): an action completed before the main action, often explaining why. Having studied her style, he could copy it. = Because he had studied...",
      "Past participle: a passive meaning. Arrested in 2022, he was charged with fraud. = He was arrested in 2022 and... Asked about the labels, she said nothing. = When she was asked...",
      "The subject of the participle clause must be the same as the subject of the main clause. ✗ Walking into the gallery, the painting caught my eye. (The painting wasn't walking!) ✓ Walking into the gallery, I noticed the painting."
    ],
    examples: [
      { en: "Working late into the night, Tomás finished the painting.", note: "-ing: two actions at the same time" },
      { en: "Having studied her brushstrokes for years, he could reproduce her style.", note: "having + past participle: the first action was completed earlier" },
      { en: "Arrested in March 2022, he was charged with forgery.", note: "past participle: passive meaning (he was arrested)" },
      { en: "Asked to authenticate the painting, the expert noticed something odd.", note: "past participle = when she was asked" },
      { en: "After examining the canvas, the expert called the police.", note: "conjunction + -ing: after, before, while, since" },
      { en: "Acting on an anonymous tip, police raided the studio.", note: "-ing clause explaining the reason for the action" }
    ],
    tip: "Two mistakes are very typical for Spanish speakers. First, after prepositions like after, before, without and instead of, Spanish uses the infinitive (después de terminar), so people write 'after to finish' or 'before sign'. In English, always use -ing: after finishing, before signing, without asking. Second, Spanish gerund clauses are more flexible about who does the action, so 'dangling participles' slip in easily: 'Arriving at the court, the cameras surrounded her' says the cameras arrived! Make sure the subject of the main clause is the person doing the participle: 'Arriving at the court, she was surrounded by cameras.'"
  },

  exercises: [
    { kind: "tf", s: "Tomás signed Elena Marquina's name on his paintings before selling them to Hale.", answer: false,
      why: "He sold them openly, 'clearly labelled after Marquina'. It was Hale who removed the labels and sold them as genuine." },
    { kind: "choice", q: "How was the fraud first discovered?",
      right: "An expert found a pigment that didn't exist when Marquina was alive.",
      wrong: ["Tomás confessed to the police.", "A buyer in Miami recognised Tomás's style."],
      why: "The expert in Madrid found 'a pigment that did not exist until 1995', but Marquina died in 1989." },
    { kind: "tf", s: "Tomás was acquitted because his lawyer found a loophole in the law.", answer: false,
      why: "'There was no clever loophole: Tomás simply hadn't committed fraud.' He had never claimed his paintings were originals." },
    { kind: "gap", text: "{gap} her brushstrokes for years, he could reproduce her style perfectly.", right: "Having studied",
      wrong: ["Studied", "Having been studied", "To have studied"],
      why: "The perfect participle (having + past participle) shows the studying was completed before, and explains why he could copy her. 'Studied' and 'Having been studied' are passive, but he did the studying." },
    { kind: "gap", text: "{gap} in March 2022, he was charged with forgery and fraud.", right: "Arrested",
      wrong: ["Arresting", "Having arrested", "He arrested"],
      why: "He didn't arrest anyone; he was arrested. A passive meaning needs the past participle: Arrested in 2022, he..." },
    { kind: "choice", q: "Which sentence is correct?",
      right: "Walking into the gallery, I noticed the painting immediately.",
      wrong: ["Walking into the gallery, the painting caught my eye immediately.", "Walked into the gallery, I noticed the painting immediately."],
      why: "The subject of the main clause (I) must be the one walking. In the first wrong option the painting is walking, and 'Walked' would be passive." },
    { kind: "type", text: "After {gap} (examine) the canvas, the expert called the police.", answers: ["examining", "having examined"],
      why: "After a preposition like 'after', English uses -ing, never the infinitive ('after to examine' is a typical calque of 'después de examinar')." },
    { kind: "type", text: "{gap} (ask) about the missing labels, Hale refused to comment.", answers: ["Asked", "When asked", "Having been asked", "On being asked"],
      why: "Hale was asked, so the meaning is passive: 'Asked about...' = When she was asked about... It's very common in news reports." },
    { kind: "choice", q: "Which participle clause correctly replaces 'Because she had signed every fake certificate herself, Hale had nowhere to hide'?",
      right: "Having signed every fake certificate herself, Hale had nowhere to hide.",
      wrong: ["Signed every fake certificate herself, Hale had nowhere to hide.", "Having been signed every fake certificate herself, Hale had nowhere to hide."],
      why: "The signing happened first and explains the result, so we use the active perfect participle: Having signed. The other options are passive, but Hale did the signing." },
    { kind: "order", q: "Build a sentence with a participle clause.", words: ["Having", "finished", "the", "painting,", "he", "signed", "his", "own", "name."],
      why: "Having + past participle + comma + main clause. The subject 'he' is the one who finished the painting." },
    { kind: "match", q: "Match each word to its meaning.", pairs: [
      ["provenance", "the documented history of an artwork"],
      ["authenticate", "confirm that something is genuine"],
      ["acquit", "officially decide someone is not guilty"],
      ["loophole", "a gap in a law that lets people avoid it"],
      ["mastermind", "the person who plans a complicated crime"]
    ], why: "These words come up constantly in true-crime stories and news reports about art and fraud." },
    { kind: "gap", text: "On the surface, the painting was perfect. Underneath, the whole story was about to {gap}.", right: "unravel",
      wrong: ["acquit", "authenticate", "mastermind"],
      why: "When a story, plan or lie 'unravels', it starts to fall apart, like a jumper when you pull a loose thread." },
    { kind: "gap", text: "Did she really think she could {gap} it? The police had all her emails!", right: "get away with",
      wrong: ["get on with", "get over", "get by"],
      why: "'Get away with something' = do something wrong without being caught or punished. Spanish: salirse con la suya." },
    { kind: "listen", say: "Walking home after the trial, he finally felt free.",
      why: "The -ing clause 'Walking home after the trial' describes what he was doing at the same time as the main action." }
  ],

  speak: [
    "Retell the Cold Canvas story in about one minute, as if you were the podcast host. Use at least three participle clauses.",
    "Was it fair that Tomás was acquitted and Hale was convicted? Use your legal knowledge to explain why or why not.",
    "Describe a famous crime, mystery or scandal from Colombia or anywhere else. Start with a participle clause, e.g. 'Having planned the robbery for months, the gang...'"
  ],

  write: {
    prompt: "Write the opening of your own true-crime podcast episode about a fictional jewel theft during the Carnaval de Barranquilla. Introduce the setting, the suspect and the first clue, and build suspense. Use at least four participle clauses (-ing, having + past participle and past participle).",
    min: 120,
    useWords: ["mastermind", "get away with", "unravel", "on the surface", "fraud"]
  }
});
