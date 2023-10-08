import { io } from "socket.io-client";

export const socketInstance = io("http://localhost:3001"); // Adjust the URL to your backend server

