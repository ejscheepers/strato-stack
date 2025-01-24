import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import esbuild from "esbuild";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  buildEnd: async () => {
    await esbuild
      .build({
        alias: { "~": "./app" },
        outfile: "build/server/index.js",
        entryPoints: ["server/index.ts"],
        external: ["./build/server/*"],
        platform: "node",
        format: "esm",
        packages: "external",
        bundle: true,
        logLevel: "info",
      })
      .catch((error: unknown) => {
        console.error("Error building server:", error);
        process.exit(1);
      });
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
