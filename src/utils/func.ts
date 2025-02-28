import { Socket } from "socket.io-client";

export const getTime = () => {
    const now = new Date();
    const hours = now.getHours().toString();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString();
    const month = (now.getMonth() + 1).toString();

    return `${hours}:${minutes} ${day}/${month}`;
}

export const defineIO = (sock:Socket)=>{}