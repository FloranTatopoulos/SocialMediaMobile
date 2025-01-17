const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const bcrypt = require("bcrypt");
const router = express.Router();
const Conversation = require('../models/conversations');
const Message = require('../models/messages');

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  // Retrieve the token from the request header
  const Gettoken = req.headers['authorization'];
  if (Gettoken) {
    try {
      const token = Gettoken.split(' ')[1]; // Récupère uniquement le token car au format"Bearer <token>"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userIdFromToken = decoded.userId;
      const user = await User.findById(userIdFromToken);

      const conversations = await Conversation.find({ participants: user._id });
      await Conversation.populate(conversations, { path: 'participants', select: 'name' });

      // Populate messages associated with each conversation
      const AllConversation = await Promise.all(conversations.map(async (conversation) => {
        const messages = await Message.find({ conversation: conversation._id });
        return { ...conversation.toObject(), messages };
      }));

      const userWithConversations = {
        ...user.toObject(),
        conversations: AllConversation
      };


      if (!user) {  
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        return res.status(200).json({ message: 'Valid token', user: userWithConversations });
      }
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token', err });
    }

  }
  // Find the user by email
  const user = await User.findOne({ email });
  // If the user doesn't exist or the password is incorrect, return an error
  if (!user) {
    return res.status(401).json({ message: 'Email or password is incorrect' });
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(401).json({ message: 'Email or password is incorrect' });
  }

  // Generate a JWT token with the user ID as payload
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });


  const conversations = await Conversation.find({ participants: user._id });
  await Conversation.populate(conversations, { path: 'participants', select: 'name' });

  // Populate messages associated with each conversation
  const AllConversation = await Promise.all(conversations.map(async (conversation) => {
    const messages = await Message.find({ conversation: conversation._id });
    return { ...conversation.toObject(), messages };
  }));

  const userWithConversations = {
    ...user.toObject(),
    conversations: AllConversation
  };

  // Return the token as JSON and user object
  res.json({ token, user: userWithConversations });
  // res.json({ token });
});


module.exports = router;