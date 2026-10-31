// "Check my English" for journal entries: sends the text to api/review.mjs and shows
// it back with each mistake crossed out and its correction next to it.
// The result is kept on the entry (j.review) so she can come back to it.
//
// APP.reviewBox(j) -> element holding the button, or the saved review
(function () {
  var APP = window.APP, el = APP.el, btn = APP.btn, S = APP.state;
  var API = 'api/review';

  APP.reviewBox = function (j) {
    var box = el('div', 'review-box');
    if (j.review && j.review.text === j.text) show(box, j);
    else box.appendChild(checkBtn(box, j));
    return box;
  };

  function checkBtn(box, j) {
    var b = btn('big-btn review-go', '✨ Check my English', function () {
      b.disabled = true; b.textContent = 'Reading your text…';
      fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: S.settings.passcode || '', name: APP.profile.name, prompt: j.prompt || '', text: j.text })
      }).then(function (r) {
        if (r.ok) return r.json();
        return r.json().catch(function () { return {}; }).then(function (body) {
          var e = new Error('http ' + r.status); e.status = r.status; e.why = body.error || ''; throw e;
        });
      }).then(function (d) {
        var first = !j.review;
        j.review = { text: j.text, date: APP.today(), summary: d.summary || '', level: d.level || '', corrected: d.corrected || '',
          mistakes: (d.mistakes || []).filter(function (m) { return m && m.wrong && m.right; }) };
        APP.save();
        if (first) APP.award(10);
        box.replaceChildren();
        show(box, j);
      }).catch(function (e) {
        b.disabled = false; b.textContent = '✨ Check my English';
        if (e.status === 401) { askPasscode(box, function () { b.click(); }); return; }
        var msg = e.status === 429 ? 'The checker is busy right now. Try again in a minute.'
          : !e.status ? 'Checking needs internet, and I can’t reach it.'
          : e.status === 503 ? 'The checker isn’t set up on the server yet.'
          : 'The checker had a problem. Try again?';
        var old = box.querySelector('.review-err'); if (old) old.remove();
        var p = el('p', 'review-err muted small', msg + (e.status ? ' (' + e.status + (e.why ? ' ' + e.why : '') + ')' : ''));
        box.appendChild(p);
      });
    });
    return b;
  }

  function askPasscode(box, retry) {
    if (box.querySelector('.review-pass')) return;
    var row = el('div', 'review-pass talk-note hint');
    row.appendChild(el('p', '', '🔑 Type the passcode to use the checker:'));
    var inp = el('input'); inp.type = 'text'; inp.autocomplete = 'off'; inp.autocapitalize = 'off';
    row.appendChild(inp);
    row.appendChild(btn('ghost-btn small', 'Save', function () { S.settings.passcode = inp.value.trim(); APP.save(); row.remove(); retry(); }));
    box.appendChild(row);
    inp.focus();
  }

  function show(box, j) {
    var r = j.review, ms = r.mistakes;
    var card = el('section', 'review');
    var head = el('div', 'review-head');
    head.appendChild(el('h3', '', ms.length ? '✏️ ' + ms.length + ' thing' + (ms.length === 1 ? '' : 's') + ' to fix' : '🌟 No mistakes!'));
    if (r.level) head.appendChild(el('span', 'review-level', r.level));
    card.appendChild(head);
    if (r.summary) card.appendChild(el('p', 'review-summary', r.summary));

    if (ms.length) {
      card.appendChild(marked(r.text, ms));
      var ol = el('ol', 'review-list');
      ms.forEach(function (m) {
        var li = el('li', '');
        var fix = el('p', 'review-fix');
        fix.appendChild(el('del', 'err-wrong', m.wrong));
        fix.appendChild(document.createTextNode(' → '));
        fix.appendChild(el('ins', 'err-right', m.right));
        if (m.kind) fix.appendChild(el('span', 'review-kind', m.kind));
        li.appendChild(fix);
        if (m.why) li.appendChild(el('p', 'review-why', m.why));
        ol.appendChild(li);
      });
      card.appendChild(ol);
    }

    if (r.corrected && r.corrected.trim() !== r.text.trim()) {
      var cd = el('details', 'review-corrected');
      cd.appendChild(el('summary', '', '✅ See the corrected version'));
      cd.appendChild(el('p', 'journal-text', r.corrected));
      var acts = el('div', 'entry-acts');
      acts.appendChild(APP.speakBtn(r.corrected, 'Hear it'));
      cd.appendChild(acts);
      card.appendChild(cd);
    }
    box.appendChild(card);
  }

  // Her text with each mistake struck through, the fix beside it and its number.
  function marked(text, ms) {
    var spans = [], from = 0;
    ms.forEach(function (m, i) {
      var at = find(text, m.wrong, from, spans);
      if (at < 0) at = find(text, m.wrong, 0, spans);
      if (at < 0) return; // not found word for word: it still shows in the list below
      spans.push({ a: at, b: at + m.wrong.length, m: m, n: i + 1 });
      from = at + m.wrong.length;
    });
    spans.sort(function (x, y) { return x.a - y.a; });
    var p = el('p', 'journal-text review-text'), pos = 0;
    spans.forEach(function (s) {
      if (s.a > pos) p.appendChild(document.createTextNode(text.slice(pos, s.a)));
      var w = el('span', 'err');
      w.appendChild(el('del', 'err-wrong', text.slice(s.a, s.b)));
      w.appendChild(el('ins', 'err-right', s.m.right));
      w.appendChild(el('sup', 'err-n', String(s.n)));
      p.appendChild(w);
      pos = s.b;
    });
    if (pos < text.length) p.appendChild(document.createTextNode(text.slice(pos)));
    return p;
  }
  // first place the words appear at or after `from` without overlapping a mark already made
  function find(text, w, from, spans) {
    var hay = text.toLowerCase(), needle = w.toLowerCase(), at = hay.indexOf(needle, from);
    while (at >= 0) {
      var end = at + needle.length;
      if (!spans.some(function (s) { return at < s.b && end > s.a; })) return at;
      at = hay.indexOf(needle, at + 1);
    }
    return -1;
  }
})();
