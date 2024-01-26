var mongoose = require("mongoose");

const Crypto_asset = mongoose.Schema({
    name: {
        type: String,
        default: 'Crypto-Assets'
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
    Crypto_Assets_type : {
        type: String,
        required: true
    },
    Crypto_Assets_subtype: {
        type: String,
        required: true
    },

    //new fields added
    general_Highlight: {
        type: String,
        default: null
    },
    property_Highlight: {
        type: String,
        default: null
    },
    property_Type: {
        type: String,
        default: null
    },
    Neighborhood: {
        type: String,
        default: null
    },
    expected_Yield: {
        type: String,
        default: null
    },
    Rent_Start_Date: {
        type: Date,
        default: null
    },
    Rent_per_Token: {
        type: String,
        default: null
    },
    TokenPrice: {
        type: String,
        default: null
    },
    Total_Tokens: {
        type: String,
        default: null
    },
    Square_Feet: {
        type: String,
        default: null
    },
    Lot_Size: {
        type: String,
        default: null
    },
    Bedroom_Bath: {
        type: String,
        default: null
    },
    Construction_Year: {
        type: String,
        default: null
    },
    Rented: {
        type: String,
        default: null
    },
    Section_8: {
        type: String,
        default: null
    },
    Section_8_Pays: {
        type: String,
        default: null
    },
    Gross_Rent_year: {
        type: String,
        default: null
    },
    Gross_Rent_month: {
        type: String,
        default: null
    },
    Monthly_Costs: {
        type: String,
        default: null
    },
    Net_Rent_month: {
        type: String,
        default: null
    },
    Quantity: {
        type: String,
        default: null
    },
    Currency_Type: {
        type: String,
        default: null
    },
    Pay_With: {
        type: String,
        default: null
    },
    fiat_currency: {
        type: String,
        default: null
    },
    amount_currency_spend: {
        type: String,
        default: null
    },
    Fee: {
        type: String,
        default: null
    },
    Total_spend: {
        type: String,
        default: null
    },
    total_volume: {
        type: String,
        default: null
    },
    price_per_token: {
        type: String,
        default: null
    },
    Estimated_Volume: {
        type: String,
        default: null
    },
    Average_price: {
        type: String,
        default: null
    },
    Number_of_item: {
        type: String,
        default: null
    },
    highest_offer: {
        type: String,
        default: null
    },
    set_price: {
        type: String,
        default: null
    },
    highest_bid: {
        type: String,
        default: null
    },
    Bundle: {
        type: String,
        default: null
    },
    Minimum_bid: {
        type: String,
        default: null
    },
    Expiration_Date: {
        type: Date,
        default: null
    },
    Bounties: {
        type: String,
        default: null
    },
    Platform: {
        type: String,
        default: null
    },
    Brand: {
        type: String,
        default: null
    },
    Type_NFTS: {
        type: String,
        default: null
    },
    Condition: {
        type: String,
        default: null
    },
    Asset_Name: {
        type: String,
        default: null
    },
    Owner: {
        type: String,
        default: null
    },
    Backed_Tokens: {
        type: String,
        default: null
    },
    collection_name: {
        type: String,
        default: null
    },

    //New fields aded
    Investment_Highlight: {
        type: String,
        default: null
    },
    Investment_Type: {
        type: String,
        default: null
    },
    No_Properties: {
        type: String,
        default: null
    },
    NOI: {
        type: String,
        default: null
    },
    Max_Investment: {
        type: String,
        default: null
    },
    Soft_Cap: {
        type: String,
        default: null
    },
    Category: {
        type: String,
        default: null
    },
    Cap_Rate: {
        type: String,
        default: null
    },
    AVG_Occupancy: {
        type: String,
        default: null
    },
    Min_Investment: {
        type: String,
        default: null
    },
    Currencies_Accepted: {
        type: String,
        default: null
    },
    Interests_Offered: {
        type: String,
        default: null
    },
    Start_Date: {
        type: Date,
        default: null
    },
    End_Date: {
        type: Date,
        default: null
    },
    Target_yearly_IRR: {
        type: String,
        default: null
    },
    Sale: {
        type: String,
        default: null
    },
    Token_Name: {
        type: String,
        default: null
    },
    CoC_Yield: {
        type: String,
        default: null
    },
    Property_Overview: {
        type: String,
        default: null
    },
    Market_Analysis: {
        type: String,
        default: null
    },
    Financials: {
        type: String,
        default: null
    },
    Management: {
        type: String,
        default: null
    },
    Dividends_Overview: {
        type: String,
        default: null
    },
    Team_and_Partners: {
        type: String,
        default: null
    },
    Buy: {
        type: String,
        default: null
    },
    Sell: {
        type: String,
        default: null
    },
    Spread: {
        type: String,
        default: null
    },
    Daily_Change: {
        type: String,
        default: null
    },
    Trader_Sentiment: {
        type: String,
        default: null
    },
    Min_Traded_Quantity: {
        type: String,
        default: null
    },
    Full_Name: {
        type: String,
        default: null
    },
    Currency: {
        type: String,
        default: null
    },
    Margin: {
        type: String,
        default: null
    },
    Long_Position_Overnight_Fee: {
        type: String,
        default: null
    },
    Short_Position_Overnight_Fee: {
        type: String,
        default: null
    },
    Price_Chart: {
        type: String,
        default: null
    },
    Commodity_Overview: {
        type: String,
        default: null
    },
    Last_Price: {
        type: String,
        default: null
    },
    Two4_Change: {
        type: String,
        default: null
    },
    Two4_Low: {
        type: String,
        default: null
    },
    Two4_High: {
        type: String,
        default: null
    },
    Two4_Volume: {
        type: String,
        default: null
    },
    Total_Liquidity: {
        type: String,
        default: null
    },
    Transactions: {
        type: String,
        default: null
    },
    Current_Price: {
        type: String,
        default: null
    },
    Price_History: {
        type: String,
        default: null
    },
    Listings: {
        type: String,
        default: null
    },
    Offers: {
        type: String,
        default: null
    },
    Trading_History: {
        type: String,
        default: null
    },
    NFT_Overview: {
        type: String,
        default: null
    },
    Properties: {
        type: String,
        default: null
    },
    Stats: {
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

Crypto_asset.index({
    "Tittle_Name": "text",
    "Description": "text",
    "address_line1": "text",
    "address_line2": "text",
    "city": "text",
    "state": "text",
    "country": "text",
    "landmark": "text",
    "Crypto_Assets_type": "text",
    "Crypto_Assets_subtype": "text"
});
module.exports = mongoose.model('Crypto_asset', Crypto_asset);