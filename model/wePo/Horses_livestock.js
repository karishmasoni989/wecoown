var mongoose = require("mongoose");

const Horses_livestock = mongoose.Schema({
    name: {
        type: String,
        default: 'Horses & Live Stocks'
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
    Horses_Livestocks_type : {
        type: String,
        required: true
    },
    Horses_Livestocks_subtype: {
        type: String,
        required: true
    },

    //new fields added
    Horses_Name: {
        type: String,
        default: null
    },
    Category: {
        type: String,
        default: null
    },
    Gender: {
        type: String,
        default: null
    },
    Colour: {
        type: String,
        default: null
    },
    County: {
        type: String,
        default: null
    },
    Vendor_Details: {
        type: String,
        default: null
    },
    Sire: {
        type: String,
        default: null
    },
    Dam: {
        type: String,
        default: null
    },
    Dam_Sire: {
        type: String,
        default: null
    },
    Skill: {
        type: String,
        default: null
    },
    Age: {
        type: String,
        default: null
    },
    DOB: {
        type: String,
        default: null
    },
    COB: {
        type: String,
        default: null
    },
    X_rayed: {
        type: String,
        default: null
    },
    Height: {
        type: String,
        default: null
    },
    Weight_lbs: {
        type: String,
        default: null
    },
    AFS_no: {
        type: String,
        default: null
    },
    Rep_no: {
        type: String,
        default: null
    },
    Location: {
        type: String,
        default: null
    },
    Scoped: {
        type: String,
        default: null
    },
    livestock_Price: {
        type: String,
        default: null
    },
    Temperament: {
        type: String,
        default: null
    },
    Foal_Date: {
        type: Date,
        default: null
    },
    In_Foal: {
        type: String,
        default: null
    },
    Breed: {
        type: String,
        default: null
    },
    Markings: {
        type: String,
        default: null
    },
    Listing_Number: {
        type: String,
        default: null
    },
    Ship_From: {
        type: String,
        default: null
    },
    Registered: {
        type: String,
        default: null
    },
    Number_for_Sale: {
        type: String,
        default: null
    },
    Origin: {
        type: String,
        default: null
    },
    Frame: {
        type: String,
        default: null
    },
    Condition: {
        type: String,
        default: null
    },
    Horns: {
        type: String,
        default: null
    },
    Est_Weight: {
        type: String,
        default: null
    },
    Bred_To: {
        type: String,
        default: null
    },
    Preg_Checked: {
        type: String,
        default: null
    },
    Implanted: {
        type: String,
        default: null
    },
    Gathered: {
        type: String,
        default: null
    },
    Pasture_Feed: {
        type: String,
        default: null
    },
    OCV: {
        type: String,
        default: null
    },
    Sell_Part_All: {
        type: String,
        default: null
    },
    Delivery_Date: {
        type: Date,
        default: null
    },
    Firm_Negotiable: {
        type: String,
        default: null
    },
    Payment_Terms: {
        type: String,
        default: null
    },
    Seller: {
        type: String,
        default: null
    },

    
    //new fields added
    Lineage: {
        type: String,
        default: null
    },
    Ship_Semen: {
        type: String,
        default: null
    },
    Vaccination: {
        type: String,
        default: null
    },
    Price_Description: {
        type: String,
        default: null
    },
    Estimated_Weight_Variance: {
        type: String,
        default: null
    },
    Date_of_Birth: {
        type: Date,
        default: null
    },
    Description_Horses: {
        type: String,
        default: null
    },
    Crossbred_Purebred: {
        type: String,
        default: null
    },
    Registry: {
        type: String,
        default: null
    },
    Registry_Number: {
        type: String,
        default: null
    },
    State_Breed: {
        type: String,
        default: null
    },
    Birth_Weight: {
        type: String,
        default: null
    },
    Fertility: {
        type: String,
        default: null
    },
    Head_Count: {
        type: String,
        default: null
    },
    Price_per_head: {
        type: String,
        default: null
    },
    Average_Weight: {
        type: String,
        default: null
    },
    Total_Weight: {
        type: String,
        default: null
    },
    Registration_Number: {
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

Horses_livestock.index({
    "Tittle_Name": "text",
    "Description": "text",
    "address_line1": "text",
    "address_line2": "text",
    "city": "text",
    "state": "text",
    "country": "text",
    "landmark": "text",
    "Horses_Livestocks_type": "text",
    "Horses_Livestocks_subtype": "text"
});
module.exports = mongoose.model('Horses_livestock', Horses_livestock);