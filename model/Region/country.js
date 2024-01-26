var mongoose = require("mongoose");

const country = mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
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
module.exports = mongoose.model('country', country);