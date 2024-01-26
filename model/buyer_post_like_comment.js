var mongoose = require("mongoose");

const Buyer_post_like_comment = mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref:'I_am_buyer'
    },
    post_media_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref:'Post_media'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref:'User'
    },
    action_type: {
        type: String,
        trim: true,
        required: true,
        /** 1-Like, 2-Comment, 3-Dislike, 4-heart */
    },
    comment_text: {
        type: String,
        trim: true,
    },
    status:{
        type: String,
        trim: true,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    action_time:{
        type: String,
        trim: true,
        required: true,
    },
    action_date:{
        type: String,
        trim: true,
        required: true,
    },
    // ip_address: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
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

module.exports = mongoose.model('Buyer_post_like_comment', Buyer_post_like_comment);