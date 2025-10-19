// js/include.js
(function () {
  async function loadIncludes() {
    const nodes = document.querySelectorAll("[data-include]");
    for (const el of nodes) {
      const url = el.getAttribute("data-include");
      try {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(res.status + " " + res.statusText);
        const html = await res.text();
        el.innerHTML = html;
      } catch (err) {
        console.error("include.js: failed to load", url, err);
        // اختياري: رسالة بسيطة بدل الهيدر
        el.innerHTML = "";
      }
    }
    // علّم الصفحات إن الـ partials اتحمّلت
    document.dispatchEvent(new CustomEvent("partials:loaded"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
})();
