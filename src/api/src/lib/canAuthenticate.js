const { readFileSync } = require("fs");

const configPath = process.argv.config || "./config.json";
const config = JSON.parse(readFileSync(configPath, "utf-8"));

module.exports = (req, res, isRegister = false) => {
	if (req.headers.authorization) {
		res.status(403).end("Already logged in.");
		return false;
	}

	if (!req.body.name) {
		res.status(400).end("Invalid name.");
		return false;
	}

	if (!req.body.password) {
		res.status(400).end("Invalid password.");
		return false;
	}

	if (isRegister && !req.body.passwordConfirm) {
		res.status(400).end("Invalid password confirmation.");
		return false;
	}

	if (!req.body.name.trim().length) {
		res.status(400).end("Invalid name.");
		return false;
	}
	if (!req.body.password.trim().length) {
		res.status(400).end("Invalid password.");
		return false;
	}

	if (isRegister && !req.body.passwordConfirm.trim().length) {
		res.status(400).end("Invalid password confirmation.");
		return false;
	}

	if (req.body.name.trim().length < config.MIN_NAME_LENGTH) {
		res
			.status(400)
			.end("Name must be at least " + config.MIN_NAME_LENGTH + ".");
		return false;
	}

	if (req.body.password.trim().length < config.MIN_PASSWORD_LENGTH) {
		res
			.status(400)
			.end("Password must be at least " + config.MIN_PASSWORD_LENGTH + ".");
		return false;
	}

	if (
		isRegister &&
		req.body.passwordConfirm.trim().length < config.MIN_PASSWORD_LENGTH
	) {
		res
			.status(400)
			.end(
				"Password confirmation must be at least " +
					config.MIN_PASSWORD_LENGTH +
					"."
			);
		return false;
	}

	if (req.body.name.trim().length > config.MAX_NAME_LENGTH) {
		res
			.status(400)
			.end("Name can't be longer than " + config.MAX_NAME_LENGTH + ".");
		return false;
	}

	if (req.body.password.trim().length > config.MAX_PASSWORD_LENGTH) {
		res
			.status(400)
			.end("Password can't be longer than " + config.MAX_PASSWORD_LENGTH + ".");
		return false;
	}

	if (
		isRegister &&
		req.body.passwordConfirm.trim().length > config.MAX_PASSWORD_LENGTH
	) {
		res
			.status(400)
			.end(
				"Password confirmation can't be longer than " +
					config.MAX_PASSWORD_LENGTH +
					"."
			);
		return false;
	}

	if (!isASCII(req.body.name.trim())) {
		res.status(400).end("Name can't contain special characters.");
		return false;
	}

	if (!isASCII(req.body.password.trim())) {
		res.status(400).end("Password can't contain special characters.");
		return false;
	}

	if (isRegister && !isASCII(req.body.passwordConfirm.trim())) {
		res
			.status(400)
			.end("Password confirmation can't contain special characters.");
		return false;
	}

	if (
		isRegister &&
		req.body.passwordConfirm.trim() !== req.body.password.trim()
	) {
		res.status(400).end("Password confirmation doesn't match the password.");
		return false;
	}

	return true;
};

function isASCII(str) {
	if (typeof str !== "string") {
		return false;
	}
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 127) {
			return false;
		}
	}
	return true;
}
