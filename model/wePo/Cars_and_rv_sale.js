var mongoose = require("mongoose");

const Cars_and_rv_sale = mongoose.Schema({
    name: {
        type: String,
        default: 'Cars & RVs'
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
    Cars_Rv_type : {
        type: String,
        required: true
    },
    Cars_Rv_subtype: {
        type: String,
        required: true
    },

    //new fields added

    Body_type: {
        type: String,
        default: null
    },
    Type_of_fuel: {
        type: String,
        default: null
    },
    Search_by_brand: {
        type: String,
        default: null
    },
    Search_by_model: {
        type: String,
        default: null
    },
    KILOMETERS_DRIVEN: {
        type: String,
        default: null
    },
    REGISTERED_LOCATION: {
        type: String,
        default: null
    },
    transmission: {
        type: String,
        default: null
    },
    OWNER_TYPE: {
        type: String,
        default: null
    },
    COLORS: {
        type: String,
        default: null
    },
    Top_Specs_Features: {
        type: String,
        default: null
    },
    Max_Power: {
        type: String,
        default: null
    },
    Mileage: {
        type: String,
        default: null
    },
    Torque: {
        type: String,
        default: null
    },
    Wheel_Size: {
        type: String,
        default: null
    },
    Seating_Capacity: {
        type: String,
        default: null
    },
    year_built: {
        type: String,
        default: null
    },
    year_purchased: {
        type: String,
        default: null
    },
    Gear_Box: {
        type: String,
        default: null
    },
    Drive_Type: {
        type: String,
        default: null
    },
    Steering_Type: {
        type: String,
        default: null
    },
    Turning_Radius: {
        type: String,
        default: null
    },
    Front_Brake_Type: {
        type: String,
        default: null
    },
    Rear_Brake_Type: {
        type: String,
        default: null
    },
    Top_Speed: {
        type: String,
        default: null
    },
    Acceleration: {
        type: String,
        default: null
    },
    Tyre_Type: {
        type: String,
        default: null
    },
    No_of_doors: {
        type: String,
        default: null
    },
    Engine_Type: {
        type: String,
        default: null
    },
    Displacement: {
        type: String,
        default: null
    },
    No_Of_Cylinder: {
        type: String,
        default: null
    },
    Valves_Per_Cylinder: {
        type: String,
        default: null
    },
    Valve_Configuration: {
        type: String,
        default: null
    },
    Fuel_Supply_System: {
        type: String,
        default: null
    },
    Turbo_Charger: {
        type: String,
        default: null
    },
    superCharger: {
        type: String,
        default: null
    },
    Front_Tread: {
        type: String,
        default: null
    },
    Wheel_Base: {
        type: String,
        default: null
    },
    Rear_Tread: {
        type: String,
        default: null
    },
    Kerb_Weight: {
        type: String,
        default: null
    },
    Gross_Weight: {
        type: String,
        default: null
    },
    Rear_Head_Room: {
        type: String,
        default: null
    },
    Front_Head_Room: {
        type: String,
        default: null
    },
    Height: {
        type: String,
        default: null
    },
    Length: {
        type: String,
        default: null
    },
    Width: {
        type: String,
        default: null
    },
    Ground_Clearance_Unladen: {
        type: String,
        default: null
    },
    DRIVETRAIN: {
        type: String,
        default: null
    },
    FUEL_EFFICIENCY: {
        type: String,
        default: null
    },
    Tires: {
        type: String,
        default: null
    },
    Body_color: {
        type: String,
        default: null
    },
    HVAC: {
        type: String,
        default: null
    },
    Engine: {
        type: String,
        default: null
    },
    GVWR: {
        type: String,
        default: null
    },
    Base_Curb_Weight: {
        type: String,
        default: null
    },
    Trans_Type: {
        type: String,
        default: null
    },
    A_T: {
        type: String,
        default: null
    },
    RV_CLASS: {
        type: String,
        default: null
    },
    DRY_WEIGHT: {
        type: String,
        default: null
    },
    SLEEPS: {
        type: String,
        default: null
    },
    SLIDE_OUTS: {
        type: String,
        default: null
    },
    INTERIOR: {
        type: String,
        default: null
    },
    Fireplace: {
        type: String,
        default: null
    },
    Black_Tank_Flush: {
        type: String,
        default: null
    },
    EXTERIOR: {
        type: String,
        default: null
    },
    Outside_Shower: {
        type: String,
        default: null
    },
    pass_through_storage: {
        type: String,
        default: null
    },
    storage_facility: {
        type: String,
        default: null
    },
    kitchen_facility: {
        type: String,
        default: null
    },
    bedroom_facility: {
        type: String,
        default: null
    },
    Max_Dry_Weight: {
        type: String,
        default: null
    },
    make_model: {
        type: String,
        default: null
    },
    Features: {
        type: String,
        default: null
    },
    Seaters: {
        type: String,
        default: null
    },
    Coach: {
        type: String,
        default: null
    },
    Condition: {
        type: String,
        default: null
    },
    Seller_Type: {
        type: String,
        default: null
    },
    LOCATION_RADIUS: {
        type: String,
        default: null
    },
    VEHICLE_TYPE: {
        type: String,
        default: null
    },
    VEHICLE_CONDITION: {
        type: String,
        default: null
    },
    ASKING_PRICE: {
        type: String,
        default: null
    },
    Wheelbase: {
        type: String,
        default: null
    },
    BEV_PERFORMANCE: {
        type: String,
        default: null
    },
    Horsepower: {
        type: String,
        default: null
    },
    MPGe: {
        type: String,
        default: null
    },
    CHARGING: {
        type: String,
        default: null
    },
    Electric_Range: {
        type: String,
        default: null
    },
    Battery_size: {
        type: String,
        default: null
    },
    Cost_to_charge_full: {
        type: String,
        default: null
    },
    Monthly_charge_cost: {
        type: String,
        default: null
    },
    Full_charge_in: {
        type: String,
        default: null
    },
    Truck_Type: {
        type: String,
        default: null
    },
    Engine_Make: {
        type: String,
        default: null
    },
    Engine_Model: {
        type: String,
        default: null
    },
    Engine_HP: {
        type: String,
        default: null
    },
    Trans_Make: {
        type: String,
        default: null
    },
    Trans_Model: {
        type: String,
        default: null
    },
    Suspension_Type: {
        type: String,
        default: null
    },
    Axle_Configuration: {
        type: String,
        default: null
    },
    FA_Capacity: {
        type: String,
        default: null
    },
    RA_Capacity: {
        type: String,
        default: null
    },
    Rear_End_Ratio: {
        type: String,
        default: null
    },
    Front_Wheels: {
        type: String,
        default: null
    },
    Rear_Wheels: {
        type: String,
        default: null
    },
    Engine_Brake: {
        type: String,
        default: null
    },
    Under_CDL: {
        type: String,
        default: null
    },
    Serial_No: {
        type: String,
        default: null
    },
    Odometer: {
        type: String,
        default: null
    },
    YEAR_OEM_BUILT: {
        type: String,
        default: null
    },
    BODY_STYLE: {
        type: String,
        default: null
    },
    COACH_BUILDER: {
        type: String,
        default: null
    },
    VEHICLE_PRIMARY_USE: {
        type: String,
        default: null
    },
    VIN: {
        type: String,
        default: null
    },
    Safety_Features: {
        type: String,
        default: null
    },
    Vehicle_Premiums: {
        type: String,
        default: null
    },
    Driver_Comfort: {
        type: String,
        default: null
    },
    Passenger_Comfort: {
        type: String,
        default: null
    },
    alloy_wheel_size: {
        type: String,
        default: null
    },
    cargo_volume: {
        type: String,
        default: null
    },
    max_torque: {
        type: String,
        default: null
    },
    Year_Coach_Build: {
        type: String,
        default: null
    },


    // added new fields again
    Model: {
        type: String,
        default: null
    },
    Fuel_Type: {
        type: String,
        default: null
    },
    Exterior_Color: {
        type: String,
        default: null
    },
    Interior_Color: {
        type: String,
        default: null
    },
    Engine_Size: {
        type: String,
        default: null
    },
    Transmission_Type: {
        type: String,
        default: null
    },
    Maintenance_History: {
        type: String,
        default: null
    },
    Accident_History: {
        type: String,
        default: null
    },
    Exterior_Features: {
        type: String,
        default: null
    },
    Interior_Features: {
        type: String,
        default: null
    },
    Mechanical_Features: {
        type: String,
        default: null
    },
    Technological_Features: {
        type: String,
        default: null
    },
    VIN_Number: {
        type: String,
        default: null
    },
    No_Owners: {
        type: String,
        default: null
    },
    Original_Warranty: {
        type: String,
        default: null
    },
    Cars_Location: {
        type: String,
        default: null
    },
    Gross_Vehicle_Weight: {
        type: String,
        default: null
    },
    Sleeping_Capacity: {
        type: String,
        default: null
    },
    Sleep_Options: {
        type: String,
        default: null
    },
    Awnings: {
        type: String,
        default: null
    },
    Leveling_Jacks: {
        type: String,
        default: null
    },
    Air_Conditioners: {
        type: String,
        default: null
    },
    Water_Capacity: {
        type: String,
        default: null
    },
    Self_Contained: {
        type: String,
        default: null
    },
    Vehicle_Location: {
        type: String,
        default: null
    },
    Chasis_Make: {
        type: String,
        default: null
    },
    Chasis_Model: {
        type: String,
        default: null
    },
    Number_of_Passengers: {
        type: String,
        default: null
    },
    Seating_Style: {
        type: String,
        default: null
    },
    Wheelchair_Lift: {
        type: String,
        default: null
    },
    Wheelchair_Positions: {
        type: String,
        default: null
    },
    Luggage_Type: {
        type: String,
        default: null
    },
    Television: {
        type: String,
        default: null
    },
    Installed_Options: {
        type: String,
        default: null
    },
    Mile_Range: {
        type: String,
        default: null
    },
    Bed_Length: {
        type: String,
        default: null
    },
    Towing_Capacity: {
        type: String,
        default: null
    },
    Body_Make: {
        type: String,
        default: null
    },
    Body_Model: {
        type: String,
        default: null
    },
    Customer_Capacity: {
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

Cars_and_rv_sale.index({
    "Tittle_Name": "text",
    "Description": "text",
    "address_line1": "text",
    "address_line2": "text",
    "city": "text",
    "state": "text",
    "country": "text",
    "landmark": "text",
    "Cars_Rv_type": "text",
    "Cars_Rv_subtype": "text"
});
module.exports = mongoose.model('Cars_and_rv_sale', Cars_and_rv_sale);