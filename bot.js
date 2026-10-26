import { Telegraf } from "telegraf";
import { existsSync } from "node:fs";

// Baca file .env jika ada (untuk Pterodactyl/VPS/local)
if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

// Ambil token dari variabel lingkungan atau file .env
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error(
    "❌ Token belum diatur!\n" +
      "   Buat file .env berisi: BOT_TOKEN=token_dari_botfather"
  );
  process.exit(1);
}

const bot = new Telegraf(TOKEN);

// /start - sapaan awal
bot.start((ctx) =>
  ctx.reply(
    `Halo ${ctx.from.first_name}! 👋\nSaya bot Telegram berbasis Node.js.\n\n` +
      "Perintah yang tersedia:\n" +
      "/halo - sapa bot\n" +
      "/info - info pengguna\n" +
      "/teks <pesan> - balas pesan Anda"
  )
);

// /halo
bot.command("halo", (ctx) => ctx.reply(`Halo juga, ${ctx.from.first_name}! 😄`));

// /info - tampilkan info pengirim
bot.command("info", (ctx) => {
  const u = ctx.from;
  ctx.reply(
    `👤 Nama: ${u.first_name} ${u.last_name ?? ""}\n` +
      `🆔 ID: ${u.id}\n` +
      `🆔 Username: ${u.username ? "@" + u.username : "-"}`
  );
});

// /teks <pesan> - echo
bot.command("teks", (ctx) => {
  const teks = ctx.message.text.slice(5).trim();
  ctx.reply(teks ? `Anda bilang: ${teks}` : "Pakai format: /teks halo dunia");
});

// Balasan otomatis untuk pesan biasa
bot.on("text", (ctx) => {
  const teks = ctx.message.text.toLowerCase();
  if (teks.includes("halo") || teks.includes("hai")) {
    ctx.reply("Halo! 👋 Ketik /start untuk melihat perintah.");
  } else if (teks.includes("papa")) {
    ctx.reply("Papa? 🤔");
  } else {
    ctx.reply(`Pesan diterima: "${ctx.message.text}"`);
  }
});

// Error handler
bot.catch((err, ctx) => {
  console.error(`Error untuk ${ctx.updateType}:`, err.message);
});

bot.launch();
console.log("✅ Bot Telegram berjalan... tekan Ctrl+C untuk berhenti.");

// Hentikan bot dengan rapi saat Ctrl+C
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
