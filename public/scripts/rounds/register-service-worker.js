if ('serviceWorker' in navigator) {
    document.addEventListener('DOMContentLoaded', () => {
        navigator.serviceWorker.register('/rounds/service-worker.js', { scope: '/rounds/new' });
    });
};