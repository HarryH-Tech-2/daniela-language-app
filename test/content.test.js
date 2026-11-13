// Checks every unit file and data/games.js against CONTENT.md.
// node test/content.test.js            -> all files
// node test/content.test.js dance love -> just those units (games are always checked if present)
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
var errors = [], warnings = [];
function err(where, msg) { errors.push(where + ': ' + msg); }
function warn(where, msg) { warnings.push(where + ': ' + msg); }
function str(v) { return typeof v === 'string' && v.trim().length > 0; }
function words(s) { return s.split(/\s+/).filter(Boolean).length; }

function load(file) {
  var sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
  return sandbox.window;
}

var only = process.argv.slice(2);
var dir = path.join(root, 'data/units');
var files = fs.readdirSync(dir).filter(function (f) { return f.endsWith('.js'); });
if (only.length) files = files.filter(function (f) { return only.indexOf(f.slice(0, -3)) >= 0; });

var POS = ['noun', 'verb', 'adjective', 'adverb', 'phrase', 'phrasal verb', 'idiom', 'preposition', 'conjunction'];
var READ = { 1: [170, 270], 2: [210, 320], 3: [250, 360], 4: [290, 440] };
var MIN = { 1: 60, 2: 80, 3: 100, 4: 120 };
var orders = {};

function checkEx(where, x, counts) {
  var k = x.kind;
  counts[k] = (counts[k] || 0) + 1;
  if (x.why !== undefined && !str(x.why)) err(where, 'why is empty');
  function opts() {
    if (!str(x.right)) err(where, 'needs right');
    if (!Array.isArray(x.wrong) || x.wrong.length < 2 || x.wrong.length > 3 || !x.wrong.every(str)) err(where, 'wrong needs 2-3 strings');
    else {
      var all = [x.right].concat(x.wrong).map(function (s) { return s.trim().toLowerCase(); });
      if (new Set(all).size !== all.length) err(where, 'duplicate options');
    }
  }
  function gap(t) {
    if (!str(t) || t.split('{gap}').length !== 2) err(where, 'text needs exactly one {gap}');
  }
  if (k === 'choice') { if (!str(x.q)) err(where, 'needs q'); opts(); }
  else if (k === 'gap') { gap(x.text); opts(); }
  else if (k === 'tf') { if (!str(x.s)) err(where, 'needs s'); if (typeof x.answer !== 'boolean') err(where, 'answer must be true/false'); }
  else if (k === 'type') {
    gap(x.text);
    if (!Array.isArray(x.answers) || !x.answers.length || !x.answers.every(str)) err(where, 'answers needs strings');
  }
  else if (k === 'order') {
    if (!Array.isArray(x.words) || x.words.length < 4 || x.words.length > 12 || !x.words.every(str)) err(where, 'words needs 4-12 strings');
  }
  else if (k === 'match') {
    if (!Array.isArray(x.pairs) || x.pairs.length < 4 || x.pairs.length > 5) err(where, 'pairs needs 4-5');
    else {
      if (!x.pairs.every(function (p) { return Array.isArray(p) && p.length === 2 && str(p[0]) && str(p[1]); })) err(where, 'each pair is [left, right]');
      var l = x.pairs.map(function (p) { return String(p[0]).toLowerCase(); }), r = x.pairs.map(function (p) { return String(p[1]).toLowerCase(); });
      if (new Set(l).size !== l.length || new Set(r).size !== r.length) err(where, 'pairs not unique');
    }
  }
  else if (k === 'listen') {
    if (!str(x.say)) err(where, 'needs say');
    else if (words(x.say) < 4 || words(x.say) > 18) warn(where, 'listen sentence is ' + words(x.say) + ' words');
  }
  else err(where, 'unknown kind ' + k);
}

