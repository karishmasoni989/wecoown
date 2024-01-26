var mongoose = require("mongoose");
const { any } = require("underscore");

const Book_post_invitation = mongoose.Schema({
    name: {
        type: Number,
        default: 1
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'I_am_buyer'
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
    message: { 
        type: String,
        default: ""
    },
    read: {
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        trim: true,
        enum: ["Active","Inactive","Pending","Accept","Reject"],
        default: "Pending",
    },
    // 1=Active, 2= Pending
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

module.exports = mongoose.model('Book_post_invitation', Book_post_invitation);