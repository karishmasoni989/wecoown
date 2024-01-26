import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../../service/country-state-city.service';

@Component({
  selector: 'app-cars-sale',
  templateUrl: './cars-sale.component.html',
  styleUrls: ['./cars-sale.component.css']
})
export class CarsSaleComponent implements OnInit {

  createPostingForm: FormGroup;
  selectedItemsList = [];
  checkedIDs = [];
  propertyIdd: any;
  usernamePre: any;
  // loading: boolean;
  FinalArray: any;
  ImgArray: [];
  // fileOver: boolean;
  @HostBinding('class.fileover') fileOver: boolean;
  //fileDropped: any;
  @Output() fileDropped = new EventEmitter<any>();
  files: any[] = [];
  pdfFileUploadd: any[] = [];
  getAllCountry: any;
  getAllCities: Object;
  getAllStates: Object;
  loading = false;
  getParamsId: string;
  getParamsName: string;
  getData: any;
  getPhtosALL: any;
  links: any;
  Description: any;
  address_line1: any;
  address_line2: any;
  city: any;
  state: any;
  country: any;
  zipcode: any;
  landmark: any;
  purpose: string;
  getCurrentSerialNumber: any;
  subpropertyType: any;
  Form_Serial_Number: any;
  Tittle_Name: any;
  selling_price: any;
  prevuiousPdf: any;
  Year: any;
  Cars_Rv_subtype: string;
  Cars_Rv_type: string;
  price: any;
  Body_type: any;
  Type_of_fuel: any;
  Search_by_brand: any;
  Search_by_model: any;
  KILOMETERS_DRIVEN: any;
  REGISTERED_LOCATION: any;
  transmission: any;
  OWNER_TYPE: any;
  COLORS: any;
  Top_Specs_Features: any;
  Max_Power: any;
  Mileage: any;
  Torque: any;
  Wheel_Size: any;
  Seating_Capacity: any;
  year_built: any;
  year_purchased: any;
  Gear_Box: any;
  Drive_Type: any;
  Steering_Type: any;
  Turning_Radius: any;
  Front_Brake_Type: any;
  Rear_Brake_Type: any;
  Top_Speed: any;
  Acceleration: any;
  Tyre_Type: any;
  No_of_doors: any;
  Engine_Type: any;
  Displacement: any;
  No_Of_Cylinder: any;
  Valves_Per_Cylinder: any;
  Valve_Configuration: any;
  Fuel_Supply_System: any;
  Turbo_Charger: any;
  superCharger: any;
  Front_Tread: any;
  Wheel_Base: any;
  Rear_Tread: any;
  Kerb_Weight: any;
  Gross_Weight: any;
  Rear_Head_Room: any;
  Front_Head_Room: any;
  Height: any;
  Length: any;
  Width: any;
  Ground_Clearance_Unladen: any;
  DRIVETRAIN: any;
  FUEL_EFFICIENCY: any;
  Tires: any;
  Body_color: any;
  HVAC: any;
  Engine: any;
  GVWR: any;
  Base_Curb_Weight: any;
  Trans_Type: any;
  A_T: any;
  RV_CLASS: any;
  DRY_WEIGHT: any;
  SLEEPS: any;
  SLIDE_OUTS: any;
  Outside_Shower: any;
  Fireplace: any;
  Black_Tank_Flush: any;
  pass_through_storage: any;
  storage_facility: any;
  kitchen_facility: any;
  bedroom_facility: any;
  Max_Dry_Weight: any;
  make_model: any;
  Features: any;
  Seaters: any;
  Coach: any;
  Condition: any;
  Seller_Type: any;
  LOCATION_RADIUS: any;
  VEHICLE_TYPE: any;
  VEHICLE_CONDITION: any;
  ASKING_PRICE: any;
  Wheelbase: any;
  BEV_PERFORMANCE: any;
  Horsepower: any;
  MPGe: any;
  CHARGING: any;
  Electric_Range: any;
  Battery_size: any;
  Cost_to_charge_full: any;
  Monthly_charge_cost: any;
  Full_charge_in: any;
  Truck_Type: any;
  Engine_Make: any;
  Engine_Model: any;
  Engine_HP: any;
  Trans_Make: any;
  Trans_Model: any;
  Suspension_Type: any;
  Axle_Configuration: any;
  FA_Capacity: any;
  RA_Capacity: any;
  Rear_End_Ratio: any;
  Front_Wheels: any;
  Rear_Wheels: any;
  Engine_Brake: any;
  Under_CDL: any;
  Serial_No: any;
  Odometer: any;
  YEAR_OEM_BUILT: any;
  BODY_STYLE: any;
  COACH_BUILDER: any;
  VEHICLE_PRIMARY_USE: any;
  VIN: any;
  Safety_Features: any;
  Vehicle_Premiums: any;
  Driver_Comfort: any;
  Passenger_Comfort: any;
  alloy_wheel_size: any;
  cargo_volume: any;
  max_torque: any;
  Year_Coach_Build: any;
  fractional_share_choice_percentage_or_unit: string;
  fractional_share_text_percentage_or_unit: any;
  offering_Price_fractional_ownership: any;
  Model: any;
  Fuel_Type: any;
  Exterior_Color: any;
  Interior_Color: any;
  Engine_Size: any;
  Transmission_Type: any;
  Maintenance_History: any;
  Accident_History: any;
  Exterior_Features: any;
  Interior_Features: any;
  Mechanical_Features: any;
  Technological_Features: any;
  VIN_Number: any;
  No_Owners: any;
  Original_Warranty: any;
  Cars_Location: any;
  Gross_Vehicle_Weight: any;
  Sleeping_Capacity: any;
  Sleep_Options: any;
  Awnings: any;
  Leveling_Jacks: any;
  Air_Conditioners: any;
  Water_Capacity: any;
  Self_Contained: any;
  Vehicle_Location: any;
  Chasis_Make: any;
  Chasis_Model: any;
  Number_of_Passengers: any;
  Seating_Style: any;
  Wheelchair_Lift: any;
  Wheelchair_Positions: any;
  Luggage_Type: any;
  Television: any;
  Installed_Options: any;
  Mile_Range: any;
  Bed_Length: any;
  Towing_Capacity: any;
  Body_Make: any;
  Body_Model: any;
  Customer_Capacity: any;

  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    public CountryStateCityService: CountryStateCityService,
    private activatedRoute: ActivatedRoute
  ) { }
  ionViewWillEnter() {
    this.getRealEstateCount();
    $("#all-sub-category").prop("disabled", false);
  }

  ngOnInit() {
    //$('.general').hide();
    $('.commuterCarsSUVs').hide();
    $('.campersRVs').hide();
    $('.commercialBuses').hide();
    $('.eVsHybrids').hide();
    $('.trucks').hide();
    $('.vansLimos').hide();
    $('.luxuryCarsSUVs').hide();
    this.country = "";
    this.state = "";
    this.city = "";
    this.Cars_Rv_subtype = "";
    this.purpose = "";
    this.Cars_Rv_type = "Cars & RVs";
    this.fractional_share_choice_percentage_or_unit = "";
    this.getParamsId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.getParamsName = this.activatedRoute.snapshot.queryParamMap.get('name');
    this.checkmembership();
    this.getRealEstateCount();
    this.getPropertyType();
    this.getDataPostById();
    this.createPostingForm = new FormGroup({
      Description: new FormControl(''),
      links: new FormControl(''),
      purpose: new FormControl(''),
      Tittle_Name: new FormControl(''),
      address_line1: new FormControl('', [Validators.required]),
      address_line2: new FormControl(''),
      selling_price: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      zipcode: new FormControl(''),
      landmark: new FormControl(''),
      price: new FormControl(''),
      Cars_Rv_type: new FormControl(''),
      Cars_Rv_subtype: new FormControl(''),
      Form_Serial_Number: new FormControl(''),
      
      //new fields added
      Body_type: new FormControl(''),
      Type_of_fuel: new FormControl(''),
      Search_by_brand: new FormControl(''),
      Search_by_model: new FormControl(''),
      KILOMETERS_DRIVEN: new FormControl(''),
      REGISTERED_LOCATION: new FormControl(''),
      transmission: new FormControl(''),
      OWNER_TYPE: new FormControl(''),
      COLORS: new FormControl(''),
      Top_Specs_Features: new FormControl(''),
      Max_Power: new FormControl(''),
      Mileage: new FormControl(''),
      Torque: new FormControl(''),
      Wheel_Size: new FormControl(''),
      Seating_Capacity: new FormControl(''),
      year_built: new FormControl(''),
      year_purchased: new FormControl(''),
      Gear_Box: new FormControl(''),
      Drive_Type: new FormControl(''),
      Steering_Type: new FormControl(''),
      Turning_Radius: new FormControl(''),
      Front_Brake_Type: new FormControl(''),
      Rear_Brake_Type: new FormControl(''),
      Top_Speed: new FormControl(''),
      Acceleration: new FormControl(''),
      Tyre_Type: new FormControl(''),
      No_of_doors: new FormControl(''),
      Engine_Type: new FormControl(''),
      Displacement: new FormControl(''),
      No_Of_Cylinder: new FormControl(''),
      Valves_Per_Cylinder: new FormControl(''),
      Valve_Configuration: new FormControl(''),
      Fuel_Supply_System: new FormControl(''),
      Turbo_Charger: new FormControl(''),
      superCharger: new FormControl(''),
      Front_Tread: new FormControl(''),
      Wheel_Base: new FormControl(''),
      Rear_Tread: new FormControl(''),
      Kerb_Weight: new FormControl(''),
      Gross_Weight: new FormControl(''),
      Rear_Head_Room: new FormControl(''),
      Front_Head_Room: new FormControl(''),
      Height: new FormControl(''),
      Length: new FormControl(''),
      Width: new FormControl(''),
      Ground_Clearance_Unladen: new FormControl(''),
      DRIVETRAIN: new FormControl(''),
      FUEL_EFFICIENCY: new FormControl(''),
      Tires: new FormControl(''),
      Body_color: new FormControl(''),
      HVAC: new FormControl(''),
      Engine: new FormControl(''),
      GVWR: new FormControl(''),
      Base_Curb_Weight: new FormControl(''),
      Trans_Type: new FormControl(''),
      A_T: new FormControl(''),
      RV_CLASS: new FormControl(''),
      DRY_WEIGHT: new FormControl(''),
      SLEEPS: new FormControl(''),
      SLIDE_OUTS: new FormControl(''),
      Outside_Shower: new FormControl(''),
      Fireplace: new FormControl(''),
      Black_Tank_Flush: new FormControl(''),
      pass_through_storage: new FormControl(''),
      storage_facility: new FormControl(''),
      kitchen_facility: new FormControl(''),
      bedroom_facility: new FormControl(''),
      Max_Dry_Weight: new FormControl(''),
      make_model: new FormControl(''),
      Features: new FormControl(''),
      Seaters: new FormControl(''),
      Coach: new FormControl(''),
      Condition: new FormControl(''),
      Seller_Type: new FormControl(''),
      LOCATION_RADIUS: new FormControl(''),
      VEHICLE_TYPE: new FormControl(''),
      VEHICLE_CONDITION: new FormControl(''),
      ASKING_PRICE: new FormControl(''),
      Wheelbase: new FormControl(''),
      BEV_PERFORMANCE: new FormControl(''),
      Horsepower: new FormControl(''),
      MPGe: new FormControl(''),
      CHARGING: new FormControl(''),
      Electric_Range: new FormControl(''),
      Battery_size: new FormControl(''),
      Cost_to_charge_full: new FormControl(''),
      Monthly_charge_cost: new FormControl(''),
      Full_charge_in: new FormControl(''),
      Truck_Type: new FormControl(''),
      Engine_Make: new FormControl(''),
      Engine_Model: new FormControl(''),
      Engine_HP: new FormControl(''),
      Trans_Make: new FormControl(''),
      Trans_Model: new FormControl(''),
      Suspension_Type: new FormControl(''),
      Axle_Configuration: new FormControl(''),
      FA_Capacity: new FormControl(''),
      RA_Capacity: new FormControl(''),
      Rear_End_Ratio: new FormControl(''),
      Front_Wheels: new FormControl(''),
      Rear_Wheels: new FormControl(''),
      Engine_Brake: new FormControl(''),
      Under_CDL: new FormControl(''),
      Serial_No: new FormControl(''),
      Odometer: new FormControl(''),
      YEAR_OEM_BUILT: new FormControl(''),
      BODY_STYLE: new FormControl(''),
      COACH_BUILDER: new FormControl(''),
      VEHICLE_PRIMARY_USE: new FormControl(''),
      VIN: new FormControl(''),
      Safety_Features: new FormControl(''),
      Vehicle_Premiums: new FormControl(''),
      Driver_Comfort: new FormControl(''),
      Passenger_Comfort: new FormControl(''),
      alloy_wheel_size: new FormControl(''),
      cargo_volume: new FormControl(''),
      max_torque: new FormControl(''),
      Year_Coach_Build: new FormControl(''),
      fractional_share_choice_percentage_or_unit: new FormControl(''),
      fractional_share_text_percentage_or_unit: new FormControl(''),
      offering_Price_fractional_ownership: new FormControl(''),

      Model: new FormControl(''),
      Fuel_Type: new FormControl(''),
      Exterior_Color: new FormControl(''),
      Interior_Color: new FormControl(''),
      Engine_Size: new FormControl(''),
      Transmission_Type: new FormControl(''),
      Maintenance_History: new FormControl(''),
      Accident_History: new FormControl(''),
      Exterior_Features: new FormControl(''),
      Interior_Features: new FormControl(''),
      Mechanical_Features: new FormControl(''),
      Technological_Features: new FormControl(''),
      VIN_Number: new FormControl(''),
      No_Owners: new FormControl(''),
      Original_Warranty: new FormControl(''),
      Cars_Location: new FormControl(''),
      Gross_Vehicle_Weight: new FormControl(''),
      Sleeping_Capacity: new FormControl(''),
      Sleep_Options: new FormControl(''),
      Awnings: new FormControl(''),
      Leveling_Jacks: new FormControl(''),
      Air_Conditioners: new FormControl(''),
      Water_Capacity: new FormControl(''),
      Self_Contained: new FormControl(''),
      Vehicle_Location: new FormControl(''),
      Chasis_Make: new FormControl(''),
      Chasis_Model: new FormControl(''),
      Number_of_Passengers: new FormControl(''),
      Seating_Style: new FormControl(''),
      Wheelchair_Lift: new FormControl(''),
      Wheelchair_Positions: new FormControl(''),
      Luggage_Type: new FormControl(''),
      Television: new FormControl(''),
      Installed_Options: new FormControl(''),
      Mile_Range: new FormControl(''),
      Bed_Length: new FormControl(''),
      Towing_Capacity: new FormControl(''),
      Body_Make: new FormControl(''),
      Body_Model: new FormControl(''),
      Customer_Capacity: new FormControl(''),

    });
    // for country state city
    this.getAllCountrydataFromWecoownServer()
    // let checkAUTT = localStorage.getItem("CountryAuthToken");
    // let checkCountryy = localStorage.getItem("AllCountries");
    // if (checkAUTT != null) {
    //   if (checkCountryy != null) {
    //     this.getAllCountry = JSON.parse(checkCountryy);
    //     let getIndex = this.findArrayIndex(this.getAllCountry, 'country_name', 'United States');
    //     this.array_move(this.getAllCountry, getIndex, 0)
    //   }
    //   else {
    //     this.getAllCountryData();
    //   }
    // } else {
    //   this.getCountryAuthh();
    // }
    /* start enter button trigger*/
    // $(".CheckForm").keypress(function (e) {
    //   if (e.which === 13) {
    //     $('#formSubmit').trigger('click');
    //   }
    // });
    /* end enter button trigger*/
  }

  getAllCountrydataFromWecoownServer() {
    this.UserService.GetAllCountryData().subscribe(result => {
      //console.log("result of get allllllllllllllllll country: ", result);
      if (result['success'] == true) {
        this.getAllCountry = result['countryData'];
      }
    })
  }
  changeCoutry(country_code) {
    let splitCountryName = country_code.split('||');
    let dataForm = {
      country_code: splitCountryName[0]
    }
    this.UserService.GetAllStateData(dataForm).subscribe(result => {
      //console.log("result of get allllllllllllllllll states: ", result);
      if (result['success'] == true) {
        this.getAllStates = result['stateData'];
      }
    })
  }
  changeState(mergeName) {
    //console.log("mergeName :", mergeName);
    //     this.getAllCities = result111
    let splitCountryState = mergeName.split('||');
    let dataForm = {
      country_code: splitCountryState[0],
      region_iso_code: splitCountryState[1]
    }
    //console.log("dataForm :", dataForm);
    this.UserService.getAllCityData(dataForm).subscribe(result => {
      //console.log("result of get allllllllllllllllll cities: ", result);
      if (result['success'] == true) {
        this.getAllCities = result['cityData'];
      }
    })
  }

  checkmembership() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.loading = true;
      let dataFormm = {
        user_id: parseData['id']
      }
      this.UserService.checkUserMembership(dataFormm).subscribe(result => {
        this.loading = false;
        // //console.log("result of add membership: ", result);
        if (result['success'] == true) {
          if (result['getdata']) {
            $('.fractional_share_box').show();
          } else {
            $('.fractional_share_box').hide();
          }
        } else if (result['success'] == false) {
          $('.fractional_share_box').hide();
        }
      });
    }
  }

  getSelectedFractionalShare(item) {
    if (item != "") {
      $('.fractional_text_label').html("Fractional Share " + item + " :");
      $('.fractional_text_input').attr("placeholder", "Fractional Share " + item);
      $('.fractional_text').show();
    } else {
      $('.fractional_text').hide();
    }
  }

  getRealEstateCount() {
    this.loading = true;
    this.UserService.getCarsRVAllCount().subscribe(result => {
      this.loading = false;
      let getStr1 = JSON.stringify(10001);
      if (result['count'] == undefined) {
        this.getCurrentSerialNumber = JSON.parse(getStr1);
      } else {
        this.getCurrentSerialNumber = (10001 + result['count']);
      }
    });
  }

    // for get selected sub categories
    changeSubCategory(item) {
      //$('.general').show();
      if (item == "Luxury Cars & SUVs") {
        $('.commuterCarsSUVs').hide();
        $('.campersRVs').hide();
        $('.commercialBuses').hide();
        $('.eVsHybrids').hide();
        $('.trucks').hide();
        $('.vansLimos').hide();
        $('.luxuryCarsSUVs').show();
      } else if (item == "Commuter Cars & SUVs") {
        $('.luxuryCarsSUVs').hide();
        $('.campersRVs').hide();
        $('.commercialBuses').hide();
        $('.eVsHybrids').hide();
        $('.trucks').hide();
        $('.vansLimos').hide();
        $('.commuterCarsSUVs').show();
      } else if (item == "Campers & RVs") {
        $('.commuterCarsSUVs').hide();
        $('.luxuryCarsSUVs').hide();
        $('.commercialBuses').hide();
        $('.eVsHybrids').hide();
        $('.trucks').hide();
        $('.vansLimos').hide();
        $('.campersRVs').show();
      } else if (item == "Commercial Buses") {
        $('.commuterCarsSUVs').hide();
        $('.campersRVs').hide();
        $('.luxuryCarsSUVs').hide();
        $('.eVsHybrids').hide();
        $('.trucks').hide();
        $('.vansLimos').hide();
        $('.commercialBuses').show();
      } else if (item == "EVs & Hybrids") {
        $('.commuterCarsSUVs').hide();
        $('.campersRVs').hide();
        $('.commercialBuses').hide();
        $('.luxuryCarsSUVs').hide();
        $('.trucks').hide();
        $('.vansLimos').hide();
        $('.eVsHybrids').show();
      } else if (item == "Trucks") {
        $('.commuterCarsSUVs').hide();
        $('.campersRVs').hide();
        $('.commercialBuses').hide();
        $('.eVsHybrids').hide();
        $('.luxuryCarsSUVs').hide();
        $('.vansLimos').hide();
        $('.trucks').show();
      } else if (item == "Vans & Limos") {
        $('.commuterCarsSUVs').hide();
        $('.campersRVs').hide();
        $('.commercialBuses').hide();
        $('.eVsHybrids').hide();
        $('.trucks').hide();
        $('.luxuryCarsSUVs').hide();
        $('.vansLimos').show();
      }
    }

  // for select purpose
  changePurpose(val) {
    if (val === 'For Sale') {
      $('.fieldsForSale').show();
      $('.fieldsForLease').hide();
    } else if (val === 'For Lease') {
      $('.fieldsForSale').hide();
      $('.fieldsForLease').show();
    } else if (val === 'Both') {
      $('.fieldsForSale').show();
      $('.fieldsForLease').show();
    }
  }

  // for get sub property type
  getPropertyType() {
    let dataForForm = {
      property_type: 'Cars & RVs'
    }
    this.UserService.getSubPropertyType(dataForForm).subscribe(result => {
      //console.log("ddddddddddddddddd : ", result['data']);
      if (result['success'] == true) {
        this.subpropertyType = (result['data']);
      }
    });
  }
  // for get data
  getDataPostById() {
    let dataForForm = {
      id: this.getParamsId,
      name: this.getParamsName
    }
    //console.log(dataForForm);
    if (this.getParamsId != null) {
      $('.createListing').hide();
      $('.updateListing').show();
      this.UserService.wePogetPostingById(dataForForm).subscribe(result => {
        //console.log("result : ", result);
        if (result['success'] == true) {
          this.getData = result['getData'];
          // for check sub category
          $("#all-sub-category").prop("disabled",true);
          //$('.general').show();
          if (this.getData[0].Cars_Rv_subtype == "Luxury Cars & SUVs") {
            $('.luxuryCarsSUVs').show();
          } else if (this.getData[0].Cars_Rv_subtype == "Commuter Cars & SUVs") {
            $('.commuterCarsSUVs').show();
          } else if (this.getData[0].Cars_Rv_subtype == "Campers & RVs") {
            $('.campersRVs').show();
          } else if (this.getData[0].Cars_Rv_subtype == "Commercial Buses") {
            $('.commercialBuses').show();
          } else if (this.getData[0].Cars_Rv_subtype == "EVs & Hybrids") {
            $('.eVsHybrids').show();
          } else if (this.getData[0].Cars_Rv_subtype == "Trucks") {
            $('.trucks').show();
          } else if (this.getData[0].Cars_Rv_subtype == "Vans & Limos") {
            $('.vansLimos').show();
          }
          this.getPhtosALL = this.getData[0].property_photos;
          this.Form_Serial_Number = this.getData[0].Form_Serial_Number;
          this.Description = this.getData[0].Description;
          this.purpose = this.getData[0].purpose;
          if (this.purpose === 'For Sale') {
            $('.fieldsForSale').show();
            $('.fieldsForLease').hide();
          } else if (this.purpose === 'For Lease') {
            $('.fieldsForSale').hide();
            $('.fieldsForLease').show();
          } else if (this.purpose === 'Both') {
            $('.fieldsForSale').show();
            $('.fieldsForLease').show();
          }
          this.links = this.getData[0].links;
          this.Tittle_Name = this.getData[0].Tittle_Name;
          this.selling_price = this.getData[0].selling_price;
          this.address_line1 = this.getData[0].address_line1;
          this.address_line2 = this.getData[0].address_line2;
          this.country = this.getData[0].country;
          this.state = this.getData[0].state;
          this.city = this.getData[0].city;
          this.zipcode = this.getData[0].zipcode;
          this.landmark = this.getData[0].landmark;
          this.price = this.getData[0].price;
          this.Form_Serial_Number = this.getData[0].Form_Serial_Number;
          this.Cars_Rv_type = this.getData[0].Cars_Rv_type;
          this.Cars_Rv_subtype = this.getData[0].Cars_Rv_subtype;
          
          this.prevuiousPdf = this.getData[0].pdf_doc;

          // New fields added
          this.Body_type = this.getData[0].Body_type;
          this.Type_of_fuel = this.getData[0].Type_of_fuel;
          this.Search_by_brand = this.getData[0].Search_by_brand;
          this.Search_by_model = this.getData[0].Search_by_model;
          this.KILOMETERS_DRIVEN = this.getData[0].KILOMETERS_DRIVEN;
          this.REGISTERED_LOCATION = this.getData[0].REGISTERED_LOCATION;
          this.transmission = this.getData[0].transmission;
          this.OWNER_TYPE = this.getData[0].OWNER_TYPE;
          this.COLORS = this.getData[0].COLORS;
          this.Top_Specs_Features = this.getData[0].Top_Specs_Features;
          this.Max_Power = this.getData[0].Max_Power;
          this.Mileage = this.getData[0].Mileage;
          this.Torque = this.getData[0].Torque;
          this.Wheel_Size = this.getData[0].Wheel_Size;
          this.Seating_Capacity = this.getData[0].Seating_Capacity;
          this.year_built = this.getData[0].year_built;
          this.year_purchased = this.getData[0].year_purchased;
          this.Gear_Box = this.getData[0].Gear_Box;
          this.Drive_Type = this.getData[0].Drive_Type;
          this.Steering_Type = this.getData[0].Steering_Type;
          this.Turning_Radius = this.getData[0].Turning_Radius;
          this.Front_Brake_Type = this.getData[0].Front_Brake_Type;
          this.Rear_Brake_Type = this.getData[0].Rear_Brake_Type;
          this.Top_Speed = this.getData[0].Top_Speed;
          this.Acceleration = this.getData[0].Acceleration;
          this.Tyre_Type = this.getData[0].Tyre_Type;
          this.No_of_doors = this.getData[0].No_of_doors;
          this.Engine_Type = this.getData[0].Engine_Type;
          this.Displacement = this.getData[0].Displacement;
          this.No_Of_Cylinder = this.getData[0].No_Of_Cylinder;
          this.Valves_Per_Cylinder = this.getData[0].Valves_Per_Cylinder;
          this.Valve_Configuration = this.getData[0].Valve_Configuration;
          this.Fuel_Supply_System = this.getData[0].Fuel_Supply_System;
          this.Turbo_Charger = this.getData[0].Turbo_Charger;
          this.superCharger = this.getData[0].superCharger;
          this.Front_Tread = this.getData[0].Front_Tread;
          this.Wheel_Base = this.getData[0].Wheel_Base;
          this.Rear_Tread = this.getData[0].Rear_Tread;
          this.Kerb_Weight = this.getData[0].Kerb_Weight;
          this.Gross_Weight = this.getData[0].Gross_Weight;
          this.Rear_Head_Room = this.getData[0].Rear_Head_Room;
          this.Front_Head_Room = this.getData[0].Front_Head_Room;
          this.Height = this.getData[0].Height;
          this.Length = this.getData[0].Length;
          this.Width = this.getData[0].Width;
          this.Ground_Clearance_Unladen = this.getData[0].Ground_Clearance_Unladen;
          this.DRIVETRAIN = this.getData[0].DRIVETRAIN;
          this.FUEL_EFFICIENCY = this.getData[0].FUEL_EFFICIENCY;
          this.Tires = this.getData[0].Tires;
          this.Body_color = this.getData[0].Body_color;
          this.HVAC = this.getData[0].HVAC;
          this.Engine = this.getData[0].Engine;
          this.GVWR = this.getData[0].GVWR;
          this.Base_Curb_Weight = this.getData[0].Base_Curb_Weight;
          this.Trans_Type = this.getData[0].Trans_Type;
          this.A_T = this.getData[0].A_T;
          this.RV_CLASS = this.getData[0].RV_CLASS;
          this.DRY_WEIGHT = this.getData[0].DRY_WEIGHT;
          this.SLEEPS = this.getData[0].SLEEPS;
          this.SLIDE_OUTS = this.getData[0].SLIDE_OUTS;
          this.Outside_Shower = this.getData[0].Outside_Shower;
          this.Fireplace = this.getData[0].Fireplace;
          this.Black_Tank_Flush = this.getData[0].Black_Tank_Flush;
          this.pass_through_storage = this.getData[0].pass_through_storage;
          this.storage_facility = this.getData[0].storage_facility;
          this.kitchen_facility = this.getData[0].kitchen_facility;
          this.bedroom_facility = this.getData[0].bedroom_facility;
          this.Max_Dry_Weight = this.getData[0].Max_Dry_Weight;
          this.make_model = this.getData[0].make_model;
          this.Features = this.getData[0].Features;
          this.Seaters = this.getData[0].Seaters;
          this.Coach = this.getData[0].Coach;
          this.Condition = this.getData[0].Condition;
          this.Seller_Type = this.getData[0].Seller_Type;
          this.LOCATION_RADIUS = this.getData[0].LOCATION_RADIUS;
          this.VEHICLE_TYPE = this.getData[0].VEHICLE_TYPE;
          this.VEHICLE_CONDITION = this.getData[0].VEHICLE_CONDITION;
          this.ASKING_PRICE = this.getData[0].ASKING_PRICE;
          this.Wheelbase = this.getData[0].Wheelbase;
          this.BEV_PERFORMANCE = this.getData[0].BEV_PERFORMANCE;
          this.Horsepower = this.getData[0].Horsepower;
          this.MPGe = this.getData[0].MPGe;
          this.CHARGING = this.getData[0].CHARGING;
          this.Electric_Range = this.getData[0].Electric_Range;
          this.Battery_size = this.getData[0].Battery_size;
          this.Cost_to_charge_full = this.getData[0].Cost_to_charge_full;
          this.Monthly_charge_cost = this.getData[0].Monthly_charge_cost;
          this.Full_charge_in = this.getData[0].Full_charge_in;
          this.Truck_Type = this.getData[0].Truck_Type;
          this.Engine_Make = this.getData[0].Engine_Make;
          this.Engine_Model = this.getData[0].Engine_Model;
          this.Engine_HP = this.getData[0].Engine_HP;
          this.Trans_Make = this.getData[0].Trans_Make;
          this.Trans_Model = this.getData[0].Trans_Model;
          this.Suspension_Type = this.getData[0].Suspension_Type;
          this.Axle_Configuration = this.getData[0].Axle_Configuration;
          this.FA_Capacity = this.getData[0].FA_Capacity;
          this.RA_Capacity = this.getData[0].RA_Capacity;
          this.Rear_End_Ratio = this.getData[0].Rear_End_Ratio;
          this.Front_Wheels = this.getData[0].Front_Wheels;
          this.Rear_Wheels = this.getData[0].Rear_Wheels;
          this.Engine_Brake = this.getData[0].Engine_Brake;
          this.Under_CDL = this.getData[0].Under_CDL;
          this.Serial_No = this.getData[0].Serial_No;
          this.Odometer = this.getData[0].Odometer;
          this.YEAR_OEM_BUILT = this.getData[0].YEAR_OEM_BUILT;
          this.BODY_STYLE = this.getData[0].BODY_STYLE;
          this.COACH_BUILDER = this.getData[0].COACH_BUILDER;
          this.VEHICLE_PRIMARY_USE = this.getData[0].VEHICLE_PRIMARY_USE;
          this.VIN = this.getData[0].VIN;
          this.Safety_Features = this.getData[0].Safety_Features;
          this.Vehicle_Premiums = this.getData[0].Vehicle_Premiums;
          this.Driver_Comfort = this.getData[0].Driver_Comfort;
          this.Passenger_Comfort = this.getData[0].Passenger_Comfort;
          this.alloy_wheel_size = this.getData[0].alloy_wheel_size;
          this.cargo_volume = this.getData[0].cargo_volume;
          this.max_torque = this.getData[0].max_torque;
          this.Year_Coach_Build = this.getData[0].Year_Coach_Build;
          this.fractional_share_choice_percentage_or_unit = this.getData[0].fractional_share_choice_percentage_or_unit;
          this.fractional_share_text_percentage_or_unit = this.getData[0].fractional_share_text_percentage_or_unit;
          this.offering_Price_fractional_ownership = this.getData[0].offering_Price_fractional_ownership;
          if (this.fractional_share_choice_percentage_or_unit != "") {
            $('.fractional_text_label').html("Fractional Share " + this.fractional_share_choice_percentage_or_unit + " :");
            $('.fractional_text_input').attr("placeholder", "Fractional Share " + this.fractional_share_choice_percentage_or_unit);
            $('.fractional_text').show();
          }
          this.Model = this.getData[0].Model;
          this.Fuel_Type = this.getData[0].Fuel_Type;
          this.Exterior_Color = this.getData[0].Exterior_Color;
          this.Interior_Color = this.getData[0].Interior_Color;
          this.Engine_Size = this.getData[0].Engine_Size;
          this.Transmission_Type = this.getData[0].Transmission_Type;
          this.Maintenance_History = this.getData[0].Maintenance_History;
          this.Accident_History = this.getData[0].Accident_History;
          this.Exterior_Features = this.getData[0].Exterior_Features;
          this.Interior_Features = this.getData[0].Interior_Features;
          this.Mechanical_Features = this.getData[0].Mechanical_Features;
          this.Technological_Features = this.getData[0].Technological_Features;
          this.VIN_Number = this.getData[0].VIN_Number;
          this.No_Owners = this.getData[0].No_Owners;
          this.Original_Warranty = this.getData[0].Original_Warranty;
          this.Cars_Location = this.getData[0].Cars_Location;
          this.Gross_Vehicle_Weight = this.getData[0].Gross_Vehicle_Weight;
          this.Sleeping_Capacity = this.getData[0].Sleeping_Capacity;
          this.Sleep_Options = this.getData[0].Sleep_Options;
          this.Awnings = this.getData[0].Awnings;
          this.Leveling_Jacks = this.getData[0].Leveling_Jacks;
          this.Air_Conditioners = this.getData[0].Air_Conditioners;
          this.Water_Capacity = this.getData[0].Water_Capacity;
          this.Self_Contained = this.getData[0].Self_Contained;
          this.Vehicle_Location = this.getData[0].Vehicle_Location;
          this.Chasis_Make = this.getData[0].Chasis_Make;
          this.Chasis_Model = this.getData[0].Chasis_Model;
          this.Number_of_Passengers = this.getData[0].Number_of_Passengers;
          this.Seating_Style = this.getData[0].Seating_Style;
          this.Wheelchair_Lift = this.getData[0].Wheelchair_Lift;
          this.Wheelchair_Positions = this.getData[0].Wheelchair_Positions;
          this.Luggage_Type = this.getData[0].Luggage_Type;
          this.Television = this.getData[0].Television;
          this.Installed_Options = this.getData[0].Installed_Options;
          this.Mile_Range = this.getData[0].Mile_Range;
          this.Bed_Length = this.getData[0].Bed_Length;
          this.Towing_Capacity = this.getData[0].Towing_Capacity;
          this.Body_Make = this.getData[0].Body_Make;
          this.Body_Model = this.getData[0].Body_Model;
          this.Customer_Capacity = this.getData[0].Customer_Capacity;

          // country state city
          this.country = this.getData[0].country;
          // //console.log("ijuhnkm : ",this.PreUserData.country);
          if (this.country != "") {
            this.changeCoutry(this.country)
          }
          this.state = this.getData[0].state;
          if (this.state != "") {
            this.changeState(this.state)
          }
          this.city = this.getData[0].city;

          // New Field Added
          this.Year = this.getData[0].Year;

        }
      });
    }
  }
  // for country
  // getCountryAuthh() {
  //   let checkAuthh = localStorage.getItem("CountryAuthToken")
  //   if (checkAuthh == null) {
  //     this.CountryStateCityService.getCountryAuth().subscribe(result => {
  //       ////console.log("result od countryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy: ", result);
  //       localStorage.setItem('CountryAuthToken', JSON.stringify(result));
  //       this.getAllCountryData();
  //     })
  //   }
  // }

  // getAllCountryData() {
  //   this.CountryStateCityService.GetAllCountryData().subscribe(result111 => {
  //     localStorage.setItem('AllCountries', JSON.stringify(result111));
  //     this.getAllCountry = result111;
  //     let getIndex = this.findArrayIndex(this.getAllCountry, 'country_name', 'United States');
  //     this.array_move(this.getAllCountry, getIndex, 0)
  //   })
  // }
  // // for United states at 1 position
  // array_move(arr, old_index, new_index) {
  //   if (new_index >= arr.length) {
  //     var k = new_index - arr.length + 1;
  //     while (k--) {
  //       arr.push(undefined);
  //     }
  //   }
  //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  //   return arr; // for testing
  // };
  // findArrayIndex(array, attr, value) {
  //   for (var i = 0; i < array.length; i++) {
  //     if (array[i].country_name == value) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
  // changeCoutry(country_name) {
  //   this.CountryStateCityService.GetAllStateData(country_name).subscribe(result111 => {
  //     this.getAllStates = result111
  //   }, error => {
  //     ////console.log("errorrrrrrrrrrrrrr",error);
  //     if (error) {
  //       this.CountryStateCityService.getCountryAuth().subscribe(result => {
  //         localStorage.setItem('CountryAuthToken', JSON.stringify(result));
  //         this.getAllCountryData();
  //         // location.reload();
  //       })
  //     }
  //   })
  // }

  // here(name) {
  //   this.CountryStateCityService.GetAllCityData(name).subscribe(result111 => {
  //     this.getAllCities = result111
  //   })
  // }

  onFileDropped(event) {
    for (let item of event) {
      this.files.push(item)
    }
  }
  PdfFileDropped(event) {
    this.pdfFileUploadd = event;
  }
  deletePreviousPdf(i) {
    this.prevuiousPdf.splice(i, 1);
  }
  deltePreviousFile(i) {
    this.getPhtosALL.splice(i, 1);
  }
  delteFile(i) {
    this.files.splice(i, 1);
  }

  submit() {
    // //console.log("form : ",this.createPostingForm.value);
    // //console.log("files : ",this.files);

    let fieldsOfCheckedArray = $("input[class='MakeCoverPhotoPost']").serializeArray();
    let finalString = "";
    if (this.files.length == 0 && this.getParamsId == null) {
      $('#fileDropRef').focus();
      finalString += "Please select property photos.<br>";
    }
    if (this.files.length != 0) {
      let types = /(\.|\/)(jpeg|mp4|jpg|png|webm|mov)$/i;
      for (let i = 0; i < this.files.length; i++) {
        if (types.test(this.files[i].type) || types.test(this.files[i].name)) {
          // alert("file is valid");
        }
        else {
          // alert("file is invalid");
          $('#fileDropRef').focus();
          finalString += "Please select property photos/videos only images in jpg/jpeg/png & videos in mp4/mov/webm.<br>";
          break;
        }
      }
    }
    
    if (this.createPostingForm.value.Tittle_Name == "" || this.createPostingForm.value.Tittle_Name == undefined) {
      $('#fileDropRef').focus();
      finalString += "Please enter title name.<br>";
    }
    if (this.createPostingForm.value.Cars_Rv_subtype == "") {
      $('#fileDropRef').focus();
      finalString += "Please select Cars & RVs sub-type.<br>";
    }
    if (this.createPostingForm.value.purpose == "") {
      $('#fileDropRef').focus();
      finalString += "Please select purpose.<br>";
    }
    if (this.pdfFileUploadd.length != 0) {
      if (this.pdfFileUploadd[0].name.substring(this.pdfFileUploadd[0].name.lastIndexOf(".") + 1) != "pdf") {
        finalString += "Please select document in pdf format.<br>";
      }
    }
    if (this.createPostingForm.value.price == "" || this.createPostingForm.value.price == undefined) {
      $('#fileDropRef').focus();
      finalString += "Please enter price.<br>";
    }
    if (this.createPostingForm.value.address_line1 == "" || this.createPostingForm.value.address_line1 == undefined) {
      $('#fileDropRef').focus();
      finalString += "Please enter address line 1.<br>";
    }
    if (this.createPostingForm.value.country == "") {
      $('#fileDropRef').focus();
      finalString += "Please select country.<br>";
    } else {
      let getCountrySplitName = this.createPostingForm.value.country.split('||');
      if (getCountrySplitName[1] == '') {
        $('#fileDropRef').focus();
        finalString += "Please select country.<br>";
      }
    }
    if (this.createPostingForm.value.state == "") {
      $('#fileDropRef').focus();
      finalString += "Please select state.<br>";
    } else {
      let getStateSplitName = this.createPostingForm.value.state.split('||');
      if (getStateSplitName[2] == '') {
        $('#fileDropRef').focus();
        finalString += "Please select state.<br>";
      }
    }
    if (this.createPostingForm.value.city == "") {
      $('#fileDropRef').focus();
      finalString += "Please select city.<br>";
    }
    if (this.createPostingForm.value.zipcode == undefined || this.createPostingForm.value.zipcode == '') {
      $('#fileDropRef').focus();
      finalString += "Please enter zipcode.<br>";
    }
    if (this.createPostingForm.value.fractional_share_choice_percentage_or_unit != "") {
      if (this.createPostingForm.value.fractional_share_text_percentage_or_unit == "") {
        finalString += "Please enter fractional share " + this.createPostingForm.value.fractional_share_choice_percentage_or_unit.toLowerCase() + ".<br>";
      }
    }
    // if (this.createPostingForm.value.address == '') {
    //   $('#fileDropRef').focus();
    //   finalString += "Please enter address.<br>";
    // }

    //console.log("alertHtml", finalString);
    $(".BuyerDanger").html(finalString);
    $('.BuyerDanger').show();
    if (finalString == "") {
      for (var key in this.createPostingForm.value) {
        if (this.createPostingForm.value[key] == undefined) {
          this.createPostingForm.value[key] = "";
        }
      }
      this.loading = true;
      // $('#loader').show();
      $('.BuyerDanger').hide();
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      // form for buyer post
      let formData = new FormData();
      if (userLocalId != null) {
        formData.append("user_id", parseData['id']);
      } else {
        formData.append("user_id", null);
      }
      formData.append("Description", this.createPostingForm.value.Description.trim());
      formData.append("Tittle_Name", this.createPostingForm.value.Tittle_Name.trim());
      formData.append("links", this.createPostingForm.value.links.trim());
      formData.append("purpose", this.createPostingForm.value.purpose);
      formData.append("address_line1", this.createPostingForm.value.address_line1.trim());
      formData.append("address_line2", this.createPostingForm.value.address_line2.trim());
      formData.append("city", this.createPostingForm.value.city);
      formData.append("state", this.createPostingForm.value.state);
      formData.append("country", this.createPostingForm.value.country);
      formData.append("zipcode", this.createPostingForm.value.zipcode.trim());
      formData.append("landmark", this.createPostingForm.value.landmark.trim());
      formData.append("price", this.createPostingForm.value.price.trim());
      formData.append("Cars_Rv_type", this.createPostingForm.value.Cars_Rv_type);
      formData.append("Cars_Rv_subtype", this.createPostingForm.value.Cars_Rv_subtype);

      // New fields added
      formData.append("Body_type", this.createPostingForm.value.Body_type.trim());
      formData.append("Type_of_fuel", this.createPostingForm.value.Type_of_fuel.trim());
      formData.append("Search_by_brand", this.createPostingForm.value.Search_by_brand.trim());
      formData.append("Search_by_model", this.createPostingForm.value.Search_by_model.trim());
      formData.append("KILOMETERS_DRIVEN", this.createPostingForm.value.KILOMETERS_DRIVEN.trim());
      formData.append("REGISTERED_LOCATION", this.createPostingForm.value.REGISTERED_LOCATION.trim());
      formData.append("transmission", this.createPostingForm.value.transmission.trim());
      formData.append("OWNER_TYPE", this.createPostingForm.value.OWNER_TYPE.trim());
      formData.append("COLORS", this.createPostingForm.value.COLORS.trim());
      formData.append("Top_Specs_Features", this.createPostingForm.value.Top_Specs_Features.trim());
      formData.append("Max_Power", this.createPostingForm.value.Max_Power.trim());
      formData.append("Mileage", this.createPostingForm.value.Mileage.trim());
      formData.append("Torque", this.createPostingForm.value.Torque.trim());
      formData.append("Wheel_Size", this.createPostingForm.value.Wheel_Size.trim());
      formData.append("Seating_Capacity", this.createPostingForm.value.Seating_Capacity.trim());
      formData.append("year_built", this.createPostingForm.value.year_built.trim());
      formData.append("year_purchased", this.createPostingForm.value.year_purchased.trim());
      formData.append("Gear_Box", this.createPostingForm.value.Gear_Box.trim());
      formData.append("Drive_Type", this.createPostingForm.value.Drive_Type.trim());
      formData.append("Steering_Type", this.createPostingForm.value.Steering_Type.trim());
      formData.append("Turning_Radius", this.createPostingForm.value.Turning_Radius.trim());
      formData.append("Front_Brake_Type", this.createPostingForm.value.Front_Brake_Type.trim());
      formData.append("Rear_Brake_Type", this.createPostingForm.value.Rear_Brake_Type.trim());
      formData.append("Top_Speed", this.createPostingForm.value.Top_Speed.trim());
      formData.append("Acceleration", this.createPostingForm.value.Acceleration.trim());
      formData.append("Tyre_Type", this.createPostingForm.value.Tyre_Type.trim());
      formData.append("No_of_doors", this.createPostingForm.value.No_of_doors.trim());
      formData.append("Engine_Type", this.createPostingForm.value.Engine_Type.trim());
      formData.append("Displacement", this.createPostingForm.value.Displacement.trim());
      formData.append("No_Of_Cylinder", this.createPostingForm.value.No_Of_Cylinder.trim());
      formData.append("Valves_Per_Cylinder", this.createPostingForm.value.Valves_Per_Cylinder.trim());
      formData.append("Valve_Configuration", this.createPostingForm.value.Valve_Configuration.trim());
      formData.append("Fuel_Supply_System", this.createPostingForm.value.Fuel_Supply_System.trim());
      formData.append("Turbo_Charger", this.createPostingForm.value.Turbo_Charger.trim());
      formData.append("superCharger", this.createPostingForm.value.superCharger.trim());
      formData.append("Front_Tread", this.createPostingForm.value.Front_Tread.trim());
      formData.append("Wheel_Base", this.createPostingForm.value.Wheel_Base.trim());
      formData.append("Rear_Tread", this.createPostingForm.value.Rear_Tread.trim());
      formData.append("Kerb_Weight", this.createPostingForm.value.Kerb_Weight.trim());
      formData.append("Gross_Weight", this.createPostingForm.value.Gross_Weight.trim());
      formData.append("Rear_Head_Room", this.createPostingForm.value.Rear_Head_Room.trim());
      formData.append("Front_Head_Room", this.createPostingForm.value.Front_Head_Room.trim());
      formData.append("Height", this.createPostingForm.value.Height.trim());
      formData.append("Length", this.createPostingForm.value.Length.trim());
      formData.append("Width", this.createPostingForm.value.Width.trim());
      formData.append("Ground_Clearance_Unladen", this.createPostingForm.value.Ground_Clearance_Unladen.trim());
      formData.append("DRIVETRAIN", this.createPostingForm.value.DRIVETRAIN.trim());
      formData.append("FUEL_EFFICIENCY", this.createPostingForm.value.FUEL_EFFICIENCY.trim());
      formData.append("Tires", this.createPostingForm.value.Tires.trim());
      formData.append("Body_color", this.createPostingForm.value.Body_color.trim());
      formData.append("HVAC", this.createPostingForm.value.HVAC.trim());
      formData.append("Engine", this.createPostingForm.value.Engine.trim());
      formData.append("GVWR", this.createPostingForm.value.GVWR.trim());
      formData.append("Base_Curb_Weight", this.createPostingForm.value.Base_Curb_Weight.trim());
      formData.append("Trans_Type", this.createPostingForm.value.Trans_Type.trim());
      formData.append("A_T", this.createPostingForm.value.A_T.trim());
      formData.append("RV_CLASS", this.createPostingForm.value.RV_CLASS.trim());
      formData.append("DRY_WEIGHT", this.createPostingForm.value.DRY_WEIGHT.trim());
      formData.append("SLEEPS", this.createPostingForm.value.SLEEPS.trim());
      formData.append("SLIDE_OUTS", this.createPostingForm.value.SLIDE_OUTS.trim());
      formData.append("Outside_Shower", this.createPostingForm.value.Outside_Shower.trim());
      formData.append("Fireplace", this.createPostingForm.value.Fireplace.trim());
      formData.append("Black_Tank_Flush", this.createPostingForm.value.Black_Tank_Flush.trim());
      formData.append("pass_through_storage", this.createPostingForm.value.pass_through_storage.trim());
      formData.append("storage_facility", this.createPostingForm.value.storage_facility.trim());
      formData.append("kitchen_facility", this.createPostingForm.value.kitchen_facility.trim());
      formData.append("bedroom_facility", this.createPostingForm.value.bedroom_facility.trim());
      formData.append("Max_Dry_Weight", this.createPostingForm.value.Max_Dry_Weight.trim());
      formData.append("make_model", this.createPostingForm.value.make_model.trim());
      formData.append("Features", this.createPostingForm.value.Features.trim());
      formData.append("Seaters", this.createPostingForm.value.Seaters.trim());
      formData.append("Coach", this.createPostingForm.value.Coach.trim());
      formData.append("Condition", this.createPostingForm.value.Condition.trim());
      formData.append("Seller_Type", this.createPostingForm.value.Seller_Type.trim());
      formData.append("LOCATION_RADIUS", this.createPostingForm.value.LOCATION_RADIUS.trim());
      formData.append("VEHICLE_TYPE", this.createPostingForm.value.VEHICLE_TYPE.trim());
      formData.append("VEHICLE_CONDITION", this.createPostingForm.value.VEHICLE_CONDITION.trim());
      formData.append("ASKING_PRICE", this.createPostingForm.value.ASKING_PRICE.trim());
      formData.append("Wheelbase", this.createPostingForm.value.Wheelbase.trim());
      formData.append("BEV_PERFORMANCE", this.createPostingForm.value.BEV_PERFORMANCE.trim());
      formData.append("Horsepower", this.createPostingForm.value.Horsepower.trim());
      formData.append("MPGe", this.createPostingForm.value.MPGe.trim());
      formData.append("CHARGING", this.createPostingForm.value.CHARGING.trim());
      formData.append("Electric_Range", this.createPostingForm.value.Electric_Range.trim());
      formData.append("Battery_size", this.createPostingForm.value.Battery_size.trim());
      formData.append("Cost_to_charge_full", this.createPostingForm.value.Cost_to_charge_full.trim());
      formData.append("Monthly_charge_cost", this.createPostingForm.value.Monthly_charge_cost.trim());
      formData.append("Full_charge_in", this.createPostingForm.value.Full_charge_in.trim());
      formData.append("Truck_Type", this.createPostingForm.value.Truck_Type.trim());
      formData.append("Engine_Make", this.createPostingForm.value.Engine_Make.trim());
      formData.append("Engine_Model", this.createPostingForm.value.Engine_Model.trim());
      formData.append("Engine_HP", this.createPostingForm.value.Engine_HP.trim());
      formData.append("Trans_Make", this.createPostingForm.value.Trans_Make.trim());
      formData.append("Trans_Model", this.createPostingForm.value.Trans_Model.trim());
      formData.append("Suspension_Type", this.createPostingForm.value.Suspension_Type.trim());
      formData.append("Axle_Configuration", this.createPostingForm.value.Axle_Configuration.trim());
      formData.append("FA_Capacity", this.createPostingForm.value.FA_Capacity.trim());
      formData.append("RA_Capacity", this.createPostingForm.value.RA_Capacity.trim());
      formData.append("Rear_End_Ratio", this.createPostingForm.value.Rear_End_Ratio.trim());
      formData.append("Front_Wheels", this.createPostingForm.value.Front_Wheels.trim());
      formData.append("Rear_Wheels", this.createPostingForm.value.Rear_Wheels.trim());
      formData.append("Engine_Brake", this.createPostingForm.value.Engine_Brake.trim());
      formData.append("Under_CDL", this.createPostingForm.value.Under_CDL.trim());
      formData.append("Serial_No", this.createPostingForm.value.Serial_No.trim());
      formData.append("Odometer", this.createPostingForm.value.Odometer.trim());
      formData.append("YEAR_OEM_BUILT", this.createPostingForm.value.YEAR_OEM_BUILT.trim());
      formData.append("BODY_STYLE", this.createPostingForm.value.BODY_STYLE.trim());
      formData.append("COACH_BUILDER", this.createPostingForm.value.COACH_BUILDER.trim());
      formData.append("VEHICLE_PRIMARY_USE", this.createPostingForm.value.VEHICLE_PRIMARY_USE.trim());
      formData.append("VIN", this.createPostingForm.value.VIN.trim());
      formData.append("Safety_Features", this.createPostingForm.value.Safety_Features.trim());
      formData.append("Vehicle_Premiums", this.createPostingForm.value.Vehicle_Premiums.trim());
      formData.append("Driver_Comfort", this.createPostingForm.value.Driver_Comfort.trim());
      formData.append("Passenger_Comfort", this.createPostingForm.value.Passenger_Comfort.trim());
      formData.append("alloy_wheel_size", this.createPostingForm.value.alloy_wheel_size.trim());
      formData.append("cargo_volume", this.createPostingForm.value.cargo_volume.trim());
      formData.append("max_torque", this.createPostingForm.value.max_torque.trim());
      formData.append("Year_Coach_Build", this.createPostingForm.value.Year_Coach_Build.trim());
      formData.append("fractional_share_choice_percentage_or_unit", this.createPostingForm.value.fractional_share_choice_percentage_or_unit.trim());
      formData.append("fractional_share_text_percentage_or_unit", this.createPostingForm.value.fractional_share_text_percentage_or_unit.trim());
      formData.append("offering_Price_fractional_ownership", this.createPostingForm.value.offering_Price_fractional_ownership.trim());

      formData.append("Model", this.createPostingForm.value.Model.trim());
      formData.append("Fuel_Type", this.createPostingForm.value.Fuel_Type.trim());
      formData.append("Exterior_Color", this.createPostingForm.value.Exterior_Color.trim());
      formData.append("Interior_Color", this.createPostingForm.value.Interior_Color.trim());
      formData.append("Engine_Size", this.createPostingForm.value.Engine_Size.trim());
      formData.append("Transmission_Type", this.createPostingForm.value.Transmission_Type.trim());
      formData.append("Maintenance_History", this.createPostingForm.value.Maintenance_History.trim());
      formData.append("Accident_History", this.createPostingForm.value.Accident_History.trim());
      formData.append("Exterior_Features", this.createPostingForm.value.Exterior_Features.trim());
      formData.append("Interior_Features", this.createPostingForm.value.Interior_Features.trim());
      formData.append("Mechanical_Features", this.createPostingForm.value.Mechanical_Features.trim());
      formData.append("Technological_Features", this.createPostingForm.value.Technological_Features.trim());
      formData.append("VIN_Number", this.createPostingForm.value.VIN_Number.trim());
      formData.append("No_Owners", this.createPostingForm.value.No_Owners.trim());
      formData.append("Original_Warranty", this.createPostingForm.value.Original_Warranty.trim());
      formData.append("Cars_Location", this.createPostingForm.value.Cars_Location.trim());
      formData.append("Gross_Vehicle_Weight", this.createPostingForm.value.Gross_Vehicle_Weight.trim());
      formData.append("Sleeping_Capacity", this.createPostingForm.value.Sleeping_Capacity.trim());
      formData.append("Sleep_Options", this.createPostingForm.value.Sleep_Options.trim());
      formData.append("Awnings", this.createPostingForm.value.Awnings.trim());
      formData.append("Leveling_Jacks", this.createPostingForm.value.Leveling_Jacks.trim());
      formData.append("Air_Conditioners", this.createPostingForm.value.Air_Conditioners.trim());
      formData.append("Water_Capacity", this.createPostingForm.value.Water_Capacity.trim());
      formData.append("Self_Contained", this.createPostingForm.value.Self_Contained.trim());
      formData.append("Vehicle_Location", this.createPostingForm.value.Vehicle_Location.trim());
      formData.append("Chasis_Make", this.createPostingForm.value.Chasis_Make.trim());
      formData.append("Chasis_Model", this.createPostingForm.value.Chasis_Model.trim());
      formData.append("Number_of_Passengers", this.createPostingForm.value.Number_of_Passengers.trim());
      formData.append("Seating_Style", this.createPostingForm.value.Seating_Style.trim());
      formData.append("Wheelchair_Lift", this.createPostingForm.value.Wheelchair_Lift.trim());
      formData.append("Wheelchair_Positions", this.createPostingForm.value.Wheelchair_Positions.trim());
      formData.append("Luggage_Type", this.createPostingForm.value.Luggage_Type.trim());
      formData.append("Television", this.createPostingForm.value.Television.trim());
      formData.append("Installed_Options", this.createPostingForm.value.Installed_Options.trim());
      formData.append("Mile_Range", this.createPostingForm.value.Mile_Range.trim());
      formData.append("Bed_Length", this.createPostingForm.value.Bed_Length.trim());
      formData.append("Towing_Capacity", this.createPostingForm.value.Towing_Capacity.trim());
      formData.append("Body_Make", this.createPostingForm.value.Body_Make.trim());
      formData.append("Body_Model", this.createPostingForm.value.Body_Model.trim());
      formData.append("Customer_Capacity", this.createPostingForm.value.Customer_Capacity.trim());


      if (this.pdfFileUploadd.length != 0) {
        formData.append("pdfFile", this.pdfFileUploadd[0]);
      }
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      if (this.getParamsId != null) {
        formData.append("Form_Serial_Number", this.Form_Serial_Number);
        formData.append("previous_pdf_file", JSON.stringify(this.prevuiousPdf));
        formData.append("previous_images", JSON.stringify(this.getPhtosALL));
        this.UserService.UpdateListingCarsRv(formData, this.getParamsId).subscribe(result => {
          this.loading = false;
          //console.log("result : ", result);
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // location.reload();
            // this.router.navigate(['/all-listing']);
            location.href = "all-listing?purpose=" + this.createPostingForm.value.purpose;
          }
          else if (result['success'] == false) {
            $(".BuyerDanger").html(result['message']);
            $('.BuyerDanger').show();
            $('.BuyerSuccess').hide();
            $('#fileDropRef').focus();
          }
        });
      }
      else {
        formData.append("Form_Serial_Number", this.getCurrentSerialNumber);
        formData.append("listing_show_on_wepo", 'Yes');
        formData.append("created_by", "WePropertyowners");
        this.UserService.CreateCarsRvListing(formData).subscribe(result => {
          //console.log("result : ", result);
          this.loading = false;
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // localStorage.setItem('CarsRvCurrentSerialNumber', JSON.stringify((result['Form_Serial_Number'] + 1)));
            // location.reload();
            // this.router.navigate(['/all-listing']);
            location.href = "all-listing?purpose=" + this.createPostingForm.value.purpose;
          }
          else if (result['success'] == false) {
            $(".BuyerDanger").html(result['message']);
            $('.BuyerDanger').show();
            $('.BuyerSuccess').hide();
            $('#fileDropRef').focus();
          }
        });
      }
    }
  }

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    ////console.log("Drag Over");
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
      for (let item of files) {
        this.files.push(item)
      }
    }
  }

}

