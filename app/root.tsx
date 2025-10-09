import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs,
} from "react-router";

import "./app.css";

import { type LoaderFunctionArgs, redirect } from "react-router";
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

export function shouldRevalidate({
  formAction,
  currentUrl,
  nextUrl,
}: ShouldRevalidateFunctionArgs) {
  // Check for form actions
  if (formAction && ["/login", "/signup"].includes(formAction)) {
    return true;
  }

  // Check for logout parameter in the URL
  const nextUrlObj = new URL(nextUrl);
  if (nextUrlObj.searchParams.get("logout") === "true") {
    return true;
  }

  return false;
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
