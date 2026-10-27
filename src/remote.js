// ═══════════════════════════════════════════════════════
//  INTI REMOTE — akun Telegram kamu ngobrol ke AlightBot
// ═══════════════════════════════════════════════════════
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { TelegramClient, events, Api } from "teleproto";
import { StringSession } from "teleproto/sessions/index.js";
import { config } from "./config.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SESSION_FILE = path.join(ROOT, "session.txt");

let client = null;
let botEntity = null;

/** Tombol terakhir dari AlightBot (untuk perintah /tekan) */
export const last = { buttons: [] };

export function saveSession(str) {
  writeFileSync(SESSION_FILE, str, { mode: 0o600 });
}

function loadSession() {
  return existsSync(SESSION_FILE) ? readFileSync(SESSION_FILE, "utf8").trim() : "";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function connect() {
  if (!config.apiId || !config.apiHash) {
    throw new Error("apiId/apiHash belum diisi di config.js");
  }
  const session = loadSession();
  if (!session) throw new Error("Belum login — jalankan dulu: npm run login");

  client = new TelegramClient(
    new StringSession(session),
    Number(config.apiId),
    config.apiHash,
    { connectionRetries: 5 }
  );
  await client.connect();
  if (!(await client.checkAuthorization())) {
    throw new Error("Session tidak valid — jalankan ulang: npm run login");
  }
  botEntity = await client.getEntity(config.alightBot);
  console.log(` Terhubung ke @${config.alightBot} sebagai akun kamu ✅`);
}

/** Kumpulkan balasan masuk dari AlightBot selama N detik */
async function collect(seconds) {
  const msgs = [];
  const handler = (evt) => {
    const sid = String(evt.senderId ?? "");
    const cid = String(evt.message?.chatId ?? "");
    const bid = String(botEntity.id);
    if (!evt.out && (sid === bid || cid === bid)) msgs.push(evt.message);
  };
  client.addEventHandler(handler, new events.NewMessage());
  await sleep(seconds * 1000);
  client.removeEventHandler(handler, events.NewMessage);
  return msgs;
}

/** Ambil tombol inline dari sebuah pesan */
function extractButtons(m) {
  const res = [];
  const mk = m.replyMarkup;
  if (!mk?.rows) return res;
  for (const row of mk.rows) {
    for (const b of row.buttons ?? []) {
      if (b.className === "KeyboardButtonCallback") {
        res.push({ text: b.text, data: b.data, msgId: m.id });
      } else if (b.className === "KeyboardButtonUrl") {
        res.push({ text: `${b.text} 🔗`, url: b.url, msgId: m.id });
      } else {
        res.push({ text: b.text ?? "[tombol]", msgId: m.id });
      }
    }
  }
  return res;
}

/** Format daftar balasan jadi teks + numbering tombol */
function format(msgs) {
  const parts = [];
  const buttons = [];
  for (const m of msgs) {
    const t = (m.message ?? "").trim();
    if (t) parts.push(t);
    const bs = extractButtons(m);
    if (bs.length) {
      buttons.push(...bs);
      const list = bs
        .map((b, i) => `  [${buttons.length - bs.length + i + 1}] ${b.text}`)
        .join("\n");
      parts.push(`Tombol:\n${list}`);
    }
  }
  return {
    text: parts.join("\n\n———\n\n") || "(balasan kosong)",
    buttons,
  };
}

/**
 * Kirim pesan ke AlightBot, kumpulkan balasannya.
 * @returns {Promise<{text: string, buttons: Array}>}
 */
export async function ask(text, seconds = config.collectSeconds) {
  if (!botEntity) throw new Error("Belum connect() — jalankan: npm start");
  const wait = collect(seconds);
  await client.sendMessage(botEntity, { message: text });
  const msgs = await wait;
  const out = format(msgs);
  last.buttons = out.buttons;
  return out;
}

/** Tekan tombol inline nomor N (dari hasil ask terakhir) */
export async function press(n, seconds = config.collectSeconds) {
  if (!botEntity) throw new Error("Belum connect() — jalankan: npm start");
  const b = last.buttons[n - 1];
  if (!b) {
    throw new Error(
      `Tombol [${n}] tidak ada (total tersedia: ${last.buttons.length}). Jalankan /menu dulu.`
    );
  }
  if (b.url) return { text: `Itu tombol link, bukan tombol aksi:\n${b.url}`, buttons: last.buttons };

  const wait = collect(seconds);
  await client.invoke(
    new Api.messages.GetBotCallbackAnswer({
      peer: botEntity,
      msgId: b.msgId,
      data: b.data,
    })
  );
  const msgs = await wait;
  const out = format(msgs);
  last.buttons = out.buttons;
  return out;
}

/** Tekan tombol berdasarkan kata kunci nama (misal: "buat akun") */
export async function pressByText(keyword, seconds = config.collectSeconds) {
  const i = last.buttons.findIndex((b) =>
    b.text.toLowerCase().includes(keyword.toLowerCase())
  );
  if (i < 0) {
    throw new Error(
      `Tombol "${keyword}" tidak ditemukan. Tombol tersedia:\n` +
        last.buttons.map((b, k) => `  [${k + 1}] ${b.text}`).join("\n")
    );
  }
  return press(i + 1, seconds);
}
