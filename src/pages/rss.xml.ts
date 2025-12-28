import { get_list } from "@utils/blog";
import type { APIRoute } from "astro";
import rss from "@astrojs/rss";

export const GET = (async () => {
	return rss({
		title: "Harshul's Blog",
		// `<description>` field in output xml
		description: "My corner of randomess on the internet",

		site: "https://hvijay.dev",

		items: (await get_list()).map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: new Date(post.date!) ?? new Date(),
			link: `/blog/${post.slug}`,
		})),
	});
}) satisfies APIRoute;
