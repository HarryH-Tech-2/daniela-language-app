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

warnings.forEach(function (w) { console.log('warn  ' + w); });
errors.forEach(function (e) { console.log('ERROR ' + e); });
console.log(files.length + ' unit file(s) checked, ' + errors.length + ' error(s), ' + warnings.length + ' warning(s).');
process.exit(errors.length ? 1 : 0);
