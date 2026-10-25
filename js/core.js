// The shared engine: saved progress, XP and streaks, spaced repetition, speech,
// small DOM helpers and the hash router. Every other script hangs off window.APP.
(function () {
  var APP = window.APP = {};
  var KEY = 'dale.v1';

  /* ---------- helpers ---------- */

  APP.el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  };
  APP.btn = function (cls, text, onClick) {
    var b = APP.el('button', cls, text);
    b.type = 'button';
    if (onClick) b.addEventListener('click', onClick);
    return b;
  };
  APP.shuffle = function (a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  APP.pick = function (a, n) { return APP.shuffle(a).slice(0, n); };
  APP.today = function (d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  function dayNumber(s) { var p = s.split('-'); return Math.round(Date.UTC(+p[0], p[1] - 1, +p[2]) / 864e5); }
  APP.dayNumber = dayNumber;

  // For comparing typed answers: case, curly quotes, punctuation, spacing and
  // contractions don't matter.
  var CONTRACT = {
    "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "it's": 'it is',
    "he's": 'he is', "she's": 'she is', "that's": 'that is', "there's": 'there is', "what's": 'what is',
    "i've": 'i have', "you've": 'you have', "we've": 'we have', "they've": 'they have',
    "i'll": 'i will', "you'll": 'you will', "we'll": 'we will', "they'll": 'they will', "she'll": 'she will', "he'll": 'he will', "it'll": 'it will',
    "i'd": 'i would', "you'd": 'you would', "we'd": 'we would', "they'd": 'they would', "she'd": 'she would', "he'd": 'he would',
    "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not', "don't": 'do not', "doesn't": 'does not',
    "didn't": 'did not', "haven't": 'have not', "hasn't": 'has not', "hadn't": 'had not', "won't": 'will not', "wouldn't": 'would not',
    "can't": 'cannot', "couldn't": 'could not', "shouldn't": 'should not', "mustn't": 'must not', "mightn't": 'might not', "needn't": 'need not',
    "let's": 'let us'
  };
  APP.norm = function (s, expand) {
    s = String(s).toLowerCase().replace(/[‘’`´]/g, "'").replace(/[“”]/g, '"')
      .replace(/[^a-z0-9'áéíóúñü\s-]/g, ' ').replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
    if (expand) s = s.split(' ').map(function (w) { return CONTRACT[w] || w; }).join(' ').replace(/\bcan not\b/g, 'cannot');
    return s;
  };
  APP.same = function (a, b) {
    return APP.norm(a) === APP.norm(b) || APP.norm(a, true) === APP.norm(b, true);
  };

  /* ---------- saved state ---------- */

  function fresh() {
    return {
      xp: 0, days: {}, streak: { last: '', count: 0, best: 0, freezes: 1 },
      units: {}, srs: {}, games: {}, journal: [], badges: {}, seenWords: 0,
      settings: { rate: 0.95, voice: '', sound: true, goal: 50 }, created: APP.today()
    };
  }
  var state;
  try { state = JSON.parse(localStorage.getItem(KEY)); } catch (e) { state = null; }
  if (!state || typeof state !== 'object') state = fresh();
  var base = fresh();
  Object.keys(base).forEach(function (k) { if (state[k] === undefined) state[k] = base[k]; });
  Object.keys(base.settings).forEach(function (k) { if (state.settings[k] === undefined) state.settings[k] = base.settings[k]; });
  APP.state = state;

  APP.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  };
  APP.exportData = function () { return JSON.stringify(state); };
  APP.importData = function (text) {
    var s = JSON.parse(text);
    if (!s || typeof s !== 'object' || typeof s.xp !== 'number') throw new Error('That does not look like a backup.');
    localStorage.setItem(KEY, JSON.stringify(s));
  };
  APP.reset = function () { localStorage.removeItem(KEY); };

  // Ask the browser not to clear our storage (iOS clears sites it thinks are unused).
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});

  /* ---------- XP, levels, streak ---------- */

  // Level n needs 100 * n * (n + 1) / 2 XP in total: 100, 300, 600, ...
  APP.levelOf = function (xp) {
    var n = 1;
    while (xp >= 50 * n * (n + 1)) n++;
    var lo = 50 * (n - 1) * n, hi = 50 * n * (n + 1);
    return { n: n, into: xp - lo, need: hi - lo };
  };
  APP.todayXP = function () { return state.days[APP.today()] || 0; };

  function touchStreak() {
    var t = APP.today(), s = state.streak;
    if (s.last === t) return;
    var gap = s.last ? dayNumber(t) - dayNumber(s.last) : 0;
    if (s.last && gap === 2 && s.freezes > 0) { s.freezes--; s.count++; APP.toast('🧊 A streak freeze saved your streak!'); }
    else if (!s.last || gap > 1) s.count = 0;
    s.count++;
    s.last = t;
    if (s.count > s.best) s.best = s.count;
    // earn a freeze every 7 days, keep at most 2
    if (s.count % 7 === 0 && s.freezes < 2) s.freezes++;
    APP.emit('streak');
  }
  // How long the streak is right now (0 if a day was missed and not frozen).
  APP.streakNow = function () {
    var s = state.streak;
    if (!s.last) return 0;
    var gap = dayNumber(APP.today()) - dayNumber(s.last);
    if (gap <= 1) return s.count;
    if (gap === 2 && s.freezes > 0) return s.count;
    return 0;
  };

  APP.award = function (xp, why) {
    if (!xp) return;
    var before = APP.levelOf(state.xp).n, goalBefore = APP.todayXP() >= state.settings.goal;
    state.xp += xp;
    var t = APP.today();
    state.days[t] = (state.days[t] || 0) + xp;
    touchStreak();
    APP.save();
    APP.floatXP(xp);
    var after = APP.levelOf(state.xp).n;
    if (after > before) APP.celebrate('Level ' + after + '!', 'You keep getting better, ' + APP.profile.short + '. 💃');
    else if (!goalBefore && APP.todayXP() >= state.settings.goal) APP.celebrate('Daily goal done!', 'Streak: ' + APP.streakNow() + ' day' + (APP.streakNow() === 1 ? '' : 's') + ' 🔥');
    APP.checkBadges();
    APP.emit('xp');
  };

  /* ---------- tiny event bus ---------- */
  var subs = {};
  APP.on = function (name, fn) { (subs[name] = subs[name] || []).push(fn); };
  APP.emit = function (name) { (subs[name] || []).forEach(function (fn) { try { fn(); } catch (e) {} }); };

  /* ---------- content ---------- */

  APP.profile = window.PROFILE || { name: 'Daniela', short: 'Dani' };
  APP.units = (window.UNITS || []).slice().sort(function (a, b) { return a.order - b.order; });
  APP.unit = function (id) { return APP.units.filter(function (u) { return u.id === id; })[0]; };
  APP.games = window.GAMES || {};
  APP.STAGES = {
    1: { label: 'B1+', name: 'Warming up', es: 'Calentando motores' },
    2: { label: 'B2', name: 'Finding your rhythm', es: 'Cogiendo el ritmo' },
    3: { label: 'B2+', name: 'Owning the floor', es: 'Dueña de la pista' },
    4: { label: 'C1', name: 'Reina del Carnaval', es: 'La reina' }
  };
  // every word in every unit, tagged with where it came from
  APP.allWords = [];
  APP.units.forEach(function (u) {
    u.vocab.forEach(function (v) { APP.allWords.push(Object.assign({ unit: u.id }, v)); });
  });
  APP.wordKey = function (v) { return v.unit + ':' + v.w; };

  // pictures (data/images.js, built by tools/images.py)
  var IMG = window.IMAGES || { stories: {}, words: {} };
  APP.wordImg = function (v) { return (IMG.words || {})[v.unit + ':' + v.w] || ''; };
  APP.storyImg = function (id) { return (IMG.stories || {})[id] || ''; };
  APP.img = function (src, cls, alt) {
    var i = APP.el('img', cls);
    i.src = src; i.alt = alt || ''; i.loading = 'lazy'; i.decoding = 'async';
    i.onerror = function () { i.remove(); };
    return i;
  };

  APP.unitState = function (id) {
    return state.units[id] || (state.units[id] = { stars: 0, best: 0, steps: {} });
  };
  APP.unitProgress = function (u) {
    var s = state.units[u.id];
    if (!s) return 0;
    var steps = ['words', 'story', 'grammar', 'practice', 'speak', 'write'];
    return steps.filter(function (k) { return s.steps && s.steps[k]; }).length / steps.length;
  };
  APP.nextUnit = function () {
    for (var i = 0; i < APP.units.length; i++) {
      var s = state.units[APP.units[i].id];
      if (!s || !s.stars) return APP.units[i];
    }
    return null;
  };
  // A rough CEFR reading from finished units.
  APP.estimate = function () {
    var done = APP.units.filter(function (u) { return (state.units[u.id] || {}).stars > 0; });
    var by = {}; done.forEach(function (u) { by[u.stage] = (by[u.stage] || 0) + 1; });
    var total = {}; APP.units.forEach(function (u) { total[u.stage] = (total[u.stage] || 0) + 1; });
    var labels = ['B1', 'B1+', 'B2', 'B2+', 'C1'], at = 0;
    for (var s = 1; s <= 4; s++) { if (total[s] && by[s] >= total[s]) at = s; else break; }
    var frac = APP.units.length ? done.length / APP.units.length : 0;
    return { label: labels[at], next: labels[Math.min(at + 1, 4)], frac: frac, done: done.length, total: APP.units.length };
  };

  /* ---------- spaced repetition ---------- */
  // Leitner boxes 1-5; a word comes back after 1, 3, 7, 14, 30 days.
  var GAPS = [0, 1, 3, 7, 14, 30];
  APP.srsAdd = function (v) {
    var k = APP.wordKey(v);
    if (!state.srs[k]) { state.srs[k] = { box: 0, due: APP.today() }; state.seenWords++; }
  };
  APP.srsDue = function () {
    var t = dayNumber(APP.today());
    return APP.allWords.filter(function (v) {
      var r = state.srs[APP.wordKey(v)];
      return r && dayNumber(r.due) <= t;
    });
  };
  APP.srsGrade = function (v, ok) {
    var r = state.srs[APP.wordKey(v)] || { box: 0 };
    r.box = ok ? Math.min(5, r.box + 1) : 1;
    r.due = APP.today(new Date(Date.now() + GAPS[r.box] * 864e5));
    state.srs[APP.wordKey(v)] = r;
    APP.save();
  };
  APP.srsLearned = function () {
    return Object.keys(state.srs).filter(function (k) { return state.srs[k].box >= 3; }).length;
  };

  /* ---------- badges ---------- */
  APP.BADGES = [
    { id: 'first', icon: '🌱', name: 'First steps', desc: 'Finish your first lesson', test: function () { return APP.estimate().done >= 1; } },
    { id: 'streak3', icon: '🔥', name: 'On fire', desc: 'A 3-day streak', test: function () { return state.streak.best >= 3; } },
    { id: 'streak7', icon: '🌶️', name: 'Picante', desc: 'A 7-day streak', test: function () { return state.streak.best >= 7; } },
    { id: 'streak30', icon: '👑', name: 'Reina', desc: 'A 30-day streak', test: function () { return state.streak.best >= 30; } },
    { id: 'words50', icon: '📚', name: 'Bookworm', desc: 'Learn 50 words', test: function () { return APP.srsLearned() >= 50; } },
    { id: 'words150', icon: '🧠', name: 'Walking dictionary', desc: 'Learn 150 words', test: function () { return APP.srsLearned() >= 150; } },
    { id: 'stage1', icon: '💃', name: 'Warmed up', desc: 'Finish every B1+ lesson', test: function () { return stageDone(1); } },
    { id: 'stage2', icon: '🎺', name: 'B2 unlocked', desc: 'Finish every B2 lesson', test: function () { return stageDone(2); } },
    { id: 'stage3', icon: '⚖️', name: 'Case closed', desc: 'Finish every B2+ lesson', test: function () { return stageDone(3); } },
    { id: 'stage4', icon: '🌺', name: 'Reina del Carnaval', desc: 'Finish every C1 lesson', test: function () { return stageDone(4); } },
    { id: 'perfect', icon: '⭐', name: 'Perfecto', desc: 'Three stars on a lesson', test: function () { return Object.keys(state.units).some(function (k) { return state.units[k].stars >= 3; }); } },
    { id: 'writer', icon: '✍️', name: 'Writer', desc: 'Write 5 journal entries', test: function () { return state.journal.length >= 5; } },
    { id: 'puppy', icon: '🐶', name: 'Puppy saver', desc: 'Save 10 puppies', test: function () { return (state.games.rescueWins || 0) >= 10; } },
    { id: 'gamer', icon: '🎮', name: 'Player', desc: 'Play every game', test: function () { return ['friends', 'fixit', 'speed', 'rescue', 'sounds', 'idioms', 'phrasal', 'memory', 'dictation'].every(function (g) { return state.games[g] !== undefined; }); } },
    { id: 'xp1000', icon: '💎', name: 'Mil', desc: 'Earn 1,000 XP', test: function () { return state.xp >= 1000; } }
  ];
  function stageDone(n) {
    var us = APP.units.filter(function (u) { return u.stage === n; });
    return us.length > 0 && us.every(function (u) { return (state.units[u.id] || {}).stars > 0; });
  }
  APP.checkBadges = function () {
    APP.BADGES.forEach(function (b) {
      if (!state.badges[b.id] && b.test()) {
        state.badges[b.id] = APP.today();
        APP.save();
        setTimeout(function () { APP.toast(b.icon + ' New badge: ' + b.name); }, 900);
      }
    });
  };

  /* ---------- speech ---------- */

  var synth = window.speechSynthesis, voice = null;
  function pickVoice() {
    if (!synth) return;
    var vs = synth.getVoices().filter(function (v) { return /^en[-_]/i.test(v.lang); });
    var chosen = vs.filter(function (v) { return v.name === state.settings.voice; })[0];
    if (!chosen) {
      // prefer a British voice, then a good-quality one, then anything English
      var gb = vs.filter(function (v) { return /GB/i.test(v.lang); });
      var nice = function (list) { return list.filter(function (v) { return /enhanced|premium|natural|google|serena|daniel|kate|libby|sonia|ryan/i.test(v.name); })[0]; };
      chosen = nice(gb) || gb[0] || nice(vs) || vs[0] || null;
    }
    voice = chosen;
  }
  if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }
  APP.voices = function () { return synth ? synth.getVoices().filter(function (v) { return /^en[-_]/i.test(v.lang); }) : []; };
  APP.setVoice = function (name) { state.settings.voice = name; APP.save(); pickVoice(); };
  APP.canSpeak = !!synth;
  APP.speak = function (text, opts) {
    if (!synth) return;
    opts = opts || {};
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-GB';
    u.rate = (opts.slow ? 0.7 : 1) * state.settings.rate;
    if (opts.onend) u.onend = opts.onend;
    synth.speak(u);
  };
  APP.stopSpeaking = function () { if (synth) synth.cancel(); };
  APP.speakBtn = function (text, label) {
    var b = APP.btn('say', label || '');
    b.setAttribute('aria-label', 'Listen: ' + text);
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' + (label ? '<span>' + label + '</span>' : '');
    if (!synth) b.hidden = true;
    var slow = false;
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      APP.speak(typeof text === 'function' ? text() : text, { slow: slow });
      slow = !slow; // a second tap repeats it slowly
    });
    return b;
  };

  // Recording yourself: works offline in modern Safari and Chrome.
  APP.canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  APP.recorder = function (host) {
    var wrap = APP.el('div', 'rec');
    var rec = APP.btn('rec-btn', '● Record'), play = APP.btn('ghost-btn', '▶ Play me back'), audio = new Audio();
    play.disabled = true;
    var mr = null, chunks = [], stream = null;
    rec.addEventListener('click', function () {
      if (mr && mr.state === 'recording') { mr.stop(); return; }
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (s) {
        stream = s; chunks = [];
        mr = new MediaRecorder(s);
        mr.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); };
        mr.onstop = function () {
          stream.getTracks().forEach(function (t) { t.stop(); });
          audio.src = URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || 'audio/mp4' }));
          play.disabled = false;
          rec.textContent = '● Record again';
          rec.classList.remove('on');
          if (wrap.onrecorded) wrap.onrecorded();
        };
        mr.start();
        rec.textContent = '■ Stop';
        rec.classList.add('on');
      }).catch(function () { APP.toast('I need permission to use the microphone.'); });
    });
    play.addEventListener('click', function () { audio.currentTime = 0; audio.play(); });
    wrap.appendChild(rec); wrap.appendChild(play);
    if (!APP.canRecord) { wrap.replaceChildren(APP.el('p', 'muted', 'Recording is not available in this browser, so say it out loud to yourself (or to Lola).')); }
    host.appendChild(wrap);
    return wrap;
  };

  /* ---------- feedback: toasts, XP float, celebration, sounds ---------- */

  APP.toast = function (msg) {
    var t = APP.el('div', 'toast', msg);
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('in'); });
    setTimeout(function () { t.classList.remove('in'); setTimeout(function () { t.remove(); }, 400); }, 2600);
  };
  APP.floatXP = function (n) {
    var f = APP.el('div', 'xp-float', '+' + n + ' XP');
    document.body.appendChild(f);
    setTimeout(function () { f.remove(); }, 1300);
  };
  APP.confetti = function () {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var colors = ['#ff3d7f', '#ffc83d', '#16b39a', '#3b6cff', '#ff7a1a', '#b14dff'];
    var box = APP.el('div', 'confetti');
    for (var i = 0; i < 70; i++) {
      var p = APP.el('i');
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = Math.random() * 0.5 + 's';
      p.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
      p.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      if (i % 3 === 0) p.style.borderRadius = '50%';
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 3400);
  };
  APP.celebrate = function (title, sub) {
    APP.confetti();
    APP.sound('win');
    var m = APP.el('div', 'celebrate');
    var card = APP.el('div', 'celebrate-card');
    card.appendChild(APP.el('p', 'celebrate-title', title));
    if (sub) card.appendChild(APP.el('p', 'celebrate-sub', sub));
    card.appendChild(APP.btn('big-btn', '¡Dale!', function () { m.remove(); }));
    m.appendChild(card);
    m.addEventListener('click', function (e) { if (e.target === m) m.remove(); });
    document.body.appendChild(m);
  };

  var actx = null;
  APP.sound = function (kind) {
    if (!state.settings.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var notes = { right: [660, 880], wrong: [220, 180], win: [523, 659, 784, 1047], tap: [500] }[kind] || [440];
      notes.forEach(function (f, i) {
        var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + i * 0.09;
        o.type = kind === 'wrong' ? 'triangle' : 'sine';
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g); g.connect(actx.destination);
        o.start(t); o.stop(t + 0.25);
      });
    } catch (e) {}
  };
  APP.buzz = function (ms) { if (navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} };

  /* ---------- router ---------- */

  var routes = {};
  APP.route = function (name, fn) { routes[name] = fn; };
  APP.go = function (hash) { location.hash = hash; };
  function render() {
    APP.stopSpeaking();
    var parts = (location.hash.replace(/^#\/?/, '').replace(/\?.*$/, '') || 'home').split('/');
    var fn = routes[parts[0]] || routes.home;
    var main = document.getElementById('main');
    main.replaceChildren();
    main.className = 'view view-' + parts[0];
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.classList.toggle('on', a.getAttribute('data-r') === (parts[0] === 'unit' ? 'home' : parts[0] === 'game' ? 'games' : parts[0]));
    });
    fn(main, parts.slice(1));
    window.scrollTo(0, 0);
  }
  APP.start = function () {
    window.addEventListener('hashchange', render);
    render();
  };
})();
