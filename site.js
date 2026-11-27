/* Pestapora Hadirmu — logika bersama: gerbang kunci, kelopak, reveal, nav */
var KEY = 'pestapora';
var PAGES = [
  {href:'index.html',        mi:'✉️', mt:'Pembuka',     md:'halaman pertama',      r:'-1.5deg'},
  {href:'cerita.html',       mi:'📖', mt:'Cerita Kita', md:'lima lembar',          r:'1.2deg'},
  {href:'galeri.html',       mi:'🎬', mt:'Galeri',      md:'video pendek',         r:'-1deg'},
  {href:'album.html',        mi:'🎵', mt:'Album',       md:'enam lagunya Melia',   r:'1.5deg'},
  {href:'puisi.html', mi:'📜', mt:'Puisi & Sertifikat', md:'sajak & penghargaan', r:'-1.8deg'},
  {href:'pesan.html',  mi:'💌', mt:'Pesan & Surat', md:'lembar terakhir',    r:'1deg'},
  {href:'sertifikat.html', mi:'🏆', mt:'Sertifikat Untukmu', md:'seratus, untuk Melia', r:'-1.2deg'}
];

function spawnPetals(n, burstFrom){
  return; /* kelopak dimatikan total demi scroll ringan (2026-11-27, keluhan lag di MacBook) */
  for(var i=0;i<n;i++){
    var p=document.createElement('div');
    var s=9+Math.random()*12;
    p.style.width=s+'px'; p.style.height=s*0.82+'px';
    if(burstFrom){
      p.className='burst-petal';
      p.style.left='50%'; p.style.top='42%';
      var ang=Math.random()*Math.PI*2, dist=120+Math.random()*240;
      p.style.setProperty('--bx', Math.cos(ang)*dist+'px');
      p.style.setProperty('--by', (Math.sin(ang)*dist-60)+'px');
      p.style.setProperty('--br', (Math.random()*420-210)+'deg');
      var w=document.getElementById('envWrap');
      if(w) w.appendChild(p);
      (function(el){ setTimeout(function(){ el.remove(); },1800); })(p);
    }else{
      p.className='petal';
      if(window.innerWidth<640 && i>=3) return;
      p.style.left=(Math.random()*98)+'vw';
      (function(el){ setTimeout(function(){ el.remove(); },15000+Math.random()*6000); })(p);
      p.style.animationDuration=(9+Math.random()*9)+'s';
      p.style.animationDelay=(-Math.random()*14)+'s';
      document.body.appendChild(p);
    }
  }
}

function unlocked(){ try{ return sessionStorage.getItem('ph_key')===KEY; }catch(e){ return false; } }
function rememberKey(){ try{ sessionStorage.setItem('ph_key', KEY); }catch(e){} }

/* perayaan kunci benar: segel pecah, amplop terbuka, semburan kelopak ke seluruh layar */
function celebrate(){
  var seal=document.getElementById('seal');
  if(seal){ seal.style.transition='transform .35s ease, opacity .35s ease'; seal.style.transform='translate(-50%,-50%) scale(1.9) rotate(18deg)'; seal.style.opacity='0'; }
  /* gelombang pertama: semburan dari segel */
  spawnPetals(18,true);
  /* gelombang kedua dan ketiga: hujan kelopak dari atas layar */
  setTimeout(function(){ spawnPetals(6,false); }, 350);
  setTimeout(function(){ spawnPetals(4,false); }, 900);
  /* layar berkedip hangat sesaat, seperti kilat kamera scrapbook */
  var flash=document.createElement('div');
  flash.style.cssText='position:fixed;inset:0;z-index:90;pointer-events:none;background:radial-gradient(circle at 50% 45%, rgba(255,214,229,.85), rgba(255,214,229,0) 70%);opacity:0;transition:opacity .3s ease';
  document.body.appendChild(flash);
  requestAnimationFrame(function(){ flash.style.opacity='1'; });
  setTimeout(function(){ flash.style.opacity='0'; }, 420);
  setTimeout(function(){ flash.remove(); }, 1200);
}

/* ---------- gerbang kunci (hanya di index.html; kunci sekali per sesi) ---------- */
(function(){
  var gate = document.getElementById('gate');
  if(!gate){
    spawnPetals(6,false);
    document.getElementById('main').classList.add('show');
    var f0=document.getElementById('footer'); if(f0) f0.style.display='block';
    return;
  }
  var form = document.getElementById('gateForm');
  var input = document.getElementById('keyInput');
  var hint = document.getElementById('gateHint');
  var envelope = document.getElementById('envelope');
  spawnPetals(6,false);

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var v=(input.value||'').trim().toLowerCase();
    if(v===KEY){
      hint.textContent='Kuncinya benar. Suratnya dibuka ya.';
      envelope.classList.add('open');
      celebrate();
      rememberKey();
      setTimeout(function(){
        gate.classList.add('gone');
        document.body.classList.remove('locked');
        document.getElementById('main').classList.add('show');
        var f=document.getElementById('footer'); if(f) f.style.display='block';
        initReveal();
      }, 2100);
    }else{
      hint.textContent='Hmm, bukan itu kuncinya. Petunjuk: judul albumnya, satu kata.';
      envelope.classList.remove('shake'); void envelope.offsetWidth;
      envelope.classList.add('shake');
      input.select();
    }
  });

  if(unlocked()){
    /* kunci sudah pernah dimasukkan di halaman lain: buka langsung tanpa animasi panjang */
    gate.classList.add('gone');
    document.body.classList.remove('locked');
    document.getElementById('main').classList.add('show');
    var f=document.getElementById('footer'); if(f) f.style.display='block';
  }
})();

/* ---------- reveal per lembar ---------- */
function initReveal(){
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  },{threshold:.14});
  document.querySelectorAll('.sheet').forEach(function(s){ io.observe(s); });
}
if(unlocked()) initReveal();

/* video adegan: ketuk poster untuk memutar, hanya satu video dalam satu waktu */
(function(){
  var current=null;
  function stopCurrent(){
    if(!current) return;
    var v=current.querySelector('video');
    if(v){ v.pause(); v.remove(); }
    var img=current.querySelector('img.tap-poster');
    if(img) img.style.display='';
    current.classList.remove('playing');
    current=null;
  }
  document.addEventListener('click', function(e){
    var box=e.target.closest('[data-video]');
    if(!box) return;
    if(box===current){ stopCurrent(); return; }
    stopCurrent();
    var img=box.querySelector('img.tap-poster');
    var v=document.createElement('video');
    v.src=box.getAttribute('data-video');
    v.muted=true; v.loop=true; v.playsInline=true; v.autoplay=true;
    if(img){ v.poster=img.getAttribute('src'); img.style.display='none'; }
    box.appendChild(v);
    var p=v.play(); if(p&&p.catch) p.catch(function(){});
    box.classList.add('playing');
    current=box;
  });
})();
