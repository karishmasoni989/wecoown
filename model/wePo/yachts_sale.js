var mongoose = require("mongoose");

const Yachts_sale = mongoose.Schema({
    name: {
        type: String,
        default: 'Yachts & Ships'
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
    // Boat Name
    Boat_Name: {
        type: String,
        default: null
    },
    // Specs
    Builder: {
        type: String,
        default: null
    },
    Designer: {
        type: String,
        default: null
    },
    Hull_Shape: {
        type: String,
        default: null
    },
    Hull_Material: {
        type: String,
        default: null
    },
    // Dimensions
    LOA: {
        type: String,
        default: null
    },
    Beam: {
        type: String,
        default: null
    },
    Maximum_Draft: {
        type: String,
        default: null
    },
    Dry_Weight: {
        type: String,
        default: null
    },
    // Engines
    Total_Power: {
        type: String,
        default: null
    },
    Engine_1: {
        type: String,
        default: null
    },
    Engine1_Brand: {
        type: String,
        default: null
    },
    Engine1_Year_Built: {
        type: String,
        default: null
    },
    Engine1_Type: {
        type: String,
        default: null
    },
    Engine1_Model: {
        type: String,
        default: null
    },
    Engine1_Fuel_Type: {
        type: String,
        default: null
    },
    Engine1_Power: {
        type: String,
        default: null
    },
    Engine1_Engine_Hours: {
        type: String,
        default: null
    },
    Engine1_Drive_Type: {
        type: String,
        default: null
    },
    Engine_2: {
        type: String,
        default: null
    },
    Engine2_Brand: {
        type: String,
        default: null
    },
    Engine2_Year_Built: {
        type: String,
        default: null
    },
    Engine2_Type: {
        type: String,
        default: null
    },
    Engine2_Model: {
        type: String,
        default: null
    },
    Engine2_Fuel_Type: {
        type: String,
        default: null
    },
    Engine2_Power: {
        type: String,
        default: null
    },
    Engine2_Engine_Hours: {
        type: String,
        default: null
    },
    Engine2_Drive_Type: {
        type: String,
        default: null
    },
    Cruising_Speed: {
        type: String,
        default: null
    },
    Maximum_Speed: {
        type: String,
        default: null
    },
    // Tanks
    Fuel_Tanks: {
        type: String,
        default: null
    },
    // Accommodation
    Seating_Capacity: {
        type: String,
        default: null
    },
    Number_of_heads: {
        type: String,
        default: null
    },
    Number_of_twin_berths: {
        type: String,
        default: null
    },
    Number_of_double_berths: {
        type: String,
        default: null
    },
    Number_of_cabins: {
        type: String,
        default: null
    },
    Number_of_bathrooms: {
        type: String,
        default: null
    },
    // Exterior Features and Equipment
    Exterior_Features_and_Equipment: {
        type: String,
        default: null
    },
    // Features
    Features: {
        type: String,
        default: null
    },
    // Electronics
    Electronics: {
        type: String,
        default: null
    },
    // Inside Equipment
    Inside_Equipment: {
        type: String,
        default: null
    },
    // Outside Equipment/Extras
    Outside_Equipment_Extras: {
        type: String,
        default: null
    },
    // Covers
    Covers: {
        type: String,
        default: null
    },
    // Electronics & Navigation Equipment
    Electronics_Navigation_Equipment: {
        type: String,
        default: null
    },
    // Navigation Equipment
    Navigation_quipment: {
        type: String,
        default: null
    },
    // Electrical Equipment
    Electrical_Equipment: {
        type: String,
        default: null
    },
    // Audio Visual & Communication
    Audio_Visual_Communication: {
        type: String,
        default: null
    },
    // Interior Features and Equipment
    Interior_Features: {
        type: String,
        default: null
    },
    // General
    Year: {
        type: String,
        default: null
    },
    Length: {
        type: String,
        default: null
    },
    Located_In: {
        type: String,
        default: null
    },
    // {YW# = wePo}
    wePo: {
        type: String,
        default: null
    },
    Propulsion_options: {
        type: String,
        default: null
    },
    Description: {
        type: String,
        default: null
    },
    Disclaimer: {
        type: String,
        default: null
    },
    Current_Price: {
        type: String,
        default: null
    },
    yachts_type: {
        type: String,
        default: 'Yachts & Ships'
    },
    yachts_subtype: {
        type: String,
        default: null
    },
    zoning: {
        type: String,
        default: null
    },
    // after excel sheet data
    price: {
        type: String,
    },
    draft: {
        type: String,
    },
    Staterooms: {
        type: String,
    },
    engine_make: {
        type: String,
    },
    Fresh_Water: {
        type: String,
    },
    Holding: {
        type: String,
    },
    Overview: {
        type: String,
    },

    Refit: {
        type: String,
    },
    Construction: {
        type: String,
    },
    Concept_And_Design: {
        type: String,
    },
    Rigging_And_Sails: {
        type: String,
    },
    Exterior_Layout: {
        type: String,
    },
    Generators_and_Electricity: {
        type: String,
    },
    // A/C
    A_C: {
        type: String,
    },
    Chargers: {
        type: String,
    },
    Main_Deck: {
        type: String,
    },
    starboard_hull: {
        type: String,
    },

    port_hull: {
        type: String,
    },
    Vessel_name: {
        type: String,
    },
    Vessel_type: {
        type: String,
    },
    Constructed: {
        type: String,
    },
    Refitted: {
        type: String,
    },
    No_of_engines: {
        type: String,
    },
    Name: {
        type: String,
    },
    built_year: {
        type: String,
    },
    Mainly_Used_For: {
        type: String,
    },
    Licence: {
        type: String,
    },
    Hydraulics: {
        type: String,
    },
    other_information: {
        type: String,
    },
    Hours: {
        type: String,
    },
    Displacement: {
        type: String,
    },

    Single_Berths: {
        type: String,
    },
    Upgrades_and_Features: {
        type: String,
    },
    Detailed_Specification: {
        type: String,
    },
    Interior_Accommodations_Layout: {
        type: String,
    },
    His_and_Her_Master_Bath: {
        type: String,
    },

    Main_Salon: {
        type: String,
    },
    Dining_Area: {
        type: String,
    },
    Main_Foyer: {
        type: String,
    },
    Galley: {
        type: String,
    },

    Mechanical_Equipment: {
        type: String,
    },
    Max_Passengers: {
        type: String,
    },
    Rigger: {
        type: String,
    },
    Mast_material: {
        type: String,
    },
    Mast_heights_over_deck: {
        type: String,
    },
    Sails: {
        type: String,
    },
    Asymmetric_balloon: {
        type: String,
    },
    Genoa_sail: {
        type: String,
    },
    Stay_sail: {
        type: String,
    },
    Main_sail: {
        type: String,
    },
    General: {
        type: String,
    },
    Owner_and_Guest: {
        type: String,
    },
    Deck_Area: {
        type: String,
    },
    Crew: {
        type: String,
    },
    // Winter Maintenance/10 Year Abs Details
    Winter_Maintenance_10_Year_Abs_Details: {
        type: String,
    },

    Manufacturer: {
        type: String,
    },
    Mooring_Country: {
        type: String,
    },
    Currency: {
        type: String,
    },
    Condition: {
        type: String,
    },

    Operating_Depth: {
        type: String,
    },
    Size: {
        type: String,
    },

    Emergency_Endurance: {
        type: String,
    },
    Class: {
        type: String,
    },
    Support: {
        type: String,
    },
    Categories: {
        type: String,
    },
    Subcategory: {
        type: String,
    },

    Autonomy: {
        type: String,
    },
    top_speed: {
        type: String,
    },
    range: {
        type: String,
    },
    guest_cabin: {
        type: String,
    },
    Builder: {
        type: String,
    },
    Naval_Architect: {
        type: String,
    },
    Length_Overall: {
        type: String,
    },
    Length_at_Waterline: {
        type: String,
    },
    Max_Draught: {
        type: String,
    },
    Gross_Tonnage: {
        type: String,
    },
    Displacement_Tonnage: {
        type: String,
    },
    Hull_Number: {
        type: String,
    },
    Hull_Type: {
        type: String,
    },
    Number_of_Decks: {
        type: String,
    },

    MCA_Compliant: {
        type: String,
    },
    Water_Capacity: {
        type: String,
    },
    Superstructure: {
        type: String,
    },
    Deck: {
        type: String,
    },
    Guests: {
        type: String,
    },
    Passenger_Rooms: {
        type: String,
    },
    Master_Rooms: {
        type: String,
    },
    Twin_Rooms: {
        type: String,
    },
    VIP_Rooms: {
        type: String,
    },
    Engines: {
        type: String
    },
    Make: {
        type: String
    },
    Model: {
        type: String
    },
    Fuel: {
        type: String
    },
    Drive_Type: {
        type: String
    },
    Specification: {
        type: String,
    },
    Max_Draft: {
        type: String,
    },
    Cabins: {
        type: String,
    },
    Heads: {
        type: String,
    },
    Plumbing: {
        type: String,
    },
    Electricity: {
        type: String,
    },
    Generators: {
        type: String,
    },
    Entertainment_And_Electronics: {
        type: String,
    },
    interior_layout: {
        type: String,
    },
    property_address: {
        type: String,
    },
    tanks_features: {
        type: String,
    },
    Accommodation: {
        type: String,
    },
    Audio_visual: {
        type: String,
    },
    communication: {
        type: String,
    },
    Interior_Exterior_Features_Equipment: {
        type: String,
    },
    Inside_Equipment_Outside_Equipment: {
        type: String,
    },
    Yachts_Ships_Highlights: {
        type: String,
    },
    Specifications: {
        type: String,
    },
    Engine_model: {
        type: String,
    },
    Engine_power: {
        type: String,
    },
    Location: {
        type: String,
    },
    Build_Year: {
        type: String,
    },
    Additional_Details: {
        type: String,
    },
    Hull: {
        type: String,
    },
    Electrical: {
        type: String,
    },
    Power: {
        type: String,
    },
    Everything: {
        type: String,
    },
    walk_through: {
        type: String,
    },
    Electronics_Navigation_AV_Equipment: {
        type: String
    },
    General_Highlights: {
        type: String
    },
    Dimensions: {
        type: String
    },
    Yacht_Type: {
        type: String
    },
    Yacht_Subtype: {
        type: String
    },
    Exterior_Designer: {
        type: String
    },
    Interior_Designer: {
        type: String
    },
    Performance_and_Capacities: {
        type: String
    },
    Materials: {
        type: String
    },
    Engines_Plumbing_Hydraulic_And_Electricity: {
        type: String
    },
    Boat_Name_Tanks_Features: {
        type: String
    },
    Electronics_Covers_Audio_Visual_Communication: {
        type: String
    },
    Electrical_Electronics_Navigation_Equipment: {
        type: String
    },
    Type: {
        type: String
    },
    Year_built: {
        type: String
    },
    Passengers: {
        type: String
    },
    Fuel_Capacity: {
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
Yachts_sale.index({
    "Tittle_Name": "text",
    "Description": "text",
    "address_line1": "text",
    "address_line2": "text",
    "city": "text",
    "state": "text",
    "country": "text",
    "landmark": "text",
    "Boat_Name": "text",
    "yachts_subtype": "text"
});
module.exports = mongoose.model('Yachts_sale', Yachts_sale);