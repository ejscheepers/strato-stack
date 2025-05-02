import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: "./server/app.ts",
        }
      : undefined,
  },
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
}));
