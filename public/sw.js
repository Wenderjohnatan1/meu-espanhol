const CACHE_NAME = 'hablasur-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-512.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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

  // Let API, Vite dev tools, hot-reload, and external connections go straight to network
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

  // CRITICAL: Never cache dynamically imported scripts or stylesheets in development/preview.
  // This completely prevents the "Failed to fetch dynamically imported module" white-screen bug!
  const isCodeAsset = 
    url.pathname.endsWith('.js') || 
    url.pathname.endsWith('.ts') || 
    url.pathname.endsWith('.tsx') || 
    url.pathname.endsWith('.css');

  if (isCodeAsset) {
    // Serve directly from network without caching
    event.respondWith(
      fetch(event.request).catch(() => {
        // Fallback to cached version only if it exists in the pre-cached list
        return caches.match(event.request);
      })
    );
    return;
  }

  // Network-First with Cache-Fallback Strategy for the app shell and images
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache valid static requests from our own origin (exclude code assets we handled above)
        if (response && response.status === 200 && response.type === 'basic') {
          // Only cache if it is one of our explicit static assets or manifest
          const shouldCache = ASSETS_TO_CACHE.includes(url.pathname) || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.png');
          if (shouldCache) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
        }
        return response;
      })
      .catch(() => {
        // If fetch fails (completely offline), fallback to Cache
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
