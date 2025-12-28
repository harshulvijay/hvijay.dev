import rehype_autolink_headings from "rehype-autolink-headings";
import rehype_external_links from "rehype-external-links";
import { defineConfig } from "astro/config";
import rehype_slug from "rehype-slug";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import { h } from "hastscript";

export default defineConfig({
	integrations: [mdx(), svelte()],
	server: {
		// https://stackoverflow.com/a/78021350
		// ^ that didn't work for some reason
		port: 7890,
	},
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {
				limitInputPixels: false,
			},
		},
	},
	vite: {
		css: {
			transformer: "lightningcss",
		},
		build: {
			cssMinify: "lightningcss",
		},
	},
	experimental: { contentIntellisense: true },
	markdown: {
		shikiConfig: {
			themes: {
				light: "one-light",
				midday: "everforest-light",
				dark: "catppuccin-macchiato",
				radioactive: "houston",
			},
		},
		rehypePlugins: [
			rehype_slug,
			[
				rehype_autolink_headings,
				{
					behavior: "prepend",
					content(node) {
						return [
							h("span.visually-hidden", "#"),
							h("span.icon.icon-link", { ariaHidden: "true" }),
						];
					},
				},
			],
			[
				rehype_external_links,
				{ rel: ["nofollow", "noopener", "noreferrer"], target: "_blank" },
			],
		],
	},
});
