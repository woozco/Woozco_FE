"use client";
import { useEffect, useState } from "react";
import { socketInstance } from "@/app/apis/utils/createSoketInstance";
import { useRouter } from "next/navigation";
import CustomButton from "../Custombutton";

const ListCaller = () => {
    const [rooms, setRooms] = useState<string[]>([]);
    const router = useRouter()

    const joinRoom = (room: string): void => {
        socketInstance.emit("joinRoom", room);
        socketInstance.emit("getClientsInRoom", room);
        router.push(`/room/${room}`)
    };

    useEffect(() => {
        socketInstance.emit("getRooms");
        socketInstance.on("roomsList", (data) => {
            setRooms(data);
        });

        return () => {

        };
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
