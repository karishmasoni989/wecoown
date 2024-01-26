var mongoose = require("mongoose");

const I_am_buyer = mongoose.Schema({
    category: {
        type: String,
        trim: true,
        required: true,
        ref:'AllCategory'
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    property_desciption: {
        type: String,
        trim: true,
        default: ""
    },
    url_property: {
        type: String,
        trim: true,
        default: null
    },
    property_photos: {
        type: Array,
        trim: true,
        default: null,
    },
    cover_photo: {
        type: [{
            post_media_id:{
                type: mongoose.Schema.Types.ObjectId,
                trim: true,  
            },
            src:{
                type: String,
                trim: true,   
            },
            name:{
                type: String,
                trim: true,   
            },
        }],
        trim: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        default: null,
        ref:'User'
    },
    status: {
        type: String,
        trim: true,
        default: "Active",
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    state: {
        type: String,
        trim: true,
        default: null
    },
    city: {
        type: String,
        trim: true,
        default: null
    },
    pdf_doc: {
        type: Array,
        trim: true,
        default: [],
    },
    // ip_address: {
    //     type: String,
    //     trim: true,
    //     required: true
    // },
    showPostToUser: {
        type: String,
        trim: true,
        default: "Public",
        enum: ["Public", "Private","Cohorts"],
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
I_am_buyer.index({"property_desciption":"text","title":"text"})

module.exports = mongoose.model('I_am_buyer', I_am_buyer);