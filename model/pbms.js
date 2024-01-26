var mongoose = require("mongoose");
const {
    any
} = require("underscore");

const Pbms = mongoose.Schema({
    title: {
        type: String,
        default: "",
        required: true,
    },
    category: {
        type: String,
        trim: true,
        required: true,
    },
    property_url: {
        type: String,
        trim: true,
        required: true,
    },
    property_text: {
        type: String,
        trim: true,
    },
    property_images: {
        type: Array,
        trim: true,
        default: []
    },
    group_creater_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    },
    recevier_id: {
        type: [{
            invited_by_user_id: {
                type: mongoose.Schema.Types.ObjectId,
                trim: true,
                ref: 'User',
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                trim: true,
                ref: 'User',
            },
            status: {
                type: String,
                trim: true,
                enum: ["Active", "Inactive", "Pending", "Accept", "Reject"],
            },
            read: {
                type: String,
                trim: true,
                default: false
            },
            is_admin: {
                type: Boolean,
                default: false
            },
            request_for_admin: {
                type: {
                    action:{
                        type: String,
                        enum: ['Yes','No'],
                        default: 'No'
                    },
                    request_date_time: {
                        type: Date
                    },
                    status: {
                        type: String,
                        enum: ["Pending", "Accept", "Reject"],
                    },
                    read: {
                        type: Boolean,
                        default: false
                    }
                },
            }
        }],
        trim: true,
        required: true,
    },
    all_admins: {
        type: [{
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                trim: true,
                ref: 'User',
            }
        }],
        required: true,
    },
    TotalMember: {
        type: Number,
        default: 1
    },
    message: {
        type: String,
        default: ""
    },
    read: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        trim: true,
        enum: ["Active", "Inactive", "Pending", "Accept", "Reject"],
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

module.exports = mongoose.model('Pbms', Pbms);