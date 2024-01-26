import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../../service/country-state-city.service';
@Component({
  selector: 'app-crowd-funding-sale',
  templateUrl: './crowd-funding-sale.component.html',
  styleUrls: ['./crowd-funding-sale.component.css']
})
export class CrowdFundingSaleComponent implements OnInit {

  createPostingForm: FormGroup;
  selectedItemsList = [];
  datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo"};
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
  Description: any;
  links: any;
  Steep_Investment_Minimums: any;
  Early_Withdrawals: any;
  CrowdFunding_type: any;
  CrowdFunding_subtype: any;
  Reinvestment_Opportunities: any;
  Targeted_Average_Cash_Yield: any;
  Website_Transparency: any;
  invesment_highlights: any;
  address_line1: any;
  address_line2: any;
  city: any;
  state: any;
  country: any;
  zipcode: any;
  landmark: any;
  Minimum_Investment: any;
  Average_Annual_Return: any;
  Total_Investor_Distributions: any;
  Investment_Options: any;
  Parcel_Number: any;
  Land_Assessment: any;
  Improvements_Assessment: any;
  Total_Assessment: any;
  Pros: any;
  Cons: any;
  price: any;
  price_per_unit: any;
  cap_rate: any;
  gross_rent_multiplier: any;
  Accredited_Investors_Only: any;
  Historical_Annual_Returns: any;
  Business_Bureau_Ratings: any;
  percentage_leased: any;
  Educational_Offerings: any;
  parking: any;
  tenancy: any;
  building_height: any;
  floors: any;
  typical_floor_size: any;
  building_far: any;
  land_acres: any;
  slab_to_slab: any;
  Targeted_Investment_Period: any;
  Targeted_Equity_Multiple: any;
  Targeted_Investor_IRR: any;
  Preferred_Return: any;
  Investment_Strategy: any;
  Property_Type: any;
  Investment_Profile: any;
  Number_of_Holdings: any;
  Disclaimers_Disclosures: any;
  Footnotes: any;
  Sponsor_Historic_Net_IRR: any;
  Sponsor_Historic_Equity_Multiple: any;
  Distribution: any;
  Company_Term: any;
  Disclaimer: any;
  Next_Targeted_Close_Date: any;
  Offers_Due_Date: any;
  Funds_Due_Date: any;
  Targeted_Project_IRR: any;
  Sponsor_Co_Investment: any;
  Targeted_Distribution_Start_Date: any;
  Preferred_Return_Accrual_Date: any;
  SD_IRA_Investments: any;
  Initial_Posting_Date: any;
  Fund_Size: any;
  Sponsor: any;
  Business_Plan: any;
  Key_Deal_Points: any;
  Summary_of_Changes: any;
  Prior_WePo_Offerings: any;
  Targeted_Cash_Distributions: any;
  Sponsor_Experience: any;
  Investor_Accreditation: any;
  One031_Exchange: any;
  Opportunity_Zone: any;
  Reasons_to_Invest: any;
  Features: any;
  zoning: any;
  subpropertyType: any;
  public invoiceForm: FormGroup;
  Fees: any;
  purpose: any;
  Tittle_Name: any;
  Serial_Number: any;
  getCurrentSerialNumber: string;
  prevuiousPdf: any;
  selling_price: any;
  selling_date: any;
  pdf_doc: any;
  Sold_out: any;
  property_photos: any;
  user_id: any;
  Tax: any;
  fractional_share_choice_percentage_or_unit: any;
  offering_Price_fractional_ownership: any;
  fractional_share_text_percentage_or_unit: any;

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
    $('.equityCrowdfunding').hide();
    $('.realEstateCrowdfunding').hide();
    //$('.general').hide();
    this.country = "";
    this.state = "";
    this.city = "";
    this.CrowdFunding_subtype = "";
    this.purpose = "";
    this.CrowdFunding_type = "Crowdfunding Projects";
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
      Description: new FormControl(''),
      links: new FormControl(''),
      Serial_Number: new FormControl(),
      purpose: new FormControl(''),
      Tittle_Name: new FormControl(''),
      selling_price: new FormControl(''),
      address_line1: new FormControl('', [Validators.required]),
      address_line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      zipcode: new FormControl(''),
      landmark: new FormControl(''),
      Fees: new FormControl(''),
      CrowdFunding_type: new FormControl(''),
      CrowdFunding_subtype: new FormControl(''),
      Minimum_Investment: new FormControl(''),
      Average_Annual_Return: new FormControl(''),
      Total_Investor_Distributions: new FormControl(''),
      Investment_Options: new FormControl(''),

