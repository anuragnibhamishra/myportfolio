import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { env } from "../config/env";
import type { Activity } from "../types/activity";

class SocketService {
  private io: Server | null = null;

  initialize(httpServer: HttpServer): void {
    this.io = new Server(httpServer, {
      cors: {
        origin: env.allowedOrigins,
      },
    });

    this.io.on("connection", (socket) => {
      console.info(`Socket client connected: ${socket.id}`);
      socket.emit("activity:current", this.currentActivityProvider?.() ?? null);

      socket.on("disconnect", () => {
        console.info(`Socket client disconnected: ${socket.id}`);
      });
    });
  }

  setCurrentActivityProvider(provider: () => Activity | null): void {
    this.currentActivityProvider = provider;
  }

  broadcastActivity(activity: Activity | null): void {
    this.io?.emit("activity:update", activity);
  }

  private currentActivityProvider: (() => Activity | null) | null = null;
}

export const socketService = new SocketService();
