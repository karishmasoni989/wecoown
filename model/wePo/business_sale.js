var mongoose = require("mongoose");

const Business_sale = mongoose.Schema({
    name: {
        type: String,
        default: 'Business Properties'
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
    Business_type : {
        type: String,
        required: true
    },
    Business_subtype: {
        type: String,
        required: true
    },

    //new fields added

    //***Gas Stations & C Stores***
    Location: {
        type: String
    },
    Real_Estate: {
        type: String
    },
    Building_SF: {
        type: String
    },
    Employees: {
        type: String
    },
    Facilities: {
        type: String
    },
    Competition: {
        type: String
    },
    Growth_Expansion: {
        type: String
    },
    Financing: {
        type: String
    },
    Support_Training: {
        type: String
    },
    Add_Additional_Comment: {
        type: String
    },
    Listing_Statistics: {
        type: String
    },
    Freehold_Price: {
        type: String
    },
    Sales_Revenue: {
        type: String
    },
    Cash_Flow: {
        type: String
    },
    Asking_Price: {
        type: String
    },
    Expansion_Potential: {
        type: String
    },
    Years_established: {
        type: String
    },
    Years_build_Renovated: {
        type: String
    },
    Area: {
        type: String
    },
    Gross_Revenue: {
        type: String
    },
    EBITDA: {
        type: String
    },
    FF_E: {
        type: String
    },
    Inventory: {
        type: String
    },

    //*** Car Wash Facilities ***
    Property_Type_CW: {
        type: String
    },
    Property_Subtype_CW: {
        type: String
    },
    Sale_Type: {
        type: String
    },
    Price_Per_SF: {
        type: String
    },
    Parcel_Number: {
        type: String
    },
    Zoning_Code: {
        type: String
    },
    Ameinities: {
        type: String
    },


    Grazing_Acres: {
        type: String
    },
    Acre_Hay_Land: {
        type: String
    },
    Deep_Well: {
        type: String
    },
    livestock: {
        type: String
    },
    Location_and_Access: {
        type: String
    },
    acers_of_grass_hay: {
        type: String
    },
    acers_of_dry_land: {
        type: String
    },
    acers_of_flood_irrigated_alfalfa: {
        type: String
    },
    acers_of_BLM_lease: {
        type: String
    },
    Cross_fence: {
        type: String
    },


    OCCUPANCY_RATE: {
        type: String
    },
    CONCESSION: {
        type: String
    },
    MOORINGS: {
        type: String
    },
    MAX_LENGHT: {
        type: String
    },
    MAX_DEPTH: {
        type: String
    },
    DRY_DOCK: {
        type: String
    },
    AREA_TOTAL: {
        type: String
    },
    HAULING_CAPACITY: {
        type: String
    },
    BUILDINGS: {
        type: String
    },
    MARINA_STORE: {
        type: String
    },
    FUEL_DISPENSING: {
        type: String
    },
    RESTAURANT: {
        type: String
    },
    PARKING_SPACES: {
        type: String
    },
    EQUIPMENT_INC: {
        type: String
    },
    YACHT_SERVICE: {
        type: String
    },
    PROFITABLE: {
        type: String
    },
    Investement_Highlights: {
        type: String
    },
    Executive_Summary: {
        type: String
    },
    Business_price: {
        type: String
    },
    No_Stories: {
        type: String
    },
    Rentable_Building_Area: {
        type: String
    },
    Activity_adventure: {
        type: String
    },
    popular_amenities: {
        type: String
    },
    suites: {
        type: String
    },
    Beds: {
        type: String
    },
    Furniture_Fixtures_Equipment: {
        type: String
    },
    number_of_rooms: {
        type: String
    },
    entertainment: {
        type: String
    },
    Access_and_Parking: {
        type: String
    },
    kitchens: {
        type: String
    },
    living_quarters: {
        type: String
    },
    swimming_pool: {
        type: String
    },
    Driveway: {
        type: String
    },
    property_id: {
        type: String
    },
    sale_condition: {
        type: String
    },
    listing_type: {
        type: String
    },
    Agricultural_Uses: {
        type: String
    },
    Land: {
        type: String
    },
    Irrigation_water: {
        type: String
    },
    Acreage: {
        type: String
    },
    trading_hours: {
        type: String
    },
    home_based: {
        type: String
    },
    Relocatable: {
        type: String
    },
    Tenancy: {
        type: String
    },
    Opportunity_Zone: {
        type: String
    },
    Transportation: {
        type: String
    },
    Land_Assessment: {
        type: String
    },
    Improvements_Assessment: {
        type: String
    },
    Total_Assessment: {
        type: String
    },
    Sale_Flyer: {
        type: Array,
        trim: true,
        default: [],
    },

    Average_Daily_Rate: {
        type: String
    },
    corridor: {
        type: String
    },
    Room_Mix_Info: {
        type: String
    },
    Zoning: {
        type: String
    },
    Parking: {
        type: String
    },
    Frontage: {
        type: String
    },
    Cap_Rate: {
        type: String
    },
    NOI: {
        type: String
    },
    Building_Height: {
        type: String
    },
    Slab_to_Slab: {
        type: String
    },
    Building_FAR: {
        type: String
    },
    Land_acres: {
        type: String
    },
    Occupancy: {
        type: String
    },
    Major_Tenants: {
        type: String
    },
    Nearby_Amentities: {
        type: String
    },
    Financial_Summary: {
        type: String
    },
    Demographics: {
        type: String
    },
    Number_of_Lots: {
        type: String
    },
    Price_per_lot: {
        type: String
    },
    Acres_per_lot: {
        type: String
    },
    Total_Lot_Size: {
        type: String
    },
    Building_Size: {
        type: String
    },
    No_Of_Stories: {
        type: String
    },
    Number_Licenses: {
        type: String
    },
    License_Mix_Info: {
        type: String
    },
    Nearby_Amenities: {
        type: String
    },
    Price_per_acreage: {
        type: String
    },
    Number_Buildings: {
        type: String
    },
    Sq_ft_per_building: {
        type: String
    },
    No_Acres: {
        type: String
    },
    Amenities: {
        type: String
    },
    Building_Class: {
        type: String
    },
    Year_Built: {
        type: String
    },
    Parking_Ratio: {
        type: String
    },
    Number_of_Drive_In_Grade_Level_Doors: {
        type: String
    },
    Lot_Size: {
        type: String
    },
    Price_per_Bed: {
        type: String
    },
    Operating_Schedule: {
        type: String
    },
    No_Barns: {
        type: String
    },
    Stables_per_barn: {
        type: String
    },
    Total_Stables: {
        type: String
    },
    Slip_Mix_Info: {
        type: String
    },
    Sale_Conditions: {
        type: String
    },
    No_Sites: {
        type: String
    },
    Site_Mix_Info: {
        type: String
    },
    Water_Frontage: {
        type: String
    },
    No_Buildings: {
        type: String
    },
    sqFeetPerBuilding: {
        type: String
    },
    No_Slips: {
        type: String
    },
    Land_Type: {
        type: String
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

Business_sale.index({
    "Tittle_Name": "text",
    "Description": "text",
    "address_line1": "text",
    "address_line2": "text",
    "city": "text",
    "state": "text",
    "country": "text",
    "landmark": "text",
    "Business_type": "text",
    "Business_subtype": "text"
});
module.exports = mongoose.model('Business_sale', Business_sale);