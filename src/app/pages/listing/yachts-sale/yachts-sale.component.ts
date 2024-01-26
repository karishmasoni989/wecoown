import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../../service/country-state-city.service';
@Component({
  selector: 'app-yachts-sale',
  templateUrl: './yachts-sale.component.html',
  styleUrls: ['./yachts-sale.component.css']
})
export class YachtsSaleComponent implements OnInit {
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
  // Useful_Load: any;
  // Max_Takeoff_Weight: any;
  // Fuel_Capacity_Volume: any;
  Engine_1: any;
  Engine1_Year_Built: any;
  Engine2_Brand: any;
  Engine1_Type: any;
  Description: any;
  address_line1: any;
  address_line2: any;
  city: any;
  state: any;
  country: any;
  zipcode: any;
  landmark: any;
  yachts_type: any;
  yachts_subtype: any;
  Boat_Name: any;
  Builder: any;
  Designer: any;
  Hull_Shape: any;
  Hull_Material: any;
  LOA: any;
  Beam: any;
  Maximum_Draft: any;
  Dry_Weight: any;
  Total_Power: any;
  Cruising_Speed: any;
  Maximum_Speed: any;
  Engine1_Brand: any;
  Engine1_Model: any;
  percentage_leased: any;
  Engine_2: any;
  parking: any;
  tenancy: any;
  building_height: any;
  floors: any;
  typical_floor_size: any;
  building_far: any;
  land_acres: any;
  slab_to_slab: any;
  Engine2_Year_Built: any;
  Engine2_Type: any;
  Engine2_Model: any;
  Fuel_Tanks: any;
  Seating_Capacity: any;
  Number_of_heads: any;
  Number_of_twin_berths: any;
  subpropertyType: any;
  Covers: any;
  Number_of_double_berths: any;
  Number_of_cabins: any;
  Number_of_bathrooms: any;
  Exterior_Features_and_Equipment: any;
  Features: any;
  Electronics: any;
  Inside_Equipment: any;
  Electrical_Equipment: any;
  Outside_Equipment_Extras: any;
  Electronics_Navigation_Equipment: any;
  Navigation_quipment: any;
  Audio_Visual_Communication: any;
  Interior_Features: any;
  Year: any;
  Length: any;
  Located_In: any;
  wePo: any;
  Propulsion_options: any;
  Disclaimer: any;
  Current_Price: any;
  zoning: any;
  // Airworthy: any;
  // Insurance: any;
  // Operating_Costs: any;
  // Financing: any;
  Engine1_Fuel_Type: any;
  Engine1_Power: any;
  Engine1_Engine_Hours: any;
  Engine1_Drive_Type: any;
  Engine2_Fuel_Type: any;
  Engine2_Power: any;
  Engine2_Engine_Hours: any;
  Engine2_Drive_Type: any;
  purpose: any;
  Tittle_Name: any;
  Serial_Number: any;
  getCurrentSerialNumber: string | Blob;
  prevuiousPdf: any;
  selling_price: any;
  draft: any;
  Staterooms: any;
  engine_make: any;
  Fresh_Water: any;
  Holding: any;
  Overview: any;
  Refit: any;
  Construction: any;
  Concept_And_Design: any;
  Rigging_And_Sails: any;
  Exterior_Layout: any;
  Generators_and_Electricity: any;
  A_C: any;
  Chargers: any;
  Main_Deck: any;
  starboard_hull: any;
  port_hull: any;
  Vessel_name: any;
  Vessel_type: any;
  Constructed: any;
  Refitted: any;
  No_of_engines: any;
  Name: any;
  built_year: any;
  Mainly_Used_For: any;
  Licence: any;
  Hydraulics: any;
  other_information: any;
  Hours: any;
  Displacement: any;
  Single_Berths: any;
  Upgrades_and_Features: any;
  Detailed_Specification: any;
  Interior_Accommodations_Layout: any;
  His_and_Her_Master_Bath: any;
  Main_Salon: any;
  Dining_Area: any;
  Main_Foyer: any;
  Galley: any;
  Mechanical_Equipment: any;
  Max_Passengers: any;
  Rigger: any;
  Mast_material: any;
  Mast_heights_over_deck: any;
  Sails: any;
  Asymmetric_balloon: any;
  Genoa_sail: any;
  Stay_sail: any;
  Main_sail: any;
  General: any;
  Owner_and_Guest: any;
  Deck_Area: any;
  Crew: any;
  Winter_Maintenance_10_Year_Abs_Details: any;
  Manufacturer: any;
  Mooring_Country: any;
  Currency: any;
  Condition: any;
  Operating_Depth: any;
  Size: any;
  Emergency_Endurance: any;
  Class: any;
  Support: any;
  Categories: any;
  Subcategory: any;
  Autonomy: any;
  top_speed: any;
  range: any;
  guest_cabin: any;
  Naval_Architect: any;
  Length_Overall: any;
  Length_at_Waterline: any;
  Max_Draught: any;
  Gross_Tonnage: any;
  Displacement_Tonnage: any;
  Hull_Number: any;
  Hull_Type: any;
  Number_of_Decks: any;
  MCA_Compliant: any;
  Water_Capacity: any;
  Superstructure: any;
  Deck: any;
  Guests: any;
  Passenger_Rooms: any;
  Master_Rooms: any;
  Twin_Rooms: any;
  VIP_Rooms: any;
  Engines: any;
  Make: any;
  Model: any;
  Fuel: any;
  Drive_Type: any;
  Specification: any;
  Max_Draft: any;
  Cabins: any;
  Heads: any;
  Plumbing: any;
  Electricity: any;
  Generators: any;
  Entertainment_And_Electronics: any;
  interior_layout: any;
  property_address: any;
  tanks_features: any;
  Accommodation: any;
  Audio_visual: any;
  communication: any;
  Interior_Exterior_Features_Equipment: any;
  Inside_Equipment_Outside_Equipment: any;
  Yachts_Ships_Highlights: any;
  Specifications: any;
  Engine_model: any;
  Engine_power: any;
  Location: any;
  Build_Year: any;
  Additional_Details: any;
  Hull: any;
  Electrical: any;
  Power: any;
  Everything: any;
  walk_through: any;
  Electronics_Navigation_AV_Equipment: any;
  General_Highlights: any;
  Dimensions: any;
  Yacht_Type: any;
  Yacht_Subtype: any;
  Exterior_Designer: any;
  Interior_Designer: any;
  Performance_and_Capacities: any;
  Materials: any;
  Engines_Plumbing_Hydraulic_And_Electricity: any;
  Boat_Name_Tanks_Features: any;
  Electronics_Covers_Audio_Visual_Communication: any;
  Electrical_Electronics_Navigation_Equipment: any;
  Type: any;
  Year_built: any;
  Passengers: any;
  Fuel_Capacity: any;
  fractional_share_choice_percentage_or_unit: string;
  fractional_share_text_percentage_or_unit: any;
  offering_Price_fractional_ownership: any;
  price: any;
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
    $('.catamarans').hide();
    $('.commercialShips').hide();
    $('.fishingBoats').hide();
    $('.hydroplanes').hide();
    $('.powerYachts').hide();
    $('.sailboats').hide();
    $('.speedBoats').hide();
    $('.submarines').hide();
    $('.superYachts').hide();
    //$('.general').hide();
    this.country = "";
    this.state = "";
    this.city = "";
    this.yachts_type = "Yachts & Ships";
    this.yachts_subtype = "";
    this.purpose = "";
    this.fractional_share_choice_percentage_or_unit = "";
    this.getParamsId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.getParamsName = this.activatedRoute.snapshot.queryParamMap.get('name');
    this.checkmembership();
    this.getRealEstateCount();
    this.getPropertyType();
    this.getDataPostById();
    this.createPostingForm = new FormGroup({
      Description: new FormControl(''),
      serial: new FormControl(),
      links: new FormControl(''),
      purpose: new FormControl(''),
      Tittle_Name: new FormControl(''),
      selling_price: new FormControl(''),
      address_line1: new FormControl(''),
      address_line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      zipcode: new FormControl(''),
      landmark: new FormControl(''),
      price: new FormControl(''),

      yachts_type: new FormControl(''),
      yachts_subtype: new FormControl(''),
      Boat_Name: new FormControl(''),
      Builder: new FormControl(''),
      Designer: new FormControl(''),
      Hull_Shape: new FormControl(''),
      Hull_Material: new FormControl(''),
      LOA: new FormControl(''),
      Beam: new FormControl(''),
      Maximum_Draft: new FormControl(''),
      Dry_Weight: new FormControl(''),
      Total_Power: new FormControl(''),
      Cruising_Speed: new FormControl(''),
      Maximum_Speed: new FormControl(),
      // property facts
      // Max_Takeoff_Weight: new FormControl(''),
      // Useful_Load: new FormControl(''),
      // Fuel_Capacity_Volume: new FormControl(''),

      Engine_1: new FormControl(''),
      Engine1_Brand: new FormControl(''),
      Engine1_Year_Built: new FormControl(''),
      Engine1_Type: new FormControl(''),
      Engine1_Model: new FormControl(''),
      Engine1_Fuel_Type: new FormControl(''),
      Engine1_Power: new FormControl(''),
      Engine1_Engine_Hours: new FormControl(''),
      Engine1_Drive_Type: new FormControl(''),
      Engine_2: new FormControl(''),
      Engine2_Brand: new FormControl(''),

      Engine2_Year_Built: new FormControl(''),
      Engine2_Type: new FormControl(''),
      Engine2_Model: new FormControl(''),
      Engine2_Fuel_Type: new FormControl(''),
      Engine2_Power: new FormControl(''),
      Engine2_Engine_Hours: new FormControl(''),
      Engine2_Drive_Type: new FormControl(''),
      Fuel_Tanks: new FormControl(''),
      Seating_Capacity: new FormControl(''),
      Number_of_heads: new FormControl(''),
      Number_of_twin_berths: new FormControl(''),
      Number_of_double_berths: new FormControl(''),
      Number_of_cabins: new FormControl(''),
      Number_of_bathrooms: new FormControl(''),
      Exterior_Features_and_Equipment: new FormControl(''),
      Features: new FormControl(''),
      Electronics: new FormControl(''),
      Inside_Equipment: new FormControl(''),
      Electrical_Equipment: new FormControl(''),
      Outside_Equipment_Extras: new FormControl(''),
      Covers: new FormControl(''),
      Electronics_Navigation_Equipment: new FormControl(''),
      Navigation_quipment: new FormControl(''),
      Audio_Visual_Communication: new FormControl(''),
      Interior_Features: new FormControl(''),
      Year: new FormControl(''),
      Length: new FormControl(''),
      Located_In: new FormControl(''),
      wePo: new FormControl(''),
      Propulsion_options: new FormControl(''),
      Disclaimer: new FormControl(''),
      Current_Price: new FormControl(''),
      zoning: new FormControl(''),
      //New Fields added
      draft: new FormControl(''),
      Staterooms: new FormControl(''),
      engine_make: new FormControl(''),
      Fresh_Water: new FormControl(''),
      Holding: new FormControl(''),
      Overview: new FormControl(''),
      Refit: new FormControl(''),
      Construction: new FormControl(''),
      Concept_And_Design: new FormControl(''),
      Rigging_And_Sails: new FormControl(''),
      Exterior_Layout: new FormControl(''),
      Generators_and_Electricity: new FormControl(''),
      A_C: new FormControl(''),
      Chargers: new FormControl(''),
      Main_Deck: new FormControl(''),
      starboard_hull: new FormControl(''),
      port_hull: new FormControl(''),
      Vessel_name: new FormControl(''),
      Vessel_type: new FormControl(''),
      Constructed: new FormControl(''),
      Refitted: new FormControl(''),
      No_of_engines: new FormControl(''),
      Name: new FormControl(''),
      built_year: new FormControl(''),
      Mainly_Used_For: new FormControl(''),
      Licence: new FormControl(''),
      Hydraulics: new FormControl(''),
      other_information: new FormControl(''),
      Hours: new FormControl(''),
      Displacement: new FormControl(''),
      Single_Berths: new FormControl(''),
      Upgrades_and_Features: new FormControl(''),
      Detailed_Specification: new FormControl(''),
      Interior_Accommodations_Layout: new FormControl(''),
      His_and_Her_Master_Bath: new FormControl(''),
      Main_Salon: new FormControl(''),
      Dining_Area: new FormControl(''),
      Main_Foyer: new FormControl(''),
      Galley: new FormControl(''),
      Mechanical_Equipment: new FormControl(''),
      Max_Passengers: new FormControl(''),
      Rigger: new FormControl(''),
      Mast_material: new FormControl(''),
      Mast_heights_over_deck: new FormControl(''),
      Sails: new FormControl(''),
      Asymmetric_balloon: new FormControl(''),
      Genoa_sail: new FormControl(''),
      Stay_sail: new FormControl(''),
      Main_sail: new FormControl(''),
      General: new FormControl(''),
      Owner_and_Guest: new FormControl(''),
      Deck_Area: new FormControl(''),
      Crew: new FormControl(''),
      Winter_Maintenance_10_Year_Abs_Details: new FormControl(''),
      Manufacturer: new FormControl(''),
      Mooring_Country: new FormControl(''),
      Currency: new FormControl(''),
      Condition: new FormControl(''),
      Operating_Depth: new FormControl(''),
      Size: new FormControl(''),
      Emergency_Endurance: new FormControl(''),
      Class: new FormControl(''),
      Support: new FormControl(''),
      Categories: new FormControl(''),
      Subcategory: new FormControl(''),
      Autonomy: new FormControl(''),
      top_speed: new FormControl(''),
      range: new FormControl(''),
      guest_cabin: new FormControl(''),
      Naval_Architect: new FormControl(''),
      Length_Overall: new FormControl(''),
      Length_at_Waterline: new FormControl(''),
      Max_Draught: new FormControl(''),
      Gross_Tonnage: new FormControl(''),
      Displacement_Tonnage: new FormControl(''),
      Hull_Number: new FormControl(''),
      Hull_Type: new FormControl(''),
      Number_of_Decks: new FormControl(''),
      MCA_Compliant: new FormControl(''),
      Water_Capacity: new FormControl(''),
      Superstructure: new FormControl(''),
      Deck: new FormControl(''),
      Guests: new FormControl(''),
      Passenger_Rooms: new FormControl(''),
      Master_Rooms: new FormControl(''),
      Twin_Rooms: new FormControl(''),
      VIP_Rooms: new FormControl(''),
      Engines: new FormControl(''),
      Make: new FormControl(''),
      Model: new FormControl(''),
      Fuel: new FormControl(''),
      Drive_Type: new FormControl(''),
      Specification: new FormControl(''),
      Max_Draft: new FormControl(''),
      Cabins: new FormControl(''),
      Heads: new FormControl(''),
      Plumbing: new FormControl(''),
      Electricity: new FormControl(''),
      Generators: new FormControl(''),
      Entertainment_And_Electronics: new FormControl(''),
      interior_layout: new FormControl(''),
      property_address: new FormControl(''),
      tanks_features: new FormControl(''),
      Accommodation: new FormControl(''),
      Audio_visual: new FormControl(''),
      communication: new FormControl(''),
      Interior_Exterior_Features_Equipment: new FormControl(''),
      Inside_Equipment_Outside_Equipment: new FormControl(''),
      Yachts_Ships_Highlights: new FormControl(''),
      Specifications: new FormControl(''),
      Engine_model: new FormControl(''),
      Engine_power: new FormControl(''),
      Location: new FormControl(''),
      Build_Year: new FormControl(''),
      Additional_Details: new FormControl(''),
      Hull: new FormControl(''),
      Electrical: new FormControl(''),
      Power: new FormControl(''),
      Everything: new FormControl(''),
      walk_through: new FormControl(''),
      Electronics_Navigation_AV_Equipment: new FormControl(''),
      General_Highlights: new FormControl(''),
      Dimensions: new FormControl(''),
      Yacht_Type: new FormControl(''),
      Yacht_Subtype: new FormControl(''),
      Exterior_Designer: new FormControl(''),
      Interior_Designer: new FormControl(''),
      Performance_and_Capacities: new FormControl(''),
      Materials: new FormControl(''),
      Engines_Plumbing_Hydraulic_And_Electricity: new FormControl(''),
      Boat_Name_Tanks_Features: new FormControl(''),
      Electronics_Covers_Audio_Visual_Communication: new FormControl(''),
      Electrical_Electronics_Navigation_Equipment: new FormControl(''),
      Type: new FormControl(''),
      Year_built: new FormControl(''),
      Passengers: new FormControl(''),
      Fuel_Capacity: new FormControl(''),
      fractional_share_choice_percentage_or_unit: new FormControl(''),
      fractional_share_text_percentage_or_unit: new FormControl(''),
      offering_Price_fractional_ownership: new FormControl(''),
      // Airworthy: new FormControl(''),
      // Insurance: new FormControl(''),
      // Operating_Costs: new FormControl(''),
      // Financing: new FormControl(''),
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
    this.UserService.getYachtsAllCount().subscribe(result => {
      this.loading = false;
      let getStr1 = JSON.stringify(10001);
      if (result['count'] == undefined) {
        this.getCurrentSerialNumber = JSON.parse(getStr1);
      } else {
        this.getCurrentSerialNumber = (10001 + result['count']);
      }
    });
  }

  changeSubCategory(item) {
    //$('.general').show();
    if (item == "Catamarans") {
      $('.commercialShips').hide();
      $('.fishingBoats').hide();
      $('.hydroplanes').hide();
      $('.powerYachts').hide();
      $('.sailboats').hide();
      $('.speedBoats').hide();
      $('.submarines').hide();
      $('.superYachts').hide();
      $('.catamarans').show();
    } else if (item == "Commercial Ships") {
      $('.catamarans').hide();
      $('.fishingBoats').hide();
      $('.hydroplanes').hide();
      $('.powerYachts').hide();
      $('.sailboats').hide();
      $('.speedBoats').hide();
      $('.submarines').hide();
      $('.superYachts').hide();
      $('.commercialShips').show();
    } else if (item == "Fishing Boats") {
      $('.commercialShips').hide();
      $('.catamarans').hide();
      $('.hydroplanes').hide();
      $('.powerYachts').hide();
      $('.sailboats').hide();
      $('.speedBoats').hide();
      $('.submarines').hide();
      $('.superYachts').hide();
      $('.fishingBoats').show();
    } else if (item == "Hydroplanes") {
      $('.commercialShips').hide();
      $('.fishingBoats').hide();
      $('.catamarans').hide();
      $('.powerYachts').hide();
      $('.sailboats').hide();
      $('.speedBoats').hide();
      $('.submarines').hide();
      $('.superYachts').hide();
      $('.hydroplanes').show();
    } else if (item == "Power Yachts") {
      $('.commercialShips').hide();
      $('.fishingBoats').hide();
      $('.hydroplanes').hide();
      $('.catamarans').hide();
      $('.sailboats').hide();
      $('.speedBoats').hide();
      $('.submarines').hide();
      $('.superYachts').hide();
      $('.powerYachts').show();
    } else if (item == "Sail Boats") {
      $('.commercialShips').hide();
      $('.fishingBoats').hide();
      $('.hydroplanes').hide();
      $('.powerYachts').hide();
      $('.catamarans').hide();
      $('.speedBoats').hide();
      $('.submarines').hide();
      $('.superYachts').hide();
      $('.sailboats').show();
    }
    else if (item == "Speed Boats") {
      $('.commercialShips').hide();
      $('.fishingBoats').hide();
      $('.hydroplanes').hide();
      $('.powerYachts').hide();
      $('.catamarans').hide();
      $('.submarines').hide();
      $('.superYachts').hide();
      $('.sailboats').hide();
      $('.speedBoats').show();
    }
    else if (item == "Submarines") {
      $('.commercialShips').hide();
      $('.fishingBoats').hide();
      $('.hydroplanes').hide();
      $('.powerYachts').hide();
      $('.catamarans').hide();
      $('.speedBoats').hide();
      $('.superYachts').hide();
      $('.sailboats').hide();
      $('.submarines').show();
    }
    else if (item == "Super Yachts") {
      $('.commercialShips').hide();
      $('.fishingBoats').hide();
      $('.hydroplanes').hide();
      $('.powerYachts').hide();
      $('.catamarans').hide();
      $('.speedBoats').hide();
      $('.submarines').hide();
      $('.sailboats').hide();
      $('.superYachts').show();
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
      property_type: 'Yachts & Ships'
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
          if (this.getData[0].yachts_subtype == "Catamarans") {
            $('.catamarans').show();
          } else if (this.getData[0].yachts_subtype == "Commercial Ships") {
            $('.commercialShips').show();
          } else if (this.getData[0].yachts_subtype == "Fishing Boats") {
            $('.fishingBoats').show();
          } else if (this.getData[0].yachts_subtype == "Hydroplanes") {
            $('.hydroplanes').show();
          } else if (this.getData[0].yachts_subtype == "Power Yachts") {
            $('.powerYachts').show();
          } else if (this.getData[0].yachts_subtype == "Sail Boats") {
            $('.sailboats').show();
          } else if (this.getData[0].yachts_subtype == "Speed Boats") {
            $('.speedBoats').show();
          } else if (this.getData[0].yachts_subtype == "Submarines") {
            $('.submarines').show();
          } else if (this.getData[0].yachts_subtype == "Super Yachts") {
            $('.superYachts').show();
          }
          this.getPhtosALL = this.getData[0].property_photos;
          this.Description = this.getData[0].Description;
          this.links = this.getData[0].links;
          this.Serial_Number = this.getData[0].Serial_Number;
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
          this.yachts_type = this.getData[0].yachts_type;
          this.yachts_subtype = this.getData[0].yachts_subtype;
          this.Boat_Name = this.getData[0].Boat_Name;
          this.Builder = this.getData[0].Builder;
          this.Designer = this.getData[0].Designer;
          this.Hull_Shape = this.getData[0].Hull_Shape;
          this.Hull_Material = this.getData[0].Hull_Material;
          this.LOA = this.getData[0].LOA;
          this.Beam = this.getData[0].Beam;
          this.Maximum_Draft = this.getData[0].Maximum_Draft;
          this.price = this.getData[0].price;
          this.Dry_Weight = this.getData[0].Dry_Weight;
          this.Total_Power = this.getData[0].Total_Power;
          this.Cruising_Speed = this.getData[0].Cruising_Speed;
          this.Maximum_Speed = this.getData[0].Maximum_Speed;

          // property facts
          // this.Max_Takeoff_Weight = this.getData[0].Max_Takeoff_Weight;
          // this.Useful_Load = this.getData[0].Useful_Load;
          // this.Fuel_Capacity_Volume = this.getData[0].Fuel_Capacity_Volume;
          this.Engine_1 = this.getData[0].Engine_1;
          this.Engine1_Brand = this.getData[0].Engine1_Brand;
          this.Engine1_Year_Built = this.getData[0].Engine1_Year_Built;
          this.Engine1_Type = this.getData[0].Engine1_Type;
          this.Engine1_Model = this.getData[0].Engine1_Model;
          this.Engine1_Fuel_Type = this.getData[0].Engine1_Fuel_Type;
          this.Engine1_Power = this.getData[0].Engine1_Power;
          this.Engine1_Engine_Hours = this.getData[0].Engine1_Engine_Hours;
          this.Engine1_Drive_Type = this.getData[0].Engine1_Drive_Type;
          this.Engine_2 = this.getData[0].Engine_2;
          this.Engine2_Brand = this.getData[0].Engine2_Brand;


          this.Engine2_Year_Built = this.getData[0].Engine2_Year_Built;
          this.Engine2_Type = this.getData[0].Engine2_Type;
          this.Engine2_Model = this.getData[0].Engine2_Model;
          this.Engine2_Fuel_Type = this.getData[0].Engine2_Fuel_Type;
          this.Engine2_Power = this.getData[0].Engine2_Power;
          this.Engine2_Engine_Hours = this.getData[0].Engine2_Engine_Hours;
          this.Engine2_Drive_Type = this.getData[0].Engine2_Drive_Type;
          this.Fuel_Tanks = this.getData[0].Fuel_Tanks;
          this.Seating_Capacity = this.getData[0].Seating_Capacity;
          this.Number_of_heads = this.getData[0].Number_of_heads;
          this.Number_of_twin_berths = this.getData[0].Number_of_twin_berths;
          this.Number_of_double_berths = this.getData[0].Number_of_double_berths;
          this.Number_of_cabins = this.getData[0].Number_of_cabins;
          this.Number_of_bathrooms = this.getData[0].Number_of_bathrooms;
          this.Exterior_Features_and_Equipment = this.getData[0].Exterior_Features_and_Equipment;
          this.Features = this.getData[0].Features;
          this.Electronics = this.getData[0].Electronics;
          this.Inside_Equipment = this.getData[0].Inside_Equipment;
          this.Electrical_Equipment = this.getData[0].Electrical_Equipment;
          this.Outside_Equipment_Extras = this.getData[0].Outside_Equipment_Extras;
          this.Covers = this.getData[0].Covers;
          this.Electronics_Navigation_Equipment = this.getData[0].Electronics_Navigation_Equipment;
          this.Navigation_quipment = this.getData[0].Navigation_quipment;
          this.Audio_Visual_Communication = this.getData[0].Audio_Visual_Communication;
          this.Interior_Features = this.getData[0].Interior_Features;
          this.Year = this.getData[0].Year;
          this.Length = this.getData[0].Length;
          this.Located_In = this.getData[0].Located_In;
          this.wePo = this.getData[0].wePo;
          this.Propulsion_options = this.getData[0].Propulsion_options;
          this.Disclaimer = this.getData[0].Disclaimer;
          this.Current_Price = this.getData[0].Current_Price;
          this.zoning = this.getData[0].zoning;
          this.prevuiousPdf = this.getData[0].pdf_doc;

          // New Fields added
          this.draft = this.getData[0].draft;
          this.Staterooms = this.getData[0].Staterooms;
          this.engine_make = this.getData[0].engine_make;
          this.Fresh_Water = this.getData[0].Fresh_Water;
          this.Holding = this.getData[0].Holding;
          this.Overview = this.getData[0].Overview;
          this.Refit = this.getData[0].Refit;
          this.Construction = this.getData[0].Construction;
          this.Concept_And_Design = this.getData[0].Concept_And_Design;
          this.Rigging_And_Sails = this.getData[0].Rigging_And_Sails;
          this.Exterior_Layout = this.getData[0].Exterior_Layout;
          this.Generators_and_Electricity = this.getData[0].Generators_and_Electricity;
          this.A_C = this.getData[0].A_C;
          this.Chargers = this.getData[0].Chargers;
          this.Main_Deck = this.getData[0].Main_Deck;
          this.starboard_hull = this.getData[0].starboard_hull;
          this.port_hull = this.getData[0].port_hull;
          this.Vessel_name = this.getData[0].Vessel_name;
          this.Vessel_type = this.getData[0].Vessel_type;
          this.Constructed = this.getData[0].Constructed;
          this.Refitted = this.getData[0].Refitted;
          this.No_of_engines = this.getData[0].No_of_engines;
          this.Name = this.getData[0].Name;
          this.built_year = this.getData[0].built_year;
          this.Mainly_Used_For = this.getData[0].Mainly_Used_For;
          this.Licence = this.getData[0].Licence;
          this.Hydraulics = this.getData[0].Hydraulics;
          this.other_information = this.getData[0].other_information;
          this.Hours = this.getData[0].Hours;
          this.Displacement = this.getData[0].Displacement;
          this.Single_Berths = this.getData[0].Single_Berths;
          this.Upgrades_and_Features = this.getData[0].Upgrades_and_Features;
          this.Detailed_Specification = this.getData[0].Detailed_Specification;
          this.Interior_Accommodations_Layout = this.getData[0].Interior_Accommodations_Layout;
          this.His_and_Her_Master_Bath = this.getData[0].His_and_Her_Master_Bath;
          this.Main_Salon = this.getData[0].Main_Salon;
          this.Dining_Area = this.getData[0].Dining_Area;
          this.Main_Foyer = this.getData[0].Main_Foyer;
          this.Galley = this.getData[0].Galley;
          this.Mechanical_Equipment = this.getData[0].Mechanical_Equipment;
          this.Max_Passengers = this.getData[0].Max_Passengers;
          this.Rigger = this.getData[0].Rigger;
          this.Mast_material = this.getData[0].Mast_material;
          this.Mast_heights_over_deck = this.getData[0].Mast_heights_over_deck;
          this.Sails = this.getData[0].Sails;
          this.Asymmetric_balloon = this.getData[0].Asymmetric_balloon;
          this.Genoa_sail = this.getData[0].Genoa_sail;
          this.Stay_sail = this.getData[0].Stay_sail;
          this.Main_sail = this.getData[0].Main_sail;
          this.General = this.getData[0].General;
          this.Owner_and_Guest = this.getData[0].Owner_and_Guest;
          this.Deck_Area = this.getData[0].Deck_Area;
          this.Crew = this.getData[0].Crew;
          this.Winter_Maintenance_10_Year_Abs_Details = this.getData[0].Winter_Maintenance_10_Year_Abs_Details;
          this.Manufacturer = this.getData[0].Manufacturer;
          this.Mooring_Country = this.getData[0].Mooring_Country;
          this.Currency = this.getData[0].Currency;
          this.Condition = this.getData[0].Condition;
          this.Operating_Depth = this.getData[0].Operating_Depth;
          this.Size = this.getData[0].Size;
          this.Emergency_Endurance = this.getData[0].Emergency_Endurance;
          this.Class = this.getData[0].Class;
          this.Support = this.getData[0].Support;
          this.Categories = this.getData[0].Categories;
          this.Subcategory = this.getData[0].Subcategory;
          this.Autonomy = this.getData[0].Autonomy;
          this.top_speed = this.getData[0].top_speed;
          this.range = this.getData[0].range;
          this.guest_cabin = this.getData[0].guest_cabin;
          this.Naval_Architect = this.getData[0].Naval_Architect;
          this.Length_Overall = this.getData[0].Length_Overall;
          this.Length_at_Waterline = this.getData[0].Length_at_Waterline;
          this.Max_Draught = this.getData[0].Max_Draught;
          this.Gross_Tonnage = this.getData[0].Gross_Tonnage;
          this.Displacement_Tonnage = this.getData[0].Displacement_Tonnage;
          this.Hull_Number = this.getData[0].Hull_Number;
          this.Hull_Type = this.getData[0].Hull_Type;
          this.Number_of_Decks = this.getData[0].Number_of_Decks;
          this.MCA_Compliant = this.getData[0].MCA_Compliant;
          this.Water_Capacity = this.getData[0].Water_Capacity;
          this.Superstructure = this.getData[0].Superstructure;
          this.Deck = this.getData[0].Deck;
          this.Guests = this.getData[0].Guests;
          this.Passenger_Rooms = this.getData[0].Passenger_Rooms;
          this.Master_Rooms = this.getData[0].Master_Rooms;
          this.Twin_Rooms = this.getData[0].Twin_Rooms;
          this.VIP_Rooms = this.getData[0].VIP_Rooms;
          this.Engines = this.getData[0].Engines;
          this.Make = this.getData[0].Make;
          this.Model = this.getData[0].Model;
          this.Fuel = this.getData[0].Fuel;
          this.Drive_Type = this.getData[0].Drive_Type;
          this.Specification = this.getData[0].Specification;
          this.Max_Draft = this.getData[0].Max_Draft;
          this.Cabins = this.getData[0].Cabins;
          this.Heads = this.getData[0].Heads;
          this.Plumbing = this.getData[0].Plumbing;
          this.Electricity = this.getData[0].Electricity;
          this.Generators = this.getData[0].Generators;
          this.Entertainment_And_Electronics = this.getData[0].Entertainment_And_Electronics;
          this.interior_layout = this.getData[0].interior_layout;
          this.property_address = this.getData[0].property_address;
          this.tanks_features = this.getData[0].tanks_features;
          this.Accommodation = this.getData[0].Accommodation;
          this.Audio_visual = this.getData[0].Audio_visual;
          this.communication = this.getData[0].communication;
          this.Interior_Exterior_Features_Equipment = this.getData[0].Interior_Exterior_Features_Equipment;
          this.Inside_Equipment_Outside_Equipment = this.getData[0].Inside_Equipment_Outside_Equipment;
          this.Yachts_Ships_Highlights = this.getData[0].Yachts_Ships_Highlights;
          this.Specifications = this.getData[0].Specifications;
          this.Engine_model = this.getData[0].Engine_model;
          this.Engine_power = this.getData[0].Engine_power;
          this.Location = this.getData[0].Location;
          this.Build_Year = this.getData[0].Build_Year;
          this.Additional_Details = this.getData[0].Additional_Details;
          this.Hull = this.getData[0].Hull;
          this.Electrical = this.getData[0].Electrical;
          this.Power = this.getData[0].Power;
          this.Everything = this.getData[0].Everything;
          this.walk_through = this.getData[0].walk_through;
          this.Electronics_Navigation_AV_Equipment = this.getData[0].Electronics_Navigation_AV_Equipment;
          this.General_Highlights = this.getData[0].General_Highlights;
          this.Dimensions = this.getData[0].Dimensions;
          this.Yacht_Type = this.getData[0].Yacht_Type;
          this.Yacht_Subtype = this.getData[0].Yacht_Subtype;
          this.Exterior_Designer = this.getData[0].Exterior_Designer;
          this.Interior_Designer = this.getData[0].Interior_Designer;
          this.Performance_and_Capacities = this.getData[0].Performance_and_Capacities;
          this.Materials = this.getData[0].Materials;
          this.Engines_Plumbing_Hydraulic_And_Electricity = this.getData[0].Engines_Plumbing_Hydraulic_And_Electricity;
          this.Boat_Name_Tanks_Features = this.getData[0].Boat_Name_Tanks_Features;
          this.Electronics_Covers_Audio_Visual_Communication = this.getData[0].Electronics_Covers_Audio_Visual_Communication;
          this.Electrical_Electronics_Navigation_Equipment = this.getData[0].Electrical_Electronics_Navigation_Equipment;
          this.Type = this.getData[0].Type;
          this.Year_built = this.getData[0].Year_built;
          this.Passengers = this.getData[0].Passengers;
          this.Fuel_Capacity = this.getData[0].Fuel_Capacity;
          this.fractional_share_choice_percentage_or_unit = this.getData[0].fractional_share_choice_percentage_or_unit;
          this.fractional_share_text_percentage_or_unit = this.getData[0].fractional_share_text_percentage_or_unit;
          this.offering_Price_fractional_ownership = this.getData[0].offering_Price_fractional_ownership;
          if (this.fractional_share_choice_percentage_or_unit != "") {
            $('.fractional_text_label').html("Fractional Share " + this.fractional_share_choice_percentage_or_unit + " :");
            $('.fractional_text_input').attr("placeholder", "Fractional Share " + this.fractional_share_choice_percentage_or_unit);
            $('.fractional_text').show();
          } 
          // this.Airworthy = this.getData[0].Airworthy;
          // this.Insurance = this.getData[0].Insurance;
          // this.Operating_Costs = this.getData[0].Operating_Costs;
          // this.Financing = this.getData[0].Financing;

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
  deltePreviousFile(i) {
    this.getPhtosALL.splice(i, 1);
  }
  delteFile(i) {
    this.files.splice(i, 1);
  }
  PdfFileDropped(event) {
    this.pdfFileUploadd = event;
  }
  deletePreviousPdf(i) {
    this.prevuiousPdf.splice(i, 1);
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
    if (this.createPostingForm.value.yachts_subtype == "") {
      $('#fileDropRef').focus();
      finalString += "Please select yachts & ships sub-type.<br>";
    }
    if (this.createPostingForm.value.purpose == "") {
      $('#fileDropRef').focus();
      finalString += "Please select purpose.<br>";
    }
    if (this.pdfFileUploadd.length != 0) {
      if (this.pdfFileUploadd[0].name.substring(this.pdfFileUploadd[0].name.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
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
        finalString += "Please enter fractional share "+ this.createPostingForm.value.fractional_share_choice_percentage_or_unit.toLowerCase() +".<br>";
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
      formData.append("address_line1", this.createPostingForm.value.address_line1.trim());
      formData.append("selling_price", this.createPostingForm.value.selling_price.trim());
      formData.append("address_line2", this.createPostingForm.value.address_line2.trim());
      formData.append("city", this.createPostingForm.value.city.trim());
      formData.append("state", this.createPostingForm.value.state.trim());
      formData.append("country", this.createPostingForm.value.country.trim());
      formData.append("zipcode", this.createPostingForm.value.zipcode.trim());
      formData.append("landmark", this.createPostingForm.value.landmark.trim());
      formData.append("yachts_type", this.createPostingForm.value.yachts_type.trim());
      formData.append("yachts_subtype", this.createPostingForm.value.yachts_subtype.trim());
      formData.append("Boat_Name", this.createPostingForm.value.Boat_Name.trim());
      formData.append("Builder", this.createPostingForm.value.Builder.trim());
      formData.append("Designer", this.createPostingForm.value.Designer.trim());
      formData.append("Hull_Shape", this.createPostingForm.value.Hull_Shape.trim());
      formData.append("Hull_Material", this.createPostingForm.value.Hull_Material.trim());
      formData.append("LOA", this.createPostingForm.value.LOA.trim());
      formData.append("Beam", this.createPostingForm.value.Beam.trim());
      formData.append("Maximum_Draft", this.createPostingForm.value.Maximum_Draft.trim());
      formData.append("price", this.createPostingForm.value.price.trim());
      formData.append("Dry_Weight", this.createPostingForm.value.Dry_Weight.trim());
      formData.append("Total_Power", this.createPostingForm.value.Total_Power.trim());
      formData.append("Cruising_Speed", this.createPostingForm.value.Cruising_Speed.trim());
      formData.append("Maximum_Speed", this.createPostingForm.value.Maximum_Speed.trim());

      //  property facts
      // formData.append("Max_Takeoff_Weight", this.createPostingForm.value.Max_Takeoff_Weight.trim());
      // formData.append("Useful_Load", this.createPostingForm.value.Useful_Load.trim());
      // formData.append("Fuel_Capacity_Volume", this.createPostingForm.value.Fuel_Capacity_Volume.trim());
      formData.append("Engine_1", this.createPostingForm.value.Engine_1.trim());
      formData.append("Engine1_Year_Built", this.createPostingForm.value.Engine1_Year_Built.trim());
      formData.append("Engine1_Brand", this.createPostingForm.value.Engine1_Brand.trim());
      formData.append("Engine1_Type", this.createPostingForm.value.Engine1_Type.trim());
      formData.append("Engine1_Model", this.createPostingForm.value.Engine1_Model.trim());
      formData.append("Engine1_Fuel_Type", this.createPostingForm.value.Engine1_Fuel_Type.trim());
      formData.append("Engine1_Power", this.createPostingForm.value.Engine1_Power.trim());
      formData.append("Engine1_Engine_Hours", this.createPostingForm.value.Engine1_Engine_Hours.trim());
      formData.append("Engine1_Drive_Type", this.createPostingForm.value.Engine1_Drive_Type.trim());
      formData.append("Engine_2", this.createPostingForm.value.Engine_2.trim());
      formData.append("Engine2_Brand", this.createPostingForm.value.Engine2_Brand.trim());

      formData.append("Engine2_Year_Built", this.createPostingForm.value.Engine2_Year_Built.trim());
      formData.append("Engine2_Type", this.createPostingForm.value.Engine2_Type.trim());
      formData.append("Engine2_Model", this.createPostingForm.value.Engine2_Model.trim());
      formData.append("Engine2_Fuel_Type", this.createPostingForm.value.Engine2_Fuel_Type.trim());
      formData.append("Engine2_Power", this.createPostingForm.value.Engine2_Power.trim());
      formData.append("Engine2_Engine_Hours", this.createPostingForm.value.Engine2_Engine_Hours.trim());
      formData.append("Engine2_Drive_Type", this.createPostingForm.value.Engine2_Drive_Type.trim());
      formData.append("Fuel_Tanks", this.createPostingForm.value.Fuel_Tanks.trim());
      formData.append("Seating_Capacity", this.createPostingForm.value.Seating_Capacity.trim());
      formData.append("Number_of_heads", this.createPostingForm.value.Number_of_heads.trim());
      formData.append("Number_of_twin_berths", this.createPostingForm.value.Number_of_twin_berths.trim());
      formData.append("Number_of_double_berths", this.createPostingForm.value.Number_of_double_berths.trim());
      formData.append("Number_of_cabins", this.createPostingForm.value.Number_of_cabins.trim());
      formData.append("Number_of_bathrooms", this.createPostingForm.value.Number_of_bathrooms.trim());
      formData.append("Exterior_Features_and_Equipment", this.createPostingForm.value.Exterior_Features_and_Equipment.trim());
      formData.append("Features", this.createPostingForm.value.Features.trim());
      formData.append("Electronics", this.createPostingForm.value.Electronics.trim());
      formData.append("Inside_Equipment", this.createPostingForm.value.Inside_Equipment.trim());
      formData.append("Electrical_Equipment", this.createPostingForm.value.Electrical_Equipment.trim());
      formData.append("Outside_Equipment_Extras", this.createPostingForm.value.Outside_Equipment_Extras.trim());
      formData.append("Covers", this.createPostingForm.value.Covers.trim());
      formData.append("Electronics_Navigation_Equipment", this.createPostingForm.value.Electronics_Navigation_Equipment.trim());
      formData.append("Navigation_quipment", this.createPostingForm.value.Navigation_quipment.trim());
      formData.append("Audio_Visual_Communication", this.createPostingForm.value.Audio_Visual_Communication.trim());
      formData.append("Interior_Features", this.createPostingForm.value.Interior_Features.trim());
      formData.append("Year", this.createPostingForm.value.Year.trim());
      formData.append("Length", this.createPostingForm.value.Length.trim());
      formData.append("Located_In", this.createPostingForm.value.Located_In.trim());
      formData.append("wePo", this.createPostingForm.value.wePo.trim());
      formData.append("Propulsion_options", this.createPostingForm.value.Propulsion_options.trim());
      formData.append("Disclaimer", this.createPostingForm.value.Disclaimer.trim());
      formData.append("Current_Price", this.createPostingForm.value.Current_Price.trim());

      //New fields added
      formData.append("draft", this.createPostingForm.value.draft.trim());
      formData.append("Staterooms", this.createPostingForm.value.Staterooms.trim());
      formData.append("engine_make", this.createPostingForm.value.engine_make.trim());
      formData.append("Fresh_Water", this.createPostingForm.value.Fresh_Water.trim());
      formData.append("Holding", this.createPostingForm.value.Holding.trim());
      formData.append("Overview", this.createPostingForm.value.Overview.trim());
      formData.append("Refit", this.createPostingForm.value.Refit.trim());
      formData.append("Construction", this.createPostingForm.value.Construction.trim());
      formData.append("Concept_And_Design", this.createPostingForm.value.Concept_And_Design.trim());
      formData.append("Rigging_And_Sails", this.createPostingForm.value.Rigging_And_Sails.trim());
      formData.append("Exterior_Layout", this.createPostingForm.value.Exterior_Layout.trim());
      formData.append("Generators_and_Electricity", this.createPostingForm.value.Generators_and_Electricity.trim());
      formData.append("A_C", this.createPostingForm.value.A_C.trim());
      formData.append("Chargers", this.createPostingForm.value.Chargers.trim());
      formData.append("Main_Deck", this.createPostingForm.value.Main_Deck.trim());
      formData.append("starboard_hull", this.createPostingForm.value.starboard_hull.trim());
      formData.append("port_hull", this.createPostingForm.value.port_hull.trim());
      formData.append("Vessel_name", this.createPostingForm.value.Vessel_name.trim());
      formData.append("Vessel_type", this.createPostingForm.value.Vessel_type.trim());
      formData.append("Constructed", this.createPostingForm.value.Constructed.trim());
      formData.append("Refitted", this.createPostingForm.value.Refitted.trim());
      formData.append("No_of_engines", this.createPostingForm.value.No_of_engines.trim());
      formData.append("Name", this.createPostingForm.value.Name.trim());
      formData.append("built_year", this.createPostingForm.value.built_year.trim());
      formData.append("Mainly_Used_For", this.createPostingForm.value.Mainly_Used_For.trim());
      formData.append("Licence", this.createPostingForm.value.Licence.trim());
      formData.append("Hydraulics", this.createPostingForm.value.Hydraulics.trim());
      formData.append("other_information", this.createPostingForm.value.other_information.trim());
      formData.append("Hours", this.createPostingForm.value.Hours.trim());
      formData.append("Displacement", this.createPostingForm.value.Displacement.trim());
      formData.append("Single_Berths", this.createPostingForm.value.Single_Berths.trim());
      formData.append("Upgrades_and_Features", this.createPostingForm.value.Upgrades_and_Features.trim());
      formData.append("Detailed_Specification", this.createPostingForm.value.Detailed_Specification.trim());
      formData.append("Interior_Accommodations_Layout", this.createPostingForm.value.Interior_Accommodations_Layout.trim());
      formData.append("His_and_Her_Master_Bath", this.createPostingForm.value.His_and_Her_Master_Bath.trim());
      formData.append("Main_Salon", this.createPostingForm.value.Main_Salon.trim());
      formData.append("Dining_Area", this.createPostingForm.value.Dining_Area.trim());
      formData.append("Main_Foyer", this.createPostingForm.value.Main_Foyer.trim());
      formData.append("Galley", this.createPostingForm.value.Galley.trim());
      formData.append("Mechanical_Equipment", this.createPostingForm.value.Mechanical_Equipment.trim());
      formData.append("Max_Passengers", this.createPostingForm.value.Max_Passengers.trim());
      formData.append("Rigger", this.createPostingForm.value.Rigger.trim());
      formData.append("Mast_material", this.createPostingForm.value.Mast_material.trim());
      formData.append("Sails", this.createPostingForm.value.Sails.trim());
      formData.append("Asymmetric_balloon", this.createPostingForm.value.Asymmetric_balloon.trim());
      formData.append("Genoa_sail", this.createPostingForm.value.Genoa_sail.trim());
      formData.append("Stay_sail", this.createPostingForm.value.Stay_sail.trim());
      formData.append("Main_sail", this.createPostingForm.value.Main_sail.trim());
      formData.append("General", this.createPostingForm.value.General.trim());
      formData.append("Owner_and_Guest", this.createPostingForm.value.Owner_and_Guest.trim());
      formData.append("Deck_Area", this.createPostingForm.value.Deck_Area.trim());
      formData.append("Crew", this.createPostingForm.value.Crew.trim());
      formData.append("Winter_Maintenance_10_Year_Abs_Details", this.createPostingForm.value.Winter_Maintenance_10_Year_Abs_Details.trim());
      formData.append("Manufacturer", this.createPostingForm.value.Manufacturer.trim());
      formData.append("Mooring_Country", this.createPostingForm.value.Mooring_Country.trim());
      formData.append("Currency", this.createPostingForm.value.Currency.trim());
      formData.append("Condition", this.createPostingForm.value.Condition.trim());
      formData.append("Operating_Depth", this.createPostingForm.value.Operating_Depth.trim());
      formData.append("Size", this.createPostingForm.value.Size.trim());
      formData.append("Emergency_Endurance", this.createPostingForm.value.Emergency_Endurance.trim());
      formData.append("Class", this.createPostingForm.value.Class.trim());
      formData.append("Support", this.createPostingForm.value.Support.trim());
      formData.append("Categories", this.createPostingForm.value.Categories.trim());
      formData.append("Subcategory", this.createPostingForm.value.Subcategory.trim());
      formData.append("Autonomy", this.createPostingForm.value.Autonomy.trim());
      formData.append("top_speed", this.createPostingForm.value.top_speed.trim());
      formData.append("range", this.createPostingForm.value.range.trim());
      formData.append("guest_cabin", this.createPostingForm.value.guest_cabin.trim());
      formData.append("Naval_Architect", this.createPostingForm.value.Naval_Architect.trim());
      formData.append("Length_Overall", this.createPostingForm.value.Length_Overall.trim());
      formData.append("Length_at_Waterline", this.createPostingForm.value.Length_at_Waterline.trim());
      formData.append("Max_Draught", this.createPostingForm.value.Max_Draught.trim());
      formData.append("Gross_Tonnage", this.createPostingForm.value.Gross_Tonnage.trim());
      formData.append("Displacement_Tonnage", this.createPostingForm.value.Displacement_Tonnage.trim());
      formData.append("Hull_Number", this.createPostingForm.value.Hull_Number.trim());
      formData.append("Hull_Type", this.createPostingForm.value.Hull_Type.trim());
      formData.append("Number_of_Decks", this.createPostingForm.value.Number_of_Decks.trim());
      formData.append("MCA_Compliant", this.createPostingForm.value.MCA_Compliant.trim());
      formData.append("Water_Capacity", this.createPostingForm.value.Water_Capacity.trim());
      formData.append("Superstructure", this.createPostingForm.value.Superstructure.trim());
      formData.append("Deck", this.createPostingForm.value.Deck.trim());
      formData.append("Guests", this.createPostingForm.value.Guests.trim());
      formData.append("Passenger_Rooms", this.createPostingForm.value.Passenger_Rooms.trim());
      formData.append("Master_Rooms", this.createPostingForm.value.Master_Rooms.trim());
      formData.append("Twin_Rooms", this.createPostingForm.value.Twin_Rooms.trim());
      formData.append("VIP_Rooms", this.createPostingForm.value.VIP_Rooms.trim());
      formData.append("Engines", this.createPostingForm.value.Engines.trim());
      formData.append("Make", this.createPostingForm.value.Make.trim());
      formData.append("Model", this.createPostingForm.value.Model.trim());
      formData.append("Fuel", this.createPostingForm.value.Fuel.trim());
      formData.append("Drive_Type", this.createPostingForm.value.Drive_Type.trim());
      formData.append("Specification", this.createPostingForm.value.Specification.trim());
      formData.append("Max_Draft", this.createPostingForm.value.Max_Draft.trim());
      formData.append("Cabins", this.createPostingForm.value.Cabins.trim());
      formData.append("Heads", this.createPostingForm.value.Heads.trim());
      formData.append("Plumbing", this.createPostingForm.value.Plumbing.trim());
      formData.append("Electricity", this.createPostingForm.value.Electricity.trim());
      formData.append("Generators", this.createPostingForm.value.Generators.trim());
      formData.append("Entertainment_And_Electronics", this.createPostingForm.value.Entertainment_And_Electronics.trim());
      formData.append("interior_layout", this.createPostingForm.value.interior_layout.trim());
      formData.append("property_address", this.createPostingForm.value.property_address.trim());
      formData.append("tanks_features", this.createPostingForm.value.tanks_features.trim());
      formData.append("Accommodation", this.createPostingForm.value.Accommodation.trim());
      formData.append("Audio_visual", this.createPostingForm.value.Audio_visual.trim());
      formData.append("communication", this.createPostingForm.value.communication.trim());
      formData.append("Interior_Exterior_Features_Equipment", this.createPostingForm.value.Interior_Exterior_Features_Equipment.trim());
      formData.append("Inside_Equipment_Outside_Equipment", this.createPostingForm.value.Inside_Equipment_Outside_Equipment.trim());
      formData.append("Yachts_Ships_Highlights", this.createPostingForm.value.Yachts_Ships_Highlights.trim());
      formData.append("Specifications", this.createPostingForm.value.Specifications.trim());
      formData.append("Engine_model", this.createPostingForm.value.Engine_model.trim());
      formData.append("Engine_power", this.createPostingForm.value.Engine_power.trim());
      formData.append("Location", this.createPostingForm.value.Location.trim());
      formData.append("Build_Year", this.createPostingForm.value.Build_Year.trim());
      formData.append("Additional_Details", this.createPostingForm.value.Additional_Details.trim());
      formData.append("Hull", this.createPostingForm.value.Hull.trim());
      formData.append("Electrical", this.createPostingForm.value.Electrical.trim());
      formData.append("Power", this.createPostingForm.value.Power.trim());
      formData.append("Everything", this.createPostingForm.value.Everything.trim());
      formData.append("walk_through", this.createPostingForm.value.walk_through.trim());
      formData.append("Electronics_Navigation_AV_Equipment", this.createPostingForm.value.Electronics_Navigation_AV_Equipment.trim());
      formData.append("General_Highlights", this.createPostingForm.value.General_Highlights.trim());
      formData.append("Dimensions", this.createPostingForm.value.Dimensions.trim());
      formData.append("Yacht_Type", this.createPostingForm.value.Yacht_Type.trim());
      formData.append("Yacht_Subtype", this.createPostingForm.value.Yacht_Subtype.trim());
      formData.append("Exterior_Designer", this.createPostingForm.value.Exterior_Designer.trim());
      formData.append("Interior_Designer", this.createPostingForm.value.Interior_Designer.trim());
      formData.append("Performance_and_Capacities", this.createPostingForm.value.Performance_and_Capacities.trim());
      formData.append("Materials", this.createPostingForm.value.Materials.trim());
      formData.append("zoning", this.createPostingForm.value.zoning.trim());
      formData.append("Engines_Plumbing_Hydraulic_And_Electricity", this.createPostingForm.value.Engines_Plumbing_Hydraulic_And_Electricity.trim());
      formData.append("Boat_Name_Tanks_Features", this.createPostingForm.value.Boat_Name_Tanks_Features.trim());
      formData.append("Electronics_Covers_Audio_Visual_Communication", this.createPostingForm.value.Electronics_Covers_Audio_Visual_Communication.trim());
      formData.append("Electrical_Electronics_Navigation_Equipment", this.createPostingForm.value.Electrical_Electronics_Navigation_Equipment.trim());
      formData.append("Type", this.createPostingForm.value.Type.trim());
      formData.append("Year_built", this.createPostingForm.value.Year_built.trim());
      formData.append("Passengers", this.createPostingForm.value.Passengers.trim());
      formData.append("Fuel_Capacity", this.createPostingForm.value.Fuel_Capacity.trim());
      formData.append("fractional_share_choice_percentage_or_unit", this.createPostingForm.value.fractional_share_choice_percentage_or_unit.trim());
      formData.append("fractional_share_text_percentage_or_unit", this.createPostingForm.value.fractional_share_text_percentage_or_unit.trim());
      formData.append("offering_Price_fractional_ownership", this.createPostingForm.value.offering_Price_fractional_ownership.trim());
      // formData.append("Airworthy", this.createPostingForm.value.Airworthy.trim());
      // formData.append("Insurance", this.createPostingForm.value.Insurance.trim());
      // formData.append("Operating_Costs", this.createPostingForm.value.Operating_Costs.trim());
      // formData.append("Financing", this.createPostingForm.value.Financing.trim());
      if (this.pdfFileUploadd.length != 0) {
        formData.append("pdfFile", this.pdfFileUploadd[0]);
      }
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      if (this.getParamsId != null) {
        formData.append("Serial_Number", this.Serial_Number);
        formData.append("previous_images", JSON.stringify(this.getPhtosALL));
        formData.append("previous_pdf_file", JSON.stringify(this.prevuiousPdf));
        this.UserService.UpdateListingyacht(formData, this.getParamsId).subscribe(result => {
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
        formData.append("Serial_Number", this.getCurrentSerialNumber);
        formData.append("listing_show_on_wepo", 'Yes');
        formData.append("created_by", "WePropertyowners");
        this.UserService.CreateYachtListing(formData).subscribe(result => {
          //console.log("result : ", result);
          this.loading = false;
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // localStorage.setItem('YachtShipCurrentSerialNumber', JSON.stringify((result['Serial_Number'] + 1)));
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