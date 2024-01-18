const express = require("express");
const User = require("../lib/User");
const router = express.Router();

router.all("*", (req, res, next) => {
	if (!req.headers.authorization)
		return res.status(401).end("You must be logged in");

	const user = User(req.headers.authorization);
	if (user && user.admin) return next();
	return res.status(403).end("You must be logged in to a valid admin account");
});

module.exports = router;
