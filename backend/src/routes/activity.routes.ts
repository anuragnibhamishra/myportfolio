import { Router } from "express";
import {
  clearActivity,
  createActivity,
  getCurrentActivity,
} from "../controllers/activity.controller";

export const activityRouter = Router();

activityRouter.post("/", createActivity);
activityRouter.get("/current", getCurrentActivity);
activityRouter.post("/clear", clearActivity);
