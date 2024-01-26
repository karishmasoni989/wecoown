var mongoose = require("mongoose");

const Managing_cashflows_pbms_property = mongoose.Schema({
    pbms_group_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'Pbms'
    },
    reference_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    distribution_type: {
        type: String,
        trim: true,
    },
    distribution_frequency: {
        type: String,
        trim: true
    },
    memberData: {
        type: [{
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                trim: true,
                ref: 'User',
            },
            userFirstLastName: {
                type: String,
                trim: true
            },
            isAdmin: {
                type: Boolean,
                trim: true
            },
            distribution_amount_or_percent: {
                type: String,
                trim: true
            },
            distribution_method: {
                type: String,
                trim: true
            },
            distribution_method_text: {
                type: String,
                trim: true
            },
        }, ],
        trim: true,
    },
    status: {
        type: String,
        trim: true,
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

module.exports = mongoose.model('Managing_cashflows_pbms_property', Managing_cashflows_pbms_property);