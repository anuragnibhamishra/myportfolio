import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_ACTIVITY_API_URL ||
  "https://myportfolio-production-5da1.up.railway.app";

console.info("[ActivityTracker] Initializing Socket.IO client");
console.info(`[ActivityTracker] Connecting to: ${SOCKET_URL}`);

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

let currentActivity = null;
let connectionState = "disconnected";
const subscribers = new Set();

function notify() {
  const snapshot = { activity: currentActivity, connectionState };
  console.info(`[ActivityTracker] UI connection state: ${connectionState}`);
  subscribers.forEach((subscriber) => subscriber(snapshot));
}

socket.on("connect", () => {
  console.info(`[ActivityTracker:Socket] Connected with socket.id: ${socket.id}`);
  connectionState = "connected";
  notify();
});

socket.on("activity:current", (activity) => {
  console.info("[ActivityTracker:Activity] activity:current", activity);
  currentActivity = activity;
  notify();
});

socket.on("activity:update", (activity) => {
  console.info("[ActivityTracker:Activity] activity:update", activity);
  currentActivity = activity;
  notify();
});

socket.on("disconnect", () => {
  console.info("[ActivityTracker:Socket] Disconnected");
  connectionState = "disconnected";
  notify();
});

socket.on("connect_error", (error) => {
  console.error("[ActivityTracker:Socket] connect_error", error);
  connectionState = "disconnected";
  notify();
});

socket.io.on("reconnect", (attempt) => {
  console.info(`[ActivityTracker:Socket] Reconnected after attempt ${attempt}`);
});

socket.io.on("reconnect_attempt", (attempt) => {
  console.info(`[ActivityTracker:Socket] Reconnect attempt ${attempt}`);
});

socket.io.on("reconnect_error", (error) => {
  console.error("[ActivityTracker:Socket] reconnect_error", error);
});

export function subscribeToActivity(subscriber) {
  subscribers.add(subscriber);
  console.info(`[ActivityTracker] UI connection state: ${connectionState}`);
  subscriber({ activity: currentActivity, connectionState });

  if (!socket.connected) {
    connectionState = "connecting";
    notify();
    socket.connect();
  }

  return () => {
    subscribers.delete(subscriber);
  };
}
