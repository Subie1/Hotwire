const express = require("express");
const { createHash, randomBytes } = require("crypto");
const canAuthenticate = require("../lib/canAuthenticate");

const algorithm = process.argv.algorithm || "sha256";
const users = MainStorage.box("users");

const router = express.Router();
router.use("/ping", require("../middleware/Authentication"));

router.get("/ping", (_, res) => {
	return res.status(200).end();
});

router.get("/:id", (req, res) => {
	if (!users.has(req.params.id)) return res.status(404).end();
	const user = users.get(req.params.id);

	/* Sensitive Data */
	delete user.token;

	return res.status(200).json(user);
});

router.post("/login", (req, res) => {
	if (!canAuthenticate(req, res)) return;

	const members = users.values();

	for (const member of Array.from(members)) {
		if (member.name !== req.body.name) continue;
		if (
			member.token !==
			createHash(algorithm).update(req.body.password).digest("hex")
		)
			continue;

		return res.status(200).json(member);
	}

	return res.status(403).end("Name or password is incorrect.");
});

router.post("/register", (req, res) => {
	if (!canAuthenticate(req, res, true)) return;

	const members = Array.from(users.values());

	for (const member of members)
		if (member.name === req.body.name)
			return res.status(406).end("Name already in use.");

	const id = randomBytes(6).toString("hex");
	const username = req.body.username
		? req.body.username.trim().length
			? req.body.username.trim()
			: `User_${id}`
		: `User_${id}`;
	const token = createHash(algorithm)
		.update(req.body.password.trim())
		.digest("hex");

	const user = { id, username, name: req.body.name.trim(), token, admin: members.length ? false : true };

	users.set(id, user);
	return res.status(201).json(user);
});

module.exports = router;
