// Today's 3 words. The same function runs on her phone (js/daily.js: the home card, the
// daily quiz, Review) and on the server (api/nudge.mjs: the three notifications a day), so
// the words in the notifications are always the ones in the quiz.
//
// DAILY_PICK(words, date) -> 3 of `words` for that date ('YYYY-MM-DD', her local day).
// Each word needs `key` (as APP.wordKey: unit + ':' + w) and `group` for word-list words.
// The newest reading words (DAILY_FIRST groups) come first, in list order, three a day;
// after them everything else in a fixed shuffled order, so a word only repeats once
// every word has had its day.
(function (root) {
  var START = '2026-11-13';                   // the first day of the daily words
  var FIRST = ['reading2'];                    // new groups go here, newest first
  function dayNum(s) { var p = String(s).split('-'); return Math.round(Date.UTC(+p[0], p[1] - 1, +p[2]) / 864e5); }
  // FNV-1a: a stable pseudo-random number for each word, the same in every browser and in Node
  function hash(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h;
  }
  function order(words) {
    var first = [], rest = [];
    FIRST.forEach(function (g) { words.forEach(function (v) { if (v.group === g) first.push(v); }); });
    words.forEach(function (v) { if (first.indexOf(v) < 0) rest.push(v); });
    rest.sort(function (a, b) { return hash(a.key) - hash(b.key) || (a.key < b.key ? -1 : 1); });
    return first.concat(rest);
  }
  root.DAILY_PICK = function (words, date) {
    if (!words.length) return [];
    var all = order(words), n = all.length;
    var i = dayNum(date) - dayNum(START);
    var at = ((i * 3) % n + n) % n, out = [];
    for (var j = 0; j < Math.min(3, n); j++) out.push(all[(at + j) % n]);
    return out;
  };
  root.DAILY_PICK.START = START;
})(typeof window !== 'undefined' ? window : globalThis);
