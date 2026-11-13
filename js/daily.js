// Today's 3 words (APP.dailyWords, js/daily-pick.js): the card on the home page, the page
// at #/daily where she learns them (meaning, pronunciation, saying them out loud), and a
// 10-question quiz on them. The first quiz of the day counts for Review. The same 3 words
// come in the notifications at 9:00, 14:00 and 19:00 (api/nudge.mjs, Me → 3 words a day).
//
// Also APP.pronBox(v): a word's pronunciation (IPA, an easy respelling, slow playback and
// a 🎙️ "say it" check), used here, on the word list and on the reminder page.
(function () {
  var APP = window.APP, el = APP.el, btn = APP.btn, S = APP.state;

  function todayRec() { var d = S.daily; return d && d.date === APP.today() ? d : null; }

  /* ---------- pronunciation ---------- */

  APP.pronBox = function (v) {
    var box = el('div', 'pron');
    box.addEventListener('click', function (e) { e.stopPropagation(); });
    if (v.ipa) box.appendChild(el('span', 'pron-ipa', v.ipa));
    if (v.pron) box.appendChild(el('span', 'pron-say', 'say: ' + v.pron));
    if (APP.canSpeak) box.appendChild(btn('pron-btn', '🐢 Slowly', function () { APP.speak(v.w, { slow: true }); }));
    if (APP.canListen) {
      var said = el('span', 'pron-heard');
      var mic = btn('pron-btn', '🎙️ Say it', function () {
        if (listening) { listening.stop(); return; }
        mic.textContent = '● Listening…'; mic.classList.add('on'); said.textContent = '';
        var want = APP.norm(v.w), got = '', timer = null;
        var listening_ = listening = APP.listen({
          onText: function (t) { got = t; if (hit(t)) listening_.stop(); },
          onEnd: function (t) {
            clearTimeout(timer); listening = null;
            mic.textContent = '🎙️ Say it'; mic.classList.remove('on');
            t = t || got;
            if (!t) { said.textContent = 'I didn’t hear anything. Try again, a little louder.'; said.className = 'pron-heard'; return; }
            var ok = hit(t);
            said.className = 'pron-heard ' + (ok ? 'ok' : 'no');
            said.textContent = ok ? '✓ Perfect! I heard “' + v.w + '”.' : 'I heard “' + t + '”. Tap 🐢, listen, and try again.';
            APP.sound(ok ? 'right' : 'tap');
            if (ok && !(S.saidWords || {})[APP.wordKey(v)]) { (S.saidWords = S.saidWords || {})[APP.wordKey(v)] = 1; APP.award(2, 'pronunciation'); }
          }
        });
        timer = setTimeout(function () { if (listening_ === listening) listening_.stop(); }, 5000);
        function hit(t) { var n = APP.norm(t); return n === want || (' ' + n + ' ').indexOf(' ' + want + ' ') >= 0; }
      });
      var listening = null;
      box.appendChild(mic);
      box.appendChild(said);
    }
    return box;
  };

  /* ---------- the card on the home page ---------- */

  APP.dailyCard = function () {
    var words = APP.dailyWords(), rec = todayRec();
    var card = el('section', 'wotd daily-card');
    if (!words.length) return card;
    var head = el('div', 'wotd-head');
    head.appendChild(el('span', 'wotd-label', 'Today’s 3 words'));
    if (rec) head.appendChild(el('span', 'daily-done', '✓ ' + rec.best + '/10'));
    card.appendChild(head);
    var list = el('ul', 'daily-list');
    words.forEach(function (v) {
      var li = el('li', '');
      var t = el('span', 'daily-w');
      t.appendChild(el('span', 'daily-word', v.w));
      t.appendChild(el('span', 'daily-meta', (v.ipa ? v.ipa + ' · ' : '') + v.es.split(' / ')[0]));
      li.appendChild(t);
      li.appendChild(APP.speakBtn(v.w));
      list.appendChild(li);
    });
    card.appendChild(list);
    var go = el('a', rec ? 'ghost-btn small' : 'big-btn', rec ? 'See them again or redo the quiz' : '🎯 Learn them + 10-question quiz');
    go.href = '#/daily';
    card.appendChild(go);
    return card;
  };

  /* ---------- #/daily: learn the 3 words, then the quiz ---------- */

  APP.route('daily', function (main, args) {
    var words = APP.dailyWords();
    APP.backBar(main, '#/', '');
    if (!words.length) { APP.go('#/'); return; }
    if (args[0] === 'quiz') return quiz(main, words);

    var rec = todayRec();
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', 'Today’s 3 words'));
    head.appendChild(el('p', 'muted', 'Listen to each one, say it out loud, and read the example. Then a 10-question quiz to make them stick. They’ll come back in Review in a day or two.'));
    main.appendChild(head);

    var grid = el('div', 'vocab daily-cards');
    words.forEach(function (v, i) {
      var c = el('article', 'vcard show-es');
      var top = el('div', 'vcard-top');
      top.appendChild(el('span', 'vcard-w', (i + 1) + '. ' + v.w));
      top.appendChild(APP.speakBtn(v.w));
      c.appendChild(top);
      var pic = APP.wordImg(v);
      if (pic) c.appendChild(APP.img(pic, 'nudge-pic', v.w));
      if (v.pos) c.appendChild(el('span', 'pos', v.pos));
      c.appendChild(APP.pronBox(v));
      c.appendChild(el('p', 'vcard-def', v.def));
      var ex = el('p', 'vcard-ex');
      ex.appendChild(document.createTextNode(v.ex + ' '));
      ex.appendChild(APP.speakBtn(v.ex));
      c.appendChild(ex);
      if (v.note) c.appendChild(el('p', 'vcard-note', '💡 ' + v.note));
      c.appendChild(el('p', 'vcard-es', '🇨🇴 ' + v.es));
      grid.appendChild(c);
    });
    main.appendChild(grid);

    var go = el('a', 'big-btn', rec ? '🎯 Do the quiz again (best: ' + rec.best + '/10)' : '🎯 Start the quiz · 10 questions');
    go.href = '#/daily/quiz';
    main.appendChild(go);

    // yesterday's words, for a quick look back
    var yd = APP.today(new Date(Date.now() - 864e5));
    var y = window.DAILY_PICK && APP.dayNumber(yd) >= APP.dayNumber(window.DAILY_PICK.START) ? APP.dailyWords(yd) : [];
    if (y.length) {
      var back = el('section', 'card daily-yesterday');
      back.appendChild(el('h2', '', 'Yesterday’s words'));
      y.forEach(function (v) {
        var p = el('p', 'daily-yrow');
        p.appendChild(el('strong', '', v.w));
        p.appendChild(document.createTextNode(' = ' + v.es + ' '));
        p.appendChild(APP.speakBtn(v.w));
        back.appendChild(p);
      });
      main.appendChild(back);
    }
  });

  /* ---------- the quiz ---------- */

  // the word as it appears in its example sentence ("rummage" → "rummaged"), or null
  function inExample(v) {
    var low = v.ex.toLowerCase(), at = -1, w = v.w.toLowerCase();
    var re = new RegExp('(^|[^a-z])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    var m = re.exec(low);
    if (!m) return null;
    at = m.index + m[1].length;
    var end = at + w.length;
    while (end < v.ex.length && /[a-z]/i.test(v.ex.charAt(end))) end++;
    return { at: at, text: v.ex.slice(at, end) };
  }
  function others(words, v, n, same) {
    var pool = APP.allWords.filter(function (o) { return words.indexOf(o) < 0 && o.w !== v.w && (!same || o.pos === v.pos); });
    if (pool.length < n) pool = APP.allWords.filter(function (o) { return words.indexOf(o) < 0 && o.w !== v.w; });
    return APP.pick(pool, n);
  }
  function why(v) { return v.w + (v.ipa ? ' ' + v.ipa : '') + ': ' + v.def + ' 🇨🇴 ' + v.es; }

  function questions(words) {
    var meaning = [], spanish = [], gaps = [];
    words.forEach(function (v) {
      var rest = words.filter(function (o) { return o !== v; });
      meaning.push({ v: v, x: { kind: 'choice', label: 'What does it mean?', q: '“' + v.w + '”', right: v.def,
        wrong: rest.map(function (o) { return o.def; }).concat(others(words, v, 1, true).map(function (o) { return o.def; })), why: why(v) } });
      spanish.push({ v: v, x: { kind: 'choice', label: 'How do you say it in English?', q: '🇨🇴 ' + v.es, right: v.w, sayOpts: true,
        wrong: rest.map(function (o) { return o.w; }).concat(others(words, v, 1, true).map(function (o) { return o.w; })), why: why(v) } });
      var g = inExample(v);
      if (g) {
        var cap = g.at === 0;
        var fix = function (s) { return cap ? s.charAt(0).toUpperCase() + s.slice(1) : s; };
        gaps.push({ v: v, x: { kind: 'gap', label: 'Which word fills the gap?', text: v.ex.slice(0, g.at) + '{gap}' + v.ex.slice(g.at + g.text.length), right: g.text,
          wrong: rest.map(function (o) { var h = inExample(o); return fix(h ? h.text.toLowerCase() : o.w); }).concat(others(words, v, 1, true).map(function (o) { return fix(o.w); }))
            .filter(function (w, i, a) { return w.toLowerCase() !== g.text.toLowerCase() && a.indexOf(w) === i; }), why: '“' + v.ex + '”' } });
      } else {
        gaps.push({ v: v, hear: true, x: { kind: 'choice', label: '🔊 Listen. Which word is it?', q: '', right: v.w, sayOpts: true,
          wrong: rest.map(function (o) { return o.w; }).concat(others(words, v, 1).map(function (o) { return o.w; })), why: why(v) } });
      }
    });
    var s = APP.pick(words, 1)[0];
    var spell = { v: s, hear: true, x: { kind: 'type', label: '🔊 Listen and spell it', text: s.def + ': {gap}', answers: [s.w], why: why(s) } };
    return APP.shuffle(meaning).concat(APP.shuffle(spanish), APP.shuffle(gaps), [spell]);
  }

  function quiz(main, words) {
    var qs = questions(words), i = 0, right = 0, missed = {};
    var first = !todayRec();
    main.appendChild(el('p', 'muted', '🎯 Today’s words: ' + words.map(function (v) { return v.w; }).join(', ')));
    var bar = el('div', 'pbar'), fill = el('span', 'pbar-fill');
    bar.appendChild(fill);
    main.appendChild(bar);
    var host = el('div', 'ex-host'), foot = el('div', 'ex-foot');
    main.appendChild(host); main.appendChild(foot);

    function next() {
      foot.replaceChildren();
      fill.style.width = (i / qs.length * 100) + '%';
      if (i >= qs.length) return end();
      var q = qs[i];
      host.replaceChildren();
      if (q.hear) {
        var play = APP.speakBtn(q.v.w, 'Play');
        play.classList.add('say-big');
        var row = el('div', 'listen-row');
        row.appendChild(play);
        row.appendChild(btn('ghost-btn', '🐢 Slowly', function () { APP.speak(q.v.w, { slow: true }); }));
        host.appendChild(row);
        setTimeout(function () { APP.speak(q.v.w); }, 350);
      }
      var box = el('div', '');
      host.appendChild(box);
      APP.exercise(box, q.x, {
        noAutoplay: true,
        onDone: function (ok) {
          i++;
          if (ok) { right++; APP.award(5); } else missed[APP.wordKey(q.v)] = (missed[APP.wordKey(q.v)] || 0) + 1;
          fill.style.width = (i / qs.length * 100) + '%';
          var b = btn('big-btn', i < qs.length ? 'Next' : 'See my score', next);
          foot.appendChild(b);
          setTimeout(function () { b.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); b.focus({ preventScroll: true }); }, 60);
        }
      });
    }

    function end() {
      var rec = todayRec();
      S.daily = { date: APP.today(), score: right, best: Math.max(right, rec ? rec.best : 0) };
      S.dailyDone = (S.dailyDone || 0) + (first ? 1 : 0);
      // the first quiz of the day counts for Review: all right = Good, any slip = Again
      if (first) {
        words.forEach(function (v) {
          var r = S.srs[APP.wordKey(v)];
          if (!r || !r.box || APP.dayNumber(r.due) <= APP.dayNumber(APP.today())) APP.srsGrade(v, missed[APP.wordKey(v)] ? 0 : 2);
        });
        APP.award(10, 'daily quiz');
      }
      APP.save();
      if (right === qs.length) APP.confetti();
      var r = el('div', 'result');
      r.appendChild(el('p', 'result-score', right + ' / ' + qs.length));
      r.appendChild(el('p', 'result-msg', right === qs.length ? '¡Perfecto, ' + APP.profile.short + '! All 3 words are yours.' : right >= 7 ? 'Really good! The ones you missed will come back in Review tomorrow.' : 'Good start. You’ll see them again in Review tomorrow.'));
      var tricky = words.filter(function (v) { return missed[APP.wordKey(v)]; });
      if (tricky.length) {
        var t = el('div', 'daily-tricky');
        tricky.forEach(function (v) {
          var p = el('p', '');
          p.appendChild(el('strong', '', v.w));
          p.appendChild(document.createTextNode(' ' + (v.ipa || '') + ' = ' + v.es + ' '));
          p.appendChild(APP.speakBtn(v.w));
          t.appendChild(p);
        });
        r.appendChild(t);
      }
      var row = el('div', 'row-btns center');
      var a = el('a', 'big-btn', 'Try again');
      a.href = '#/daily/quiz?' + Date.now();
      var b = el('a', 'ghost-btn', '🃏 Review');
      b.href = '#/review';
      var c = el('a', 'ghost-btn', 'Home');
      c.href = '#/';
      row.appendChild(a); row.appendChild(b); row.appendChild(c);
      r.appendChild(row);
      host.replaceChildren(r);
      APP.checkBadges();
    }
    next();
  }
})();
