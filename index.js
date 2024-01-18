const { exec } = require("node:child_process");
require("dotenv").config();

async function StartBackend() {
    const output = exec(`cd ./src/api && npm run dev`);

    output.stdout.on("data", (message) => {
        process.stdout.write(message);
    })
    output.stderr.on("data", (message) => {
        process.stdout.write(message);
    })
}

async function StartFrontend() {
    const output = exec("cd ./src/dashboard && npm run dev");

    output.stdout.on("data", (message) => {
        process.stdout.write(message);
    })
    output.stderr.on("data", (message) => {
        process.stdout.write(message);
    })
}

StartBackend();
StartFrontend();