      Parcel_Number: new FormControl(''),
      Land_Assessment: new FormControl(''),
      Improvements_Assessment: new FormControl(''),
      Total_Assessment: new FormControl(''),

      price: new FormControl(''),
      price_per_unit: new FormControl(''),
      cap_rate: new FormControl(''),
      gross_rent_multiplier: new FormControl(''),

      Accredited_Investors_Only: new FormControl(),

      // property facts
      Pros: new FormControl(''),
      Cons: new FormControl(''),
      Early_Withdrawals: new FormControl(''),
      Steep_Investment_Minimums: new FormControl(''),
      Historical_Annual_Returns: new FormControl(''),
      Reinvestment_Opportunities: new FormControl(''),
      Website_Transparency: new FormControl(''),
      Business_Bureau_Ratings: new FormControl(''),
      Educational_Offerings: new FormControl(''),
      Targeted_Average_Cash_Yield: new FormControl(''),

      Targeted_Investment_Period: new FormControl(''),
      Targeted_Equity_Multiple: new FormControl(''),
      Targeted_Investor_IRR: new FormControl(''),
      Preferred_Return: new FormControl(''),
      Investment_Strategy: new FormControl(''),
      Property_Type: new FormControl(''),

      Investment_Profile: new FormControl(''),
      Number_of_Holdings: new FormControl(''),
      Disclaimers_Disclosures: new FormControl(''),
      Footnotes: new FormControl(''),
      Sponsor_Historic_Net_IRR: new FormControl(''),
      Sponsor_Historic_Equity_Multiple: new FormControl(''),
      Distribution: new FormControl(''),
      Company_Term: new FormControl(''),
      Next_Targeted_Close_Date: new FormControl(''),
      Offers_Due_Date: new FormControl(''),
      Funds_Due_Date: new FormControl(''),
      Targeted_Project_IRR: new FormControl(''),
      Sponsor_Co_Investment: new FormControl(''),
      Targeted_Distribution_Start_Date: new FormControl(''),
      Preferred_Return_Accrual_Date: new FormControl(''),
      SD_IRA_Investments: new FormControl(''),
      Initial_Posting_Date: new FormControl(''),
      Fund_Size: new FormControl(''),
      Sponsor: new FormControl(''),
      Business_Plan: new FormControl(''),
      Key_Deal_Points: new FormControl(''),
      Summary_of_Changes: new FormControl(''),
      Prior_WePo_Offerings: new FormControl(''),
      Targeted_Cash_Distributions: new FormControl(''),
      Sponsor_Experience: new FormControl(''),
      Investor_Accreditation: new FormControl(''),
      One031_Exchange: new FormControl(''),
      Opportunity_Zone: new FormControl(''),
      Reasons_to_Invest: new FormControl(''),
      Features: new FormControl(''),
      Tax: new FormControl(''),
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
      selling_date: new FormControl(''),
      pdf_doc: new FormControl(''),
      Sold_out: new FormControl(''),
      property_photos: new FormControl(''),
      user_id: new FormControl(''),
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
    this.UserService.getCrowdFundingAllCount().subscribe(result => {
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
    if (item == "Equity Crowdfunding") {
      $('.realEstateCrowdfunding').hide();
      $('.equityCrowdfunding').show();
    } else if (item == "Property Crowdfunding") {
      $('.equityCrowdfunding').hide();
      $('.realEstateCrowdfunding').show();
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
          //$('.general').show();
          if (this.getData[0].CrowdFunding_subtype == "Equity Crowdfunding") {
            $('.equityCrowdfunding').show();
          } else if (this.getData[0].CrowdFunding_subtype == "Real Estate Crowdfunding") {
            $('.realEstateCrowdfunding').show();
          }
          this.getPhtosALL = this.getData[0].property_photos;
          this.invesment_highlights = this.getData[0].invesment_highlights;
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
          this.Fees = this.getData[0].Fees;
          this.Minimum_Investment = this.getData[0].Minimum_Investment;
          this.Average_Annual_Return = this.getData[0].Average_Annual_Return;
          this.Total_Investor_Distributions = this.getData[0].Total_Investor_Distributions;
          this.Investment_Options = this.getData[0].Investment_Options;
          this.Parcel_Number = this.getData[0].Parcel_Number;
          this.Land_Assessment = this.getData[0].Land_Assessment;
          this.Improvements_Assessment = this.getData[0].Improvements_Assessment;
          this.Total_Assessment = this.getData[0].Total_Assessment;
          this.Pros = this.getData[0].Pros;
          this.Cons = this.getData[0].Cons;
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
          this.Accredited_Investors_Only = this.getData[0].Accredited_Investors_Only;

          // property facts
          this.Early_Withdrawals = this.getData[0].Early_Withdrawals;
          this.Steep_Investment_Minimums = this.getData[0].Steep_Investment_Minimums;
          this.CrowdFunding_type = this.getData[0].CrowdFunding_type;
          this.CrowdFunding_subtype = this.getData[0].CrowdFunding_subtype;
          this.Historical_Annual_Returns = this.getData[0].Historical_Annual_Returns;
          this.Reinvestment_Opportunities = this.getData[0].Reinvestment_Opportunities;
          this.Website_Transparency = this.getData[0].Website_Transparency;
          this.Business_Bureau_Ratings = this.getData[0].Business_Bureau_Ratings;
          this.Educational_Offerings = this.getData[0].Educational_Offerings;
          this.Targeted_Average_Cash_Yield = this.getData[0].Targeted_Average_Cash_Yield;


          this.Targeted_Investment_Period = this.getData[0].Targeted_Investment_Period;
          this.Targeted_Equity_Multiple = this.getData[0].Targeted_Equity_Multiple;
          this.Targeted_Investor_IRR = this.getData[0].Targeted_Investor_IRR;
          this.Preferred_Return = this.getData[0].Preferred_Return;
          this.Investment_Strategy = this.getData[0].Investment_Strategy;
          this.Property_Type = this.getData[0].Property_Type;
          this.Investment_Profile = this.getData[0].Investment_Profile;
          this.Number_of_Holdings = this.getData[0].Number_of_Holdings;
          this.Disclaimers_Disclosures = this.getData[0].Disclaimers_Disclosures;
          this.Footnotes = this.getData[0].Footnotes;
          this.Sponsor_Historic_Net_IRR = this.getData[0].Sponsor_Historic_Net_IRR;
          this.Sponsor_Historic_Equity_Multiple = this.getData[0].Sponsor_Historic_Equity_Multiple;
          this.Distribution = this.getData[0].Distribution;
          this.Company_Term = this.getData[0].Company_Term;
          this.Disclaimer = this.getData[0].Disclaimer;
          this.Next_Targeted_Close_Date = this.getData[0].Next_Targeted_Close_Date;
          this.Offers_Due_Date = this.getData[0].Offers_Due_Date;
          this.Funds_Due_Date = this.getData[0].Funds_Due_Date;
          this.Targeted_Project_IRR = this.getData[0].Targeted_Project_IRR;
          this.Sponsor_Co_Investment = this.getData[0].Sponsor_Co_Investment;
          this.Targeted_Distribution_Start_Date = this.getData[0].Targeted_Distribution_Start_Date;
          this.Preferred_Return_Accrual_Date = this.getData[0].Preferred_Return_Accrual_Date;
          this.SD_IRA_Investments = this.getData[0].SD_IRA_Investments;
          this.Initial_Posting_Date = this.getData[0].Initial_Posting_Date;
          this.Fund_Size = this.getData[0].Fund_Size;
          this.Sponsor = this.getData[0].Sponsor;
          this.Business_Plan = this.getData[0].Business_Plan;
          this.Key_Deal_Points = this.getData[0].Key_Deal_Points;
          this.Summary_of_Changes = this.getData[0].Summary_of_Changes;
          this.Prior_WePo_Offerings = this.getData[0].Prior_WePo_Offerings;
          this.Targeted_Cash_Distributions = this.getData[0].Targeted_Cash_Distributions;
          this.Sponsor_Experience = this.getData[0].Sponsor_Experience;
          this.Investor_Accreditation = this.getData[0].Investor_Accreditation;
          this.One031_Exchange = this.getData[0].One031_Exchange;
          this.Opportunity_Zone = this.getData[0].Opportunity_Zone;
          this.Reasons_to_Invest = this.getData[0].Reasons_to_Invest;
          this.Features = this.getData[0].Features;
          this.zoning = this.getData[0].zoning;
          this.prevuiousPdf = this.getData[0].pdf_doc;
          this.selling_date = this.getData[0].selling_date;
          this.Sold_out = this.getData[0].Sold_out;
          this.user_id = this.getData[0].user_id;
          this.Tax = this.getData[0].Tax;
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
        }
      });
    }
  }
  // for get sub property type
  getPropertyType() {
    let dataForForm = {
      property_type: "Crowdfunding Projects"
    }
    this.UserService.getSubPropertyType(dataForForm).subscribe(result => {
      //console.log("ddddddddddddddddd : ", result['data']);
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
    if (this.createPostingForm.value.CrowdFunding_subtype == "") {
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
      formData.append("invesment_highlights", this.createPostingForm.value.invesment_highlights.trim());
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
      formData.append("Fees", this.createPostingForm.value.Fees.trim());
      formData.append("Minimum_Investment", this.createPostingForm.value.Minimum_Investment.trim());
      formData.append("Average_Annual_Return", this.createPostingForm.value.Average_Annual_Return.trim());
      formData.append("Total_Investor_Distributions", this.createPostingForm.value.Total_Investor_Distributions.trim());
      formData.append("Investment_Options", this.createPostingForm.value.Investment_Options.trim());
      formData.append("Parcel_Number", this.createPostingForm.value.Parcel_Number.trim());
      formData.append("Land_Assessment", this.createPostingForm.value.Land_Assessment.trim());
      formData.append("Improvements_Assessment", this.createPostingForm.value.Improvements_Assessment.trim());
      formData.append("Total_Assessment", this.createPostingForm.value.Total_Assessment.trim());
      formData.append("Pros", this.createPostingForm.value.Pros.trim());
      formData.append("Cons", this.createPostingForm.value.Cons.trim());
      formData.append("price", this.createPostingForm.value.price);
      formData.append("price_per_unit", this.createPostingForm.value.price_per_unit.trim());
      formData.append("cap_rate", this.createPostingForm.value.cap_rate.trim());
      formData.append("gross_rent_multiplier", this.createPostingForm.value.gross_rent_multiplier.trim());
      formData.append("Accredited_Investors_Only", this.createPostingForm.value.Accredited_Investors_Only.trim());

      //  property facts
      formData.append("Early_Withdrawals", this.createPostingForm.value.Early_Withdrawals.trim());
      formData.append("Steep_Investment_Minimums", this.createPostingForm.value.Steep_Investment_Minimums.trim());
      formData.append("CrowdFunding_type", this.createPostingForm.value.CrowdFunding_type.trim());
      formData.append("CrowdFunding_subtype", this.createPostingForm.value.CrowdFunding_subtype.trim());
      formData.append("Reinvestment_Opportunities", this.createPostingForm.value.Reinvestment_Opportunities.trim());
      formData.append("Historical_Annual_Returns", this.createPostingForm.value.Historical_Annual_Returns.trim());
      formData.append("Website_Transparency", this.createPostingForm.value.Website_Transparency.trim());
      formData.append("Business_Bureau_Ratings", this.createPostingForm.value.Business_Bureau_Ratings.trim());
      formData.append("Educational_Offerings", this.createPostingForm.value.Educational_Offerings.trim());
      formData.append("Targeted_Average_Cash_Yield", this.createPostingForm.value.Targeted_Average_Cash_Yield.trim());

      formData.append("Targeted_Investment_Period", this.createPostingForm.value.Targeted_Investment_Period.trim());
      formData.append("Targeted_Equity_Multiple", this.createPostingForm.value.Targeted_Equity_Multiple.trim());
      formData.append("Targeted_Investor_IRR", this.createPostingForm.value.Targeted_Investor_IRR.trim());
      formData.append("Preferred_Return", this.createPostingForm.value.Preferred_Return.trim());
      formData.append("Investment_Strategy", this.createPostingForm.value.Investment_Strategy.trim());
      formData.append("Property_Type", this.createPostingForm.value.Property_Type.trim());
      formData.append("Investment_Profile", this.createPostingForm.value.Investment_Profile.trim());
      formData.append("Number_of_Holdings", this.createPostingForm.value.Number_of_Holdings.trim());
      formData.append("Disclaimers_Disclosures", this.createPostingForm.value.Disclaimers_Disclosures.trim());
      formData.append("Footnotes", this.createPostingForm.value.Footnotes.trim());
      formData.append("Sponsor_Historic_Net_IRR", this.createPostingForm.value.Sponsor_Historic_Net_IRR.trim());
      formData.append("Sponsor_Historic_Equity_Multiple", this.createPostingForm.value.Sponsor_Historic_Equity_Multiple.trim());
      formData.append("Distribution", this.createPostingForm.value.Distribution.trim());
      formData.append("Company_Term", this.createPostingForm.value.Company_Term.trim());
      formData.append("Disclaimer", this.createPostingForm.value.Disclaimer);
      formData.append("Next_Targeted_Close_Date", this.createPostingForm.value.Next_Targeted_Close_Date);
      formData.append("Offers_Due_Date", this.createPostingForm.value.Offers_Due_Date);
      formData.append("Funds_Due_Date", this.createPostingForm.value.Funds_Due_Date);
      formData.append("Targeted_Project_IRR", this.createPostingForm.value.Targeted_Project_IRR.trim());
      formData.append("Sponsor_Co_Investment", this.createPostingForm.value.Sponsor_Co_Investment.trim());
      formData.append("Targeted_Distribution_Start_Date", this.createPostingForm.value.Targeted_Distribution_Start_Date);
      formData.append("Preferred_Return_Accrual_Date", this.createPostingForm.value.Preferred_Return_Accrual_Date);
      formData.append("SD_IRA_Investments", this.createPostingForm.value.SD_IRA_Investments.trim());
      formData.append("Initial_Posting_Date", this.createPostingForm.value.Initial_Posting_Date);
      formData.append("Fund_Size", this.createPostingForm.value.Fund_Size.trim());
      formData.append("Sponsor", this.createPostingForm.value.Sponsor.trim());
      formData.append("Business_Plan", this.createPostingForm.value.Business_Plan.trim());
      formData.append("Key_Deal_Points", this.createPostingForm.value.Key_Deal_Points.trim());
      formData.append("Summary_of_Changes", this.createPostingForm.value.Summary_of_Changes.trim());
      formData.append("Prior_WePo_Offerings", this.createPostingForm.value.Prior_WePo_Offerings.trim());
      formData.append("Targeted_Cash_Distributions", this.createPostingForm.value.Targeted_Cash_Distributions.trim());
      formData.append("Sponsor_Experience", this.createPostingForm.value.Sponsor_Experience.trim());
      formData.append("Investor_Accreditation", this.createPostingForm.value.Investor_Accreditation.trim());
      formData.append("One031_Exchange", this.createPostingForm.value.One031_Exchange.trim());
      formData.append("Opportunity_Zone", this.createPostingForm.value.Opportunity_Zone.trim());
      formData.append("Reasons_to_Invest", this.createPostingForm.value.Reasons_to_Invest.trim());
      formData.append("Features", this.createPostingForm.value.Features.trim());
      formData.append("zoning", this.createPostingForm.value.zoning.trim());
      formData.append("selling_date", this.createPostingForm.value.selling_date);
      // formData.append("Sold_out", this.createPostingForm.value.Sold_out.trim());
      formData.append("pdf_doc", this.createPostingForm.value.pdf_doc.trim());
      formData.append("property_photos", this.createPostingForm.value.property_photos.trim());
      formData.append("Tax", this.createPostingForm.value.Tax.trim());
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
      //console.log("forms before : ",this.createPostingForm.value);
      
      if (this.getParamsId != null) {
        formData.append("Serial_Number", this.Serial_Number);
        formData.append("previous_images", JSON.stringify(this.getPhtosALL));
        formData.append("previous_pdf_file", JSON.stringify(this.prevuiousPdf));
        this.UserService.UpdateListingCrowdFunding(formData, this.getParamsId).subscribe(result => {
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
        this.UserService.CreateCrowdFundingListing(formData).subscribe(result => {
          //console.log("result : ", result);
          this.loading = false;
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // localStorage.setItem('CrowdfundingCurrentSerialNumber', JSON.stringify((result['Serial_Number'] + 1)));
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