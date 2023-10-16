"use client";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getRoomListPromise, isRoomExistPromise } from "@/app/apis/socket/once";
import { socketInstance } from "@/app/apis/utils/createSoketInstance";
import CustomButton from "@/app/components/Custombutton";

const RoomsPage = () => {
    const router = useRouter();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [rooms, setRooms] = useState<string[]>([]);
    const [roomName, setRoomName] = useState<string>("");
    const [isRoomExists, setIsRoomExists] = useState<boolean | null>(null);

    useEffect(() => {
        setSocket(socketInstance);
    
        const fetchRoomList = async () => {
            try {
                const fetchedRoomNames = await getRoomListPromise();
                setRooms(fetchedRoomNames);
            } catch (error) {
                console.error("Failed to get room list:", error);
            }
        };

        fetchRoomList();

        socketInstance.emit("getRooms");
        return () => {
            
        };
    }, []);

const handleCreateRoom = async () => {
    if (socket && roomName) {
        
        const doesRoomExist = await isRoomExistPromise(roomName);
        console.log(doesRoomExist);
        setIsRoomExists(doesRoomExist);

        if (doesRoomExist) {
            alert("방 이미 있음 ㅇㅇ");
        } else {
            socket.emit("createRoom", { roomName, maxMembers: 5 });
            router.push(`/room/${roomName}`);
        }
    }
};

    return (
        <div className="list-container">
            <div>
                <input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room name"
                />
                <CustomButton onClick={handleCreateRoom} buttonText="방 만들기"/>
            </div>

            <ul>
                {rooms.map((room) => (
                    <div>
                        <Link key={room} href={`/room/${room}`}>
                            {room}
                        </Link>
                        <br></br>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default RoomsPage;