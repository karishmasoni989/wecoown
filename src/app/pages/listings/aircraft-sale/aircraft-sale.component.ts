import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../../service/country-state-city.service';
@Component({
  selector: 'app-aircraft-sale',
  templateUrl: './aircraft-sale.component.html',
  styleUrls: ['./aircraft-sale.component.css']
})
export class AircraftSaleComponent implements OnInit {
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
  Useful_Load: any;
  Max_Takeoff_Weight: any;
  Fuel_Capacity_Volume: any;
  Engine1_Notes: any;
  Engine1_Make_Model: any;
  Engine2_Serial_Number: any;
  Engine1_Time: any;
  Description: any;
  address_line1: any;
  address_line2: any;
  city: any;
  state: any;
  country: any;
  zipcode: any;
  landmark: any;
  Aircraft_Location: any;
  Aircraft_type: any;
  Aircraft_subtype: any;
  Manufacturer: any;
  Model: any;
  Serial_Number: any;
  Registration: any;
  Total_Time: any;
  Based_at: any;
  Condition: any;
  FlightRules: any;
  price: any;
  Number_of_Seats: any;
  Airframe_Notes: any;
  Total_Landings: any;
  Complete_Logs: any;
  Engine1_Serial_Number: any;
  E1_Hot_Section_Time1: any;
  percentage_leased: any;
  Engine2_Notes: any;
  parking: any;
  tenancy: any;
  building_height: any;
  floors: any;
  typical_floor_size: any;
  building_far: any;
  land_acres: any;
  slab_to_slab: any;
  Engine2_Make_Model: any;
  Engine2_Time: any;
  E2_Hot_Section_Time1: any;
  Engine_Maintenance_Program: any;
  Prop1_Manufacturer: any;
  Prop2_Manufacturer: any;
  Number_of_Blades: any;
  subpropertyType: any;
  SVT: any;
  Prop_Notes: any;
  Prop1_Overhaul_Time: any;
  Prop1_Model: any;
  Prop2_Overhaul_Time: any;
  Prop2_Model: any;
  Avionics_Packaging: any;
  ADSB_Equipped: any;
  WAAS: any;
  LPV: any;
  Avionics_Radios: any;
  Additional_Equipment: any;
  Known_Ice: any;
  Year_Painted: any;
  Exterior_Notes: any;
  Interior_Notes: any;
  Year_Interior: any;
  Configuration: any;
  Lavatory: any;
  Lavatory_Configuration: any;
  Modifications: any;
  Inspection_Status: any;
  Airworthy: any;
  Insurance: any;
  Operating_Costs: any;
  Financing: any;
  purpose: any;
  Tittle_Name: any;
  getCurrentSerialNumber: any;
  Form_Serial_Number: any;
  prevuiousPdf: any;
  selling_price: any;
  Year: any;
  Role: any;
  Number_built: any;
  First_flight: any;
  Specifications: any;
  Technical_Specifications: any;
  Capacity: any;
  Mass_Empty: any;
  Maximum_Take_Off_Weight: any;
  Maximum_baggage_load: any;
  Fuel_type: any;
  Drive_mode: any;
  Fuel_capacity: any;
  Max_speed: any;
  Top_speed_acceleration: any;
  Dimensions: any;
  Engine_power: any;
  Range: any;
  Flight_mode: any;
  Economic_cruise_speed: any;
  Rotor_diameter: any;
  Maximum_altitude: any;
  Take_off_distance: any;
  Landing_rol_distance: any;
  Seats: any;
  Airframe: any;
  Engine_2: any;
  Engine_Program: any;
  Props: any;
  Avionics: any;
  Exterior: any;
  Interior: any;
  Modifications_Conversions: any;
  Aircraft_Highlights: any;
  Registration_number: any;
  No_Seats: any;
  Engine_Notes: any;
  Hot_Section_Time: any;
  Engine_Time: any;
  Cycles_TBO: any;
  Make_Model: any;
  Flight_Deck_Model: any;
  Flight_Deck_Manufacturer: any;
  ADS_B_Equipped: any;
  Galley: any;
  Galley_Configuration: any;
  Flight_Ready: any;
  Service_Logs: any;
  Brochure: any;
  Engines: any;
  Time: any;
  Auxiliary_Power_Unit: any;
  APU_Time: any;
  APU_Maintenance_Program: any;
  APU_Notes: any;
  Engine_1: any;
  Fuselage_length: any;
  Overall_height: any;
  Wingspan: any;
  Tip_to_tip_distance: any;
  Empty_weight: any;
  Max_gross_takeoff_wt: any;
  cruise_speed: any;
  Lift_Propulsors: any;
  Motor_output: any;
  Power_type: any;
  Passenger_capacity: any;
  Address: any;
  No_Blades: any;
  Manufacturer_Model: any;
  Overhaul_Time: any;
  Flying_Cars_Status: any;
  Dimension_flight_lwh: any;
  Maximum_Speed_flightmode: any;
  Engine_Power_flightmode: any;
  fractional_share_choice_percentage_or_unit: string;
  fractional_share_text_percentage_or_unit: any;
  offering_Price_fractional_ownership: any;
  Range_flight: any;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    public CountryStateCityService: CountryStateCityService,
    private activatedRoute: ActivatedRoute
  ) { }
  ionViewWillEnter() {
    this.startOfPage();
  }
  ngOnInit() {
    this.startOfPage();
  }
  startOfPage() {
    $("#all-sub-category").prop("disabled", false);
    $('.Flying_Cars').hide();
    $('.helicopters').hide();
    $('.jets').hide();
    $('.passengerDrones').hide();
    $('.pistonAircraft').hide();
    $('.turboAircraft').hide();
    //$('.general').hide();
    this.country = "";
    this.state = "";
    this.city = "";
    this.Aircraft_subtype = "";
    this.purpose = "";
    this.Aircraft_type = "Jets & Aircraft";
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
      address_line1: new FormControl(''),
      selling_price: new FormControl(''),
      address_line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      zipcode: new FormControl(''),
      landmark: new FormControl(''),
      Aircraft_Location: new FormControl(''),
      price: new FormControl(''),

      Aircraft_type: new FormControl(''),
      Aircraft_subtype: new FormControl(''),
      Manufacturer: new FormControl(''),
      Model: new FormControl(''),
      Serial_Number: new FormControl(''),
      Registration: new FormControl(''),
      Total_Time: new FormControl(''),
      Based_at: new FormControl(''),
      Condition: new FormControl(''),
      FlightRules: new FormControl(''),
      Number_of_Seats: new FormControl(''),
      Airframe_Notes: new FormControl(''),
      Total_Landings: new FormControl(''),
      Complete_Logs: new FormControl(),
      // property facts
      Max_Takeoff_Weight: new FormControl(''),
      Useful_Load: new FormControl(''),
      Fuel_Capacity_Volume: new FormControl(''),
      Engine1_Notes: new FormControl(''),
      Engine1_Serial_Number: new FormControl(''),
      Engine1_Make_Model: new FormControl(''),
      Engine1_Time: new FormControl(''),
      E1_Hot_Section_Time1: new FormControl(''),
      Engine2_Notes: new FormControl(''),
      Engine2_Serial_Number: new FormControl(''),

      Engine2_Make_Model: new FormControl(''),
      Engine2_Time: new FormControl(''),
      E2_Hot_Section_Time1: new FormControl(''),
      Engine_Maintenance_Program: new FormControl(''),
      Prop1_Manufacturer: new FormControl(''),
      Prop2_Manufacturer: new FormControl(''),
      Number_of_Blades: new FormControl(''),
      Prop_Notes: new FormControl(''),
      Prop1_Overhaul_Time: new FormControl(''),
      Prop1_Model: new FormControl(''),
      Prop2_Overhaul_Time: new FormControl(''),
      Prop2_Model: new FormControl(''),
      Avionics_Packaging: new FormControl(''),
      ADSB_Equipped: new FormControl(''),
      WAAS: new FormControl(''),
      LPV: new FormControl(''),
      SVT: new FormControl(''),
      Avionics_Radios: new FormControl(''),
      Additional_Equipment: new FormControl(''),
      Known_Ice: new FormControl(''),
      Year_Painted: new FormControl(''),
      Exterior_Notes: new FormControl(''),
      Interior_Notes: new FormControl(''),
      Year_Interior: new FormControl(''),
      Configuration: new FormControl(''),
      Lavatory: new FormControl(''),
      Lavatory_Configuration: new FormControl(''),
      Modifications: new FormControl(''),
      Inspection_Status: new FormControl(''),
      Airworthy: new FormControl(''),
      Insurance: new FormControl(''),
      Operating_Costs: new FormControl(''),
      Financing: new FormControl(''),

      // New Fields Added after doc
      Year: new FormControl(''),
      Role: new FormControl(''),
      First_flight: new FormControl(''),
      Number_built: new FormControl(''),
      Specifications: new FormControl(''),
      Technical_Specifications: new FormControl(''),
      Capacity: new FormControl(''),
      Mass_Empty: new FormControl(''),
      Maximum_Take_Off_Weight: new FormControl(''),
      Maximum_baggage_load: new FormControl(''),
      Fuel_type: new FormControl(''),
      Fuel_capacity: new FormControl(''),
      Drive_mode: new FormControl(''),
      Max_speed: new FormControl(''),
      Top_speed_acceleration: new FormControl(''),
      Engine_power: new FormControl(''),
      Dimensions: new FormControl(''),
      Range: new FormControl(''),
      Range_flight: new FormControl(''),
      Flight_mode: new FormControl(''),
      Economic_cruise_speed: new FormControl(''),
      Rotor_diameter: new FormControl(''),
      Maximum_altitude: new FormControl(''),
      Take_off_distance: new FormControl(''),
      Landing_rol_distance: new FormControl(''),
      Seats: new FormControl(''),
      Airframe: new FormControl(''),
      Engine_2: new FormControl(''),
      Engine_Program: new FormControl(''),
      Props: new FormControl(''),
      Avionics: new FormControl(''),
      Exterior: new FormControl(''),
      Interior: new FormControl(''),
      Modifications_Conversions: new FormControl(''),
      Aircraft_Highlights: new FormControl(''),
      Registration_number: new FormControl(''),
      No_Seats: new FormControl(''),
      Engine_Notes: new FormControl(''),
      Hot_Section_Time: new FormControl(''),
      Engine_Time: new FormControl(''),
      Cycles_TBO: new FormControl(''),
      Make_Model: new FormControl(''),
      Flight_Deck_Model: new FormControl(''),
      Flight_Deck_Manufacturer: new FormControl(''),
      ADS_B_Equipped: new FormControl(''),
      Galley: new FormControl(''),
      Galley_Configuration: new FormControl(''),
      Flight_Ready: new FormControl(''),
      Service_Logs: new FormControl(''),
      Brochure: new FormControl(''),
      Engines: new FormControl(''),
      Time: new FormControl(''),
      Auxiliary_Power_Unit: new FormControl(''),
      APU_Time: new FormControl(''),
      APU_Maintenance_Program: new FormControl(''),
      APU_Notes: new FormControl(''),
      Engine_1: new FormControl(''),
      Fuselage_length: new FormControl(''),
      Overall_height: new FormControl(''),
      Wingspan: new FormControl(''),
      Tip_to_tip_distance: new FormControl(''),
      Empty_weight: new FormControl(''),
      Max_gross_takeoff_wt: new FormControl(''),
      cruise_speed: new FormControl(''),
      Lift_Propulsors: new FormControl(''),
      Motor_output: new FormControl(''),
      Power_type: new FormControl(''),
      Passenger_capacity: new FormControl(''),
      Address: new FormControl(''),
      No_Blades: new FormControl(''),
      Manufacturer_Model: new FormControl(''),
      Overhaul_Time: new FormControl(''),
      Flying_Cars_Status: new FormControl(''),
      Dimension_flight_lwh: new FormControl(''),
      Maximum_Speed_flightmode: new FormControl(''),
      Engine_Power_flightmode: new FormControl(''),
      fractional_share_choice_percentage_or_unit: new FormControl(''),
      fractional_share_text_percentage_or_unit: new FormControl(''),
      offering_Price_fractional_ownership: new FormControl(''),
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
          }
          else {
            $('.fractional_share_box').hide();
          }
        }
        else if (result['success'] == false) {
          $('.fractional_share_box').hide();
        }
      });
    }
  }
  getSelectedPurpose(item) {
    if (item === "No Ready") {
      this.price = 0;
      $("#price").attr('readonly', 'readonly');
    } else {
      $("#price").removeAttr('readonly');
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
    this.UserService.getAircraftAllCount().subscribe(result => {
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
    if (item == "Flying Cars") {
      $('.helicopters').hide();
      $('.jets').hide();
      $('.passengerDrones').hide();
      $('.pistonAircraft').hide();
      $('.turboAircraft').hide();
      $('.Flying_Cars').show();
    } else if (item == "Helicopters") {
      $('.Flying_Cars').hide();
      $('.jets').hide();
      $('.passengerDrones').hide();
      $('.pistonAircraft').hide();
      $('.turboAircraft').hide();
      $('.helicopters').show();
    } else if (item == "Jets") {
      $('.helicopters').hide();
      $('.Flying_Cars').hide();
      $('.passengerDrones').hide();
      $('.pistonAircraft').hide();
      $('.turboAircraft').hide();
      $('.jets').show();
    } else if (item == "Passenger Drones") {
      $('.helicopters').hide();
      $('.jets').hide();
      $('.Flying_Cars').hide();
      $('.pistonAircraft').hide();
      $('.turboAircraft').hide();
      $('.passengerDrones').show();
    } else if (item == "Piston Aircraft") {
      $('.helicopters').hide();
      $('.jets').hide();
      $('.passengerDrones').hide();
      $('.Flying_Cars').hide();
      $('.turboAircraft').hide();
      $('.pistonAircraft').show();
    } else if (item == "Turboprop Aircraft") {
      $('.helicopters').hide();
      $('.jets').hide();
      $('.passengerDrones').hide();
      $('.pistonAircraft').hide();
      $('.Flying_Cars').hide();
      $('.turboAircraft').show();
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
  // Flying_Cars
  // Helicopters
  // Jets
  // Passenger_Drones
  // Piston_Aircraft
  // Turboprop_Aircraft

  // for get sub property type
  getPropertyType() {
    let dataForForm = {
      property_type: 'Jets & Aircraft'
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
          $("#all-sub-category").prop("disabled", true);
          //$('.general').show();
          if (this.getData[0].Aircraft_subtype == "Flying Cars") {
            $('.Flying_Cars').show();
          } else if (this.getData[0].Aircraft_subtype == "Helicopters") {
            $('.helicopters').show();
          } else if (this.getData[0].Aircraft_subtype == "Jets") {
            $('.jets').show();
          } else if (this.getData[0].Aircraft_subtype == "Passenger Drones") {
            $('.passengerDrones').show();
          } else if (this.getData[0].Aircraft_subtype == "Piston Aircraft") {
            $('.pistonAircraft').show();
          } else if (this.getData[0].Aircraft_subtype == "Turboprop Aircraft") {
            $('.turboAircraft').show();
          }
          this.getPhtosALL = this.getData[0].property_photos;
          this.Description = this.getData[0].Description;
          this.links = this.getData[0].links;
          this.Form_Serial_Number = this.getData[0].Form_Serial_Number;
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
          this.Tittle_Name = this.getData[0].Tittle_Name;
          this.selling_price = this.getData[0].selling_price;
          this.address_line1 = this.getData[0].address_line1;
          this.address_line2 = this.getData[0].address_line2;
          this.zipcode = this.getData[0].zipcode;
          this.landmark = this.getData[0].landmark;
          this.Aircraft_Location = this.getData[0].Aircraft_Location;
          this.Aircraft_type = this.getData[0].Aircraft_type;
          this.Aircraft_subtype = this.getData[0].Aircraft_subtype;
          this.Manufacturer = this.getData[0].Manufacturer;
          this.Model = this.getData[0].Model;
          this.Serial_Number = this.getData[0].Serial_Number;
          this.Registration = this.getData[0].Registration;
          this.Total_Time = this.getData[0].Total_Time;
          this.Based_at = this.getData[0].Based_at;
          this.Condition = this.getData[0].Condition;
          this.FlightRules = this.getData[0].FlightRules;
          this.price = this.getData[0].price;
          if (this.purpose === "No Ready") {
            this.price = "";
            $("#price").attr('readonly', 'readonly');
          } else {
            $("#price").removeAttr('readonly');
          }
          this.Number_of_Seats = this.getData[0].Number_of_Seats;
          this.Airframe_Notes = this.getData[0].Airframe_Notes;
          this.Total_Landings = this.getData[0].Total_Landings;
          this.Complete_Logs = this.getData[0].Complete_Logs;

          // property facts
          this.Max_Takeoff_Weight = this.getData[0].Max_Takeoff_Weight;
          this.Useful_Load = this.getData[0].Useful_Load;
          this.Fuel_Capacity_Volume = this.getData[0].Fuel_Capacity_Volume;
          this.Engine1_Notes = this.getData[0].Engine1_Notes;
          this.Engine1_Serial_Number = this.getData[0].Engine1_Serial_Number;
          this.Engine1_Make_Model = this.getData[0].Engine1_Make_Model;
          this.Engine1_Time = this.getData[0].Engine1_Time;
          this.E1_Hot_Section_Time1 = this.getData[0].E1_Hot_Section_Time1;
          this.Engine2_Notes = this.getData[0].Engine2_Notes;
          this.Engine2_Serial_Number = this.getData[0].Engine2_Serial_Number;


          this.Engine2_Make_Model = this.getData[0].Engine2_Make_Model;
          this.Engine2_Time = this.getData[0].Engine2_Time;
          this.E2_Hot_Section_Time1 = this.getData[0].E2_Hot_Section_Time1;
          this.Engine_Maintenance_Program = this.getData[0].Engine_Maintenance_Program;
          this.Prop1_Manufacturer = this.getData[0].Prop1_Manufacturer;
          this.Prop2_Manufacturer = this.getData[0].Prop2_Manufacturer;
          this.Number_of_Blades = this.getData[0].Number_of_Blades;
          this.Prop_Notes = this.getData[0].Prop_Notes;
          this.Prop1_Overhaul_Time = this.getData[0].Prop1_Overhaul_Time;
          this.Prop1_Model = this.getData[0].Prop1_Model;
          this.Prop2_Overhaul_Time = this.getData[0].Prop2_Overhaul_Time;
          this.Prop2_Model = this.getData[0].Prop2_Model;
          this.Avionics_Packaging = this.getData[0].Avionics_Packaging;
          this.ADSB_Equipped = this.getData[0].ADSB_Equipped;
          this.WAAS = this.getData[0].WAAS;
          this.LPV = this.getData[0].LPV;
          this.SVT = this.getData[0].SVT;
          this.Avionics_Radios = this.getData[0].Avionics_Radios;
          this.Additional_Equipment = this.getData[0].Additional_Equipment;
          this.Known_Ice = this.getData[0].Known_Ice;
          this.Year_Painted = this.getData[0].Year_Painted;
          this.Exterior_Notes = this.getData[0].Exterior_Notes;
          this.Interior_Notes = this.getData[0].Interior_Notes;
          this.Year_Interior = this.getData[0].Year_Interior;
          this.Configuration = this.getData[0].Configuration;
          this.Lavatory = this.getData[0].Lavatory;
          this.Lavatory_Configuration = this.getData[0].Lavatory_Configuration;
          this.Modifications = this.getData[0].Modifications;
          this.Inspection_Status = this.getData[0].Inspection_Status;
          this.Airworthy = this.getData[0].Airworthy;
          this.Insurance = this.getData[0].Insurance;
          this.Operating_Costs = this.getData[0].Operating_Costs;
          this.Financing = this.getData[0].Financing;
          this.prevuiousPdf = this.getData[0].pdf_doc;

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
          this.Role = this.getData[0].Role;
          this.First_flight = this.getData[0].First_flight;
          this.Number_built = this.getData[0].Number_built;
          this.Specifications = this.getData[0].Specifications;
          this.Technical_Specifications = this.getData[0].Technical_Specifications;
          this.Capacity = this.getData[0].Capacity;
          this.Mass_Empty = this.getData[0].Mass_Empty;
          this.Maximum_Take_Off_Weight = this.getData[0].Maximum_Take_Off_Weight;
          this.Maximum_baggage_load = this.getData[0].Maximum_baggage_load;
          this.Fuel_type = this.getData[0].Fuel_type;
          this.Fuel_capacity = this.getData[0].Fuel_capacity;
          this.Drive_mode = this.getData[0].Drive_mode;
          this.Max_speed = this.getData[0].Max_speed;
          this.Top_speed_acceleration = this.getData[0].Top_speed_acceleration;
          this.Engine_power = this.getData[0].Engine_power;
          this.Dimensions = this.getData[0].Dimensions;
          this.Range = this.getData[0].Range;
          this.Range_flight = this.getData[0].Range_flight;
          this.Flight_mode = this.getData[0].Flight_mode;
          this.Economic_cruise_speed = this.getData[0].Economic_cruise_speed;
          this.Rotor_diameter = this.getData[0].Rotor_diameter;
          this.Maximum_altitude = this.getData[0].Maximum_altitude;
          this.Take_off_distance = this.getData[0].Take_off_distance;
          this.Landing_rol_distance = this.getData[0].Landing_rol_distance;
          this.Seats = this.getData[0].Seats;
          this.Airframe = this.getData[0].Airframe;
          this.Engine_2 = this.getData[0].Engine_2;
          this.Engine_Program = this.getData[0].Engine_Program;
          this.Props = this.getData[0].Props;
          this.Avionics = this.getData[0].Avionics;
          this.Exterior = this.getData[0].Exterior;
          this.Interior = this.getData[0].Interior;
          this.Modifications_Conversions = this.getData[0].Modifications_Conversions;
          this.Aircraft_Highlights = this.getData[0].Aircraft_Highlights;
          this.Registration_number = this.getData[0].Registration_number;
          this.No_Seats = this.getData[0].No_Seats;
          this.Engine_Notes = this.getData[0].Engine_Notes;
          this.Hot_Section_Time = this.getData[0].Hot_Section_Time;
          this.Engine_Time = this.getData[0].Engine_Time;
          this.Cycles_TBO = this.getData[0].Cycles_TBO;
          this.Make_Model = this.getData[0].Make_Model;
          this.Flight_Deck_Model = this.getData[0].Flight_Deck_Model;
          this.Flight_Deck_Manufacturer = this.getData[0].Flight_Deck_Manufacturer;
          this.ADS_B_Equipped = this.getData[0].ADS_B_Equipped;
          this.Galley = this.getData[0].Galley;
          this.Galley_Configuration = this.getData[0].Galley_Configuration;
          this.Flight_Ready = this.getData[0].Flight_Ready;
          this.Service_Logs = this.getData[0].Service_Logs;
          this.Brochure = this.getData[0].Brochure;
          this.Engines = this.getData[0].Engines;
          this.Time = this.getData[0].Time;
          this.Auxiliary_Power_Unit = this.getData[0].Auxiliary_Power_Unit;
          this.APU_Time = this.getData[0].APU_Time;
          this.APU_Maintenance_Program = this.getData[0].APU_Maintenance_Program;
          this.APU_Notes = this.getData[0].APU_Notes;
          this.Engine_1 = this.getData[0].Engine_1;
          this.Fuselage_length = this.getData[0].Fuselage_length;
          this.Overall_height = this.getData[0].Overall_height;
          this.Wingspan = this.getData[0].Wingspan;
          this.Tip_to_tip_distance = this.getData[0].Tip_to_tip_distance;
          this.Empty_weight = this.getData[0].Empty_weight;
          this.Max_gross_takeoff_wt = this.getData[0].Max_gross_takeoff_wt;
          this.cruise_speed = this.getData[0].cruise_speed;
          this.Lift_Propulsors = this.getData[0].Lift_Propulsors;
          this.Motor_output = this.getData[0].Motor_output;
          this.Power_type = this.getData[0].Power_type;
          this.Passenger_capacity = this.getData[0].Passenger_capacity;
          this.Address = this.getData[0].Address;
          this.No_Blades = this.getData[0].No_Blades;
          this.Manufacturer_Model = this.getData[0].Manufacturer_Model;
          this.Overhaul_Time = this.getData[0].Overhaul_Time;
          this.Flying_Cars_Status = this.getData[0].Flying_Cars_Status;
          this.Dimension_flight_lwh = this.getData[0].Dimension_flight_lwh;
          this.Maximum_Speed_flightmode = this.getData[0].Maximum_Speed_flightmode;
          this.Engine_Power_flightmode = this.getData[0].Engine_Power_flightmode;
          this.fractional_share_choice_percentage_or_unit = this.getData[0].fractional_share_choice_percentage_or_unit;
          this.fractional_share_text_percentage_or_unit = this.getData[0].fractional_share_text_percentage_or_unit;
          this.offering_Price_fractional_ownership = this.getData[0].offering_Price_fractional_ownership;
          if (this.fractional_share_choice_percentage_or_unit != "") {
            $('.fractional_text_label').html("Fractional Share " + this.fractional_share_choice_percentage_or_unit + " :");
            $('.fractional_text_input').attr("placeholder", "Fractional Share " + this.fractional_share_choice_percentage_or_unit);
            $('.fractional_text').show();
          }
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
    if (this.createPostingForm.value.Aircraft_subtype == "") {
      $('#fileDropRef').focus();
      finalString += "Please select aircraft sub-type.<br>";
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
    if (this.createPostingForm.value.purpose === "No Ready") {
      this.createPostingForm.value.price = 0;
    } else {
      if (this.createPostingForm.value.price == "" || this.createPostingForm.value.price == undefined) {
        $('#fileDropRef').focus();
        finalString += "Please enter price.<br>";
      }
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
      formData.append("links", this.createPostingForm.value.links.trim());
      formData.append("purpose", this.createPostingForm.value.purpose.trim());
      formData.append("Tittle_Name", this.createPostingForm.value.Tittle_Name.trim());
      formData.append("selling_price", this.createPostingForm.value.selling_price.trim());
      formData.append("address_line1", this.createPostingForm.value.address_line1.trim());
      formData.append("address_line2", this.createPostingForm.value.address_line2.trim());
      formData.append("city", this.createPostingForm.value.city.trim());
      formData.append("state", this.createPostingForm.value.state.trim());
      formData.append("country", this.createPostingForm.value.country.trim());
      formData.append("zipcode", this.createPostingForm.value.zipcode.trim());
      formData.append("landmark", this.createPostingForm.value.landmark.trim());
      formData.append("Aircraft_Location", this.createPostingForm.value.Aircraft_Location.trim());
      formData.append("Aircraft_type", this.createPostingForm.value.Aircraft_type.trim());
      formData.append("Aircraft_subtype", this.createPostingForm.value.Aircraft_subtype.trim());
      formData.append("Manufacturer", this.createPostingForm.value.Manufacturer.trim());
      formData.append("Model", this.createPostingForm.value.Model.trim());
      formData.append("Serial_Number", this.createPostingForm.value.Serial_Number.trim());
      formData.append("Registration", this.createPostingForm.value.Registration.trim());
      formData.append("Total_Time", this.createPostingForm.value.Total_Time.trim());
      formData.append("Based_at", this.createPostingForm.value.Based_at.trim());
      formData.append("Condition", this.createPostingForm.value.Condition.trim());
      formData.append("FlightRules", this.createPostingForm.value.FlightRules.trim());
      formData.append("price", this.createPostingForm.value.price);
      formData.append("Number_of_Seats", this.createPostingForm.value.Number_of_Seats.trim());
      formData.append("Airframe_Notes", this.createPostingForm.value.Airframe_Notes.trim());
      formData.append("Total_Landings", this.createPostingForm.value.Total_Landings.trim());
      formData.append("Complete_Logs", this.createPostingForm.value.Complete_Logs.trim());

      //  property facts
      formData.append("Max_Takeoff_Weight", this.createPostingForm.value.Max_Takeoff_Weight.trim());
      formData.append("Useful_Load", this.createPostingForm.value.Useful_Load.trim());
      formData.append("Fuel_Capacity_Volume", this.createPostingForm.value.Fuel_Capacity_Volume.trim());
      formData.append("Engine1_Notes", this.createPostingForm.value.Engine1_Notes.trim());
      formData.append("Engine1_Make_Model", this.createPostingForm.value.Engine1_Make_Model.trim());
      formData.append("Engine1_Serial_Number", this.createPostingForm.value.Engine1_Serial_Number.trim());
      formData.append("Engine1_Time", this.createPostingForm.value.Engine1_Time.trim());
      formData.append("E1_Hot_Section_Time1", this.createPostingForm.value.E1_Hot_Section_Time1.trim());
      formData.append("Engine2_Notes", this.createPostingForm.value.Engine2_Notes.trim());
      formData.append("Engine2_Serial_Number", this.createPostingForm.value.Engine2_Serial_Number.trim());

      formData.append("Engine2_Make_Model", this.createPostingForm.value.Engine2_Make_Model.trim());
      formData.append("Engine2_Time", this.createPostingForm.value.Engine2_Time.trim());
      formData.append("E2_Hot_Section_Time1", this.createPostingForm.value.E2_Hot_Section_Time1.trim());
      formData.append("Engine_Maintenance_Program", this.createPostingForm.value.Engine_Maintenance_Program.trim());
      formData.append("Prop1_Manufacturer", this.createPostingForm.value.Prop1_Manufacturer.trim());
      formData.append("Prop2_Manufacturer", this.createPostingForm.value.Prop2_Manufacturer.trim());
      formData.append("Number_of_Blades", this.createPostingForm.value.Number_of_Blades.trim());
      formData.append("Prop_Notes", this.createPostingForm.value.Prop_Notes.trim());
      formData.append("Prop1_Overhaul_Time", this.createPostingForm.value.Prop1_Overhaul_Time.trim());
      formData.append("Prop1_Model", this.createPostingForm.value.Prop1_Model.trim());
      formData.append("Prop2_Overhaul_Time", this.createPostingForm.value.Prop2_Overhaul_Time.trim());
      formData.append("Prop2_Model", this.createPostingForm.value.Prop2_Model.trim());
      formData.append("Avionics_Packaging", this.createPostingForm.value.Avionics_Packaging.trim());
      formData.append("ADSB_Equipped", this.createPostingForm.value.ADSB_Equipped.trim());
      formData.append("WAAS", this.createPostingForm.value.WAAS.trim());
      formData.append("LPV", this.createPostingForm.value.LPV.trim());
      formData.append("SVT", this.createPostingForm.value.SVT.trim());
      formData.append("Avionics_Radios", this.createPostingForm.value.Avionics_Radios.trim());
      formData.append("Additional_Equipment", this.createPostingForm.value.Additional_Equipment.trim());
      formData.append("Known_Ice", this.createPostingForm.value.Known_Ice.trim());
      formData.append("Year_Painted", this.createPostingForm.value.Year_Painted.trim());
      formData.append("Exterior_Notes", this.createPostingForm.value.Exterior_Notes.trim());
      formData.append("Interior_Notes", this.createPostingForm.value.Interior_Notes.trim());
      formData.append("Year_Interior", this.createPostingForm.value.Year_Interior.trim());
      formData.append("Configuration", this.createPostingForm.value.Configuration.trim());
      formData.append("Lavatory", this.createPostingForm.value.Lavatory.trim());
      formData.append("Lavatory_Configuration", this.createPostingForm.value.Lavatory_Configuration.trim());
      formData.append("Modifications", this.createPostingForm.value.Modifications.trim());
      formData.append("Inspection_Status", this.createPostingForm.value.Inspection_Status.trim());
      formData.append("Airworthy", this.createPostingForm.value.Airworthy.trim());
      formData.append("Insurance", this.createPostingForm.value.Insurance.trim());
      formData.append("Operating_Costs", this.createPostingForm.value.Operating_Costs.trim());
      formData.append("Financing", this.createPostingForm.value.Financing.trim());

      //New Fields added
      formData.append("Year", this.createPostingForm.value.Year.trim());
      formData.append("Role", this.createPostingForm.value.Role.trim());
      formData.append("First_flight", this.createPostingForm.value.First_flight.trim());
      formData.append("Number_built", this.createPostingForm.value.Number_built.trim());
      formData.append("Specifications", this.createPostingForm.value.Specifications.trim());
      formData.append("Technical_Specifications", this.createPostingForm.value.Technical_Specifications.trim());
      formData.append("Capacity", this.createPostingForm.value.Capacity.trim());
      formData.append("Mass_Empty", this.createPostingForm.value.Mass_Empty.trim());
      formData.append("Maximum_Take_Off_Weight", this.createPostingForm.value.Maximum_Take_Off_Weight.trim());
      formData.append("Maximum_baggage_load", this.createPostingForm.value.Maximum_baggage_load.trim());
      formData.append("Fuel_type", this.createPostingForm.value.Fuel_type.trim());
      formData.append("Fuel_capacity", this.createPostingForm.value.Fuel_capacity.trim());
      formData.append("Drive_mode", this.createPostingForm.value.Drive_mode.trim());
      formData.append("Max_speed", this.createPostingForm.value.Max_speed.trim());
      formData.append("Top_speed_acceleration", this.createPostingForm.value.Top_speed_acceleration.trim());
      formData.append("Engine_power", this.createPostingForm.value.Engine_power.trim());
      formData.append("Dimensions", this.createPostingForm.value.Dimensions.trim());
      formData.append("Range", this.createPostingForm.value.Range.trim());
      formData.append("Range_flight", this.createPostingForm.value.Range_flight.trim());
      formData.append("Flight_mode", this.createPostingForm.value.Flight_mode.trim());
      formData.append("Economic_cruise_speed", this.createPostingForm.value.Economic_cruise_speed.trim());
      formData.append("Rotor_diameter", this.createPostingForm.value.Rotor_diameter.trim());
      formData.append("Maximum_altitude", this.createPostingForm.value.Maximum_altitude.trim());
      formData.append("Take_off_distance", this.createPostingForm.value.Take_off_distance.trim());
      formData.append("Landing_rol_distance", this.createPostingForm.value.Landing_rol_distance.trim());
      formData.append("Seats", this.createPostingForm.value.Seats.trim());
      formData.append("Airframe", this.createPostingForm.value.Airframe.trim());
      formData.append("Engine_2", this.createPostingForm.value.Engine_2.trim());
      formData.append("Engine_Program", this.createPostingForm.value.Engine_Program.trim());
      formData.append("Props", this.createPostingForm.value.Props.trim());
      formData.append("Avionics", this.createPostingForm.value.Avionics.trim());
      formData.append("Exterior", this.createPostingForm.value.Exterior.trim());
      formData.append("Interior", this.createPostingForm.value.Interior.trim());
      formData.append("Modifications_Conversions", this.createPostingForm.value.Modifications_Conversions.trim());
      formData.append("Aircraft_Highlights", this.createPostingForm.value.Aircraft_Highlights.trim());
      formData.append("Registration_number", this.createPostingForm.value.Registration_number.trim());
      formData.append("No_Seats", this.createPostingForm.value.No_Seats.trim());
      formData.append("Engine_Notes", this.createPostingForm.value.Engine_Notes.trim());
      formData.append("Hot_Section_Time", this.createPostingForm.value.Hot_Section_Time.trim());
      formData.append("Engine_Time", this.createPostingForm.value.Engine_Time.trim());
      formData.append("Cycles_TBO", this.createPostingForm.value.Cycles_TBO.trim());
      formData.append("Make_Model", this.createPostingForm.value.Make_Model.trim());
      formData.append("Flight_Deck_Model", this.createPostingForm.value.Flight_Deck_Model.trim());
      formData.append("Flight_Deck_Manufacturer", this.createPostingForm.value.Flight_Deck_Manufacturer.trim());
      formData.append("ADS_B_Equipped", this.createPostingForm.value.ADS_B_Equipped.trim());
      formData.append("Galley", this.createPostingForm.value.Galley.trim());
      formData.append("Galley_Configuration", this.createPostingForm.value.Galley_Configuration.trim());
      formData.append("Flight_Ready", this.createPostingForm.value.Flight_Ready.trim());
      formData.append("Service_Logs", this.createPostingForm.value.Service_Logs.trim());
      formData.append("Brochure", this.createPostingForm.value.Brochure.trim());
      formData.append("Engines", this.createPostingForm.value.Engines.trim());
      formData.append("Time", this.createPostingForm.value.Time.trim());
      formData.append("Auxiliary_Power_Unit", this.createPostingForm.value.Auxiliary_Power_Unit.trim());
      formData.append("APU_Time", this.createPostingForm.value.APU_Time.trim());
      formData.append("APU_Maintenance_Program", this.createPostingForm.value.APU_Maintenance_Program.trim());
      formData.append("APU_Notes", this.createPostingForm.value.APU_Notes.trim());
      formData.append("Engine_1", this.createPostingForm.value.Engine_1.trim());
      formData.append("Fuselage_length", this.createPostingForm.value.Overall_height.trim());
      formData.append("Wingspan", this.createPostingForm.value.Wingspan.trim());
      formData.append("Tip_to_tip_distance", this.createPostingForm.value.Tip_to_tip_distance.trim());
      formData.append("Empty_weight", this.createPostingForm.value.Empty_weight.trim());
      formData.append("Max_gross_takeoff_wt", this.createPostingForm.value.Max_gross_takeoff_wt.trim());
      formData.append("cruise_speed", this.createPostingForm.value.cruise_speed.trim());
      formData.append("Lift_Propulsors", this.createPostingForm.value.Lift_Propulsors.trim());
      formData.append("Motor_output", this.createPostingForm.value.Motor_output.trim());
      formData.append("Power_type", this.createPostingForm.value.Power_type.trim());
      formData.append("Passenger_capacity", this.createPostingForm.value.Passenger_capacity.trim());
      formData.append("Address", this.createPostingForm.value.Address.trim());
      formData.append("No_Blades", this.createPostingForm.value.No_Blades.trim());
      formData.append("Manufacturer_Model", this.createPostingForm.value.Manufacturer_Model.trim());
      formData.append("Overhaul_Time", this.createPostingForm.value.Overhaul_Time.trim());
      formData.append("Flying_Cars_Status", this.createPostingForm.value.Flying_Cars_Status.trim());
      formData.append("Dimension_flight_lwh", this.createPostingForm.value.Dimension_flight_lwh.trim());
      formData.append("Maximum_Speed_flightmode", this.createPostingForm.value.Maximum_Speed_flightmode.trim());
      formData.append("Engine_Power_flightmode", this.createPostingForm.value.Engine_Power_flightmode.trim());
      formData.append("fractional_share_choice_percentage_or_unit", this.createPostingForm.value.fractional_share_choice_percentage_or_unit);
      formData.append("fractional_share_text_percentage_or_unit", this.createPostingForm.value.fractional_share_text_percentage_or_unit);
      formData.append("offering_Price_fractional_ownership", this.createPostingForm.value.offering_Price_fractional_ownership);
      if (this.createPostingForm.value.purpose === "No Ready") {
        formData.append("listing_show_on_wepo", 'No');
      } else {
        formData.append("listing_show_on_wepo", 'Yes');
      }
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
        this.UserService.UpdateListingAircraft(formData, this.getParamsId).subscribe(result => {
          this.loading = false;
          //console.log("result : ", result);
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // location.reload();
            // this.router.navigate(['/all-listing']);
            location.href = "my-portfolio"
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
        formData.append("created_by", "WeCoOwn");
        this.UserService.CreateAircraftListing(formData).subscribe(result => {
          //console.log("result : ", result);
          this.loading = false;
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // localStorage.setItem('JetAircraftCurrentSerialNumber', JSON.stringify((result['Form_Serial_Number'] + 1)));
            // location.reload();
            // this.router.navigate(['/all-listing']);
            location.href = "my-portfolio"
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