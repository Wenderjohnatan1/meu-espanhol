const CACHE_NAME = 'hablasur-cache-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-512.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Pre-caching PWA shell...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old PWA cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Let API, Vite dev tools, hot-reload, and external connections go straight to network
  if (
    url.pathname.startsWith('/api') || 
    url.pathname.includes('/@vite/') || 
    url.pathname.includes('__vite_ping') ||
    url.pathname.includes('/node_modules/') ||
    url.pathname.startsWith('/src/') ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  // 2. Production Bundle Assets (/assets/*)
  // These contain hashed names (e.g. index-ChPzD149.js) so they are immutable and safe to cache long-term.
  // We use a Cache-First strategy to ensure they load instantly even if offline or session cookies are missing.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // 3. Network-First with Cache-Fallback Strategy for the app shell, manifest, and static images
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache valid static requests from our own origin
        if (response && response.status === 200 && response.type === 'basic') {
          const isStaticAsset = 
            ASSETS_TO_CACHE.includes(url.pathname) || 
            url.pathname.endsWith('.jpg') || 
            url.pathname.endsWith('.png') ||
            url.pathname.endsWith('.json');

          if (isStaticAsset) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
        }
        return response;
      })
      .catch(() => {
        // If fetch fails (offline or unauthenticated standalone launch), serve from Cache
        return caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If a navigation request fails completely, return cached index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html', { ignoreSearch: true });
          }
        });
      })
  );
});
