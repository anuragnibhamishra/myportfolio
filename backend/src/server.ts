import { createServer } from "node:http";
import { app } from "./app";
import { env } from "./config/env";
import { activityService } from "./services/activity.service";
import { socketService } from "./services/socket.service";

const httpServer = createServer(app);

socketService.setCurrentActivityProvider(() => activityService.getCurrentActivity());
socketService.initialize(httpServer);

httpServer.listen(env.port, () => {
  console.info(`Activity Tracker API listening on http://localhost:${env.port}`);
});
