"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getRoomListPromise, isRoomExistPromise } from "@/app/apis/socket/once";
import { socket } from "@/app/apis/utils/socket.context";
import CustomButton from "@/app/components/Custombutton";

const RoomsPage = () => {
    const router = useRouter();
    const [rooms, setRooms] = useState<string[]>([]);
    const [roomName, setRoomName] = useState<string>("");
    const [isRoomExists, setIsRoomExists] = useState<boolean | null>(null);

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
                <CustomButton onClick={handleCreateRoom} buttonText="방 만들기" />
            </div>

            <ul>
                {rooms.map((room) => (
                    <Link key={room} href={`/room/${room}`}>
                        {room}
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default RoomsPage;
