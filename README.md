# Pestapora Hadirmu — Untuk Melia

Website multi-halaman statis: balasan Rafly untuk album "Pestapora Hadirmu" karya Melia D. Pasha.

## Halaman

- `index.html` — gerbang kunci (`pestapora`), amplop pembuka, menu ke halaman lain. Tanpa video.
- `cerita.html` — 5 lembar cerita + video adegan (dosen, catur, uno) disisipkan di bagian yang nyambung.
- `album.html` — pemutar 6 lagu asli + Panggung Batman (menyala saat lagu 5 diputar).
- `puisi.html` — Sajak Perayaan + video doodle + gambar adegan pembacaan puisi (statis).
- `galeri.html` — 7 video adegan sebagai kartu scrapbook (ngambek, baikan, dosen, catur, uno, telepon_ayam, tengil).
- `pesan.html` — sticky notes, sertifikat + kartu, dan surat utuh dari `SURAT_UNTUK_MELIA_FIX.md` (termasuk bagian `[...]` yang memang disisakan).

## Teknis

- Statis murni (HTML/CSS/JS), path relatif, kunci sekali per sesi via `sessionStorage` — halaman lain yang dibuka saat terkunci diarahkan balik ke `index.html` oleh `guard.js`.
- Semua video: `autoplay muted loop playsinline` dengan poster `.jpg` pasangan.
- Gaya bersama di `assets.css`, logika bersama di `site.js`. Font Google via CDN.

## Upload

Upload semua file dan folder ke `htdocs` (InfinityFree) atau root repo (GitHub Pages). Struktur jangan diubah.
