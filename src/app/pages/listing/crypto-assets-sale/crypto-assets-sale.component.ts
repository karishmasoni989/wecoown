import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../../service/country-state-city.service';

@Component({
  selector: 'app-crypto-assets-sale',
  templateUrl: './crypto-assets-sale.component.html',
  styleUrls: ['./crypto-assets-sale.component.css']
})
export class CryptoAssetsSaleComponent implements OnInit {

  createPostingForm: FormGroup;
  selectedItemsList = [];
  checkedIDs = [];
  propertyIdd: any;
  usernamePre: any;
  // loading: boolean;
  FinalArray: any;
  ImgArray: [];
  datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo"};
  // fileOver: boolean;
  @HostBinding('class.fileover') fileOver: boolean;
  //fileDropped: any;
  @Output() fileDropped = new EventEmitter < any > ();
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
  Crypto_Assets_subtype: string;
  Crypto_Assets_type: string;
  price: any;
  general_Highlight: any;
  property_Highlight: any;
  property_Type: any;
  Neighborhood: any;
  expected_Yield: any;
  Rent_Start_Date: any;
  Rent_per_Token: any;
  TokenPrice: any;
  Total_Tokens: any;
  Square_Feet: any;
  Lot_Size: any;
  Bedroom_Bath: any;
  Construction_Year: any;
  Rented: any;
  Section_8: any;
  Section_8_Pays: any;
  Gross_Rent_year: any;
  Gross_Rent_month: any;
  Monthly_Costs: any;
  Net_Rent_month: any;
  Quantity: any;
  Currency_Type: any;
  Pay_With: any;
  fiat_currency: any;
  amount_currency_spend: any;
  Total_spend: any;
  total_volume: any;
  price_per_token: any;
  Estimated_Volume: any;
  Average_price: any;
  Number_of_item: any;
  highest_offer: any;
  set_price: any;
  highest_bid: any;
  Bundle: any;
  Minimum_bid: any;
  Expiration_Date: any;
  Bounties: any;
  Platform: any;
  Brand: any;
  Type_NFTS: any;
  Condition: any;
  Asset_Name: any;
  Owner: any;
  Backed_Tokens: any;
  collection_name: any;
  fractional_share_choice_percentage_or_unit: string;
  fractional_share_text_percentage_or_unit: any;
  offering_Price_fractional_ownership: any;
  Investment_Highlight: any;
  Investment_Type: any;
  No_Properties: any;
  NOI: any;
  Max_Investment: any;
  Soft_Cap: any;
  Category: any;
  Cap_Rate: any;
  AVG_Occupancy: any;
  Min_Investment: any;
  Currencies_Accepted: any;
  Interests_Offered: any;
  Start_Date: any;
  End_Date: any;
  Target_yearly_IRR: any;
  Sale: any;
  Token_Name: any;
  CoC_Yield: any;
  Property_Overview: any;
  Market_Analysis: any;
  Financials: any;
  Management: any;
  Dividends_Overview: any;
  Team_and_Partners: any;
  Sell: any;
  Spread: any;
  Daily_Change: any;
  Trader_Sentiment: any;
  Min_Traded_Quantity: any;
  Full_Name: any;
  Currency: any;
  Margin: any;
  Long_Position_Overnight_Fee: any;
  Short_Position_Overnight_Fee: any;
  Price_Chart: any;
  Commodity_Overview: any;
  Last_Price: any;
  Two4_Change: any;
  Two4_Low: any;
  Two4_High: any;
  Two4_Volume: any;
  Total_Liquidity: any;
  Transactions: any;
  Current_Price: any;
  Price_History: any;
  Listings: any;
  Offers: any;
  Trading_History: any;
  NFT_Overview: any;
  Properties: any;
  Stats: any;
  Buy: any;

  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    public CountryStateCityService: CountryStateCityService,
    private activatedRoute: ActivatedRoute
  ) {}
  ionViewWillEnter() {
    this.startOfPage();
  }

  ngOnInit() {
    this.startOfPage();
  }

  startOfPage() {
    //$('.general').hide();
    $("#all-sub-category").prop("disabled", false);
    $('.commodityAssetTokens').hide();
    $('.realEstateAssetTokens').hide();
    $('.utilityTokens').hide();
    $('.NFTs').hide();
    this.country = "";
    this.state = "";
    this.city = "";
    this.Crypto_Assets_subtype = "";
    this.purpose = "";
    this.Crypto_Assets_type = "Crypto-Assets";
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
      Crypto_Assets_type: new FormControl(''),
      Crypto_Assets_subtype: new FormControl(''),
      Form_Serial_Number: new FormControl(''),

      //new fields added
      general_Highlight: new FormControl(''),
      property_Highlight: new FormControl(''),
      property_Type: new FormControl(''),
      Neighborhood: new FormControl(''),
      expected_Yield: new FormControl(''),
      Rent_Start_Date: new FormControl(''),
      Rent_per_Token: new FormControl(''),
      TokenPrice: new FormControl(''),
      Total_Tokens: new FormControl(''),
      Square_Feet: new FormControl(''),
      Lot_Size: new FormControl(''),
      Bedroom_Bath: new FormControl(''),
      Construction_Year: new FormControl(''),
      Rented: new FormControl(''),
      Section_8: new FormControl(''),
      Section_8_Pays: new FormControl(''),
      Gross_Rent_year: new FormControl(''),
      Gross_Rent_month: new FormControl(''),
      Monthly_Costs: new FormControl(''),
      Net_Rent_month: new FormControl(''),
      Quantity: new FormControl(''),
      Currency_Type: new FormControl(''),
      Pay_With: new FormControl(''),
      fiat_currency: new FormControl(''),
      amount_currency_spend: new FormControl(''),
      Total_spend: new FormControl(''),
      total_volume: new FormControl(''),
      price_per_token: new FormControl(''),
      Estimated_Volume: new FormControl(''),
      Average_price: new FormControl(''),
      Number_of_item: new FormControl(''),
      highest_offer: new FormControl(''),
      set_price: new FormControl(''),
      highest_bid: new FormControl(''),
      Bundle: new FormControl(''),
      Minimum_bid: new FormControl(''),
      Expiration_Date: new FormControl(''),
      Bounties: new FormControl(''),
      Platform: new FormControl(''),
      Brand: new FormControl(''),
      Type_NFTS: new FormControl(''),
      Condition: new FormControl(''),
      Asset_Name: new FormControl(''),
      Owner: new FormControl(''),
      Backed_Tokens: new FormControl(''),
      collection_name: new FormControl(''),
      Investment_Highlight: new FormControl(''),
      Investment_Type: new FormControl(''),
      No_Properties: new FormControl(''),
      NOI: new FormControl(''),
      Max_Investment: new FormControl(''),
      Soft_Cap: new FormControl(''),
      Category: new FormControl(''),
      Cap_Rate: new FormControl(''),
      AVG_Occupancy: new FormControl(''),
      Min_Investment: new FormControl(''),
      Currencies_Accepted: new FormControl(''),
      Interests_Offered: new FormControl(''),
      Start_Date: new FormControl(''),
      End_Date: new FormControl(''),
      Target_yearly_IRR: new FormControl(''),
      Sale: new FormControl(''),
      Token_Name: new FormControl(''),
      CoC_Yield: new FormControl(''),
      Property_Overview: new FormControl(''),
      Market_Analysis: new FormControl(''),
      Financials: new FormControl(''),
      Management: new FormControl(''),
      Dividends_Overview: new FormControl(''),
      Team_and_Partners: new FormControl(''),
      Sell: new FormControl(''),
      Buy: new FormControl(''),
      Spread: new FormControl(''),
      Daily_Change: new FormControl(''),
      Trader_Sentiment: new FormControl(''),
      Min_Traded_Quantity: new FormControl(''),
      Full_Name: new FormControl(''),
      Currency: new FormControl(''),
      Margin: new FormControl(''),
      Long_Position_Overnight_Fee: new FormControl(''),
      Short_Position_Overnight_Fee: new FormControl(''),
      Price_Chart: new FormControl(''),
      Commodity_Overview: new FormControl(''),
      Last_Price: new FormControl(''),
      Two4_Change: new FormControl(''),
      Two4_Low: new FormControl(''),
      Two4_High: new FormControl(''),
      Two4_Volume: new FormControl(''),
      Total_Liquidity: new FormControl(''),
      Transactions: new FormControl(''),
      Current_Price: new FormControl(''),
      Price_History: new FormControl(''),
      Listings: new FormControl(''),
      Offers: new FormControl(''),
      Trading_History: new FormControl(''),
      NFT_Overview: new FormControl(''),
      Properties: new FormControl(''),
      Stats: new FormControl(''),
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
    //   } else {
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
    this.UserService.getCryptoAllCount().subscribe(result => {
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
    if (item == "Real Estate Asset Tokens") {
      $('.commodityAssetTokens').hide();
      $('.utilityTokens').hide();
      $('.NFTs').hide();
      $('.realEstateAssetTokens').show();
    } else if (item == "Commodity Asset Tokens") {
      $('.realEstateAssetTokens').hide();
      $('.utilityTokens').hide();
      $('.NFTs').hide();
      $('.commodityAssetTokens').show();
    } else if (item == "Utility Tokens") {
      $('.commodityAssetTokens').hide();
      $('.realEstateAssetTokens').hide();
      $('.NFTs').hide();
      $('.utilityTokens').show();
    } else if (item == "NFTs") {
      $('.commodityAssetTokens').hide();
      $('.utilityTokens').hide();
      $('.realEstateAssetTokens').hide();
      $('.NFTs').show();
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
      property_type: 'Crypto-Assets'
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
          if (this.getData[0].Crypto_Assets_subtype == "Real Estate Asset Tokens") {
            $('.realEstateAssetTokens').show();
          } else if (this.getData[0].Crypto_Assets_subtype == "Commodity Asset Tokens") {
            $('.commodityAssetTokens').show();
          } else if (this.getData[0].Crypto_Assets_subtype == "Utility Tokens") {
            $('.utilityTokens').show();
          } else if (this.getData[0].Crypto_Assets_subtype == "NFTs") {
            $('.NFTs').show();
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
          this.Crypto_Assets_type = this.getData[0].Crypto_Assets_type;
          this.Crypto_Assets_subtype = this.getData[0].Crypto_Assets_subtype;
          this.Form_Serial_Number = this.getData[0].Form_Serial_Number;
          this.prevuiousPdf = this.getData[0].pdf_doc;

          // New fields added
          this.general_Highlight = this.getData[0].general_Highlight;
          this.property_Highlight = this.getData[0].property_Highlight;
          this.property_Type = this.getData[0].property_Type;
          this.Neighborhood = this.getData[0].Neighborhood;
          this.expected_Yield = this.getData[0].expected_Yield;
          this.Rent_Start_Date = this.getData[0].Rent_Start_Date;
          this.Rent_per_Token = this.getData[0].Rent_per_Token;
          this.TokenPrice = this.getData[0].TokenPrice;
          this.Total_Tokens = this.getData[0].Total_Tokens;
          this.Square_Feet = this.getData[0].Square_Feet;
          this.Lot_Size = this.getData[0].Lot_Size;
          this.Bedroom_Bath = this.getData[0].Bedroom_Bath;
          this.Construction_Year = this.getData[0].Construction_Year;
          this.Rented = this.getData[0].Rented;
          this.Section_8 = this.getData[0].Section_8;
          this.Section_8_Pays = this.getData[0].Section_8_Pays;
          this.Gross_Rent_year = this.getData[0].Gross_Rent_year;
          this.Gross_Rent_month = this.getData[0].Gross_Rent_month;
          this.Monthly_Costs = this.getData[0].Monthly_Costs;
          this.Net_Rent_month = this.getData[0].Net_Rent_month;
          this.Quantity = this.getData[0].Quantity;
          this.Currency_Type = this.getData[0].Currency_Type;
          this.Pay_With = this.getData[0].Pay_With;
          this.fiat_currency = this.getData[0].fiat_currency;
          this.amount_currency_spend = this.getData[0].amount_currency_spend;
          this.Total_spend = this.getData[0].Total_spend;
          this.total_volume = this.getData[0].total_volume;
          this.price_per_token = this.getData[0].price_per_token;
          this.Estimated_Volume = this.getData[0].Estimated_Volume;
          this.Average_price = this.getData[0].Average_price;
          this.Number_of_item = this.getData[0].Number_of_item;
          this.highest_offer = this.getData[0].highest_offer;
          this.set_price = this.getData[0].set_price;
          this.highest_bid = this.getData[0].highest_bid;
          this.Bundle = this.getData[0].Bundle;
          this.Minimum_bid = this.getData[0].Minimum_bid;
          this.Expiration_Date = this.getData[0].Expiration_Date;
          this.Bounties = this.getData[0].Bounties;
          this.Platform = this.getData[0].Platform;
          this.Brand = this.getData[0].Brand;
          this.Type_NFTS = this.getData[0].Type_NFTS;
          this.Condition = this.getData[0].Condition;
          this.Asset_Name = this.getData[0].Asset_Name;
          this.Owner = this.getData[0].Owner;
          this.Backed_Tokens = this.getData[0].Backed_Tokens;
          this.collection_name = this.getData[0].collection_name;
          this.Investment_Highlight = this.getData[0].Investment_Highlight;
          this.Investment_Type = this.getData[0].Investment_Type;
          this.No_Properties = this.getData[0].No_Properties;
          this.NOI = this.getData[0].NOI;
          this.Max_Investment = this.getData[0].Max_Investment;
          this.Soft_Cap = this.getData[0].Soft_Cap;
          this.Category = this.getData[0].Category;
          this.Cap_Rate = this.getData[0].Cap_Rate;
          this.AVG_Occupancy = this.getData[0].AVG_Occupancy;
          this.Min_Investment = this.getData[0].Min_Investment;
          this.Currencies_Accepted = this.getData[0].Currencies_Accepted;
          this.Interests_Offered = this.getData[0].Interests_Offered;
          this.Start_Date = this.getData[0].Start_Date;
          this.End_Date = this.getData[0].End_Date;
          this.Target_yearly_IRR = this.getData[0].Target_yearly_IRR;
          this.Sale = this.getData[0].Sale;
          this.Token_Name = this.getData[0].Token_Name;
          this.CoC_Yield = this.getData[0].CoC_Yield;
          this.Property_Overview = this.getData[0].Property_Overview;
          this.Market_Analysis = this.getData[0].Market_Analysis;
          this.Financials = this.getData[0].Financials;
          this.Management = this.getData[0].Management;
          this.Dividends_Overview = this.getData[0].Dividends_Overview;
          this.Team_and_Partners = this.getData[0].Team_and_Partners;
          this.Buy = this.getData[0].Buy;
          this.Sell = this.getData[0].Sell;
          this.Spread = this.getData[0].Spread;
          this.Daily_Change = this.getData[0].Daily_Change;
          this.Trader_Sentiment = this.getData[0].Trader_Sentiment;
          this.Min_Traded_Quantity = this.getData[0].Min_Traded_Quantity;
          this.Full_Name = this.getData[0].Full_Name;
          this.Currency = this.getData[0].Currency;
          this.Margin = this.getData[0].Margin;
          this.Long_Position_Overnight_Fee = this.getData[0].Long_Position_Overnight_Fee;
          this.Short_Position_Overnight_Fee = this.getData[0].Short_Position_Overnight_Fee;
          this.Price_Chart = this.getData[0].Price_Chart;
          this.Commodity_Overview = this.getData[0].Commodity_Overview;
          this.Last_Price = this.getData[0].Last_Price;
          this.Two4_Change = this.getData[0].Two4_Change;
          this.Two4_Low = this.getData[0].Two4_Low;
          this.Two4_High = this.getData[0].Two4_High;
          this.Two4_Volume = this.getData[0].Two4_Volume;
          this.Total_Liquidity = this.getData[0].Total_Liquidity;
          this.Transactions = this.getData[0].Transactions;
          this.Current_Price = this.getData[0].Current_Price;
          this.Price_History = this.getData[0].Price_History;
          this.Listings = this.getData[0].Listings;
          this.Offers = this.getData[0].Offers;
          this.Trading_History = this.getData[0].Trading_History;
          this.NFT_Overview = this.getData[0].NFT_Overview;
          this.Properties = this.getData[0].Properties;
          this.Stats = this.getData[0].Stats;
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
        } else {
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
    if (this.createPostingForm.value.Crypto_Assets_subtype == "") {
      $('#fileDropRef').focus();
      finalString += "Please select crypto-assets sub-type.<br>";
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
      formData.append("purpose", this.createPostingForm.value.purpose.trim());
      formData.append("address_line1", this.createPostingForm.value.address_line1.trim());
      formData.append("address_line2", this.createPostingForm.value.address_line2.trim());
      formData.append("city", this.createPostingForm.value.city.trim());
      formData.append("state", this.createPostingForm.value.state.trim());
      formData.append("country", this.createPostingForm.value.country.trim());
      formData.append("zipcode", this.createPostingForm.value.zipcode.trim());
      formData.append("landmark", this.createPostingForm.value.landmark.trim());
      formData.append("price", this.createPostingForm.value.price.trim());
      formData.append("Crypto_Assets_type", this.createPostingForm.value.Crypto_Assets_type.trim());
      formData.append("Crypto_Assets_subtype", this.createPostingForm.value.Crypto_Assets_subtype.trim());

      // New fields added
      formData.append("general_Highlight", this.createPostingForm.value.general_Highlight.trim());
      formData.append("property_Highlight", this.createPostingForm.value.property_Highlight.trim());
      formData.append("property_Type", this.createPostingForm.value.property_Type.trim());
      formData.append("Neighborhood", this.createPostingForm.value.Neighborhood.trim());
      formData.append("expected_Yield", this.createPostingForm.value.expected_Yield.trim());
      formData.append("Rent_Start_Date", this.createPostingForm.value.Rent_Start_Date.trim());
      formData.append("Rent_per_Token", this.createPostingForm.value.Rent_per_Token.trim());
      formData.append("TokenPrice", this.createPostingForm.value.TokenPrice.trim());
      formData.append("Total_Tokens", this.createPostingForm.value.Total_Tokens.trim());
      formData.append("Square_Feet", this.createPostingForm.value.Square_Feet.trim());
      formData.append("Lot_Size", this.createPostingForm.value.Lot_Size.trim());
      formData.append("Bedroom_Bath", this.createPostingForm.value.Bedroom_Bath.trim());
      formData.append("Construction_Year", this.createPostingForm.value.Construction_Year.trim());
      formData.append("Rented", this.createPostingForm.value.Rented.trim());
      formData.append("Section_8", this.createPostingForm.value.Section_8.trim());
      formData.append("Section_8_Pays", this.createPostingForm.value.Section_8_Pays.trim());
      formData.append("Gross_Rent_year", this.createPostingForm.value.Gross_Rent_year.trim());
      formData.append("Gross_Rent_month", this.createPostingForm.value.Gross_Rent_month.trim());
      formData.append("Monthly_Costs", this.createPostingForm.value.Monthly_Costs.trim());
      formData.append("Net_Rent_month", this.createPostingForm.value.Net_Rent_month.trim());
      formData.append("Quantity", this.createPostingForm.value.Quantity.trim());
      formData.append("Currency_Type", this.createPostingForm.value.Currency_Type.trim());
      formData.append("Pay_With", this.createPostingForm.value.Pay_With.trim());
      formData.append("fiat_currency", this.createPostingForm.value.fiat_currency.trim());
      formData.append("amount_currency_spend", this.createPostingForm.value.amount_currency_spend.trim());
      formData.append("Total_spend", this.createPostingForm.value.Total_spend.trim());
      formData.append("total_volume", this.createPostingForm.value.total_volume.trim());
      formData.append("price_per_token", this.createPostingForm.value.price_per_token.trim());
      formData.append("Estimated_Volume", this.createPostingForm.value.Estimated_Volume.trim());
      formData.append("Average_price", this.createPostingForm.value.Average_price.trim());
      formData.append("Number_of_item", this.createPostingForm.value.Number_of_item.trim());
      formData.append("highest_offer", this.createPostingForm.value.highest_offer.trim());
      formData.append("set_price", this.createPostingForm.value.set_price.trim());
      formData.append("highest_bid", this.createPostingForm.value.highest_bid.trim());
      formData.append("Bundle", this.createPostingForm.value.Bundle.trim());
      formData.append("Minimum_bid", this.createPostingForm.value.Minimum_bid.trim());
      formData.append("Expiration_Date", this.createPostingForm.value.Expiration_Date.trim());
      formData.append("Bounties", this.createPostingForm.value.Bounties.trim());
      formData.append("Platform", this.createPostingForm.value.Platform.trim());
      formData.append("Brand", this.createPostingForm.value.Brand.trim());
      formData.append("Type_NFTS", this.createPostingForm.value.Type_NFTS.trim());
      formData.append("Condition", this.createPostingForm.value.Condition.trim());
      formData.append("Asset_Name", this.createPostingForm.value.Asset_Name.trim());
      formData.append("Owner", this.createPostingForm.value.Owner.trim());
      formData.append("Backed_Tokens", this.createPostingForm.value.Backed_Tokens.trim());
      formData.append("collection_name", this.createPostingForm.value.collection_name.trim());
      formData.append("Investment_Highlight", this.createPostingForm.value.Investment_Highlight.trim());
      formData.append("Investment_Type", this.createPostingForm.value.Investment_Type.trim());
      formData.append("No_Properties", this.createPostingForm.value.No_Properties.trim());
      formData.append("NOI", this.createPostingForm.value.NOI.trim());
      formData.append("Max_Investment", this.createPostingForm.value.Max_Investment.trim());
      formData.append("Soft_Cap", this.createPostingForm.value.Soft_Cap.trim());
      formData.append("Category", this.createPostingForm.value.Category.trim());
      formData.append("Cap_Rate", this.createPostingForm.value.Cap_Rate.trim());
      formData.append("AVG_Occupancy", this.createPostingForm.value.AVG_Occupancy.trim());
      formData.append("Min_Investment", this.createPostingForm.value.Min_Investment.trim());
      formData.append("Currencies_Accepted", this.createPostingForm.value.Currencies_Accepted.trim());
      formData.append("Interests_Offered", this.createPostingForm.value.Interests_Offered.trim());
      formData.append("Start_Date", this.createPostingForm.value.Start_Date);
      formData.append("End_Date", this.createPostingForm.value.End_Date);
      formData.append("Target_yearly_IRR", this.createPostingForm.value.Target_yearly_IRR.trim());
      formData.append("Sale", this.createPostingForm.value.Sale.trim());
      formData.append("Token_Name", this.createPostingForm.value.Token_Name.trim());
      formData.append("CoC_Yield", this.createPostingForm.value.CoC_Yield.trim());
      formData.append("Property_Overview", this.createPostingForm.value.Property_Overview.trim());
      formData.append("Market_Analysis", this.createPostingForm.value.Market_Analysis.trim());
      formData.append("Financials", this.createPostingForm.value.Financials.trim());
      formData.append("Management", this.createPostingForm.value.Management.trim());
      formData.append("Dividends_Overview", this.createPostingForm.value.Dividends_Overview.trim());
      formData.append("Team_and_Partners", this.createPostingForm.value.Team_and_Partners.trim());
      formData.append("Buy", this.createPostingForm.value.Buy.trim());
      formData.append("Sell", this.createPostingForm.value.Sell.trim());
      formData.append("Spread", this.createPostingForm.value.Spread.trim());
      formData.append("Daily_Change", this.createPostingForm.value.Daily_Change.trim());
      formData.append("Trader_Sentiment", this.createPostingForm.value.Trader_Sentiment.trim());
      formData.append("Min_Traded_Quantity", this.createPostingForm.value.Min_Traded_Quantity.trim());
      formData.append("Full_Name", this.createPostingForm.value.Full_Name.trim());
      formData.append("Currency", this.createPostingForm.value.Currency.trim());
      formData.append("Margin", this.createPostingForm.value.Margin.trim());
      formData.append("Long_Position_Overnight_Fee", this.createPostingForm.value.Long_Position_Overnight_Fee.trim());
      formData.append("Short_Position_Overnight_Fee", this.createPostingForm.value.Short_Position_Overnight_Fee.trim());
      formData.append("Price_Chart", this.createPostingForm.value.Price_Chart.trim());
      formData.append("Commodity_Overview", this.createPostingForm.value.Commodity_Overview.trim());
      formData.append("Last_Price", this.createPostingForm.value.Last_Price.trim());
      formData.append("Two4_Change", this.createPostingForm.value.Two4_Change.trim());
      formData.append("Two4_Low", this.createPostingForm.value.Two4_Low.trim());
      formData.append("Two4_High", this.createPostingForm.value.Two4_High.trim());
      formData.append("Two4_Volume", this.createPostingForm.value.Two4_Volume.trim());
      formData.append("Total_Liquidity", this.createPostingForm.value.Total_Liquidity.trim());
      formData.append("Transactions", this.createPostingForm.value.Transactions.trim());
      formData.append("Current_Price", this.createPostingForm.value.Current_Price.trim());
      formData.append("Price_History", this.createPostingForm.value.Price_History.trim());
      formData.append("Listings", this.createPostingForm.value.Listings.trim());
      formData.append("Offers", this.createPostingForm.value.Offers.trim());
      formData.append("Trading_History", this.createPostingForm.value.Trading_History.trim());
      formData.append("NFT_Overview", this.createPostingForm.value.NFT_Overview.trim());
      formData.append("Properties", this.createPostingForm.value.Properties.trim());
      formData.append("Stats", this.createPostingForm.value.Stats.trim());
      formData.append("fractional_share_choice_percentage_or_unit", this.createPostingForm.value.fractional_share_choice_percentage_or_unit);
      formData.append("fractional_share_text_percentage_or_unit", this.createPostingForm.value.fractional_share_text_percentage_or_unit);
      formData.append("offering_Price_fractional_ownership", this.createPostingForm.value.offering_Price_fractional_ownership);


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
        this.UserService.UpdateListingCrypto(formData, this.getParamsId).subscribe(result => {
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
          } else if (result['success'] == false) {
            $(".BuyerDanger").html(result['message']);
            $('.BuyerDanger').show();
            $('.BuyerSuccess').hide();
            $('#fileDropRef').focus();
          }
        });
      } else {
        formData.append("Form_Serial_Number", this.getCurrentSerialNumber);
        formData.append("listing_show_on_wepo", 'Yes');
        formData.append("created_by", "WePropertyowners");
        this.UserService.CreateCryptoListing(formData).subscribe(result => {
          //console.log("result : ", result);
          this.loading = false;
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // localStorage.setItem('CryptoCurrentSerialNumber', JSON.stringify((result['Form_Serial_Number'] + 1)));
            // location.reload();
            // this.router.navigate(['/all-listing']);
            location.href = "all-listing?purpose=" + this.createPostingForm.value.purpose;
          } else if (result['success'] == false) {
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
