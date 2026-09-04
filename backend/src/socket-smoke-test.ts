import { io } from "socket.io-client";

const socket = io(process.env.SOCKET_URL ?? "http://localhost:5000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log(`Connected: ${socket.id}`);
});

socket.on("activity:current", (activity) => {
  console.log("activity:current", JSON.stringify(activity));
});

socket.on("activity:update", (activity) => {
  console.log("activity:update", JSON.stringify(activity));
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error.message);
});

process.once("SIGINT", () => {
  socket.close();
  process.exit(0);
});
