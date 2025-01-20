import { reactRouter } from "@react-router/dev/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const domainUrl = new URL(process.env.DOMAIN_URL || "http://localhost:3000");

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  server: {
    host: domainUrl.hostname,
    port: parseInt(domainUrl.port) || 3000,
  },
});
