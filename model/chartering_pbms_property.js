var mongoose = require("mongoose");

const Chartering_pbms_property = mongoose.Schema({
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
    full_Name: {
        type: String,
        trim: true
    },
    contact_name: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    work_tel: {
        type: String,
        trim: true
    },
    postcode: {
        type: String,
        trim: true
    },
    fax: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true,
    },
    vessel: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        trim: true,
    },
    loa: {
        type: String,
        trim: true,
    },
    embarkation_point: {
        type: String,
        trim: true
    },
    disembarkation_point: {
        type: String,
        trim: true,
    },
    cruising_limits: {
        type: String,
        trim: true,
    },
    start_date: {
        type: Date,
        trim: true,
    },
    end_date: {
        type: Date,
        trim: true,
    },
    crew: {
        type: String,
        trim: true,
    },
    vessel_fee: {
        type: String,
        trim: true,
    },
    miscellaneous_amount: {
        type: String,
        trim: true,
    },
    miscellaneous_reason: {
        type: String,
        trim: true,
    },
    sub_total: {
        type: String,
        trim: true,
    },
    tax: {
        type: String,
        trim: true,
    },
    total_charter_fees: {
        type: String,
        trim: true,
    },
    booking_deposit: {
        type: String,
        trim: true,
    },
    booking_deposit_due_date: {
        type: Date,
        trim: true,
    },
    booking_deposit_paid: {
        type: String,
        trim: true,
    },
    security_bond: {
        type: String,
        trim: true,
    },
    security_bond_due_date: {
        type: Date,
        trim: true,
    },
    security_bond_paid: {
        type: String,
        trim: true,
    },
    other_deposit: {
        type: String,
        trim: true,
    },
    other_deposit_due_date: {
        type: Date,
        trim: true,
    },
    other_deposit_paid: {
        type: String,
        trim: true,
    },
    total_deposit_received: {
        type: String,
        trim: true,
    },
    balance_due: {
        type: String,
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

module.exports = mongoose.model('Chartering_pbms_property', Chartering_pbms_property);