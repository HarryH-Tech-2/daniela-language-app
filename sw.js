// Offline support. The first visit caches every file the app needs; after that the
// app is served from the cache and quietly refreshed in the background when online.
//
// When you add a file, add it to FILES and bump VERSION so installed copies pick it up.
// `node test/files.test.js` checks that every unit in index.html is listed here.
var VERSION = 'v1';
var CACHE = 'dale-' + VERSION;
var FONT_CACHE = 'dale-fonts';

var FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable.png', 'apple-touch-icon.png',
  'js/core.js', 'js/exercise.js', 'js/screens.js', 'js/games.js',
  'data/profile.js', 'data/games.js',
  'data/units/home.js', 'data/units/dance.js', 'data/units/kitchen.js', 'data/units/dogs.js',
  'data/units/plans.js', 'data/units/law-basics.js', 'data/units/crime.js', 'data/units/gossip.js',
  'data/units/style.js', 'data/units/wellness.js', 'data/units/love.js', 'data/units/abroad.js',
  'data/units/regrets.js', 'data/units/mystery.js', 'data/units/career.js', 'data/units/formal.js',
  'data/units/stage.js', 'data/units/critic.js', 'data/units/contracts.js', 'data/units/debate.js',
  'data/units/native.js', 'data/units/true-crime.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES.map(function (f) { return new Request(f, { cache: 'reload' }); })); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k.indexOf('dale-') === 0 && k !== CACHE && k !== FONT_CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Google Fonts: cache once, keep forever
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONT_CACHE).then(function (c) {
      return c.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) {
          if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
          return res;
        }).catch(function () { return new Response('', { status: 504 }); });
      });
    }));
    return;
  }
  if (url.origin !== location.origin) return;

  // App files: the cached copy at once, a fresh one fetched behind it for next time.
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(req, { ignoreSearch: true }).then(function (hit) {
      var refresh = fetch(req, { cache: 'no-cache' }).then(function (res) {
        if (res && res.ok) c.put(req, res.clone());
        return res;
      }).catch(function () { return hit; });
      if (hit) { e.waitUntil(refresh); return hit; }
      return refresh.then(function (res) { return res || (req.mode === 'navigate' ? c.match('./') : res); });
    });
  }));
});
