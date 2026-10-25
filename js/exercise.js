// Draws one exercise of any kind (choice, gap, tf, type, order, match, listen) and
// reports back once it's answered. Used by the lesson player and by the games.
//
// APP.exercise(host, x, { onDone(correct) }) -> { done() }
(function () {
  var APP = window.APP, el = APP.el;

  APP.exercise = function (host, x, opts) {
    opts = opts || {};
    var finished = false;
    host.replaceChildren();
    host.className = 'ex ex-' + x.kind;

    var label = { choice: 'Choose the answer', gap: 'Fill the gap', tf: 'True or false?', type: 'Write the missing words',
      order: 'Build the sentence', match: 'Match the pairs', listen: 'Listen and write what you hear' }[x.kind];
    host.appendChild(el('p', 'ex-kind', x.label || label));
    if (x.image) host.appendChild(APP.img(x.image, 'ex-img', ''));

    var prompt = el('p', 'ex-q');
    var blank = null;
    if (x.kind === 'gap' || x.kind === 'type') {
      var parts = x.text.split('{gap}');
      prompt.appendChild(document.createTextNode(parts[0]));
      if (x.kind === 'gap') { blank = el('span', 'blank', ' '); prompt.appendChild(blank); }
      else { blank = el('input', 'blank-input'); blank.type = 'text'; blank.autocomplete = 'off'; blank.autocapitalize = 'off'; blank.spellcheck = false; blank.setAttribute('aria-label', 'Your answer'); prompt.appendChild(blank); }
      prompt.appendChild(document.createTextNode(parts[1] || ''));
    } else if (x.kind === 'tf') prompt.textContent = x.s;
    else if (x.q) prompt.textContent = x.q;
    if (prompt.childNodes.length) host.appendChild(prompt);

    var body = el('div', 'ex-body');
    host.appendChild(body);
    var after = el('div', 'ex-after');
    after.setAttribute('aria-live', 'polite');
    host.appendChild(after);

    function finish(correct, answer) {
      if (finished) return;
      finished = true;
      host.classList.add(correct ? 'is-right' : 'is-wrong');
      APP.sound(correct ? 'right' : 'wrong');
      if (!correct) APP.buzz(120);
      var v = el('p', 'ex-verdict', correct ? APP.pick(PRAISE, 1)[0] : APP.pick(OOPS, 1)[0]);
      after.appendChild(v);
      if (!correct && answer) after.appendChild(el('p', 'ex-answer', answer));
      if (x.why) after.appendChild(el('p', 'ex-why', x.why));
      if (opts.onDone) opts.onDone(correct);
    }

    /* choice, gap, tf: a column of buttons */
    if (x.kind === 'choice' || x.kind === 'gap' || x.kind === 'tf') {
      var options = x.kind === 'tf'
        ? [{ t: (x.labels || ['True', 'False'])[0], ok: x.answer === true }, { t: (x.labels || ['True', 'False'])[1], ok: x.answer === false }]
        : APP.shuffle([{ t: x.right, ok: true }].concat(x.wrong.map(function (w) { return { t: w, ok: false }; })));
      body.classList.add('opts'); if (x.kind === 'tf') body.classList.add('two');
      options.forEach(function (o, i) {
        o.b = APP.btn('opt', o.t, function () {
          if (finished) return;
          options.forEach(function (p) { p.b.disabled = true; if (p.ok) p.b.classList.add('right'); });
          if (!o.ok) o.b.classList.add('wrong');
          if (blank) { blank.textContent = x.right; blank.classList.add('filled'); }
          finish(o.ok, x.kind === 'tf' ? '' : 'Answer: ' + x.right);
        });
        o.b.setAttribute('data-key', String(i + 1));
        body.appendChild(o.b);
      });
    }

    /* type: one input inside the sentence */
    if (x.kind === 'type') {
      var go = APP.btn('big-btn', 'Check', check);
      body.appendChild(go);
      blank.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
      setTimeout(function () { if (!opts.noFocus) blank.focus({ preventScroll: true }); }, 50);
      function check() {
        if (finished) return;
        if (!blank.value.trim()) { blank.focus(); return; }
        var ok = x.answers.some(function (a) { return APP.same(a, blank.value); });
        blank.disabled = true; go.disabled = true;
        blank.classList.add(ok ? 'right' : 'wrong');
        finish(ok, 'Answer: ' + x.answers[0]);
      }
    }

    /* listen: hear a sentence, type it */
    if (x.kind === 'listen') {
      var row = el('div', 'listen-row');
      var play = APP.speakBtn(x.say, 'Play');
      play.classList.add('say-big');
      var slow = APP.btn('ghost-btn', '🐢 Slowly', function () { APP.speak(x.say, { slow: true }); });
      row.appendChild(play); row.appendChild(slow);
      body.appendChild(row);
      var ta = el('textarea', 'listen-input');
      ta.rows = 2; ta.placeholder = 'Type what you hear…'; ta.autocapitalize = 'sentences'; ta.spellcheck = false;
      body.appendChild(ta);
      var go2 = APP.btn('big-btn', 'Check', function () {
        if (finished) return;
        if (!ta.value.trim()) { ta.focus(); return; }
        var want = APP.norm(x.say, true).split(' '), got = APP.norm(ta.value, true).split(' ');
        var diff = el('p', 'diff');
        var misses = 0;
        want.forEach(function (w, i) {
          var hit = got[i] === w || got.indexOf(w) >= 0;
          if (!hit) misses++;
          diff.appendChild(el('span', hit ? 'w-ok' : 'w-miss', w));
          diff.appendChild(document.createTextNode(' '));
        });
        misses += Math.max(0, got.length - want.length);
        ta.disabled = true; go2.disabled = true;
        // one small slip on a long sentence still counts
        var ok = misses === 0 || (misses === 1 && want.length >= 8);
        finish(ok, '');
        after.insertBefore(el('p', 'ex-answer', x.say), after.children[1] || null);
        if (misses) after.insertBefore(diff, after.children[2] || null);
      });
      if (!APP.canSpeak) {
        body.replaceChildren(el('p', 'muted', 'This device can’t read aloud, so here’s the sentence: “' + x.say + '”. Copy it out to practise spelling.'));
        body.appendChild(ta);
      }
      body.appendChild(go2);
      setTimeout(function () { if (!opts.noAutoplay) APP.speak(x.say); }, 350);
    }

    /* order: tap tiles to build the sentence */
    if (x.kind === 'order') {
      var line = el('div', 'tiles-line'), pool = el('div', 'tiles-pool');
      var tiles = APP.shuffle(x.words.map(function (w, i) { return { w: w, i: i }; }));
      if (tiles.every(function (t, i) { return t.i === i; })) tiles.push(tiles.shift());
      var chosen = [];
      tiles.forEach(function (t) {
        t.b = APP.btn('tile', t.w, function () {
          if (finished) return;
          APP.sound('tap');
          var at = chosen.indexOf(t);
          if (at >= 0) { chosen.splice(at, 1); pool.appendChild(t.b); }
          else { chosen.push(t); line.appendChild(t.b); }
          go3.disabled = chosen.length !== tiles.length;
        });
        pool.appendChild(t.b);
      });
      body.appendChild(line); body.appendChild(pool);
      var go3 = APP.btn('big-btn', 'Check', function () {
        if (finished) return;
        var said = chosen.map(function (t) { return t.w; }).join(' ');
        var ok = APP.norm(said) === APP.norm(x.words.join(' '));
        tiles.forEach(function (t) { t.b.disabled = true; });
        line.classList.add(ok ? 'right' : 'wrong');
        finish(ok, 'Answer: ' + x.words.join(' '));
      });
      go3.disabled = true;
      body.appendChild(go3);
    }

    /* match: tap one on the left, then its partner on the right */
    if (x.kind === 'match') {
      var cols = el('div', 'match'), L = el('div', 'match-col'), R = el('div', 'match-col');
      cols.appendChild(L); cols.appendChild(R); body.appendChild(cols);
      var left = APP.shuffle(x.pairs.map(function (p, i) { return { t: p[0], i: i }; }));
      var right = APP.shuffle(x.pairs.map(function (p, i) { return { t: p[1], i: i }; }));
      var sel = null, misses = 0, matched = 0;
      function tap(item, side) {
        if (finished || item.done) return;
        if (!sel || sel.side === side) {
          if (sel) sel.item.b.classList.remove('sel');
          sel = { item: item, side: side };
          item.b.classList.add('sel');
          if (side === 'L' && /^[a-z]/i.test(item.t) && item.t.length < 40) APP.speak(item.t);
          return;
        }
        var a = sel.item;
        a.b.classList.remove('sel');
        sel = null;
        if (a.i === item.i) {
          a.done = item.done = true;
          a.b.classList.add('done'); item.b.classList.add('done');
          a.b.disabled = item.b.disabled = true;
          APP.sound('tap');
          if (++matched === x.pairs.length) finish(misses <= 1, misses ? misses + ' mistake' + (misses > 1 ? 's' : '') + ' on the way.' : '');
        } else {
          misses++;
          APP.sound('wrong');
          [a.b, item.b].forEach(function (b) { b.classList.add('nope'); setTimeout(function () { b.classList.remove('nope'); }, 450); });
        }
      }
      left.forEach(function (it) { it.b = APP.btn('mt', it.t, function () { tap(it, 'L'); }); L.appendChild(it.b); });
      right.forEach(function (it) { it.b = APP.btn('mt', it.t, function () { tap(it, 'R'); }); R.appendChild(it.b); });
    }

    return { done: function () { return finished; } };
  };

  var PRAISE = ['¡Eso! That’s right.', 'Perfect!', 'Nailed it.', 'Exactly right.', '¡Qué nivel! Correct.', 'Spot on.', 'Brilliant!'];
  var OOPS = ['Not quite.', 'Almost!', 'Close, but no.', 'Ay, not this time.'];

  // Keyboard: 1-4 choose an option, Enter presses the main button.
  document.addEventListener('keydown', function (e) {
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 4) {
      var b = document.querySelector('.ex:not(.is-right):not(.is-wrong) .opt[data-key="' + n + '"]');
      if (b) b.click();
    }
  });
})();
