var mongoose = require("mongoose");
const { any } = require("underscore");

const User = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    designation: {
        type: String,
        trim: true,
        default: ""
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        default: ""
    },
    bio: {
        type: String,
        trim: true,
        default: ""
    },
    profile_pic: {
        type: Array,
        trim: true,
        default: null
    },
    cover_pic: {
        type: Array,
        trim: true,
        default: null
    },
    upload_photos: {
        type: Array,
        trim: true,
        default: null
    },
    timelines: {
        type: Array,
        trim: true,
        default: null
    },
    /** */
    role: {
        type: Array,
        trim: true,
        default: null
    },
    forgetOtp: {
        type: Number,
        trim: true,
        default: null
    },
    verfied: {
        type: String,
        trim: true,
        enum: ["Yes", "No"],
        default: 'No' // 1 for admin 2 for users
    },
    profile_public: {
        type: String,
        trim: true,
        default: 'Yes'
    },
    facebook_link: {
        type: String,
        trim: true,
        default: ''
    },
    twitter_link: {
        type: String,
        trim: true,
        default: ''
    },
    linkedin_link: {
        type: String,
        trim: true,
        default: ''
    },
    instagram_link: {
        type: String,
        trim: true,
        default: ''
    },
    vendor: {
        type: Array,
        trim: true,
        default: []
    },
    country: {
        type: String,
        trim: true,
        default: ""
    },
    state: {
        type: String,
        trim: true,
        default: ""
    },
    city: {
        type: String,
        trim: true,
        default: ""
    },
    status: {
        type: String,
        trim: true,
        default: "Active",
    },
    // vendor [ vendor_id: "", company_name: "", company_email: "", company_website: "", company_address: ""]
    intro_public: {
        type: String,
        trim: true,
        default: "No"
    },
    login_token: {
        type: String,
        trim: true,
        default: ""
    },
    is_logged_in: {
        type: Boolean,
        default: false,
    },
    is_logged_in_weco: {
        type: Boolean,
        default: false,
    },
    is_logged_in_wepo: {
        type: Boolean,
        default: false,
    },
    last_ip_address: {
        type: String,
        default: "",
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    portfolio_pic: {
        type: Array,
        trim: true,
        default: null
    },
    facebook_id:{
        type: String,
        default: "",
    },
    google_id:{
        type: String,
        default: "",
    },
    linkedin_id:{
        type: String,
        default: "",
    },
    wcx_rewards_tokens:{
        type: Number,
        default: 0,
    },
    claim_key:{
        type: String,
        default: "",
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

// User.index({"firstname":"text","lastname":"text"})

module.exports = mongoose.model('User', User);