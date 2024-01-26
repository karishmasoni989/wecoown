import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../../service/country-state-city.service';
@Component({
  selector: 'app-real-estate-sale',
  templateUrl: './real-estate-sale.component.html',
  styleUrls: ['./real-estate-sale.component.css']
})
export class RealEstateSaleComponent implements OnInit {
  createPostingForm: FormGroup;
  selectedItemsList = [];
  pdfFileUploadd: any[] = [];
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
  getAllCountry: any;
  getAllCities: Object;
  getAllStates: Object;
  loading = false;
  getParamsId: string;
  getParamsName: string;
  getData: any;
  getPhtosALL: any;
  executive_summary: any;
  links: any;
  Half_Bathrooms: any;
  Full_Bathrooms: any;
  property_type: any;
  property_subtype: any;
  Pool_Features: any;
  Kitchen_and_Dining: any;
  Spa_Features: any;
  invesment_highlights: any;
  address_line1: any;
  address_line2: any;
  city: any;
  state: any;
  country: any;
  zipcode: any;
  landmark: any;
  space: any;
  Total_Rooms: any;
  Den_Description: any;
  Family_Room_Description: any;
  Living_Room_Description: any;
  Parcel_Number: any;
  Land_Assessment: any;
  Improvements_Assessment: any;
  Total_Assessment: any;
  Storage: any;
  Total_Bathrooms: any;
  price: any;
  price_per_unit: any;
  cap_rate: any;
  gross_rent_multiplier: any;
  amenities: any;
  Bathroom_1_Features: any;
  Bedrooms: any;
  percentage_leased: any;
  Bedroom_1_Description: any;
  parking: any;
  tenancy: any;
  building_height: any;
  floors: any;
  typical_floor_size: any;
  building_far: any;
  land_acres: any;
  slab_to_slab: any;
  Dining_Room_Description: any;
  Appliances: any;
  Laundry_Features: any;
  Interior_Features: any;
  Flooring: any;
  View: any;
  Association: any;
  Association_Fee: any;
  Association_Fee_Frequency: any;
  Association_Fee_Includes: any;
  Association_Amenities: any;
  Association_Name: any;
  Association_Phone: any;
  Calculated_Total_Monthly_Association_Fees: any;
  Number_of_Units: any;
  Source_Listing_Status: any;
  Disclaimer: any;
  Cross_Street: any;
  Restrictions: any;
  Area: any;
  Source_Neighborhood: any;
  Subdivision: any;
  Source_System_Name: any;
  Miscellaneous: any;
  Ownership_Type: any;
  Coming_Soon_Date: any;
  Year_Built: any;
  Property_Age: any;
  House_Style: any;
  Structure_Type: any;
  Building_Exterior_Type: any;
  Local_Home_Services: any;
  Levels_or_Stories: any;
  Entry_Level: any;
  Construction_Materials: any;
  Roof: any;
  Total_Square_Feet_Living: any;
  Foundation_Details: any;
  Living_Area_Source: any;
  Garage_Description: any;
  Driveway: any;
  Parking_Features: any;
  Accessibility_Features: any;
  Lot_Description: any;
  Lot_Dimensions: any;
  Lot_Size_Acres: any;
  Lot_Size_Square_Feet: any;
  Fireplace_Features: any;
  Number_of_Fireplaces: any;
  Heating_Features: any;
  Cooling_Features: any;
  Nearby_Schools: any;
  Neighborhood: any;
  zoning: any;
  Community_Features: any;
  unit_amenities: any;
  site_amenities: any;
  Utilities: any;
  subpropertyType: any;
  public invoiceForm: FormGroup;
  three_year_revenue: any;
  purpose: any;
  Tittle_Name: any;
  Serial_Number: any;
  getCurrentSerialNumber: string;
  Floor_Plans: any;
  Unit_Features: any;
  phone: any;
  email: any;
  price_from: any;
  price_to: any;
  Overview: any;
  Lease_Community_Features: any;
  Lease_Year_Built: any;
  prevuiousPdf: any;
  selling_price: any;
  Sale_Conditions: any;
  Apartment_Style: any;
  building_class: any;
  building_size: any;
  No_of_Stories: any;
  Parking_Ratio: any;
  Opportunity_Zone: any;
  Price_inclusive_of_fees: any;
  transportation: any;
  nearby_amenities: any;
  Annual_Taxes: any;
  Tax_Year: any;
  Price_Per_SF: any;
  Listing_Status: any;
  MLS: any;
  Parking_Spaces: any;
  Architecture_Style: any;
  Key_features: any;
  Basement: any;
  construction_type_and_style: any;
  Material_information: any;
  Notable_dates: any;
  Community: any;
  Utilitie_Green_Energy_Details: any;
  Rentable_Building_Area: any;
  Tenancy: any;
  Clear_Ceiling_Height: any;
  No_of_Dock_High: any;
  Tenant: any;
  Industry: any;
  SF_Occupied: any;
  Rent_SF: any;
  Lease_End: any;
  Asset_Type: any;
  Primary_Property_Type: any;
  Zoning_Designation: any;
  Occupancy: any;
  Type_of_Ownership: any;
  Event_Item: any;
  Size: any;
  Security: any;
  HOA: any;
  Other_construction: any;
  Other_property_information: any;
  Other_financial_information: any;
  Location: any;
  Inventory: any;
  Building_SF: any;
  Employees: any;
  Facilities: any;
  Competition: any;
  Growth_and_Expansion: any;
  Financing: any;
  Support_and_Training: any;
  Percent_Leased: any;
  Building_Height: any;
  Typical_Floor_Size: any;
  Slab_To_Slab: any;
  Building_FAR: any;
  Land_Acres: any;
  space_size: any;
  space_use: any;
  space_condition: any;
  space_available: any;
  Region: any;
  Development: any;
  Lifestyles: any;
  Property_Name: any;
  Population: any;
  Frontage: any;
  Loading_Docks: any;
  lease_type: any;
  property_facts: any;
  sale_type: any;
  About: any;
  About_this_property: any;
  property_taxes: any;
  Bathrooms: any;
  Pool_Spa: any;
  Homeowners_Association: any;
  zoning_code: any;
  Listed_By_Agent: any;
  TAXES_OPERATING_EXPENSES: any;
  Half_Baths: any;
  Total_Baths: any;
  Living_Area: any;
  Other_rooms: any;
  Home_Features: any;
  Multi_Unit_Info: any;
  building_construction: any;
  Heating_Cooling: any;
  Land_Info: any;
  Community_Features_Amenities: any;
  Property_Price_Tax: any;
  Bedrooms_Bathrooms: any;
  Type_and_style: any;
  Condition: any;
  Community_and_Neighborhood_Details: any;
  Major_Tenants: any;
  Detailed_Description: any;
  Everything: any;
  Facts_features: any;
  other_interior_features: any;
  construction_details: any;
  Garage_and_Parking: any;
  property_details: any;
  Parking: any;
  Accessibility: any;
  Property: any;
  Other_property: any;
  HOA_financial_details: any;
  Property_Address: any;
  interior_details: any;
  Year_of_construction: any;
  lease_end: any;
  Type: any;
  NEARBY_MAJOR_RETAILERS: any;
  Property_Type_PF: any;
  Property_Subtype_PF: any;
  County: any;
  Heating: any;
  Cooling: any;
  Title: any;
  Brokerage_Company: any;
  AVAILABLE: any;
  fractional_share_choice_percentage_or_unit: string;
  fractional_share_text_percentage_or_unit: any;
  offering_Price_fractional_ownership: any;

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
    $('.apartmentRE').hide();
    $('.castlesRE').hide();
    $('.churchesRE').hide();
    $('.estate-homeRE').hide();
    $('.industrialRE').hide();
    $('.landRE').hide();
    $('.single-familyRE').hide();
    $('.vacation-homeRE').hide();
    $('.mobile-homeRE').hide();
    $('.private-islandRE').hide();
    $('.villagesRE').hide();
    $('.retailRE').hide();
    $('.officeRE').hide();
    //$('.general').hide();
    $('.property22').hide();
    $('.fieldsForListedAgent').hide();
    this.country = "";
    this.state = "";
    this.city = "";
    this.property_subtype = "";
    this.purpose = "";
    this.Listed_By_Agent = "";
    this.property_type = "Real Estate";
    // $('.fieldsForSale').show();
    // $('.fieldsForLease').hide();
    this.fractional_share_choice_percentage_or_unit = "";
    this.getParamsId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.getParamsName = this.activatedRoute.snapshot.queryParamMap.get('name');
    this.checkmembership();
    this.getRealEstateCount();
    // alert(typeof(this.getCurrentSerialNumber))
    this.getDataPostById();
    this.getPropertyType();
    this.invoiceForm = this.FormBuilder.group({
      itemRows: this.FormBuilder.array([this.initItemRows()])
    });
    this.createPostingForm = new FormGroup({
      invesment_highlights: new FormControl('', [Validators.required]),
      executive_summary: new FormControl(''),
      links: new FormControl(''),
      Serial_Number: new FormControl(),
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
      three_year_revenue: new FormControl(''),
      Total_Rooms: new FormControl(''),
      Den_Description: new FormControl(''),
      Family_Room_Description: new FormControl(''),
      Living_Room_Description: new FormControl(''),

      Parcel_Number: new FormControl(''),
      Land_Assessment: new FormControl(''),
      Improvements_Assessment: new FormControl(''),
      Total_Assessment: new FormControl(''),

      price: new FormControl(''),
      price_per_unit: new FormControl(''),
      cap_rate: new FormControl(''),
      gross_rent_multiplier: new FormControl(''),

      amenities: new FormControl(),

      // property facts
      Storage: new FormControl(''),
      Total_Bathrooms: new FormControl(''),
      Full_Bathrooms: new FormControl(''),
      Half_Bathrooms: new FormControl(''),
      property_type: new FormControl(''),
      property_subtype: new FormControl(''),
      Bathroom_1_Features: new FormControl(''),
      Pool_Features: new FormControl(''),
      Spa_Features: new FormControl(''),
      Bedrooms: new FormControl(''),
      Bedroom_1_Description: new FormControl(''),
      Kitchen_and_Dining: new FormControl(''),

      Dining_Room_Description: new FormControl(''),
      Appliances: new FormControl(''),
      Laundry_Features: new FormControl(''),
      Interior_Features: new FormControl(''),
      Flooring: new FormControl(''),
      View: new FormControl(''),
      Association: new FormControl(''),
      Association_Fee: new FormControl(''),
      Association_Fee_Frequency: new FormControl(''),
      Association_Fee_Includes: new FormControl(''),
      Association_Amenities: new FormControl(''),
      Association_Name: new FormControl(''),
      Association_Phone: new FormControl(''),
      Calculated_Total_Monthly_Association_Fees: new FormControl(''),
      Number_of_Units: new FormControl(''),
      Source_Listing_Status: new FormControl(''),
      Disclaimer: new FormControl(''),
      Cross_Street: new FormControl(''),
      Restrictions: new FormControl(''),
      Area: new FormControl(''),
      Source_Neighborhood: new FormControl(''),
      Subdivision: new FormControl(''),
      Source_System_Name: new FormControl(''),
      Miscellaneous: new FormControl(''),
      Ownership_Type: new FormControl(''),
      Coming_Soon_Date: new FormControl(''),
      Year_Built: new FormControl(''),
      Property_Age: new FormControl(''),
      House_Style: new FormControl(''),
      Structure_Type: new FormControl(''),
      Building_Exterior_Type: new FormControl(''),
      Local_Home_Services: new FormControl(''),
      Levels_or_Stories: new FormControl(''),
      Entry_Level: new FormControl(''),
      Construction_Materials: new FormControl(''),
      Roof: new FormControl(''),
      Total_Square_Feet_Living: new FormControl(''),
      Foundation_Details: new FormControl(''),
      Living_Area_Source: new FormControl(''),
      Garage_Description: new FormControl(''),
      Driveway: new FormControl(''),
      Parking_Features: new FormControl(''),
      Accessibility_Features: new FormControl(''),
      Lot_Description: new FormControl(''),
      Lot_Dimensions: new FormControl(''),
      Lot_Size_Acres: new FormControl(''),
      Lot_Size_Square_Feet: new FormControl(''),
      Fireplace_Features: new FormControl(''),
      Number_of_Fireplaces: new FormControl(''),
      Heating_Features: new FormControl(''),
      Cooling_Features: new FormControl(''),
      // Nearby_Schools: new FormControl([{
      //   Rating: new FormControl(''),
      //   School_Name: new FormControl(''),
      //   Grades: new FormControl(''),
      //   Distance: new FormControl(''),
      // }]),
      // Neighborhood: new FormControl([{
      //   Near_by_city: new FormControl(''),
      //   Near_by_country: new FormControl(''),
      // }]),
      zoning: new FormControl(''),
      Community_Features: new FormControl(''),
      unit_amenities: new FormControl(''),
      site_amenities: new FormControl(''),
      Utilities: new FormControl(''),

      // fields for lease
      // Community_Features, year built, property type in both
      Floor_Plans: new FormControl(''),
      Overview: new FormControl(''),
      Unit_Features: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      price_from: new FormControl(''),
      price_to: new FormControl(''),
      Lease_Community_Features: new FormControl(''),
      Lease_Year_Built: new FormControl(''),

      // New fields added after document
      Sale_Conditions: new FormControl(''),
      Apartment_Style: new FormControl(''),
      building_class: new FormControl(''),
      building_size: new FormControl(''),
      No_of_Stories: new FormControl(''),
      Parking_Ratio: new FormControl(''),
      Opportunity_Zone: new FormControl(''),
      Price_inclusive_of_fees: new FormControl(''),
      transportation: new FormControl(''),
      nearby_amenities: new FormControl(''),
      Annual_Taxes: new FormControl(''),
      Tax_Year: new FormControl(''),
      Price_Per_SF: new FormControl(''),
      Listing_Status: new FormControl(''),
      MLS: new FormControl(''),
      Parking_Spaces: new FormControl(''),
      Architecture_Style: new FormControl(''),
      Key_features: new FormControl(''),
      Basement: new FormControl(''),
      construction_type_and_style: new FormControl(''),
      Material_information: new FormControl(''),
      Notable_dates: new FormControl(''),
      Community: new FormControl(''),
      Utilitie_Green_Energy_Details: new FormControl(''),
      Rentable_Building_Area: new FormControl(''),
      Tenancy: new FormControl(''),
      Clear_Ceiling_Height: new FormControl(''),
      No_of_Dock_High: new FormControl(''),
      Tenant: new FormControl(''),
      Industry: new FormControl(''),
      SF_Occupied: new FormControl(''),
      Rent_SF: new FormControl(''),
      Lease_End: new FormControl(''),
      Asset_Type: new FormControl(''),
      Primary_Property_Type: new FormControl(''),
      Zoning_Designation: new FormControl(''),
      Occupancy: new FormControl(''),
      Type_of_Ownership: new FormControl(''),
      Event_Item: new FormControl(''),
      Size: new FormControl(''),
      Security: new FormControl(''),
      HOA: new FormControl(''),
      Other_construction: new FormControl(''),
      Other_property_information: new FormControl(''),
      Other_financial_information: new FormControl(''),
      Location: new FormControl(''),
      Inventory: new FormControl(''),
      Building_SF: new FormControl(''),
      Employees: new FormControl(''),
      Facilities: new FormControl(''),
      Competition: new FormControl(''),
      Growth_and_Expansion: new FormControl(''),
      Financing: new FormControl(''),
      Support_and_Training: new FormControl(''),
      Percent_Leased: new FormControl(''),
      Building_Height: new FormControl(''),
      Typical_Floor_Size: new FormControl(''),
      Slab_To_Slab: new FormControl(''),
      Building_FAR: new FormControl(''),
      Land_Acres: new FormControl(''),
      space: new FormControl(''),
      space_size: new FormControl(''),
      space_use: new FormControl(''),
      space_condition: new FormControl(''),
      space_available: new FormControl(''),
      Region: new FormControl(''),
      Development: new FormControl(''),
      Lifestyles: new FormControl(''),
      Property_Name: new FormControl(''),
      Population: new FormControl(''),
      Frontage: new FormControl(''),
      Loading_Docks: new FormControl(''),
      lease_type: new FormControl(''),
      property_facts: new FormControl(''),
      sale_type: new FormControl(''),
      About: new FormControl(''),
      About_this_property: new FormControl(''),
      property_taxes: new FormControl(''),
      Bathrooms: new FormControl(''),
      Pool_Spa: new FormControl(''),
      Homeowners_Association: new FormControl(''),
      zoning_code: new FormControl(''),
      Listed_By_Agent: new FormControl(''),
      TAXES_OPERATING_EXPENSES: new FormControl(''),
      Half_Baths: new FormControl(''),
      Total_Baths: new FormControl(''),
      Living_Area: new FormControl(''),
      Other_rooms: new FormControl(''),
      Home_Features: new FormControl(''),
      Multi_Unit_Info: new FormControl(''),
      building_construction: new FormControl(''),
      Heating_Cooling: new FormControl(''),
      Land_Info: new FormControl(''),
      Community_Features_Amenities: new FormControl(''),
      Property_Price_Tax: new FormControl(''),
      Bedrooms_Bathrooms: new FormControl(''),
      Type_and_style: new FormControl(''),
      Condition: new FormControl(''),
      Community_and_Neighborhood_Details: new FormControl(''),
      Major_Tenants: new FormControl(''),
      Detailed_Description: new FormControl(''),
      Everything: new FormControl(''),
      Facts_features: new FormControl(''),
      other_interior_features: new FormControl(''),
      construction_details: new FormControl(''),
      Garage_and_Parking: new FormControl(''),
      property_details: new FormControl(''),
      Parking: new FormControl(''),
      Accessibility: new FormControl(''),
      Property: new FormControl(''),
      Other_property: new FormControl(''),
      HOA_financial_details: new FormControl(''),
      Property_Address: new FormControl(''),
      interior_details: new FormControl(''),
      Year_of_construction: new FormControl(''),
      Type: new FormControl(''),
      NEARBY_MAJOR_RETAILERS: new FormControl(''),
      Property_Type_PF: new FormControl(''),
      Property_Subtype_PF: new FormControl(''),
      County: new FormControl(''),
      Heating: new FormControl(''),
      Cooling: new FormControl(''),
      Title: new FormControl(''),
      Brokerage_Company: new FormControl(''),
      AVAILABLE: new FormControl(''),
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
    this.UserService.getRealEstaeAllCount().subscribe(result => {
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
    $('.property22').show();
    if (item == "Apartment Buildings") {
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.apartmentRE').show();
    } else if (item == "Castles & Chateaux") {
      $('.apartmentRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.castlesRE').show();
    } else if (item == "Churches & Temples") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.churchesRE').show();
    } else if (item == "Estate Homes and Luxury Mansions") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.estate-homeRE').show();
    } else if (item == "Industrial Plants & Warehouses") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.industrialRE').show();
    } else if (item == "Land Parcels") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.landRE').show();
    } else if (item == "Mobile Homes & RV Parks") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.mobile-homeRE').show();
    } else if (item == "Office Buildings") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').show();
    } else if (item == "Private Islands") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.private-islandRE').show();
    } else if (item == "Retail Shopping Malls") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.officeRE').hide();
      $('.retailRE').show();
    } else if (item == "Single Family Homes & Condos") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.single-familyRE').show();
    } else if (item == "Vacation Homes & Timeshares") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.villagesRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.vacation-homeRE').show();
    } else if (item == "Villages & Towns") {
      $('.apartmentRE').hide();
      $('.castlesRE').hide();
      $('.churchesRE').hide();
      $('.estate-homeRE').hide();
      $('.industrialRE').hide();
      $('.landRE').hide();
      $('.single-familyRE').hide();
      $('.vacation-homeRE').hide();
      $('.mobile-homeRE').hide();
      $('.private-islandRE').hide();
      $('.retailRE').hide();
      $('.officeRE').hide();
      $('.villagesRE').show();
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

  ListedByAgent(val) {
    if (val === 'Yes') {
      $('.fieldsForListedAgent').show();
    }
    else if (val === '') {
      $('.fieldsForListedAgent').hide();
    }
    else if (val === 'No') {
      $('.fieldsForListedAgent').hide();
    }
  }
  // for nearby school
  get formArr() {
    return this.invoiceForm.get('itemRows') as FormArray;
  }
  initItemRows() {
    return this.FormBuilder.group({
      Rating: [''],
      School_Name: [''],
      Grades: [''],
      Distance: [''],
    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  // end nearby school
  // for neighbour city country
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

          // document.getElementById("all-sub-category")['readOnly'] = true;
          //$('.general').show();
          $('.property22').show();
          if (this.getData[0].property_subtype == "Apartment Buildings") {
            $('.apartmentRE').show();
          } else if (this.getData[0].property_subtype == "Castles & Chateaux") {
            $('.castlesRE').show();
          } else if (this.getData[0].property_subtype == "Churches & Temples") {
            $('.churchesRE').show();
          } else if (this.getData[0].property_subtype == "Estate Homes and Luxury Mansions") {
            $('.estate-homeRE').show();
          } else if (this.getData[0].property_subtype == "Industrial Plants & Warehouses") {
            $('.industrialRE').show();
          } else if (this.getData[0].property_subtype == "Land Parcels") {
            $('.landRE').show();
          } else if (this.getData[0].property_subtype == "Mobile Homes & RV Parks") {
            $('.mobile-homeRE').show();
          } else if (this.getData[0].property_subtype == "Office Buildings") {
            $('.officeRE').show();
          } else if (this.getData[0].property_subtype == "Private Islands") {
            $('.private-islandRE').show();
          } else if (this.getData[0].property_subtype == "Retail Shopping Malls") {
            $('.retailRE').show();
          } else if (this.getData[0].property_subtype == "Single Family Homes & Condos") {
            $('.single-familyRE').show();
          } else if (this.getData[0].property_subtype == "Vacation Homes & Timeshares") {
            $('.vacation-homeRE').show();
          } else if (this.getData[0].property_subtype == "Villages & Towns") {
            $('.villagesRE').show();
          }
          this.getPhtosALL = this.getData[0].property_photos;
          this.invesment_highlights = this.getData[0].invesment_highlights;
          this.executive_summary = this.getData[0].executive_summary;
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
          this.three_year_revenue = this.getData[0].three_year_revenue;
          this.space = this.getData[0].space;
          this.Total_Rooms = this.getData[0].Total_Rooms;
          this.Den_Description = this.getData[0].Den_Description;
          this.Family_Room_Description = this.getData[0].Family_Room_Description;
          this.Living_Room_Description = this.getData[0].Living_Room_Description;
          this.Parcel_Number = this.getData[0].Parcel_Number;
          this.Land_Assessment = this.getData[0].Land_Assessment;
          this.Improvements_Assessment = this.getData[0].Improvements_Assessment;
          this.Total_Assessment = this.getData[0].Total_Assessment;
          this.Storage = this.getData[0].Storage;
          this.Total_Bathrooms = this.getData[0].Total_Bathrooms;
          this.price = this.getData[0].price;
          if (this.purpose === "No Ready") {
            this.price = "";
            $("#price").attr('readonly', 'readonly');
          } else {
            $("#price").removeAttr('readonly');
          }
          this.price_per_unit = this.getData[0].price_per_unit;
          this.cap_rate = this.getData[0].cap_rate;
          this.gross_rent_multiplier = this.getData[0].gross_rent_multiplier;
          this.amenities = this.getData[0].amenities;

          // property facts
          this.Full_Bathrooms = this.getData[0].Full_Bathrooms;
          this.Half_Bathrooms = this.getData[0].Half_Bathrooms;
          this.property_type = this.getData[0].property_type;
          this.property_subtype = this.getData[0].property_subtype;
          this.Bathroom_1_Features = this.getData[0].Bathroom_1_Features;
          this.Pool_Features = this.getData[0].Pool_Features;
          this.Spa_Features = this.getData[0].Spa_Features;
          this.Bedrooms = this.getData[0].Bedrooms;
          this.Bedroom_1_Description = this.getData[0].Bedroom_1_Description;
          this.Kitchen_and_Dining = this.getData[0].Kitchen_and_Dining;


          this.Dining_Room_Description = this.getData[0].Dining_Room_Description;
          this.Appliances = this.getData[0].Appliances;
          this.Laundry_Features = this.getData[0].Laundry_Features;
          this.Interior_Features = this.getData[0].Interior_Features;
          this.Flooring = this.getData[0].Flooring;
          this.View = this.getData[0].View;
          this.Association = this.getData[0].Association;
          this.Association_Fee = this.getData[0].Association_Fee;
          this.Association_Fee_Frequency = this.getData[0].Association_Fee_Frequency;
          this.Association_Fee_Includes = this.getData[0].Association_Fee_Includes;
          this.Association_Amenities = this.getData[0].Association_Amenities;
          this.Association_Name = this.getData[0].Association_Name;
          this.Association_Phone = this.getData[0].Association_Phone;
          this.Calculated_Total_Monthly_Association_Fees = this.getData[0].Calculated_Total_Monthly_Association_Fees;
          this.Number_of_Units = this.getData[0].Number_of_Units;
          this.Source_Listing_Status = this.getData[0].Source_Listing_Status;
          this.Disclaimer = this.getData[0].Disclaimer;
          this.Cross_Street = this.getData[0].Cross_Street;
          this.Restrictions = this.getData[0].Restrictions;
          this.Area = this.getData[0].Area;
          this.Source_Neighborhood = this.getData[0].Source_Neighborhood;
          this.Subdivision = this.getData[0].Subdivision;
          this.Source_System_Name = this.getData[0].Source_System_Name;
          this.Miscellaneous = this.getData[0].Miscellaneous;
          this.Ownership_Type = this.getData[0].Ownership_Type;
          this.Coming_Soon_Date = this.getData[0].Coming_Soon_Date;
          this.Year_Built = this.getData[0].Year_Built;
          this.Property_Age = this.getData[0].Property_Age;
          this.House_Style = this.getData[0].House_Style;
          this.Structure_Type = this.getData[0].Structure_Type;
          this.Building_Exterior_Type = this.getData[0].Building_Exterior_Type;
          this.Local_Home_Services = this.getData[0].Local_Home_Services;
          this.Levels_or_Stories = this.getData[0].Levels_or_Stories;
          this.Entry_Level = this.getData[0].Entry_Level;
          this.Construction_Materials = this.getData[0].Construction_Materials;
          this.Roof = this.getData[0].Roof;
          this.Total_Square_Feet_Living = this.getData[0].Total_Square_Feet_Living;
          this.Foundation_Details = this.getData[0].Foundation_Details;
          this.Living_Area_Source = this.getData[0].Living_Area_Source;
          this.Garage_Description = this.getData[0].Garage_Description;
          this.Driveway = this.getData[0].Driveway;
          this.Parking_Features = this.getData[0].Parking_Features;
          this.Accessibility_Features = this.getData[0].Accessibility_Features;
          this.Lot_Description = this.getData[0].Lot_Description;
          this.Lot_Dimensions = this.getData[0].Lot_Dimensions;
          this.Lot_Size_Acres = this.getData[0].Lot_Size_Acres;
          this.Lot_Size_Square_Feet = this.getData[0].Lot_Size_Square_Feet;
          this.Fireplace_Features = this.getData[0].Fireplace_Features;
          this.Number_of_Fireplaces = this.getData[0].Number_of_Fireplaces;
          this.Heating_Features = this.getData[0].Heating_Features;
          this.Cooling_Features = this.getData[0].Cooling_Features;
          // this.Nearby_Schools = this.getData[0].Nearby_Schools;
          // this.Neighborhood = this.getData[0].Neighborhood;
          this.zoning = this.getData[0].zoning;
          this.Community_Features = this.getData[0].Community_Features;
          this.unit_amenities = this.getData[0].unit_amenities;
          this.site_amenities = this.getData[0].site_amenities;
          this.Utilities = this.getData[0].Utilities;
          // fields for lease          
          this.Overview = this.getData[0].Overview;
          this.Floor_Plans = this.getData[0].Floor_Plans;
          this.Unit_Features = this.getData[0].Unit_Features;
          this.phone = this.getData[0].phone;
          this.email = this.getData[0].email;
          this.price_from = this.getData[0].price_from;
          this.price_to = this.getData[0].price_to;
          this.Lease_Community_Features = this.getData[0].Lease_Community_Features;
          this.Lease_Year_Built = this.getData[0].Lease_Year_Built;
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

          // New fields added after document
          this.Sale_Conditions = this.getData[0].Sale_Conditions;
          this.Apartment_Style = this.getData[0].Apartment_Style;
          this.building_class = this.getData[0].building_class;
          this.building_size = this.getData[0].building_size;
          this.No_of_Stories = this.getData[0].No_of_Stories;
          this.Parking_Ratio = this.getData[0].Parking_Ratio;
          this.Opportunity_Zone = this.getData[0].Opportunity_Zone;
          this.Price_inclusive_of_fees = this.getData[0].Price_inclusive_of_fees;
          this.transportation = this.getData[0].transportation;
          this.nearby_amenities = this.getData[0].nearby_amenities;
          this.Annual_Taxes = this.getData[0].Annual_Taxes;
          this.Tax_Year = this.getData[0].Tax_Year;
          this.Price_Per_SF = this.getData[0].Price_Per_SF;
          this.Listing_Status = this.getData[0].Listing_Status;
          this.MLS = this.getData[0].MLS;
          this.Parking_Spaces = this.getData[0].Parking_Spaces;
          this.Architecture_Style = this.getData[0].Architecture_Style;
          this.Key_features = this.getData[0].Key_features;
          this.Basement = this.getData[0].Basement;
          this.construction_type_and_style = this.getData[0].construction_type_and_style;
          this.Material_information = this.getData[0].Material_information;
          this.Notable_dates = this.getData[0].Notable_dates;
          this.Community = this.getData[0].Community;
          this.Utilitie_Green_Energy_Details = this.getData[0].Utilitie_Green_Energy_Details;
          this.Rentable_Building_Area = this.getData[0].Rentable_Building_Area;
          this.Tenancy = this.getData[0].Tenancy;
          this.Clear_Ceiling_Height = this.getData[0].Clear_Ceiling_Height;
          this.No_of_Dock_High = this.getData[0].No_of_Dock_High;
          this.Tenant = this.getData[0].Tenant;
          this.Industry = this.getData[0].Industry;
          this.SF_Occupied = this.getData[0].SF_Occupied;
          this.Rent_SF = this.getData[0].Rent_SF;
          this.Lease_End = this.getData[0].Lease_End;
          this.Asset_Type = this.getData[0].Asset_Type;
          this.Primary_Property_Type = this.getData[0].Primary_Property_Type;
          this.Zoning_Designation = this.getData[0].Zoning_Designation;
          this.Occupancy = this.getData[0].Occupancy;
          this.Type_of_Ownership = this.getData[0].Type_of_Ownership;
          this.Event_Item = this.getData[0].Event_Item;
          this.Size = this.getData[0].Size;
          this.Security = this.getData[0].Security;
          this.HOA = this.getData[0].HOA;
          this.Other_construction = this.getData[0].Other_construction;
          this.Other_property_information = this.getData[0].Other_property_information;
          this.Other_financial_information = this.getData[0].Other_financial_information;
          this.Location = this.getData[0].Location;
          this.Inventory = this.getData[0].Inventory;
          this.Building_SF = this.getData[0].Building_SF;
          this.Employees = this.getData[0].Employees;
          this.Facilities = this.getData[0].Facilities;
          this.Competition = this.getData[0].Competition;
          this.Growth_and_Expansion = this.getData[0].Growth_and_Expansion;
          this.Financing = this.getData[0].Financing;
          this.Support_and_Training = this.getData[0].Support_and_Training;
          this.Percent_Leased = this.getData[0].Percent_Leased;
          this.Building_Height = this.getData[0].Building_Height;
          this.Typical_Floor_Size = this.getData[0].Typical_Floor_Size;
          this.Slab_To_Slab = this.getData[0].Slab_To_Slab;
          this.Building_FAR = this.getData[0].Building_FAR;
          this.Land_Acres = this.getData[0].Land_Acres;
          this.space = this.getData[0].space;
          this.space_size = this.getData[0].space_size;
          this.space_use = this.getData[0].space_use;
          this.space_condition = this.getData[0].space_condition;
          this.space_available = this.getData[0].space_available;
          this.Region = this.getData[0].Region;
          this.Development = this.getData[0].Development;
          this.Lifestyles = this.getData[0].Lifestyles;
          this.Property_Name = this.getData[0].Property_Name;
          this.Population = this.getData[0].Population;
          this.Frontage = this.getData[0].Frontage;
          this.Loading_Docks = this.getData[0].Loading_Docks;
          this.lease_type = this.getData[0].lease_type;
          this.property_facts = this.getData[0].property_facts;
          this.sale_type = this.getData[0].sale_type;
          this.About = this.getData[0].About;
          this.About_this_property = this.getData[0].About_this_property;
          this.property_taxes = this.getData[0].property_taxes;
          this.Bathrooms = this.getData[0].Bathrooms;
          this.Pool_Spa = this.getData[0].Pool_Spa;
          this.Homeowners_Association = this.getData[0].Homeowners_Association;
          this.zoning_code = this.getData[0].zoning_code;
          this.Listed_By_Agent = this.getData[0].Listed_By_Agent;
          if (this.Listed_By_Agent === 'Y') {
            $('.fieldsForListedAgent').show();
          }
          else if (this.Listed_By_Agent === '') {
            $('.fieldsForListedAgent').hide();
          }
          else if (this.Listed_By_Agent === 'N') {
            $('.fieldsForListedAgent').hide();
          }
          this.TAXES_OPERATING_EXPENSES = this.getData[0].TAXES_OPERATING_EXPENSES;
          this.Half_Baths = this.getData[0].Half_Baths;
          this.Total_Baths = this.getData[0].Total_Baths;
          this.Living_Area = this.getData[0].Living_Area;
          this.Other_rooms = this.getData[0].Other_rooms;
          this.Home_Features = this.getData[0].Home_Features;
          this.Multi_Unit_Info = this.getData[0].Multi_Unit_Info;
          this.building_construction = this.getData[0].building_construction;
          this.Heating_Cooling = this.getData[0].Heating_Cooling;
          this.Land_Info = this.getData[0].Land_Info;
          this.Community_Features_Amenities = this.getData[0].Community_Features_Amenities;
          this.Property_Price_Tax = this.getData[0].Property_Price_Tax;
          this.Bedrooms_Bathrooms = this.getData[0].Bedrooms_Bathrooms;
          this.Type_and_style = this.getData[0].Type_and_style;
          this.Condition = this.getData[0].Condition;
          this.Community_and_Neighborhood_Details = this.getData[0].Community_and_Neighborhood_Details;
          this.Major_Tenants = this.getData[0].Major_Tenants;
          this.Detailed_Description = this.getData[0].Detailed_Description;
          this.Everything = this.getData[0].Everything;
          this.Facts_features = this.getData[0].Facts_features;
          this.other_interior_features = this.getData[0].other_interior_features;
          this.construction_details = this.getData[0].construction_details;
          this.Garage_and_Parking = this.getData[0].Garage_and_Parking;
          this.property_details = this.getData[0].property_details;
          this.Parking = this.getData[0].Parking;
          this.Accessibility = this.getData[0].Accessibility;
          this.Property = this.getData[0].Property;
          this.Other_property = this.getData[0].Other_property;
          this.HOA_financial_details = this.getData[0].HOA_financial_details;
          this.Property_Address = this.getData[0].Property_Address;
          this.interior_details = this.getData[0].interior_details;
          this.Year_of_construction = this.getData[0].Year_of_construction;
          this.Type = this.getData[0].Type;
          this.NEARBY_MAJOR_RETAILERS = this.getData[0].NEARBY_MAJOR_RETAILERS;
          this.Property_Type_PF = this.getData[0].Property_Type_PF;
          this.Property_Subtype_PF = this.getData[0].Property_Subtype_PF;
          this.County = this.getData[0].County;
          this.Heating = this.getData[0].Heating;
          this.Cooling = this.getData[0].Cooling;
          this.Title = this.getData[0].Title;
          this.Brokerage_Company = this.getData[0].Brokerage_Company;
          this.AVAILABLE = this.getData[0].AVAILABLE;
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
  PdfFileDropped(event) {
    ////console.log("profile filessss : ", event);
    this.pdfFileUploadd = event;
    ////console.log("name of photo : ", this.profilePhotoName);
  }
  // for get sub property type
  getPropertyType() {
    let dataForForm = {
      property_type: "Real Estate"
    }
    this.UserService.getSubPropertyType(dataForForm).subscribe(result => {
      //console.log("ddddddddddddddddd sub type: ", result['data']);
      if (result['success'] == true) {
        this.subpropertyType = (result['data']);
      }
    });
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
  //     //console.log("result111", result111);
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
  deletePreviousPdf(i) {
    this.prevuiousPdf.splice(i, 1);
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
    if (this.createPostingForm.value.property_subtype == "") {
      $('#fileDropRef').focus();
      finalString += "Please select property sub-type.<br>";
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
      formData.append("invesment_highlights", this.createPostingForm.value.invesment_highlights.trim());
      formData.append("executive_summary", this.createPostingForm.value.executive_summary.trim());
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
      formData.append("three_year_revenue", this.createPostingForm.value.three_year_revenue.trim());
      formData.append("Total_Rooms", this.createPostingForm.value.Total_Rooms.trim());
      formData.append("Den_Description", this.createPostingForm.value.Den_Description.trim());
      formData.append("Family_Room_Description", this.createPostingForm.value.Family_Room_Description.trim());
      formData.append("Living_Room_Description", this.createPostingForm.value.Living_Room_Description.trim());
      formData.append("Parcel_Number", this.createPostingForm.value.Parcel_Number.trim());
      formData.append("Land_Assessment", this.createPostingForm.value.Land_Assessment.trim());
      formData.append("Improvements_Assessment", this.createPostingForm.value.Improvements_Assessment.trim());
      formData.append("Total_Assessment", this.createPostingForm.value.Total_Assessment.trim());
      formData.append("Storage", this.createPostingForm.value.Storage.trim());
      formData.append("Total_Bathrooms", this.createPostingForm.value.Total_Bathrooms.trim());
      formData.append("price", this.createPostingForm.value.price);
      formData.append("price_per_unit", this.createPostingForm.value.price_per_unit.trim());
      formData.append("cap_rate", this.createPostingForm.value.cap_rate.trim());
      formData.append("gross_rent_multiplier", this.createPostingForm.value.gross_rent_multiplier.trim());
      formData.append("amenities", this.createPostingForm.value.amenities.trim());

      //  property facts
      formData.append("Full_Bathrooms", this.createPostingForm.value.Full_Bathrooms.trim());
      formData.append("Half_Bathrooms", this.createPostingForm.value.Half_Bathrooms.trim());
      formData.append("property_type", this.createPostingForm.value.property_type.trim());
      formData.append("property_subtype", this.createPostingForm.value.property_subtype.trim());
      formData.append("Pool_Features", this.createPostingForm.value.Pool_Features.trim());
      formData.append("Bathroom_1_Features", this.createPostingForm.value.Bathroom_1_Features.trim());
      formData.append("Spa_Features", this.createPostingForm.value.Spa_Features.trim());
      formData.append("Bedrooms", this.createPostingForm.value.Bedrooms.trim());
      formData.append("Bedroom_1_Description", this.createPostingForm.value.Bedroom_1_Description.trim());
      formData.append("Kitchen_and_Dining", this.createPostingForm.value.Kitchen_and_Dining.trim());

      formData.append("Dining_Room_Description", this.createPostingForm.value.Dining_Room_Description.trim());
      formData.append("Appliances", this.createPostingForm.value.Appliances.trim());
      formData.append("Laundry_Features", this.createPostingForm.value.Laundry_Features.trim());
      formData.append("Interior_Features", this.createPostingForm.value.Interior_Features.trim());
      formData.append("Flooring", this.createPostingForm.value.Flooring.trim());
      formData.append("View", this.createPostingForm.value.View.trim());
      formData.append("Association", this.createPostingForm.value.Association.trim());
      formData.append("Association_Fee", this.createPostingForm.value.Association_Fee.trim());
      formData.append("Association_Fee_Frequency", this.createPostingForm.value.Association_Fee_Frequency.trim());
      formData.append("Association_Fee_Includes", this.createPostingForm.value.Association_Fee_Includes.trim());
      formData.append("Association_Amenities", this.createPostingForm.value.Association_Amenities.trim());
      formData.append("Association_Name", this.createPostingForm.value.Association_Name.trim());
      formData.append("Association_Phone", this.createPostingForm.value.Association_Phone.trim());
      formData.append("Calculated_Total_Monthly_Association_Fees", this.createPostingForm.value.Calculated_Total_Monthly_Association_Fees.trim());
      formData.append("Number_of_Units", this.createPostingForm.value.Number_of_Units.trim());
      formData.append("Source_Listing_Status", this.createPostingForm.value.Source_Listing_Status.trim());
      formData.append("Disclaimer", this.createPostingForm.value.Disclaimer.trim());
      formData.append("Cross_Street", this.createPostingForm.value.Cross_Street.trim());
      formData.append("Restrictions", this.createPostingForm.value.Restrictions.trim());
      formData.append("Area", this.createPostingForm.value.Area.trim());
      formData.append("Source_Neighborhood", this.createPostingForm.value.Source_Neighborhood.trim());
      formData.append("Subdivision", this.createPostingForm.value.Subdivision.trim());
      formData.append("Source_System_Name", this.createPostingForm.value.Source_System_Name.trim());
      formData.append("Miscellaneous", this.createPostingForm.value.Miscellaneous.trim());
      formData.append("Ownership_Type", this.createPostingForm.value.Ownership_Type.trim());
      formData.append("Coming_Soon_Date", this.createPostingForm.value.Coming_Soon_Date.trim());
      formData.append("Year_Built", this.createPostingForm.value.Year_Built.trim());
      formData.append("Property_Age", this.createPostingForm.value.Property_Age.trim());
      formData.append("House_Style", this.createPostingForm.value.House_Style.trim());
      formData.append("Structure_Type", this.createPostingForm.value.Structure_Type.trim());
      formData.append("Building_Exterior_Type", this.createPostingForm.value.Building_Exterior_Type.trim());
      formData.append("Local_Home_Services", this.createPostingForm.value.Local_Home_Services.trim());
      formData.append("Levels_or_Stories", this.createPostingForm.value.Levels_or_Stories.trim());
      formData.append("Entry_Level", this.createPostingForm.value.Entry_Level.trim());
      formData.append("Construction_Materials", this.createPostingForm.value.Construction_Materials.trim());
      formData.append("Roof", this.createPostingForm.value.Roof.trim());
      formData.append("Total_Square_Feet_Living", this.createPostingForm.value.Total_Square_Feet_Living.trim());
      formData.append("Foundation_Details", this.createPostingForm.value.Foundation_Details.trim());
      formData.append("Living_Area_Source", this.createPostingForm.value.Living_Area_Source.trim());
      formData.append("Garage_Description", this.createPostingForm.value.Garage_Description.trim());
      formData.append("Driveway", this.createPostingForm.value.Driveway.trim());
      formData.append("Parking_Features", this.createPostingForm.value.Parking_Features.trim());
      formData.append("Accessibility_Features", this.createPostingForm.value.Accessibility_Features.trim());
      formData.append("Lot_Description", this.createPostingForm.value.Lot_Description.trim());
      formData.append("Lot_Dimensions", this.createPostingForm.value.Lot_Dimensions.trim());
      formData.append("Lot_Size_Acres", this.createPostingForm.value.Lot_Size_Acres.trim());
      formData.append("Lot_Size_Square_Feet", this.createPostingForm.value.Lot_Size_Square_Feet.trim());
      formData.append("Fireplace_Features", this.createPostingForm.value.Fireplace_Features.trim());
      formData.append("Number_of_Fireplaces", this.createPostingForm.value.Number_of_Fireplaces.trim());
      formData.append("Heating_Features", this.createPostingForm.value.Heating_Features.trim());
      formData.append("Cooling_Features", this.createPostingForm.value.Cooling_Features.trim());

      // formData.append("Nearby_Schools", JSON.stringify(this.invoiceForm.value).trim());
      // formData.append("Neighborhood", this.createPostingForm.value.Neighborhood.trim());
      formData.append("zoning", this.createPostingForm.value.zoning.trim());
      formData.append("Community_Features", this.createPostingForm.value.Community_Features.trim());
      formData.append("unit_amenities", this.createPostingForm.value.unit_amenities.trim());
      formData.append("site_amenities", this.createPostingForm.value.site_amenities.trim());
      formData.append("Utilities", this.createPostingForm.value.Utilities.trim());

      // fields for lease
      formData.append("Overview", this.createPostingForm.value.Overview.trim());
      formData.append("Floor_Plans", this.createPostingForm.value.Floor_Plans.trim());
      formData.append("Unit_Features", this.createPostingForm.value.Unit_Features.trim());
      formData.append("phone", this.createPostingForm.value.phone.trim());
      formData.append("email", this.createPostingForm.value.email.trim());
      formData.append("price_from", this.createPostingForm.value.price_from.trim());
      formData.append("price_to", this.createPostingForm.value.price_to.trim());
      formData.append("Lease_Community_Features", this.createPostingForm.value.Lease_Community_Features.trim());
      formData.append("Lease_Year_Built", this.createPostingForm.value.Lease_Year_Built.trim());

      // New fields added
      formData.append("Sale_Conditions", this.createPostingForm.value.Sale_Conditions.trim());
      formData.append("Apartment_Style", this.createPostingForm.value.Apartment_Style.trim());
      formData.append("building_class", this.createPostingForm.value.building_class.trim());
      formData.append("building_size", this.createPostingForm.value.building_size.trim());
      formData.append("No_of_Stories", this.createPostingForm.value.No_of_Stories.trim());
      formData.append("Parking_Ratio", this.createPostingForm.value.Parking_Ratio.trim());
      formData.append("Opportunity_Zone", this.createPostingForm.value.Opportunity_Zone.trim());
      formData.append("Price_inclusive_of_fees", this.createPostingForm.value.Price_inclusive_of_fees.trim());
      formData.append("transportation", this.createPostingForm.value.transportation.trim());
      formData.append("nearby_amenities", this.createPostingForm.value.nearby_amenities.trim());
      formData.append("Annual_Taxes", this.createPostingForm.value.Annual_Taxes.trim());
      formData.append("Tax_Year", this.createPostingForm.value.Tax_Year.trim());
      formData.append("Price_Per_SF", this.createPostingForm.value.Price_Per_SF.trim());
      formData.append("Listing_Status", this.createPostingForm.value.Listing_Status.trim());
      formData.append("MLS", this.createPostingForm.value.MLS.trim());
      formData.append("Parking_Spaces", this.createPostingForm.value.Parking_Spaces.trim());
      formData.append("Architecture_Style", this.createPostingForm.value.Architecture_Style.trim());
      formData.append("Key_features", this.createPostingForm.value.Key_features.trim());
      formData.append("Basement", this.createPostingForm.value.Basement.trim());
      formData.append("construction_type_and_style", this.createPostingForm.value.construction_type_and_style.trim());
      formData.append("Material_information", this.createPostingForm.value.Material_information.trim());
      formData.append("Notable_dates", this.createPostingForm.value.Notable_dates.trim());
      formData.append("Community", this.createPostingForm.value.Community.trim());
      formData.append("Utilitie_Green_Energy_Details", this.createPostingForm.value.Utilitie_Green_Energy_Details.trim());
      formData.append("Rentable_Building_Area", this.createPostingForm.value.Rentable_Building_Area.trim());
      formData.append("Tenancy", this.createPostingForm.value.Tenancy.trim());
      formData.append("Clear_Ceiling_Height", this.createPostingForm.value.Clear_Ceiling_Height.trim());
      formData.append("No_of_Dock_High", this.createPostingForm.value.No_of_Dock_High.trim());
      formData.append("Tenant", this.createPostingForm.value.Tenant.trim());
      formData.append("Industry", this.createPostingForm.value.Industry.trim());
      formData.append("SF_Occupied", this.createPostingForm.value.SF_Occupied.trim());
      formData.append("Rent_SF", this.createPostingForm.value.Rent_SF.trim());
      formData.append("Lease_End", this.createPostingForm.value.Lease_End.trim());
      formData.append("Asset_Type", this.createPostingForm.value.Asset_Type.trim());
      formData.append("Primary_Property_Type", this.createPostingForm.value.Primary_Property_Type.trim());
      formData.append("Zoning_Designation", this.createPostingForm.value.Zoning_Designation.trim());
      formData.append("Occupancy", this.createPostingForm.value.Occupancy.trim());
      formData.append("Type_of_Ownership", this.createPostingForm.value.Type_of_Ownership.trim());
      formData.append("Event_Item", this.createPostingForm.value.Event_Item.trim());
      formData.append("Size", this.createPostingForm.value.Size.trim());
      formData.append("Security", this.createPostingForm.value.Security.trim());
      formData.append("HOA", this.createPostingForm.value.HOA.trim());
      formData.append("Other_construction", this.createPostingForm.value.Other_construction.trim());
      formData.append("Other_property_information", this.createPostingForm.value.Other_property_information.trim());
      formData.append("Other_financial_information", this.createPostingForm.value.Other_financial_information.trim());
      formData.append("Location", this.createPostingForm.value.Location.trim());
      formData.append("Inventory", this.createPostingForm.value.Inventory.trim());
      formData.append("Building_SF", this.createPostingForm.value.Building_SF.trim());
      formData.append("Employees", this.createPostingForm.value.Employees.trim());
      formData.append("Facilities", this.createPostingForm.value.Facilities.trim());
      formData.append("Competition", this.createPostingForm.value.Competition.trim());
      formData.append("Growth_and_Expansion", this.createPostingForm.value.Growth_and_Expansion.trim());
      formData.append("Financing", this.createPostingForm.value.Financing.trim());
      formData.append("Support_and_Training", this.createPostingForm.value.Support_and_Training.trim());
      formData.append("Percent_Leased", this.createPostingForm.value.Percent_Leased.trim());
      formData.append("Building_Height", this.createPostingForm.value.Building_Height.trim());
      formData.append("Typical_Floor_Size", this.createPostingForm.value.Typical_Floor_Size.trim());
      formData.append("Slab_To_Slab", this.createPostingForm.value.Slab_To_Slab.trim());
      formData.append("Building_FAR", this.createPostingForm.value.Building_FAR.trim());
      formData.append("Land_Acres", this.createPostingForm.value.Land_Acres.trim());
      formData.append("space", this.createPostingForm.value.space.trim());
      formData.append("space_size", this.createPostingForm.value.space_size.trim());
      formData.append("space_use", this.createPostingForm.value.space_use.trim());
      formData.append("space_condition", this.createPostingForm.value.space_condition.trim());
      formData.append("space_available", this.createPostingForm.value.space_available.trim());
      formData.append("Region", this.createPostingForm.value.Region.trim());
      formData.append("Development", this.createPostingForm.value.Development.trim());
      formData.append("Lifestyles", this.createPostingForm.value.Lifestyles.trim());
      formData.append("Property_Name", this.createPostingForm.value.Property_Name.trim());
      formData.append("Population", this.createPostingForm.value.Population.trim());
      formData.append("Frontage", this.createPostingForm.value.Frontage.trim());
      formData.append("Loading_Docks", this.createPostingForm.value.Loading_Docks.trim());
      formData.append("lease_type", this.createPostingForm.value.lease_type.trim());
      formData.append("property_facts", this.createPostingForm.value.property_facts.trim());
      formData.append("sale_type", this.createPostingForm.value.sale_type.trim());
      formData.append("About", this.createPostingForm.value.About.trim());
      formData.append("About_this_property", this.createPostingForm.value.About_this_property.trim());
      formData.append("property_taxes", this.createPostingForm.value.property_taxes.trim());
      formData.append("Bathrooms", this.createPostingForm.value.Bathrooms.trim());
      formData.append("Pool_Spa", this.createPostingForm.value.Pool_Spa.trim());
      formData.append("Homeowners_Association", this.createPostingForm.value.Homeowners_Association.trim());
      formData.append("zoning_code", this.createPostingForm.value.zoning_code.trim());
      formData.append("Listed_By_Agent", this.createPostingForm.value.Listed_By_Agent.trim());
      formData.append("TAXES_OPERATING_EXPENSES", this.createPostingForm.value.TAXES_OPERATING_EXPENSES.trim());
      formData.append("Half_Baths", this.createPostingForm.value.Half_Baths.trim());
      formData.append("Total_Baths", this.createPostingForm.value.Total_Baths.trim());
      formData.append("Living_Area", this.createPostingForm.value.Living_Area.trim());
      formData.append("Other_rooms", this.createPostingForm.value.Other_rooms.trim());
      formData.append("Home_Features", this.createPostingForm.value.Home_Features.trim());
      formData.append("Multi_Unit_Info", this.createPostingForm.value.Multi_Unit_Info.trim());
      formData.append("building_construction", this.createPostingForm.value.building_construction.trim());
      formData.append("Heating_Cooling", this.createPostingForm.value.Heating_Cooling.trim());
      formData.append("Land_Info", this.createPostingForm.value.Land_Info.trim());
      formData.append("Community_Features_Amenities", this.createPostingForm.value.Community_Features_Amenities.trim());
      formData.append("Property_Price_Tax", this.createPostingForm.value.Property_Price_Tax.trim());
      formData.append("Bedrooms_Bathrooms", this.createPostingForm.value.Bedrooms_Bathrooms.trim());
      formData.append("Type_and_style", this.createPostingForm.value.Type_and_style.trim());
      formData.append("Condition", this.createPostingForm.value.Condition.trim());
      formData.append("Community_and_Neighborhood_Details", this.createPostingForm.value.Community_and_Neighborhood_Details.trim());
      formData.append("Major_Tenants", this.createPostingForm.value.Major_Tenants.trim());
      formData.append("Detailed_Description", this.createPostingForm.value.Detailed_Description.trim());
      formData.append("Everything", this.createPostingForm.value.Everything.trim());
      formData.append("Facts_features", this.createPostingForm.value.Facts_features.trim());
      formData.append("other_interior_features", this.createPostingForm.value.other_interior_features.trim());
      formData.append("construction_details", this.createPostingForm.value.construction_details.trim());
      formData.append("Garage_and_Parking", this.createPostingForm.value.Garage_and_Parking.trim());
      formData.append("property_details", this.createPostingForm.value.property_details.trim());
      formData.append("Parking", this.createPostingForm.value.Parking.trim());
      formData.append("Accessibility", this.createPostingForm.value.Accessibility.trim());
      formData.append("Property", this.createPostingForm.value.Property.trim());
      formData.append("Other_property", this.createPostingForm.value.Other_property.trim());
      formData.append("HOA_financial_details", this.createPostingForm.value.HOA_financial_details.trim());
      formData.append("Property_Address", this.createPostingForm.value.Property_Address.trim());
      formData.append("interior_details", this.createPostingForm.value.interior_details.trim());
      formData.append("Year_of_construction", this.createPostingForm.value.Year_of_construction.trim());
      formData.append("Type", this.createPostingForm.value.Type.trim());
      formData.append("NEARBY_MAJOR_RETAILERS", this.createPostingForm.value.NEARBY_MAJOR_RETAILERS.trim());
      formData.append("Property_Type_PF", this.createPostingForm.value.Property_Type_PF.trim());
      formData.append("Property_Subtype_PF", this.createPostingForm.value.Property_Subtype_PF.trim());
      formData.append("County", this.createPostingForm.value.County.trim());
      formData.append("Heating", this.createPostingForm.value.Heating.trim());
      formData.append("Cooling", this.createPostingForm.value.Cooling.trim());
      formData.append("Title", this.createPostingForm.value.Title.trim());
      formData.append("Brokerage_Company", this.createPostingForm.value.Brokerage_Company.trim());
      formData.append("AVAILABLE", this.createPostingForm.value.AVAILABLE.trim());
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
        formData.append("Serial_Number", this.Serial_Number);
        formData.append("previous_images", JSON.stringify(this.getPhtosALL));
        formData.append("previous_pdf_file", JSON.stringify(this.prevuiousPdf));
        this.UserService.UpdateListingrealEstate(formData, this.getParamsId).subscribe(result => {
          this.loading = false;
          //console.log("result : ", result);
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // location.reload();
            // this.router.navigate(['/all-listing']);
            location.href = "my-portfolio";
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
        formData.append("created_by", "WeCoOwn");
        this.UserService.CreateRealEstateListing(formData).subscribe(result => {
          //console.log("result : ", result);
          this.loading = false;
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // localStorage.setItem('RealEstateCurrentSerialNumber', JSON.stringify((result['Serial_Number'] + 1)));
            // location.reload();
            // this.router.navigate(['/all-listing']);
            location.href = "my-portfolio";
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
  getSelectedPurpose(item) {
    if (item === "No Ready") {
      this.price = 0;
      $("#price").attr('readonly', 'readonly');
    } else {
      $("#price").removeAttr('readonly');
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