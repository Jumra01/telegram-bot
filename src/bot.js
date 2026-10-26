import https from "node:https";
import { Telegraf } from "telegraf";
import { config } from "./config.js";

// Opsi API Telegram: agent dipakai untuk memaksa IPv4
// jika jaringan IPv6 lokal rusak (ipv4Only: true di config.js)
const options = config.ipv4Only
  ? { telegram: { agent: new https.Agent({ family: 4, keepAlive: true }) } }
  : {};

if (!config.token) {
  console.error(
    "❌ Token belum diisi!\n" +
      "   Buka src/config.js → isi token dari @BotFather di:\n" +
      '   token: "",   →   token: "123456:ABCdef...",'
  );
  process.exit(1);
}

// Instance bot — semua handler dipasang di src/handlers/
export const bot = new Telegraf(config.token, options);
