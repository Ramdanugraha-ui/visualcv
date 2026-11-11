# Retro Arcade Portfolio — Ramdan Nugraha

Portfolio interaktif bertema **Windows 95 + arcade**: *Two Lives, One Player* (DAY = kerja, NIGHT = gaming).
Dibangun dengan **React + Vite**. Isi CV, 4 mini game (Pac-Man, Tetris, Donkey Kong, Space Invaders), musik, dan efek suara sudah termasuk.

## Menjalankan di komputer

Butuh [Node.js](https://nodejs.org) versi 18 atau lebih baru.

```bash
npm install      # sekali saja
npm run dev      # buka http://localhost:5173
npm run build    # hasil produksi ada di folder dist/
npm run preview  # coba hasil build
```

## Publikasi ke Vercel

### Cara A — lewat GitHub (disarankan, otomatis update)
1. Buat repository baru di GitHub, lalu unggah seluruh isi folder ini (folder `node_modules` dan `dist` sudah diabaikan oleh `.gitignore`).
   ```bash
   git init && git add . && git commit -m "Retro arcade portfolio"
   git branch -M main
   git remote add origin https://github.com/Ramdanugraha-ui/NAMA-REPO.git
   git push -u origin main
   ```
2. Buka [vercel.com](https://vercel.com) → **Add New… → Project** → pilih repository tadi.
3. Vercel mengenali **Vite** otomatis. Biarkan: Build Command `npm run build`, Output Directory `dist`. Klik **Deploy**.
4. Setiap `git push` berikutnya akan memperbarui website otomatis.

### Cara B — lewat terminal (tanpa GitHub)
```bash
npm i -g vercel
vercel           # pertama kali: ikuti pertanyaan (login, nama project)
vercel --prod    # publikasi ke alamat produksi
```

### Domain sendiri
Vercel → Project → **Settings → Domains** → tambahkan domain (mis. `ramdannugraha.my.id`), lalu ikuti petunjuk DNS yang muncul.

## Struktur project

```
public/                 file statis (disajikan apa adanya)
  Ramdan_Nugraha_-_CV.pdf   ← file untuk tombol DOWNLOAD CV
  img/                      screenshot & foto (webp)
  audio/bgm/                musik latar: day, night, tetris, kong, inv
  audio/sfx/                efek suara
src/
  data/apps.js          ← ISI CV: teks tiap aplikasi (About, Skills, Experience, Projects, Contact, CV)
  data/gallery.js       ← daftar foto/screenshot untuk slider
  components/           komponen React (desktop, jendela, taskbar, karakter, dll.)
  engine/               audio, sprite karakter, efek mengetik, galeri, latar skyline
  games/                kode 4 mini game
  styles.css            seluruh tampilan
```

## Cara mengubah isi

- **Teks CV / pengalaman / kontak:** edit `src/data/apps.js` (teksnya berupa HTML sederhana).
- **Ganti file CV:** timpa `public/Ramdan_Nugraha_-_CV.pdf` dengan nama yang sama.
- **Tambah foto atau screenshot:** simpan di `public/img/` (disarankan .webp, lebar ≤ 900 px), lalu tambahkan satu baris di `src/data/gallery.js` (`g` = grup, `k` = nama file tanpa ekstensi, `c` = keterangan).
- **Ganti musik:** timpa file di `public/audio/bgm/` (day = desktop siang, night = desktop malam, tetris/kong/inv = musik tiap game).
- **Ganti efek suara:** timpa file di `public/audio/sfx/`. Pemakaian tiap suara ada di `src/engine/audio.js` dan `src/App.jsx`.
- **Warna:** variabel di bagian atas `src/styles.css` (`:root` untuk DAY, `body[data-mode=night]` untuk NIGHT).

## Catatan
- Musik baru berbunyi setelah pengunjung menekan **PRESS START** (aturan autoplay browser). Tombol 🔊 di taskbar mematikan semua suara.
- Font (Press Start 2P, VT323, Inter) dimuat dari Google Fonts, jadi butuh internet saat dibuka.
