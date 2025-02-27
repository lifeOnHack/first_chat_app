import { Server } from "socket.io";
import { newMsg } from "./lib/db.js"; // Import any DB functions needed

let io; // Define io globally
const users = {}; // Store userID -> socketID mappings
export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            optionsSuccessStatus: 200,
        },
    });

    io.on("connection", (sock) => {
        console.log(`New user connected: ${sock.id}`);
        sock.on("register", (name) => {
        users[name] = scok.id;
    });

        sock.on("new_msg", async (data) => {
            const dbRes = await newMsg(data.author, data.msg, data.time);
            if (dbRes.status === 200) {
                io.emit("recv_msg", data);
            } else {
                sock.emit("recv_msg", null);
            }
        });

        sock.on("disconnect", () => {
            const userId = Object.keys(users).find(key => users[key] === sock.id);
            if (userId) delete users[userId];
            console.log(`User disconnected: ${sock.id}`);
        });
    });

    return io;
};

// Export a function to get io instance anywhere in the app
export const getIo = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized!");
    }
    return io;
};

export const getSockId = (user)=>{
    return users[user];
}
