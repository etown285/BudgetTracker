const FILES_TO_CACHE = [ 
    "/", 
    "/index.html",
    "/index.js", 
    "/style.css", 
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
]; 

const STATIC_CACHE = "static-cache-v1"; 
const DATA_CACHE_NAME = "data-cache-v1" 

self.addEventListener("install", function(evt) {
    evt.waitUntil(
      caches.open(STATIC_CACHE).then(cache => {
        console.log("Cached");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
    self.skipWaiting();
  });

  self.addEventListener("activate", event => {
    const currentCaches = [STATIC_CACHE, DATA_CACHE_NAME];
    event.waitUntil(
      caches
        .keys()
        .then(cacheNames => {
          // return array of cache names that are old to delete
          return cacheNames.filter(
            cacheName => !currentCaches.includes(cacheName)
          );
        })
        .then(cachesToDelete => {
          return Promise.all(
            cachesToDelete.map(cacheToDelete => {
              return caches.delete(cacheToDelete);
            })
          );
        })
        .then(() => self.clients.claim())
    );
  });