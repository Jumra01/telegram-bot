// ─────────────────────────────────────────────
// HANDLER PESAN BIASA (bukan perintah)
// Balasan otomatis berdasarkan isi pesan
// ─────────────────────────────────────────────

export function registerMessageHandlers(bot) {
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
}
