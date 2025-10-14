// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://pakhrom.ru",
	trailingSlash: "never",
	vite: {
		plugins: [tailwindcss()],
	},

	server: {
		allowedHosts: [".trycloudflare.com"],
	},
});
