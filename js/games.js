// The games. Most are a run of rounds drawn with APP.exercise; Save the puppy,
// Sounds, Memory and the Speed round have their own boards.
(function () {
  var APP = window.APP, el = APP.el, btn = APP.btn, S = APP.state, G = APP.games;

  var LIST = [
    { id: 'pictures', icon: '🖼️', name: 'Picture this', desc: 'Look at the picture. Which word is it?', need: 'pics' },
    { id: 'friends', icon: '🎭', name: 'Falsos amigos', desc: 'Words that look Spanish but lie to you.', need: 'falseFriends' },
    { id: 'fixit', icon: '🔍', name: 'Correct or not?', desc: 'Spot the classic mistakes.', need: 'mistakes' },
    { id: 'speed', icon: '⏱️', name: 'Speed round', desc: '60 seconds. How many can you get?' },
    { id: 'rescue', icon: '🐶', name: 'Save the puppy', desc: 'Guess the word before the balloons pop.', need: 'rescue' },
    { id: 'sounds', icon: '👂', name: 'Ship or sheep?', desc: 'Train your ear for tricky sounds.', need: 'pairs' },
    { id: 'idioms', icon: '🌶️', name: 'Idioms', desc: 'Raining cats and dogs? Learn what it means.', need: 'idioms' },
    { id: 'phrasal', icon: '🧲', name: 'Phrasal match', desc: 'Match phrasal verbs to their meaning.', need: 'phrasal' },
    { id: 'memory', icon: '🃏', name: 'Memory', desc: 'Find the English and Spanish pairs.' },
    { id: 'dictation', icon: '🎧', name: 'Dictation', desc: 'Listen and write the sentence.' }
  ];

  APP.route('games', function (main) {
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', 'Games'));
    head.appendChild(el('p', 'muted', 'Learn while you play. Every game earns XP for your daily goal.'));
    main.appendChild(head);
    var grid = el('section', 'games');
    LIST.forEach(function (g) {
      if (g.need === 'pics') { if (picWords().length < 8) return; }
      else if (g.need && !(G[g.need] || []).length) return;
      var a = el('a', 'game-card');
      a.href = '#/game/' + g.id;
      a.appendChild(el('span', 'game-i', g.icon));
      a.appendChild(el('span', 'game-n', g.name));
      a.appendChild(el('span', 'game-d', g.desc));
      var best = S.games[g.id];
      if (best !== undefined) a.appendChild(el('span', 'game-best', g.id === 'rescue' ? (S.games.rescueWins || 0) + ' saved' : 'Best: ' + best));
      grid.appendChild(a);
    });
    main.appendChild(grid);
  });

  APP.route('game', function (main, args) {
    var g = LIST.filter(function (x) { return x.id === args[0]; })[0];
    if (!g) { APP.go('#/games'); return; }
    APP.backBar(main, '#/games', g.icon + ' ' + g.name);
    ({ pictures: pictures, friends: friends, fixit: fixit, speed: speed, rescue: rescue, sounds: sounds, idioms: idioms,
      phrasal: phrasal, memory: memory, dictation: dictation })[g.id](main, g);
  });

  function record(id, score) {
    if (S.games[id] === undefined || score > S.games[id]) S.games[id] = score;
    APP.save();
    APP.checkBadges();
  }

  // words she has met in lessons, or every word if she hasn't started yet
  function myWords() {
    var seen = APP.allWords.filter(function (v) { return S.srs[APP.wordKey(v)]; });
    return seen.length >= 12 ? seen : APP.allWords;
  }

  /* ---------- a run of rounds ---------- */

  function rounds(main, g, items, xpEach) {
    var i = 0, right = 0;
    var bar = el('div', 'pbar'), fill = el('span', 'pbar-fill');
    bar.appendChild(fill);
    main.appendChild(bar);
    var host = el('div', 'ex-host'), foot = el('div', 'ex-foot');
    main.appendChild(host); main.appendChild(foot);
    function next() {
      foot.replaceChildren();
      fill.style.width = (i / items.length * 100) + '%';
      if (i >= items.length) return end();
      var box = el('div', '');
      host.replaceChildren(box);
      APP.exercise(box, items[i], {
        onDone: function (ok) {
          i++;
          if (ok) { right++; APP.award(xpEach); }
          fill.style.width = (i / items.length * 100) + '%';
          var b = btn('big-btn', i < items.length ? 'Next' : 'See my score', next);
          foot.appendChild(b);
          setTimeout(function () { b.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); b.focus({ preventScroll: true }); }, 60);
        }
      });
    }
    function end() {
      record(g.id, right);
      if (right === items.length) APP.confetti();
      host.replaceChildren(scoreCard(right + ' / ' + items.length, right === items.length ? '¡Perfecto, ' + APP.profile.short + '!' : right >= items.length * 0.7 ? 'Really good!' : 'Keep playing, it gets easier.', '#/game/' + g.id));
    }
    next();
  }

  function scoreCard(score, msg, again) {
    var r = el('div', 'result');
    r.appendChild(el('p', 'result-score', score));
    r.appendChild(el('p', 'result-msg', msg));
    var row = el('div', 'row-btns center');
    var a = el('a', 'big-btn', 'Play again');
    a.href = again + '?' + Date.now();
    var b = el('a', 'ghost-btn', 'More games');
    b.href = '#/games';
    row.appendChild(a); row.appendChild(b);
    r.appendChild(row);
    return r;
  }

  /* ---------- Picture this: see the picture, pick the word ---------- */

  function picWords() { return APP.allWords.filter(function (v) { return APP.wordImg(v); }); }
  function pictures(main, g) {
    var all = picWords();
    var mine = all.filter(function (v) { return S.srs[APP.wordKey(v)]; });
    var pool = mine.length >= 10 ? mine : all;
    rounds(main, g, APP.pick(pool, 10).map(function (v) {
      var wrong = APP.pick(all.filter(function (o) { return o.w !== v.w; }), 3).map(function (o) { return o.w; });
      return { kind: 'choice', label: 'What’s in the picture?', image: APP.wordImg(v), q: '', right: v.w, wrong: wrong,
        why: v.w + ': ' + v.def + ' (🇨🇴 ' + v.es + ')' };
    }), 6);
  }

  function friendQ(f) {
    var others = APP.pick(G.falseFriends.filter(function (o) { return o.means !== f.means; }), 3).map(function (o) { return o.means; });
    return {
      kind: 'choice', label: 'Falso amigo: what does it really mean?',
      q: '“' + f.en + '” (it looks like “' + f.es + '”)', right: f.means, wrong: others,
      why: '“' + f.ex + '” If you mean “' + f.es + '”, say “' + f.instead + '”.'
    };
  }
  function friends(main, g) { rounds(main, g, APP.pick(G.falseFriends, 10).map(friendQ), 8); }

  function fixQ(m) {
    return { kind: 'tf', label: 'Is this sentence correct?', s: m.s, answer: m.ok, labels: ['Correct ✓', 'Wrong ✗'],
      why: (m.ok ? '' : 'Correct: “' + m.fix + '” ') + m.why };
  }
  function fixit(main, g) { rounds(main, g, APP.pick(G.mistakes, 12).map(fixQ), 6); }

  function idiomQ(m) {
    return { kind: 'choice', label: 'What does this idiom mean?', q: '“' + m.idiom + '”', right: m.meaning, wrong: m.wrong.slice(0, 3), why: '“' + m.ex + '”' };
  }
  function idioms(main, g) { rounds(main, g, APP.pick(G.idioms, 10).map(idiomQ), 8); }

  function phrasal(main, g) {
    var picked = APP.pick(G.phrasal, 15), boards = [];
    for (var i = 0; i < 3; i++) boards.push({ kind: 'match', label: 'Match each phrasal verb to its meaning (' + (i + 1) + '/3)', pairs: picked.slice(i * 5, i * 5 + 5).map(function (p) { return [p.pv, p.def]; }) });
    rounds(main, g, boards, 15);
  }

  function dictation(main, g) {
    var items = APP.pick(myWords().filter(function (v) { var n = v.ex.split(/\s+/).length; return n >= 5 && n <= 14; }), 8)
      .map(function (v) { return { kind: 'listen', say: v.ex, why: v.w + ': ' + v.def }; });
    rounds(main, g, items, 10);
  }

  /* ---------- Speed round: 60 seconds of quick questions ---------- */

  function speed(main, g) {
    var intro = el('section', 'empty');
    intro.appendChild(el('p', 'empty-i', '⏱️'));
    intro.appendChild(el('h2', '', '60 seconds'));
    intro.appendChild(el('p', 'muted', 'Words, false friends and mistakes, as fast as you can. Wrong answers cost 3 seconds. Your best: ' + (S.games.speed || 0)));
    intro.appendChild(btn('big-btn', '¡Dale! Start', go));
    main.appendChild(intro);

    function quick() {
      var r = Math.random(), words = myWords();
      if (r < 0.45 || !(G.falseFriends || []).length) {
        var v = APP.pick(words, 1)[0];
        var wrong = APP.pick(words.filter(function (o) { return o.w !== v.w; }), 2).map(function (o) { return o.w; });
        return Math.random() < 0.5
          ? { kind: 'choice', label: 'Which word?', q: v.def, right: v.w, wrong: wrong }
          : { kind: 'choice', label: 'In English?', q: v.es, right: v.w, wrong: wrong };
      }
      if (r < 0.7) { var f = friendQ(APP.pick(G.falseFriends, 1)[0]); f.wrong = f.wrong.slice(0, 2); delete f.why; return f; }
      var m = fixQ(APP.pick(G.mistakes, 1)[0]); delete m.why; return m;
    }

    function go() {
      main.replaceChildren();
      APP.backBar(main, '#/games', '⏱️ Speed round');
      var left = 60, score = 0, over = false;
      var top = el('div', 'speed-top');
      var clock = el('span', 'speed-clock', '60'), pts = el('span', 'speed-score', '0');
      top.appendChild(clock); top.appendChild(pts);
      main.appendChild(top);
      var host = el('div', 'ex-host');
      main.appendChild(host);
      var timer = setInterval(function () {
        if (!document.body.contains(host)) { clearInterval(timer); return; }
        left--;
        tick();
      }, 1000);
      function tick() {
        clock.textContent = Math.max(0, left);
        clock.classList.toggle('low', left <= 10);
        if (left <= 0 && !over) end();
      }
      function next() {
        if (over) return;
        var box = el('div', '');
        host.replaceChildren(box);
        APP.exercise(box, quick(), {
          onDone: function (ok) {
            if (ok) { score++; pts.textContent = score; } else { left -= 3; tick(); }
            setTimeout(next, ok ? 350 : 1100);
          }
        });
      }
      function end() {
        over = true;
        clearInterval(timer);
        var best = score > (S.games.speed || 0);
        record('speed', score);
        APP.award(score * 3);
        if (best && score > 0) APP.confetti();
        host.replaceChildren(scoreCard(score + ' correct', best && score > 0 ? 'New personal best! 🏆' : 'Your best is ' + S.games.speed + '.', '#/game/speed'));
      }
      next();
    }
  }

  /* ---------- Save the puppy: hangman with balloons ---------- */

  function rescue(main, g) {
    var pool = G.rescue;
    var item = APP.pick(pool, 1)[0], word = item.w, got = {}, misses = 0, MAX = 6, over = false;
    var scene = el('div', 'puppy-scene');
    var balloons = el('div', 'balloons');
    for (var i = 0; i < MAX; i++) balloons.appendChild(el('span', 'balloon b' + i, '🎈'));
    var pup = el('div', 'puppy', '🐶');
    scene.appendChild(balloons); scene.appendChild(el('div', 'strings')); scene.appendChild(pup);
    main.appendChild(scene);
    main.appendChild(el('p', 'rescue-clue', '💡 ' + item.clue));
    var slots = el('div', 'slots');
    main.appendChild(slots);
    var msg = el('p', 'rescue-msg', 'Guess a letter. Every wrong letter pops a balloon!');
    main.appendChild(msg);
    var kb = el('div', 'keyboard');
    'qwertyuiop asdfghjkl zxcvbnm'.split(' ').forEach(function (row) {
      var r = el('div', 'kb-row');
      row.split('').forEach(function (ch) {
        var k = btn('key', ch, function () { guess(ch, k); });
        k.setAttribute('data-ch', ch);
        r.appendChild(k);
      });
      kb.appendChild(r);
    });
    main.appendChild(kb);
    draw();

    function draw() {
      slots.replaceChildren();
      word.split('').forEach(function (ch) { slots.appendChild(el('span', 'slot' + (got[ch] ? ' on' : ''), got[ch] || over ? ch : '')); });
    }
    function guess(ch, k) {
      if (over || k.disabled) return;
      k.disabled = true;
      if (word.indexOf(ch) >= 0) {
        got[ch] = true; k.classList.add('hit'); APP.sound('tap');
        if (word.split('').every(function (c) { return got[c]; })) win();
      } else {
        k.classList.add('miss'); APP.sound('wrong');
        balloons.children[misses].classList.add('pop');
        misses++;
        scene.style.setProperty('--drop', misses);
        if (misses >= MAX) lose();
      }
      draw();
    }
    function win() {
      over = true;
      S.games.rescueWins = (S.games.rescueWins || 0) + 1;
      record('rescue', S.games.rescueWins);
      pup.textContent = '🐶💖';
      scene.classList.add('saved');
      msg.textContent = '¡Lo salvaste! You saved the puppy. “' + word + '”';
      APP.award(12 + (MAX - misses) * 2);
      APP.confetti();
      after();
    }
    function lose() {
      over = true;
      record('rescue', S.games.rescueWins || 0);
      scene.classList.add('splash');
      pup.textContent = '🐶💦';
      msg.textContent = 'Splash! The puppy landed in a puddle (he’s fine, just wet). The word was “' + word + '”.';
      after();
    }
    function after() {
      draw();
      var row = el('div', 'row-btns center');
      row.appendChild(APP.speakBtn(word, 'Hear it'));
      var a = el('a', 'big-btn', 'Next puppy');
      a.href = '#/game/rescue?' + Date.now();
      row.appendChild(a);
      main.appendChild(row);
    }
    document.onkeydown = function (e) {
      if (!document.body.contains(kb)) { document.onkeydown = null; return; }
      var k = kb.querySelector('[data-ch="' + e.key.toLowerCase() + '"]');
      if (k) k.click();
    };
  }

  /* ---------- Ship or sheep: minimal pairs ---------- */

  function sounds(main, g) {
    if (!APP.canSpeak) { main.appendChild(APP.empty('🔇', 'No voice on this device', 'This game needs the phone to speak. Try another game.', '#/games', 'More games')); return; }
    var items = APP.pick(G.pairs, 10), i = 0, right = 0;
    var bar = el('div', 'pbar'), fill = el('span', 'pbar-fill');
    bar.appendChild(fill); main.appendChild(bar);
    var host = el('div', 'ex-host'), foot = el('div', 'ex-foot');
    main.appendChild(host); main.appendChild(foot);
    function next() {
      foot.replaceChildren();
      fill.style.width = (i / items.length * 100) + '%';
      if (i >= items.length) {
        record('sounds', right);
        host.replaceChildren(scoreCard(right + ' / ' + items.length, right >= 8 ? 'Great ear! 👂' : 'These are hard for everyone. Play again!', '#/game/sounds'));
        return;
      }
      var p = items[i], target = Math.random() < 0.5 ? p.a : p.b, done = false;
      var box = el('div', 'ex');
      box.appendChild(el('p', 'ex-kind', 'Which word do you hear?'));
      var play = btn('say say-big', '', function () { APP.speak(target); });
      play.innerHTML = '🔊 <span>Play again</span>';
      box.appendChild(play);
      var opts = el('div', 'opts two');
      [p.a, p.b].forEach(function (w) {
        var b = btn('opt', w, function () {
          if (done) return;
          done = true;
          var ok = w === target;
          opts.querySelectorAll('.opt').forEach(function (o) { o.disabled = true; if (o.textContent === target) o.classList.add('right'); });
          if (!ok) b.classList.add('wrong');
          box.classList.add(ok ? 'is-right' : 'is-wrong');
          APP.sound(ok ? 'right' : 'wrong');
          if (ok) { right++; APP.award(6); }
          var aft = el('div', 'ex-after');
          aft.appendChild(el('p', 'ex-verdict', ok ? 'Yes! “' + target + '”' : 'It was “' + target + '”.'));
          aft.appendChild(el('p', 'ex-why', p.sound + '. Listen to both:'));
          var row = el('div', 'row-btns');
          row.appendChild(APP.speakBtn(p.a, p.a)); row.appendChild(APP.speakBtn(p.b, p.b));
          aft.appendChild(row);
          box.appendChild(aft);
          i++;
          foot.appendChild(btn('big-btn', 'Next', next));
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
      host.replaceChildren(box);
      setTimeout(function () { APP.speak(target); }, 300);
    }
    next();
  }

  /* ---------- Memory: flip cards to pair English with Spanish ---------- */

  function memory(main, g) {
    var words = APP.pick(myWords().filter(function (v) { return v.w.length <= 18 && v.es.length <= 22; }), 6);
    var cards = [];
    words.forEach(function (v, i) { cards.push({ t: v.w, id: i, en: true }); cards.push({ t: v.es, id: i, en: false }); });
    cards = APP.shuffle(cards);
    var grid = el('div', 'memory'), open = [], found = 0, moves = 0, lock = false;
    var info = el('p', 'muted center', 'Find each English word and its Spanish partner.');
    main.appendChild(info);
    cards.forEach(function (c) {
      c.b = btn('mem', '');
      c.b.appendChild(el('span', 'mem-back', '🌺'));
      c.b.appendChild(el('span', 'mem-face' + (c.en ? '' : ' es'), c.t));
      c.b.addEventListener('click', function () {
        if (lock || c.done || open.indexOf(c) >= 0) return;
        c.b.classList.add('up');
        if (c.en) APP.speak(c.t);
        open.push(c);
        if (open.length < 2) return;
        moves++;
        var a = open[0], b = open[1];
        if (a.id === b.id) {
          a.done = b.done = true;
          a.b.classList.add('done'); b.b.classList.add('done');
          open = [];
          APP.sound('right');
          if (++found === words.length) {
            var score = Math.max(1, 20 - moves);
            record('memory', score);
            APP.award(20);
            APP.confetti();
            main.appendChild(scoreCard(moves + ' moves', moves <= 9 ? 'Incredible memory!' : 'All pairs found!', '#/game/memory'));
          }
        } else {
          lock = true;
          setTimeout(function () { a.b.classList.remove('up'); b.b.classList.remove('up'); open = []; lock = false; }, 900);
        }
      });
      grid.appendChild(c.b);
    });
    main.appendChild(grid);
  }
})();
