import { Link, redirect } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { Route } from "./+types/login";

export const meta = () => {
  return [{ title: "Login" }];
};

export async function loader({ request }: Route.LoaderArgs) {
  let session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    throw redirect("/dashboard");
  }

  return null;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <div className="flex min-h-full flex-1 flex-col mt-20 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-describedby="password-error"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Checkbox
                  onClick={() => {
                    setRememberMe(!rememberMe);
                  }}
                />
                <Label>Remember me</Label>
              </div>
              <Link
                to="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              onClick={async () => {
                await signIn.email(
                  {
                    email: email,
                    password: password,
                    callbackURL: "/dashboard",
                    rememberMe: rememberMe,
                  },
                  {
                    onRequest: () => {
                      setLoading(true);
                    },
                    onResponse: () => {
                      setLoading(false);
                    },
                    onError: (ctx) => {
                      toast({
                        title: "Error",
                        description: ctx.error.message,
                      });
                    },
                  }
                );
              }}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
