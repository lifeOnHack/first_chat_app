import { Server } from "socket.io";
import { getUserByFilter, newMsg } from "./db.js";// Import any DB functions needed

let io; // Define io globally
const users = {}; // Store userID -> socketID mappings
const checkValid = (sockId) => {
    return Object.values(users).includes(sockId);
}
const waitForValidtion = (sockId) => {
    if (checkValid(sockId)) {
        return;
    }
    io.to(sockId).emit("re_reg", null);
}
export function logLogedIn() {
    console.log(users);
}
export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            optionsSuccessStatus: 200,
        },
    });

    io.on("connection", (sock) => {
        logLogedIn();
        console.log(`New user connected: ${sock.id}`);
        sock.on('register', (name) => {
            //console.log(`\t<-> registered: ${name}`);
            users[name] = sock.id;
            getUserByFilter({ username: name }).then((user) => {
                if (user) {
                    user.chats.forEach(chatId => {
                        sock.join(chatId.toString());
                    });
                }
            })
        });

        sock.on("new_msg", async (data) => {
            const dbRes = await newMsg(data.author, data.msg, data.time, data.chatId);
            if (dbRes.status === 200) {
                io.to(data.chatId.toString()).emit("recv_msg", data);
            } else {
                sock.emit("recv_msg", null);
            }
        });
        sock.on("sign_chat",(chatId)=>{
            sock.join(chatId.toString());
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

export const getSockId = (user) => {
    return users[user];
}
