const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Store bot data
let botData = {
    bot_status: "Unknown",
    server_count: 0,
};

// Webhook endpoint (BotGhost sends data here)
app.post("/webhook", (req, res) => {
    const { bot_status, server_count } = req.body;
    console.log("Received webhook data:", req.body);

    // Update bot data
    botData.bot_status = bot_status || "Unknown";
    botData.server_count = server_count || 0;

    res.status(200).json({ message: "Webhook received successfully!" });
});

// Endpoint for dashboard to fetch bot data
app.get("/bot-data", (req, res) => {
    res.json(botData);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

