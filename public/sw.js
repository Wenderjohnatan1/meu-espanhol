const CACHE_NAME = 'hablasur-cache-v4';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-512.jpg'
];

// Install Event: cache core assets immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Pre-caching core app shell...');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Pre-caching failed during install (non-blocking):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event: clear any old caches
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

// Fetch Event: Network-First with Cache-Fallback Strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. Completely bypass caching for APIs, live reload, hot-module replacement, and external domains
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

  // 2. Network-First Strategy for all other requests (including HTML, JS, CSS, images)
  // This guarantees that if the user is online, they ALWAYS get the newest code and assets.
  // It completely prevents the white-screen bug caused by stale index.html pointing to deleted hashed assets.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If the response is valid and successful, cache a copy for offline fallback
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // If network is completely offline/failed, retrieve from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If a navigation request fails (fully offline), return the cached index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
