const express = require("express");
const router = express.Router();

const users = MainStorage.box("users");

router.all("*", (req, res, next) => {
	if (!req.headers.authorization)
		return res.status(401).end("You must be logged in");

	const members = users.values();

	for (const member of Array.from(members))
		if (member.token === req.headers.authorization && member.admin)
			return next();
	return res.status(403).end("You must be logged in to a valid admin account");
});

module.exports = router;
