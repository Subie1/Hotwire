const { enable } = require("colors");
const { exec, execSync } = require("child_process");
const { existsSync, mkdirSync, copyFileSync, readdirSync } = require("fs");
const { join } = require("path");

let extension = "";
if (process.platform === "win32") {
	extension = ".exe";
}

function execute(command){
    return new Promise((resolve, reject) => {
		exec(command, function(error, stdout) { if (error) return reject(); resolve(stdout); });
	})
};

enable();

async function Main() {
	const data = await execute("rustc -vV");
	const info = /host: (\S+)/g.exec(data)[1];

	if (!info) {
		console.error("\t PACKAGE ".bgRed.black + "Failed to detect OS");
		return process.exit(-1)
	}

	if (!existsSync("./target")) {
		await mkdirSync("./target");
		console.log("\t PACKAGE ".bgCyan.black + " Created " + "./target".yellow);
	}

	console.log("\t PACKAGE ".bgCyan.black + " Building " + "Server".yellow);
	try {
		await execSync(
			"pkg ./src/api/index.js --target latest --output ./target/server-software.exe",
			{ cwd: process.cwd() }
		);
	} catch {}

	if (!existsSync("./src-tauri/binaries/")) {
		await mkdirSync("./src-tauri/binaries/", { recursive: true });
		console.log(
			"\t PACKAGE ".bgCyan.black + " Created " + "./src-tauri/binaries/".yellow
		);
	}
	
	await copyFileSync(
		"./target/server-software.exe",
		`./src-tauri/binaries/server-software-${info}${extension}`
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
