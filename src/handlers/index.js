import { registerCommandHandlers } from "./commands.js";
import { registerMessageHandlers } from "./messages.js";

/**
 * Pasang semua handler ke bot.
 * Untuk menambah fitur baru:
 *   1. Buat file handler baru di folder ini (misal: produk.js)
 *   2. Ekspor fungsi registerXxxHandlers(bot)
 *   3. Daftarkan di sini
 */
export function registerHandlers(bot) {
  registerCommandHandlers(bot);
  registerMessageHandlers(bot);
}
