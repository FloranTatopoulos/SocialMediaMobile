const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Conversation = require('../models/conversations');
const Message = require('../models/messages');
const jwt = require('jsonwebtoken');

// Send a new message
router.post('/conversation', auth, async (req, res) => {
    try {
        const { participants } = req.body;

        const existingConversation = await Conversation.findOne({
            participants: { $all: participants }
        });

        if (existingConversation) {
            return res.status(400).json({ msg: 'Conversation already exists' });
        }

        // Create a new conversation
        const newConversation = new Conversation({
            participants
        });
        await newConversation.save();

        res.status(200).json(newConversation);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/getAllConversation', auth, async (req, res) => {
    try {
        const Gettoken = req.headers['authorization'];
        try {
            const token = Gettoken.split(' ')[1]; // Récupère uniquement le token car au format"Bearer <token>"
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userIdFromToken = decoded.userId;
            console.log(decoded.userId);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token', err });
        }
        const conversations = await Conversation.find({ participants: userIdFromToken });
        await Conversation.populate(conversations, { path: 'participants', select: 'name' });

        // Populate messages associated with each conversation
        const populatedConversations = await Promise.all(conversations.map(async (conversation) => {
            const messages = await Message.find({ conversation: conversation._id });
            return { ...conversation.toObject(), messages };
        }));

        res.json(populatedConversations);
        // res.json(conversations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
