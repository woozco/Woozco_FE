"use client";
import { useEffect, useState } from "react";
import { socket } from "@/app/apis/utils/socket.context";
import { useRouter } from "next/navigation";
import CustomButton from "../Custombutton";
import { getRoomListPromise, isRoomExistPromise } from "@/app/apis/socket/once";

const ListCaller = () => {
    const [rooms, setRooms] = useState<string[]>([]);
    const router = useRouter()
    const [roomName, setRoomName] = useState<string>("");

    useEffect(() => {
        const fetchRoomList = async () => {
            try {
                const fetchedRoomNames = await getRoomListPromise();
                setRooms(fetchedRoomNames);
            } catch (error) {
                console.error("Failed to get room list:", error);
            }
        };

        fetchRoomList();

        socket.emit("getRooms");
    }, []);

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
                    <div key={name} className="list-item">
                        <a>{name}</a>
                        <CustomButton onClick={() => joinRoom(name)} buttonText={"입장"}></CustomButton>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListCaller;
