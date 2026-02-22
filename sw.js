self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open("mystery-v1").then(cache=>{
      return cache.addAll([
        "./",
        "./index.html",
        "./gallery.html",
        "./stats.html",
        "./styles.css",
        "./script.js"
      ]);
    })
  );
});
