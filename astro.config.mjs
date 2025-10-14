// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
	site: "https://pakhrom.ru",
	trailingSlash: "never",

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [svelte()],

	server: {
		allowedHosts: [".trycloudflare.com"],
	},
});
