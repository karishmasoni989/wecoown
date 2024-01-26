var mongoose = require("mongoose");
const { any } = require("underscore");

const Userschat = mongoose.Schema({
    start_chat_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    receiver_user: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    chat_id: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        trim: true,
        default: "Active",
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('chat_ids', Userschat);