/* ========== include.js: تحميل الـpartial وتفعيل السلوك ========== */
document.addEventListener("DOMContentLoaded", async () => {
  const includes = document.querySelectorAll("[data-include]");
  for (const el of includes) {
    const file = el.getAttribute("data-include");
    try { const r = await fetch(file); el.innerHTML = await r.text(); }
    catch (e) { console.error("Include error:", file, e); }
  }
  document.dispatchEvent(new Event("partials:loaded"));
});

/* تمييز اللينك النشط تلقائيًا */
document.addEventListener("partials:loaded", () => {
  const current = location.pathname.toLowerCase();
  const links = document.querySelectorAll("#mainNav a, .dd-panel a");
  links.forEach(a => {
    const to = (a.getAttribute("data-to") || "").toLowerCase();
    if (to && current.includes(`/${to}/`)) a.classList.add("active");
  });

  // زر Logout لو موجود
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout && window.firebase?.auth) {
    // تُركت كما هي إن كنت بتربطها في الصفحات
  }

  // ===== سلوك Corrective: يفتح بالضغط =====
  const ddCorrective = document.querySelector('.dd[data-dd="corrective"]');
  if (ddCorrective) {
    const btn = ddCorrective.querySelector(".dd-btn");
    const panel = ddCorrective.querySelector(".dd-panel");
    const open = () => ddCorrective.classList.add("open");
    const close = () => ddCorrective.classList.remove("open");
    const toggle = (e) => { e.preventDefault(); e.stopPropagation(); ddCorrective.classList.toggle("open"); };

    btn?.addEventListener("click", toggle);
    document.addEventListener("click", (e)=>{ if (!ddCorrective.contains(e.target)) close(); });
    document.addEventListener("keydown", (e)=>{ if (e.key === "Escape") close(); });
  }

  // ===== سلوك Sites: هوفر فقط (الضغط يوجّه للرابط) =====
  const ddSites = document.querySelector('.dd[data-dd="sites"]');
  if (ddSites) {
    let hoverTimer;
    const open = () => ddSites.classList.add("hover-open");
    const close = () => ddSites.classList.remove("hover-open");

    ddSites.addEventListener("mouseenter", ()=>{
      clearTimeout(hoverTimer); open();
    });
    ddSites.addEventListener("mouseleave", ()=>{
      hoverTimer = setTimeout(close, 100);
    });
    // مفيش منع للضغط على رابط Sites نفسه — هيفتح صفحة Sites عادي
  }
});
