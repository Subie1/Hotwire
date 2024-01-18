const express = require("express");
const User = require("../lib/User");
const router = express.Router();

router.use(require("../middleware/Authentication"));

router.get("/me", (req, res) => {
	const user = User(req.headers.authorization);
	if (user) return res.status(200).json(user);
	res.status(404).end("You must be logged in to a valid account");
});

module.exports = router;
