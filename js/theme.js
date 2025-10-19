// ========== PPM Tabuk Theme Toggle ==========
(function(){
  const KEY = 'ppm_theme';
  const root = document.documentElement;

  // تطبيق الثيم الحالي من localStorage أو الافتراضي
  function apply(theme){
    if(theme === 'dark'){
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(KEY, theme || 'light');
  }

  // تحميل الثيم عند بداية الصفحة
  const saved = localStorage.getItem(KEY) || 'light';
  apply(saved);

  // دالة التبديل
  window.toggleTheme = function(){
    const isDark = root.getAttribute('data-theme') === 'dark';
    apply(isDark ? 'light' : 'dark');
  };
})();
