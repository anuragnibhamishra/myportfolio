import type { Request, Response } from "express";
import { activitySchema } from "../schemas/activity.schema";
import { activityService } from "../services/activity.service";
import { socketService } from "../services/socket.service";

export function createActivity(req: Request, res: Response): void {
  const input = activitySchema.parse(req.body);
  const update = activityService.setCurrentActivity(input);
  if (update.changed) {
    socketService.broadcastActivity(update.activity);
  }
  res.status(200).json({ success: true, data: update.activity });
}

export function getCurrentActivity(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: activityService.getCurrentActivity(),
  });
}

export function clearActivity(_req: Request, res: Response): void {
  const activity = activityService.clearCurrentActivity();
  socketService.broadcastActivity(activity);
  res.status(200).json({
    success: true,
    data: activity,
  });
}
