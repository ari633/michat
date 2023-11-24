import { io } from "socket.io-client";

export const socket = io("ws://localhost:9090", { autoConnect: false });
