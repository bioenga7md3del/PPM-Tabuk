// js/theme.js
(function(){
  const KEY = 'ppm-theme';  // 'light' | 'dark'

  function apply(theme){
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    // حط كلاس للمساعدة لو حبيت في CSS
    root.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem(KEY, theme); } catch {}
  }

  // اختار القيمة المبدئية
  const stored = (()=>{ try { return localStorage.getItem(KEY); } catch { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(stored || (prefersDark ? 'dark' : 'light'));

  // متاح عالميًا
  window.toggleTheme = function(){
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    apply(cur === 'light' ? 'dark' : 'light');
  };
})();
