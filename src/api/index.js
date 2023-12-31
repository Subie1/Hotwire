const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

app.listen(process.env.BACKEND_PORT, () => console.log("[BACKEND]: Ready"));