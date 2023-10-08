"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { receiveRoomMessagePromise } from "@/app/apis/socket/once"; // 경로는 함수가 정의된 파일의 경로입니다.
import { socketInstance } from "@/app/apis/utils/createSoketInstance";
import Router from "next/navigation";

type MessageType = {
    senderId: string;
    content: string;
};

const RoomPage = ({ params }: { params: { roomid: string } }) => {
    const Pathname = params.roomid;
    const router = useRouter();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [messageContent, setMessageContent] = useState<string>("");
    const [clients, setClients] = useState<string[]>([]);

    const leaveRoom = () => {
        socketInstance.emit("leaveRoom", params.roomid);
        router.push("/");
    };

    useEffect(() => {
        const fetchPreviousMessages = async () => {
            try {
                socketInstance.emit("getMessages", Pathname); // 현재 방의 메시지를 요청
                const previousMessages = await receiveRoomMessagePromise();
                setMessages(previousMessages);
            } catch (error) {
                console.error("Error fetching previous messages:", error);
            }
        };

        fetchPreviousMessages();

        const handleNewMessage = (msg: MessageType) => {
            console.log("handleNewMessage");
            setMessages((prevMessages) => [...prevMessages, msg]);
        };

        socketInstance.on("newMessage", handleNewMessage);

        const handleClientsList = (clientIds: string[]) => {
            setClients(clientIds);
        };

        socketInstance.on("clientsList", handleClientsList);

        return () => {
            socketInstance.off("newMessage", handleNewMessage);
            socketInstance.off("clientsList", handleClientsList);
        };
    }, []);

    const handleSendMessage = () => {
        if (messageContent.trim() === "") return; // 내용이 없으면 전송 안 함
        socketInstance.emit("sendMessage", {
            room: Pathname,
            content: messageContent,
        });
        setMessageContent(""); // 메시지 전송 후 입력 필드 초기화
    };

    return (
        <div>
            <h1>Room: {Pathname}</h1>

            {/* 메시지 목록 표시 */}
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        {message.senderId}: {message.content}
                    </li>
                ))}
            </ul>
            <div>
                <h2>이 방의 클라이언트:</h2>
                <ul>
                    {clients.map((clientId, index) => (
                        <li key={index}>{clientId}</li>
                    ))}
                </ul>
            </div>
            {/* 메시지 입력 폼 */}
            <div>
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="메시지 입력"
                />
                <button onClick={handleSendMessage}>전송</button>
            </div>

            <button onClick={leaveRoom}>Leave Room</button>
        </div>
    );
};

export default RoomPage;
