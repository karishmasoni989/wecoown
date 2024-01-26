var mongoose = require("mongoose");

const WePo_posting = mongoose.Schema({
    invesment_summary: {
        type: String,
    },
    executive_summary: {
        type: String,
    },
    property_photos: {
        type: Object,
        default: null
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        default: null,
        ref:'User'
    },
    links: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },    
    sale_condition: {
        type: Object,
        default: null
    },
    sale_type: {
        type: String,
        default: null
    },
    property_type: {
        type: String,
        default: null
    },
    property_subtype: {
        type: String,
        default: null
    },   
    building_class: {
        type: String,
        default: null
    },
    lot_size: {
        type: String,
        default: null
    },
    rentable_building_area:{
        type: String,
        default: null
    },
    zoning: {
        type: String,
        default: null
    },
    no_stories: {
        type: String,
        default: null
    },
    parking_ratio: {
        type: String,
        default: null
    },
    oppotunity_zone: {
        type: String,
        default: null
    },
    year_built: {
        type: String,
        default: null
    },
    percentage_leased: {
        type: String,
        default: null
    },
    building_height: {
        type: String,
        default: null
    },
    typical_floor_size: {
        type: String,
        default: null
    },
    building_far: {
        type: String,
        default: null
    },
    land_acres: {
        type: String,
        default: null
    },
    
    claer_ceiling_height: {
        type: String,
        default: null
    },
    no_dock_high_doors: {
        type: String,
        default: null
    },
    no_drive_in: {
        type: String,
        default: null
    },
    land_acres: {
        type: String,
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

module.exports = mongoose.model('WePo_posting', WePo_posting);