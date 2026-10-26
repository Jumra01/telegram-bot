# Telegram Bot (Node.js)

Bot Telegram sederhana berbasis [Telegraf](https://github.com/telegraf/telegraf).

## Setup

1. Ambil token dari [@BotFather](https://t.me/BotFather) → `/newbot`
2. Buat file `.env` lalu isi token:
   ```
   BOT_TOKEN=123456:ABCdefGhIJ...
   ```
3. Install dependensi & jalankan:
   ```bash
   npm install
   npm start
   ```

## Perintah bot

- `/start` - sapaan & daftar perintah
- `/halo` - balasan sapaan
- `/info` - info pengguna
- `/teks <pesan>` - echo pesan
- Pesan biasa dibalas otomatis

## Deploy di Pterodactyl (Node.js Egg)

1. Upload semua file proyek (kecuali `node_modules/`) ke file manager panel
2. Isi token di file `.env`
3. Set startup file ke `bot.js`
4. Start server — panel otomatis jalan 24/7 & restart saat crash

## Deploy 24/7 di VPS dengan pm2

```bash
npm install
pm2 start bot.js --name telegram-bot
pm2 save
pm2 startup
```
