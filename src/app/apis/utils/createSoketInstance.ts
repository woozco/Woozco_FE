import { io } from "socket.io-client";

export const socketInstance = io(process.env.NEXT_PUBLIC_API_BASE_ADDRESS || "http://localhost:3001"); // Adjust the URL to your backend server

