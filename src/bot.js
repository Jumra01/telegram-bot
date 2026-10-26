import { Telegraf } from "telegraf";
import { config } from "./config.js";

// Instance bot — semua handler dipasang di src/handlers/
export const bot = new Telegraf(config.token);
