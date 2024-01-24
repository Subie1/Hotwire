const Storage = require("salvis");
const { existsSync, mkdirSync, writeFileSync } = require("fs");

const outputFolder = process.argv.songs || "./src/songs";
const dataPath = process.argv.data || "./src/data";
const configPath = process.argv.config || "./config.json";

global.MainStorage = new Storage("main_storage", { path: dataPath });

if (!existsSync(outputFolder)) mkdirSync(outputFolder, { recursive: true });
if (!existsSync(dataPath)) mkdirSync(dataPath, { recursive: true });
if (!existsSync(configPath)) {
	console.log(
		" BACKEND ".bgWhite.black + " Config doesn't exist in: " + configPath.yellow + " (creating...)"
	);

	writeFileSync(
		configPath,
		JSON.stringify({
			MAX_NAME_LENGTH: 16,
			MIN_NAME_LENGTH: 3,

			MAX_PASSWORD_LENGTH: 40,
			MIN_PASSWORD_LENGTH: 8,

			ID_BYTE_SIZE: 6,
		})
	, "utf-8");
}
