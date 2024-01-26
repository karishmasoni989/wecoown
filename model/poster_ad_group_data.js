var mongoose = require("mongoose");

const Poster_ad_group_data = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    all_poster_ad_id: {
        type: [mongoose.Schema.Types.ObjectId],
        trim: true,
        required: true,
        ref: 'Poster_ad',
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
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

module.exports = mongoose.model('Poster_ad_group_data', Poster_ad_group_data);