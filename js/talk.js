// Conversation practice. She speaks (or types), the partner answers out loud.
// Two modes: the AI partner (api/talk.mjs, needs internet) and a scripted
// conversation from data/talks.js that works anywhere.
(function () {
  var APP = window.APP, el = APP.el, btn = APP.btn, S = APP.state;
  var TALKS = (window.TALKS || []).slice().sort(function (a, b) { return a.stage - b.stage; });
  var API = 'api/talk';

  S.talks = S.talks || {};
  if (S.settings.aiTalk === undefined) S.settings.aiTalk = true;

  /* ---------- speech recognition ---------- */

  var Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  APP.canListen = !!Rec;
  // APP.listen({ before, onText(text), onEnd(text, stoppedByHer) }) -> { stop() }
  // Keeps listening until stop() is called. Safari on iPhone ends recognition at
  // the first pause for breath, so when it ends by itself we start it again and
  // keep adding to the text. Only after a few silent rounds do we give up.
  APP.listen = function (o) {
    var said = (o.before || '').trim(), stopped = false, silent = 0, r = null;
    function join(a, b) { return (a + ' ' + b).trim(); }
    function round() {
      r = new Rec();
      r.lang = 'en-GB';
      r.interimResults = true;
      r.continuous = false; // true repeats words on iPhone; the restart below does the job instead
      r.maxAlternatives = 1;
      var heard = '', fatal = false;
      r.onresult = function (e) {
        // rebuild the whole round from the start: iPhone repeats and revises earlier results
        heard = '';
        for (var i = 0; i < e.results.length; i++) heard = join(heard, e.results[i][0].transcript);
        o.onText(join(said, heard));
      };
      r.onerror = function (e) {
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { fatal = true; APP.toast('I need permission to use the microphone.'); }
        else if (e.error === 'network') { fatal = true; APP.toast('Voice typing needs internet. You can type instead.'); }
        else if (e.error === 'audio-capture') { fatal = true; APP.toast('The microphone isn’t available right now.'); }
      };
      r.onend = function () {
        said = join(said, heard);
        silent = heard ? 0 : silent + 1;
        if (!stopped && !fatal && silent < 3) {
          try { round(); return; } catch (e) { /* not allowed to restart: fall through */ }
        }
        if (o.onEnd) o.onEnd(said, stopped);
      };
      r.start();
    }
    APP.stopSpeaking();
    round();
    return { stop: function () { stopped = true; try { r.stop(); } catch (e) {} } };
  };

  /* ---------- the list ---------- */

  APP.route('talk', function (main, args) {
    if (args[0]) return conversation(main, args[0]);
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', 'Let’s talk'));
    head.appendChild(el('p', 'muted', 'Real conversations, out loud. Tap the microphone, speak, and tap it again when you’ve finished. Your partner answers. Gentle corrections as you go, and feedback at the end.'));
    main.appendChild(head);

    var mode = el('section', 'card talk-mode');
    var sw = el('label', 'switch');
    var cb = el('input'); cb.type = 'checkbox'; cb.checked = S.settings.aiTalk;
    cb.addEventListener('change', function () { S.settings.aiTalk = cb.checked; APP.save(); note.textContent = modeNote(); });
    sw.appendChild(cb); sw.appendChild(el('span', '', '🤖 AI partner'));
    mode.appendChild(sw);
    var note = el('p', 'muted small', modeNote());
    mode.appendChild(note);
    if (!APP.canListen) mode.appendChild(el('p', 'muted small', '🎙️ This browser can’t do voice typing, so tap the microphone on your keyboard to speak, or type.'));
    main.appendChild(mode);

    [1, 2, 3, 4].forEach(function (stage) {
      var list = TALKS.filter(function (t) { return t.stage === stage; });
      if (!list.length) return;
      main.appendChild(el('h2', 'talk-stage', APP.STAGES[stage].label + ' · ' + APP.STAGES[stage].name));
      var grid = el('div', 'talks');
      list.forEach(function (t) {
        var a = el('a', 'talk-card');
        a.href = '#/talk/' + t.id;
        a.appendChild(el('span', 'talk-emoji', t.emoji));
        var tx = el('span', 'talk-text');
        tx.appendChild(el('span', 'talk-title', t.title));
        tx.appendChild(el('span', 'talk-sub', 'You: ' + t.you + ' · ' + t.name + ': ' + t.them));
        a.appendChild(tx);
        var done = S.talks[t.id];
        if (done) a.appendChild(el('span', 'talk-done', '✓ ' + done.times));
        grid.appendChild(a);
      });
      main.appendChild(grid);
    });
    if (!TALKS.length) main.appendChild(el('p', 'muted', 'No conversations found (data/talks.js).'));
  });

  function modeNote() {
    return S.settings.aiTalk
      ? 'Free conversation with an AI partner who adapts to what you say. Needs internet. If it’s not available you’ll get the practice script instead.'
      : 'Practice scripts: the conversation follows a set path and works offline (voice typing may still need internet).';
  }

  /* ---------- one conversation ---------- */

  function conversation(main, id) {
    var t = TALKS.filter(function (x) { return x.id === id; })[0];
    if (!t) { APP.go('#/talk'); return; }
    var ai = S.settings.aiTalk && navigator.onLine !== false;
    var history = [];      // {role, content} for the AI
    var step = 0, hits = 0, turnsSaid = 0, over = false, busy = false;

    APP.backBar(main, '#/talk', t.emoji + ' ' + t.title);
    var scene = el('section', 'card scene');
    scene.appendChild(el('p', 'scene-setting', t.setting));
    var roles = el('p', 'scene-roles');
    roles.appendChild(el('span', '', 'You: ' + t.you));
    roles.appendChild(el('span', '', t.name + ': ' + t.them));
    scene.appendChild(roles);
    var goal = el('p', 'scene-goal');
    goal.appendChild(el('strong', '', '🎯 Your goal: '));
    goal.appendChild(document.createTextNode(t.goal));
    scene.appendChild(goal);
    var modeTag = el('p', 'scene-mode', ai ? '🤖 AI partner' : '📜 Practice script');
    scene.appendChild(modeTag);
    main.appendChild(scene);

    var chat = el('div', 'chat');
    chat.setAttribute('aria-live', 'polite');
    main.appendChild(chat);

    var bar = el('div', 'talk-bar');
    var hintBtn = btn('ghost-btn small', '💡 Help me', showHint);
    var input = el('textarea', 'talk-input');
    input.rows = 1; input.placeholder = 'Tap 🎙️ and speak, or type…';
    input.setAttribute('aria-label', 'Your answer');
    var mic = btn('mic', '🎙️');
    mic.setAttribute('aria-label', 'Speak');
    var send = btn('send', '➤', function () { submit(input.value); });
    send.setAttribute('aria-label', 'Send');
    var row = el('div', 'talk-row');
    row.appendChild(mic); row.appendChild(input); row.appendChild(send);
    bar.appendChild(hintBtn);
    bar.appendChild(row);
    main.appendChild(bar);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(input.value); } });
    input.addEventListener('input', grow);
    function grow() { input.style.height = 'auto'; input.style.height = Math.min(140, input.scrollHeight) + 'px'; }

    var listening = null;
    mic.addEventListener('click', function () {
      if (over || busy) return;
      if (!APP.canListen) { input.focus(); APP.toast('Tap the 🎙️ on your keyboard to dictate.'); return; }
      if (listening) { listening.stop(); return; }
      // she talks for as long as she likes; tapping the mic again means "I've finished"
      micOn(true);
      var me = listening = APP.listen({
        before: input.value,
        onText: function (text) { if (listening === me) { input.value = text; grow(); } },
        onEnd: function (text, stoppedByHer) {
          if (listening !== me) return; // she already pressed send
          listening = null;
          micOn(false);
          input.value = text; grow();
          if (stoppedByHer && text) submit(text);
          else if (text) APP.toast('Tap ➤ to send, or 🎙️ to keep talking.');
        }
      });
    });
    function micOn(on) {
      mic.classList.toggle('on', on);
      mic.textContent = on ? '⏹' : '🎙️';
      mic.setAttribute('aria-label', on ? 'I’ve finished speaking' : 'Speak');
    }
    window.addEventListener('hashchange', function leave() {
      window.removeEventListener('hashchange', leave);
      if (listening) { var l = listening; listening = null; l.stop(); }
    });

    var lastHint = '';
    function partner(text) {
      var b = el('div', 'bubble them');
      b.appendChild(el('span', 'bubble-name', t.name));
      b.appendChild(el('p', '', text));
      b.appendChild(APP.speakBtn(text));
      chat.appendChild(b);
      APP.speak(text);
      b.scrollIntoView({ behavior: 'smooth', block: 'end' });
      return b;
    }
    function mine(text) {
      var b = el('div', 'bubble me');
      b.appendChild(el('p', '', text));
      chat.appendChild(b);
      b.scrollIntoView({ behavior: 'smooth', block: 'end' });
      return b;
    }
    function typing() {
      var b = el('div', 'bubble them typing');
      b.appendChild(el('span', 'dots', ''));
      chat.appendChild(b);
      b.scrollIntoView({ behavior: 'smooth', block: 'end' });
      return b;
    }
    function note(after, cls, html) {
      var n = el('div', 'talk-note ' + cls);
      html.forEach(function (x) { n.appendChild(x); });
      after.after(n);
      return n;
    }
    function showHint() {
      var h = ai ? lastHint : (t.turns[step] || {}).sample;
      var tip = !ai && (t.turns[step] || {}).tip;
      if (!h) { APP.toast('Just say whatever comes to mind. There are no wrong answers!'); return; }
      var parts = [el('p', '', '💡 You could say: “' + h + '”')];
      if (tip) parts.push(el('p', 'muted small', tip));
      var n = el('div', 'talk-note hint');
      parts.forEach(function (x) { n.appendChild(x); });
      n.appendChild(APP.speakBtn(h));
      chat.appendChild(n);
      n.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    function submit(text) {
      text = String(text || '').trim();
      if (!text || over || busy) return;
      if (listening) { listening.stop(); listening = null; micOn(false); }
      input.value = ''; grow();
      var mineB = mine(text);
      turnsSaid++;
      APP.award(4);
      if (ai) aiTurn(text, mineB); else scriptTurn(text, mineB);
    }

    /* scripted */
    function scriptTurn(text, mineB) {
      var turn = t.turns[step];
      var low = ' ' + APP.norm(text) + ' ';
      var ok = (turn.keys || []).some(function (k) { return low.indexOf(' ' + APP.norm(k)) >= 0 || low.indexOf(APP.norm(k)) >= 0; });
      if (ok) { hits++; note(mineB, 'good', [el('p', '', '👍 Nice!')]); }
      else {
        var n = note(mineB, 'try', [el('p', '', 'Another way to say it: “' + turn.sample + '”')]);
        n.appendChild(APP.speakBtn(turn.sample));
      }
      step++;
      setTimeout(function () {
        if (step < t.turns.length) partner(t.turns[step].say);
        else { partner(t.end); finish(); }
      }, 700);
    }

    /* AI */
    function call(mode) {
      return fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: S.settings.passcode || '', mode: mode, name: APP.profile.name, messages: history,
          scenario: { setting: t.setting, you: t.you, them: t.them, name: t.name, goal: t.goal, ai: t.ai, level: APP.STAGES[t.stage].label } })
      }).then(function (r) {
        if (r.ok) return r.json();
        var e = new Error('http ' + r.status); e.status = r.status; throw e;
      });
    }
    function aiTurn(text, mineB) {
      history.push({ role: 'user', content: text });
      busy = true;
      var dots = typing();
      call('turn').then(function (d) {
        dots.remove();
        busy = false;
        if (d.correction && d.correction.needed && d.correction.better) {
          var parts = [el('p', 'fix-better', '✏️ Better: “' + d.correction.better + '”')];
          if (d.correction.why) parts.push(el('p', 'muted small', d.correction.why));
          var n = note(mineB, 'fix', parts);
          n.appendChild(APP.speakBtn(d.correction.better));
        }
        history.push({ role: 'assistant', content: d.reply });
        lastHint = d.hint || '';
        partner(d.reply);
        if (d.done) finish();
      }).catch(function (e) {
        dots.remove();
        busy = false;
        history.pop();
        if (e.status === 401) { askPasscode(function () { aiTurn(text, mineB); }); return; }
        var msg = e.status === 429 ? 'The AI partner is busy right now.' : 'The AI partner isn’t available (no internet, or it isn’t set up yet).';
        var n = note(mineB, 'try', [el('p', '', msg + ' Let’s continue with the practice script instead.')]);
        ai = false;
        modeTag.textContent = '📜 Practice script';
        // pick the script up from roughly the same point
        step = Math.min(Math.max(0, turnsSaid - 1), t.turns.length - 1);
        scriptTurn(text, n);
      });
    }
    function askPasscode(retry) {
      var box = el('div', 'talk-note hint');
      box.appendChild(el('p', '', '🔑 Type the passcode to use the AI partner:'));
      var inp = el('input'); inp.type = 'text'; inp.autocomplete = 'off'; inp.autocapitalize = 'off';
      box.appendChild(inp);
      box.appendChild(btn('ghost-btn small', 'Save', function () {
        S.settings.passcode = inp.value.trim(); APP.save(); box.remove(); retry();
      }));
      chat.appendChild(box);
      inp.focus();
    }

    function finish() {
      over = true;
      bar.hidden = true;
      var rec = S.talks[t.id] || { times: 0 };
      rec.times++; rec.last = APP.today();
      S.talks[t.id] = rec;
      APP.save();
      APP.award(25);
      var end = el('section', 'card talk-end');
      end.appendChild(el('h2', '', '🎉 Conversation complete!'));
      if (!ai) end.appendChild(el('p', '', hits + ' of ' + t.turns.length + ' answers right on topic. Try it again and use the suggestions.'));
      var actions = el('div', 'row-btns');
      if (ai && history.length > 2) {
        var fb = btn('big-btn', '📝 How did I do?', function () {
          fb.disabled = true; fb.textContent = 'Thinking…';
          call('feedback').then(function (d) { fb.remove(); end.appendChild(feedbackCard(d)); APP.award(10); })
            .catch(function () { fb.disabled = false; fb.textContent = '📝 How did I do?'; APP.toast('Couldn’t get feedback right now. Try again?'); });
        });
        actions.appendChild(fb);
      }
      var again = el('a', 'ghost-btn', '↻ Again'); again.href = '#/talk/' + t.id + '?' + Date.now();
      var more = el('a', 'ghost-btn', 'More conversations'); more.href = '#/talk';
      actions.appendChild(again); actions.appendChild(more);
      end.appendChild(actions);
      chat.appendChild(end);
      setTimeout(function () { end.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 1200);
      APP.checkBadges();
    }

    function feedbackCard(d) {
      var c = el('div', 'feedback');
      c.appendChild(el('p', 'feedback-level', 'This conversation: ' + (d.level || '')));
      c.appendChild(el('p', '', d.summary || ''));
      if ((d.strengths || []).length) {
        c.appendChild(el('h3', '', '💪 What you did well'));
        var ul = el('ul', 'g-explain'); d.strengths.forEach(function (s) { ul.appendChild(el('li', '', s)); }); c.appendChild(ul);
      }
      if ((d.fixes || []).length) {
        c.appendChild(el('h3', '', '✏️ Fix these'));
        d.fixes.forEach(function (f) {
          var r = el('div', 'fix-row');
          r.appendChild(el('p', 'fix-said', '✗ ' + f.youSaid));
          var better = el('p', 'fix-better', '✓ ' + f.better + ' ');
          better.appendChild(APP.speakBtn(f.better));
          r.appendChild(better);
          r.appendChild(el('p', 'muted small', f.why));
          c.appendChild(r);
        });
      }
      if ((d.phrases || []).length) {
        c.appendChild(el('h3', '', '✨ Phrases to steal'));
        var chips = el('div', 'chips');
        d.phrases.forEach(function (p) { var ch = btn('wchip', p, function () { APP.speak(p); }); chips.appendChild(ch); });
        c.appendChild(chips);
      }
      return c;
    }

    // start: the partner speaks first
    setTimeout(function () {
      partner(t.opening || t.turns[0].say);
      if (ai) { history.push({ role: 'assistant', content: t.opening || t.turns[0].say }); lastHint = t.turns[0].sample; }
    }, 400);
  }
})();
