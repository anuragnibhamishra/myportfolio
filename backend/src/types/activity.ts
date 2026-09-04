export interface Activity {
  app: string;
  packageName: string;
  action: string;
  startedAt: number;
  receivedAt: number;
}

export interface ActivityInput {
  app: string;
  packageName: string;
  action: string;
  startedAt: number;
}
