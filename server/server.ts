import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({path:"./.env"});

const app = express();
const server = http.createServer(app);

// Initialize Socket.io and configure CORS to allow frontend connection
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from React frontend
    },
  });
  
// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies




// Set the port from .env or use 3001 as default
const PORT = process.env.PORT || 7070;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});