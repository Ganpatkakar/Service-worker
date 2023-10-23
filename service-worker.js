const CacheName = 'initial-service-worker-test';
const CacheFiles = [
    'index.js',
    'index.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CacheName).then(
            (cache) => {
                console.log("cache is opened");
                return cache.addAll(CacheFiles);
            },
            (err) => {
                console.log('failed to register all caches', err);
            }
        )
    );
});

self.addEventListener('activate', (event) => {
    console.log("service worker activate event");
});

self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    event.respondWith(
        caches.match(event.request).then(
            (response) => {
                if (event.request === '/index.html') {
                    if (navigator.onLine) {
                        console.log('online mode and fetching index.html');
                        return fetch(event.request);
                      }
                }
                if (response) {
                    return response;
                }
                return fetch(event.request)
                .then(
                    (response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseClone = response.clone();
                        caches.open(CacheName).then((cache) => {
                            return cache.put(event.request, responseClone);
                        });
                        return responseClone;
                    }
                )
                .catch((err) => {
                    console.log("Error with fetching", event.request);
                });
            }
        )
    )
});