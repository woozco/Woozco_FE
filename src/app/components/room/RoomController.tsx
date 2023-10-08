"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from 'next/navigation'
import { socketInstance } from "@/app/apis/utils/createSoketInstance";
import CustomButton from "../Custombutton";

const RoomController: React.FC = () => {
    const router = useRouter()
    const [socket, setSocket] = useState<Socket | null>(null);
    const [room, setRoom] = useState<string>("default");

    useEffect(() => {
        setSocket(socketInstance);

        return () => {
            socketInstance.close();
        };
    }, []);

    const joinRoom = () : void =>  {
        socketInstance.emit("joinRoom", room);
        socketInstance.emit("getClientsInRoom", room);
        router.push(`/room/${room}`)
    };

    useEffect(() => {
        socketInstance.on("joinedRoom", (room: string) => {
            console.log(`Joined room ${room}`);
        });
        socketInstance.on("leftRoom", (room: string) => {
            console.log(`Left room ${room}`);
        });

        return () => {
            socketInstance.off("joinedRoom");
            socketInstance.off("leftRoom");
        };
    }, [socketInstance]);

    return (
        <div>
            <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room name"
            />
            <CustomButton onClick={()=>joinRoom} buttonText="방 입장"></CustomButton>
        </div>
    );
};

export default RoomController;
