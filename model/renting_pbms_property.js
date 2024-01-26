var mongoose = require("mongoose");

const Renting_pbms_property = mongoose.Schema({
    // purpose: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
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
    // renting_notes: {
    //     type: String,
    //     trim: true
    // },
    // start_date: {
    //     type: Date,
    //     trim: true,
    //     required: true,
    // },
    // end_date: {
    //     type: Date,
    //     trim: true,
    //     required: true,
    // },
    // price: {
    //     type: String,
    //     trim: true
    // },
    // distribution_of_price: {
    //     type: String,
    //     trim: true
    // },
    // agreement: {
    //     type: Array,
    //     trim: true
    // },
    // document: {
    //     type: Array,
    //     trim: true
    // },
    // personal detail of person
    // full_Name: {
    //     type: String,
    //     trim: true,
    // },
    // designation: {
    //     type: String,
    //     trim: true,
    // },
    // email: {
    //     type: String,
    //     trim: true,
    // },
    // phone: {
    //     type: String,
    //     trim: true,
    // },
    // address: {
    //     type: String,
    //     trim: true
    // },
    // these above fields are comment
    // this fields are new added
    deposit_recevied_from: {
        type: String,
        trim: true,
    },
    amount: {
        type: String,
        trim: true,
    },
    current_address: {
        type: String,
        trim: true,
    },
    property_located_at: {
        type: String,
        trim: true,
    },
    rent_amount: {
        type: String,
        trim: true,
    },
    first_month_rent_before_date: {
        type: Date,
        trim: true,
    },
    property_available_move_date: {
        type: Date,
        trim: true,
    },
    landlord_responsible_for: {
        type: Array,
        trim: true,
    },
    broker_amount_pay_by: {
        type: String,
        trim: true,
    },
    broker_amount: {
        type: String,
        trim: true,
    },
    broker_name: {
        type: String,
        trim: true,
    },
    landlord_name: {
        type: String,
        trim: true,
    },
    tenant_name: {
        type: String,
        trim: true,
    },
    broker_sign: {
        type: String,
        trim: true,
    },
    landlord_sign: {
        type: String,
        trim: true,
    },
    tenant_sign: {
        type: String,
        trim: true,
    },
    broker_date: {
        type: String,
        trim: true,
    },
    landlord_date: {
        type: String,
        trim: true,
    },
    tenant_date: {
        type: String,
        trim: true,
    },
    security_deposit: {
        type: String,
        trim: true,
    },
    rental_period: {
        type: String,
        trim: true,
    },
    late_fee: {
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

module.exports = mongoose.model('Renting_pbms_property', Renting_pbms_property);