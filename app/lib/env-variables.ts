export function checkEnv(env: NodeJS.ProcessEnv) {
  const required = [
    "DOMAIN_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "DATABASE_URL",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_DB",
    "POSTGRES_HOST",
    "PORT",
    "NODE_ENV",
    "REDIS_URL",
    "REDIS_PASSWORD",
  ];

  const missing = required.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  } else {
    console.log("All required environment variables are set");
  }
}
