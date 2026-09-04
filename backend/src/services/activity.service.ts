import type { Activity, ActivityInput } from "../types/activity";

class ActivityService {
  private currentActivity: Activity | null = null;

  setCurrentActivity(input: ActivityInput): Activity {
    const activity: Activity = {
      ...input,
      receivedAt: Date.now(),
    };
    this.currentActivity = activity;
    return activity;
  }

  getCurrentActivity(): Activity | null {
    return this.currentActivity;
  }

  clearCurrentActivity(): null {
    this.currentActivity = null;
    return null;
  }
}

export const activityService = new ActivityService();
