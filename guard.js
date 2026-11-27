/* redirect balik ke beranda kalau gerbang belum terbuka di sesi ini (halaman non-index) */
(function(){
  var KEY='pestapora', ok=false;
  try{ ok = sessionStorage.getItem('ph_key')===KEY; }catch(e){}
  if(!ok && location.pathname.indexOf('index.html')===-1 && location.pathname.slice(-1)!=='/'){
    location.replace('index.html');
  }
})();
