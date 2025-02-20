import { Nav } from "@/components/nav";
import siteData from "@/config/siteData.json";
import { auth } from "@/lib/auth";
import { generateMeta } from "@forge42/seo-tools/remix/metadata";
import { organization } from "@forge42/seo-tools/structured-data/organization";
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/_index";

export const meta: MetaFunction = () => {
  // This utility will under the hood generate the twitter & og title and description tags for you.
  const meta = generateMeta(
    {
      title: siteData.title,
      description: siteData.description,
      url: siteData.url,
    },
    [
      {
        "script:ld+json": organization({
          "@type": "Organization",
          name: siteData.name,
          description: siteData.description,
          url: siteData.url,
        }),
      },
    ]
  );

  return meta;
};

export async function loader({ request }: Route.LoaderArgs) {
  let session = await auth.api.getSession({
    headers: request.headers,
  });

  return { isLoggedIn: !!session };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { isLoggedIn } = loaderData;
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} />
      <div className="flex min-h-full flex-1 flex-col sm:px-6 lg:px-8 pt-6 space-y-6 px-3">
        <div className="sm:mx-auto sm:w-full flex justify-between items-center">
          <h1 className="text-4xl">
            Welcome to the <strong>{siteData.name}!</strong>
          </h1>
          <a
            href="https://github.com/ejscheepers/strato-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 flex items-center gap-2"
          >
            View on Github
            <img
              height="32"
              width="32"
              src="https://cdn.simpleicons.org/github"
            />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">React Router</h2>
            <p>
              A user-obsessed, standards-focused, multi-strategy router you can
              deploy anywhere.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Shadcn UI</h2>
            <p>
              Shadcn UI is a set of components and utilities that make building
              UIs with Tailwind CSS easier and more accessible.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Tailwind CSS</h2>
            <p>
              Tailwind CSS is a utility-first CSS framework for rapidly building
              custom designs. It's used to style the {siteData.name}.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Drizzle ORM</h2>
            <p>
              Drizzle ORM is a lightweight, flexible, and powerful
              Object-Relational Mapping (ORM) library for Node.js.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">PostgreSQL</h2>
            <p>
              PostgreSQL is a powerful, open-source object-relational database
              system that uses and extends the SQL language combined with many
              features that safely store and scale the most complicated data
              workloads.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Better Auth</h2>
            <p>
              The most comprehensive authentication framework for TypeScript.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">SEO Ready</h2>
            <p>
              The {siteData.name} is SEO ready. It automatically generates meta
              tags, sitemaps, and robots.txt.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Docker Ready</h2>
            <p>
              The {siteData.name} is ready to be deployed anywhere using Docker.
              No vendor lock-in.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
