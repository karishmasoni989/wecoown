var mongoose = require("mongoose");

const Book_pbms_property = mongoose.Schema({
    purpose : {
        type: String,
        required: true,
        trim: true
    },
    number_of_persons : {
        type: String,
        trim: true
    },
    pbms_group_id : {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'Pbms'
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    booking_notes: {
        type: String,
        trim: true
    },
    start_date:{
        type: Date,
        trim: true,
        required: true,
    },
    end_date:{
        type: Date,
        trim: true,
        required: true,
    },
    request_to_admin: {
        type: Array,
        default: null
    },
    status: {
        type: String,
        trim: true,
        enum: ["Active", "Inactive", "Pending", "Accept", "Reject"],
        default: "Active"
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

module.exports = mongoose.model('Book_pbms_property', Book_pbms_property);