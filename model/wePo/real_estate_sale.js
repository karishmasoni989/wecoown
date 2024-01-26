var mongoose = require("mongoose");

const Real_estate_sale = mongoose.Schema({
    name: {
        type: String,
        default: 'Real Estate'
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
    // Form_Serial_Number
    Serial_Number: {
        type: Number,
        required: true
    },
    Seq_Serial_Number: {
        type: Number,
        default: null
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
    three_year_revenue: {
        type: String,

    },
    // Other Rooms
    Total_Rooms: {
        type: String,

    },
    Den_Description: {
        type: String,

    },
    Family_Room_Description: {
        type: String,

    },
    Living_Room_Description: {
        type: String,

    },
    Storage: {
        type: String,

    },
    // Bathrooms
    Total_Bathrooms: {
        type: String,

    },
    Full_Bathrooms: {
        type: String,

    },
    Half_Bathrooms: {
        type: String,

    },
    Bathroom_1_Features: {
        type: String,

    },
    // Pool and Spa
    Pool_Features: {
        type: String,

    },
    Spa_Features: {
        type: String,

    },
    // Bedrooms
    Bedrooms: {
        type: String,

    },
    Bedroom_1_Description: {
        type: String,

    },
    // Kitchen and Dining
    Kitchen_and_Dining: {
        type: String,

    },
    Dining_Room_Description: {
        type: String,

    },
    // Appliances
    Appliances: {
        type: String,

    },
    Laundry_Features: {
        type: String,

    },
    // Interior_Features
    Interior_Features: {
        type: String,

    },
    Flooring: {
        type: String,

    },
    // Home Features   
    View: {
        type: String,

    },
    // Homeowners Association
    Association: {
        type: String,

    },
    Association_Fee: {
        type: String,

    },
    Association_Fee_Frequency: {
        type: String,

    },
    Association_Fee_Includes: {
        type: String,

    },
    Association_Amenities: {
        type: String,

    },
    Association_Name: {
        type: String,

    },
    Association_Phone: {
        type: String,

    },
    Calculated_Total_Monthly_Association_Fees: {
        type: String,

    },
    // Multi-Unit Info
    Number_of_Units: {
        type: String,

    },
    // Other Property Info
    Source_Listing_Status: {
        type: String,

    },
    Disclaimer: {
        type: String,

    },
    Cross_Street: {
        type: String,

    },
    Restrictions: {
        type: String,

    },
    Area: {
        type: String,

    },
    Source_Neighborhood: {
        type: String,

    },
    Subdivision: {
        type: String,

    },
    Source_System_Name: {
        type: String,

    },
    Miscellaneous: {
        type: String,

    },

    Ownership_Type: {
        type: String,

    },
    Coming_Soon_Date: {
        type: Date,

    },
    // Building and Construction
    Year_Built: {
        type: String,

    },
    Property_Age: {
        type: String,

    },
    Structure_Type: {
        type: String,

    },
    Building_Exterior_Type: {
        type: String,

    },
    Local_Home_Services: {
        type: String,

    },
    property_type: {
        type: String,
        default: 'Real Estate'
    },
    property_subtype: {
        type: String,

    },
    Entry_Level: {
        type: String,

    },
    Construction_Materials: {
        type: String,

    },
    Roof: {
        type: String,

    },
    Total_Square_Feet_Living: {
        type: String,

    },
    Foundation_Details: {
        type: String,

    },
    Living_Area_Source: {
        type: String,

    },
    // Garage and Parking
    Garage_Description: {
        type: String,

    },
    Driveway: {
        type: String,

    },
    Parking_Features: {
        type: String,

    },
    // Accessibility Features
    Accessibility_Features: {
        type: String,

    },
    // Land Info
    Lot_Description: {
        type: String,

    },
    Lot_Dimensions: {
        type: String,

    },
    Lot_Size_Acres: {
        type: String,

    },
    Lot_Size_Square_Feet: {
        type: String,

    },
    // Heating and Cooling
    Fireplace_Features: {
        type: String,

    },
    Number_of_Fireplaces: {
        type: String,

    },
    Heating_Features: {
        type: String,

    },
    Cooling_Features: {
        type: String,

    },
    // Nearby Schools
    Nearby_Schools: [{
        Rating: {
            type: String,
        },
        School_Name: {
            type: String,
        },
        Grades: {
            type: String,
        },
        Distance: {
            type: String,
        }
    }],
    // Neighborhood
    Neighborhood: [{
        Near_by_city: {
            type: Array,
        },
        Near_by_country: {
            type: Array,
        },
    }],
    zoning: {
        type: String,

    },
    // Amenities and Community Features
    Amenities: {
        type: String,

    },
    Community_Features: {
        type: String,

    },
    unit_amenities: {
        type: String,

    },
    site_amenities: {
        type: String,

    },
    Utilities: {
        type: String,

    },

    // price
    price: {
        type: String,

    },
    price_per_unit: {
        type: String,

    },
    cap_rate: {
        type: String,

    },
    gross_rent_multiplier: {
        type: String,

    },
    // property taxes
    Parcel_Number: {
        type: String,

    },
    Land_Assessment: {
        type: String,

    },
    Improvements_Assessment: {
        type: String,

    },
    Total_Assessment: {
        type: String,

    },
    // for lease add fields
    Overview: {
        type: String,

    },
    Floor_Plans: {
        type: String,

    },
    // Property Features
    Lease_Community_Features: {
        type: String,

    },
    Lease_Year_Built: {
        type: String,

    },
    Unit_Features: {
        type: String,

    },
    phone: {
        type: String,

    },
    email: {
        type: String,

    },
    price_from: {
        type: Number,

    },
    price_to: {
        type: Number,

    },
    // another fileds added for apartment
    Sale_Conditions: {
        type: String,

    },
    // = house_style
    Apartment_Style: {
        type: String,

    },
    building_class: {
        type: String,

    },
    building_size: {
        type: String,

    },
    // = Levels_or_Stories
    No_of_Stories: {
        type: String,

    },
    // = Parking_Features
    Parking_Ratio: {
        type: String,

    },
    Opportunity_Zone: {
        type: String,

    },
    Price_inclusive_of_fees: {
        type: String,

    },
    transportation: {
        type: String,

    },
    nearby_amenities: {
        type: String,

    },
    Annual_Taxes: {
        type: String,

    },
    Tax_Year: {
        type: String,

    },
    Price_Per_SF: {
        type: String,

    },
    Listing_Status: {
        type: String,

    },
    MLS: {
        type: String,

    },
    Parking_Spaces: {
        type: String,

    },
    Architecture_Style: {
        type: String,

    },
    Key_features: {
        type: String,

    },
    Basement: {
        type: String,

    },
    construction_type_and_style: {
        type: String,

    },
    Material_information: {
        type: String,

    },
    Notable_dates: {
        type: String,

    },
    Community: {
        type: String,

    },
    // Utilities / Green Energy Details:
    Utilitie_Green_Energy_Details: {
        type: String,

    },

    Rentable_Building_Area: {
        type: String,

    },
    Tenancy: {
        type: String,

    },
    Clear_Ceiling_Height: {
        type: String,

    },
    No_of_Dock_High: {
        type: String,

    },
    Tenant: {
        type: String,

    },
    Industry: {
        type: String,

    },
    SF_Occupied: {
        type: String,

    },
    // RENT/SF
    Rent_SF: {
        type: String,

    },
    Lease_End: {
        type: String,

    },
    Asset_Type: {
        type: String,
    },
    Primary_Property_Type: {
        type: String,
    },
    Zoning_Designation: {
        type: String,
    },
    Occupancy: {
        type: String,
    },
    Type_of_Ownership: {
        type: String,
    },
    Event_Item: {
        type: String,
    },
    Size: {
        type: String,
    },
    Security: {
        type: String,
    },
    HOA: {
        type: String,
    },
    Other_construction: {
        type: String,
    },
    Other_property_information: {
        type: String,
    },
    Other_financial_information: {
        type: String,
    },
    Location: {
        type: String,
    },
    Inventory: {
        type: String,
    },
    Building_SF: {
        type: String,
    },
    Employees: {
        type: String,
    },
    Facilities: {
        type: String,
    },

    Competition: {
        type: String,
    },
    Growth_and_Expansion: {
        type: String,
    },
    Financing: {
        type: String,
    },
    Support_and_Training: {
        type: String,
    },
    Percent_Leased: {
        type: String,
    },
    Building_Height: {
        type: String,
    },
    Typical_Floor_Size: {
        type: String,
    },
    Slab_To_Slab: {
        type: String,
    },
    Building_FAR: {
        type: String,
    },
    Land_Acres: {
        type: String,
    },
    // space availability
    space: {
        type: String,

    },
    space_size: {
        type: String,

    },
    space_use: {
        type: String,

    },
    space_condition: {
        type: String,

    },
    space_available: {
        type: String,

    },
    // Name of property
    Property_Name: {
        type: String,
    },

    Region: {
        type: String,
    },
    Development: {
        type: String,
    },
    Lifestyles: {
        type: String,
    },

    Population: {
        type: String,
    },
    Frontage: {
        type: String,
    },
    Loading_Docks: {
        type: String,
    },

    lease_type: {
        type: String,
    },
    property_facts: {
        type: String,
    },
    sale_type: {
        type: String,
    },
    About: {
        type: String,
    },
    About_this_property: {
        type: String,
    },
    property_taxes: {
        type: String,
    },
    Bathrooms: {
        type: String
    },
    Pool_Spa: {
        type: String
    },
    Homeowners_Association: {
        type: String
    },
    zoning_code: {
        type: String
    },
    Listed_By_Agent: {
        type: String
        // enum: ["Y", "N"]
    },
    TAXES_OPERATING_EXPENSES: {
        type: String
    },
    Half_Baths: {
        type: String
    },
    Total_Baths: {
        type: String
    },
    Living_Area: {
        type: String
    },
    Other_rooms: {
        type: String,
    },
    Home_Features: {
        type: String
    },
    Multi_Unit_Info: {
        type: String
    },
    building_construction: {
        type: String
    },
    Levels_or_Stories: {
        type: String
    },
    Land_Info: {
        type: String
    },
    Heating_Cooling: {
        type: String
    },
    Community_Features_Amenities: {
        type: String
    },
    Property_Price_Tax: {
        type: String,

    },
    Bedrooms_Bathrooms: {
        type: String
    },
    Type_and_style: {
        type: String
    },
    Condition: {
        type: String,

    },
    Community_and_Neighborhood_Details: {
        type: String
    },
    Major_Tenants: {
        type: String
    },
    Detailed_Description: {
        type: String
    },
    Everything: {
        type: String
    },
    Facts_features: {
        type: String
    },
    other_interior_features: {
        type: String,
    },
    construction_details: {
        type: String,
    },
    Garage_and_Parking: {
        type: String,
    },
    property_details: {
        type: String,
    },
    Parking: {
        type: String,
    },
    Accessibility: {
        type: String,
    },
    Property: {
        type: String,
    },
    Other_property: {
        type: String,
    },
    HOA_financial_details: {
        type: String,
    },
    Property_Address: {
        type: String,
    },
    interior_details: {
        type: String,
    },
    Year_of_construction: {
        type: String,
    },
    Type: {
        type: String
    },
    NEARBY_MAJOR_RETAILERS: {
        type: String
    },
    Property_Type_PF: {
        type: String
    },
    Property_Subtype_PF: {
        type: String
    },
    County: {
        type: String
    },
    Heating: {
        type: String
    },
    Cooling: {
        type: String
    },
    Title: {
        type: String
    },
    Brokerage_Company: {
        type: String
    },
    AVAILABLE: {
        type: String
    },

    // year built and property type
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
Real_estate_sale.index({
    "Tittle_Name": "text",
    "Description": "text",
    "address_line1": "text",
    "address_line2": "text",
    "city": "text",
    "state": "text",
    "country": "text",
    "landmark": "text",
    "invesment_highlights": "text",
    "executive_summary": "text",
    "property_subtype": "text"
});
module.exports = mongoose.model('Real_estate_sale', Real_estate_sale);