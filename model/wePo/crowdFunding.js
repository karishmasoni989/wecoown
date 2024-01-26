var mongoose = require("mongoose");

const CrowdFunding_sale = mongoose.Schema({
    name: {
        type: String,
        default: 'Crowdfunding Projects'
    },
    purpose: {
        type: String,
        enum: ["For Sale", "For Lease", "Both", "No Ready"],
    },
    // fields for sell and buy property
    fractional_share_choice_percentage_or_unit: {
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
    invesment_highlights: {
        type: String,
        default: null
    },
    // Form_Serial_Number
    Serial_Number: {
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
    Fees: {
        type: String,
        default: null
    },
    CrowdFunding_type: {
        type: String,
        default: 'Crowdfunding Projects'
    },
    CrowdFunding_subtype: {
        type: String,
        default: null
    },
    Minimum_Investment: {
        type: String,
        default: null
    },
    Average_Annual_Return: {
        type: String,
        default: null
    },
    Total_Investor_Distributions: {
        type: String,
        default: null
    },
    Investment_Options: {
        type: String,
        default: null
    },
    Accredited_Investors_Only: {
        type: String,
        default: null
    },
    Pros: {
        type: String,
        default: null
    },
    Cons: {
        type: String,
        default: null
    },
    Early_Withdrawals: {
        type: String,
        default: null
    },
    Steep_Investment_Minimums: {
        type: String,
        default: null
    },
    // Airframe
    Historical_Annual_Returns: {
        type: String,
        default: null
    },
    Reinvestment_Opportunities: {
        type: String,
        default: null
    },
    Website_Transparency: {
        type: String,
        default: null
    },
    Business_Bureau_Ratings: {
        type: String,
        default: null
    },
    Educational_Offerings: {
        type: String,
        default: null
    },
    Targeted_Average_Cash_Yield: {
        type: String,
        default: null
    },
    // Engine 1  
    Targeted_Investment_Period: {
        type: String,
        default: null
    },
    Targeted_Equity_Multiple: {
        type: String,
        default: null
    },
    Targeted_Investor_IRR: {
        type: String,
        default: null
    },
    Preferred_Return: {
        type: String,
        default: null
    },
    Investment_Strategy: {
        type: String,
        default: null
    },
    // Engine 2 
    Property_Type: {
        type: String,
        default: null
    },
    Investment_Profile: {
        type: String,
        default: null
    },
    Number_of_Holdings: {
        type: String,
        default: null
    },
    Disclaimers_Disclosures: {
        type: String,
        default: null
    },
    Footnotes: {
        type: String,
        default: null
    },
    Sponsor_Historic_Net_IRR: {
        type: String,
        default: null
    },
    // Engine Program
    Sponsor_Historic_Equity_Multiple: {
        type: String,
        default: null
    },
    Distribution: {
        type: String,
        default: null
    },
    // Props
    Company_Term: {
        type: String,
        default: null
    },
    Next_Targeted_Close_Date: {
        type: Date,
        default: null
    },
    Offers_Due_Date: {
        type: Date,
        default: null
    },
    Funds_Due_Date: {
        type: Date,
        default: null
    },
    Targeted_Project_IRR: {
        type: String,
        default: null
    }, //co-invest
    Sponsor_Co_Investment: {
        type: String,
        default: null
    },
    Targeted_Distribution_Start_Date: {
        type: Date,
        default: null
    },
    Preferred_Return_Accrual_Date: {
        type: Date,
        default: null
    },
    //    SD-IRA
    SD_IRA_Investments: {
        type: String,
        default: null
    },
    Initial_Posting_Date: {
        type: Date,
        default: null
    },
    Fund_Size: {
        type: String,
        default: null
    },
    Sponsor: {
        type: String,
        default: null
    },
    Business_Plan: {
        type: String,
        default: null
    },
    // Avionics/Radios
    Key_Deal_Points: {
        type: String,
        default: null
    },
    // Additional Equipment
    Summary_of_Changes: {
        type: String,
        default: null
    },
    Prior_WePo_Offerings: {
        type: String,
        default: null
    },
    // Exterior
    Targeted_Cash_Distributions: {
        type: String,
        default: null
    },
    Sponsor_Experience: {
        type: String,
        default: null
    },
    // Interior
    Investor_Accreditation: {
        type: String,
        default: null
    },
    // 1031 Exchange
    One031_Exchange: {
        type: String,
        default: null
    },
    Opportunity_Zone: {
        type: String,
        default: null
    },
    Reasons_to_Invest: {
        type: String,
        default: null
    },
    Features: {
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
    Tax: {
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
CrowdFunding_sale.index({
    "Tittle_Name": "text",
    "Description": "text",
    "address_line1": "text",
    "address_line2": "text",
    "city": "text",
    "state": "text",
    "country": "text",
    "landmark": "text",
    "CrowdFunding_subtype": "text"
});
module.exports = mongoose.model('CrowdFunding_sale', CrowdFunding_sale);