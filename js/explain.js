// Explanations (data/explain.js): "why does English do that?" answers. #/explain lists
// the questions; #/explain/<id> shows one with examples, a tip and a quick check.
(function () {
  var APP = window.APP, el = APP.el, btn = APP.btn, S = APP.state;
  var LIST = window.EXPLAIN || [];

  APP.route('explain', function (main, args) {
    if (!LIST.length) { APP.go('#/'); return; }
    if (args[0]) return one(main, LIST.filter(function (x) { return x.id === args[0]; })[0]);
    APP.backBar(main, '#/', '');
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', 'Explanations'));
    head.appendChild(el('p', 'muted', 'The “but why?” questions about English, answered simply, with what’s different from Spanish.'));
    main.appendChild(head);
    var read = S.explained = S.explained || {};
    var list = el('div', 'explain-list');
    LIST.forEach(function (x) {
      var a = el('a', 'qtile everyday-link explain-link');
      a.href = '#/explain/' + x.id;
      a.appendChild(el('span', 'qtile-i', x.emoji));
      var t = el('span', 'everyday-link-text');
      t.appendChild(el('span', 'qtile-t', x.q));
      a.appendChild(t);
      a.appendChild(el('span', 'everyday-link-go', read[x.id] ? '✓' : '›'));
      list.appendChild(a);
    });
    main.appendChild(list);
  });

  function one(main, x) {
    if (!x) { APP.go('#/explain'); return; }
    APP.backBar(main, '#/explain', 'Explanations');
    var head = el('section', 'page-head');
    head.appendChild(el('h1', 'explain-q', x.emoji + ' ' + x.q));
    main.appendChild(head);

    var short = el('section', 'card explain-short');
    short.appendChild(el('p', 'explain-label', 'In short'));
    short.appendChild(el('p', '', x.short));
    main.appendChild(short);

    x.parts.forEach(function (p) {
      var c = el('section', 'explain-part');
      c.appendChild(el('h2', '', p.h));
      c.appendChild(el('p', '', p.t));
      main.appendChild(c);
    });

    main.appendChild(el('h2', 'song-sub', '✓ ✗ Examples'));
    var exs = el('div', 'explain-examples');
    x.examples.forEach(function (e) {
      var r = el('div', 'explain-ex ' + (e.ok ? 'is-ok' : 'is-bad'));
      r.appendChild(el('span', 'explain-mark', e.ok ? '✓' : '✗'));
      var t = el('div', 'explain-ex-t');
      t.appendChild(el('p', 'explain-en', e.en));
      if (e.note) t.appendChild(el('p', 'explain-note', e.note));
      r.appendChild(t);
      if (e.ok) r.appendChild(APP.speakBtn(e.en));
      exs.appendChild(r);
    });
    main.appendChild(exs);

    var tip = el('section', 'card explain-tip');
    tip.appendChild(el('p', 'explain-label', '🇨🇴 Tip for Spanish speakers'));
    tip.appendChild(el('p', '', x.tip));
    main.appendChild(tip);

    if (x.check && x.check.length) {
      main.appendChild(el('h2', 'song-sub', '🎯 Check yourself'));
      var done = 0, right = 0;
      x.check.forEach(function (c) {
        var box = el('section', 'card explain-check');
        var parts = c.q.split('{gap}');
        var q = el('p', 'explain-check-q');
        q.appendChild(document.createTextNode(parts[0]));
        var gap = el('span', 'explain-gap', '____');
        q.appendChild(gap);
        q.appendChild(document.createTextNode(parts[1] || ''));
        box.appendChild(q);
        var opts = el('div', 'opts two');
        APP.shuffle([c.right].concat(c.wrong)).forEach(function (o) {
          var b = btn('opt', o, function () {
            var ok = o === c.right;
            opts.querySelectorAll('.opt').forEach(function (n) {
              n.disabled = true; n.classList.add('done');
              if (n.textContent === c.right) n.classList.add('right');
            });
            if (!ok) b.classList.add('wrong');
            gap.textContent = c.right; gap.classList.add('filled');
            done++; if (ok) right++;
            if (done === x.check.length) finish();
          });
          opts.appendChild(b);
        });
        box.appendChild(opts);
        main.appendChild(box);
      });
      function finish() {
        var first = !(S.explained = S.explained || {})[x.id];
        S.explained[x.id] = 1;
        APP.save();
        if (first) APP.award(5, 'explain');
        APP.toast(right === x.check.length ? '🎉 All right! You’ve got it.' : '👍 ' + right + ' of ' + x.check.length + '. Read the examples again.');
      }
    }

    var i = LIST.indexOf(x), next = LIST[(i + 1) % LIST.length];
    if (next !== x) {
      var a = el('a', 'big-btn', 'Next: ' + next.q);
      a.href = '#/explain/' + next.id;
      main.appendChild(a);
    }
  }
})();
