import { generateSitemap } from "@forge42/seo-tools/sitemap";
import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const domainUrl = new URL(request.url).origin;

  const sitemap = await generateSitemap({
    domain: domainUrl,
    // Defines the routes you want to exclude from the sitemap (useful if routes are dynamic or auto-generated)
    ignore: ["/dashboard", "/login", "/signup", "/resources/*", "/api/*"],
    // Defines the routes you want to include in the sitemap
    routes: [
      { url: "/", lastmod: "2025-01-28", changefreq: "monthly", priority: 0.8 },
    ],
  });

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
