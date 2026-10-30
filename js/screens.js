// The screens: home (the path), a unit's lesson player, word review, the journal
// and "me" (progress, badges, settings, backup).
(function () {
  var APP = window.APP, el = APP.el, btn = APP.btn, S = APP.state;

  function ring(frac, size, inner) {
    var r = (size - 8) / 2, c = 2 * Math.PI * r;
    var w = el('div', 'ring');
    w.style.width = w.style.height = size + 'px';
    w.innerHTML = '<svg viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true"><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" class="ring-bg"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" class="ring-fg" stroke-dasharray="' + c + '" stroke-dashoffset="' + c * (1 - Math.min(1, frac)) + '"/></svg>';
    if (inner) { var i = el('div', 'ring-in'); i.appendChild(typeof inner === 'string' ? el('span', '', inner) : inner); w.appendChild(i); }
    return w;
  }
  function stars(n, of) {
    var s = el('span', 'stars');
    s.setAttribute('aria-label', n + ' of ' + (of || 3) + ' stars');
    for (var i = 0; i < (of || 3); i++) s.appendChild(el('i', i < n ? 'on' : '', '★'));
    return s;
  }
  function backBar(main, to, title) {
    var bar = el('div', 'backbar');
    var a = el('a', 'back', '‹ Back');
    a.href = to;
    bar.appendChild(a);
    if (title) bar.appendChild(el('span', 'backbar-title', title));
    main.appendChild(bar);
    return bar;
  }
  APP.backBar = backBar;
  APP.ring = ring;
  APP.stars = stars;

  var HELLO = ['¡Ajá, ', '¿Qué más, ', 'Hello, ', 'Hey, ', 'Good to see you, ', '¡Hola, '];
  var NUDGE = [
    'Ten minutes a day is how B1 becomes C1.',
    'Every word you learn is one more you can dance with.',
    'Small steps, big rhythm.',
    'Your future English-speaking self says thank you.',
    'Practise a little, then go and enjoy your day.',
    'Remember: mistakes mean you are trying. ¡Dale!'
  ];
  function greeting() {
    var h = new Date().getHours();
    var part = h < 12 ? 'Good morning' : h < 19 ? 'Good afternoon' : 'Good evening';
    var day = APP.dayNumber(APP.today());
    return { hi: (day % 3 === 0 ? part + ', ' : HELLO[day % HELLO.length]) + APP.profile.short + '!', sub: NUDGE[day % NUDGE.length] };
  }

  /* ================= HOME ================= */

  APP.route('home', function (main) {
    var g = greeting(), lvl = APP.levelOf(S.xp), streak = APP.streakNow();
    main.appendChild(hearts());
    main.appendChild(version());

    var top = el('section', 'hello');
    var left = el('div', 'hello-text');
    left.appendChild(el('h1', 'hello-hi', g.hi));
    left.appendChild(el('p', 'hello-sub', g.sub));
    top.appendChild(left);
    var goal = ring(APP.todayXP() / S.settings.goal, 76, APP.todayXP() >= S.settings.goal ? '✓' : APP.todayXP() + '');
    goal.classList.add('goal-ring');
    goal.title = 'Daily goal: ' + APP.todayXP() + ' / ' + S.settings.goal + ' XP';
    top.appendChild(goal);
    main.appendChild(top);

    var chips = el('div', 'stat-chips');
    chips.appendChild(chip('🔥', streak + ' day' + (streak === 1 ? '' : 's'), 'streak'));
    chips.appendChild(chip('⚡', 'Level ' + lvl.n, 'level'));
    chips.appendChild(chip('🎯', APP.todayXP() + '/' + S.settings.goal + ' XP today', 'goal'));
    var due = APP.srsDue().length;
    if (due) { var c = chip('🃏', due + ' word' + (due === 1 ? '' : 's') + ' to review', 'due'); c.href = '#/review'; chips.appendChild(c); }
    main.appendChild(chips);

    if (APP.profile.note && !S.noteSeen) {
      var note = el('section', 'love-note');
      note.appendChild(el('p', 'love-note-text', APP.profile.note));
      if (APP.profile.from) note.appendChild(el('p', 'love-note-from', '— ' + APP.profile.from));
      note.appendChild(btn('love-note-x', 'Close', function () { S.noteSeen = true; APP.save(); note.remove(); }));
      main.appendChild(note);
    }

    var next = APP.nextUnit();
    if (next) {
      var go = el('a', 'continue');
      go.href = '#/unit/' + next.id;
      go.appendChild(el('span', 'continue-emoji', next.emoji));
      var t = el('span', 'continue-text');
      t.appendChild(el('span', 'continue-label', APP.unitProgress(next) ? 'Keep going' : 'Up next'));
      t.appendChild(el('span', 'continue-title', next.title));
      t.appendChild(el('span', 'continue-meta', APP.STAGES[next.stage].label + ' · ' + next.grammar.title));
      go.appendChild(t);
      go.appendChild(el('span', 'continue-go', '▶'));
      main.appendChild(go);
    } else if (APP.units.length) {
      var crown = el('section', 'card done-all');
      crown.appendChild(el('p', 'big', '👑 Every lesson finished. ¡Reina!'));
      crown.appendChild(el('p', '', 'Keep your words fresh in Review, play the games, and replay lessons for three stars.'));
      main.appendChild(crown);
    }

    // word of the day
    if (APP.allWords.length) {
      var w = APP.allWords[APP.dayNumber(APP.today()) * 7 % APP.allWords.length];
      var wd = el('section', 'wotd');
      var head = el('div', 'wotd-head');
      head.appendChild(el('span', 'wotd-label', 'Word of the day'));
      head.appendChild(APP.speakBtn(w.w));
      wd.appendChild(head);
      var wpic = APP.wordImg(w);
      if (wpic) { wd.classList.add('has-img'); wd.appendChild(APP.img(wpic, 'wotd-img', w.w)); }
      wd.appendChild(el('p', 'wotd-word', w.w));
      wd.appendChild(el('p', 'wotd-def', w.def));
      var es = el('p', 'wotd-es', '🇨🇴 ' + w.es);
      wd.appendChild(es);
      wd.appendChild(el('p', 'wotd-ex', '“' + w.ex + '”'));
      main.appendChild(wd);
    }

    var quick = el('section', 'quick');
    quick.appendChild(tile('#/review', '🃏', 'Review words', due ? due + ' due now' : 'All caught up'));
    quick.appendChild(tile('#/talk', '🗣️', 'Let’s talk', 'Speak out loud'));
    quick.appendChild(tile('#/game/rescue', '🐶', 'Save the puppy', (S.games.rescueWins || 0) + ' saved'));
    quick.appendChild(tile('#/journal', '✍️', 'My journal', S.journal.length + ' entr' + (S.journal.length === 1 ? 'y' : 'ies')));
    main.appendChild(quick);

    // the path
    var path = el('section', 'path');
    path.id = 'path';
    [1, 2, 3, 4].forEach(function (stage) {
      var us = APP.units.filter(function (u) { return u.stage === stage; });
      if (!us.length) return;
      var st = APP.STAGES[stage];
      var h = el('div', 'stage stage-' + stage);
      h.appendChild(el('span', 'stage-level', st.label));
      var ht = el('span', 'stage-text');
      ht.appendChild(el('span', 'stage-name', st.name));
      ht.appendChild(el('span', 'stage-es', st.es));
      h.appendChild(ht);
      var doneN = us.filter(function (u) { return (S.units[u.id] || {}).stars > 0; }).length;
      h.appendChild(el('span', 'stage-count', doneN + '/' + us.length));
      path.appendChild(h);
      var list = el('div', 'nodes');
      us.forEach(function (u, i) {
        var a = el('a', 'node');
        a.href = '#/unit/' + u.id;
        a.style.setProperty('--x', [0, 1, 2, 1][i % 4]);
        var us_ = S.units[u.id] || {};
        if (us_.stars) a.classList.add('is-done');
        if (next && next.id === u.id) a.classList.add('is-next');
        var r = ring(APP.unitProgress(u), 84, u.emoji);
        a.appendChild(r);
        var lab = el('span', 'node-label');
        lab.appendChild(el('span', 'node-title', u.title));
        lab.appendChild(el('span', 'node-topic', u.topic));
        lab.appendChild(stars(us_.stars || 0));
        a.appendChild(lab);
        list.appendChild(a);
      });
      path.appendChild(list);
    });
    main.appendChild(path);

    if (!APP.units.length) main.appendChild(el('p', 'muted', 'No lessons found. Check the data/units folder.'));
  });

  // "v3 · updated 25 Oct, 16:12" in the top corner, so we can tell which copy she has.
  function version() {
    var v = window.APP_VERSION;
    if (!v) return document.createTextNode('');
    var d = new Date(v.updated);
    var when = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' +
      d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return el('p', 'app-version', v.number + ' · updated ' + when);
  }

  // Hearts drifting up behind the home page.
  function hearts() {
    var box = el('div', 'hearts');
    box.setAttribute('aria-hidden', 'true');
    var colors = ['var(--pink)', '#ff8fb3', 'var(--orange)', '#ffb3c9', 'var(--purple)'];
    for (var i = 0; i < 18; i++) {
      var h = el('span', 'heart');
      h.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4 6.4 4c2.3 0 3.9 1.4 5.6 3.4C13.7 5.4 15.3 4 17.6 4c4.1 0 6 4.4 4.4 7.7C19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>';
      var size = 12 + Math.random() * 26;
      h.style.cssText = 'left:' + (Math.random() * 100) + '%;width:' + size + 'px;height:' + size + 'px;color:' + colors[i % colors.length] +
        ';animation-duration:' + (14 + Math.random() * 16) + 's;animation-delay:' + (-Math.random() * 30) + 's;--sway:' + (Math.random() * 60 - 30) + 'px;opacity:' + (0.22 + Math.random() * 0.3);
      box.appendChild(h);
    }
    return box;
  }

  function chip(icon, text, cls) {
    var c = el('a', 'chip chip-' + cls);
    c.appendChild(el('span', 'chip-i', icon));
    c.appendChild(el('span', '', text));
    return c;
  }
  function tile(href, icon, title, sub) {
    var a = el('a', 'qtile');
    a.href = href;
    a.appendChild(el('span', 'qtile-i', icon));
    a.appendChild(el('span', 'qtile-t', title));
    a.appendChild(el('span', 'qtile-s', sub));
    return a;
  }

  /* ================= UNIT ================= */

  var STEPS = [
    { k: 'words', label: 'Words', icon: '🔤', xp: 10 },
    { k: 'story', label: 'Story', icon: '📖', xp: 15 },
    { k: 'grammar', label: 'Grammar', icon: '🧩', xp: 10 },
    { k: 'practice', label: 'Practice', icon: '🎯', xp: 0 },
    { k: 'speak', label: 'Speak', icon: '🎤', xp: 15 },
    { k: 'write', label: 'Write', icon: '✍️', xp: 0 }
  ];

  APP.route('unit', function (main, args) {
    var u = APP.unit(args[0]);
    if (!u) { APP.go('#/'); return; }
    var us = APP.unitState(u.id);
    var step = STEPS.filter(function (s) { return s.k === args[1]; })[0] || STEPS.filter(function (s) { return !us.steps[s.k]; })[0] || STEPS[0];

    backBar(main, '#/', '');
    var head = el('header', 'unit-head stage-' + u.stage);
    head.appendChild(el('span', 'unit-emoji', u.emoji));
    var ht = el('div', 'unit-head-text');
    ht.appendChild(el('span', 'unit-meta', APP.STAGES[u.stage].label + ' · ' + u.topic));
    ht.appendChild(el('h1', 'unit-title', u.title));
    ht.appendChild(el('p', 'unit-intro', u.intro));
    head.appendChild(ht);
    main.appendChild(head);

    var tabs = el('nav', 'steps');
    tabs.setAttribute('aria-label', 'Lesson steps');
    STEPS.forEach(function (s) {
      var a = el('a', 'step' + (s.k === step.k ? ' on' : '') + (us.steps[s.k] ? ' done' : ''));
      a.href = '#/unit/' + u.id + '/' + s.k;
      a.appendChild(el('span', 'step-i', us.steps[s.k] ? '✓' : s.icon));
      a.appendChild(el('span', 'step-l', s.label));
      tabs.appendChild(a);
    });
    main.appendChild(tabs);

    var body = el('section', 'step-body');
    main.appendChild(body);

    function complete(k, xp) {
      if (!us.steps[k]) {
        us.steps[k] = APP.today();
        APP.save();
        if (xp) APP.award(xp);
      }
    }
    function nextButton(k, label) {
      var i = STEPS.findIndex(function (s) { return s.k === k; });
      var nx = STEPS[i + 1];
      var b = btn('big-btn next-step', label || (nx ? 'Next: ' + nx.label + ' ' + nx.icon : 'Finish lesson 🎉'), function () {
        complete(k, STEPS[i].xp);
        if (nx) APP.go('#/unit/' + u.id + '/' + nx.k);
        else { APP.celebrate('Lesson complete!', u.title + ' ' + u.emoji); APP.go('#/'); }
      });
      return b;
    }

    ({ words: wordsStep, story: storyStep, grammar: grammarStep, practice: practiceStep, speak: speakStep, write: writeStep })[step.k](body, u, us, nextButton, complete);
  });

  function wordsStep(body, u, us, nextButton) {
    body.appendChild(el('p', 'step-lead', 'Ten words for this lesson. Tap 🔊 to hear one (tap again to hear it slowly), and tap a card to see it in Spanish.'));
    var grid = el('div', 'vocab');
    u.vocab.forEach(function (v) {
      var c = el('article', 'vcard');
      var pic = APP.wordImg(Object.assign({ unit: u.id }, v));
      if (pic) { c.classList.add('has-img'); c.appendChild(APP.img(pic, 'vcard-img', v.w)); }
      var top = el('div', 'vcard-top');
      top.appendChild(el('span', 'vcard-w', v.w));
      top.appendChild(APP.speakBtn(v.w));
      c.appendChild(top);
      c.appendChild(el('span', 'pos pos-' + v.pos.replace(/\s/g, '-'), v.pos));
      c.appendChild(el('p', 'vcard-def', v.def));
      var ex = el('p', 'vcard-ex');
      ex.appendChild(document.createTextNode('“' + v.ex + '” '));
      ex.appendChild(APP.speakBtn(v.ex));
      c.appendChild(ex);
      var es = el('p', 'vcard-es', '🇨🇴 ' + v.es);
      c.appendChild(es);
      c.addEventListener('click', function () { c.classList.toggle('show-es'); });
      grid.appendChild(c);
    });
    body.appendChild(grid);
    var b = nextButton('words');
    b.addEventListener('click', function () { u.vocab.forEach(function (v) { APP.srsAdd(Object.assign({ unit: u.id }, v)); }); APP.save(); }, true);
    body.appendChild(b);
  }

  // Wrap this unit's words in the story so she can tap them.
  function wordFinder(vocab) {
    function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
    var items = vocab.map(function (v) {
      var w = v.w.toLowerCase().replace(/\s*\(.*?\)\s*/g, ' ').replace(/^(to|a|an|the) /, '').trim();
      var words = w.split(/\s+/), last = words.pop(), stem;
      if (/[^aeiou]y$/.test(last)) stem = esc(last.slice(0, -1)) + '(?:y|ies|ied|ying)';
      else if (/e$/.test(last)) stem = esc(last.slice(0, -1)) + '\\w*';
      else stem = esc(last) + '\\w*';
      var src = words.map(esc).concat([stem]).join("\\s+(?:\\w+\\s+)?");
      return { v: v, re: new RegExp('^' + src + '$', 'i'), src: src };
    }).sort(function (a, b) { return b.src.length - a.src.length; });
    var all = new RegExp('\\b(' + items.map(function (i) { return i.src; }).join('|') + ')\\b', 'gi');
    return function (text, host) {
      var last = 0, m;
      all.lastIndex = 0;
      while ((m = all.exec(text))) {
        var hit = items.filter(function (i) { return i.re.test(m[0]); })[0];
        if (!hit) continue;
        host.appendChild(document.createTextNode(text.slice(last, m.index)));
        var s = APP.btn('gloss', m[0]);
        (function (v) { s.addEventListener('click', function (e) { e.stopPropagation(); showGloss(s, v); }); })(hit.v);
        host.appendChild(s);
        last = m.index + m[0].length;
      }
      host.appendChild(document.createTextNode(text.slice(last)));
    };
  }
  var pop = null;
  function showGloss(anchor, v) {
    if (pop) pop.remove();
    pop = el('div', 'gloss-pop');
    var top = el('div', 'gloss-top');
    top.appendChild(el('strong', '', v.w));
    top.appendChild(APP.speakBtn(v.w));
    pop.appendChild(top);
    var gp = APP.wordImg(v);
    if (gp) pop.appendChild(APP.img(gp, 'gloss-img', v.w));
    pop.appendChild(el('p', '', v.def));
    pop.appendChild(el('p', 'gloss-es', '🇨🇴 ' + v.es));
    document.body.appendChild(pop);
    var r = anchor.getBoundingClientRect();
    var x = Math.max(12, Math.min(window.innerWidth - pop.offsetWidth - 12, r.left + r.width / 2 - pop.offsetWidth / 2));
    var y = r.bottom + 8 + window.scrollY;
    if (r.bottom + pop.offsetHeight + 16 > window.innerHeight) y = r.top + window.scrollY - pop.offsetHeight - 8;
    pop.style.left = x + 'px'; pop.style.top = y + 'px';
    APP.speak(v.w);
  }
  document.addEventListener('click', function () { if (pop) { pop.remove(); pop = null; } });
  window.addEventListener('hashchange', function () { if (pop) { pop.remove(); pop = null; } });

  function storyStep(body, u, us, nextButton) {
    var r = u.reading;
    var card = el('article', 'story');
    var hero = APP.storyImg(u.id);
    if (hero) card.appendChild(APP.img(hero, 'story-img', r.title));
    var h = el('div', 'story-head');
    h.appendChild(el('h2', 'story-title', r.title));
    var all = APP.speakBtn(function () { return r.title + '. ' + r.text.join(' '); }, 'Listen to it all');
    h.appendChild(all);
    card.appendChild(h);
    card.appendChild(el('p', 'step-lead', 'Underlined words are from this lesson: tap them. The 🔊 next to each paragraph reads it aloud.'));
    var find = wordFinder(u.vocab.map(function (v) { return Object.assign({ unit: u.id }, v); }));
    r.text.forEach(function (p) {
      var row = el('div', 'para');
      var pp = el('p', '');
      find(p, pp);
      row.appendChild(pp);
      row.appendChild(APP.speakBtn(p));
      card.appendChild(row);
    });
    body.appendChild(card);

    var shadow = el('section', 'card shadow');
    shadow.appendChild(el('h3', '', '🎙️ Read it out loud'));
    shadow.appendChild(el('p', 'muted', 'Pick a paragraph, listen, then record yourself reading it. Compare. This is the fastest way to sound natural.'));
    APP.recorder(shadow);
    body.appendChild(shadow);
    body.appendChild(nextButton('story'));
  }

  function grammarStep(body, u, us, nextButton) {
    var g = u.grammar;
    var card = el('article', 'grammar');
    card.appendChild(el('h2', '', g.title));
    var ul = el('ul', 'g-explain');
    g.explain.forEach(function (t) { ul.appendChild(el('li', '', t)); });
    card.appendChild(ul);
    var ex = el('div', 'g-examples');
    g.examples.forEach(function (e) {
      var row = el('div', 'g-ex');
      var t = el('div', '');
      t.appendChild(el('p', 'g-en', e.en));
      if (e.note) t.appendChild(el('p', 'g-note', e.note));
      row.appendChild(t);
      row.appendChild(APP.speakBtn(e.en));
      ex.appendChild(row);
    });
    card.appendChild(ex);
    var tip = el('aside', 'g-tip');
    tip.appendChild(el('strong', '', '👀 Ojo, ' + APP.profile.short + ':'));
    tip.appendChild(el('p', '', g.tip));
    card.appendChild(tip);
    body.appendChild(card);
    body.appendChild(nextButton('grammar'));
  }

  function practiceStep(body, u, us, nextButton, complete) {
    var queue = u.exercises.map(function (x, i) { return { x: x, i: i, retry: false }; });
    var firstTry = 0, total = queue.length, pos = 0;
    var bar = el('div', 'pbar'), fill = el('span', 'pbar-fill');
    bar.appendChild(fill);
    body.appendChild(bar);
    var host = el('div', 'ex-host');
    body.appendChild(host);
    var foot = el('div', 'ex-foot');
    body.appendChild(foot);

    function show() {
      fill.style.width = (Math.min(pos, total) / total * 100) + '%';
      foot.replaceChildren();
      if (!queue.length) return finish();
      var item = queue.shift();
      var box = el('div', '');
      host.replaceChildren(box);
      if (item.retry) box.appendChild(el('p', 'retry-tag', '↻ One more try'));
      var exHost = el('div', '');
      box.appendChild(exHost);
      APP.exercise(exHost, item.x, {
        onDone: function (ok) {
          if (!item.retry) { pos++; if (ok) { firstTry++; APP.award(10); } }
          if (!ok) queue.push({ x: item.x, i: item.i, retry: true });
          fill.style.width = (Math.min(pos, total) / total * 100) + '%';
          var n = btn('big-btn', queue.length ? 'Continue' : 'See my score', show);
          foot.appendChild(n);
          setTimeout(function () { n.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); n.focus({ preventScroll: true }); }, 60);
        }
      });
    }
    function finish() {
      var pct = firstTry / total, st = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;
      var improved = st > (us.stars || 0);
      us.stars = Math.max(us.stars || 0, st);
      us.best = Math.max(us.best || 0, Math.round(pct * 100));
      APP.save();
      complete('practice', 0);
      APP.award(20 + (improved ? st * 10 : 0));
      host.replaceChildren();
      var res = el('div', 'result');
      res.appendChild(stars(st));
      res.appendChild(el('p', 'result-score', firstTry + ' / ' + total + ' first time'));
      res.appendChild(el('p', 'result-msg', st === 3 ? '¡Espectacular, ' + APP.profile.short + '! Perfect rhythm.' : st === 2 ? 'Really good! One more go for three stars?' : 'Good start. Read the grammar again and try once more.'));
      res.appendChild(btn('ghost-btn', '↻ Practise again', function () { APP.go('#/unit/' + u.id + '/practice?' + Date.now()); }));
      host.appendChild(res);
      if (st === 3) APP.confetti();
      foot.appendChild(nextButton('practice'));
      APP.checkBadges();
    }
    show();
  }

  function speakStep(body, u, us, nextButton) {
    body.appendChild(el('p', 'step-lead', 'Answer each question out loud. Try to talk for 30 seconds, using words from this lesson. Record yourself and listen back: what would you say differently?'));
    u.speak.forEach(function (q, i) {
      var c = el('article', 'card speak');
      var h = el('div', 'speak-head');
      h.appendChild(el('span', 'speak-n', String(i + 1)));
      h.appendChild(el('p', 'speak-q', q));
      h.appendChild(APP.speakBtn(q));
      c.appendChild(h);
      APP.recorder(c);
      body.appendChild(c);
    });
    var words = el('div', 'card word-bank');
    words.appendChild(el('p', 'muted', 'Words to try using:'));
    var chips = el('div', 'chips');
    u.vocab.forEach(function (v) { chips.appendChild(el('span', 'wchip', v.w)); });
    words.appendChild(chips);
    body.appendChild(words);
    body.appendChild(nextButton('speak', 'I said them all — next ✍️'));
  }

  function writeStep(body, u, us, nextButton, complete) {
    var w = u.write;
    var card = el('article', 'card write');
    card.appendChild(el('h2', '', 'Your turn to write'));
    card.appendChild(el('p', 'write-prompt', w.prompt));
    var chips = el('div', 'chips');
    var wchips = w.useWords.map(function (t) { var c = el('span', 'wchip', t); chips.appendChild(c); return { t: t, c: c }; });
    card.appendChild(el('p', 'muted', 'Try to use:'));
    card.appendChild(chips);
    var ta = el('textarea', 'write-box');
    ta.rows = 9;
    ta.placeholder = 'Write here… (at least ' + w.min + ' words)';
    var draftKey = 'dale.draft.' + u.id;
    try { ta.value = localStorage.getItem(draftKey) || ''; } catch (e) {}
    card.appendChild(ta);
    var meta = el('p', 'write-meta');
    card.appendChild(meta);
    var save = btn('big-btn', 'Save to my journal', function () {
      var n = count();
      if (n < w.min) { APP.toast('A few more words: ' + n + ' of ' + w.min + '.'); return; }
      var first = !S.journal.some(function (j) { return j.unit === u.id; });
      S.journal.unshift({ unit: u.id, date: APP.today(), prompt: w.prompt, text: ta.value.trim() });
      try { localStorage.removeItem(draftKey); } catch (e) {}
      APP.save();
      complete('write', 0);
      APP.award(first ? 30 : 10);
      APP.checkBadges();
      APP.celebrate('Lesson complete!', 'Saved to your journal. ' + u.emoji);
      APP.go('#/');
    });
    card.appendChild(save);
    card.appendChild(el('p', 'muted small', 'Tip: show it to someone who speaks English, or read it aloud slowly and listen for anything that sounds strange. Check the grammar step for the patterns.'));
    body.appendChild(card);

    function count() { return (ta.value.trim().match(/[A-Za-zÀ-ÿ'’-]+/g) || []).length; }
    function upd() {
      var n = count(), low = ta.value.toLowerCase();
      meta.textContent = n + ' / ' + w.min + ' words';
      meta.classList.toggle('ok', n >= w.min);
      wchips.forEach(function (x) {
        var stem = x.t.toLowerCase().split(' ')[0].slice(0, Math.max(3, x.t.length - 2));
        x.c.classList.toggle('used', low.indexOf(stem) >= 0);
      });
      try { localStorage.setItem(draftKey, ta.value); } catch (e) {}
    }
    ta.addEventListener('input', upd);
    upd();

    var old = S.journal.filter(function (j) { return j.unit === u.id; });
    if (old.length) {
      var prev = el('details', 'card prev');
      prev.appendChild(el('summary', '', 'What you wrote before (' + old[0].date + ')'));
      prev.appendChild(el('p', 'journal-text', old[0].text));
      body.appendChild(prev);
    }
  }

  /* ================= REVIEW ================= */

  APP.route('review', function (main) {
    backBar(main, '#/', 'Review');
    var due = APP.shuffle(APP.srsDue());
    var seen = APP.allWords.filter(function (v) { return S.srs[APP.wordKey(v)]; });
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', 'Word review'));
    head.appendChild(el('p', 'muted', 'Words come back just before you’d forget them: after 1, 3, 7, 14 and 30 days. ' + APP.srsLearned() + ' learned so far, ' + seen.length + ' seen.'));
    main.appendChild(head);

    if (!seen.length) {
      main.appendChild(empty('🌱', 'No words yet', 'Open a lesson and go through its Words step. They’ll show up here to review.', '#/unit/' + (APP.nextUnit() || APP.units[0] || {}).id, 'Start a lesson'));
      return;
    }
    if (!due.length) {
      var e = empty('✨', 'All caught up!', 'Nothing due today. Come back tomorrow, or practise some anyway.', null);
      e.appendChild(btn('big-btn', 'Practise 10 random words', function () { run(APP.pick(seen, 10), true); e.remove(); }));
      main.appendChild(e);
      return;
    }
    run(due.slice(0, 20), false);

    function run(cards, extra) {
      var reverse = false, i = 0, right = 0;
      var tools = el('div', 'review-tools');
      var sw = el('label', 'switch');
      var cb = el('input'); cb.type = 'checkbox';
      sw.appendChild(cb); sw.appendChild(el('span', '', 'Spanish first'));
      cb.addEventListener('change', function () { reverse = cb.checked; draw(); });
      tools.appendChild(sw);
      var count = el('span', 'muted', '');
      tools.appendChild(count);
      main.appendChild(tools);
      var stage = el('div', 'flash-wrap');
      main.appendChild(stage);
      var acts = el('div', 'flash-acts');
      var no = btn('verdict no', 'Again', function () { grade(false); });
      var yes = btn('verdict yes', 'Got it', function () { grade(true); });
      acts.appendChild(no); acts.appendChild(yes);
      main.appendChild(acts);

      function draw() {
        if (i >= cards.length) return done();
        count.textContent = (i + 1) + ' / ' + cards.length;
        var v = cards[i];
        var card = btn('flash');
        var front = el('span', 'flash-side flash-front'), back = el('span', 'flash-side flash-back');
        var fp = APP.wordImg(v);
        if (fp) front.appendChild(APP.img(fp, 'flash-img', ''));
        if (!reverse) {
          front.appendChild(el('span', 'flash-word', v.w));
          front.appendChild(el('span', 'pos', v.pos));
        } else {
          front.appendChild(el('span', 'flash-word es', v.es));
          front.appendChild(el('span', 'muted', 'How do you say it in English?'));
        }
        front.appendChild(el('span', 'flash-hint', 'tap to flip'));
        back.appendChild(el('span', 'flash-word small', v.w));
        back.appendChild(el('span', 'flash-def', v.def));
        back.appendChild(el('span', 'flash-es', '🇨🇴 ' + v.es));
        back.appendChild(el('span', 'flash-ex', '“' + v.ex + '”'));
        card.appendChild(front); card.appendChild(back);
        card.addEventListener('click', function () {
          card.classList.toggle('flipped');
          if (card.classList.contains('flipped')) APP.speak(v.w);
        });
        stage.replaceChildren(card);
        if (!reverse) setTimeout(function () { APP.speak(v.w); }, 200);
      }
      function grade(ok) {
        var v = cards[i];
        if (!extra) APP.srsGrade(v, ok);
        if (ok) right++;
        APP.sound(ok ? 'right' : 'tap');
        APP.award(ok ? 3 : 1);
        i++;
        draw();
      }
      function done() {
        tools.remove(); acts.remove();
        var d = empty('🎉', right + ' / ' + cards.length + ' remembered', right === cards.length ? 'Perfect memory!' : 'The ones you missed will come back tomorrow.', '#/', 'Back home');
        stage.replaceChildren(d);
        APP.checkBadges();
      }
      document.onkeydown = function (e) {
        if (!document.body.contains(stage)) { document.onkeydown = null; return; }
        if (e.key === ' ') { e.preventDefault(); var f = stage.querySelector('.flash'); if (f) f.click(); }
        if (e.key === 'ArrowLeft') grade(false);
        if (e.key === 'ArrowRight') grade(true);
      };
      draw();
    }
  });

  function empty(icon, title, text, href, label) {
    var e = el('section', 'empty');
    e.appendChild(el('p', 'empty-i', icon));
    e.appendChild(el('h2', '', title));
    e.appendChild(el('p', 'muted', text));
    if (href) { var a = el('a', 'big-btn', label); a.href = href; e.appendChild(a); }
    return e;
  }
  APP.empty = empty;

  /* ================= JOURNAL ================= */

  var FREE = [
    'Describe your perfect Sunday in Barranquilla, from morning to night.',
    'Write about a dish your family makes. Who taught you to cook it?',
    'Tell the story of the best night out dancing you have ever had.',
    'If you could change one law in Colombia, what would it be and why?',
    'Describe your dream dog: breed, name, personality.',
    'What would you tell yourself at 18? Write a letter.',
    'Describe an outfit you love and the occasion you wore it for.',
    'What do you miss most when you are away from home?',
    'Write about a film or series you watched recently. Would you recommend it?',
    'Where do you see yourself in five years?',
    'Describe a person who inspires you, and explain why.',
    'Write a review of the last restaurant you went to.',
    'What is the most interesting court case you have heard about?',
    'Plan a trip to London for a week. What would you do every day?'
  ];

  APP.route('journal', function (main) {
    backBar(main, '#/', 'Journal');
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', 'My journal'));
    head.appendChild(el('p', 'muted', 'Everything you write is kept here, in this phone only. Look back in a few months: you’ll see how far you’ve come.'));
    main.appendChild(head);

    var free = el('section', 'card write');
    var prompt = FREE[APP.dayNumber(APP.today()) % FREE.length];
    free.appendChild(el('h2', '', 'Free writing'));
    var pp = el('p', 'write-prompt', prompt);
    free.appendChild(pp);
    free.appendChild(btn('ghost-btn small', '🎲 Another idea', function () { prompt = APP.pick(FREE, 1)[0]; pp.textContent = prompt; }));
    var ta = el('textarea', 'write-box');
    ta.rows = 6; ta.placeholder = 'Write anything… (40+ words)';
    try { ta.value = localStorage.getItem('dale.draft.free') || ''; } catch (e) {}
    ta.addEventListener('input', function () { try { localStorage.setItem('dale.draft.free', ta.value); } catch (e) {} meta.textContent = words(ta.value) + ' words'; });
    free.appendChild(ta);
    var meta = el('p', 'write-meta', words(ta.value) + ' words');
    free.appendChild(meta);
    free.appendChild(btn('big-btn', 'Save', function () {
      if (words(ta.value) < 40) { APP.toast('Write at least 40 words.'); return; }
      S.journal.unshift({ unit: '', date: APP.today(), prompt: prompt, text: ta.value.trim() });
      try { localStorage.removeItem('dale.draft.free'); } catch (e) {}
      APP.save(); APP.award(20); APP.checkBadges();
      APP.go('#/journal?' + Date.now());
    }));
    main.appendChild(free);

    if (!S.journal.length) { main.appendChild(el('p', 'muted center', 'Nothing here yet. Each lesson ends with a short writing task.')); return; }
    S.journal.forEach(function (j, idx) {
      var d = el('details', 'card entry');
      var sm = el('summary', '');
      var u = APP.unit(j.unit);
      sm.appendChild(el('span', 'entry-title', (u ? u.emoji + ' ' + u.title : '📝 Free writing')));
      sm.appendChild(el('span', 'entry-meta', j.date + ' · ' + words(j.text) + ' words'));
      d.appendChild(sm);
      d.appendChild(el('p', 'entry-prompt', j.prompt));
      d.appendChild(el('p', 'journal-text', j.text));
      var row = el('div', 'entry-acts');
      row.appendChild(APP.speakBtn(j.text, 'Hear it'));
      row.appendChild(btn('ghost-btn small', 'Copy', function () { copy(j.text); }));
      var del = btn('ghost-btn small danger', 'Delete', function () {
        if (del.dataset.sure) { S.journal.splice(idx, 1); APP.save(); APP.go('#/journal?' + Date.now()); }
        else { del.dataset.sure = '1'; del.textContent = 'Tap again to delete'; }
      });
      row.appendChild(del);
      d.appendChild(row);
      main.appendChild(d);
    });
  });
  function words(t) { return (String(t).trim().match(/[A-Za-zÀ-ÿ'’-]+/g) || []).length; }
  function copy(t) {
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { APP.toast('Copied'); }, function () {});
  }

  /* ================= ME ================= */

  APP.route('me', function (main) {
    var est = APP.estimate(), lvl = APP.levelOf(S.xp);
    var head = el('section', 'me-head');
    head.appendChild(el('h1', '', APP.profile.name));
    head.appendChild(el('p', 'muted', 'Learning since ' + S.created));
    main.appendChild(head);

    var cefr = el('section', 'card cefr');
    cefr.appendChild(el('h2', '', 'Your journey to C1'));
    var track = el('div', 'cefr-track');
    ['B1', 'B1+', 'B2', 'B2+', 'C1'].forEach(function (l) {
      var s = el('span', 'cefr-stop' + (l === est.label ? ' here' : ''), l);
      track.appendChild(s);
    });
    var tf = el('div', 'cefr-fill'); tf.style.width = (est.frac * 100) + '%';
    var bar = el('div', 'cefr-bar'); bar.appendChild(tf);
    cefr.appendChild(bar);
    cefr.appendChild(track);
    cefr.appendChild(el('p', 'muted', est.done + ' of ' + est.total + ' lessons finished. Finish every lesson in a level to reach the next one.'));
    main.appendChild(cefr);

    var stats = el('section', 'stats');
    [['⚡', S.xp, 'XP'], ['🏅', lvl.n, 'Level'], ['🔥', APP.streakNow(), 'Day streak'], ['🏆', S.streak.best, 'Best streak'],
      ['📚', APP.srsLearned(), 'Words learned'], ['🧊', S.streak.freezes, 'Streak freezes']].forEach(function (s) {
      var c = el('div', 'stat');
      c.appendChild(el('span', 'stat-i', s[0]));
      c.appendChild(el('span', 'stat-n', String(s[1])));
      c.appendChild(el('span', 'stat-l', s[2]));
      stats.appendChild(c);
    });
    main.appendChild(stats);
    main.appendChild(el('p', 'muted small center', 'You earn a streak freeze every 7 days in a row (max 2). It saves your streak if you miss one day.'));

    // the last 14 days
    var week = el('section', 'card days');
    week.appendChild(el('h2', '', 'Last two weeks'));
    var bars = el('div', 'day-bars');
    var max = S.settings.goal;
    var list = [];
    for (var i = 13; i >= 0; i--) {
      var d = new Date(Date.now() - i * 864e5), k = APP.today(d), v = S.days[k] || 0;
      list.push({ d: d, v: v }); if (v > max) max = v;
    }
    list.forEach(function (x) {
      var col = el('div', 'day-col');
      var b = el('span', 'day-bar' + (x.v >= S.settings.goal ? ' met' : ''));
      b.style.height = Math.max(3, x.v / max * 100) + '%';
      b.title = x.v + ' XP';
      col.appendChild(b);
      col.appendChild(el('span', 'day-l', 'SMTWTFS'.charAt(x.d.getDay())));
      bars.appendChild(col);
    });
    week.appendChild(bars);
    main.appendChild(week);

    var badges = el('section', 'card');
    badges.appendChild(el('h2', '', 'Badges'));
    var bg = el('div', 'badges');
    APP.BADGES.forEach(function (b) {
      var got = !!S.badges[b.id];
      var c = el('div', 'badge' + (got ? ' got' : ''));
      c.appendChild(el('span', 'badge-i', got ? b.icon : '🔒'));
      c.appendChild(el('span', 'badge-n', b.name));
      c.appendChild(el('span', 'badge-d', b.desc));
      bg.appendChild(c);
    });
    badges.appendChild(bg);
    main.appendChild(badges);

    // settings
    var set = el('section', 'card settings');
    set.appendChild(el('h2', '', 'Settings'));
    set.appendChild(field('Daily goal', select([[30, 'Relaxed · 30 XP'], [50, 'Regular · 50 XP'], [100, 'Serious · 100 XP'], [150, 'Intense · 150 XP']], S.settings.goal, function (v) { S.settings.goal = +v; APP.save(); })));
    set.appendChild(field('Speaking speed', select([[0.8, 'Slow'], [0.95, 'Normal'], [1.1, 'Fast']], S.settings.rate, function (v) { S.settings.rate = +v; APP.save(); APP.speak('This is how fast I will speak.'); })));
    var vs = APP.voices();
    if (vs.length) {
      var stars = ['', '', '★ ', '★★ '];
      var opts = [['', 'Automatic (most natural)']].concat(vs.map(function (v) { return [v.name, stars[APP.voiceQuality(v)] + v.name + ' · ' + v.lang]; }));
      set.appendChild(field('Voice', select(opts, S.settings.voice, function (v) { APP.setVoice(v); APP.speak('Hello ' + APP.profile.short + ', I will be your voice.'); })));
      if (!vs.some(function (v) { return APP.voiceQuality(v) >= 2; }))
        set.appendChild(el('p', 'muted small', 'For a more natural voice on iPhone: Settings → Accessibility → Spoken Content → Voices → English, download a voice marked Enhanced or Premium, then reopen the app.'));
    } else if (APP.canSpeak) {
      set.appendChild(el('p', 'muted small', 'Voices are still loading. Come back to this page in a moment to choose one.'));
    }
    var snd = el('label', 'switch');
    var scb = el('input'); scb.type = 'checkbox'; scb.checked = S.settings.sound;
    scb.addEventListener('change', function () { S.settings.sound = scb.checked; APP.save(); });
    snd.appendChild(scb); snd.appendChild(el('span', '', 'Sound effects'));
    set.appendChild(snd);
    main.appendChild(set);

    var inst = el('section', 'card');
    inst.appendChild(el('h2', '', '📱 Use it offline'));
    inst.appendChild(el('p', '', 'Add the app to your home screen and it works with no internet, like a normal app.'));
    var ol = el('ul', 'g-explain');
    ol.appendChild(el('li', '', 'iPhone (Safari): tap the Share button, then “Add to Home Screen”.'));
    ol.appendChild(el('li', '', 'Android (Chrome): tap ⋮, then “Install app” or “Add to Home screen”.'));
    ol.appendChild(el('li', '', 'Open it once with internet so everything downloads. After that, no connection needed.'));
    inst.appendChild(ol);
    inst.appendChild(el('p', 'muted small', 'Voices: if the voice sounds robotic, on iPhone go to Settings → Accessibility → Spoken Content → Voices → English and download an “Enhanced” British voice.'));
    main.appendChild(inst);

    main.appendChild(cloudCard());

    var bk = el('section', 'card');
    bk.appendChild(el('h2', '', '💾 Backup'));
    bk.appendChild(el('p', 'muted', 'A copy of your progress in a file or a code, for safekeeping alongside the cloud save.'));
    var row = el('div', 'row-btns');
    row.appendChild(btn('ghost-btn', 'Download backup', function () {
      var a = el('a');
      a.href = URL.createObjectURL(new Blob([APP.exportData()], { type: 'application/json' }));
      a.download = 'dale-dani-backup-' + APP.today() + '.json';
      document.body.appendChild(a); a.click(); a.remove();
    }));
    row.appendChild(btn('ghost-btn', 'Copy backup code', function () { copy(APP.exportData()); }));
    var file = el('input'); file.type = 'file'; file.accept = '.json,application/json'; file.hidden = true;
    file.addEventListener('change', function () {
      var f = file.files[0]; if (!f) return;
      f.text().then(restore);
    });
    row.appendChild(file);
    row.appendChild(btn('ghost-btn', 'Restore from file', function () { file.click(); }));
    bk.appendChild(row);
    var paste = el('details', 'paste');
    paste.appendChild(el('summary', '', 'Restore from a code'));
    var pta = el('textarea', 'write-box'); pta.rows = 3; pta.placeholder = 'Paste the backup code here';
    paste.appendChild(pta);
    paste.appendChild(btn('ghost-btn', 'Restore', function () { restore(pta.value); }));
    bk.appendChild(paste);
    var rs = btn('ghost-btn danger', 'Start again from zero', function () {
      if (rs.dataset.sure) { APP.reset(); location.hash = ''; location.reload(); }
      else { rs.dataset.sure = '1'; rs.textContent = 'Are you sure? Tap again to erase everything'; }
    });
    bk.appendChild(rs);
    main.appendChild(bk);

    function restore(text) {
      try { APP.importData(text.trim()); APP.toast('Restored!'); setTimeout(function () { location.reload(); }, 600); }
      catch (e) { APP.toast(e.message || 'That backup did not work.'); }
    }
  });

  // Cloud save: progress copied to the server (api/progress.mjs) so a new phone can get it back.
  function cloudCard() {
    var card = el('section', 'card');
    card.appendChild(el('h2', '', '☁️ Cloud save'));
    var status = el('p', 'muted');
    var body = el('div');
    card.appendChild(status); card.appendChild(body);
    draw();
    return card;

    function when(iso) {
      var d = new Date(iso);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ', ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    }
    function draw() {
      body.replaceChildren();
      if (!S.settings.passcode) {
        status.textContent = 'Type the passcode (the same one as the AI partner) and your progress is copied to the cloud as you go.';
        var inp = el('input'); inp.type = 'text'; inp.autocomplete = 'off'; inp.autocapitalize = 'off'; inp.placeholder = 'Passcode';
        body.appendChild(inp);
        body.appendChild(btn('ghost-btn', 'Turn on', function () {
          if (!inp.value.trim()) return;
          S.settings.passcode = inp.value.trim(); APP.save();
          check();
        }));
        return;
      }
      var info = APP.cloudInfo();
      status.textContent =
        info.problem === 'passcode' ? '🔑 That passcode didn’t work.' :
        info.problem === 'off' ? 'Cloud save isn’t set up on the server yet.' :
        info.problem === 'ahead' ? '⚠️ The cloud has more progress than this phone. Restore it below, or save this phone’s progress over it.' :
        info.saved ? '✅ Saved to the cloud ' + when(info.saved) + '. It saves by itself as you go.' :
        'Not saved to the cloud yet.';
      var row = el('div', 'row-btns');
      var save = btn('ghost-btn', 'Save now', function () {
        var force = info.problem === 'ahead';
        if (force && !save.dataset.sure) { save.dataset.sure = '1'; save.textContent = 'Tap again to replace the cloud copy'; return; }
        save.disabled = true;
        APP.cloudSave(force).then(function () { APP.toast('Saved to the cloud ☁️'); }, failed).then(draw);
      });
      var load = btn('ghost-btn', 'Restore from cloud', function () {
        if (!load.dataset.sure) { load.dataset.sure = '1'; load.textContent = 'Tap again: this replaces the progress on this phone'; return; }
        load.disabled = true;
        APP.cloud('load').then(function (d) {
          if (!d.data) { APP.toast('There’s nothing in the cloud yet.'); draw(); return; }
          d.data.settings = d.data.settings || {};
          d.data.settings.passcode = S.settings.passcode; // keep the passcode she just typed
          APP.importData(JSON.stringify(d.data));
          APP.cloudNote({ saved: d.saved });
          APP.toast('Restored!');
          setTimeout(function () { location.reload(); }, 600);
        }, function (e) { failed(e); draw(); });
      });
      row.appendChild(save); row.appendChild(load);
      body.appendChild(row);
      if (info.problem === 'passcode') {
        body.appendChild(btn('ghost-btn small', 'Change passcode', function () { S.settings.passcode = ''; APP.save(); draw(); }));
      }
    }
    // after typing the passcode: if the cloud already has progress, offer it instead of overwriting it
    function check() {
      APP.cloud('load').then(function (d) {
        if (d.data && d.data.xp > S.xp) {
          APP.cloudNote({ saved: d.saved, problem: 'ahead' });
          draw();
        } else {
          APP.cloudSave().then(function () { APP.toast('Cloud save is on ☁️'); }, failed).then(draw);
        }
      }, function (e) {
        if (e.status === 401) { S.settings.passcode = ''; APP.save(); APP.toast('That passcode didn’t work.'); }
        else failed(e);
        draw();
      });
    }
    function failed(e) {
      APP.toast(e.status === 401 ? 'That passcode didn’t work.' : e.status === 503 ? 'Cloud save isn’t set up on the server yet.' :
        e.status === 409 ? 'The cloud has more progress than this phone.' : 'Couldn’t reach the cloud. Are you online?');
    }
  }

  function field(label, control) {
    var f = el('label', 'field');
    f.appendChild(el('span', 'field-l', label));
    f.appendChild(control);
    return f;
  }
  function select(opts, val, onChange) {
    var s = el('select', '');
    opts.forEach(function (o) {
      var op = el('option', '', o[1]); op.value = o[0];
      if (String(o[0]) === String(val)) op.selected = true;
      s.appendChild(op);
    });
    s.addEventListener('change', function () { onChange(s.value); });
    return s;
  }
})();
