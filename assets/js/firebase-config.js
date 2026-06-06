// ============================================================
// firebase-config.js
// Konfigurasi dan inisialisasi Firebase + Firestore
// ============================================================
//
// CARA SETUP:
// 1. Buka https://console.firebase.google.com
// 2. Klik "Add project" → beri nama proyek
// 3. Masuk ke Project Settings → Your apps → Add app → Web (</>)
// 4. Salin konfigurasi firebaseConfig dan tempelkan di sini
// 5. Aktifkan Firestore: Build → Firestore Database → Create database
// 6. Pilih mode "Start in test mode" untuk latihan
// 7. Atur Firestore Rules (lihat README.md)
//
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore }   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔧 GANTI dengan konfigurasi Firebase proyekmu sendiri!
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUMgs_A3J_NX-LQrcIkNHYzI_VKdiLWH4",
    authDomain: "bukutamu-7d358.firebaseapp.com",
    projectId: "bukutamu-7d358",
    storageBucket: "bukutamu-7d358.firebasestorage.app",
    messagingSenderId: "289636669285",
    appId: "1:289636669285:web:829a2160b7466bb098f38c",
    measurementId: "G-6DLE6MG0VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore Database
const db = getFirestore(app);

// Export agar bisa digunakan di app.js
export { db };
