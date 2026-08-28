const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/answer", async (req, res) => {
    const { game, date, time, answer } = req.body;

    const message = `🎮 Ответ Ксюши!

Режим: ${game}
Дата: ${date}
Время: ${time}
Ответ: ${answer}`;

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            }
        );

        const result = await response.json();

        if (!result.ok) {
            return res.status(500).json({ ok: false });
        }

        res.json({ ok: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false });
    }
});

app.listen(PORT, () => {
    console.log(`Сайт запущен на порту ${PORT}`);
});
