import { z } from "zod";
import type { ActivityInput } from "../types/activity";

const currentTime = () => Date.now();

export const activitySchema = z.object({
  app: z.string().trim().min(1),
  packageName: z.string().trim().min(1),
  action: z.string().trim().min(1),
  startedAt: z
    .number()
    .finite()
    .int()
    .positive()
    .refine((timestamp) => timestamp >= 946684800000, "startedAt is too old")
    .refine(
      (timestamp) => timestamp <= currentTime() + 5 * 60 * 1000,
      "startedAt cannot be far in the future"
    ),
}) satisfies z.ZodType<ActivityInput>;
