// import express from "express";
// import { Telegraf } from "telegraf";
// import dotenv from "dotenv";

// dotenv.config();

// const BOT_TOKEN = process.env.BOT_TOKEN || "";
// const APP_URL = process.env.APP_URL || "";

// const app = express();
// const bot = new Telegraf(BOT_TOKEN);

// bot.command("start", (ctx) => {
//   ctx.reply("Hello! Click the button below to open the web view.", {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: "Open WebView",
//             web_app: { url: APP_URL },
//           },
//         ],
//       ],
//     },
//   });
// });

// bot.launch();

// app.get("/", (req, res) => {
//   res.send("Telegram bot is running.");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const APP_URL = process.env.APP_URL || "";

const app = express();
const bot = new Telegraf(BOT_TOKEN);

// Webhook handling for Vercel
app.use(bot.webhookCallback("/webhook"));

bot.command("start", (ctx) => {
  ctx.reply("Welcome! Press the button below to open the web view.", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Open WebView", callback_data: "open_webview" }],
      ],
    },
  });
});

bot.action("open_webview", (ctx) => {
  ctx.reply("Click the button below to open the web view.", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open WebView",
            web_app: { url: APP_URL },
          },
        ],
      ],
    },
  });
});

// Set webhook URL dynamically
const URL = process.env.VERCEL_URL || "http://localhost:3000";
bot.telegram.setWebhook(`${URL}/webhook`);

// Ensure Vercel keeps the function warm
app.get("/", (req, res) => {
  res.send("Telegram bot is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
