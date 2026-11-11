// Isi seluruh aplikasi di desktop. Ubah teks CV di sini.
// Kunci biasa (about, skills, ...) = jendela mode DAY; kunci berakhiran _g = mini game mode NIGHT.
import { gal } from '../engine/gallery.js'
import { shell } from '../games/shell.js'
import { pacGame } from '../games/pacman.js'
import { tetris } from '../games/tetris.js'
import { kong } from '../games/kong.js'
import { invaders } from '../games/invaders.js'

const chip = (a, c = '') => a.map((x) => `<span class="chip ${c}">${x}</span>`).join('')

export const APPS={
about:{type:1,ic:'👻',t:'ME.exe',w:560,h:460,x:130,y:30,h$:`<h2>ABOUT ME</h2>
<h3>Ramdan Nugraha</h3><div class="m">Information Systems Graduate · Web Developer · System Analyst</div>
<p>Lulusan Sistem Informasi Universitas Komputer Indonesia yang memiliki kemampuan dalam analisis proses bisnis, perancangan sistem, serta pengelolaan database. Terbiasa mengembangkan aplikasi berbasis web mulai dari tahap perancangan hingga pengujian, teliti, dan cepat belajar.</p>
<p>Berkomitmen berkontribusi lewat solusi teknologi yang efektif, efisien, dan sesuai kebutuhan organisasi.</p>
<div class="lvl"><small>EDUCATION</small><h3>Universitas Komputer Indonesia</h3>Sarjana Komputer (S.Kom) · IPK 3.77<div class="m">September 2021 – Agustus 2025</div>${gal('me')}</div>`},
skills:{type:1,ic:'🧱',t:'SKILLS.exe',w:540,h:470,x:160,y:50,h$:`<h2>SKILLS</h2>
<h3>Hard skills</h3>${chip(['HTML','CSS','JavaScript','PHP','MySQL','Python','Microsoft Office'])}
<h3 style="margin-top:14px">Soft skills</h3>${chip(['Leadership','Bertanggung Jawab','Public Speaking','Team Work','Komunikasi Efektif'],'m2')}
<h3 style="margin-top:14px">Bahasa</h3>${chip(['Indonesia','English'],'y')}
<h3 style="margin-top:14px">Sertifikasi</h3>${chip(['CCNA · Cisco · 2022','BNSP Programming &amp; Software Dev · Des 2024','TOEFL 403 · Apr 2025'],'p')}`},
exp:{type:1,ic:'🦍',t:'EXPERIENCE.exe',w:600,h:500,x:190,y:70,h$:`<h2>EXPERIENCE</h2>
<div class="lvl"><small>LEVEL 3 · KERJA PRAKTEK</small><h3>DISKOMINFO Pemerintah Daerah Kab. Bandung</h3><div class="m">Agustus – September 2024</div><ul>
<li>Merancang Sistem Informasi Pengadministrasian Umum di lingkungan Pemda Kabupaten Bandung.</li>
<li>Menyusun laporan rancangan sistem: analisis kebutuhan dan pemodelan proses bisnis.</li>
<li>Mengembangkan antarmuka (UI) website yang mudah digunakan.</li>
<li>Memperdalam analisis sistem, perancangan database, dan prinsip desain UI yang user-friendly.</li></ul>${gal('dkm')}</div>
<div class="lvl"><small>LEVEL 2 · HIMASI</small><h3>Wakil Ketua Infokom</h3><div class="m">November 2022 – Oktober 2023</div><ul>
<li>Mendampingi Ketua Divisi dalam perencanaan, pelaksanaan, dan evaluasi program kerja.</li>
<li>Mengkoordinasikan tim publikasi, dokumentasi, dan media informasi.</li>
<li>Mengawasi pembuatan poster, feed media sosial, dan dokumentasi acara.</li>
<li>Mengambil alih tugas Ketua Divisi bila diperlukan, termasuk memimpin rapat.</li></ul></div>
<div class="lvl"><small>LEVEL 1 · HIMASI</small><h3>Staf Infokom</h3><div class="m">November 2021 – Oktober 2022</div><ul>
<li>Publikasi kegiatan, dokumentasi acara, dan penyebaran informasi kepada mahasiswa.</li>
<li>Mengelola media sosial dan website HIMASI, membuat desain poster &amp; konten promosi.</li></ul></div>`},
proj:{type:1,ic:'👾',t:'PROJECTS.exe',w:600,h:500,x:220,y:40,h$:`<h2>PROJECTS</h2>
<div class="lvl"><small>STAGE 1 · MEI – SEPTEMBER 2025</small><h3>Sistem Informasi Inventaris Sarana Sekolah</h3><div class="m">SMA Terpadu Baiturrahman · berbasis web</div>
${chip(['HTML','CSS','JavaScript','PHP','MySQL'])}<ul>
<li>Fitur pendataan barang, pengadaan, peminjaman, dan pengembalian dengan peran admin, guru, bendahara, dan kepala sekolah.</li>
<li>Desain database: ERD, normalisasi, dan struktur relasi.</li>
<li>Pemodelan UML: Use Case, Activity, Sequence, Class Diagram.</li>
<li>Antarmuka responsif dan pengujian sistem sesuai kebutuhan pengguna.</li></ul>${gal('inv')}</div>
<div class="lvl"><small>STAGE 2 · JUNI 2023</small><h3>SiKeMas — Sistem Keuangan Masjid</h3><div class="m">Penelitian &amp; pengabdian masyarakat</div><ul>
<li>Membantu instalasi, konfigurasi, dan uji coba awal sistem di lingkungan masjid.</li>
<li>Melatih pengurus masjid menggunakan aplikasi dan mendampingi masa adaptasi.</li></ul>${gal('sik')}</div>`},
contact:{type:1,ic:'✉️',t:'CONTACT.exe',w:500,h:300,x:250,y:60,h$:`<h2>CONTACT ME</h2><p>Terbuka untuk peluang kerja dan kolaborasi. Pilih salah satu cara untuk menghubungi saya.</p>
<a class="btn" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=ramdan.nugraha261102@gmail.com&amp;su=Halo%20Ramdan" target="_blank" rel="noopener">EMAIL</a><a class="btn" style="background:var(--pur);color:#fff" href="https://wa.me/6285703012983?text=Halo%20Ramdan%2C%20saya%20melihat%20portfolio%20kamu." target="_blank" rel="noopener">WHATSAPP</a><a class="btn" style="background:var(--cyan)" href="https://www.linkedin.com/in/ramdanugraha/" target="_blank" rel="noopener">LINKEDIN</a><a class="btn" style="background:var(--mag)" href="https://github.com/Ramdanugraha-ui" target="_blank" rel="noopener">GITHUB</a>`},
cv:{type:1,ic:'📄',t:'MY CV.exe',w:480,h:360,x:280,y:110,h$:`<h2>MY CV</h2><p>Curriculum Vitae <b>Ramdan Nugraha, S.Kom</b> — Sistem Informasi, UNIKOM (IPK 3.77).</p><p class="m">Ramdan_Nugraha_-_CV.pdf · 306 KB</p><a class="btn" href="/Ramdan_Nugraha_-_CV.pdf" download>DOWNLOAD CV</a>`}
};

