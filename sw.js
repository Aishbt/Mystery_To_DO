const CACHE="planner-cache"

const FILES=[

"/",
"/index.html",
"/styles/main.css",
"/scripts/app.js",
"/scripts/state.js",
"/scripts/tasks.js",
"/scripts/characters.js",
"/scripts/reveal.js"

]

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(CACHE).then(c=>c.addAll(FILES))

)

})

self.addEventListener("fetch",e=>{

e.respondWith(

caches.match(e.request).then(r=>r||fetch(e.request))

)

})