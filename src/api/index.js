const express = require("express");
const cors = require("cors");
const { readFileSync } = require("fs");

require("colors").enable();
require("./src/lib/loadArgv");
require("./src/lib/loadDirectories");

const configPath = process.argv.config || "./config.json";
const config = JSON.parse(readFileSync(configPath, "utf-8"));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

app.use("/api/playlists", require("./src/routes/Playlists"));
app.use("/api/songs", require("./src/routes/Songs"));
app.use("/api/upload", require("./src/routes/Upload"));
app.use("/api/auth", require("./src/routes/Authentication"));
app.use("/api/users", require("./src/routes/Users"));

const port = process.env.VITE_BACKEND_PORT || (process.argv.port ?? 3000);
app.listen(port, () =>
	console.log(
		" BACKEND ".bgWhite.black + " Ready on port " + `${port}`.yellow
	)
);
