// Login sekali ke Telegram (butuh nomor HP + kode + PIN 2FA)
// Hasilnya disimpan di session.txt (RAHASIA — jangan dibagikan)
import readline from "node:readline/promises";
import { TelegramClient } from "teleproto";
import { StringSession } from "teleproto/sessions/index.js";
import { config } from "./src/config.js";
import { saveSession } from "./src/remote.js";

async function main() {
  if (!config.apiId || !config.apiHash) {
    throw new Error("Isi apiId & apiHash di config.js dulu (dari my.telegram.org/apps)");
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const client = new TelegramClient(
    new StringSession(""),
    Number(config.apiId),
    config.apiHash,
    { connectionRetries: 5 }
  );

  await client.start({
    phoneNumber: async () => (await rl.question("Nomor HP (format +628xxx): ")).trim(),
    password: async () => (await rl.question("PIN 2FA (kalau tidak ada, tekan Enter): ")).trim(),
    phoneCode: async () => (await rl.question("Kode login dari Telegram (jangan bagikan ke siapapun): ")).trim(),
    onError: (err) => {
      console.error("Error:", err.message);
      return true; // hentikan proses (jangan diulang terus)
    },
  });

  saveSession(client.session.save());
  console.log("✅ Login sukses! Session tersimpan di session.txt");
  await client.disconnect();
  rl.close();
}

main().catch((err) => {
  console.error("❌ Gagal:", err.message);
  process.exit(1);
});
