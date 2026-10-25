// Checks that every unit file is loaded by index.html and cached by sw.js, and that
// every file sw.js lists exists. Run: node test/files.test.js
var fs = require('fs'), path = require('path');
var root = path.join(__dirname, '..');
var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
var sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
var errors = [];

fs.readdirSync(path.join(root, 'data/units')).filter(function (f) { return f.endsWith('.js'); }).forEach(function (f) {
  var p = 'data/units/' + f;
  if (html.indexOf('src="' + p + '"') < 0) errors.push(p + ' is not loaded in index.html');
  if (sw.indexOf("'" + p + "'") < 0) errors.push(p + ' is not listed in sw.js');
});
var list = sw.slice(sw.indexOf('var FILES'), sw.indexOf('];'));
(list.match(/'[^']+'/g) || []).map(function (s) { return s.slice(1, -1); }).forEach(function (p) {
  if (p !== './' && !fs.existsSync(path.join(root, p))) errors.push('sw.js lists ' + p + ' but it does not exist');
});
(html.match(/(?:src|href)="([^"#:]+)"/g) || []).map(function (s) { return s.replace(/^(src|href)="|"$/g, ''); }).forEach(function (p) {
  if (!fs.existsSync(path.join(root, p))) errors.push('index.html refers to missing ' + p);
});

errors.forEach(function (e) { console.log('ERROR ' + e); });
console.log(errors.length ? errors.length + ' error(s).' : 'All files wired up.');
process.exit(errors.length ? 1 : 0);
