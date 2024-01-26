var mongoose = require("mongoose");

const state = mongoose.Schema({
    region: {
        type: String
    },
    country: {
        type: String
    },
    isoCode: {
        type: String
    },
    // country_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     trim: true,
    //     required: true,
    //     ref:'country'
    // },
    created_by: {
        type: String,
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

module.exports = mongoose.model('state', state);