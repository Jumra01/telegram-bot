// Titik masuk bot Telegram
// Jalankan dengan:  npm start   (atau node bot.js)
// Login remote sekali:  npm run login

import { bot } from "./src/bot.js";
import { registerHandlers } from "./src/handlers/index.js";
import { connect } from "./src/remote.js";

registerHandlers(bot);

// Error handler — supaya bot tidak crash diam-diam
bot.catch((err, ctx) => {
  console.error(`Error untuk ${ctx.updateType}:`, err.message);
});

bot.launch();
console.log("✅ Bot Telegram berjalan... tekan Ctrl+C untuk berhenti.");

// Coba hubungkan remote AlightBot (non-fatal kalau belum dikonfigurasi)
connect().catch((e) =>
  console.warn(`⚠️  Remote AlightBot belum aktif: ${e.message}`)
);

// Hentikan bot dengan rapi saat Ctrl+C
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
