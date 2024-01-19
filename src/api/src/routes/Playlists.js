const express = require("express");
const crypto = require("node:crypto");
const { readdirSync } = require("fs");
const User = require("../lib/User");

const outputFolder = process.argv.songs || "./src/songs";
const playlists = MainStorage.box("playlists");

const router = express.Router();
router.use(require("../middleware/Authentication"));

router.delete("/:id/delete", (req, res) => {
	if (!playlists.has(req.params.id)) return res.status(404).end("No playlist was found with that id");
	const playlist = playlists.get(req.params.id);
	const user = User(req.headers.authorization);
	if (playlist.id !== user.id)
		return res.status(401).end("You don't have access to modify this playlist");
	
	playlists.delete(req.params.id);
	return res.status(200).end("Deleted playlist successfully");
});

router.delete("/:id/delete/:songId", (req, res) => {
	if (!playlists.has(req.params.id)) return res.status(404).end("No playlist was found with that id");

	const user = User(req.headers.authorization);
	const playlist = playlists.get(req.params.id);
	if (playlist.id !== user.id)
		return res.status(401).end("You don't have access to modify this playlist");

	const files = readdirSync(outputFolder, { withFileTypes: true })
		.filter((file) => file.isFile())
		.filter((file) => !file.name.endsWith(".json"));

	for (const file of files) {
		if (file.name !== req.params.songId) continue;

		const songs = playlist.songs.filter((s) => s !== file.name);
		delete playlist.songs;

		playlists.set(playlist.id, { ...playlist, songs });

		return res.status(200).json(playlist);
	}

	return res.status(404).end("No song was found with that id in the playlist");
});

router.put("/:id/add", (req, res) => {
	if (!playlists.has(req.params.id)) return res.status(404).end("No playlist was found with that id");
	if (!req.body.songId) return res.status(400).end("No song id was provided");

	const playlist = playlists.get(req.params.id);

	const user = User(req.headers.authorization);
	if (playlist.id !== user.id)
		return res.status(401).end("You don't have access to modify this playlist");

	const files = readdirSync(outputFolder, { withFileTypes: true })
		.filter((file) => file.isFile())
		.filter((file) => !file.name.endsWith(".json"));

	for (const file of files) {
		if (file.name !== req.body.songId) continue;

		const songs = [...playlist.songs];
		delete playlist.songs;

		songs.push(file.name);
		playlists.set(playlist.id, { ...playlist, songs });

		return res.status(200).json(playlist);
	}

	return res.status(404).end("No song found with that id");
});

router.post("/create", (req, res) => {
	if (!req.body.name) return res.status(400).end("No playlist was found with that id");

	const user = User(req.headers.authorization);

	const id = crypto.randomBytes(5).toString("hex");
	const data = {
		name: req.body.name,
		songs: [],
		id,
		author: user.id,
		private: false,
	};

	playlists.set(id, data);
	return res.status(200).json(data);
});

router.get("/:id", (req, res) => {
	if (!playlists.has(req.params.id)) return res.status(404).end("Playlist doesn't exist");
	const playlist = playlists.get(req.params.id);
	const user = User(req.headers.authorization);

	if (playlist.id !== user.id && playlist.private) return res.status(401).end("You don't have access to view this playlist");
	return res.status(200).json(playlist);
});

module.exports = router;
