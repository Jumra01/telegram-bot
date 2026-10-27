// ─────────────────────────────────────────────
// PERINTAH BOT  (dipanggil dengan /nama)
// Tambah perintah baru di sini
// ─────────────────────────────────────────────

export function registerCommandHandlers(bot) {
  // /start - sapaan awal & daftar perintah
  bot.start((ctx) =>
    ctx.reply(
      `Halo ${ctx.from.first_name}! 👋\nSaya bot Telegram berbasis Node.js.\n\n` +
        "Perintah:\n" +
        "/halo - sapa bot\n" +
        "/info - info pengguna\n" +
        "/teks <pesan> - balas pesan Anda\n\n" +
        "Remote AlightBot:\n" +
        "/menu - muat menu AlightBot\n" +
        "/buatakun - proses buat akun\n" +
        "/kirim <teks> - kirim bebas\n" +
        "/tekan <nomor> - tekan tombol"
    )
  );

  // /halo
  bot.command("halo", (ctx) =>
    ctx.reply(`Halo juga, ${ctx.from.first_name}! 😄`)
  );

  // /info - info pengirim
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
}
