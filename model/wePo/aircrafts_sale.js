var mongoose = require("mongoose");

const Aircraft_sale = mongoose.Schema({
    name: {
        type: String,
        default: 'Jets & Aircraft'
    },
    purpose: {
        type: String,
        enum: ["For Sale", "For Lease", "Both","No Ready"],
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
    Aircraft_Location: {
        type: String,
        default: null
    },
    // property facts  
    price: {
        type: String,
        default: null
    },
    // General
    Aircraft_type: {
        type: String,
        default: 'Jets & Aircraft'
    },
    Aircraft_subtype: {
        type: String,
        default: null
    },
    Manufacturer: {
        type: String,
        default: null
    },
    Model: {
        type: String,
        default: null
    },
    Serial_Number: {
        type: String,
        default: null
    },
    Registration: {
        type: String,
        default: null
    },
    Total_Time: {
        type: String,
        default: null
    },
    Based_at: {
        type: String,
        default: null
    },
    Condition: {
        type: String,
        default: null
    },
    FlightRules: {
        type: String,
        default: null
    },
    Number_of_Seats: {
        type: String,
        default: null
    },
    // Airframe
    Airframe_Notes: {
        type: String,
        default: null
    },
    Total_Landings: {
        type: String,
        default: null
    },
    Complete_Logs: {
        type: String,
        default: null
    },
    Max_Takeoff_Weight: {
        type: String,
        default: null
    },
    Useful_Load: {
        type: String,
        default: null
    },
    Fuel_Capacity_Volume: {
        type: String,
        default: null
    },
    // Engine 1  
    Engine1_Notes: {
        type: String,
        default: null
    },
    Engine1_Serial_Number: {
        type: String,
        default: null
    },
    Engine1_Make_Model: {
        type: String,
        default: null
    },
    Engine1_Time: {
        type: String,
        default: null
    },
    E1_Hot_Section_Time1: {
        type: String,
        default: null
    },
    // Engine 2 
    Engine2_Notes: {
        type: String,
        default: null
    },
    Engine2_Serial_Number: {
        type: String,
        default: null
    },
    Engine2_Make_Model: {
        type: String,
        default: null
    },
    Engine2_Time: {
        type: String,
        default: null
    },
    E2_Hot_Section_Time1: {
        type: String,
        default: null
    },
    // Engine Program
    Engine_Maintenance_Program: {
        type: String,
        default: null
    },
    Airframe_Notes: {
        type: String,
        default: null
    },
    // Props
    Prop1_Manufacturer: {
        type: String,
        default: null
    },
    Prop2_Manufacturer: {
        type: String,
        default: null
    },
    Number_of_Blades: {
        type: String,
        default: null
    },
    Prop_Notes: {
        type: String,
        default: null
    },
    Prop1_Overhaul_Time: {
        type: String,
        default: null
    },
    Prop1_Model: {
        type: String,
        default: null
    },
    Prop2_Overhaul_Time: {
        type: String,
        default: null
    },
    Prop2_Model: {
        type: String,
        default: null
    },
    // Avionics 
    // ADS-B Equipped
    Avionics_Packaging: {
        type: String,
        default: null
    },
    ADSB_Equipped: {
        type: String,
        default: null
    },
    WAAS: {
        type: String,
        default: null
    },
    LPV: {
        type: String,
        default: null
    },
    SVT: {
        type: String,
        default: null
    },
    // Avionics/Radios
    Avionics_Radios: {
        type: String,
        default: null
    },
    // Additional Equipment
    Additional_Equipment: {
        type: String,
        default: null
    },
    Known_Ice: {
        type: String,
        default: null
    },
    // Exterior
    Year_Painted: {
        type: String,
        default: null
    },
    Exterior_Notes: {
        type: String,
        default: null
    },
    // Interior
    Interior_Notes: {
        type: String,
        default: null
    },
    Year_Interior: {
        type: String,
        default: null
    },
    Configuration: {
        type: String,
        default: null
    },
    Lavatory: {
        type: String,
        default: null
    },
    Lavatory_Configuration: {
        type: String,
        default: null
    },

    // Modifications/Conversions
    Modifications: {
        type: String,
        default: null
    },
    // Inspection Status
    Inspection_Status: {
        type: String,
        default: null
    },
    Airworthy: {
        type: String,
        default: null
    },
    // 
    Insurance: {
        type: String,
        default: null
    },
    Operating_Costs: {
        type: String,
        default: null
    },
    Financing: {
        type: String,
        default: null
    },

    // new fields added
    Year: {
        type: String,
        default: null
    },
    Role: {
        type: String,
        default: null
    },
    First_flight: {
        type: String,
        default: null
    },
    Number_built: {
        type: String,
        default: null
    },
    Specifications: {
        type: String,
        default: null
    },
    Technical_Specifications: {
        type: String,
        default: null
    },
    Capacity: {
        type: String,
        default: null
    },
    Mass_Empty: {
        type: String,
        default: null
    },
    Maximum_Take_Off_Weight: {
        type: String,
        default: null
    },
    Maximum_baggage_load: {
        type: String,
        default: null
    },
    Fuel_type: {
        type: String,
        default: null
    },
    Fuel_capacity: {
        type: String,
        default: null
    },
    Drive_mode: {
        type: String,
        default: null
    },
    Max_speed: {
        type: String,
        default: null
    },
    Top_speed_acceleration: {
        type: String,
        default: null
    },
    Engine_power: {
        type: String,
        default: null
    },
    Dimensions: {
        type: String,
        default: null
    },
    Range: {
        type: String,
        default: null
    },
    Range_flight:{
        type: String,
        default: null
    },
    Flight_mode: {
        type: String,
        default: null
    },
    Economic_cruise_speed: {
        type: String,
        default: null
    },
    Rotor_diameter: {
        type: String,
        default: null
    },
    Maximum_altitude: {
        type: String,
        default: null
    },
    Take_off_distance: {
        type: String,
        default: null
    },
    Landing_rol_distance: {
        type: String,
        default: null
    },
    Seats: {
        type: String,
        default: null
    },
    Airframe: {
        type: String,
        default: null
    },
    Engine_2: {
        type: String,
        default: null
    },
    Engine_Program: {
        type: String,
        default: null
    },
    Props: {
        type: String,
        default: null
    },
    Avionics: {
        type: String,
        default: null
    },
    Exterior: {
        type: String,
        default: null
    },
    Interior: {
        type: String,
        default: null
    },
    Modifications_Conversions : {
        type: String,
        default: null
    },
    Aircraft_Highlights : {
        type: String,
        default: null
    },
    Registration_number : {
        type: String,
        default: null
    },
    No_Seats : {
        type: String,
        default: null
    },
    Engine_Notes : {
        type: String,
        default: null
    },
    Hot_Section_Time : {
        type: String,
        default: null
    },
    Engine_Time : {
        type: String,
        default: null
    },
    Cycles_TBO : {
        type: String,
        default: null
    },
    Make_Model : {
        type: String,
        default: null
    },
    Flight_Deck_Model: {
        type: String,
        default: null
    },
    Flight_Deck_Manufacturer: {
        type: String,
        default: null
    },
    ADS_B_Equipped: {
        type: String,
        default: null
    },
    Galley: {
        type: String,
        default: null
    },
    Galley_Configuration: {
        type: String,
        default: null
    },
    Flight_Ready: {
        type: String,
        default: null
    },
    Service_Logs: {
        type: String,
        default: null
    },
    Brochure: {
        type: String,
        default: null
    },
    Engines: {
        type: String,
        default: null
    },
    Time: {
        type: String,
        default: null
    },
    Auxiliary_Power_Unit: {
        type: String,
        default: null
    },
    APU_Time: {
        type: String,
        default: null
    },
    APU_Maintenance_Program: {
        type: String,
        default: null
    },
    APU_Notes: {
        type: String,
        default: null
    },
    Engine_1: {
        type: String,
        default: null
    },
    Fuselage_length: {
        type: String,
        default: null
    },
    Overall_height: {
        type: String,
        default: null
    },
    Wingspan: {
        type: String,
        default: null
    },
    Tip_to_tip_distance: {
        type: String,
        default: null
    },
    Empty_weight: {
        type: String,
        default: null
    },
    Max_gross_takeoff_wt: {
        type: String,
        default: null
    },
    cruise_speed: {
        type: String,
        default: null
    },
    Lift_Propulsors: {
        type: String,
        default: null
    },
    Motor_output: {
        type: String,
        default: null
    },
    Power_type: {
        type: String,
        default: null
    },
    Passenger_capacity: {
        type: String,
        default: null
    },
    Address: {
        type: String,
        default: null
    },
    No_Blades: {
        type: String,
        default: null
    },
    Manufacturer_Model: {
        type: String,
        default: null
    },
    Overhaul_Time: {
        type: String,
        default: null
    },
    Dimension_flight_lwh: {
        type: String,
        default: null
    },
    Maximum_Speed_flightmode: {
        type: String,
        default: null
    },
    Engine_Power_flightmode: {
        type: String,
        default: null
    },
    Flying_Cars_Status: {
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
Aircraft_sale.index({
    "Tittle_Name": "text",
    "Description": "text",
    "address_line1": "text",
    "address_line2": "text",
    "city": "text",
    "state": "text",
    "country": "text",
    "landmark": "text",
    "Aircraft_Location": "text",
    "Aircraft_subtype": "text"
});
module.exports = mongoose.model('Aircraft_sale', Aircraft_sale);