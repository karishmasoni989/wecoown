var mongoose = require("mongoose");

const User_show_interest_fractional_listing = mongoose.Schema({
    recevier_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref:'User'
    },
    current_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref:'User'
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    email_text: {
        type: String,
        trim: true,
        required: true,
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

module.exports = mongoose.model('User_show_interest_fractional_listing', User_show_interest_fractional_listing);