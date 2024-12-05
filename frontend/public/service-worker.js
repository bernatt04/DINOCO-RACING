const CACHE_NAME = 'bernardos-co-cache-v1';
const urlsToCache = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/styles/tailwind.css',
  '/styles/globals.css',
  // Agrega otros recursos estáticos aquí
];

// Instalar el Service Worker y cachear recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar las solicitudes y servir desde el cache si está disponible
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Devuelve el recurso desde el cache
      }
      return fetch(event.request); // Realiza la solicitud de red si no está en cache
    })
  );
});

// Actualizar el cache cuando se detecta una nueva versión
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Elimina caches antiguos
          }
        })
      );
    })
  );
});
