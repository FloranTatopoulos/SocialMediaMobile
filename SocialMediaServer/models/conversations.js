const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;