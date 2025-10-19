<!-- js/include.js -->
<script>
/**
 * يشحن أي عنصر فيه data-include="path/to/file.html"
 * بعد التحميل: لو الملف هو header.html → يضبط روابط الناف (ديناميكي) ويعلّم الصفحة الحالية Active
 */
(async function(){
  // احسب مستوى العمق علشان نبني روابط صحيحة من أي صفحة
  function pathDepth(){
    // مثال: /modules/preventive/index.html → depth = 2
    const parts = location.pathname.split('/').filter(Boolean);
    // لو شغال على GitHub Pages تحت /PPM-Tabuk/ خليه يعتبر أول جزء هو اسم الريبو
    if (parts[0] && parts[0].toLowerCase().includes('ppm-tabuk')) parts.shift();
    // شيل اسم الملف
    if (parts.length && parts[parts.length-1].includes('.')) parts.pop();
    return parts.length;
  }
  function prefix(){
    const d = pathDepth();
    return d===0 ? './' : ('../'.repeat(d));
  }

  // تحميل كل العناصر
  const nodes = document.querySelectorAll('[data-include]');
  for (const el of nodes){
    const url = el.getAttribute('data-include');
    try{
      const res = await fetch(url);
      const html = await res.text();
      el.innerHTML = html;

      // لو دا الهيدر: اضبط الروابط و الـ active
      if (/header\.html$/i.test(url)){
        const pre = prefix();
        const map = {
          dashboard:  'modules/dashboard/index.html',
          assets:     'modules/assets/index.html',
          preventive: 'modules/preventive/index.html',
          corrective: 'modules/corrective/index.html',
          sites:      'modules/sites/index.html',
          users:      'modules/users/index.html'
        };
        // اضبط href لكل لينك
        document.querySelectorAll('#mainNav a[data-to]').forEach(a=>{
          const key = a.getAttribute('data-to');
          a.setAttribute('href', pre + (map[key]||''));
        });

        // حدد التاب الحالي بناءً على المسار
        const path = location.pathname.toLowerCase();
        document.querySelectorAll('#mainNav a').forEach(a=>{
          a.classList.remove('font-bold','text-sky-300');
        });
        const active = [...document.querySelectorAll('#mainNav a[data-to]')].find(a=>{
          const key = a.getAttribute('data-to');
          return path.includes('/'+key+'/');
        });
        if (active){
          active.classList.add('font-bold','text-sky-300');
        }

        // لو عندك كود تسجيل الخروج في الصفحة نفسها، الزر موجود بالـid نفسه
        // تقدر تسيب الليسنر اللي بالصفحة يشتغل زي ما هو.
      }
    }catch(err){
      console.error('Include failed for', url, err);
    }
  }
})();
</script>
