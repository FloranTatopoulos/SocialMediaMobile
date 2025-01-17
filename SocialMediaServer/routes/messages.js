const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/messages');
const Conversation = require('../models/conversations');

// Send a new message
router.post('/message', auth, async (req, res) => {
    try {
        const { content, conversationId } = req.body;


        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ msg: 'Conversation not found' });
        }
        // Create a new message
        const message = new Message({
            conversation: conversationId,
            author: req.body.author, // Assuming `req.user.id` is set by the auth middleware
            content
        });

        // Save the message to the database
        await message.save();

        req.io.to(conversationId).emit('receiveMessage', {
            conversationId,
            author: req.body.author,
            content,
            createdAt: message.createdAt
        });

        // Return the created message
        res.status(201).json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all messages
router.get('/getMessage/:conversationId', auth, async (req, res) => {
    try {

        // a verif si ça recup bien
        const { conversationId } = req.params;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ msg: 'Conversation not found' });
        }
        // Retrieve all messages from the database

        const messages = await Message.find({ conversation: conversationId }).populate('author', 'name'); // Populate author's name

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
