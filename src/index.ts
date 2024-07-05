import express from "express";
import { Telegraf } from "telegraf";

const app = express();
const bot = new Telegraf("<YOUR_TELEGRAM_BOT_TOKEN>");

bot.command("start", (ctx) => {
  ctx.reply("Hello! Click the button below to open the web view.", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open WebView",
            web_app: { url: "<YOUR_VERCEL_DEPLOYMENT_URL>" },
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
