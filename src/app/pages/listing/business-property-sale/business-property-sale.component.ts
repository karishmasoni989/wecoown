import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../../service/country-state-city.service';

@Component({
  selector: 'app-business-property-sale',
  templateUrl: './business-property-sale.component.html',
  styleUrls: ['./business-property-sale.component.css']
})
export class BusinessPropertySaleComponent implements OnInit {

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
  saleFlayerPdfFiledata: any[] =[];
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
  Business_subtype: string;
  Business_type: string;
  price: any;
  Deep_Well: string;
  Cross_fence: string;
  Location: any;
  Real_Estate: any;
  Building_SF: any;
  Employees: any;
  Facilities: any;
  Competition: any;
  Growth_Expansion: any;
  Financing: any;
  Support_Training: any;
  Add_Additional_Comment: any;
  Listing_Statistics: any;
  Freehold_Price: any;
  Sales_Revenue: any;
  Cash_Flow: any;
  Asking_Price: any;
  Expansion_Potential: any;
  Years_established: any;
  Years_build_Renovated: any;
  Area: any;
  Gross_Revenue: any;
  EBITDA: any;
  FF_E: any;
  Inventory: any;
  Opportunity_Zone: any;
  Parking_Ratio: any;
  No_Of_Stories: any;
  Building_Size: any;
  Lot_Size: any;
  Building_Class: any;
  Cap_Rate: any;
  Property_Type_CW: any;
  Property_Subtype_CW: any;
  Sale_Type: any;
  Price_Per_SF: any;
  Parcel_Number: any;
  Land_Assessment: any;
  Improvements_Assessment: any;
  Total_Assessment: any;
  Zoning_Code: any;
  Ameinities: any;
  Grazing_Acres: any;
  Acre_Hay_Land: any;
  livestock: any;
  Location_and_Access: any;
  acers_of_grass_hay: any;
  acers_of_dry_land: any;
  acers_of_flood_irrigated_alfalfa: any;
  acers_of_BLM_lease: any;
  OCCUPANCY_RATE: any;
  CONCESSION: any;
  MOORINGS: any;
  MAX_LENGHT: any;
  MAX_DEPTH: any;
  DRY_DOCK: any;
  AREA_TOTAL: any;
  HAULING_CAPACITY: any;
  BUILDINGS: any;
  MARINA_STORE: any;
  FUEL_DISPENSING: any;
  RESTAURANT: any;
  PARKING_SPACES: any;
  EQUIPMENT_INC: any;
  YACHT_SERVICE: any;
  PROFITABLE: any;
  Investement_Highlights: any;
  Executive_Summary: any;
  Business_price: any;
  No_Stories: any;
  Rentable_Building_Area: any;
  Activity_adventure: any;
  popular_amenities: any;
  suites: any;
  Beds: any;
  Furniture_Fixtures_Equipment: any;
  number_of_rooms: any;
  entertainment: any;
  Access_and_Parking: any;
  kitchens: any;
  living_quarters: any;
  swimming_pool: any;
  corridor: any;
  Driveway: any;
  property_id: any;
  sale_condition: any;
  listing_type: any;
  Agricultural_Uses: any;
  Land: any;
  Irrigation_water: any;
  Acreage: any;
  trading_hours: any;
  home_based: any;
  Relocatable: any;
  fractional_share_choice_percentage_or_unit: string;
  fractional_share_text_percentage_or_unit: any;
  offering_Price_fractional_ownership: any;
  Tenancy: any;
  Transportation: any;
  Average_Daily_Rate: any;
  Room_Mix_Info: any;
  Zoning: any;
  Parking: any;
  Frontage: any;
  NOI: any;
  Building_Height: any;
  Slab_to_Slab: any;
  Building_FAR: any;
  Land_acres: any;
  Occupancy: any;
  Major_Tenants: any;
  Nearby_Amentities: any;
  Financial_Summary: any;
  Demographics: any;
  Number_of_Lots: any;
  Price_per_lot: any;
  Acres_per_lot: any;
  Total_Lot_Size: any;
  Number_Licenses: any;
  License_Mix_Info: any;
  Nearby_Amenities: any;
  Price_per_acreage: any;
  Number_Buildings: any;
  Sq_ft_per_building: any;
  No_Acres: any;
  Amenities: any;
  Year_Built: any;
  Number_of_Drive_In_Grade_Level_Doors: any;
  Price_per_Bed: any;
  Operating_Schedule: any;
  No_Barns: any;
  Stables_per_barn: any;
  Total_Stables: any;
  Slip_Mix_Info: any;
  Sale_Conditions: any;
  No_Sites: any;
  Site_Mix_Info: any;
  Water_Frontage: any;
  No_Buildings: any;
  sqFeetPerBuilding: any;
  No_Slips: any;
  Land_Type: any;
  getPreviousSaleFlayerPdf: any;

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
    $('.motelsHostelsBBS').hide();
    $('.restaurantsBarsClubs').hide();
    $('.ranchesFarms').hide();
    $('.CannabisProperties').hide();
    $('.WineriesVineyards').hide();
    $('.GasStationsCStores').hide();
    $('.CarWashFacilities').hide();
    $('.assistedLivingNursingHomes').hide();
    $('.rehabCenters').hide();
    $('.parkingLots').hide();
    $('.campGrounds').hide();
    $('.equestrianCenters').hide();
    $('.marinas').hide();
    $('.hotelsGolfResorts').hide();
    this.country = "";
    this.state = "";
    this.city = "";
    this.Business_subtype = "";
    this.purpose = "";
    this.Deep_Well = "";
    this.Cross_fence = "";
    this.Business_type = "Business Properties";
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
      Business_type: new FormControl(''),
      Business_subtype: new FormControl(''),
      Form_Serial_Number: new FormControl(''),
      
