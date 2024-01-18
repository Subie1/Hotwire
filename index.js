const { exec } = require("node:child_process");
require("dotenv").config();

async function StartBackend() {
    const output = exec(`cd ./src/api && npm run dev`);

    output.stdout.on("data", (message) => {
        if (!message.startsWith("1:")) return;
        process.stdout.write(message.replace("1:", ""));
    })
    output.stderr.on("data", (message) => {
        process.stdout.write(message);
    })
}

async function StartFrontend() {
    const output = exec("cd ./src/dashboard && npm run dev");

    output.stdout.on("data", (message) => {
        if (!message.startsWith("1:")) return;
        process.stdout.write(message.replace("1:", ""));
    })
    output.stderr.on("data", (message) => {
        process.stdout.write(message);
    })
}

StartBackend();
StartFrontend();