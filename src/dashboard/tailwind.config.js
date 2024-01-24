/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{jsx,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				text: "rgb(var(--text) / <alpha-value>)",
				background: "rgb(var(--background) / <alpha-value>)",
				primary: "rgb(var(--primary) / <alpha-value>)",
				secondary: "rgb(var(--secondary) / <alpha-value>)",
				accent: "rgb(var(--accent) / <alpha-value>)",
			},
		},
	},
	plugins: [],
};

