import { app } from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.info(`Activity Tracker API listening on http://localhost:${env.port}`);
});
