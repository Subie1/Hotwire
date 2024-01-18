const express = require("express");
const yt = require("ytdl-core");
const { join } = require("path");
const {
	createWriteStream,
	readdirSync,
	readFileSync,
	writeFileSync,
	existsSync,
	mkdirSync,
} = require("fs");

const outputFolder = process.argv.songs || "./src/songs";

const router = express.Router();
router.use(require("../middleware/AdminAuthentication"));

router.post("/youtube", async (req, res) => {
	if (!req.body.video) return res.status(400).end();
	if (!yt.validateURL(req.body.video)) return res.status(400).end();

	try {
		const video = await yt.getInfo(req.body.video);
		const format = yt.chooseFormat(video.formats, { quality: "lowest" });

		if (!existsSync(outputFolder))
			await mkdirSync(outputFolder, { recursive: true });

		const stream = createWriteStream(
			join(outputFolder, `${video.videoDetails.videoId}.${format.container}`)
		);

		writeFileSync(
			join(outputFolder, `${video.videoDetails.videoId}-config.json`),
			JSON.stringify({
				name: video.videoDetails.title,
				artist: video.videoDetails.author.name,
				file: `${video.videoDetails.videoId}.${format.container}`,
				thumbnail: video.videoDetails.thumbnails[0],
			})
		);

		const download = yt.downloadFromInfo(video, { format });
		const info = download.pipe(stream);

		info.on("finish", () => {
			const files = readdirSync(outputFolder, { withFileTypes: true })
				.filter((file) => file.isFile())
				.filter((file) => file.name.endsWith(".json"))
				.map((file) =>
					JSON.parse(readFileSync(join(outputFolder, file.name), "utf-8"))
				);

			console.log(
				" BACKEND ".bgWhite.black +
					" Downloaded " +
					`${video.videoDetails.title}`.yellow +
					" from YouTube."
			);
			return res.status(200).json(files);
		});
	} catch {
		res
			.status(500)
			.end(
				JSON.stringify({ status: "error", description: "Failed to save video" })
			);
	}
});

module.exports = router;
