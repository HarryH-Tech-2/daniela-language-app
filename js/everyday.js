// "Everyday English": browse the phrasal verbs, conversation glue and idioms in
// data/everyday.js, one group per tab, with a quiz for each (#/game/everyday/<group>).
(function () {
  var APP = window.APP, el = APP.el;
  var GROUPS = APP.everyday = window.EVERYDAY || [];

  APP.route('everyday', function (main, args) {
    if (!GROUPS.length) { APP.go('#/'); return; }
    var grp = GROUPS.filter(function (x) { return x.id === args[0]; })[0] || GROUPS[0];

    APP.backBar(main, '#/', '');
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', 'Everyday English'));
    head.appendChild(el('p', 'muted', 'The phrases you’ll hear in every conversation, series and meeting. Tap 🔊 to hear one, and tap a card to see it in Spanish.'));
    main.appendChild(head);

    var tabs = el('nav', 'steps');
    tabs.setAttribute('aria-label', 'Groups');
    GROUPS.forEach(function (x) {
      var a = el('a', 'step' + (x.id === grp.id ? ' on' : ''));
      a.href = '#/everyday/' + x.id;
      a.appendChild(el('span', 'step-i', x.icon));
      a.appendChild(el('span', 'step-l', x.short + ' · ' + x.items.length));
      tabs.appendChild(a);
    });
    main.appendChild(tabs);

    main.appendChild(el('h2', 'everyday-title', grp.title));
    main.appendChild(el('p', 'step-lead', grp.intro));
    main.appendChild(practise(grp));

    var grid = el('div', 'vocab');
    grp.items.forEach(function (v) {
      var c = el('article', 'vcard');
      var top = el('div', 'vcard-top');
      top.appendChild(el('span', 'vcard-w', v.p));
      top.appendChild(APP.speakBtn(v.p));
      c.appendChild(top);
      c.appendChild(el('p', 'vcard-def', v.def));
      var ex = el('p', 'vcard-ex');
      ex.appendChild(document.createTextNode(v.ex + ' '));
      ex.appendChild(APP.speakBtn(v.ex));
      c.appendChild(ex);
      if (v.note) c.appendChild(el('p', 'vcard-note', '💡 ' + v.note));
      c.appendChild(el('p', 'vcard-es', '🇨🇴 ' + v.es));
      c.addEventListener('click', function () { c.classList.toggle('show-es'); });
      grid.appendChild(c);
    });
    main.appendChild(grid);
    main.appendChild(practise(grp));
  });

  function practise(grp) {
    var a = el('a', 'big-btn', '🎯 Practise ' + grp.short.toLowerCase());
    a.href = '#/game/everyday/' + grp.id;
    return a;
  }
})();
