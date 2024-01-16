const express = require("express");
const yt = require("ytdl-core");
const cors = require("cors");
const crypto = require("crypto");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { join } = require("path");
const {
	createWriteStream,
	readdirSync,
	readFileSync,
	writeFileSync,
	existsSync,
	mkdirSync,
} = require("fs");

const args = yargs(hideBin(process.argv)).argv;

const outputFolder = args.output || "./songs";
const port = process.env.VITE_BACKEND_PORT || (args.port || 3000);

if (!existsSync(outputFolder)) mkdirSync(outputFolder, { recursive: true });

const playlists = new Map();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

app.get("/api/songs/:songId", (req, res) => {
	const files = readdirSync("./songs", { withFileTypes: true })
		.filter((file) => file.isFile())
		.filter((file) => !file.name.endsWith(".json"));

	for (const file of files) {
		if (file.name !== req.params.songId) continue;
		return res.status(200).sendFile(join(process.cwd(), "songs", file.name));
	}

	return res.status(404).end();
});

app.put("/api/playlist/:id/add", (req, res) => {
	const playlist = playlists.get(req.params.id);
	if (!playlist) return res.status(404).end();

	if (!req.body.songId) return res.status(400).end();

	const files = readdirSync(outputFolder, { withFileTypes: true })
		.filter((file) => file.isFile())
		.filter((file) => !file.name.endsWith(".json"));

	for (const file of files) {
		if (file.name !== req.params.songId) continue;
		const song = file.name;

		playlist.songs.push(song);
		playlists.set(req.params.id, playlist);

		return res.status(200).json(playlist);
	}

	return res.status(404).end();
});

app.post("/api/playlist/create", (req, res) => {
	if (!req.body.name) return res.status(400).end();

	const id = crypto.randomBytes(5).toString("hex");
	const data = {
		name: req.body.name,
		songs: [],
		id,
	};

	playlists.set(id, data);
	return res.status(200).json(data);
});

app.get("/api/playlist/:id", (req, res) => {
	const playlist = playlists.get(req.params.id);
	if (!playlist) return res.status(404).end();
	return res.status(200).json(playlist);
});

app.get("/api/songs", (_, res) => {
	const files = readdirSync(outputFolder, { withFileTypes: true })
		.filter((file) => file.isFile())
		.filter((file) => file.name.endsWith(".json"))
		.map((file) =>
			JSON.parse(readFileSync(join(outputFolder, file.name), "utf-8"))
		);
	return res.status(200).json(files);
});

app.post("/api/download/youtube", async (req, res) => {
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
			const files = readdirSync("./songs", { withFileTypes: true })
				.filter((file) => file.isFile())
				.filter((file) => file.name.endsWith(".json"))
				.map((file) =>
					JSON.parse(readFileSync(join(outputFolder, file.name), "utf-8"))
				);

			res.status(200).json(files);
		});
	} catch {
		res
			.status(500)
			.end(
				JSON.stringify({ status: "error", description: "Failed to save video" })
			);
	}
});

app.listen(port, () => console.log("[BACKEND]: Ready on port " + port));
