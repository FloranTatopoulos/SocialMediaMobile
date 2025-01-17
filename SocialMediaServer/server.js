const express = require('express');
const http = require('http');  // Required to create a server for socket.io
const socketio = require('socket.io'); // Import socket.io
const connectDB = require('./db');
require('dotenv').config();

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Set up the port
const PORT = process.env.PORT || 3000;

// Initialize server for both HTTP and WebSocket connections
const server = http.createServer(app);
const io = socketio(server); // Attach socket.io to the server

// Middleware for parsing JSON
app.use(express.json());

// Route Imports
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const messageRouter = require('./routes/messages');
const conversationRouter =require('./routes/conversations');

// Set up routes
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', messageRouter);
app.use('/api', conversationRouter);

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('New WebSocket connection established');

    socket.on('joinConversation', ({ conversationId }) => {
        socket.join(conversationId);
        console.log(`User joined conversation ${conversationId}`);
    })


    // Listen for new chat messages
    socket.on('sendMessage', (messageData) => {
        
        const { conversationId, author, content} = messageData;

        io.to(conversationId).emit('receiveMessage', {
            conversationId,
            author,
            content,
            createdAt: new Date(),
        
        });
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('WebSocket connection disconnected', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;