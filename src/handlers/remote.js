// ═══════════════════════════════════════════════════════
//  HANDLER REMOTE ALIGHTBOT
//  Perintah: /menu /kirim /tekan /buatakun
//  Aktif kalau apiId+apiHash terisi & sudah npm run login
// ═══════════════════════════════════════════════════════
import { ask, press, pressByText } from "../remote.js";

const CHUNK = 3900;

function kirim(ctx, teks) {
  const t = teks || "(kosong)";
  for (let i = 0; i < t.length; i += CHUNK) {
    ctx.reply(t.slice(i, i + CHUNK));
  }
}

export function registerRemoteHandlers(bot) {
  // /menu - muat ulang menu AlightBot
  bot.command("menu", async (ctx) => {
    try {
      kirim(ctx, "⏳ Memuat menu AlightBot...");
      const r = await ask("/start");
      kirim(ctx, `📋 MENU:\n\n${r.text}`);
    } catch (e) {
      kirim(ctx, `❌ ${e.message}`);
    }
  });

  // /kirim <teks> - kirim bebas ke AlightBot
  bot.command("kirim", async (ctx) => {
    const teks = ctx.message.text.slice(6).trim();
    if (!teks) return kirim(ctx, "Pakai: /kirim <teks>");
    try {
      const r = await ask(teks);
      kirim(ctx, `↩️ BALASAN:\n\n${r.text}`);
    } catch (e) {
      kirim(ctx, `❌ ${e.message}`);
    }
  });

  // /tekan <nomor> - tekan tombol hasil terakhir
  bot.command("tekan", async (ctx) => {
    const n = parseInt(ctx.message.text.slice(6).trim(), 10);
    if (!n) return kirim(ctx, "Pakai: /tekan <nomor>, misal: /tekan 1");
    try {
      const r = await press(n);
      kirim(ctx, `🔘 HASIL:\n\n${r.text}`);
    } catch (e) {
      kirim(ctx, `❌ ${e.message}`);
    }
  });

  // /buatakun - otomatis: buka menu → tekan "Buat Akun"
  bot.command("buatakun", async (ctx) => {
    try {
      kirim(ctx, "⏳ Membuka menu AlightBot...");
      await ask("/start");
      const r = await pressByText("buat akun");
      kirim(ctx, `✨ HASIL BUAT AKUN:\n\n${r.text}`);
    } catch (e) {
      kirim(ctx, `❌ ${e.message}`);
    }
  });
}
