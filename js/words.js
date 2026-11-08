// The B2 word list (data/wordlist.js) at #/words/<group>: browse, hear, see the Spanish,
// and add words to Review. Each group has a quiz at #/game/words/<group> (js/games.js).
(function () {
  var APP = window.APP, el = APP.el, btn = APP.btn, S = APP.state;
  var GROUPS = window.WORDLIST || [];

  APP.route('words', function (main, args) {
    if (!GROUPS.length) { APP.go('#/'); return; }
    var grp = GROUPS.filter(function (x) { return x.id === args[0]; })[0] || GROUPS[0];
    var mine = APP.listWords.filter(function (v) { return v.group === grp.id; });

    APP.backBar(main, '#/', '');
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', 'B2 word list'));
    head.appendChild(el('p', 'muted', 'Words and phrases that take you from B1 to B2. Tap 🔊 to hear one, tap a card to see the Spanish, and add the ones you want to remember to Review.'));
    main.appendChild(head);

    var tabs = el('nav', 'steps');
    tabs.setAttribute('aria-label', 'Groups');
    GROUPS.forEach(function (x) {
      var a = el('a', 'step' + (x.id === grp.id ? ' on' : ''));
      a.href = '#/words/' + x.id;
      a.appendChild(el('span', 'step-i', x.icon));
      a.appendChild(el('span', 'step-l', x.short + ' · ' + x.items.length));
      tabs.appendChild(a);
    });
    main.appendChild(tabs);

    main.appendChild(el('h2', 'everyday-title', grp.title));
    main.appendChild(el('p', 'step-lead', grp.intro));

    var marks = []; // each card's "In Review" button refresher
    var bar = el('div', 'row-btns words-bar');
    var quiz = el('a', 'big-btn', '🎯 Practise ' + grp.short.toLowerCase());
    quiz.href = '#/game/words/' + grp.id;
    bar.appendChild(quiz);
    var addAll = btn('ghost-btn', '', function () {
      var n = 0;
      mine.forEach(function (v) { if (!S.srs[APP.wordKey(v)]) { APP.srsAdd(v); n++; } });
      APP.save();
      APP.toast(n ? '🃏 ' + n + ' word' + (n === 1 ? '' : 's') + ' added to Review' : 'They’re all in Review already');
      marks.forEach(function (f) { f(); });
      allLabel();
    });
    function allLabel() { addAll.textContent = mine.every(function (v) { return S.srs[APP.wordKey(v)]; }) ? '✓ All in Review' : '➕ Add all to Review'; }
    allLabel();
    bar.appendChild(addAll);
    main.appendChild(bar);

    var grid = el('div', 'vocab');
    mine.forEach(function (v) {
      var c = el('article', 'vcard');
      var top = el('div', 'vcard-top');
      var name = el('span', 'vcard-w', v.w);
      top.appendChild(name);
      top.appendChild(APP.speakBtn(v.w));
      c.appendChild(top);
      if (v.pos) c.appendChild(el('span', 'pos', v.pos));
      c.appendChild(el('p', 'vcard-def', v.def));
      var ex = el('p', 'vcard-ex');
      ex.appendChild(document.createTextNode(v.ex + ' '));
      ex.appendChild(APP.speakBtn(v.ex));
      c.appendChild(ex);
      if (v.note) c.appendChild(el('p', 'vcard-note', '💡 ' + v.note));
      c.appendChild(el('p', 'vcard-es', '🇨🇴 ' + v.es));
      var add = btn('ghost-btn small word-add', '', function (e) {
        e.stopPropagation();
        if (S.srs[APP.wordKey(v)]) return;
        APP.srsAdd(v); APP.save();
        APP.toast('🃏 “' + v.w + '” is in Review');
        mark(); allLabel();
      });
      function mark() {
        var inR = !!S.srs[APP.wordKey(v)];
        add.textContent = inR ? '✓ In Review' : '➕ Add to Review';
        add.disabled = inR;
      }
      mark(); marks.push(mark);
      c.appendChild(add);
      c.addEventListener('click', function () { c.classList.toggle('show-es'); });
      grid.appendChild(c);
    });
    main.appendChild(grid);
  });
})();
