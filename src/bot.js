import https from "node:https";
import { Telegraf } from "telegraf";
import { config } from "./config.js";

// Opsi API Telegram: agent dipakai untuk memaksa IPv4
// jika jaringan IPv6 lokal rusak (FORCE_IPV4=1 di .env)
const options = config.ipv4Only
  ? { telegram: { agent: new https.Agent({ family: 4, keepAlive: true }) } }
  : {};

// Instance bot — semua handler dipasang di src/handlers/
export const bot = new Telegraf(config.token, options);
