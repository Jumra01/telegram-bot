# Telegram Bot (Node.js)

Bot Telegram sederhana berbasis [Telegraf](https://github.com/telegraf/telegraf), struktur modular siap dikembangkan.

## ⚙️ Setup Token (WAJIB)

Token diambil dari [@BotFather](https://t.me/BotFather) di Telegram → kirim `/newbot`.

**Simpan token di `src/config.js`:**

```js
export const config = {
  token: "", // ← tempel token di sini, di antara tanda kutip
  ipv4Only: false,
};
```

Contoh: `token: "123456789:AAHxxxxxxxxxxxxxxxx"`,

> ⚠️ **Keamanan:** file ini ikut terpublikasi ke GitHub. **Jangan commit/push `src/config.js` setelah token diisi.** Kalau terlanjur bocor → reset di BotFather (`/revoke`).

## 🚀 Jalankan

```bash
npm install
npm start
```

Kalau bot gagal terhubung (jaringan IPv6 rusak), ubah `ipv4Only: true` di `src/config.js`.

## 📁 Struktur Project

```
bot.js                  ← titik masuk (entry point)
src/
├── config.js           ← ⚠️ ISI TOKEN DI SINI + pengaturan
├── bot.js              ← instance Telegraf
└── handlers/
    ├── index.js        ← daftarkan semua handler di sini
    ├── commands.js     ← perintah /start /halo /info /teks
    └── messages.js     ← balasan otomatis pesan biasa
```

## ➕ Cara Menambah Fitur

1. Buat file baru di `src/handlers/` (misal: `produk.js`):

   ```js
   export function registerProductHandlers(bot) {
     bot.command("produk", (ctx) => ctx.reply("Daftar produk..."));
   }
   ```

2. Daftarkan di `src/handlers/index.js`:

   ```js
   import { registerProductHandlers } from "./produk.js";

   export function registerHandlers(bot) {
     registerCommandHandlers(bot);
     registerMessageHandlers(bot);
     registerProductHandlers(bot);   // ← tambah di sini
   }
   ```

3. Restart bot, selesai.

## 📦 Perintah Bot

- `/start` — sapaan & daftar perintah
- `/halo` — balasan sapaan
- `/info` — info pengguna (ID, nama, username)
- `/teks <pesan>` — echo pesan
- Pesan biasa dibalas otomatis

## 🖥️ Deploy 24/7

### Pterodactyl (Node.js Egg)

1. Upload semua file (kecuali `node_modules/`) via File Manager
2. Isi token di `src/config.js` (langsung di panel)
3. Startup → set file ke `bot.js`
4. Start server — otomatis jalan 24/7 & restart saat crash

### VPS dengan pm2

```bash
npm install
pm2 start bot.js --name telegram-bot
pm2 save && pm2 startup
```

## 🔐 Keamanan

- Token hanya di `src/config.js` — **jangan commit setelah diisi**
- Jangan screenshot baris log error yang memuat token
- Jika token bocor: reset via BotFather → `/revoke`
