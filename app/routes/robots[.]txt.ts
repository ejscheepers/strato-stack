import { generateRobotsTxt } from "@forge42/seo-tools/robots";
import { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const isProductionDeployment = process.env.NODE_ENV === "production";
  const domain = new URL(request.url).origin;
  const robotsTxt = generateRobotsTxt([
    {
      userAgent: "*",
      [isProductionDeployment ? "allow" : "disallow"]: ["/"],
      sitemap: [`${domain}/sitemap-index.xml`],
    },
  ]);

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
