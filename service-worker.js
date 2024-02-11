importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script',
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style',
    new workbox.strategies.CacheFirst()
);


let promptShown = false;

self.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the browser's default install prompt
    event.preventDefault();

    // Show the install prompt only if it hasn't been dismissed before
    if (!promptShown) {
        event.prompt();
    }
});

// Set a flag to indicate that the install prompt has been shown
self.addEventListener('appinstalled', () => {
    promptShown = true;
});