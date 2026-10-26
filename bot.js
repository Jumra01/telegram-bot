// ─────────────────────────────────────────────
// Titik masuk bot Telegram
// Jalankan dengan:  npm start   (atau node bot.js)
// ─────────────────────────────────────────────

import { bot } from "./src/bot.js";
import { registerHandlers } from "./src/handlers/index.js";

registerHandlers(bot);

// Error handler — supaya bot tidak crash diam-diam
bot.catch((err, ctx) => {
  console.error(`Error untuk ${ctx.updateType}:`, err.message);
});

bot.launch();
console.log("✅ Bot Telegram berjalan... tekan Ctrl+C untuk berhenti.");

// Hentikan bot dengan rapi saat Ctrl+C
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
