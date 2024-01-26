var mongoose = require("mongoose");

const User_claim_key_history = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    token_price: {
        type: Number,
        required: true,
        trim: true,
    },
    claim_key: {
        type: String,
        required: true,
        trim: true,
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

module.exports = mongoose.model('User_claim_key_history', User_claim_key_history);