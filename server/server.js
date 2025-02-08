import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import signupRout from "./controllers/signup.js";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

const app = express();
//const server = http.createServer(app);

// Initialize Socket.io and configure CORS to allow frontend connection
const corss = {
  origin: "http://localhost:3000", // Allow requests from React frontend
  optionsSuccessStatus: 200
};
// const io = new Server(server, {
//   cors: corss,
// });
app.get("/", (req, res) => {
  res.send("server is running!");
});
// Middleware setup
app.use(cors(corss)); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use("/signup", signupRout);



// Set the port from .env or use 3001 as default
const PORT = process.env.PORT || 7070;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});