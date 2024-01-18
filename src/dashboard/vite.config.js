import { defineConfig } from "vite";

import colors from "file:///D:/Code/Tauri/hotwire/src/dashboard/node_modules/colors/lib/index.js";
const { enable } = colors;

import react from "@vitejs/plugin-react";

enable();

console.log(
	"1:" +
		` FRONTEND `.bgCyan.black +
		" Frontend hosted on 0.0.0.0:5173 [http://127.0.0.1:5173]"
);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        cors: true,
    },
})