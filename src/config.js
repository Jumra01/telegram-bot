import { existsSync } from "node:fs";

// ─────────────────────────────────────────────
// KONFIGURASI
// Token dibaca dari file .env (lokal / panel Pterodactyl)
// atau dari variabel environment.
//
// CARA ISI TOKEN:
//   1. Salin .env.example menjadi .env
//   2. Buka .env, isi:  BOT_TOKEN=token_hasil_botfather
//   File .env TIDAK ikut ter-upload ke GitHub (lihat .gitignore)
// ─────────────────────────────────────────────

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

const TOKEN = process.env.BOT_TOKEN?.trim();

if (!TOKEN) {
  console.error(
    "❌ Token belum diatur!\n\n" +
      "   Cara fix:\n" +
      "   1. Salin file .env.example menjadi .env\n" +
      '   2. Isi isinya: BOT_TOKEN="token_dari_botfather"\n'
  );
  process.exit(1);
}

export const config = {
  token: TOKEN,
  // Paksa koneksi IPv4 — aktifkan kalau jaringan IPv6 kamu rusak
  // (tambahkan FORCE_IPV4=1 di .env)
  ipv4Only: process.env.FORCE_IPV4 === "1",
  // Tambahkan pengaturan lain di sini, contoh:
  // adminId: Number(process.env.ADMIN_ID ?? 0),
};
