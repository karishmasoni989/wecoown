var mongoose = require("mongoose");

const Wcx_rewards_tokens_history = mongoose.Schema({
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
    event_name: {
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

module.exports = mongoose.model('Wcx_rewards_tokens_history', Wcx_rewards_tokens_history);