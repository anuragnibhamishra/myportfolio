import type { Request, Response } from "express";
import { activitySchema } from "../schemas/activity.schema";
import { activityService } from "../services/activity.service";

export function createActivity(req: Request, res: Response): void {
  const input = activitySchema.parse(req.body);
  const activity = activityService.setCurrentActivity(input);
  res.status(200).json({ success: true, data: activity });
}

export function getCurrentActivity(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: activityService.getCurrentActivity(),
  });
}

export function clearActivity(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: activityService.clearCurrentActivity(),
  });
}
