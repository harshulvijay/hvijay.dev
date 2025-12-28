import { defineCollection, z } from "astro:content";
import { SERIES } from "./content/series.ts";
import { glob } from "astro/loaders";

const [first_key, ...rest] = Object.keys(SERIES) as (keyof typeof SERIES)[];

const blog = defineCollection({
	loader: glob({ pattern: "*/*.mdx", base: "./src/content/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			cover_image: image().optional(),
			render_cover: z.boolean().optional().default(true),
			series: z.enum([first_key!, ...rest]).optional(),
		}),
});

export const collections = { blog };
