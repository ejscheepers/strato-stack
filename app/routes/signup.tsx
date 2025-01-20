import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

import siteData from "@/config/siteData.json";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";
import { useState } from "react";
import { redirect } from "react-router";
import type { Route } from "./+types/signup";

export const meta = () => {
  return [{ title: "Signup" }];
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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-1 flex-col mt-20 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account to start using {siteData.name}
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
                aria-describedby="password-error"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwordConfirmation">
                Password Confirmation
              </Label>
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              onClick={async () => {
                await signUp.email(
                  {
                    email,
                    password,
                    name: ``,
                  },
                  {
                    onResponse: (ctx) => {
                      setLoading(false);
                      if (ctx.response.status === 200) {
                        navigate("/dashboard");
                      }
                    },
                    onRequest: () => {
                      setLoading(true);
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
                "Sign Up"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link className="underline" to="/login">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
