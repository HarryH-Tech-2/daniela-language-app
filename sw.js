// Offline support. The first visit caches every file the app needs; after that the
// app is served from the cache and quietly refreshed in the background when online.
//
// When you add a file, add it to FILES and bump VERSION so installed copies pick it up.
// `node test/files.test.js` checks that every unit in index.html is listed here.
var VERSION = 'v8';
var CACHE = 'dale-' + VERSION;
var FONT_CACHE = 'dale-fonts';
var IMG_CACHE = 'dale-img'; // pictures never change name, so they live outside VERSION

// the list of pictures (sets self.IMAGES)
try { importScripts('data/images.js'); } catch (e) { self.IMAGES = { stories: {}, words: {} }; }

var FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable.png', 'apple-touch-icon.png',
  'js/version.js', 'js/core.js', 'js/exercise.js', 'js/screens.js', 'js/games.js', 'js/talk.js',
  'data/profile.js', 'data/games.js', 'data/talks.js', 'data/images.js',
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
      return Promise.all(keys.filter(function (k) { return k.indexOf('dale-') === 0 && k !== CACHE && k !== FONT_CACHE && k !== IMG_CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
      .then(cachePictures)
  );
});

// After the app itself is cached, fetch the pictures a few at a time in the background.
function cachePictures() {
  var I = self.IMAGES || {}, list = [];
  ['stories', 'words'].forEach(function (k) { Object.keys(I[k] || {}).forEach(function (n) { list.push(I[k][n]); }); });
  return caches.open(IMG_CACHE).then(function (c) {
    function next() {
      var batch = list.splice(0, 6);
      if (!batch.length) return;
      return Promise.all(batch.map(function (u) {
        return c.match(u).then(function (hit) { return hit || c.add(u).catch(function () {}); });
      })).then(next);
    }
    return next();
  });
}

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

  // pictures: cache first, never refreshed
  if (url.pathname.indexOf('/img/') >= 0) {
    e.respondWith(caches.open(IMG_CACHE).then(function (c) {
      return c.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) { if (res && res.ok) c.put(req, res.clone()); return res; });
      });
    }));
    return;
  }

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
