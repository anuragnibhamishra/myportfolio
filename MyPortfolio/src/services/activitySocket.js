import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_ACTIVITY_API_URL ||
  "https://myportfolio-production-5da1.up.railway.app";

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

let currentActivity = null;
let connectionState = "disconnected";
const subscribers = new Set();

function notify() {
  const snapshot = { activity: currentActivity, connectionState };
  subscribers.forEach((subscriber) => subscriber(snapshot));
}

socket.on("connect", () => {
  connectionState = "connected";
  notify();
});

socket.on("activity:current", (activity) => {
  currentActivity = activity;
  notify();
});

socket.on("activity:update", (activity) => {
  currentActivity = activity;
  notify();
});

socket.on("disconnect", () => {
  connectionState = "disconnected";
  notify();
});

socket.on("connect_error", () => {
  connectionState = "disconnected";
  notify();
});

export function subscribeToActivity(subscriber) {
  subscribers.add(subscriber);
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
