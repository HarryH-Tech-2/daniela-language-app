// Songs: original C1 songs in three styles (calm, samba, salsa). #/songs lists them;
// #/songs/<id> plays one with karaoke lyrics, a visualiser that dances to the music,
// tap-a-word meanings, the key words and the grammar in it. The quiz is a game:
// #/game/songs/<id> (js/games.js).
(function () {
  var APP = window.APP, el = APP.el, btn = APP.btn, S = APP.state;
  var SONGS = APP.songs = window.SONGS || [];
  var STYLE = {
    salsa: { icon: '💃', name: 'Salsa', blurb: 'Clave, congas, piano and trumpets. Dance while you learn.' },
    bossa: { icon: '🎸', name: 'Bossa nova', blurb: 'Nylon guitar, soft drums and a gentle voice. Slow enough to catch every word.' },
    samba: { icon: '🥁', name: 'Samba', blurb: 'Drums, shakers and Carnaval energy.' },
    calm: { icon: '🌙', name: 'Calm', blurb: 'Slow and dreamy. Easy to follow, perfect for the evening.' }
  };
  var INTRO = 2, PER_LINE = 2, OUTRO = 2; // in bars
  var SUNG_INTRO = 8; // seconds before the singing starts in a sung song (tools/songs.mjs)

  // every line in order, with the part it belongs to and where it starts and ends: in bars
  // for the synthesised songs, in seconds for the sung ones (timed by tools/songs.mjs, or
  // estimated from the section lengths the song was made with until it has been timed)
  function timeline(song) {
    if (song.audio) return sungTimeline(song);
    var out = [], bar = INTRO;
    song.parts.forEach(function (p) {
      p.lines.forEach(function (t, i) { out.push({ text: t, part: p.part, first: i === 0, bar: bar }); bar += PER_LINE; });
    });
    out.forEach(function (l) { l.end = l.bar + PER_LINE; });
    return { lines: out, bars: bar + OUTRO };
  }
  function sungTimeline(song) {
    var T = (window.SONG_TIMES || {})[song.id], out = [], at = SUNG_INTRO, i = 0;
    song.parts.forEach(function (p) {
      p.lines.forEach(function (t, j) {
        var tm = T && T.lines[i];
        out.push({ text: t, part: p.part, first: j === 0, bar: tm ? tm[0] : at, end: tm ? tm[1] : at + song.lineSec * 0.9 });
        at += song.lineSec; i++;
      });
    });
    return { lines: out, bars: T ? T.dur : at + SUNG_INTRO };
  }
  APP.songLines = function (song) { return timeline(song).lines; };

  function heard() { return (S.songs = S.songs || {}); }

  /* ---------- the list ---------- */

  APP.route('songs', function (main, args) {
    if (!SONGS.length) { APP.go('#/'); return; }
    if (args[0]) return player(main, SONGS.filter(function (s) { return s.id === args[0]; })[0]);
    APP.backBar(main, '#/', '');
    var head = el('section', 'page-head');
    head.appendChild(el('h1', '', 'Songs'));
    head.appendChild(el('p', 'muted', 'Original songs for learning new words. The 🎤 ones are really sung; the others are played by the app, with C1 lyrics. Listen, sing along, tap a word to see what it means, then take the quiz.'));
    main.appendChild(head);
    Object.keys(STYLE).forEach(function (k) {
      var list = SONGS.filter(function (s) { return s.style === k; });
      if (!list.length) return;
      var st = STYLE[k];
      main.appendChild(el('h2', 'song-style-h', st.icon + ' ' + st.name));
      main.appendChild(el('p', 'step-lead', st.blurb));
      var grid = el('div', 'song-grid');
      list.forEach(function (s) {
        var a = el('a', 'song-card song-' + s.style);
        a.href = '#/songs/' + s.id;
        a.appendChild(el('span', 'song-card-i', s.emoji));
        var t = el('span', 'song-card-t');
        t.appendChild(el('span', 'song-card-n', s.title));
        t.appendChild(el('span', 'song-card-by', (s.audio ? '🎤 Sung · ' + (s.level || 'B2') + ' · ' : s.by + ' · ') + s.words.length + ' words to learn'));
        a.appendChild(t);
        var n = heard()[s.id];
        a.appendChild(el('span', 'song-card-go', n ? '✓' : '▶'));
        grid.appendChild(a);
      });
      main.appendChild(grid);
    });
  });

  /* ---------- the player ---------- */

  function player(main, song) {
    if (!song) { APP.go('#/songs'); return; }
    var tl = timeline(song), lines = tl.lines;
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var voiceOn = APP.canSpeak && S.songVoice !== false && !song.audio, slow = false;
    var events = [], cur = -2, raf = 0, alive = true;

    APP.backBar(main, '#/songs', STYLE[song.style].icon + ' ' + STYLE[song.style].name);
    var head = el('section', 'page-head song-head');
    head.appendChild(el('h1', '', song.emoji + ' ' + song.title));
    head.appendChild(el('p', 'muted song-by', 'by ' + song.by + ' · ' + (song.level || 'C1') + (song.audio ? ' · 🎤 sung' : '')));
    head.appendChild(el('p', 'step-lead', song.intro));
    main.appendChild(head);

    // the stage: visualiser with the current line on top
    var stage = el('div', 'song-stage song-' + song.style);
    var canvas = el('canvas', 'song-canvas');
    canvas.setAttribute('aria-hidden', 'true');
    stage.appendChild(canvas);
    var now = el('div', 'song-now');
    now.setAttribute('aria-live', 'polite');
    var nowPart = el('p', 'song-now-part', 'Intro'), nowLine = el('p', 'song-now-line', 'Press play ▶');
    now.appendChild(nowPart); now.appendChild(nowLine);
    stage.appendChild(now);
    main.appendChild(stage);

    // controls
    var ctl = el('div', 'song-ctl');
    var restart = btn('song-btn', '⏮', function () { seek(0); });
    restart.setAttribute('aria-label', 'Start again');
    var playB = btn('song-play', '▶', toggle);
    playB.setAttribute('aria-label', 'Play');
    var voiceB = btn('song-btn song-tog', '🗣️ Voice', function () {
      voiceOn = !voiceOn; S.songVoice = voiceOn; APP.save();
      voiceB.classList.toggle('on', voiceOn); voiceB.setAttribute('aria-pressed', voiceOn);
      p.setVolume(voiceOn ? 0.55 : 0.85);
      if (!voiceOn) APP.stopSpeaking(); else if (p.isPlaying() && lines[cur]) APP.speak(lines[cur].text);
    });
    voiceB.classList.toggle('on', voiceOn); voiceB.setAttribute('aria-pressed', voiceOn);
    voiceB.title = 'A voice reads each line as it comes';
    if (!APP.canSpeak || song.audio) voiceB.hidden = true; // a sung song has its own singer
    var slowB = btn('song-btn song-tog', '🐢 Slower', function () {
      slow = !slow; slowB.classList.toggle('on', slow); slowB.setAttribute('aria-pressed', slow);
      p.setTempo(song.audio ? (slow ? 0.85 : 1) : song.bpm * (slow ? 0.82 : 1));
    });
    slowB.setAttribute('aria-pressed', 'false');
    ctl.appendChild(restart); ctl.appendChild(playB); ctl.appendChild(voiceB); ctl.appendChild(slowB);
    main.appendChild(ctl);
    var seekBar = el('input', 'song-seek');
    seekBar.type = 'range'; seekBar.min = 0; seekBar.max = tl.bars; seekBar.step = 0.01; seekBar.value = 0;
    seekBar.setAttribute('aria-label', 'Position in the song');
    seekBar.addEventListener('input', function () { seek(+seekBar.value, true); });
    main.appendChild(seekBar);

    // the lyric sheet
    var sheet = el('section', 'song-sheet');
    sheet.appendChild(el('p', 'muted song-sheet-tip', 'Tap a line to jump there. Tap an underlined word to see what it means.'));
    var rows = lines.map(function (ln, i) {
      if (ln.first) sheet.appendChild(el('p', 'song-part', ln.part));
      var row = el('p', 'song-line');
      glossLine(ln.text, song.words, row);
      row.addEventListener('click', function () { seek(ln.bar); if (!p.isPlaying()) play(); });
      sheet.appendChild(row);
      return row;
    });
    main.appendChild(sheet);

    // words and notes
    main.appendChild(el('h2', 'song-sub', '🔑 Words in this song'));
    var grid = el('div', 'vocab');
    song.words.forEach(function (v) {
      var c = el('article', 'vcard');
      var top = el('div', 'vcard-top');
      top.appendChild(el('span', 'vcard-w', v.w));
      top.appendChild(APP.speakBtn(v.w));
      c.appendChild(top);
      c.appendChild(el('p', 'vcard-def', v.def));
      var line = (lines.filter(function (l) { return l.text.toLowerCase().indexOf(v.in.toLowerCase()) >= 0; })[0] || {}).text;
      if (line) { var ex = el('p', 'vcard-ex'); ex.appendChild(document.createTextNode('🎵 “' + line + '” ')); ex.appendChild(APP.speakBtn(line)); c.appendChild(ex); }
      c.appendChild(el('p', 'vcard-es', '🇨🇴 ' + v.es));
      c.addEventListener('click', function () { c.classList.toggle('show-es'); });
      grid.appendChild(c);
    });
    main.appendChild(grid);
    main.appendChild(el('h2', 'song-sub', '📐 The grammar in it'));
    song.notes.forEach(function (n) {
      var c = el('article', 'card song-note');
      c.appendChild(el('h3', '', n.h));
      c.appendChild(el('p', '', n.t));
      main.appendChild(c);
    });
    var quiz = el('a', 'big-btn song-quiz', '🎯 Take the song quiz');
    quiz.href = '#/game/songs/' + song.id;
    main.appendChild(quiz);

    /* ----- playing ----- */

    var p = (song.audio ? sungPlayer : APP.music.player)({
      style: song.style, bpm: song.bpm, key: song.key, chords: song.chords, bars: tl.bars, src: song.audio,
      onBeat: function (kind, t, n) { if (events.length < 200) events.push({ kind: kind, t: t, n: n }); },
      onDuration: function (d) { seekBar.max = d; },
      onBlocked: function () { setPlaying(false); },
      onEnd: function () {
        if (!alive) return;
        setPlaying(false); p.stop(); cur = -2;
        var h = heard();
        var first = !h[song.id];
        h[song.id] = (h[song.id] || 0) + 1;
        APP.save();
        APP.award(first ? 15 : 5, 'song');
        APP.toast(first ? '🎵 Song finished! Now try the quiz.' : '🎵 Again! Your ear is getting sharper.');
      }
    });
    p.setVolume(voiceOn ? 0.55 : 0.85);

    function setPlaying(on) {
      playB.textContent = on ? '⏸' : '▶';
      playB.setAttribute('aria-label', on ? 'Pause' : 'Play');
      stage.classList.toggle('playing', on);
    }
    function play() { p.play(); setPlaying(true); cur = -2; }
    function toggle() {
      if (p.isPlaying()) { p.pause(); APP.stopSpeaking(); setPlaying(false); }
      else play();
    }
    function seek(bar, dragging) {
      APP.stopSpeaking();
      events.length = 0;
      cur = -2;
      p.seek(bar);
      if (dragging) seekBar.value = bar;
    }
    function lineAt(pos) {
      for (var i = lines.length - 1; i >= 0; i--) {
        if (pos < lines[i].bar) continue;
        // a sung line stays lit until the next one starts, unless there's a long gap (an instrumental)
        var until = song.audio ? Math.min(lines[i + 1] ? lines[i + 1].bar : Infinity, lines[i].end + 2.5) : lines[i].end;
        return pos < until ? i : -1;
      }
      return -1;
    }
    function follow(pos) {
      var i = lineAt(pos);
      if (i !== cur) {
        if (rows[cur]) { rows[cur].classList.remove('on'); rows[cur].style.removeProperty('--p'); }
        cur = i;
        if (rows[i]) {
          rows[i].classList.add('on');
          var r = rows[i].getBoundingClientRect();
          // only follow in the sheet once she has scrolled past the stage, which shows the line anyway
          if (p.isPlaying() && stage.getBoundingClientRect().bottom < 0 && (r.top < 80 || r.bottom > window.innerHeight - 110) && !userScrolled()) rows[i].scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
          nowPart.textContent = lines[i].part;
          nowLine.replaceChildren();
          glossLine(lines[i].text, song.words, nowLine);
          if (voiceOn && p.isPlaying()) APP.speak(lines[i].text);
        } else {
          var before = pos < lines[0].bar, after = pos > lines[lines.length - 1].bar;
          nowPart.textContent = before ? 'Intro' : after ? 'Outro' : '♪';
          nowLine.textContent = before && !p.isPlaying() ? 'Press play ▶' : '♪ ♪ ♪';
        }
      }
      if (rows[i]) rows[i].style.setProperty('--p', Math.min(100, ((pos - lines[i].bar) / Math.max(0.5, lines[i].end - lines[i].bar)) * 105) + '%');
    }
    // don't yank the page back while she is scrolling the lyrics herself
    var lastScroll = 0;
    function userScrolled() { return Date.now() - lastScroll < 2500; }
    function onScroll(e) { if (e.isTrusted) lastScroll = Date.now(); }
    window.addEventListener('wheel', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });

    /* ----- the visualiser ----- */

    var g = canvas.getContext('2d'), W = 0, H = 0, dpr = 1;
    var freq = new Uint8Array(p.analyser.frequencyBinCount);
    var parts = [], pulse = 0, flash = 0, spin = 0, last = performance.now();
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener('resize', size);

    function energy(a, b) { var s = 0; for (var i = a; i < b; i++) s += freq[i]; return s / ((b - a) * 255); }
    function frame(ts) {
      if (!alive) return;
      var dt = Math.min(0.05, (ts - last) / 1000); last = ts;
      p.analyser.getByteFrequencyData(freq);
      var t = p.ctx.currentTime;
      while (events.length && events[0].t <= t) beat(events.shift());
      if (song.audio && p.isPlaying()) onsets(t);
      pulse *= Math.pow(0.02, dt); flash *= Math.pow(0.01, dt);
      spin += dt * (p.isPlaying() ? 0.6 : 0.08);
      DRAW[song.style](dt, ts / 1000);
      parts = parts.filter(function (q) { return q.life > 0; });
      var pos = p.position();
      follow(pos);
      if (document.activeElement !== seekBar) seekBar.value = pos;
      raf = requestAnimationFrame(frame);
    }
    // a sung song has no score to follow, so find the beat in the sound itself
    var lowAvg = 0, lastHit = 0, hits = 0;
    function onsets(t) {
      var lo = energy(1, 6), mid = energy(20, 60);
      if (lo > lowAvg * 1.25 && lo > 0.3 && t - lastHit > 0.22) {
        lastHit = t; hits++;
        beat({ kind: 'kick', t: t, n: hits });
        beat({ kind: song.style === 'salsa' ? (hits % 2 ? 'clave' : 'soft') : 'note', t: t, n: hits * 7 });
      } else if (mid > 0.45 && Math.random() < 0.04) beat({ kind: 'note', t: t, n: Math.floor(Math.random() * 24) });
      lowAvg = lowAvg * 0.92 + lo * 0.08;
    }
    function beat(e) {
      if (e.kind === 'kick') pulse = 1;
      if (e.kind === 'soft') pulse = Math.max(pulse, 0.5);
      if (e.kind === 'clave') flash = 1;
      if (reduced) return;
      if ((song.style === 'calm' || song.style === 'bossa') && e.kind === 'note' && Math.random() < 0.5)
        parts.push({ x: W * (0.1 + ((e.n % 24) / 24) * 0.8), y: H * (0.35 + Math.random() * 0.4), r: 4, life: 1, kind: 'ripple' });
      if (song.style === 'samba' && e.kind === 'hit')
        for (var i = 0; i < 3; i++) parts.push({ x: Math.random() * W, y: -10, vx: (Math.random() - 0.5) * 40, vy: 60 + Math.random() * 90, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 8, c: SAMBA_C[Math.floor(Math.random() * SAMBA_C.length)], life: 1, kind: 'confetti' });
      if (song.style === 'salsa' && e.kind === 'clave')
        parts.push({ x: W * (0.15 + Math.random() * 0.7), y: H * (0.2 + Math.random() * 0.5), r: 6, life: 1, c: SALSA_C[Math.floor(Math.random() * SALSA_C.length)], kind: 'ring' });
    }
    var SAMBA_C = ['#ffd93d', '#16c79a', '#ff7a1a', '#ffffff', '#3b6cff'];
    var SALSA_C = ['#ff3d7f', '#ffb13d', '#ff6b3d', '#ffd1e3'];

    function bg(a, b) {
      var gr = g.createLinearGradient(0, 0, 0, H);
      gr.addColorStop(0, a); gr.addColorStop(1, b);
      g.fillStyle = gr; g.fillRect(0, 0, W, H);
    }
    var DRAW = {
      // calm: aurora waves over a night sea, ripples where the piano plays
      calm: function (dt, time) {
        bg('#120c2b', '#1d2b4f');
        for (var s = 0; s < 26; s++) { // stars
          var sx = (s * 97.3) % W, sy = (s * 41.7) % (H * 0.5), tw = 0.4 + 0.4 * Math.sin(time * 1.3 + s);
          g.fillStyle = 'rgba(255,255,255,' + (tw * 0.6) + ')'; g.fillRect(sx, sy, 1.6, 1.6);
        }
        var low = energy(1, 8), mid = energy(8, 40);
        var cols = ['rgba(120,220,210,0.35)', 'rgba(170,140,255,0.3)', 'rgba(255,130,190,0.22)', 'rgba(120,180,255,0.25)'];
        cols.forEach(function (c, k) {
          g.beginPath();
          var base = H * (0.55 + k * 0.08), amp = 8 + (low * 26 + mid * 18) * (1 - k * 0.15) + pulse * 6;
          g.moveTo(0, H);
          for (var x = 0; x <= W; x += 6) g.lineTo(x, base + Math.sin(x / (90 + k * 30) + time * (0.5 + k * 0.17) + k) * amp + Math.sin(x / 37 + time * 1.1) * amp * 0.25);
          g.lineTo(W, H); g.closePath();
          g.fillStyle = c; g.fill();
        });
        // moon
        var mr = 18 + pulse * 3 + low * 6;
        var mg = g.createRadialGradient(W * 0.82, H * 0.22, 2, W * 0.82, H * 0.22, mr * 3);
        mg.addColorStop(0, 'rgba(255,245,220,0.95)'); mg.addColorStop(0.3, 'rgba(255,235,200,0.35)'); mg.addColorStop(1, 'rgba(255,235,200,0)');
        g.fillStyle = mg; g.beginPath(); g.arc(W * 0.82, H * 0.22, mr * 3, 0, 7); g.fill();
        parts.forEach(function (q) {
          q.r += dt * 40; q.life -= dt * 0.55;
          g.strokeStyle = 'rgba(200,240,255,' + Math.max(0, q.life * 0.7) + ')'; g.lineWidth = 1.5;
          g.beginPath(); g.ellipse(q.x, q.y, q.r, q.r * 0.35, 0, 0, 7); g.stroke();
        });
      },
      // samba: a sun of frequency rays, confetti on the tamborim
      samba: function (dt, time) {
        bg('#0b6b4f', '#0a3d3a');
        var cx = W / 2, cy = H * 0.52, R = Math.min(W, H) * (0.16 + pulse * 0.03);
        var n = 48;
        for (var i = 0; i < n; i++) {
          var v = freq[2 + Math.floor(i / n * 70)] / 255, a = (i / n) * Math.PI * 2 + spin * 0.4;
          var len = 6 + v * Math.min(W, H) * 0.32;
          g.strokeStyle = i % 2 ? 'rgba(255,217,61,0.9)' : 'rgba(255,255,255,0.75)';
          g.lineWidth = 3; g.lineCap = 'round';
          g.beginPath(); g.moveTo(cx + Math.cos(a) * (R + 6), cy + Math.sin(a) * (R + 6));
          g.lineTo(cx + Math.cos(a) * (R + 6 + len), cy + Math.sin(a) * (R + 6 + len)); g.stroke();
        }
        var sg = g.createRadialGradient(cx, cy, 2, cx, cy, R);
        sg.addColorStop(0, '#fff3b0'); sg.addColorStop(1, '#ffc21a');
        g.fillStyle = sg; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill();
        parts.forEach(function (q) {
          q.x += q.vx * dt; q.y += q.vy * dt; q.rot += q.vr * dt;
          if (q.y > H + 10) q.life = 0;
          g.save(); g.translate(q.x, q.y); g.rotate(q.rot);
          g.fillStyle = q.c; g.fillRect(-4, -2.5, 8, 5); g.restore();
        });
      },
      // salsa: a spinning flower and an equaliser, rings on the clave
      salsa: function (dt, time) {
        bg('#3a0d2e', '#7a1736');
        if (flash > 0.02) { g.fillStyle = 'rgba(255,177,61,' + flash * 0.12 + ')'; g.fillRect(0, 0, W, H); }
        var bars = 32, bw = W / bars;
        for (var i = 0; i < bars; i++) {
          var v = freq[1 + Math.floor(i * 2.2)] / 255, h = v * H * 0.45;
          g.fillStyle = i % 2 ? 'rgba(255,61,127,0.55)' : 'rgba(255,177,61,0.5)';
          g.fillRect(i * bw + 1, H - h, bw - 2, h);
        }
        var cx = W / 2, cy = H * 0.42, R = Math.min(W, H) * (0.13 + pulse * 0.025 + energy(1, 10) * 0.05);
        g.save(); g.translate(cx, cy); g.rotate(spin);
        for (var k = 0; k < 8; k++) {
          g.rotate(Math.PI / 4);
          g.fillStyle = k % 2 ? '#ff3d7f' : '#ff6b9a';
          g.beginPath(); g.ellipse(R * 0.9, 0, R * 0.9, R * 0.38, 0, 0, 7); g.fill();
        }
        g.fillStyle = '#ffd93d'; g.beginPath(); g.arc(0, 0, R * 0.42, 0, 7); g.fill();
        g.restore();
        parts.forEach(function (q) {
          q.r += dt * 120; q.life -= dt * 1.1;
          g.strokeStyle = q.c; g.globalAlpha = Math.max(0, q.life); g.lineWidth = 3;
          g.beginPath(); g.arc(q.x, q.y, q.r, 0, 7); g.stroke(); g.globalAlpha = 1;
        });
      }
    };
    // bossa nova: a sunset over the sea, six guitar strings in the sky, ripples on the notes
    DRAW.bossa = function (dt, time) {
      bg('#f7a35c', '#3b2a5a');
      var low = energy(1, 8), mid = energy(8, 40), hi = energy(40, 90);
      var cx = W * 0.5, sy = H * 0.5, R = Math.min(W, H) * (0.17 + pulse * 0.02 + low * 0.03);
      var sg = g.createRadialGradient(cx, sy, R * 0.2, cx, sy, R * 2.2);
      sg.addColorStop(0, 'rgba(255,240,190,1)'); sg.addColorStop(0.45, 'rgba(255,190,110,0.85)'); sg.addColorStop(1, 'rgba(255,150,90,0)');
      g.fillStyle = sg; g.beginPath(); g.arc(cx, sy, R * 2.2, 0, 7); g.fill();
      var sea = g.createLinearGradient(0, H * 0.58, 0, H);
      sea.addColorStop(0, '#2a6f8f'); sea.addColorStop(1, '#16304d');
      g.fillStyle = sea; g.fillRect(0, H * 0.58, W, H * 0.42);
      for (var k = 0; k < 7; k++) { // sunlight on the water
        var y = H * (0.61 + k * 0.055), w = R * (1.6 - k * 0.16) * (0.8 + mid * 0.6);
        g.fillStyle = 'rgba(255,220,160,' + (0.55 - k * 0.06) + ')';
        g.fillRect(cx - w / 2 + Math.sin(time * 1.4 + k) * 6, y, w, 3);
      }
      for (var s = 0; s < 6; s++) { // strings, shimmering with the high notes
        var y0 = H * (0.12 + s * 0.045), amp = (1.5 + hi * 14 + pulse * 3) * (1 - s * 0.08);
        g.strokeStyle = 'rgba(255,248,230,' + (0.25 + hi * 0.5) + ')'; g.lineWidth = 1 + (5 - s) * 0.25;
        g.beginPath();
        for (var x = 0; x <= W; x += 8) g.lineTo(x, y0 + Math.sin(x / 40 + time * (6 + s)) * amp * Math.sin(Math.PI * x / W));
        g.stroke();
      }
      parts.forEach(function (q) {
        q.r += dt * 30; q.life -= dt * 0.5;
        g.strokeStyle = 'rgba(255,235,200,' + Math.max(0, q.life * 0.7) + ')'; g.lineWidth = 1.5;
        g.beginPath(); g.ellipse(q.x, H * 0.62 + (q.y % (H * 0.33)), q.r, q.r * 0.3, 0, 0, 7); g.stroke();
      });
    };
    raf = requestAnimationFrame(frame);

    function hide() { if (document.hidden && p.isPlaying()) toggle(); }
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('hashchange', function bye() {
      alive = false;
      cancelAnimationFrame(raf);
      p.stop();
      APP.stopSpeaking();
      window.removeEventListener('hashchange', bye);
      window.removeEventListener('resize', size);
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchmove', onScroll);
      document.removeEventListener('visibilitychange', hide);
    });
  }

  // A sung song: the same controls as APP.music.player, playing the recording through an
  // analyser so the visualiser still dances. Positions are in seconds, not bars.
  function sungPlayer(o) {
    var AC = window.AudioContext || window.webkitAudioContext, ctx = new AC();
    var a = new Audio(o.src);
    a.preload = 'auto';
    a.preservesPitch = a.mozPreservesPitch = a.webkitPreservesPitch = true;
    var src = ctx.createMediaElementSource(a), an = ctx.createAnalyser();
    an.fftSize = 512; an.smoothingTimeConstant = 0.6;
    src.connect(an); an.connect(ctx.destination);
    a.addEventListener('loadedmetadata', function () { if (o.onDuration && isFinite(a.duration)) o.onDuration(a.duration); });
    a.addEventListener('ended', function () { if (o.onEnd) o.onEnd(); });
    a.addEventListener('error', function () { if (a.getAttribute('src')) APP.toast('This song needs the internet the first time you play it.'); });
    return {
      ctx: ctx, analyser: an,
      play: function () { if (ctx.state === 'suspended') ctx.resume(); var pr = a.play(); if (pr && pr.catch) pr.catch(function () { if (o.onBlocked) o.onBlocked(); }); },
      pause: function () { a.pause(); },
      stop: function () { a.pause(); a.removeAttribute('src'); a.load(); if (ctx.close) ctx.close().catch(function () {}); },
      seek: function (sec) { try { a.currentTime = Math.max(0, sec); } catch (e) {} },
      position: function () { return a.currentTime || 0; },
      isPlaying: function () { return !a.paused && !a.ended; },
      setVolume: function () {},
      setTempo: function (rate) { a.playbackRate = rate; }
    };
  }

  // Underline this song's key expressions in a line so she can tap them.
  function glossLine(text, words, host) {
    var low = text.toLowerCase(), hits = [];
    words.forEach(function (v) {
      var at = low.indexOf(v.in.toLowerCase());
      if (at >= 0 && !hits.some(function (h) { return at < h.end && at + v.in.length > h.at; })) hits.push({ at: at, end: at + v.in.length, v: v });
    });
    hits.sort(function (a, b) { return a.at - b.at; });
    var lastI = 0;
    hits.forEach(function (h) {
      host.appendChild(document.createTextNode(text.slice(lastI, h.at)));
      var b = btn('gloss', text.slice(h.at, h.end));
      b.addEventListener('click', function (e) { e.stopPropagation(); APP.showGloss(b, h.v); });
      host.appendChild(b);
      lastI = h.end;
    });
    host.appendChild(document.createTextNode(text.slice(lastI)));
  }
})();
