const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

app.get("/ping", (_, res) => {
    res.status(200).json({ message: "Pong!" });
})

app.listen(process.env.BACKEND_PORT || 3333, () => console.log("[BACKEND]: Ready on port " + process.env.BACKEND_PORT || 3333));