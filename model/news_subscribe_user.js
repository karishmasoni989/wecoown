var mongoose = require("mongoose");

const News_subcribe_user = mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: true
    },
    email : {
        type: String,
        trim: true,
        required: true
    },
    status : {
        type: String,
        trim: true,
        enum: ["Active", "Inactive"],
        default: 'Inactive',       
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

module.exports = mongoose.model('News_subcribe_user', News_subcribe_user);