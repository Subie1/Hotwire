const express = require("express");
const { readdirSync, readFileSync } = require("fs");
const { join } = require("path");

const outputFolder = process.argv.songs || "./src/songs";

const router = express.Router();
router.use(require("../middleware/Authentication"));

router.get("/", (_, res) => {
	const files = readdirSync(outputFolder, { withFileTypes: true })
		.filter((file) => file.isFile())
		.filter((file) => file.name.endsWith(".json"))
		.map((file) =>
			JSON.parse(readFileSync(join(outputFolder, file.name), "utf-8"))
		);
	return res.status(200).json(files);
});

router.get("/:songId", (req, res) => {
	const files = readdirSync(outputFolder, { withFileTypes: true })
		.filter((file) => file.isFile())
		.filter((file) => !file.name.endsWith(".json"));

	for (const file of files) {
		if (file.name !== req.params.songId) continue;
		return res
			.status(200)
			.sendFile(join(process.cwd(), outputFolder, file.name));
	}

	return res.status(404).end();
});

module.exports = router;