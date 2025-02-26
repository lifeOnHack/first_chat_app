import express from "express";
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRout from "./controllers/signup.js";
import { connectDB, newMsg } from "./lib/db.js";
import messageRout from "./controllers/message.js";
import chatsRout from "./controllers/chats.js";
import { updateUsers } from "./lib/updateDb.js";
// Load environment variables from .env file
const configRes = dotenv.config({ path: "./.env" });
const uri = `mongodb+srv://msgapp_ilay:${process.env.DB_PW}@msgapp.yvva4.mongodb.net/?retryWrites=true&w=majority&appName=msgapp`;
const app = express();
// Initialize Socket.io and configure CORS to allow frontend connection
const corss = {
  origin: "http://localhost:3000", // Allow requests from React frontend
  optionsSuccessStatus: 200
};


// Middleware setup
app.use(cors(corss)); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use("/signup", signupRout);
app.use("/message", messageRout);
app.use("/chat",chatsRout);
app.get("/", (req, res) => {
  res.send("server is running!");
});


// Set the port from .env or use 3001 as default
const PORT = process.env.PORT || 7070;
// Start the server
const server = app.listen(PORT, async () => {
  await connectDB(uri);
  console.log(`Server running on port ${PORT}`);
});
//socketIO section
const io = new Server(server, {
  cors: corss,
});
io.on("connection", (sock) => {
  console.log(`new user: ${sock.id}`);
  sock.on('new_msg', async (data) => {
    //console.log(`new msg from ${data.author}:  ${JSON.stringify(data)}`);
    const dbRes = await newMsg(
      data.author,
      data.msg,
      data.time);
    if (dbRes.status == 200) {
      io.emit("recv_msg", data);
    } else {
      sock.emit("recv_msg", null);
    }

  })
})
io.on("disconnect", (sock) => {
  console.log(`user disconnected: ${sock.id}`);
})
