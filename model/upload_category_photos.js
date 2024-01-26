var mongoose = require("mongoose");

const Upload_category_photos = mongoose.Schema({
    category: {
        type: String,
        trim: true,
        required: true,
        ref:'AllCategory'
    },   
    property_photos: {
        type: Array,
        trim: true,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref:'User'
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

module.exports = mongoose.model('Upload_category_photos', Upload_category_photos);