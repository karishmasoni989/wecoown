var mongoose = require("mongoose");

const Post_media = mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref:'I_am_buyer'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref:'User'
    },
    category: {
        type: String,
        trim: true,
        required: true,
    },
    src: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },   
    tag: {
        type: Array,
        trim: true,
    },  
    is_cover_pic: {
        type: String,
        trim: true,
        default: "No"
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
// I_am_buyer.index({"property_desciption":"text"})

module.exports = mongoose.model('Post_media', Post_media);