import {
  isRouteErrorResponse,
  Links,
  type LoaderFunctionArgs,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { Toaster } from "./components/ui/toaster";
import { auth } from "./lib/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await auth.api.getSession({
    headers: request.headers,
  });
  if (session && new URL(request.url).pathname === "/") {
    throw redirect("/dashboard");
  }
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error) {
    //Sentry.captureException(error);
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen bg-slate-100 text-slate-900">
        <div className="h-full flex flex-col min-h-0">
          <div className="grow min-h-0 h-full">
            <Outlet />
            <Toaster />
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
