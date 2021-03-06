const staticCacheName = 'static-cache-v1';
const dynamicCacheName = 'dynamic-cache-v1';
const urlsToCache = [
    '/'
];

function limitCacheSize(name = dynamicCacheName, size = 15) {
    caches
        .open(name)
        .then(cache =>
            cache.keys().then(keys => {
                if (keys.length > size) {
                    caches.delete(keys[0]).then(limitCacheSize(name, size));
                }
            })
        )
        .catch(err => console.error('Error during limiting cache: ', err));
}

self.addEventListener('install', e => {
    e.waitUntil(
        caches
            .open(staticCacheName)
            .then(caches => caches.addAll(urlsToCache))
            .catch(err => console.error('Error when caching assets: ', err))
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches
            .keys()
            .then(keys => {
                Promise.all(
                    keys
                        .filter(
                            key =>
                                key !== staticCacheName &&
                                key !== dynamicCacheName
                        )
                        .map(key => caches.delete(key))
                );
            })
            .catch(err =>
                console.error('Error during deleting of old caches: ', err)
            )
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches
            .match(e.request)
            .then(
                cacheRes =>
                    cacheRes ||
                    fetch(e.request).then(fetchRes => {
                        if (
                            !fetchRes ||
                            fetchRes.status !== 200 ||
                            fetchRes.type !== 'basic'
                        ) {
                            return fetchRes;
                        }
                        const responseToCache = fetchRes.clone();
                        caches.open(dynamicCacheName).then(cache => {
                            cache.put(e.request.url, responseToCache);
                            limitCacheSize(dynamicCacheName, 15);
                        });
                        return fetchRes;
                    })
            )
            .catch(err =>
                console.error(
                    'Error during calling or dynamic setting for cache: ',
                    err
                )
            )
    );
});
