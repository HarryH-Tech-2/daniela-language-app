// A tiny band made of Web Audio oscillators and noise, so the songs need no audio files
// and work offline. Three styles: calm (pad, electric piano, soft pulse), samba (surdo,
// tamborim, ganzá, cavaquinho, bass) and salsa (clave 2-3, cowbell, congas, piano montuno,
// bass tumbao).
//
// var p = APP.music.player({ style, bpm, key, chords, bars, onBeat(kind, time) });
// p.play(fromBar); p.pause(); p.position() -> bars since the start; p.analyser; p.ctx
(function () {
  var APP = window.APP;
  var NOTE = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
  var QUALITY = {
    '': [0, 4, 7], m: [0, 3, 7], '7': [0, 4, 7, 10], maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10], '6': [0, 4, 7, 9],
    m6: [0, 3, 7, 9], '9': [0, 4, 7, 10, 14], m9: [0, 3, 7, 10, 14], add9: [0, 4, 7, 14], sus4: [0, 5, 7],
    '7sus4': [0, 5, 7, 10], m7b5: [0, 3, 6, 10], dim: [0, 3, 6]
  };
  function parseChord(name) {
    var m = /^([A-G][#b]?)(.*)$/.exec(name);
    if (!m || NOTE[m[1]] === undefined || !QUALITY[m[2]]) throw new Error('Unknown chord ' + name);
    return { root: NOTE[m[1]], iv: QUALITY[m[2]] };
  }
  APP.parseChord = parseChord;
  function hz(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }
  // chord tones placed between midi lo and lo+12, in order
  function voicing(ch, lo) {
    return ch.iv.map(function (i) { var n = 48 + ch.root + i; while (n < lo) n += 12; while (n >= lo + 12) n -= 12; return n; })
      .sort(function (a, b) { return a - b; });
  }

  var ctx = null, master = null, noise = null;
  function setup() {
    if (ctx) return ctx;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createDynamicsCompressor();
    master.threshold.value = -14; master.ratio.value = 4;
    master.connect(ctx.destination);
    var len = ctx.sampleRate, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    noise = buf;
    return ctx;
  }

  /* ---------- instruments: each plays one note at time t into out ---------- */

  function env(g, t, peak, attack, decay) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }
  function osc(out, type, f, t, peak, attack, decay, f2) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + Math.min(decay, 0.2));
    env(g, t, peak, attack, decay);
    o.connect(g); g.connect(out);
    o.start(t); o.stop(t + attack + decay + 0.05);
    return o;
  }
  function hiss(out, t, peak, decay, type, freq, q) {
    var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noise;
    s.playbackRate.value = 0.8 + Math.random() * 0.4;
    f.type = type; f.frequency.value = freq; f.Q.value = q || 1;
    env(g, t, peak, 0.003, decay);
    s.connect(f); f.connect(g); g.connect(out);
    s.start(t, Math.random() * 0.5); s.stop(t + decay + 0.05);
  }
  var I = {
    kick: function (o, t, v) { osc(o, 'sine', 130, t, 0.9 * v, 0.004, 0.38, 42); },
    surdo: function (o, t, v, open) { osc(o, 'sine', 95, t, 0.9 * v, 0.006, open ? 0.7 : 0.16, 52); hiss(o, t, 0.08 * v, 0.05, 'lowpass', 900); },
    shaker: function (o, t, v) { hiss(o, t, 0.16 * v, 0.045, 'highpass', 6500); },
    brush: function (o, t, v) { hiss(o, t, 0.12 * v, 0.18, 'bandpass', 3500, 0.7); },
    tamborim: function (o, t, v) { osc(o, 'triangle', 820, t, 0.22 * v, 0.002, 0.07); hiss(o, t, 0.14 * v, 0.04, 'bandpass', 4200, 2); },
    clave: function (o, t, v) { osc(o, 'sine', 2480, t, 0.32 * v, 0.001, 0.07); },
    cowbell: function (o, t, v) {
      var f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 2; f.connect(o);
      osc(f, 'square', 560, t, 0.22 * v, 0.002, 0.22); osc(f, 'square', 845, t, 0.16 * v, 0.002, 0.18);
    },
    conga: function (o, t, v, kind) {
      if (kind === 'slap') { osc(o, 'sine', 330, t, 0.35 * v, 0.002, 0.07, 280); hiss(o, t, 0.25 * v, 0.06, 'bandpass', 1800, 1.5); }
      else if (kind === 'low') osc(o, 'sine', 170, t, 0.6 * v, 0.003, 0.32, 150);
      else if (kind === 'open') osc(o, 'sine', 235, t, 0.55 * v, 0.003, 0.28, 215);
      else osc(o, 'sine', 210, t, 0.16 * v, 0.003, 0.06); // heel / toe
    },
    bass: function (o, t, v, midi, dur) {
      var f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 700; f.connect(o);
      osc(f, 'triangle', hz(midi), t, 0.5 * v, 0.008, dur);
      osc(f, 'sine', hz(midi), t, 0.45 * v, 0.008, dur);
    },
    pad: function (o, t, v, notes, dur) {
      var f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1100; f.Q.value = 0.5; f.connect(o);
      notes.forEach(function (n) {
        [-6, 6].forEach(function (cents) {
          var x = ctx.createOscillator(), g = ctx.createGain();
          x.type = 'sawtooth'; x.frequency.value = hz(n); x.detune.value = cents;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.022 * v, t + dur * 0.35);
          g.gain.linearRampToValueAtTime(0.018 * v, t + dur * 0.8);
          g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.6);
          x.connect(g); g.connect(f);
          x.start(t); x.stop(t + dur + 0.7);
        });
      });
    },
    ep: function (o, t, v, midi, dur) { // soft electric piano
      osc(o, 'sine', hz(midi), t, 0.2 * v, 0.006, dur);
      osc(o, 'sine', hz(midi) * 2, t, 0.05 * v, 0.004, dur * 0.4);
    },
    piano: function (o, t, v, midi) {
      osc(o, 'triangle', hz(midi), t, 0.22 * v, 0.003, 0.32);
      osc(o, 'sine', hz(midi) * 2, t, 0.07 * v, 0.002, 0.15);
    },
    cavaco: function (o, t, v, notes) {
      var f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1600; f.Q.value = 0.8; f.connect(o);
      notes.forEach(function (n, i) { osc(f, 'sawtooth', hz(n), t + i * 0.008, 0.07 * v, 0.003, 0.14); });
    },
    sparkle: function (o, t, v, midi) { osc(o, 'sine', hz(midi), t, 0.07 * v, 0.01, 1.4); }
  };

  /* ---------- the arrangements: what plays on 16th-note step s of a bar ---------- */

  // b = bar number from the start; ch / next = this bar's and the next bar's chords
  var STYLES = {
    calm: function (o, t, s, b, ch, next, beat, emit) {
      if (s === 0) {
        I.pad(o, t, 1, voicing(ch, 55), beat * 4);
        I.bass(o, t, 0.8, 36 + ch.root, beat * 2.5);
        I.kick(o, t, 0.35); emit('kick', t);
      }
      if (s === 8) { I.bass(o, t, 0.6, 36 + ch.root + 7 - (ch.root + 7 >= 12 ? 12 : 0), beat * 1.6); }
      if (s === 10) { I.kick(o, t, 0.22); emit('soft', t); }
      if (s === 4 || s === 12) I.brush(o, t, 0.6);
      if (s % 2 === 0) { // rolling arpeggio, up and back down
        var v = voicing(ch, 62), seq = [0, 1, 2, 3, 2, 1, 2, 3], n = v[seq[s / 2] % v.length];
        I.ep(o, t, s % 4 === 0 ? 1 : 0.7, n, beat * 1.2);
        emit('note', t, n);
      }
      if (s === 6 && Math.random() < 0.35) I.sparkle(o, t, 1, voicing(ch, 79)[Math.floor(Math.random() * 3)]);
    },
    samba: function (o, t, s, b, ch, next, beat, emit) {
      if (s % 4 === 0) { var strong = s === 4 || s === 12; I.surdo(o, t, strong ? 1 : 0.55, strong); emit(strong ? 'kick' : 'soft', t); }
      I.shaker(o, t, s % 4 === 3 ? 1 : s % 2 ? 0.45 : 0.65);
      if ([0, 3, 6, 8, 10, 11, 14].indexOf(s) >= 0) { I.tamborim(o, t, s === 0 || s === 8 ? 1 : 0.7); emit('hit', t); }
      if ([0, 3, 6, 10, 12].indexOf(s) >= 0) { I.cavaco(o, t, s === 0 ? 1 : 0.8, voicing(ch, 60)); emit('chord', t); }
      var fifth = ch.root + 7 >= 12 ? ch.root - 5 : ch.root + 7;
      if (s === 0) I.bass(o, t, 0.9, 36 + ch.root, beat * 0.9);
      if (s === 6) I.bass(o, t, 0.6, 36 + fifth, beat * 0.4);
      if (s === 8) I.bass(o, t, 0.85, 36 + fifth, beat * 0.9);
      if (s === 14) I.bass(o, t, 0.6, 36 + ch.root, beat * 0.4);
    },
    salsa: function (o, t, s, b, ch, next, beat, emit) {
      var three = b % 2 === 1; // 2-3 son clave: the "2" bar first
      if ((!three && (s === 4 || s === 8)) || (three && (s === 0 || s === 6 || s === 12))) { I.clave(o, t, 1); emit('clave', t); }
      if (s % 4 === 0) I.cowbell(o, t, s === 0 || s === 8 ? 1 : 0.6);
      if (s === 4) { I.conga(o, t, 1, 'slap'); emit('hit', t); }
      else if (s === 12 || s === 14) { I.conga(o, t, 1, 'open'); emit('kick', t); }
      else if (s === 15) I.conga(o, t, 0.8, 'low');
      else if (s % 2 === 0) I.conga(o, t, 1, 'tap');
      // bass tumbao: the "and" of 2, then beat 4 anticipates the next chord
      var fifth = ch.root + 7 >= 12 ? ch.root - 5 : ch.root + 7;
      if (s === 6) I.bass(o, t, 0.9, 36 + fifth, beat * 1.4);
      if (s === 12) I.bass(o, t, 1, 36 + next.root, beat * 2.2);
      // piano montuno: a syncopated two-handed pattern in octaves
      var v = voicing(ch, 60), m = { 0: 0, 3: 1, 4: 2, 6: 1, 8: 0, 10: 2, 11: 1, 14: 2 }[s];
      if (m !== undefined) { I.piano(o, t, 1, v[m]); I.piano(o, t, 0.6, v[m] + 12); emit('note', t, v[m]); }
    }
  };

  APP.music = {
    styles: Object.keys(STYLES),
    player: function (song) {
      setup();
      var chords = song.chords.map(parseChord);
      var analyser = ctx.createAnalyser();
      analyser.fftSize = 256; analyser.smoothingTimeConstant = 0.82;
      analyser.connect(master);
      var vol = ctx.createGain();
      vol.gain.value = 0.8;
      vol.connect(analyser);
      var bus = null, timer = null, startAt = 0, nextStep = 0, playing = false, fromBar = 0;
      var tempo = song.bpm;
      function stepLen() { return 60 / tempo / 4; }
      function tick() {
        var ahead = ctx.currentTime + 0.15;
        while (startAt + nextStep * stepLen() < ahead) {
          var bar = Math.floor(nextStep / 16), s = nextStep % 16;
          if (bar >= song.bars) { var end = startAt + nextStep * stepLen(); stop(); if (song.onEnd) setTimeout(song.onEnd, Math.max(0, (end - ctx.currentTime) * 1000)); return; }
          var t = Math.max(startAt + nextStep * stepLen(), ctx.currentTime);
          var ch = chords[bar % chords.length], next = chords[(bar + 1) % chords.length];
          var lastBar = bar === song.bars - 1;
          if (!(lastBar && s > 0)) STYLES[song.style](bus, t, lastBar ? 0 : s, bar, ch, next, stepLen() * 4, emit);
          nextStep++;
        }
      }
      function emit(kind, t, n) { if (song.onBeat) song.onBeat(kind, t, n); }
      function stop() {
        playing = false;
        clearInterval(timer); timer = null;
        if (bus) {
          var b = bus;
          b.gain.setTargetAtTime(0, ctx.currentTime, 0.04);
          setTimeout(function () { try { b.disconnect(); } catch (e) {} }, 400);
          bus = null;
        }
      }
      return {
        ctx: ctx, analyser: analyser,
        isPlaying: function () { return playing; },
        setTempo: function (bpm) { var at = this.position(); tempo = bpm; if (playing) this.play(at); else fromBar = at; },
        setVolume: function (x) { vol.gain.setTargetAtTime(x, ctx.currentTime, 0.1); },
        barLength: function () { return stepLen() * 16; },
        // in bars, with fractions
        position: function () {
          if (!playing) return fromBar;
          return Math.max(0, (ctx.currentTime - startAt) / (stepLen() * 16));
        },
        play: function (bar) {
          if (bar === undefined) bar = fromBar;
          stop();
          if (ctx.state === 'suspended') ctx.resume();
          bus = ctx.createGain();
          bus.connect(vol);
          var whole = Math.floor(bar);
          nextStep = whole * 16;
          startAt = ctx.currentTime + 0.06 - whole * stepLen() * 16;
          playing = true;
          tick();
          timer = setInterval(tick, 25);
        },
        seek: function (bar) { if (playing) this.play(bar); else fromBar = bar; },
        pause: function () { fromBar = this.position(); stop(); },
        stop: function () { fromBar = 0; stop(); }
      };
    }
  };
})();
