# 📖 Buku Tamu Online — Firebase Firestore

Website buku tamu online berbasis **Firebase Firestore** untuk latihan web development modern.

> **Stack**: HTML5 · CSS3 · Vanilla JavaScript ES6+ · Firebase Firestore  
> **Deployment**: GitHub Pages / Vercel

---

## ✨ Fitur

- ✅ Tambah pesan (Create)
- ✅ Tampilkan semua pesan (Read) — realtime otomatis!
- ✅ Statistik total pesan
- ✅ Validasi form lengkap
- ✅ Dark mode
- ✅ Toast notification
- ✅ Loading spinner
- ✅ Counter karakter (maks. 300)
- ✅ Animasi kartu pesan
- ✅ Responsive mobile & desktop

---

## 📁 Struktur Folder

```
firebase-guestbook/
│
├── index.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── firebase-config.js   ← isi konfigurasi Firebase kamu di sini
│       └── app.js
│
└── README.md
```

---

## 🚀 Cara Setup (Langkah demi Langkah)

### Langkah 1 — Buat Proyek Firebase

1. Buka [https://console.firebase.google.com](https://console.firebase.google.com)
2. Klik **"Add project"**
3. Beri nama proyek, misalnya: `buku-tamu-online`
4. Klik Next → Next → Create project

---

### Langkah 2 — Daftarkan Aplikasi Web

1. Di halaman proyek, klik ikon **`</>`** (Web)
2. Beri nama app, misalnya: `buku-tamu-web`
3. **Jangan centang** Firebase Hosting (kita pakai Vercel)
4. Klik **Register app**
5. **Salin** konfigurasi `firebaseConfig` yang muncul

---

### Langkah 3 — Isi Konfigurasi Firebase

Buka file `assets/js/firebase-config.js` dan ganti bagian ini:

```javascript
const firebaseConfig = {
  apiKey:            "GANTI_DENGAN_API_KEY_KAMU",
  authDomain:        "GANTI_DENGAN_AUTH_DOMAIN_KAMU",
  projectId:         "GANTI_DENGAN_PROJECT_ID_KAMU",
  storageBucket:     "GANTI_DENGAN_STORAGE_BUCKET_KAMU",
  messagingSenderId: "GANTI_DENGAN_MESSAGING_SENDER_ID_KAMU",
  appId:             "GANTI_DENGAN_APP_ID_KAMU"
};
```

Contoh hasil setelah diisi:

```javascript
const firebaseConfig = {
  apiKey:            "AIzaSyABC123...",
  authDomain:        "buku-tamu-online.firebaseapp.com",
  projectId:         "buku-tamu-online",
  storageBucket:     "buku-tamu-online.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123def456"
};
```

---

### Langkah 4 — Aktifkan Firestore Database

1. Di menu kiri Firebase Console, klik **Build → Firestore Database**
2. Klik **Create database**
3. Pilih **"Start in test mode"** → Next
4. Pilih lokasi server (pilih `asia-southeast1` untuk Indonesia) → Done

---

### Langkah 5 — Atur Firestore Security Rules

1. Masuk ke **Firestore Database → Rules**
2. Ganti isinya dengan:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read:   if true;           // Semua bisa baca
      allow create: if true;           // Semua bisa kirim pesan
      allow update, delete: if false;  // Tidak bisa edit/hapus
    }
  }
}
```

3. Klik **Publish**

---

### Langkah 6 — Test di Browser

1. Buka file `index.html` langsung di browser
2. Coba kirim pesan
3. Lihat pesan muncul secara realtime!

> ⚠️ **Catatan**: Karena menggunakan ES Module (`type="module"`), buka via server lokal, bukan double-click file. Gunakan VS Code extension **Live Server**.

---

## 🌐 Deploy ke GitHub + Vercel

### A. Upload ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: Buku Tamu Online Firebase"
git remote add origin https://github.com/USERNAME/firebase-guestbook.git
git push -u origin main
```

### B. Deploy ke Vercel

1. Buka [https://vercel.com](https://vercel.com)
2. Login dengan akun GitHub
3. Klik **"Add New → Project"**
4. Pilih repository `firebase-guestbook`
5. Klik **Deploy** — selesai!

Website kamu otomatis online dengan URL seperti: `https://firebase-guestbook.vercel.app`

---

## 📚 Konsep yang Dipelajari

| Konsep | Implementasi |
|--------|-------------|
| Firebase SDK ES Module | `import { initializeApp } from "..."` |
| Firestore `addDoc` | Tambah dokumen baru (Create) |
| Firestore `onSnapshot` | Baca data realtime (Read) |
| `serverTimestamp` | Waktu dari server, bukan client |
| Firestore Security Rules | Kontrol akses baca/tulis |
| ES Module `import/export` | Modularisasi JavaScript |
| CSS Custom Properties | Theming dark/light mode |
| Deployment Vercel | Hosting gratis via GitHub |

---

## 🔒 Catatan Keamanan

Rules saat ini bersifat **terbuka untuk latihan**. Untuk produksi, tambahkan:
- Rate limiting
- Validasi panjang karakter di Rules
- Firebase Authentication

---

## 💡 Tantangan Selanjutnya

1. **Tombol Like** — update field `likes` di Firestore
2. **Filter nama** — query Firestore dengan `where()`
3. **Pencarian realtime** — filter di sisi client
4. **Pagination** — gunakan `limit()` dan `startAfter()`
5. **Admin dashboard** — Firebase Authentication + role

---

*Dibuat untuk belajar web development modern berbasis cloud. Selamat coding! 🚀*
