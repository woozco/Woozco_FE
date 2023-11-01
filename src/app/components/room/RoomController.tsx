"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { socket } from "@/app/apis/utils/socket.context";
import CustomButton from "../Custombutton";

const RoomController: React.FC = () => {
    const router = useRouter()
    const [room, setRoom] = useState<string>("");

    const joinRoom = () : void =>  {
        socket.emit("joinRoom", room);
        socket.emit("getClientsInRoom", room);
        router.push(`/room/${room}`)
    };

    useEffect(() => {
        socket.on("joinedRoom", (room: string) => {
            console.log(`Joined room ${room}`);
        });
        socket.on("leftRoom", (room: string) => {
            console.log(`Left room ${room}`);
        });

        return () => {
            socket.off("joinedRoom");
            socket.off("leftRoom");
        };
    }, [socket]);

    return (
        <div className="list-container">
            <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room name"
            />
            <CustomButton onClick={()=>joinRoom} buttonText="방 입장"/>
        </div>
    );
};

export default RoomController;