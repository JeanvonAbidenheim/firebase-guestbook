// ============================================================
// app.js
// Logika utama Buku Tamu Online 
// Fungsi: addMessage, loadMessages, updateStatistics, validateForm
// + Dark mode, Toast notification, Character counter
// ============================================================

import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ─── Referensi Koleksi Firestore ───────────────────────────
const messagesRef = collection(db, "messages");

// ─── DOM Elements ──────────────────────────────────────────
const inputName    = document.getElementById("inputName");
const inputMessage = document.getElementById("inputMessage");
const btnSend      = document.getElementById("btnSend");
const btnText      = document.getElementById("btnText");
const btnSpinner   = document.getElementById("btnSpinner");
const messageList  = document.getElementById("messageList");
const emptyState   = document.getElementById("emptyState");
const loadingEl    = document.getElementById("loadingMessages");
const totalEl      = document.getElementById("totalMessages");
const charCountEl  = document.getElementById("charCount");
const errorName    = document.getElementById("errorName");
const errorMessage = document.getElementById("errorMessage");
const themeToggle  = document.getElementById("themeToggle");
const themeIcon    = document.getElementById("themeIcon");

// ─── 1. validateForm() ─────────────────────────────────────
// Validasi input sebelum dikirim ke Firestore
function validateForm() {
  let valid = true;

  // Reset error
  errorName.textContent    = "";
  errorMessage.textContent = "";
  inputName.style.borderColor    = "";
  inputMessage.style.borderColor = "";

  const name    = inputName.value.trim();
  const message = inputMessage.value.trim();

  if (!name) {
    errorName.textContent        = "⚠️ Nama tidak boleh kosong.";
    inputName.style.borderColor  = "var(--error)";
    valid = false;
  }

  if (!message) {
    errorMessage.textContent        = "⚠️ Pesan tidak boleh kosong.";
    inputMessage.style.borderColor  = "var(--error)";
    valid = false;
  } else if (message.length > 300) {
    errorMessage.textContent        = "⚠️ Pesan maksimal 300 karakter.";
    inputMessage.style.borderColor  = "var(--error)";
    valid = false;
  }

  return valid;
}

// ─── 2. addMessage() ───────────────────────────────────────
// Menambahkan pesan baru ke Firestore
async function addMessage() {
  if (!validateForm()) return;

  const name    = inputName.value.trim();
  const message = inputMessage.value.trim();

  // Tampilkan loading state pada tombol
  setButtonLoading(true);

  try {
    // Simpan dokumen ke Firestore collection "messages"
    await addDoc(messagesRef, {
      name:      name,
      message:   message,
      createdAt: serverTimestamp()   // Timestamp dari server Firebase
    });

    // Bersihkan form setelah sukses
    inputName.value    = "";
    inputMessage.value = "";
    updateCharCount();

    showToast("✅ Pesan berhasil dikirim!", "success");

  } catch (error) {
    console.error("Error menambah pesan:", error);
    showToast("❌ Gagal mengirim pesan. Cek koneksi kamu.", "error");
  } finally {
    setButtonLoading(false);
  }
}

// ─── 3. loadMessages() ─────────────────────────────────────
// Mengambil dan menampilkan seluruh pesan dari Firestore secara realtime
function loadMessages() {
  // Query: urutkan dari pesan terbaru (descending)
  const q = query(messagesRef, orderBy("createdAt", "desc"));

  // onSnapshot = listener realtime (update otomatis saat data berubah)
  onSnapshot(q, (snapshot) => {
    // Sembunyikan loading
    loadingEl.classList.add("hidden");

    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    // Update statistik
    updateStatistics(messages.length);

    // Tampilkan pesan atau empty state
    if (messages.length === 0) {
      messageList.classList.add("hidden");
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");
    messageList.classList.remove("hidden");

    // Render semua kartu pesan
    messageList.innerHTML = messages.map(renderMessageCard).join("");

  }, (error) => {
    console.error("Error memuat pesan:", error);
    loadingEl.classList.add("hidden");
    showToast("❌ Gagal memuat pesan dari database.", "error");
  });
}

// ─── Render HTML satu kartu pesan ──────────────────────────
function renderMessageCard(data) {
  const initial = data.name ? data.name.charAt(0).toUpperCase() : "?";
  const dateStr = formatDate(data.createdAt);
  const safeMessage = escapeHTML(data.message);
  const safeName    = escapeHTML(data.name);

  return `
    <article class="message-card">
      <div class="message-header">
        <div class="message-avatar">${initial}</div>
        <div class="message-meta">
          <span class="message-name">👤 ${safeName}</span>
          <span class="message-time">${dateStr}</span>
        </div>
      </div>
      <p class="message-body">${safeMessage}</p>
    </article>
  `;
}

// ─── 4. updateStatistics() ─────────────────────────────────
// Menampilkan jumlah total pesan
function updateStatistics(count) {
  totalEl.textContent = count;
}

// ─── Helper: Format Tanggal ─────────────────────────────────
function formatDate(timestamp) {
  if (!timestamp) return "Baru saja";

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("id-ID", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
    hour:  "2-digit",
    minute:"2-digit"
  });
}

// ─── Helper: Escape HTML (keamanan XSS) ────────────────────
function escapeHTML(str) {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#039;");
}

// ─── Helper: Loading state tombol ──────────────────────────
function setButtonLoading(isLoading) {
  btnSend.disabled = isLoading;
  if (isLoading) {
    btnText.textContent = "Mengirim...";
    btnSpinner.classList.remove("hidden");
  } else {
    btnText.textContent = "Kirim Pesan";
    btnSpinner.classList.add("hidden");
  }
}

// ─── Toast Notification ─────────────────────────────────────
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  toast.textContent  = message;
  toast.className    = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ─── Character Counter ──────────────────────────────────────
function updateCharCount() {
  const len = inputMessage.value.length;
  charCountEl.textContent = `${len} / 300`;

  charCountEl.className = "char-count";
  if (len >= 280) charCountEl.classList.add("danger");
  else if (len >= 240) charCountEl.classList.add("warning");
}

// ─── Dark Mode ──────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

// ─── Event Listeners ───────────────────────────────────────
inputMessage.addEventListener("input", updateCharCount);

// Kirim dengan Enter (Ctrl+Enter untuk textarea)
inputName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") inputMessage.focus();
});

// Expose addMessage ke onclick di HTML
document.getElementById("btnSend").addEventListener("click", addMessage);

// ─── Init ───────────────────────────────────────────────────
initTheme();
loadMessages();     // Mulai listener realtime Firestore
