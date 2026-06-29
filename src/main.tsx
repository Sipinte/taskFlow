// Mengimport StrictMode — mode khusus React untuk mendeteksi potensi bug saat development
import { StrictMode } from "react";

// Mengimport createRoot — fungsi untuk menghubungkan React ke HTML
import { createRoot } from "react-dom/client";

// Mengimport CSS global yang berlaku untuk seluruh aplikasi
import "./index.css";

// Mengimport component utama App
import App from "./App.tsx";

// Mencari elemen <div id="root"> di index.html, lalu menjadikannya tempat React hidup
// Tanda (!) di akhir artinya "yakin elemen ini pasti ada" (TypeScript non-null assertion)
createRoot(
  document.getElementById("root")!
).render(
  // StrictMode membungkus App — aktif hanya saat development, tidak berpengaruh di production
  // Tugasnya: menjalankan setiap component 2x untuk mendeteksi bug tersembunyi
  <StrictMode>
    <App /> {/* Seluruh aplikasi dirender di sini */}
  </StrictMode>
);