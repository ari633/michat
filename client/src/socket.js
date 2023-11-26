import { io } from "socket.io-client";
const SOCKET_WS = process.env.REACT_APP_SOCKET_WS || "ws://localhost:9090";;

export const socket = io(SOCKET_WS, { autoConnect: false });
