const CACHE='plant-v2';
const ASSETS=['./index.html','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
self.addEventListener('push',e=>{const d=e.data?e.data.json():{title:'물주기 알림 🌿',body:'오늘 물줄 식물이 있어요!'};e.waitUntil(self.registration.showNotification(d.title,{body:d.body,vibrate:[200,100,200]}));});
