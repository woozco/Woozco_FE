import { socketInstance } from "../utils/createSoketInstance";
import { MessageType } from "./types";

export function getRoomListPromise(): Promise<string[]> {
    return new Promise((resolve) => {
        socketInstance.once("roomsList", (fetchedRooms: any) => {
            const roomNames = Object.keys(fetchedRooms);
            resolve(roomNames);
        });
    });
}

export function receiveRoomMessagePromise(): Promise<MessageType[]>{
    return new Promise((resolve) => {
        socketInstance.once("roomMessages", (msgs: MessageType[]) => {
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
        socketInstance.once("newMessage", (msg: MessageType) => {
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
        socketInstance.emit("checkRoomExistence", roomName);
        
        socketInstance.once("roomExistenceResult", (exists: boolean) => {
            if (typeof exists === "boolean") {
                resolve(exists);
            } else {
                reject(new Error("Received invalid room existence format"));
            }
        });
    });
}
