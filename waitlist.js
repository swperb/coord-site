// Turns [data-waitlist] links into a Tally popup when site/config.js has a form.
(function () {
  var raw = typeof window.COORD_TALLY_FORM === "string" ? window.COORD_TALLY_FORM.trim() : "";
  var fromUrl = raw.match(/tally\.so\/(?:r|embed)\/([A-Za-z0-9]+)/i);
  var id = fromUrl ? fromUrl[1] : /^[A-Za-z0-9]{4,32}$/.test(raw) ? raw : "";
  var fallback = document.getElementById("waitlist-fallback");
  var open = document.getElementById("waitlist-open");

  if (!id) return;

  if (fallback) fallback.hidden = true;
  if (open) open.hidden = false;

  var href = "https://tally.so/r/" + id;
  document.querySelectorAll("[data-waitlist]").forEach(function (el) {
    el.setAttribute("href", href);
    el.setAttribute("data-tally-open", id);
    el.setAttribute("data-tally-layout", "modal");
  });

  var src = "https://tally.so/widgets/embed.js";
  if (document.querySelector('script[src="' + src + '"]')) return;
  var script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
})();
