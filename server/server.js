import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signupRout from "./controllers/signup.js";
import messageRout from "./controllers/message.js";
import chatsRout from "./controllers/chats.js";
import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/io.js"; // Import socket setup

dotenv.config({ path: "./.env" });

const uri = `mongodb+srv://msgapp_ilay:${process.env.DB_PW}@msgapp.yvva4.mongodb.net/?retryWrites=true&w=majority&appName=msgapp`;
const app = express();

// Middleware setup
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/signup", signupRout);
app.use("/message", messageRout);
app.use("/chat", chatsRout);

app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Set the port from .env or use 3001 as default
const PORT = process.env.PORT || 7070;

// Start the HTTP server
const server = app.listen(PORT, async () => {
    await connectDB(uri);
    console.log(`Server running on port ${PORT}`);
});

// Initialize Socket.IO
initializeSocket(server);
