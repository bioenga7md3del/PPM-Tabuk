/* =========================================================
   🔁 include.js — تحميل الهيدر الموحد وتفعيل اللينك النشط
   ========================================================= */
document.addEventListener("DOMContentLoaded", async () => {
  // تحميل العناصر اللي فيها data-include
  const includes = document.querySelectorAll("[data-include]");
  for (const el of includes) {
    const file = el.getAttribute("data-include");
    try {
      const res = await fetch(file);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.error("Include error:", file, err);
    }
  }

  // لما يخلص التحميل كله
  document.dispatchEvent(new Event("partials:loaded"));
});

/* =========================================================
   🌈 تفعيل اللينك النشط في الهيدر تلقائيًا
   ========================================================= */
document.addEventListener("partials:loaded", () => {
  const current = location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll("#mainNav a");

  navLinks.forEach(link => {
    const href = link.getAttribute("data-to")?.toLowerCase() || "";
    if (!href) return;

    // تحقق بسيط من وجود اسم المجلد الحالي في الرابط
    if (current.includes(`/${href}/`)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
