"use client";
import { useEffect, useState } from "react";
import { socketInstance } from "@/app/apis/utils/createSoketInstance";
import { useRouter } from "next/navigation";
import CustomButton from "../Custombutton";

const ListCaller = () => {
    const [rooms, setRooms] = useState<string[]>([]);
    const router = useRouter()

    const joinRoom = (room : string) : void => {
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
            <h1>너가 입장 가능한 방</h1>
            <br></br>
            <ul>
                {rooms.map((name) => (
                    <div className="flex mt-3 gap-2">
                        <li key={name}>{name}</li>
                        <CustomButton onClick={()=> joinRoom(name)} buttonText={"입장"}></CustomButton>
                    </div>
                   
                ))}
            </ul>
        </div>
    );
};

export default ListCaller;
