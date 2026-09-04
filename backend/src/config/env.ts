import "dotenv/config";

function parsePort(value: string | undefined): number {
  const port = Number(value ?? 5000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }
  return port;
}

const allowedOrigins = (process.env.ALLOWED_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  throw new Error("ALLOWED_ORIGIN must contain at least one origin");
}

export const env = {
  port: parsePort(process.env.PORT),
  allowedOrigins,
};
