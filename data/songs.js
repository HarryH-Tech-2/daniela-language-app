// Songs: original lyrics full of C1 idioms and grammar, played over music the app
// makes itself (js/music.js), so nothing to download and it works offline.
// Format: see CONTENT.md ("Songs").
window.SONGS = [

  // ---------------------------------------------------------------- calm
  {
    id: 'slow-tide', style: 'calm', emoji: '🌊', title: 'Slow Tide', by: 'Marea',
    bpm: 68, key: 'D', chords: ['Dmaj7', 'Bm7', 'Gmaj7', 'A7sus4'],
    intro: 'A gentle song about slowing down by the sea. Listen for inversion: “Rarely have I…”, “Not until… did I…”, “Had I known…”.',
    parts: [
      { part: 'Verse 1', lines: [
        'The morning drifts in softly and the harbour’s still asleep,',
        'I used to chase the hours, now I let the minutes keep.',
        'Rarely have I noticed how the light falls on the sea,',
        'Too busy running errands for a life that wasn’t me.'
      ] },
      { part: 'Chorus', lines: [
        'So let the slow tide carry me, there’s nowhere I need to be,',
        'I’m learning how to unwind and leave the noise behind,',
        'Let the slow tide carry me, let the world spin quietly,',
        'For once I’m taking stock, and I like what I find.'
      ] },
      { part: 'Verse 2', lines: [
        'Not until I stopped did I begin to really hear',
        'The gulls, the creaking fishing boats, the voices drifting near.',
        'I’ve come to realise that resting isn’t a waste,',
        'And peace is not a thing you’ll ever find in haste.'
      ] },
      { part: 'Bridge', lines: [
        'Had I known it would feel like this,',
        'I’d have slowed down years ago.'
      ] },
      { part: 'Chorus', lines: [
        'So let the slow tide carry me, there’s nowhere I need to be,',
        'I’m learning how to unwind and leave the noise behind,',
        'Let the slow tide carry me, let the world spin quietly,',
        'For once I’m taking stock, and I like what I find.'
      ] }
    ],
    words: [
      { w: 'drift', in: 'drifts', def: 'move slowly, carried by air or water, without a clear direction', es: 'flotar / ir a la deriva' },
      { w: 'run errands', in: 'running errands', def: 'make short trips to do small jobs, like going to the bank or the post office', es: 'hacer recados / diligencias' },
      { w: 'unwind', in: 'unwind', def: 'relax after a period of work or stress', es: 'relajarse / desconectar' },
      { w: 'take stock', in: 'taking stock', def: 'stop and think carefully about a situation before deciding what to do', es: 'hacer balance' },
      { w: 'come to realise', in: 'come to realise', def: 'slowly begin to understand something', es: 'llegar a darse cuenta' },
      { w: 'in haste', in: 'in haste', def: 'quickly, and often without enough care', es: 'con prisa / a la ligera' },
      { w: 'harbour', in: 'harbour', def: 'a sheltered area of water where boats stay', es: 'puerto' }
    ],
    notes: [
      { h: 'Inversion after a negative word', t: '“Rarely have I noticed…” and “Not until I stopped did I begin…” put the auxiliary before the subject, like a question. It sounds literary and emphatic. Normal order: “I have rarely noticed…”, “I only began to hear when I stopped.”' },
      { h: 'Had I known = If I had known', t: '“Had I known it would feel like this, I’d have slowed down years ago.” Dropping “if” and inverting is a formal third conditional. Very C1, and great in essays.' },
      { h: 'Used to + infinitive', t: '“I used to chase the hours” is a past habit that has stopped. Don’t confuse it with “be used to + -ing” (be accustomed): “I’m used to waking up early.”' }
    ]
  },

  {
    id: 'letters', style: 'calm', emoji: '✉️', title: 'Letters I Never Sent', by: 'Paper Moons',
    bpm: 72, key: 'A', chords: ['Am7', 'Fmaj7', 'Cmaj7', 'G6'],
    intro: 'A soft ballad full of regret. Listen for “I wish I’d…”, a mixed conditional and “It’s high time I…”.',
    parts: [
      { part: 'Verse 1', lines: [
        'There’s a drawer full of letters that I never sent,',
        'And every single one of them said just what I meant.',
        'I’d write until it was midnight, then I’d lose my nerve,',
        'And fold them all in half and hold back every word.'
      ] },
      { part: 'Chorus', lines: [
        'I wish I’d been braver, I wish I’d been clear,',
        'If I’d posted just one letter, you might still be here.',
        'But regrets are like rivers, they run to the sea,',
        'And I’m finally learning to let them go free.'
      ] },
      { part: 'Verse 2', lines: [
        'If I were the kind of person who spoke from the heart,',
        'We wouldn’t have drifted so slowly apart.',
        'I kept my cards close and I played it safe all along,',
        'And somewhere in the silence, the moment was gone.'
      ] },
      { part: 'Bridge', lines: [
        'It’s high time I said it, out loud and for real:',
        'You mattered. You still do. That’s just how I feel.'
      ] },
      { part: 'Chorus', lines: [
        'I wish I’d been braver, I wish I’d been clear,',
        'If I’d posted just one letter, you might still be here.',
        'But regrets are like rivers, they run to the sea,',
        'And I’m finally learning to let them go free.'
      ] }
    ],
    words: [
      { w: 'lose your nerve', in: 'lose my nerve', def: 'suddenly feel too afraid to do something you had planned', es: 'acobardarse / perder el valor' },
      { w: 'hold back', in: 'hold back', def: 'not say or show what you really think or feel', es: 'contenerse / callarse' },
      { w: 'from the heart', in: 'from the heart', def: 'sincerely, showing your true feelings', es: 'de corazón' },
      { w: 'drift apart', in: 'drifted so slowly apart', def: 'slowly become less close to someone, without a big argument', es: 'distanciarse' },
      { w: 'keep your cards close', in: 'kept my cards close', def: 'keep your plans or feelings secret (also: keep your cards close to your chest)', es: 'no mostrar sus cartas / ser reservado' },
      { w: 'play it safe', in: 'played it safe', def: 'avoid risks, even if it means missing a chance', es: 'ir a la segura / no arriesgarse' },
      { w: 'all along', in: 'all along', def: 'the whole time, from the beginning', es: 'desde el principio / todo el tiempo' },
      { w: 'it’s high time', in: 'It’s high time', def: 'it should have happened already; it must happen now', es: 'ya va siendo hora de' }
    ],
    notes: [
      { h: 'I wish + past perfect', t: '“I wish I’d been braver” is a regret about the past. For a present wish, use the past simple: “I wish I were braver.”' },
      { h: 'Mixed conditional', t: '“If I were the kind of person who spoke from the heart (a present fact about me), we wouldn’t have drifted apart (a past result).” The two halves are in different times.' },
      { h: 'It’s high time + past simple', t: '“It’s high time I said it” talks about now, but the verb is in the past. Not “It’s high time I say it.”' }
    ]
  },

  // ---------------------------------------------------------------- samba
  {
    id: 'paint-the-town', style: 'samba', emoji: '🎉', title: 'Paint the Town Red', by: 'Bloco Brisa',
    bpm: 88, key: 'F', chords: ['F6', 'Dm7', 'Gm7', 'C7'],
    intro: 'A Carnaval samba. You already know “soltarse el pelo”: in English it’s exactly the same! Listen for party idioms and “come what may”.',
    parts: [
      { part: 'Verse 1', lines: [
        'The drums are calling from the corner of the square,',
        'There’s glitter on the pavement and there’s magic in the air.',
        'Throw caution to the wind and forget what Monday brings,',
        'Tonight the whole street dances and the whole street sings.'
      ] },
      { part: 'Chorus', lines: [
        'Let’s paint the town red, paint the town red tonight,',
        'Let your hair down, darling, everything’s alright,',
        'Dance until the sun comes up over the bay,',
        'Nobody goes home before the break of day.'
      ] },
      { part: 'Verse 2', lines: [
        'The costumes shine like sequins on a river made of light,',
        'The neighbourhood is buzzing and it’s spilling into the night.',
        'My feet have got a mind of their own, I’m swept along,',
        'A thousand perfect strangers singing every word of the song.'
      ] },
      { part: 'Bridge', lines: [
        'Come what may tomorrow, we will deal with it then,',
        'Tonight’s the kind of night you never get again.'
      ] },
      { part: 'Chorus', lines: [
        'Let’s paint the town red, paint the town red tonight,',
        'Let your hair down, darling, everything’s alright,',
        'Dance until the sun comes up over the bay,',
        'Nobody goes home before the break of day.'
      ] }
    ],
    words: [
      { w: 'throw caution to the wind', in: 'Throw caution to the wind', def: 'do something without worrying about the risks', es: 'lanzarse sin miedo / mandar la prudencia al diablo' },
      { w: 'paint the town red', in: 'paint the town red', def: 'go out and celebrate in a wild, noisy way', es: 'irse de juerga / salir de rumba' },
      { w: 'let your hair down', in: 'Let your hair down', def: 'relax and enjoy yourself, without worrying what people think', es: 'soltarse el pelo' },
      { w: 'buzzing', in: 'buzzing', def: 'full of excitement, energy and activity', es: 'animadísimo / a reventar' },
      { w: 'have a mind of its own', in: 'have got a mind of their own', def: 'seem to move or behave without anyone controlling it', es: 'tener vida propia' },
      { w: 'be swept along', in: 'swept along', def: 'be carried forward by a crowd or a strong feeling', es: 'dejarse llevar / ser arrastrado' },
      { w: 'come what may', in: 'Come what may', def: 'whatever happens', es: 'pase lo que pase' },
      { w: 'the break of day', in: 'the break of day', def: 'the moment when the sun first comes up', es: 'el amanecer' }
    ],
    notes: [
      { h: 'Come what may', t: 'A fixed phrase using an old subjunctive form, like “so be it” and “be that as it may”. You can’t change it: not “comes what may”.' },
      { h: 'The kind of night you never get again', t: 'The relative pronoun is missing: “the kind of night (that) you never get again”. Drop “that/which” when it is the object of the next verb. Natives do it all the time.' },
      { h: 'Have got', t: '“My feet have got a mind of their own” is British: “have got” = “have” for possession. In American English you’d hear “My feet have a mind of their own.”' }
    ]
  },

  {
    id: 'market-morning', style: 'samba', emoji: '🥭', title: 'Market Morning', by: 'Os Vizinhos',
    bpm: 86, key: 'C', chords: ['C6', 'Am7', 'Dm7', 'G7'],
    intro: 'A happy samba about a busy market at six in the morning. Lots of money and shopping idioms: “going for a song”, “a steal”, “swings and roundabouts”.',
    parts: [
      { part: 'Verse 1', lines: [
        'Six in the morning and the market’s bustling,',
        'The stalls are piled up high and the paper bags are rustling.',
        'The lady with the mangoes says they’re going for a song,',
        'So I haggle just a little, but I don’t push it for long.'
      ] },
      { part: 'Chorus', lines: [
        'Oh, market morning, the city’s waking up,',
        'With fresh juice and gossip in a paper cup,',
        'Everyone’s a neighbour, everyone’s a friend,',
        'And news goes round the stalls before the morning’s at an end.'
      ] },
      { part: 'Verse 2', lines: [
        'The fishmonger’s been up since three and doesn’t miss a beat,',
        'He’s shouting out his prices to the whole length of the street.',
        'I only came for onions but I’m walking off with more,',
        'Well, it’s a steal, it’s a bargain, and that’s what mornings are for.'
      ] },
      { part: 'Bridge', lines: [
        'Prices up and prices down, it’s swings and roundabouts,',
        'What you lose on the mangoes, you make up for on the sprouts.'
      ] },
      { part: 'Chorus', lines: [
        'Oh, market morning, the city’s waking up,',
        'With fresh juice and gossip in a paper cup,',
        'Everyone’s a neighbour, everyone’s a friend,',
        'And news goes round the stalls before the morning’s at an end.'
      ] }
    ],
    words: [
      { w: 'bustling', in: 'bustling', def: 'full of busy people moving around', es: 'bullicioso / lleno de vida' },
      { w: 'go for a song', in: 'going for a song', def: 'be sold very cheaply', es: 'venderse regalado' },
      { w: 'haggle', in: 'haggle', def: 'argue about the price of something before buying it', es: 'regatear' },
      { w: 'not miss a beat', in: 'doesn’t miss a beat', def: 'keep going perfectly, without hesitating or getting confused', es: 'no perder el ritmo / ni inmutarse' },
      { w: 'a steal', in: 'a steal', def: 'something that is so cheap it’s almost free', es: 'una ganga / regalado' },
      { w: 'swings and roundabouts', in: 'swings and roundabouts', def: '(British) the good and bad sides of something balance each other out', es: 'lo que se pierde por un lado se gana por el otro' },
      { w: 'make up for', in: 'make up for', def: 'do or get something good that balances something bad', es: 'compensar' }
    ],
    notes: [
      { h: 'Present perfect with “since”', t: '“The fishmonger’s been up since three” = he got up at three and is still up now. Spanish uses the present (“está levantado desde las tres”), but English needs the present perfect.' },
      { h: '“Going for” a price', t: '“They’re going for a song” and “Flats are going for £2,000 a month” use “go for” to mean “be sold for”. Very common when talking about prices.' },
      { h: 'Walk off with', t: '“I’m walking off with more” = leaving with more than you planned. “Walk off with” can also mean steal or win easily: “She walked off with first prize.”' }
    ]
  },

  // ---------------------------------------------------------------- salsa
  {
    id: 'two-left-feet', style: 'salsa', emoji: '👠', title: 'Two Left Feet', by: 'La Orquesta del Malecón',
    bpm: 90, key: 'G', chords: ['Gm', 'Cm', 'D7', 'Gm'],
    intro: 'A funny salsa about learning to dance with someone who won’t give up on you. Listen for cleft sentences: “What I lack…”, “It’s you who…”.',
    parts: [
      { part: 'Verse 1', lines: [
        'I told you from the start that I have got two left feet,',
        'I’d rather watch the band than try to follow the beat.',
        'But you dragged me to the dance floor, wouldn’t take no for an answer,',
        'Now look at me, a nervous wreck, pretending I’m a dancer.'
      ] },
      { part: 'Chorus', lines: [
        'One, two, three… five, six, seven,',
        'I step on your toes but I’m halfway to heaven,',
        'What I lack in rhythm, I make up for in heart,',
        'It’s you who keeps me spinning when I’m falling apart.'
      ] },
      { part: 'Verse 2', lines: [
        'The trumpets start to climb and the congas answer back,',
        'And slowly, very slowly, I am getting the knack.',
        'Your hand is on my shoulder and we’re finally in sync,',
        'It’s easier than it looks, or it’s harder than you think!'
      ] },
      { part: 'Bridge', lines: [
        'Don’t look down at your feet, look at me,',
        'Let the music do the talking and set yourself free.'
      ] },
      { part: 'Chorus', lines: [
        'One, two, three… five, six, seven,',
        'I step on your toes but I’m halfway to heaven,',
        'What I lack in rhythm, I make up for in heart,',
        'It’s you who keeps me spinning when I’m falling apart.'
      ] }
    ],
    words: [
      { w: 'have two left feet', in: 'two left feet', def: 'be clumsy, especially when dancing', es: 'ser un pato bailando / ser patoso' },
      { w: 'would rather', in: 'I’d rather', def: 'would prefer to', es: 'preferiría' },
      { w: 'not take no for an answer', in: 'wouldn’t take no for an answer', def: 'insist, and refuse to accept that someone says no', es: 'no aceptar un no por respuesta' },
      { w: 'a nervous wreck', in: 'a nervous wreck', def: 'someone who is extremely nervous and worried', es: 'un manojo de nervios' },
      { w: 'lack', in: 'lack', def: 'not have something, or not have enough of it', es: 'carecer de / faltarle a uno' },
      { w: 'get the knack', in: 'getting the knack', def: 'learn how to do something that needs a special skill', es: 'cogerle el truco / agarrarle la mano' },
      { w: 'in sync', in: 'in sync', def: 'moving or happening at exactly the same time', es: 'sincronizados / al compás' },
      { w: 'fall apart', in: 'falling apart', def: 'be unable to cope because of stress or emotion', es: 'desmoronarse' }
    ],
    notes: [
      { h: 'Cleft sentences', t: '“What I lack in rhythm, I make up for in heart” and “It’s you who keeps me spinning” split one idea in two to put the focus on one part. Compare the plain version: “You keep me spinning.”' },
      { h: 'Would rather + infinitive (no “to”)', t: '“I’d rather watch the band than try to follow the beat.” Not “I’d rather to watch”. With another person: “I’d rather you stayed.”' },
      { h: 'Wouldn’t = refused', t: '“You wouldn’t take no for an answer” uses “wouldn’t” to mean “refused to” in the past: “The door wouldn’t open.”' }
    ]
  },

  {
    id: 'no-strings', style: 'salsa', emoji: '💔', title: 'No Strings Attached', by: 'La Orquesta del Malecón',
    bpm: 92, key: 'D', chords: ['Dm', 'Gm', 'A7', 'Dm'],
    intro: 'A salsa about someone who can’t make up their mind. Listen for “Should you change your mind…” and the formal linker “be that as it may”.',
    parts: [
      { part: 'Verse 1', lines: [
        'You told me from the start there’d be no strings attached,',
        'Just dancing on a Friday, nothing serious, no catch.',
        'But you’re stringing me along with your “maybe” and your “soon”,',
        'And leaving me hanging like a paper balloon.'
      ] },
      { part: 'Chorus', lines: [
        'Make up your mind, mi amor, are you in or are you out?',
        'I’m tired of second-guessing what your heart is all about.',
        'Be that as it may, I won’t wait another day,',
        'So dance with me tonight or let me dance my own way.'
      ] },
      { part: 'Verse 2', lines: [
        'My friends all say you’re fickle and you’ll never settle down,',
        'That you’ve broken half the hearts on this side of town.',
        'And yet here I am, still waiting by the door,',
        'Should you change your mind, I’ll be out on the floor.'
      ] },
      { part: 'Bridge', lines: [
        'No more mixed messages, no more silly games,',
        'Call me when you mean it, and call me by my name.'
      ] },
      { part: 'Chorus', lines: [
        'Make up your mind, mi amor, are you in or are you out?',
        'I’m tired of second-guessing what your heart is all about.',
        'Be that as it may, I won’t wait another day,',
        'So dance with me tonight or let me dance my own way.'
      ] }
    ],
    words: [
      { w: 'no strings attached', in: 'no strings attached', def: 'with no conditions or commitment', es: 'sin compromiso' },
      { w: 'string someone along', in: 'stringing me along', def: 'make someone believe you want a relationship (or a deal) when you don’t', es: 'dar largas / ilusionar a alguien' },
      { w: 'leave someone hanging', in: 'leaving me hanging', def: 'keep someone waiting for an answer or a decision', es: 'dejar a alguien colgado' },
      { w: 'make up your mind', in: 'Make up your mind', def: 'decide', es: 'decidirse' },
      { w: 'second-guess', in: 'second-guessing', def: 'try to guess what someone thinks; or doubt a decision after you make it', es: 'tratar de adivinar / dudar de' },
      { w: 'be that as it may', in: 'Be that as it may', def: '(formal) even so; although that is true', es: 'sea como sea / aun así' },
      { w: 'fickle', in: 'fickle', def: 'changing your feelings or opinions often, so people can’t trust you', es: 'voluble / inconstante' },
      { w: 'settle down', in: 'settle down', def: 'start a calm life with one partner, often married, in one place', es: 'sentar cabeza' },
      { w: 'mixed messages', in: 'mixed messages', def: 'signals that seem to say two opposite things', es: 'señales contradictorias' }
    ],
    notes: [
      { h: 'Should you… = If you…', t: '“Should you change your mind, I’ll be out on the floor.” A formal first conditional without “if”. You’ll see it in emails: “Should you have any questions, do not hesitate to contact me.”' },
      { h: 'Be that as it may', t: 'A formal way to say “even so”. It accepts what was just said, then disagrees or moves on. Perfect for C1 essays.' },
      { h: 'And yet', t: '“And yet here I am” adds a surprising contrast, a bit stronger than “but”. It often starts the sentence.' }
    ]
  }
];
