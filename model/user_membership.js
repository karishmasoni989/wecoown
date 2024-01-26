var mongoose = require("mongoose");

const User_membership= mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref:'User'
    },   
    membership_type: {
        type: String,
        trim: true,
        required: true
    },
    // 1 = premier, 2 = professional
    Card_Number: {
        type: String,
        trim: true,
        required: true,
    },
    Card_Type: {
        type: String,
        trim: true,
        required: true,
    },
    card_holder_name: {
        type: String,
        trim: true,
        required: true,
    },
    expiration_card_date: {
        type: String,
        trim: true,
        required: true,
    },
    membership_end_date: {
        type: Date,
        trim: true,
        required: true,
    },
    membership_start_date: {
        type: Date,
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

module.exports = mongoose.model('User_membership', User_membership);