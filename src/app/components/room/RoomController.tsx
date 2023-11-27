"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { socket } from "@/app/apis/utils/socket.context";
import CustomButton from "../Custombutton";
import { getRoomListPromise, isRoomExistPromise } from "@/app/apis/socket/once";

const RoomController: React.FC = () => {
    const router = useRouter()
    const [roomName, setRoomName] = useState<string>("");

    useEffect(() => {
        socket.on("joinedRoom", (room) => {
            console.log(`Joined room ` + room);
        });
        socket.on("leftRoom", (room: string) => {
            console.log(`Left room ` + room);
        });

        return () => {
            socket.off("joinedRoom");
            socket.off("leftRoom");
        };
    }, [socket]);

    const handleCreateRoom = async () => {
        if (socket && roomName) {
            const doesRoomExist = await isRoomExistPromise(roomName);
            if (doesRoomExist) {
                alert("방 이미 존재합니다");
            } else {
                socket.emit("createRoom", { roomName, maxMembers: 5 });
                router.push(`/room/${roomName}`);
            }
        }
    };

    const handleJoinRoom = async () => {
        console.log("눌림")
        if (socket && roomName) {
            const doesRoomExist = await isRoomExistPromise(roomName);
            if (!doesRoomExist) {
                alert("방이 존재하지 않습니다");
            } else {
                socket.emit("joinRoom", roomName);
                socket.emit("getClientsInRoom", roomName);
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
                <CustomButton onClick={handleJoinRoom} buttonText="방 입장" />
                <CustomButton onClick={handleCreateRoom} buttonText="방 만들기" />
            </div>
        </div>
    );
};

export default RoomController;