files.forEach(function (f) {
  var where = 'units/' + f, w;
  try { w = load(path.join(dir, f)); } catch (e) { err(where, 'does not run: ' + e.message); return; }
  var list = w.UNITS || [];
  if (list.length !== 1) { err(where, 'should push exactly one unit, pushed ' + list.length); return; }
  var u = list[0];
  if (u.id + '.js' !== f) err(where, 'id ' + u.id + ' does not match file name');
  if ([1, 2, 3, 4].indexOf(u.stage) < 0) err(where, 'stage must be 1-4');
  if (!(u.order >= 1 && u.order <= 30)) err(where, 'order must be 1-30');
  if (orders[u.order]) err(where, 'order ' + u.order + ' also used by ' + orders[u.order]); else orders[u.order] = u.id;
  ['emoji', 'title', 'topic', 'intro'].forEach(function (k) { if (!str(u[k])) err(where, 'needs ' + k); });

  if (!Array.isArray(u.vocab) || u.vocab.length !== 10) err(where, 'vocab needs exactly 10');
  (u.vocab || []).forEach(function (v, i) {
    var at = where + ' vocab[' + i + '] ' + (v && v.w);
    ['w', 'pos', 'def', 'ex', 'es'].forEach(function (k) { if (!str(v[k])) err(at, 'needs ' + k); });
    if (v.pos && POS.indexOf(v.pos) < 0) err(at, 'pos "' + v.pos + '" not allowed');
    if (str(v.w) && str(v.ex)) {
      var stem = v.w.toLowerCase().split(/[\s(]/)[0].replace(/[^a-z']/g, '').slice(0, Math.max(3, Math.min(5, v.w.length - 2)));
      if (v.ex.toLowerCase().indexOf(stem) < 0) warn(at, 'example may not contain the word');
    }
  });

  var r = u.reading || {};
  if (!str(r.title)) err(where, 'reading needs title');
  if (!Array.isArray(r.text) || r.text.length < 3 || r.text.length > 7 || !r.text.every(str)) err(where, 'reading.text needs 3-7 paragraphs');
  else {
    var n = words(r.text.join(' ')), lim = READ[u.stage];
    if (lim && (n < lim[0] || n > lim[1])) warn(where, 'reading is ' + n + ' words (aim ' + lim[0] + '-' + lim[1] + ')');
  }

  var g = u.grammar || {};
  if (!str(g.title)) err(where, 'grammar needs title');
  if (!Array.isArray(g.explain) || g.explain.length < 2 || g.explain.length > 6 || !g.explain.every(str)) err(where, 'grammar.explain needs 2-6');
  if (!Array.isArray(g.examples) || g.examples.length < 3 || g.examples.length > 7 || !g.examples.every(function (e) { return e && str(e.en); })) err(where, 'grammar.examples needs 3-7 with en');
  if (!str(g.tip)) err(where, 'grammar needs tip');

  var counts = {};
  if (!Array.isArray(u.exercises) || u.exercises.length < 12 || u.exercises.length > 16) err(where, 'exercises needs 12-16 (has ' + (u.exercises || []).length + ')');
  (u.exercises || []).forEach(function (x, i) { checkEx(where + ' ex[' + i + '] ' + (x && x.kind), x || {}, counts); });
  ['type', 'order', 'match', 'listen'].forEach(function (k) { if (!counts[k]) warn(where, 'no ' + k + ' exercise'); });

  if (!Array.isArray(u.speak) || u.speak.length < 2 || !u.speak.every(str)) err(where, 'speak needs 2+ prompts');
  var wr = u.write || {};
  if (!str(wr.prompt)) err(where, 'write needs prompt');
  if (wr.min !== MIN[u.stage]) warn(where, 'write.min should be ' + MIN[u.stage]);
  if (!Array.isArray(wr.useWords) || wr.useWords.length < 3 || wr.useWords.length > 5) err(where, 'write.useWords needs 3-5');
});

var gamesFile = path.join(root, 'data/games.js');
if (fs.existsSync(gamesFile)) {
  var G;
  try { G = load(gamesFile).GAMES; } catch (e) { err('games.js', 'does not run: ' + e.message); }
  if (G) {
    var spec = {
      falseFriends: [['en', 'es', 'means', 'instead', 'ex'], 40],
      mistakes: [['s', 'why'], 70],
      phrasal: [['pv', 'def', 'ex'], 50],
      idioms: [['idiom', 'meaning', 'ex'], 40],
      pairs: [['a', 'b', 'sound'], 35],
      rescue: [['w', 'clue'], 50]
    };
    Object.keys(spec).forEach(function (k) {
      var list = G[k];
      if (!Array.isArray(list)) { err('games.js', 'missing ' + k); return; }
      if (list.length < spec[k][1]) warn('games.js', k + ' has ' + list.length + ' (aim ' + spec[k][1] + '+)');
      var seen = {};
      list.forEach(function (it, i) {
        var at = 'games.' + k + '[' + i + ']';
        spec[k][0].forEach(function (f) { if (!str(it[f])) err(at, 'needs ' + f); });
        var key = JSON.stringify(it[spec[k][0][0]]).toLowerCase();
        if (seen[key]) err(at, 'duplicate ' + key); seen[key] = 1;
      });
    });
    (G.mistakes || []).forEach(function (m, i) {
      var at = 'games.mistakes[' + i + ']';
      if (typeof m.ok !== 'boolean') err(at, 'ok must be true/false');
      if (m.ok === false && !str(m.fix)) err(at, 'wrong sentence needs fix');
    });
    var okCount = (G.mistakes || []).filter(function (m) { return m.ok; }).length;
    if (G.mistakes && (okCount < G.mistakes.length * 0.3 || okCount > G.mistakes.length * 0.6)) warn('games.js', 'mistakes: ' + okCount + ' of ' + G.mistakes.length + ' are correct (aim 35-50%)');
    (G.idioms || []).forEach(function (m, i) {
      if (!Array.isArray(m.wrong) || m.wrong.length < 2 || !m.wrong.every(str)) err('games.idioms[' + i + ']', 'wrong needs 2-3 strings');
    });
    (G.rescue || []).forEach(function (m, i) {
      if (!/^[a-z]{4,12}$/.test(m.w || '')) err('games.rescue[' + i + ']', 'w must be 4-12 lowercase letters a-z');
    });
  }
}

var everyFile = path.join(root, 'data/everyday.js');
if (fs.existsSync(everyFile)) {
  var E;
  try { E = load(everyFile).EVERYDAY; } catch (e) { err('everyday.js', 'does not run: ' + e.message); }
  if (E) {
    var allP = {};
    E.forEach(function (g, gi) {
      var gat = 'everyday[' + (g.id || gi) + ']';
      ['id', 'icon', 'title', 'short', 'intro'].forEach(function (f) { if (!str(g[f])) err(gat, 'needs ' + f); });
      if (!Array.isArray(g.items) || g.items.length < 12) { err(gat, 'needs 12+ items (the quiz uses 12)'); return; }
      var ps = g.items.map(function (v) { return v.p; }), firstEs = {};
      g.items.forEach(function (v, i) {
        var at = gat + '.items[' + i + ']';
        ['p', 'def', 'es', 'ex'].forEach(function (f) { if (!str(v[f])) err(at, 'needs ' + f); });
        if (v.note !== undefined && !str(v.note)) err(at, 'note must be a string');
        var key = String(v.p).toLowerCase();
        if (allP[key]) err(at, 'duplicate ' + v.p); allP[key] = 1;
        var es1 = String(v.es).split(' / ')[0];
        if (firstEs[es1]) err(at, 'same Spanish as another item: ' + es1); firstEs[es1] = 1;
        (v.near || []).forEach(function (n) { if (ps.indexOf(n) < 0) err(at, 'near lists ' + n + ', which is not in this group'); });
        var left = g.items.filter(function (o) { return o !== v && (v.near || []).indexOf(o.p) < 0 && (o.near || []).indexOf(v.p) < 0; });
        if (left.length < 3) err(at, 'fewer than 3 wrong options left after near');
      });
    });
  }
}

var SONG_TIMES = {};
if (fs.existsSync(path.join(root, 'data/song-times.js'))) {
  try { SONG_TIMES = load(path.join(root, 'data/song-times.js')).SONG_TIMES || {}; } catch (e) { err('song-times.js', 'does not run: ' + e.message); }
}
var songFile = path.join(root, 'data/songs.js');
if (fs.existsSync(songFile)) {
  var SG;
  try { SG = load(songFile).SONGS; } catch (e) { err('songs.js', 'does not run: ' + e.message); }
  if (SG) {
    var QUAL = /^[A-G][#b]?(|m|7|maj7|m7|6|m6|9|m9|add9|sus4|7sus4|m7b5|dim)$/, ids = {}, allW = {}, allEs = {};
    SG.forEach(function (s, si) {
      var at = 'songs[' + (s.id || si) + ']';
      ['id', 'style', 'emoji', 'title', 'by', 'intro'].forEach(function (f) { if (!str(s[f])) err(at, 'needs ' + f); });
      if (ids[s.id]) err(at, 'duplicate id'); ids[s.id] = 1;
      if (s.audio !== undefined) {
        // a sung song: a recording made by tools/songs.mjs
        if (['salsa', 'bossa'].indexOf(s.style) < 0) err(at, 'a sung song’s style must be salsa or bossa');
        if (s.audio !== 'audio/songs/' + s.id + '.mp3') err(at, 'audio must be audio/songs/' + s.id + '.mp3');
        else if (!fs.existsSync(path.join(root, s.audio))) err(at, s.audio + ' is missing: run node tools/songs.mjs');
        if (!Array.isArray(s.sound) || s.sound.length < 4 || !s.sound.every(str)) err(at, 'needs sound: 4+ style strings for the music model');
        if (!(s.lineSec >= 3 && s.lineSec <= 8)) err(at, 'lineSec should be 3-8 seconds');
        if (!str(s.level)) err(at, 'needs level');
      } else {
        if (!str(s.key)) err(at, 'needs key');
        if (['calm', 'samba', 'salsa'].indexOf(s.style) < 0) err(at, 'style must be calm, samba or salsa');
        if (!(s.bpm >= 50 && s.bpm <= 140)) err(at, 'bpm should be 50-140');
        if (!Array.isArray(s.chords) || !s.chords.length) err(at, 'needs chords');
        else s.chords.forEach(function (c) { if (!QUAL.test(c)) err(at, 'unknown chord ' + c); });
      }
      var lines = [];
      (s.parts || []).forEach(function (p, pi) {
        if (!str(p.part) || !Array.isArray(p.lines) || !p.lines.length || !p.lines.every(str)) err(at + '.parts[' + pi + ']', 'needs part and lines');
        else lines = lines.concat(p.lines);
      });
      if (lines.length < 12) err(at, 'needs 12+ lines');
      (s.audio ? s.parts : []).forEach(function (p) { if (p.lines.length > 30 || p.lines.some(function (l) { return l.length > 200; })) err(at, p.part + ': the music model takes at most 30 lines of 200 characters per part'); });
      var T = SONG_TIMES[s.id];
      if (T && (!Array.isArray(T.lines) || T.lines.length !== lines.length)) err(at, 'data/song-times.js has ' + (T.lines || []).length + ' lines but the song has ' + lines.length + ': run node tools/songs.mjs --align ' + s.id);
      lines.forEach(function (l) { if (words(l) > 16) warn(at, 'long line (hard to sing or read in time): ' + l); });
      var text = lines.join('\n').toLowerCase();
      if (!Array.isArray(s.words) || s.words.length < 5) err(at, 'needs 5+ words (the quiz uses them)');
      else s.words.forEach(function (v, i) {
        var wat = at + '.words[' + i + ']';
        ['w', 'in', 'def', 'es'].forEach(function (f) { if (!str(v[f])) err(wat, 'needs ' + f); });
        if (str(v.in) && text.indexOf(v.in.toLowerCase()) < 0) err(wat, '“' + v.in + '” is not in the lyrics');
        var k = String(v.w).toLowerCase();
        if (allW[k]) err(wat, 'duplicate word ' + v.w); allW[k] = 1;
        var es1 = String(v.es).split(' / ')[0];
        if (allEs[es1]) err(wat, 'same Spanish as another word: ' + es1); allEs[es1] = 1;
      });
      if (!Array.isArray(s.notes) || s.notes.length < 2 || !s.notes.every(function (n) { return str(n.h) && str(n.t); })) err(at, 'needs 2+ notes with h and t');
    });
  }
}

var wlFile = path.join(root, 'data/wordlist.js');
if (fs.existsSync(wlFile)) {
  var WL;
  try { WL = load(wlFile).WORDLIST; } catch (e) { err('wordlist.js', 'does not run: ' + e.message); }
  if (WL) {
    var allL = {}, POS = ['noun', 'verb', 'adjective', 'adverb', 'phrase', 'phrasal verb', 'idiom', 'preposition', 'conjunction'];
    WL.forEach(function (g, gi) {
      var gat = 'wordlist[' + (g.id || gi) + ']';
      ['id', 'icon', 'title', 'short', 'intro'].forEach(function (f) { if (!str(g[f])) err(gat, 'needs ' + f); });
      if (!Array.isArray(g.items) || g.items.length < 12) { err(gat, 'needs 12+ items (the quiz uses 12)'); return; }
      var ws = g.items.map(function (v) { return v.w; }), firstEs = {};
      g.items.forEach(function (v, i) {
        var at = gat + '.items[' + (v.w || i) + ']';
        ['w', 'pos', 'def', 'es', 'ex'].forEach(function (f) { if (!str(v[f])) err(at, 'needs ' + f); });
        if (POS.indexOf(v.pos) < 0) err(at, 'unknown pos ' + v.pos);
        if (v.note !== undefined && !str(v.note)) err(at, 'note must be a string');
        if (!str(v.ipa) || !/^\/[^/]+\/$/.test(v.ipa)) err(at, 'needs ipa, in slashes: /ˈwɪzdəm/');
        if (!str(v.pron)) err(at, 'needs pron, an easy respelling: WIZ-dum');
        var key = String(v.w).toLowerCase();
        if (allL[key]) err(at, 'duplicate ' + v.w); allL[key] = 1;
        var es1 = String(v.es).split(' / ')[0];
        if (firstEs[es1]) err(at, 'same Spanish as another item: ' + es1); firstEs[es1] = 1;
        (v.near || []).forEach(function (n) { if (ws.indexOf(n) < 0) err(at, 'near lists ' + n + ', which is not in this group'); });
      });
    });
    if (!allL.beyond) err('wordlist', 'should include “beyond”');
  }
}

var exFile = path.join(root, 'data/explain.js');
if (fs.existsSync(exFile)) {
  var EX;
  try { EX = load(exFile).EXPLAIN; } catch (e) { err('explain.js', 'does not run: ' + e.message); }
  if (EX) {
    var exIds = {};
    EX.forEach(function (x, xi) {
      var at = 'explain[' + (x.id || xi) + ']';
      ['id', 'emoji', 'q', 'short', 'tip'].forEach(function (f) { if (!str(x[f])) err(at, 'needs ' + f); });
      if (exIds[x.id]) err(at, 'duplicate id'); exIds[x.id] = 1;
      if (!Array.isArray(x.parts) || !x.parts.length || !x.parts.every(function (p) { return str(p.h) && str(p.t); })) err(at, 'needs parts with h and t');
      if (!Array.isArray(x.examples) || x.examples.length < 2 || !x.examples.every(function (e) { return str(e.en) && typeof e.ok === 'boolean'; })) err(at, 'needs 2+ examples with en and ok');
      (x.check || []).forEach(function (c, ci) {
        var cat = at + '.check[' + ci + ']';
        if (!str(c.q) || c.q.split('{gap}').length !== 2) err(cat, 'q needs {gap} exactly once');
        if (!str(c.right) || !Array.isArray(c.wrong) || c.wrong.length < 1 || c.wrong.indexOf(c.right) >= 0) err(cat, 'needs right and 1-3 different wrong');
      });
    });
  }
}

warnings.forEach(function (w) { console.log('warn  ' + w); });
errors.forEach(function (e) { console.log('ERROR ' + e); });
console.log(files.length + ' unit file(s) checked, ' + errors.length + ' error(s), ' + warnings.length + ' warning(s).');
process.exit(errors.length ? 1 : 0);
