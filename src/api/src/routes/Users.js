const express = require("express");
const router = express.Router();

const users = MainStorage.box("users");

router.use(require("../middleware/Authentication"));

router.get("/me", (req, res) => {
    const members = Array.from(users.values());

    for (const member of members) if (member.token === req.headers.authorization) return res.status(200).json(member);
    res.status(404).end("You must be logged in to a valid account");
})

module.exports = router;