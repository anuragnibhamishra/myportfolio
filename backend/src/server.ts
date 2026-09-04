import { createServer } from "node:http";
import { app } from "./app";
import { env } from "./config/env";
import { activityService } from "./services/activity.service";
import { socketService } from "./services/socket.service";

const httpServer = createServer(app);

socketService.setCurrentActivityProvider(() => activityService.getCurrentActivity());
socketService.initialize(httpServer);

httpServer.on("error", (error) => {
  console.error("Activity Tracker server startup error", error);
  process.exitCode = 1;
});

httpServer.listen(env.port, "0.0.0.0", () => {
  console.info(`Activity Tracker API listening on port ${env.port}`);
});
