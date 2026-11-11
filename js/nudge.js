// Scroll reminders (api/nudge.mjs, data/nudges.js). APP.nudgeCard() is the card in Me where
// she turns them on and sets up the iPhone Shortcuts; #/nudge/<word>/<fact>/<mins>/<today>
// is the page a reminder opens: the word, why it's worth putting the phone down, and a way
// back into a lesson.
(function () {
  var APP = window.APP, el = APP.el, btn = APP.btn, S = APP.state;
  var FACTS = window.NUDGE_FACTS || [];

  function call(body) {
    body.passcode = S.settings.passcode || '';
    return fetch('api/nudge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (d) {
          if (r.ok) return d;
          var e = new Error(d.error || 'http ' + r.status); e.status = r.status; throw e;
        });
      });
  }
  function keyBytes(b64) {
    var s = atob((b64 + '==='.slice((b64.length + 3) % 4)).replace(/-/g, '+').replace(/_/g, '/'));
    var a = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i);
    return a;
  }
  function installed() {
    return navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
  }
  function canPush() { return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window; }
  function link(what) {
    return new URL('api/nudge?do=' + what + '&key=' + S.settings.nudgeKey, location.href).href;
  }
  function copy(text, what) {
    var done = function () { APP.toast('📋 ' + what + ' copied'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { prompt('Copy this:', text); });
    else prompt('Copy this:', text);
  }
  function failed(e) {
    APP.toast(e.status === 401 ? 'That passcode didn’t work.' : e.status === 503 ? 'Scroll reminders aren’t set up on the server yet.' : 'Couldn’t reach the server. Are you online?');
  }

  // Turn on: ask permission (must happen straight from the tap), subscribe, register with the server.
  function turnOn() {
    return Notification.requestPermission().then(function (p) {
      if (p !== 'granted') { var e = new Error('denied'); e.denied = true; throw e; }
      return Promise.all([
        navigator.serviceWorker.ready,
        fetch('api/nudge?do=key').then(function (r) { if (!r.ok) { var e = new Error('key'); e.status = r.status; throw e; } return r.json(); })
      ]);
    }).then(function (x) {
      var reg = x[0], pub = x[1].publicKey;
      return reg.pushManager.getSubscription().then(function (old) {
        return old || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(pub) });
      });
    }).then(function (sub) {
      var tz = '';
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
      return call({ action: 'subscribe', subscription: sub.toJSON(), tz: tz, key: S.settings.nudgeKey || '' });
    }).then(function (d) {
      S.settings.nudgeKey = d.key; APP.save();
    });
  }

  APP.nudgeCard = function () {
    var card = el('section', 'card nudge-card');
    card.appendChild(el('h2', '', '🔔 Scroll reminders'));
    card.appendChild(el('p', '', 'While you’re on TikTok or Instagram, you get a notification every 5 minutes with a new English word and a fact about what scrolling does to us. Tap it to learn the word.'));
    var body = el('div');
    card.appendChild(body);
    draw();
    return card;

    function draw() {
      body.replaceChildren();
      if (!canPush() || !installed()) {
        body.appendChild(el('p', 'muted', !installed()
          ? '📱 This works in the app on your home screen. Add it (see “Use it offline” below), open it from the icon, and come back here.'
          : 'This phone can’t get notifications from the app. On iPhone you need iOS 16.4 or newer: Settings → General → Software Update.'));
        return;
      }
      if (!S.settings.passcode) {
        body.appendChild(el('p', 'muted', 'Type the passcode (the same one as the AI partner) first.'));
        var inp = el('input'); inp.type = 'text'; inp.autocomplete = 'off'; inp.autocapitalize = 'off'; inp.placeholder = 'Passcode';
        body.appendChild(inp);
        body.appendChild(btn('ghost-btn', 'Save', function () { if (inp.value.trim()) { S.settings.passcode = inp.value.trim(); APP.save(); draw(); } }));
        return;
      }
      if (!S.settings.nudgeKey || Notification.permission !== 'granted') {
        if (Notification.permission === 'denied') {
          body.appendChild(el('p', 'muted', 'Notifications are blocked for this app. Turn them on in Settings → Notifications → Dale Dani, then come back.'));
          return;
        }
        var on = btn('big-btn', '🔔 Turn on scroll reminders', function () {
          on.disabled = true;
          turnOn().then(function () { APP.toast('Reminders are on 🔔'); draw(); }, function (e) {
            if (e.denied) APP.toast('No problem. You can turn them on later.'); else failed(e);
            on.disabled = false; draw();
          });
        });
        body.appendChild(on);
        return;
      }

      var status = el('p', 'muted', '✅ Notifications are on.');
      body.appendChild(status);
      call({ action: 'status', key: S.settings.nudgeKey }).then(function (d) {
        if (!d.subscribed) { S.settings.nudgeKey = ''; APP.save(); draw(); return; }
        status.textContent = '✅ Notifications are on. ' + (d.live ? 'You’re scrolling right now 👀 ' : '') +
          'Scrolling today: ' + d.today + ' min.';
      }, function () {});

      var row = el('div', 'row-btns');
      var test = btn('ghost-btn', 'Send me one now', function () {
        test.disabled = true;
        call({ action: 'test', key: S.settings.nudgeKey }).then(function () { APP.toast('Sent! It may take a few seconds.'); }, failed)
          .then(function () { test.disabled = false; });
      });
      row.appendChild(test);
      body.appendChild(row);

      // the iPhone Shortcuts automations that tell the server when she opens and closes the apps
      var how = el('details', 'nudge-setup');
      how.open = !S.settings.nudgeSetUp;
      how.appendChild(el('summary', '', '⚙️ Set up the iPhone automations (once, 3 minutes)'));
      how.appendChild(el('p', 'small', 'The app can’t see which apps you open, so the iPhone tells it. You make two automations in the Shortcuts app:'));
      how.appendChild(steps('1 · When you open TikTok or Instagram', 'start', 'Is Opened'));
      how.appendChild(steps('2 · When you close them', 'stop', 'Is Closed'));
      how.appendChild(el('p', 'muted small', 'That’s it. Open TikTok: after 5 minutes the first reminder arrives, then one every 5 minutes until you close it. Switching to another app for less than 3 minutes doesn’t restart the count.'));
      how.appendChild(btn('ghost-btn small', '✓ Done, I’ve set them up', function () { S.settings.nudgeSetUp = true; APP.save(); how.open = false; }));
      body.appendChild(how);

      body.appendChild(btn('ghost-btn small danger', 'Turn off scroll reminders', function () {
        call({ action: 'unsubscribe', key: S.settings.nudgeKey }).then(function () {
          return navigator.serviceWorker.ready.then(function (reg) { return reg.pushManager.getSubscription(); }).then(function (s) { return s && s.unsubscribe(); });
        }).then(function () {
          S.settings.nudgeKey = ''; S.settings.nudgeSetUp = false; APP.save();
          APP.toast('Reminders are off. You can delete the two automations in Shortcuts too.'); draw();
        }, failed);
      }));
    }

    function steps(title, what, trigger) {
      var box = el('div', 'nudge-steps');
      box.appendChild(el('h3', '', title));
      var ol = el('ol', 'g-explain');
      [
        'Open the Shortcuts app → Automation (at the bottom) → + → App.',
        'Choose TikTok and Instagram. Tick “' + trigger + '” only, choose “Run Immediately”, then Next.',
        'Tap New Blank Automation → Add Action → search “Get Contents of URL”.',
        'Tap the blue “URL” and paste this link:'
      ].forEach(function (t) { ol.appendChild(el('li', '', t)); });
      box.appendChild(ol);
      var code = el('code', 'nudge-link', link(what));
      box.appendChild(code);
      box.appendChild(btn('ghost-btn small', '📋 Copy link ' + (what === 'start' ? '1' : '2'), function () { copy(link(what), 'Link ' + (what === 'start' ? '1' : '2')); }));
      return box;
    }
  };

  // A reminder tapped while the app was already open: the service worker tells us where to go.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', function (e) {
      if (e.data && e.data.nudge) {
        var h = new URL(e.data.nudge, location.href).hash;
        if (h) location.hash = h;
      }
    });
  }

  /* ---------- the page a reminder opens ---------- */

  APP.route('nudge', function (main, args) {
    var dec = function (s) { try { return decodeURIComponent(s || ''); } catch (e) { return ''; } };
    var key = dec(args[0]), fact = FACTS.filter(function (f) { return f.id === dec(args[1]); })[0];
    var mins = parseInt(dec(args[2]), 10) || 0, today = parseInt(dec(args[3]), 10) || 0;
    var v = APP.allWords.filter(function (x) { return APP.wordKey(x) === key; })[0] || APP.pick(APP.allWords, 1)[0];
    if (!fact) fact = APP.pick(FACTS, 1)[0];

    APP.backBar(main, '#/', '');
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', mins ? 'Pausa, ' + APP.profile.short + ' ✋' : 'Your word 📚'));
    if (mins || today) head.appendChild(el('p', 'muted', (mins ? 'You’d been scrolling for ' + mins + ' minute' + (mins === 1 ? '' : 's') + '. ' : '') +
      (today ? 'Today so far: ' + today + ' minute' + (today === 1 ? '' : 's') + '.' : '')));
    main.appendChild(head);

    if (v) {
      var c = el('div', 'vcard show-es nudge-word');
      var top = el('div', 'vcard-top');
      top.appendChild(el('span', 'vcard-w', v.w));
      top.appendChild(APP.speakBtn(v.w));
      c.appendChild(top);
      var pic = APP.wordImg(v);
      if (pic) c.appendChild(APP.img(pic, 'nudge-pic', v.w));
      if (v.pos) c.appendChild(el('span', 'pos', v.pos));
      c.appendChild(el('p', 'vcard-def', v.def));
      var ex = el('p', 'vcard-ex');
      ex.appendChild(document.createTextNode(v.ex + ' '));
      ex.appendChild(APP.speakBtn(v.ex));
      c.appendChild(ex);
      if (v.note) c.appendChild(el('p', 'vcard-note', '💡 ' + v.note));
      c.appendChild(el('p', 'vcard-es', '🇨🇴 ' + v.es));
      var row = el('div', 'row-btns');
      var add = btn('ghost-btn small', '', function () {
        if (S.srs[APP.wordKey(v)]) return;
        APP.srsAdd(v); APP.save();
        APP.toast('🃏 “' + v.w + '” is in Review');
        mark();
      });
      function mark() { var inR = !!S.srs[APP.wordKey(v)]; add.textContent = inR ? '✓ In Review' : '➕ Add to Review'; add.disabled = inR; }
      mark();
      row.appendChild(add);
      // a little XP for stopping to learn, once per word per day
      var got = S.nudged = S.nudged || {};
      var gk = APP.today() + ':' + APP.wordKey(v);
      var xp = btn('ghost-btn small', got[gk] ? '✓ Learnt' : '✅ I’ve got it (+5 XP)', function () {
        if (got[gk]) return;
        Object.keys(got).forEach(function (k) { if (k.slice(0, 10) !== APP.today()) delete got[k]; });
        got[gk] = 1; APP.award(5, 'scroll break'); APP.save();
        xp.textContent = '✓ Learnt'; xp.disabled = true;
      });
      xp.disabled = !!got[gk];
      row.appendChild(xp);
      c.appendChild(row);
      main.appendChild(c);
    }

    if (fact) {
      var f = el('section', 'card nudge-fact');
      f.appendChild(el('h2', '', '📊 Why put the phone down?'));
      f.appendChild(el('p', '', fact.long));
      if (fact.source) {
        var src = el('p', 'muted small');
        if (fact.url) {
          var a = el('a', '', fact.source); a.href = fact.url; a.target = '_blank'; a.rel = 'noopener';
          src.appendChild(document.createTextNode('Source: ')); src.appendChild(a);
        } else src.textContent = 'Source: ' + fact.source;
        f.appendChild(src);
      }
      main.appendChild(f);
    }

    var next = el('section', 'card');
    next.appendChild(el('h2', '', 'Five minutes for English instead?'));
    var go = el('div', 'row-btns');
    var due = APP.srsDue().length;
    if (due) go.appendChild(btn('big-btn', '🃏 Review ' + due + ' word' + (due === 1 ? '' : 's'), function () { APP.go('#/review'); }));
    var u = APP.nextUnit();
    if (u) go.appendChild(btn(due ? 'ghost-btn' : 'big-btn', u.emoji + ' Carry on: ' + u.title, function () { APP.go('#/unit/' + u.id); }));
    go.appendChild(btn('ghost-btn', '🎮 A quick game', function () { APP.go('#/games'); }));
    next.appendChild(go);
    main.appendChild(next);
  });
})();
