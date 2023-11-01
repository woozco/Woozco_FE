"use client"
import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_BASE_ADDRESS || "http://localhost:3001", { reconnection: true });
export const mediasoup = io(process.env.NEXT_PUBLIC_MEDIA_BASE_ADDRESS || "http://localhost:3002/mediasoup", { reconnection: true });

interface SocketContextInterface {
    socket: Socket
}

export const SocketContext = createContext<SocketContextInterface>({ socket });