var mongoose = require("mongoose");

const Vendors_Page_Listing = mongoose.Schema({
    name: {
        type: String,
        default: "Vendor Listing"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    vendor_name: {
        type: String,
        default: ""
    },
    vendor_email: {
        type: String,
        default: ""
    },
    vendor_address: {
        type: String,
        default: ""
    },
    vendor_url: {
        type: String,
        default: ""
    },
    vendor_type: {
        type: String,
        trim: true,
        default: ""
    },
    days: {
        type: String,
        default: ""
    },
    start_date: {
        type: Date,
        default: ""
    },
    end_date: {
        type: Date,
        default: ""
    },
    country_currency: {
        type: String,
        default: ""
    },
    total_budget: {
        type: String,
        default: ""
    },
    estimated_tax: {
        type: String,
        default: ""
    },
    total_amount: {
        type: String,
        default: ""
    },
    ad_image: {
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

module.exports = mongoose.model('Vendors_Page_Listing', Vendors_Page_Listing);