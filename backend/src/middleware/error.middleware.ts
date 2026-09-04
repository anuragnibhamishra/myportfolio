import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof SyntaxError && "body" in error) {
    res.status(400).json({ success: false, error: "Invalid JSON" });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({ success: false, error: "Invalid activity payload" });
    return;
  }

  console.error("Unhandled server error", error);
  res.status(500).json({ success: false, error: "Internal server error" });
};
