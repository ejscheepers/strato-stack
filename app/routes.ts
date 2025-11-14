import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("login", "./routes/login.tsx"),
  route("signup", "./routes/signup.tsx"),
  route("dashboard", "./routes/dashboard.tsx"),
  route("api/auth/*", "./routes/api.auth.$.ts"),
  route("resources/up", "./routes/resources.up.tsx"),
  route("robots.txt", "./routes/robots[.]txt.ts"),
  route("sitemap.xml", "./routes/sitemap[.]xml.ts"),
  route("sitemap-index.xml", "./routes/sitemap-index[.]xml.ts"),
  route("*", "./routes/404.tsx"),
] satisfies RouteConfig;
