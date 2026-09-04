import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import { activityRouter } from "./routes/activity.routes";

export const app = express();

app.use(
  cors({
    origin: env.allowedOrigins,
  })
);
app.use(express.json());
app.use((req, _res, next) => {
  const startedAt = Date.now();
  _res.on("finish", () => {
    console.info(`${req.method} ${req.originalUrl} ${_res.statusCode} ${Date.now() - startedAt}ms`);
  });
  next();
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Activity Tracker API is running",
  });
});

app.use("/api/activity", activityRouter);
app.use(notFoundHandler);
app.use(errorHandler);
