import express from "express";
import { Telegraf } from "telegraf";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const APP_URL = process.env.APP_URL || "";

const app = express();
const bot = new Telegraf(BOT_TOKEN);

bot.command("start", (ctx) => {
  ctx.reply("Hello! Click the button below to open the web view.", {
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

bot.launch();

app.get("/", (req, res) => {
  res.send("Telegram bot is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
