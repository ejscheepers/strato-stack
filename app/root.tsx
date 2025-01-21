import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router";

import "./tailwind.css";

import { type LoaderFunctionArgs, redirect } from "react-router";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import siteData from "./config/siteData.json";
import { auth } from "./lib/auth";
import { signOut } from "./lib/auth-client";

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await auth.api.getSession({
    headers: request.headers,
  });
  if (session && new URL(request.url).pathname === "/") {
    throw redirect("/dashboard");
  }

  console.log(session?.user?.id);

  return { userId: session?.user?.id };
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
  const { userId } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

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
          <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
            <Link to="/" className="block leading-3 w-1/3">
              <div className="font-black text-2xl text-white">
                {siteData.name}
              </div>
            </Link>
            <div className="w-1/3 flex justify-end">
              {userId ? (
                <Button
                  onClick={async () => {
                    signOut({}, { onSuccess: () => navigate("/?logout=true") });
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login" className="block text-center">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex-grow min-h-0 h-full">
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
