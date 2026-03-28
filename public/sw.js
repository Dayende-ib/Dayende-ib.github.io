// Placeholder service worker file for static hosting.
// Prevents /sw.js requests from being resolved by dynamic app routes.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // No-op
});
