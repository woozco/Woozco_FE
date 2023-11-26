import { socket } from "../utils/socket.context";
import { MessageType } from "./types";

export function getRoomListPromise(): Promise<string[]> {
    return new Promise((resolve) => {
        socket.once("roomsList", (fetchedRooms: any) => {
            // const roomNames = Object.keys(fetchedRooms);
            resolve(fetchedRooms);
        });
    });
}

export function receiveRoomMessagePromise(): Promise<MessageType[]>{
    return new Promise((resolve) => {
        socket.once("roomMessages", (msgs: MessageType[]) => {
            if (Array.isArray(msgs)) {
                resolve(msgs);
            } else {
                console.error("Received non-array data for messages:", msgs);
                resolve([]);  // 빈 배열로 resolve
            }
        });
    })
}

export function receiveNewMessagePromise(): Promise<MessageType> {
    return new Promise((resolve, reject) => {
        socket.once("newMessage", (msg: MessageType) => {
            if (msg && msg.senderId && msg.content) {
                resolve(msg);
            } else {
                reject(new Error("Received invalid message format"));
            }
        });
    });
}
export function isRoomExistPromise(roomName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        socket.emit("checkRoomExistence", roomName);
        
        socket.once("roomExistenceResult", (exists: boolean) => {
            if (typeof exists === "boolean") {
                resolve(exists);
            } else {
                reject(new Error("Received invalid room existence format"));
            }
        });
    });
}
