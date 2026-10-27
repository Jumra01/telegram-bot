// ═══════════════════════════════════════════════════════
//  PENGATURAN BOT TELEGRAM — isi bagian yang bertanda <!--
// ═══════════════════════════════════════════════════════
//
//  CARA DAPAT TOKEN:
//  1. Buka Telegram → cari chat @BotFather
//  2. Kirim /newbot, ikuti instruksinya (nama & username bot)
//  3. BotFather akan kasih token, formatnya:
//         123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxx
//  4. Tempel token itu di bawah ini, di antara tanda ""
//
//  CARA JALANKAN:
//    Lokal    : npm install  lalu  npm start
//    Panel    : upload file ini + folder src/ + package.json,
//               startup file = bot.js, lalu Start
//
//  ⚠️  PENTING — KEAMANAN:
//  - File ini IKUT terpublikasi ke GitHub (repo bersifat publik)
//  - JANGAN commit/push file ini kalau token sudah diisi!
//    (token = password bot, orang lain bisa ambil alih bot kamu)
//  - Kalau token bocor: reset di BotFather → /revoke
//  - Di panel Pterodactyl tidak masalah, karena panel tidak
//    di-push ke GitHub
// ═══════════════════════════════════════════════════════

export const config = {
  // ┌─────────────────────────────────────────────┐
  // │ TOKEN BOT — tempel hasil dari @BotFather    │
  // └─────────────────────────────────────────────┘
  token: "", // <!-- contoh: "123456789:AAHxxxx..." (dengan tanda kutip)

  // true  = paksa koneksi IPv4 (aktifkan kalau bot gagal
  //         terhubung / jaringan IPv6 kamu rusak)
  // false = biarkan (otomatis, aman untuk VPS/panel)
  ipv4Only: true,

  // ─────────────────────────────────────────────
  // REMOTE ALIGHTBOT (opsional — kosongkan kalau tidak dipakai)
  // Login sekali: npm run login
  // ─────────────────────────────────────────────
  apiId: 0, // <!-- dari my.telegram.org/apps → App api_id (angka)
  apiHash: "", // <!-- dari my.telegram.org/apps → App api_hash (RAHASIA)
  alightBot: "alightmotion321_bot",
  collectSeconds: 6, // detik menunggu balasan AlightBot
};
