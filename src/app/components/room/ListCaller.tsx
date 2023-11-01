"use client";
import { useEffect, useState } from "react";
import { socket } from "@/app/apis/utils/socket.context";
import { useRouter } from "next/navigation";
import CustomButton from "../Custombutton";

const ListCaller = () => {
    const [rooms, setRooms] = useState<string[]>([]);
    const router = useRouter()

    const joinRoom = (room: string): void => {
        socket.emit("joinRoom", room);
        socket.emit("getClientsInRoom", room);
        router.push(`/room/${room}`)
    };

    useEffect(() => {
        socket.emit("getRooms");
        socket.on("roomsList", (data) => {
            setRooms(data);
        });
    }, []);

    return (
        <div>
            <br></br>
            <div className="list-container">
                {rooms.map((name) => (
                    <div key={name}className="list-item">
                        <a>{name}</a>
                        <CustomButton onClick={() => joinRoom(name)} buttonText={"입장"}></CustomButton>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListCaller;
