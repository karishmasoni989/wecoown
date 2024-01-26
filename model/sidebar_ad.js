var mongoose = require("mongoose");

const Sidebar_ad = mongoose.Schema({
    name : {
        type: String,
        default: "Sidebar Ad"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref:'User'
    },
    url_button : {
        type: String,
        default: ""
    },
    coupon : {
        type: String,
        default: ""
    },
    days : {
        type: String,
        default: ""
    },
    start_date : {
        type: Date,
        default: ""
    },
    end_date : {
        type: Date,
        default: ""
    },
    country_currency : {
        type: String,
        default: ""
    },
    total_budget : {
        type: String,
        default: ""
    },
    estimated_tax : {
        type: String,
        default: ""
    },
    total_amount : {
        type: String,
        default: ""
    },
    category : {
        type: String,
        trim: true,
        required: true,
        ref:'AllCategory'
    },    
    ad_image : {
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

module.exports = mongoose.model('Sidebar_ad', Sidebar_ad);