APPS.about_g={bgm:'pac',ic:'👻',t:'PAC-MAN.game',w:420,h:600,x:140,y:10,init:pacGame,h$:`<h2>PAC-MAN · NIGHT MODE</h2><div class='hd px' style='font-size:10px;color:var(--yel);margin-bottom:8px'></div><div style='position:relative;max-width:360px'><canvas width='360' height='264' style='width:100%;display:block;border:2px solid var(--mag);touch-action:none'></canvas><div class='ov px' style='position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;background:rgba(5,7,19,.82);color:var(--yel);font-size:12px;text-align:center;line-height:2.2;cursor:pointer'></div></div><div style='display:grid;grid-template-columns:repeat(3,48px);gap:4px;justify-content:center;margin-top:10px'><i></i><button class='btn' data-d='0,-1'>▲</button><i></i><button class='btn' data-d='-1,0'>◀</button><button class='btn' data-d='0,1'>▼</button><button class='btn' data-d='1,0'>▶</button></div><p class='m'>Panah atau WASD untuk bergerak. Makan semua titik, hindari hantu, ambil bulatan kuning untuk melawan mereka.</p>`};
APPS.skills_g={bgm:'tetris',ic:'🧱',t:'TETRIS.game',w:330,h:600,x:170,y:10,init:tetris,h$:shell('TETRIS · NIGHT MODE',240,360,[['\u25c0','l'],['\u25b6','r'],['\u27f3','u'],['\u25bc','d'],['DROP','a']])};
APPS.exp_g={bgm:'kong',ic:'🦍',t:'DONKEY KONG.game',w:420,h:580,x:190,y:10,init:kong,h$:shell('DONKEY KONG · NIGHT MODE',360,320,[['\u25c0','l'],['\u25b6','r'],['\u25b2','u'],['\u25bc','d'],['JUMP','a']])};
APPS.proj_g={bgm:'inv',ic:'👾',t:'SPACE INVADERS.game',w:420,h:560,x:210,y:10,init:invaders,h$:shell('SPACE INVADERS · NIGHT MODE',360,320,[['\u25c0','l'],['FIRE','a'],['\u25b6','r']])};
