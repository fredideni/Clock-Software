self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('uhr-app').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/script.js',
                'https://pixabay.com/de/vectors/zeit-uhrzeit-uhr-zeitanzeige-icon-1606153'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

function showNotification() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification('Uhr-App', {
                body: 'Es ist Zeit, auf die Uhr zu schauen!',
                icon: '/icon.png'
            });
        }
    });
}
