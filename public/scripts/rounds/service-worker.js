const CACHE_NAME = 'CGS v.2022.06.22';
const FILES_TO_CACHE = [
    '/rounds/new',
    '../../images/favicons/android-chrome-192x192.png',
    '../../images/favicons/android-chrome-512x512.png',
    '../../images/favicons/apple-touch-icon.png',
    '../../images/favicons/favicon-16x16.png',
    '../../images/favicons/favicon-32x32.png',
    '../../images/favicons/favicon.ico',
    '../../images/favicons/site.webmanifest',
    '../../images/logo.jfif',
    '../../scripts/create-element.js',
    '../../scripts/demerits/select-rule.js',
    '../../scripts/rounds/demerits/add.js',
    '../../scripts/rounds/demerits/remove.js',
    '../../scripts/rounds/demerits/update-references.js',
    '../../scripts/rounds/demerits/validate.js',
    '../../scripts/rounds/accordion-buttons.js',
    '../../scripts/rounds/change-date.js',
    '../../scripts/rounds/connection.js',
    '../../scripts/rounds/handle-modals.js',
    '../../scripts/rounds/pagination.js',
    '../../scripts/rounds/register-service-worker.js',
    '../../scripts/rounds/select-course.js',
    '../../scripts/rounds/select-game.js',
    '../../scripts/rounds/select-player.js',
    '../../scripts/rounds/select-tee.js',
    '../../scripts/rounds/shared-functions.js',
    '../../scripts/rounds/update.js',
    '../../scripts/rounds/validate.js',
    '../../styles/main.css',
    '../../styles/tables.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
            .catch(() => caches.open(CACHE_NAME)
            .then(cache => cache.match(e.request)))
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map(cacheName => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});