import { Button } from "@/components/ui/button";
import siteData from "@/config/siteData.json";
import { signOut } from "@/lib/auth-client";
import { Link, useNavigate } from "react-router";

export function Nav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
      <Link to="/dashboard" className="block leading-3 w-1/3">
        <div className="font-black text-2xl text-white">{siteData.name}</div>
      </Link>
      <div className="w-1/3 flex justify-end">
        {isLoggedIn ? (
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
  );
}
