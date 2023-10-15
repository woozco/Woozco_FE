"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { receiveRoomMessagePromise } from "@/app/apis/socket/once"; // 경로는 함수가 정의된 파일의 경로입니다.
import { socketInstance } from "@/app/apis/utils/createSoketInstance";
import Router from "next/navigation";
import CustomButton from "@/app/components/Custombutton";

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
                socketInstance.emit("getMessages", Pathname);
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
        if (messageContent.trim() === "") return;
        socketInstance.emit("sendMessage", {
            room: Pathname,
            content: messageContent,
        });
        setMessageContent(""); 
    };

    return (
        <div className="chat-room">
            <div className="chat-title">
                <a>{Pathname}</a>
            </div>
            <br></br>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div className="message">
                        {message.senderId}: {message.content}
                    </div>
                ))}
            </div>
            {/* <div>
                <h2>이 방의 클라이언트:</h2>
                <ul>
                    {clients.map((clientId, index) => (
                        <li key={index}>{clientId}</li>
                    ))}
                </ul>
            </div> */}
            <div className="chat-input">
                <input
                    className="message-input"
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="메시지 입력"
                />
                <CustomButton onClick={handleSendMessage} buttonText="전송"/>
            </div>
            <br></br>
            <CustomButton onClick={leaveRoom} buttonText="나가기"/>
        </div>
    );
};

export default RoomPage;
