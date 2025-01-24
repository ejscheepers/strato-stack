import siteData from "@/config/siteData.json";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

export const meta = () => {
  return [{ title: siteData.title, description: siteData.description }];
};

export async function action({ request }: ActionFunctionArgs) {}
export async function loader({ request }: LoaderFunctionArgs) {
  return "null";
}
export default function Index() {
  return (
    <div className="flex min-h-full flex-1 flex-col sm:px-6 lg:px-8 pt-6 space-y-6 px-3">
      <div className="sm:mx-auto sm:w-full">
        <h1 className="text-4xl">
          Welcome to the <strong>{siteData.name}!</strong>
        </h1>
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
          <h2 className="text-xl font-semibold">Express Server</h2>
          <p>
            Fast, unopinionated, minimalist web framework for Node.js - fully
            Typescript ready.
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
          <p>The most comprehensive authentication framework for TypeScript.</p>
        </div>
      </div>
    </div>
  );
}
