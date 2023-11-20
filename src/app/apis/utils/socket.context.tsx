"use client"
import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_BASE_ADDRESS || "http://localhost:3001", { reconnection: true });
export const mediasoup = io( "https://localhost:3004/socket.io" || "https://localhost:3002", { secure: false, reconnection: true, rejectUnauthorized : false });

export const SocketContext = createContext(socket);