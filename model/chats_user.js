var mongoose = require("mongoose");
const { any } = require("underscore");

const Userschat = mongoose.Schema({
    chat_id: {
        type: String,
        trim: true,
        required: true
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    recevier_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'I_am_buyer'
    },
    message: { 
        type: String,
        require: true
    },
    read: {
        type: Boolean
    },
    status: {
        type: String,
        trim: true,
        default: "Active",
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('chats_of_users', Userschat);