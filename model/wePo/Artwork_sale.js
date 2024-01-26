var mongoose = require("mongoose");

const Artwork_sale = mongoose.Schema({
    name: {
        type: String,
        default: 'Artworks & Antiques'
    },
    purpose: {
        type: String,
        enum: ["For Sale", "For Lease", "Both","No Ready"]
    },
    // fields for sell and buy property
    fractional_share_choice_percentage_or_unit : {
        type: String,
    },
    fractional_share_text_percentage_or_unit: {
        type: String,
    },
    offering_Price_fractional_ownership: {
        type: String,
    },
    // No ready for sale or lease
    pdf_doc: {
        type: Array,
        trim: true,
        default: [],
    },
    Tittle_Name: {
        type: String,
        default: null
    },
    Sold_out: {
        type: Boolean,
        default: false
    },
    selling_price: {
        type: Number,
        default: null
    },
    selling_date: {
        type: Date,
        default: null
    },
    Form_Serial_Number: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        default: null
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
    price: {
        type: String,
        default: null
    },
    Artwork_type : {
        type: String,
        required: true
    },
    Artwork_subtype: {
        type: String,
        required: true
    },

    //new fields added

    Provenance: {
        type: String,
        default: null
    },
    Medium: {
        type: String,
        default: null
    },
    Subject: {
        type: String,
        default: null
    },
    Country_Region_Manufacture: {
        type: String,
        default: null
    },
    Style: {
        type: String,
        default: null
    },
    Listed_By: {
        type: String,
        default: null
    },
    Region_of_Origin: {
        type: String,
        default: null
    },
    Painting_Surface: {
        type: String,
        default: null
    },
    Features: {
        type: String,
        default: null
    },
    Width_Inches: {
        type: String,
        default: null
    },
    Date_of_Creation: {
        type: Date,
        default: null
    },
    Originality: {
        type: String,
        default: null
    },
    Height_Inches: {
        type: String,
        default: null
    },
    Artist: {
        type: String,
        default: null
    },
    Size: {
        type: String,
        default: null
    },
    Color: {
        type: String,
        default: null
    },
    Signed: {
        type: String,
        trim: true,
    },
    Original_Reproduction: {
        type: String,
        default: null
    },
    Placement: {
        type: String,
        default: null
    },
    Culture: {
        type: String,
        default: null
    },
    Quantity_Type: {
        type: String,
        default: null
    },
    Type: {
        type: String,
        default: null
    },
    MPN: {
        type: String,
        default: null
    },
    Weight: {
        type: String,
        default: null
    },
    Material_used: {
        type: String,
        default: null
    },
    Print_Surface: {
        type: String,
        default: null
    },
    Measurements: {
        type: String,
        default: null
    },
    Condition: {
        type: String,
        default: null
    },
    History: {
        type: String,
        default: null
    },
    Maker: {
        type: String,
        default: null
    },
    Circulated_Uncirculated: {
        type: String,
        default: null
    },
    Modified_Item: {
        type: String,
        default: null
    },
    Grade: {
        type: String,
        default: null
    },
    Dimensions: {
        type: String,
        default: null
    },
    Model_number: {
        type: String,
        default: null
    },
    Artwork_Description: {
        type: String,
        default: null
    },
    Printing_Technique: {
        type: String,
        default: null
    },
    
    //New Fields added
    Title: {
        type: String,
        default: null
    },
    Artist_History: {
        type: String,
        default: null
    },
    Shape: {
        type: String,
        default: null
    },
    Period: {
        type: String,
        default: null
    },
    Origin: {
        type: String,
        default: null
    },
    Current_Location: {
        type: String,
        default: null
    },
    Painting_Overview: {
        type: String,
        default: null
    },
    Sculpture_Overview: {
        type: String,
        default: null
    },
    History_of_Item: {
        type: String,
        default: null
    },
    Year_Built_Made: {
        type: String,
        default: null
    },
    Artwork_Serial_Number: {
        type: String,
        default: null
    },

    

    status: {
        type: String,
        trim: true,
        default: "Active",
    },
    listing_show_on_wepo: {
        type: String,
        trim: true,
        enum: ["Yes", "No"],
        default: 'Yes'
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

Artwork_sale.index({
    "Tittle_Name": "text",
    "Description": "text",
    "address_line1": "text",
    "address_line2": "text",
    "city": "text",
    "state": "text",
    "country": "text",
    "landmark": "text",
    "Artwork_type": "text",
    "Artwork_subtype": "text"
});
module.exports = mongoose.model('Artwork_sale', Artwork_sale);