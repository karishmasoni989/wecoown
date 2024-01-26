var mongoose = require("mongoose");

const Specaility_listing_sale = mongoose.Schema({
    name: {
        type: String,
        default: 'Specialty'
    },
    invesment_highlights: {
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
        ref: 'User'
    },
    links: {
        type: String,
        default: null
    },
    // address
    address_line1: {
        type: String,
        default: null
    },
    address_line2: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    zipcode: {
        type: String,
        default: null
    },
    landmark: {
        type: String,
        default: null
    },
    // amenities
    amenities: {
        type: Array,
        default: null
    },
    // property facts  
    sale_type: {
        type: String,
        default: null
    },
    sale_condition: {
        type: Object,
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
    building_size: {
        type: String,
        default: null
    },
    building_class: {
        type: String,
        default: null
    },
    year_built: {
        type: String,
        default: null
    },
    renovated: {
        type: String,
        default: null
    },
    lot_size: {
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
    zoning: {
        type: String,
        default: null
    },
     // space availability
     space: {
        type: String,
        default: null
    },
    space_size: {
        type: String,
        default: null
    },
    space_use: {
        type: String,
        default: null
    },
    space_condition: {
        type: String,
        default: null
    },
    space_available: {
        type: String,
        default: null
    },
    // price
    price: {
        type: String,
        default: null
    },
    price_per_unit: {
        type: String,
        default: null
    },
    cap_rate: {
        type: String,
        default: null
    },
    gross_rent_multiplier: {
        type: String,
        default: null
    },
    // property taxes
    Parcel_Number: {
        type: String,
        default: null
    },
    Land_Assessment: {
        type: String,
        default: null
    },
    Improvements_Assessment: {
        type: String,
        default: null
    },
    Total_Assessment: {
        type: String,
        default: null
    },
    // attachements
    attachements: {
        type: Array,
        default: null
    },
    note: {
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

module.exports = mongoose.model('Specaility_listing_sale', Specaility_listing_sale);