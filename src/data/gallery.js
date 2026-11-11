// Daftar foto/screenshot (g = grup, k = nama file di public/img, r = label peran, c = keterangan)
export const GAL = [
 {
  "g": "me",
  "k": "wis",
  "r": "",
  "c": "Wisuda ke-44 UNIKOM · November 2025"
 },
 {
  "g": "inv",
  "k": "i1",
  "r": "LOGIN",
  "c": "Halaman Login"
 },
 {
  "g": "inv",
  "k": "i2",
  "r": "ROLE: ADMIN",
  "c": "Dashboard"
 },
 {
  "g": "inv",
  "k": "i3",
  "r": "",
  "c": "Daftar Barang"
 },
 {
  "g": "inv",
  "k": "i4",
  "r": "",
  "c": "Tambah Barang"
 },
 {
  "g": "inv",
  "k": "i5",
  "r": "",
  "c": "Pengadaan Barang"
 },
 {
  "g": "inv",
  "k": "i6",
  "r": "",
  "c": "Validasi Peminjaman"
 },
 {
  "g": "inv",
  "k": "i7",
  "r": "",
  "c": "Validasi Pengembalian"
 },
 {
  "g": "inv",
  "k": "i8",
  "r": "",
  "c": "Pemindahan Barang"
 },
 {
  "g": "inv",
  "k": "i9",
  "r": "",
  "c": "Maintenance Barang"
 },
 {
  "g": "inv",
  "k": "i10",
  "r": "",
  "c": "Laporan Rekapitulasi"
 },
 {
  "g": "inv",
  "k": "i11",
  "r": "",
  "c": "Tambah User"
 },
 {
  "g": "inv",
  "k": "i12",
  "r": "",
  "c": "Pengaturan Akun"
 },
 {
  "g": "inv",
  "k": "i13",
  "r": "ROLE: GURU",
  "c": "Daftar Barang"
 },
 {
  "g": "inv",
  "k": "i14",
  "r": "",
  "c": "Form Peminjaman"
 },
 {
  "g": "inv",
  "k": "i15",
  "r": "",
  "c": "Ajukan Pengembalian"
 },
 {
  "g": "inv",
  "k": "i16",
  "r": "ROLE: KEPALA SEKOLAH",
  "c": "Daftar Barang"
 },
 {
  "g": "inv",
  "k": "i17",
  "r": "",
  "c": "Validasi Pengadaan"
 },
 {
  "g": "inv",
  "k": "i18",
  "r": "ROLE: BENDAHARA",
  "c": "Pengadaan Barang"
 },
 {
  "g": "inv",
  "k": "i19",
  "r": "",
  "c": "Upload Invoice"
 },
 {
  "g": "inv",
  "k": "i20",
  "r": "",
  "c": "Surat Pengadaan (PDF)"
 },
 {
  "g": "sik",
  "k": "sik",
  "r": "",
  "c": "Pelatihan SiKeMas bersama dosen dan pengurus masjid"
 },
 {
  "g": "dkm",
  "k": "dkm",
  "r": "",
  "c": "Kerja praktek di DISKOMINFO (aplikasi SIAKU)"
 }
]

export const IMG = Object.fromEntries([...new Set(GAL.map((e) => e.k))].map((k) => [k, `/img/${k}.webp`]))
