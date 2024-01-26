var mongoose = require("mongoose");

const Retail_listing_sale = mongoose.Schema({
    name: {
        type: String,
        default: 'Retail'
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
    percentage_leased: {
        type: String,
        default: null
    },
    zoning: {
        type: String,
        default: null
    },
    parking: {
        type: String,
        default: null
    },
    oppotunity_zone: {
        type: String,
        default: null
    },
    tenancy: {
        type: String,
        default: null
    },
    building_height: {
        type: String,
        default: null
    },
    floors: {
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
    slab_to_slab: {
        type: String,
        default: null
    },
    // amanities
    amenities: {
        type: Array,
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

module.exports = mongoose.model('Retail_listing_sale', Retail_listing_sale);