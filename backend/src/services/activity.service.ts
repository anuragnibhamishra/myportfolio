import type { Activity, ActivityInput } from "../types/activity";

export interface ActivityUpdate {
  activity: Activity;
  changed: boolean;
}

class ActivityService {
  private currentActivity: Activity | null = null;

  setCurrentActivity(input: ActivityInput): ActivityUpdate {
    const activity: Activity = {
      ...input,
      receivedAt: Date.now(),
    };
    const changed = !this.currentActivity ||
      this.currentActivity.app !== activity.app ||
      this.currentActivity.packageName !== activity.packageName ||
      this.currentActivity.action !== activity.action;
    this.currentActivity = activity;
    return { activity, changed };
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
