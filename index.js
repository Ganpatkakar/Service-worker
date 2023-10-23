if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(
        function (register) {
            console.log(`Service worker registered ${register.scope}`);
        },
        function (err) {
            console.log("Error with registering service worker");
        }
    )
} else {
    console.log("service worker not available");
}

console.log("Index.js in offline mode");


// Registration => navigator.serviceWorker.register()
// Install event => self.addEventListener('install', () => {})
// Activate event => self.addEventListener('activate', () => {})
// Update/fetch the service worker => self.addEventListener('fetch', () => {})