      //new fields added
      Location: new FormControl(''),
      Real_Estate: new FormControl(''),
      Building_SF: new FormControl(''),
      Employees: new FormControl(''),
      Facilities: new FormControl(''),
      Competition: new FormControl(''),
      Growth_Expansion: new FormControl(''),
      Financing: new FormControl(''),
      Support_Training: new FormControl(''),
      Add_Additional_Comment: new FormControl(''),
      Listing_Statistics: new FormControl(''),
      Freehold_Price: new FormControl(''),
      Sales_Revenue: new FormControl(''),
      Cash_Flow: new FormControl(''),
      Asking_Price: new FormControl(''),
      Expansion_Potential: new FormControl(''),
      Years_established: new FormControl(''),
      Years_build_Renovated: new FormControl(''),
      Area: new FormControl(''),
      Gross_Revenue: new FormControl(''),
      EBITDA: new FormControl(''),
      FF_E: new FormControl(''),
      Inventory: new FormControl(''),
      Opportunity_Zone: new FormControl(''),
      Parking_Ratio: new FormControl(''),
      No_Of_Stories: new FormControl(''),
      Building_Size: new FormControl(''),
      Lot_Size: new FormControl(''),
      Building_Class: new FormControl(''),
      Cap_Rate: new FormControl(''),
      Property_Type_CW: new FormControl(''),
      Property_Subtype_CW: new FormControl(''),
      Sale_Type: new FormControl(''),
      Price_Per_SF: new FormControl(''),
      Parcel_Number: new FormControl(''),
      Land_Assessment: new FormControl(''),
      Improvements_Assessment: new FormControl(''),
      Total_Assessment: new FormControl(''),
      Zoning_Code: new FormControl(''),
      Ameinities: new FormControl(''),
      Grazing_Acres: new FormControl(''),
      Acre_Hay_Land: new FormControl(''),
      Deep_Well: new FormControl(''),
      livestock: new FormControl(''),
      Location_and_Access: new FormControl(''),
      acers_of_grass_hay: new FormControl(''),
      acers_of_dry_land: new FormControl(''),
      acers_of_flood_irrigated_alfalfa: new FormControl(''),
      acers_of_BLM_lease: new FormControl(''),
      Cross_fence: new FormControl(''),
      OCCUPANCY_RATE: new FormControl(''),
      CONCESSION: new FormControl(''),
      MOORINGS: new FormControl(''),
      MAX_LENGHT: new FormControl(''),
      MAX_DEPTH: new FormControl(''),
      DRY_DOCK: new FormControl(''),
      AREA_TOTAL: new FormControl(''),
      HAULING_CAPACITY: new FormControl(''),
      BUILDINGS: new FormControl(''),
      MARINA_STORE: new FormControl(''),
      FUEL_DISPENSING: new FormControl(''),
      RESTAURANT: new FormControl(''),
      PARKING_SPACES: new FormControl(''),
      EQUIPMENT_INC: new FormControl(''),
      YACHT_SERVICE: new FormControl(''),
      PROFITABLE: new FormControl(''),
      Investement_Highlights: new FormControl(''),
      Executive_Summary: new FormControl(''),
      Business_price: new FormControl(''),
      No_Stories: new FormControl(''),
      Rentable_Building_Area: new FormControl(''),
      Activity_adventure: new FormControl(''),
      popular_amenities: new FormControl(''),
      suites: new FormControl(''),
      Beds: new FormControl(''),
      Furniture_Fixtures_Equipment: new FormControl(''),
      number_of_rooms: new FormControl(''),
      entertainment: new FormControl(''),
      Access_and_Parking: new FormControl(''),
      kitchens: new FormControl(''),
      living_quarters: new FormControl(''),
      swimming_pool: new FormControl(''),
      corridor: new FormControl(''),
      Driveway: new FormControl(''),
      property_id: new FormControl(''),
      sale_condition: new FormControl(''),
      listing_type: new FormControl(''),
      Agricultural_Uses: new FormControl(''),
      Land: new FormControl(''),
      Irrigation_water: new FormControl(''),
      Acreage: new FormControl(''),
      trading_hours: new FormControl(''),
      home_based: new FormControl(''),
      Relocatable: new FormControl(''),
      Tenancy: new FormControl(''),
      Transportation: new FormControl(''),
      Average_Daily_Rate: new FormControl(''),
      Room_Mix_Info: new FormControl(''),
      Zoning: new FormControl(''),
      Parking: new FormControl(''),
      Frontage: new FormControl(''),
      NOI: new FormControl(''),
      Building_Height: new FormControl(''),
      Slab_to_Slab: new FormControl(''),
      Building_FAR: new FormControl(''),
      Land_acres: new FormControl(''),
      Occupancy: new FormControl(''),
      Major_Tenants: new FormControl(''),
      Nearby_Amentities: new FormControl(''),
      Financial_Summary: new FormControl(''),
      Demographics: new FormControl(''),
      Number_of_Lots: new FormControl(''),
      Price_per_lot: new FormControl(''),
      Acres_per_lot: new FormControl(''),
      Total_Lot_Size: new FormControl(''),
      Number_Licenses: new FormControl(''),
      License_Mix_Info: new FormControl(''),
      Nearby_Amenities: new FormControl(''),
      Price_per_acreage: new FormControl(''),
      Number_Buildings: new FormControl(''),
      Sq_ft_per_building: new FormControl(''),
      No_Acres: new FormControl(''),
      Amenities: new FormControl(''),
      Year_Built: new FormControl(''),
      Number_of_Drive_In_Grade_Level_Doors: new FormControl(''),
      Price_per_Bed: new FormControl(''),
      Operating_Schedule: new FormControl(''),
      No_Barns: new FormControl(''),
      Stables_per_barn: new FormControl(''),
      Total_Stables: new FormControl(''),
      Slip_Mix_Info: new FormControl(''),
      Sale_Conditions: new FormControl(''),
      No_Sites: new FormControl(''),
      Site_Mix_Info: new FormControl(''),
      Water_Frontage: new FormControl(''),
      No_Buildings: new FormControl(''),
      sqFeetPerBuilding: new FormControl(''),
      No_Slips: new FormControl(''),
      Land_Type: new FormControl(''),
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
    this.UserService.getBusinessAllCount().subscribe(result => {
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
      if (item == "Hotels & Golf Resorts") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.hotelsGolfResorts').show();
      } else if (item == "Motels, Hostels & B&Bs") {
        $('.hotelsGolfResorts').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.motelsHostelsBBS').show();
      } else if (item == "Restaurants, Bars & Clubs") {
        $('.motelsHostelsBBS').hide();
        $('.hotelsGolfResorts').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.restaurantsBarsClubs').show();
      } else if (item == "Ranches & Farms") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.hotelsGolfResorts').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.ranchesFarms').show();
      } else if (item == "Cannabis Properties") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.hotelsGolfResorts').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.CannabisProperties').show();
      } else if (item == "Wineries & Vineyards") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.hotelsGolfResorts').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.WineriesVineyards').show();
      } else if (item == "Gas Stations & C Stores") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.hotelsGolfResorts').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.GasStationsCStores').show();
      } else if (item == "Car Wash Facilities") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.hotelsGolfResorts').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.CarWashFacilities').show();
      } else if (item == "Assisted Living & Nursing Homes") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.hotelsGolfResorts').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.assistedLivingNursingHomes').show();
      } else if (item == "Rehab Centers") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.hotelsGolfResorts').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.rehabCenters').show();
      } else if (item == "Parking Lots") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.hotelsGolfResorts').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.parkingLots').show();
      } else if (item == "Camp Grounds") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.hotelsGolfResorts').hide();
        $('.equestrianCenters').hide();
        $('.marinas').hide();
        $('.campGrounds').show();
      } else if (item == "Equestrian Centers") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.hotelsGolfResorts').hide();
        $('.marinas').hide();
        $('.equestrianCenters').show();
      } else if (item == "Marinas") {
        $('.motelsHostelsBBS').hide();
        $('.restaurantsBarsClubs').hide();
        $('.ranchesFarms').hide();
        $('.CannabisProperties').hide();
        $('.WineriesVineyards').hide();
        $('.GasStationsCStores').hide();
        $('.CarWashFacilities').hide();
        $('.assistedLivingNursingHomes').hide();
        $('.rehabCenters').hide();
        $('.parkingLots').hide();
        $('.campGrounds').hide();
        $('.equestrianCenters').hide();
        $('.hotelsGolfResorts').hide();
        $('.marinas').show();
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
      property_type: 'Business Properties'
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
          if (this.getData[0].Business_subtype == "Hotels & Golf Resorts") {
            $('.hotelsGolfResorts').show();
          } else if (this.getData[0].Business_subtype == "Motels, Hostels & B&Bs") {
            $('.motelsHostelsBBS').show();
          } else if (this.getData[0].Business_subtype == "Restaurants, Bars & Clubs") {
            $('.restaurantsBarsClubs').show();
          } else if (this.getData[0].Business_subtype == "Ranches & Farms") {
            $('.ranchesFarms').show();
          } else if (this.getData[0].Business_subtype == "Cannabis Properties") {
            $('.CannabisProperties').show();
          } else if (this.getData[0].Business_subtype == "Wineries & Vineyards") {
            $('.WineriesVineyards').show();
          } else if (this.getData[0].Business_subtype == "Gas Stations & C Stores") {
            $('.GasStationsCStores').show();
          } else if (this.getData[0].Business_subtype == "Car Wash Facilities") {
            $('.CarWashFacilities').show();
          } else if (this.getData[0].Business_subtype == "Assisted Living & Nursing Homes") {
            $('.assistedLivingNursingHomes').show();
          } else if (this.getData[0].Business_subtype == "Rehab Centers") {
            $('.rehabCenters').show();
          } else if (this.getData[0].Business_subtype == "Parking Lots") {
            $('.parkingLots').show();
          } else if (this.getData[0].Business_subtype == "Camp Grounds") {
            $('.campGrounds').show();
          } else if (this.getData[0].Business_subtype == "Equestrian Centers") {
            $('.equestrianCenters').show();
          } else if (this.getData[0].Business_subtype == "Marinas") {
            $('.marinas').show();
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
          this.zipcode = this.getData[0].zipcode;
          this.landmark = this.getData[0].landmark;
          this.price = this.getData[0].price;
          this.Form_Serial_Number = this.getData[0].Form_Serial_Number;
          this.Business_type = this.getData[0].Business_type;
          this.Business_subtype = this.getData[0].Business_subtype;
          
          this.prevuiousPdf = this.getData[0].pdf_doc;
          // New fields added
          this.Location = this.getData[0].Location;
          this.Real_Estate = this.getData[0].Real_Estate;
          this.Building_SF = this.getData[0].Building_SF;
          this.Employees = this.getData[0].Employees;
          this.Facilities = this.getData[0].Facilities;
          this.Competition = this.getData[0].Competition;
          this.Growth_Expansion = this.getData[0].Growth_Expansion;
          this.Financing = this.getData[0].Financing;
          this.Support_Training = this.getData[0].Support_Training;
          this.Add_Additional_Comment = this.getData[0].Add_Additional_Comment;
          this.Listing_Statistics = this.getData[0].Listing_Statistics;
          this.Freehold_Price = this.getData[0].Freehold_Price;
          this.Sales_Revenue = this.getData[0].Sales_Revenue;
          this.Cash_Flow = this.getData[0].Cash_Flow;
          this.Asking_Price = this.getData[0].Asking_Price;
          this.Expansion_Potential = this.getData[0].Expansion_Potential;
          this.Years_established = this.getData[0].Years_established;
          this.Years_build_Renovated = this.getData[0].Years_build_Renovated;
          this.Area = this.getData[0].Area;
          this.Gross_Revenue = this.getData[0].Gross_Revenue;
          this.EBITDA = this.getData[0].EBITDA;
          this.FF_E = this.getData[0].FF_E;
          this.Inventory = this.getData[0].Inventory;
          this.Opportunity_Zone = this.getData[0].Opportunity_Zone;
          this.Parking_Ratio = this.getData[0].Parking_Ratio;
          this.No_Of_Stories = this.getData[0].No_Of_Stories;
          this.Building_Size = this.getData[0].Building_Size;
          this.Lot_Size = this.getData[0].Lot_Size;
          this.Building_Class = this.getData[0].Building_Class;
          this.Cap_Rate = this.getData[0].Cap_Rate;
          this.Property_Type_CW = this.getData[0].Property_Type_CW;
          this.Property_Subtype_CW = this.getData[0].Property_Subtype_CW;
          this.Sale_Type = this.getData[0].Sale_Type;
          this.Price_Per_SF = this.getData[0].Price_Per_SF;
          this.Parcel_Number = this.getData[0].Parcel_Number;
          this.Land_Assessment = this.getData[0].Land_Assessment;
          this.Improvements_Assessment = this.getData[0].Improvements_Assessment;
          this.Total_Assessment = this.getData[0].Total_Assessment;
          this.Zoning_Code = this.getData[0].Zoning_Code;
          this.Ameinities = this.getData[0].Ameinities;
          this.Grazing_Acres = this.getData[0].Grazing_Acres;
          this.Acre_Hay_Land = this.getData[0].Acre_Hay_Land;
          this.Deep_Well = this.getData[0].Deep_Well;
          this.livestock = this.getData[0].livestock;
          this.Location_and_Access = this.getData[0].Location_and_Access;
          this.acers_of_grass_hay = this.getData[0].acers_of_grass_hay;
          this.acers_of_dry_land = this.getData[0].acers_of_dry_land;
          this.acers_of_flood_irrigated_alfalfa = this.getData[0].acers_of_flood_irrigated_alfalfa;
          this.acers_of_BLM_lease = this.getData[0].acers_of_BLM_lease;
          this.Cross_fence = this.getData[0].Cross_fence;
          this.OCCUPANCY_RATE = this.getData[0].OCCUPANCY_RATE;
          this.CONCESSION = this.getData[0].CONCESSION;
          this.MOORINGS = this.getData[0].MOORINGS;
          this.MAX_LENGHT = this.getData[0].MAX_LENGHT;
          this.MAX_DEPTH = this.getData[0].MAX_DEPTH;
          this.DRY_DOCK = this.getData[0].DRY_DOCK;
          this.AREA_TOTAL = this.getData[0].AREA_TOTAL;
          this.HAULING_CAPACITY = this.getData[0].HAULING_CAPACITY;
          this.BUILDINGS = this.getData[0].BUILDINGS;
          this.MARINA_STORE = this.getData[0].MARINA_STORE;
          this.FUEL_DISPENSING = this.getData[0].FUEL_DISPENSING;
          this.RESTAURANT = this.getData[0].RESTAURANT;
          this.PARKING_SPACES = this.getData[0].PARKING_SPACES;
          this.EQUIPMENT_INC = this.getData[0].EQUIPMENT_INC;
          this.YACHT_SERVICE = this.getData[0].YACHT_SERVICE;
          this.PROFITABLE = this.getData[0].PROFITABLE;
          this.Investement_Highlights = this.getData[0].Investement_Highlights;
          this.Executive_Summary = this.getData[0].Executive_Summary;
          this.Business_price = this.getData[0].Business_price;
          this.No_Stories = this.getData[0].No_Stories;
          this.Rentable_Building_Area = this.getData[0].Rentable_Building_Area;
          this.Activity_adventure = this.getData[0].Activity_adventure;
          this.popular_amenities = this.getData[0].popular_amenities;
          this.suites = this.getData[0].suites;
          this.Beds = this.getData[0].Beds;
          this.Furniture_Fixtures_Equipment = this.getData[0].Furniture_Fixtures_Equipment;
          this.number_of_rooms = this.getData[0].number_of_rooms;
          this.entertainment = this.getData[0].entertainment;
          this.Access_and_Parking = this.getData[0].Access_and_Parking;
          this.kitchens = this.getData[0].kitchens;
          this.living_quarters = this.getData[0].living_quarters;
          this.swimming_pool = this.getData[0].swimming_pool;
          this.corridor = this.getData[0].corridor;
          this.Driveway = this.getData[0].Driveway;
          this.property_id = this.getData[0].property_id;
          this.sale_condition = this.getData[0].sale_condition;
          this.listing_type = this.getData[0].listing_type;
          this.Agricultural_Uses = this.getData[0].Agricultural_Uses;
          this.Land = this.getData[0].Land;
          this.Irrigation_water = this.getData[0].Irrigation_water;
          this.Acreage = this.getData[0].Acreage;
          this.trading_hours = this.getData[0].trading_hours;
          this.home_based = this.getData[0].home_based;
          this.Relocatable = this.getData[0].Relocatable;
          this.Tenancy = this.getData[0].Tenancy;
          this.Transportation = this.getData[0].Transportation;
          this.getPreviousSaleFlayerPdf = this.getData[0].Sale_Flyer;
          this.Average_Daily_Rate = this.getData[0].Average_Daily_Rate;
          this.Room_Mix_Info = this.getData[0].Room_Mix_Info;
          this.Zoning = this.getData[0].Zoning;
          this.Parking = this.getData[0].Parking;
          this.Frontage = this.getData[0].Frontage;
          this.NOI = this.getData[0].NOI;
          this.Building_Height = this.getData[0].Building_Height;
          this.Slab_to_Slab = this.getData[0].Slab_to_Slab;
          this.Building_FAR = this.getData[0].Building_FAR;
          this.Land_acres = this.getData[0].Land_acres;
          this.Occupancy = this.getData[0].Occupancy;
          this.Major_Tenants = this.getData[0].Major_Tenants;
          this.Nearby_Amentities = this.getData[0].Nearby_Amentities;
          this.Financial_Summary = this.getData[0].Financial_Summary;
          this.Demographics = this.getData[0].Demographics;
          this.Number_of_Lots = this.getData[0].Number_of_Lots;
          this.Price_per_lot = this.getData[0].Price_per_lot;
          this.Acres_per_lot = this.getData[0].Acres_per_lot;
          this.Total_Lot_Size = this.getData[0].Total_Lot_Size;
          this.Number_Licenses = this.getData[0].Number_Licenses;
          this.License_Mix_Info = this.getData[0].License_Mix_Info;
          this.Nearby_Amenities = this.getData[0].Nearby_Amenities;
          this.Price_per_acreage = this.getData[0].Price_per_acreage;
          this.Number_Buildings = this.getData[0].Number_Buildings;
          this.Sq_ft_per_building = this.getData[0].Sq_ft_per_building;
          this.No_Acres = this.getData[0].No_Acres;
          this.Amenities = this.getData[0].Amenities;
          this.Year_Built = this.getData[0].Year_Built;
          this.Number_of_Drive_In_Grade_Level_Doors = this.getData[0].Number_of_Drive_In_Grade_Level_Doors;
          this.Price_per_Bed = this.getData[0].Price_per_Bed;
          this.Operating_Schedule = this.getData[0].Operating_Schedule;
          this.No_Barns = this.getData[0].No_Barns;
          this.Stables_per_barn = this.getData[0].Stables_per_barn;
          this.Total_Stables = this.getData[0].Total_Stables;
          this.Slip_Mix_Info = this.getData[0].Slip_Mix_Info;
          this.Sale_Conditions = this.getData[0].Sale_Conditions;
          this.No_Sites = this.getData[0].No_Sites;
          this.Site_Mix_Info = this.getData[0].Site_Mix_Info;
          this.Water_Frontage = this.getData[0].Water_Frontage;
          this.No_Buildings = this.getData[0].No_Buildings;
          this.sqFeetPerBuilding = this.getData[0].sqFeetPerBuilding;
          this.No_Slips = this.getData[0].No_Slips;
          this.Land_Type = this.getData[0].Land_Type;
          this.fractional_share_choice_percentage_or_unit = this.getData[0].fractional_share_choice_percentage_or_unit;
          this.fractional_share_text_percentage_or_unit = this.getData[0].fractional_share_text_percentage_or_unit;
          this.offering_Price_fractional_ownership = this.getData[0].offering_Price_fractional_ownership;
          if (this.fractional_share_choice_percentage_or_unit != "") {
            $('.fractional_text_label').html("Fractional Share " + this.fractional_share_choice_percentage_or_unit + " :");
            $('.fractional_text_input').attr("placeholder", "Fractional Share " + this.fractional_share_choice_percentage_or_unit);
            $('.fractional_text').show();
          }
          

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
  saleFlayerPdfFile(event) {
    this.saleFlayerPdfFiledata = event;
  }
  deletePreviousPdfSaleFlayer(i) {
    this.getPreviousSaleFlayerPdf.splice(i, 1);
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
    if (this.createPostingForm.value.Business_subtype == "") {
      $('#fileDropRef').focus();
      finalString += "Please select business sub-type.<br>";
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
    // for check sale flayer is pdf or not
    if (this.saleFlayerPdfFiledata.length != 0) {
      if (this.saleFlayerPdfFiledata[0].name.substring(this.saleFlayerPdfFiledata[0].name.lastIndexOf(".") + 1) != "pdf") {
        finalString += "Please select document in pdf format.<br>";
      }
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
      formData.append("purpose", this.createPostingForm.value.purpose.trim());
      formData.append("address_line1", this.createPostingForm.value.address_line1.trim());
      formData.append("address_line2", this.createPostingForm.value.address_line2.trim());
      formData.append("city", this.createPostingForm.value.city.trim());
      formData.append("state", this.createPostingForm.value.state.trim());
      formData.append("country", this.createPostingForm.value.country.trim());
      formData.append("zipcode", this.createPostingForm.value.zipcode.trim());
      formData.append("landmark", this.createPostingForm.value.landmark.trim());
      formData.append("price", this.createPostingForm.value.price.trim());
      formData.append("Business_type", this.createPostingForm.value.Business_type.trim());
      formData.append("Business_subtype", this.createPostingForm.value.Business_subtype.trim());

      // New fields added
      formData.append("Location", this.createPostingForm.value.Location.trim());
      formData.append("Real_Estate", this.createPostingForm.value.Real_Estate.trim());
      formData.append("Building_SF", this.createPostingForm.value.Building_SF.trim());
      formData.append("Employees", this.createPostingForm.value.Employees.trim());
      formData.append("Facilities", this.createPostingForm.value.Facilities.trim());
      formData.append("Competition", this.createPostingForm.value.Competition.trim());
      formData.append("Growth_Expansion", this.createPostingForm.value.Growth_Expansion.trim());
      formData.append("Financing", this.createPostingForm.value.Financing.trim());
      formData.append("Support_Training", this.createPostingForm.value.Support_Training.trim());
      formData.append("Add_Additional_Comment", this.createPostingForm.value.Add_Additional_Comment.trim());
      formData.append("Listing_Statistics", this.createPostingForm.value.Listing_Statistics.trim());
      formData.append("Freehold_Price", this.createPostingForm.value.Freehold_Price.trim());
      formData.append("Sales_Revenue", this.createPostingForm.value.Sales_Revenue.trim());
      formData.append("Cash_Flow", this.createPostingForm.value.Cash_Flow.trim());
      formData.append("Asking_Price", this.createPostingForm.value.Asking_Price.trim());
      formData.append("Expansion_Potential", this.createPostingForm.value.Expansion_Potential.trim());
      formData.append("Years_established", this.createPostingForm.value.Years_established.trim());
      formData.append("Years_build_Renovated", this.createPostingForm.value.Years_build_Renovated.trim());
      formData.append("Area", this.createPostingForm.value.Area.trim());
      formData.append("Gross_Revenue", this.createPostingForm.value.Gross_Revenue.trim());
      formData.append("EBITDA", this.createPostingForm.value.EBITDA.trim());
      formData.append("FF_E", this.createPostingForm.value.FF_E.trim());
      formData.append("Inventory", this.createPostingForm.value.Inventory.trim());
      formData.append("Opportunity_Zone", this.createPostingForm.value.Opportunity_Zone.trim());
      formData.append("Parking_Ratio", this.createPostingForm.value.Parking_Ratio.trim());
      formData.append("No_Of_Stories", this.createPostingForm.value.No_Of_Stories.trim());
      formData.append("Building_Size", this.createPostingForm.value.Building_Size.trim());
      formData.append("Lot_Size", this.createPostingForm.value.Lot_Size.trim());
      formData.append("Building_Class", this.createPostingForm.value.Building_Class.trim());
      formData.append("Cap_Rate", this.createPostingForm.value.Cap_Rate.trim());
      formData.append("Property_Type_CW", this.createPostingForm.value.Property_Type_CW.trim());
      formData.append("Property_Subtype_CW", this.createPostingForm.value.Property_Subtype_CW.trim());
      formData.append("Sale_Type", this.createPostingForm.value.Sale_Type.trim());
      formData.append("Price_Per_SF", this.createPostingForm.value.Price_Per_SF.trim());
      formData.append("Parcel_Number", this.createPostingForm.value.Parcel_Number.trim());
      formData.append("Land_Assessment", this.createPostingForm.value.Land_Assessment.trim());
      formData.append("Improvements_Assessment", this.createPostingForm.value.Improvements_Assessment.trim());
      formData.append("Total_Assessment", this.createPostingForm.value.Total_Assessment.trim());
      formData.append("Zoning_Code", this.createPostingForm.value.Zoning_Code.trim());
      formData.append("Ameinities", this.createPostingForm.value.Ameinities.trim());
      formData.append("Grazing_Acres", this.createPostingForm.value.Grazing_Acres.trim());
      formData.append("Acre_Hay_Land", this.createPostingForm.value.Acre_Hay_Land.trim());
      formData.append("Deep_Well", this.createPostingForm.value.Deep_Well.trim());
      formData.append("livestock", this.createPostingForm.value.livestock.trim());
      formData.append("Location_and_Access", this.createPostingForm.value.Location_and_Access.trim());
      formData.append("acers_of_grass_hay", this.createPostingForm.value.acers_of_grass_hay.trim());
      formData.append("acers_of_dry_land", this.createPostingForm.value.acers_of_dry_land.trim());
      formData.append("acers_of_flood_irrigated_alfalfa", this.createPostingForm.value.acers_of_flood_irrigated_alfalfa.trim());
      formData.append("acers_of_BLM_lease", this.createPostingForm.value.acers_of_BLM_lease.trim());
      formData.append("Cross_fence", this.createPostingForm.value.Cross_fence.trim());
      formData.append("OCCUPANCY_RATE", this.createPostingForm.value.OCCUPANCY_RATE.trim());
      formData.append("CONCESSION", this.createPostingForm.value.CONCESSION.trim());
      formData.append("MOORINGS", this.createPostingForm.value.MOORINGS.trim());
      formData.append("MAX_LENGHT", this.createPostingForm.value.MAX_LENGHT.trim());
      formData.append("MAX_DEPTH", this.createPostingForm.value.MAX_DEPTH.trim());
      formData.append("DRY_DOCK", this.createPostingForm.value.DRY_DOCK.trim());
      formData.append("AREA_TOTAL", this.createPostingForm.value.AREA_TOTAL.trim());
      formData.append("HAULING_CAPACITY", this.createPostingForm.value.HAULING_CAPACITY.trim());
      formData.append("BUILDINGS", this.createPostingForm.value.BUILDINGS.trim());
      formData.append("MARINA_STORE", this.createPostingForm.value.MARINA_STORE.trim());
      formData.append("FUEL_DISPENSING", this.createPostingForm.value.FUEL_DISPENSING.trim());
      formData.append("RESTAURANT", this.createPostingForm.value.RESTAURANT.trim());
      formData.append("PARKING_SPACES", this.createPostingForm.value.PARKING_SPACES.trim());
      formData.append("EQUIPMENT_INC", this.createPostingForm.value.EQUIPMENT_INC.trim());
      formData.append("YACHT_SERVICE", this.createPostingForm.value.YACHT_SERVICE.trim());
      formData.append("PROFITABLE", this.createPostingForm.value.PROFITABLE.trim());
      formData.append("Investement_Highlights", this.createPostingForm.value.Investement_Highlights.trim());
      formData.append("Executive_Summary", this.createPostingForm.value.Executive_Summary.trim());
      formData.append("Business_price", this.createPostingForm.value.Business_price.trim());
      formData.append("No_Stories", this.createPostingForm.value.No_Stories.trim());
      formData.append("Rentable_Building_Area", this.createPostingForm.value.Rentable_Building_Area.trim());
      formData.append("Activity_adventure", this.createPostingForm.value.Activity_adventure.trim());
      formData.append("popular_amenities", this.createPostingForm.value.popular_amenities.trim());
      formData.append("suites", this.createPostingForm.value.suites.trim());
      formData.append("Beds", this.createPostingForm.value.Beds.trim());
      formData.append("Furniture_Fixtures_Equipment", this.createPostingForm.value.Furniture_Fixtures_Equipment.trim());
      formData.append("number_of_rooms", this.createPostingForm.value.number_of_rooms.trim());
      formData.append("entertainment", this.createPostingForm.value.entertainment.trim());
      formData.append("Access_and_Parking", this.createPostingForm.value.Access_and_Parking.trim());
      formData.append("kitchens", this.createPostingForm.value.kitchens.trim());
      formData.append("living_quarters", this.createPostingForm.value.living_quarters.trim());
      formData.append("swimming_pool", this.createPostingForm.value.swimming_pool.trim());
      formData.append("corridor", this.createPostingForm.value.corridor.trim());
      formData.append("Driveway", this.createPostingForm.value.Driveway.trim());
      formData.append("property_id", this.createPostingForm.value.property_id.trim());
      formData.append("sale_condition", this.createPostingForm.value.sale_condition.trim());
      formData.append("listing_type", this.createPostingForm.value.listing_type.trim());
      formData.append("Agricultural_Uses", this.createPostingForm.value.Agricultural_Uses.trim());
      formData.append("Land", this.createPostingForm.value.Land.trim());
      formData.append("Irrigation_water", this.createPostingForm.value.Irrigation_water.trim());
      formData.append("Acreage", this.createPostingForm.value.Acreage.trim());
      formData.append("trading_hours", this.createPostingForm.value.trading_hours.trim());
      formData.append("home_based", this.createPostingForm.value.home_based.trim());
      formData.append("Relocatable", this.createPostingForm.value.Relocatable.trim());
      formData.append("Tenancy", this.createPostingForm.value.Tenancy.trim());
      formData.append("Transportation", this.createPostingForm.value.Transportation.trim());
      //formData.append("Sale_Flyer_upload", this.createPostingForm.value.Sale_Flyer);
      formData.append("Average_Daily_Rate", this.createPostingForm.value.Average_Daily_Rate.trim());
      formData.append("Room_Mix_Info", this.createPostingForm.value.Room_Mix_Info.trim());
      formData.append("Zoning", this.createPostingForm.value.Zoning.trim());
      formData.append("Parking", this.createPostingForm.value.Parking.trim());
      formData.append("Frontage", this.createPostingForm.value.Frontage.trim());
      formData.append("NOI", this.createPostingForm.value.NOI.trim());
      formData.append("Building_Height", this.createPostingForm.value.Building_Height.trim());
      formData.append("Slab_to_Slab", this.createPostingForm.value.Slab_to_Slab.trim());
      formData.append("Building_FAR", this.createPostingForm.value.Building_FAR.trim());
      formData.append("Land_acres", this.createPostingForm.value.Land_acres.trim());
      formData.append("Occupancy", this.createPostingForm.value.Occupancy.trim());
      formData.append("Major_Tenants", this.createPostingForm.value.Major_Tenants.trim());
      formData.append("Nearby_Amentities", this.createPostingForm.value.Nearby_Amentities.trim());
      formData.append("Financial_Summary", this.createPostingForm.value.Financial_Summary.trim());
      formData.append("Demographics", this.createPostingForm.value.Demographics.trim());
      formData.append("Number_of_Lots", this.createPostingForm.value.Number_of_Lots.trim());
      formData.append("Price_per_lot", this.createPostingForm.value.Price_per_lot.trim());
      formData.append("Acres_per_lot", this.createPostingForm.value.Acres_per_lot.trim());
      formData.append("Total_Lot_Size", this.createPostingForm.value.Total_Lot_Size.trim());
      formData.append("Number_Licenses", this.createPostingForm.value.Number_Licenses.trim());
      formData.append("License_Mix_Info", this.createPostingForm.value.License_Mix_Info.trim());
      formData.append("Nearby_Amenities", this.createPostingForm.value.Nearby_Amenities.trim());
      formData.append("Price_per_acreage", this.createPostingForm.value.Price_per_acreage.trim());
      formData.append("Number_Buildings", this.createPostingForm.value.Number_Buildings.trim());
      formData.append("Sq_ft_per_building", this.createPostingForm.value.Sq_ft_per_building.trim());
      formData.append("No_Acres", this.createPostingForm.value.No_Acres.trim());
      formData.append("Amenities", this.createPostingForm.value.Amenities.trim());
      formData.append("Year_Built", this.createPostingForm.value.Year_Built.trim());
      formData.append("Number_of_Drive_In_Grade_Level_Doors", this.createPostingForm.value.Number_of_Drive_In_Grade_Level_Doors.trim());
      formData.append("Price_per_Bed", this.createPostingForm.value.Price_per_Bed.trim());
      formData.append("Operating_Schedule", this.createPostingForm.value.Operating_Schedule.trim());
      formData.append("No_Barns", this.createPostingForm.value.No_Barns.trim());
      formData.append("Stables_per_barn", this.createPostingForm.value.Stables_per_barn.trim());
      formData.append("Total_Stables", this.createPostingForm.value.Total_Stables.trim());
      formData.append("Slip_Mix_Info", this.createPostingForm.value.Slip_Mix_Info.trim());
      formData.append("Sale_Conditions", this.createPostingForm.value.Sale_Conditions)
      formData.append("No_Sites", this.createPostingForm.value.No_Sites.trim());
      formData.append("Site_Mix_Info", this.createPostingForm.value.Site_Mix_Info.trim());
      formData.append("Water_Frontage", this.createPostingForm.value.Water_Frontage.trim());
      formData.append("No_Buildings", this.createPostingForm.value.No_Buildings.trim());
      formData.append("sqFeetPerBuilding", this.createPostingForm.value.sqFeetPerBuilding.trim());
      formData.append("No_Slips", this.createPostingForm.value.No_Slips.trim());
      formData.append("Land_Type", this.createPostingForm.value.Land_Type.trim());
      formData.append("fractional_share_choice_percentage_or_unit", this.createPostingForm.value.fractional_share_choice_percentage_or_unit);
      formData.append("fractional_share_text_percentage_or_unit", this.createPostingForm.value.fractional_share_text_percentage_or_unit);
      formData.append("offering_Price_fractional_ownership", this.createPostingForm.value.offering_Price_fractional_ownership);
      if (this.pdfFileUploadd.length != 0) {
        formData.append("pdfFile", this.pdfFileUploadd[0]);
      }    
      if (this.saleFlayerPdfFiledata.length != 0) {
        formData.append("sale_flyer_pdfFile", this.saleFlayerPdfFiledata[0]);
      }
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      if (this.getParamsId != null) {
        formData.append("Form_Serial_Number", this.Form_Serial_Number);
        formData.append("previous_pdf_file", JSON.stringify(this.prevuiousPdf));
        formData.append("previous_sale_flyer_pdf_file", JSON.stringify(this.getPreviousSaleFlayerPdf));
        formData.append("previous_images", JSON.stringify(this.getPhtosALL));
        this.UserService.UpdateListingBusiness(formData, this.getParamsId).subscribe(result => {
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
        this.UserService.CreateBusinessListing(formData).subscribe(result => {
          //console.log("result : ", result);
          this.loading = false;
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // localStorage.setItem('BusinessCurrentSerialNumber', JSON.stringify((result['Form_Serial_Number'] + 1)));
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
