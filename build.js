const { enable } = require("colors");
const { execSync } = require("child_process");
const { existsSync, mkdirSync, copyFileSync, readdirSync } = require("fs");
const { join } = require("path");

enable();

let extension = "";
if (process.platform === "win32") {
	extension = ".exe";
}

async function Main() {
	if (!existsSync("./target")) {
		await mkdirSync("./target");
		console.log("\t PACKAGE ".bgCyan.black + " Created " + "./target".yellow);
	}

	console.log("\t PACKAGE ".bgCyan.black + " Building " + "Server".yellow);
	try {
		await execSync(
			`pkg ./src/api/index.js --target latest --output ./target/server-software${extension}`,
			{ cwd: process.cwd() }
		);
	} catch {}

	if (!existsSync("./src-tauri/assets/")) {
		await mkdirSync("./src-tauri/assets/", { recursive: true });
		console.log(
			"\t PACKAGE ".bgCyan.black + " Created " + "./src-tauri/assets/".yellow
		);
	}

	await copyFileSync(
		"./target/server-software.exe",
		`./src-tauri/assets/server-software${extension}`
	);

	console.log("\t PACKAGE ".bgCyan.black + " Built Server".green);

	console.log("\t PACKAGE ".bgCyan.black + " Building " + "Client".yellow);
	await execSync("npx tauri build", { cwd: process.cwd() });
	console.log("\t PACKAGE ".bgCyan.black + " Built Client".green);

	const files = readdirSync("./src-tauri/target/release/bundle/msi").filter(
		(file) => file.endsWith(".msi")
	);

	for (const file of files) {
		await copyFileSync(
			join("./src-tauri/target/release/bundle/msi", file),
			"./target/hotwire_x64.msi"
		);
	}

	console.log(
		"\t PACKAGE ".bgCyan.black +
			" Moved client bundles to ".green +
			"./target".yellow
	);
}

Main();
