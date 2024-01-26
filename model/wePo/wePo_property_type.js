var mongoose = require("mongoose");

const WePo_property_type = mongoose.Schema({
    property_type: {
        type: String,
    },
    description: {
        type: String,
    },
    banner_image: {
        type: Object,
        default: null
    },
    thumbnaill_image: {
        type: Object,
        default: null
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

module.exports = mongoose.model('WePo_property_type', WePo_property_type);