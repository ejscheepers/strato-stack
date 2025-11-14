import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { data, Link, useNavigate } from "react-router";

export function loader() {
  // Return 404 status without throwing - this renders the component with proper HTTP status
  return data(null, { status: 404 });
}

export default function CatchAll() {
  const navigate = useNavigate();

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-12 pb-12 px-8 text-center">
          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="text-9xl font-bold text-primary/60 select-none">
              404
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
