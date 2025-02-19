import compression from "compression";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import PgBoss from "pg-boss";
import { checkEnv } from "./env-variables";

// Short-circuit the type-checking of the built output.
const BUILD_PATH = "../build/server/index.js";
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = express();

app.use(compression());
app.disable("x-powered-by");
app.use(morgan("tiny"));
checkEnv(process.env);

if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts");
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  console.log("Starting production server");
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
  app.use(express.static("build/client", { maxAge: "1h" }));
  app.use(await import(BUILD_PATH).then((mod) => mod.app));
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

async function pgBoss() {
  const boss = new PgBoss(process.env.DATABASE_URL!);

  boss.on("error", console.error);

  await boss.start();

  const everyMinuteQueue = "every-minute";

  await boss.createQueue(everyMinuteQueue);

  // Schedule the job to run every minute using a 5-placeholder cron expression
  await boss.schedule(everyMinuteQueue, "* * * * *");

  await boss.work(everyMinuteQueue, async () => {
    console.log(`Executing [every-minute] at ${new Date().toISOString()}`);
  });
}

pgBoss().catch((err) => {
  console.log(err);
  process.exit(1);
});
