const { enable } = require("colors");
const { execSync } = require("child_process");
const { existsSync, mkdirSync, copyFileSync, readdirSync } = require("fs");
const { join } = require("path");

async function Main() {
	if (!existsSync("./target")) {
		await mkdirSync("./target");
		console.log("\t PACKAGE ".bgCyan.black + " Created " + "./target".yellow);
	}

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

	console.log("\t PACKAGE ".bgCyan.black + " Building " + "Server".yellow);
	await execSync(
		"pkg ./src/api/index.js --target latest --output ./target/server-software.exe",
		{ cwd: process.cwd() }
	);
	console.log("\t PACKAGE ".bgCyan.black + " Built Server".green);
}

Main();
