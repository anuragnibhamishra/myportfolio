import "dotenv/config";

function parsePort(value: string | undefined): number {
  const port = Number(value ?? 5000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }
  return port;
}

function parseAllowedOrigins(value: string | undefined): string[] {
  const origins = (value ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

  if (origins.length === 0) {
    throw new Error("ALLOWED_ORIGIN must contain at least one origin");
  }

  for (const origin of origins) {
    let parsedOrigin: URL;
    try {
      parsedOrigin = new URL(origin);
    } catch {
      throw new Error(`ALLOWED_ORIGIN contains an invalid origin: ${origin}`);
    }

    if (["http:", "https:"].includes(parsedOrigin.protocol) === false || parsedOrigin.pathname !== "/" || parsedOrigin.search || parsedOrigin.hash) {
      throw new Error(`ALLOWED_ORIGIN contains an invalid origin: ${origin}`);
    }
  }

  return origins;
}

function loadEnv() {
  try {
    return {
      port: parsePort(process.env.PORT),
      allowedOrigins: parseAllowedOrigins(process.env.ALLOWED_ORIGIN),
    };
  } catch (error) {
    console.error(`Configuration error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
}

export const env = loadEnv();
