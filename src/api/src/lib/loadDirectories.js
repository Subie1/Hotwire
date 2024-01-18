const Storage = require("salvis");
const { existsSync, mkdirSync } = require("fs");

const outputFolder = process.argv.songs || "./src/songs";
const dataPath = process.argv.data || "./src/data";
const configPath = process.argv.config || "./config.json";

global.MainStorage = new Storage("main_storage", { path: dataPath });

if (!existsSync(outputFolder)) mkdirSync(outputFolder, { recursive: true });
if (!existsSync(dataPath)) mkdirSync(dataPath, { recursive: true });
if (!existsSync(configPath)) {
    console.error(` BACKEND `.bgRed.black + " Config doesn't exist in: " + configPath.yellow);
    process.exit(-1);
}