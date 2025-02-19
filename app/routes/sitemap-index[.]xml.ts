import { generateSitemapIndex } from "@forge42/seo-tools/sitemap";
import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const domain = new URL(request.url).origin;
  const sitemaps = generateSitemapIndex([
    {
      url: `${domain}/sitemap.xml`,
      lastmod: "2024-07-17",
    },
  ]);

  return new Response(sitemaps, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
