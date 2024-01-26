var mongoose = require("mongoose");

const Request_for_cohorts = mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User',
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User',
    },
    status: {
        type: String,
        trim: true,
        enum: ["Active", "Inactive", "Pending", "Accept", "Reject"],
        default: 'Pending'
    },
    read: {
        type: Boolean,
        trim: true,
        default: false
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

module.exports = mongoose.model('Request_for_cohorts', Request_for_cohorts);