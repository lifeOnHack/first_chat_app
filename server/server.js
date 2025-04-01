import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import signupRout from "./controllers/signup.js";
import messageRout from "./controllers/message.js";
import chatsRout from "./controllers/chats.js";
import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/io.js"; // Import socket setup

dotenv.config({ path: "./.env" });

const uri = `mongodb+srv://msgapp_ilay:${process.env.DB_PW}@msgapp.yvva4.mongodb.net/?retryWrites=true&w=majority&appName=msgapp`;
const app = express();

// Load SSL certificates
const sslOptions = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

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
    res.send("Server is running with HTTPS!");
});

// Set the port from .env or use 7070 as default
const PORT = process.env.PORT || 7070;

// Start the HTTPS server
const server = https.createServer(sslOptions, app).listen(PORT, async () => {
    await connectDB(uri);
    console.log(`HTTPS Server running on port ${PORT}`);
});

// Initialize Socket.IO with HTTPS server
const io = initializeSocket(server);

//for test
export default app;