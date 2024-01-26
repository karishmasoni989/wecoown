import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../../service/country-state-city.service';

@Component({
  selector: 'app-horses-livestock-sale',
  templateUrl: './horses-livestock-sale.component.html',
  styleUrls: ['./horses-livestock-sale.component.css']
})
export class HorsesLivestockSaleComponent implements OnInit {

  createPostingForm: FormGroup;
  selectedItemsList = [];
  checkedIDs = [];
  datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo"};
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
  Horses_Livestocks_subtype: string;
  Horses_Livestocks_type: string;
  price: any;
  Horses_Name: any;
  Category: any;
  Gender: any;
  Colour: any;
  County: any;
  Vendor_Details: any;
  Sire: any;
  Dam: any;
  Dam_Sire: any;
  Skill: any;
  Age: any;
  DOB: any;
  COB: any;
  X_rayed: any;
  Height: any;
  Weight_lbs: any;
  AFS_no: any;
  Rep_no: any;
  Location: any;
  Scoped: any;
  livestock_Price: any;
  Temperament: any;
  Foal_Date: any;
  In_Foal: any;
  Breed: any;
  Markings: any;
  Listing_Number: any;
  Ship_From: any;
  Registered: any;
  Number_for_Sale: any;
  Origin: any;
  Frame: any;
  Condition: any;
  Horns: any;
  Est_Weight: any;
  Bred_To: any;
  Preg_Checked: any;
  Implanted: any;
  Gathered: any;
  Pasture_Feed: any;
  OCV: any;
  Sell_Part_All: any;
  Delivery_Date: any;
  Firm_Negotiable: any;
  Payment_Terms: any;
  Seller: any;
  fractional_share_choice_percentage_or_unit: string;
  fractional_share_text_percentage_or_unit: any;
  offering_Price_fractional_ownership: any;
  Lineage: any;
  Ship_Semen: any;
  Vaccination: any;
  Price_Description: any;
  Estimated_Weight_Variance: any;
  Date_of_Birth: any;
  Description_Horses: any;
  Crossbred_Purebred: any;
  Registry: any;
  Registry_Number: any;
  State_Breed: any;
  Birth_Weight: any;
  Fertility: any;
  Head_Count: any;
  Price_per_head: any;
  Average_Weight: any;
  Total_Weight: any;
  Registration_Number: any;

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

  startOfPage(){
    //$('.general').hide();
    $("#all-sub-category").prop("disabled", false);
    $('.raceHorses').hide();
    $('.draftHorses').hide();
    $('.showHorses').hide();
    $('.cattle').hide();
    $('.sheep').hide();
    $('.otherLiveStocks').hide();
    this.country = "";
    this.state = "";
    this.city = "";
    this.Horses_Livestocks_subtype = "";
    this.purpose = "";
    this.Horses_Livestocks_type = "Horses & Live Stocks";
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
      Horses_Livestocks_type: new FormControl(''),
      Horses_Livestocks_subtype: new FormControl(''),
      Form_Serial_Number: new FormControl(''),
      
      //new fields added
      Horses_Name: new FormControl(''),
      Category: new FormControl(''),
      Gender: new FormControl(''),
      Colour: new FormControl(''),
      County: new FormControl(''),
      Vendor_Details: new FormControl(''),
      Sire: new FormControl(''),
      Dam: new FormControl(''),
      Dam_Sire: new FormControl(''),
      Skill: new FormControl(''),
      Age: new FormControl(''),
      DOB: new FormControl(''),
      COB: new FormControl(''),
      X_rayed: new FormControl(''),
      Height: new FormControl(''),
      Weight_lbs: new FormControl(''),
      AFS_no: new FormControl(''),
      Rep_no: new FormControl(''),
      Location: new FormControl(''),
      Scoped: new FormControl(''),
      livestock_Price: new FormControl(''),
      Temperament: new FormControl(''),
      Foal_Date: new FormControl(''),
      In_Foal: new FormControl(''),
      Breed: new FormControl(''),
      Markings: new FormControl(''),
      Listing_Number: new FormControl(''),
      Ship_From: new FormControl(''),
      Registered: new FormControl(''),
      Number_for_Sale: new FormControl(''),
      Origin: new FormControl(''),
      Frame: new FormControl(''),
      Condition: new FormControl(''),
      Horns: new FormControl(''),
      Est_Weight: new FormControl(''),
      Bred_To: new FormControl(''),
      Preg_Checked: new FormControl(''),
      Implanted: new FormControl(''),
      Gathered: new FormControl(''),
      Pasture_Feed: new FormControl(''),
      OCV: new FormControl(''),
      Sell_Part_All: new FormControl(''),
      Delivery_Date: new FormControl(''),
      Firm_Negotiable: new FormControl(''),
      Payment_Terms: new FormControl(''),
      Seller: new FormControl(''),
      Lineage: new FormControl(''),
      Ship_Semen: new FormControl(''),
      Vaccination: new FormControl(''),
      Price_Description: new FormControl(''),
      Estimated_Weight_Variance: new FormControl(''),
      Date_of_Birth: new FormControl(''),
      Description_Horses: new FormControl(''),
      Crossbred_Purebred: new FormControl(''),
      Registry: new FormControl(''),
      Registry_Number: new FormControl(''),
      State_Breed: new FormControl(''),
      Birth_Weight: new FormControl(''),
      Fertility: new FormControl(''),
      Head_Count: new FormControl(''),
      Price_per_head: new FormControl(''),
      Average_Weight: new FormControl(''),
      Total_Weight: new FormControl(''),
      fractional_share_choice_percentage_or_unit: new FormControl(''),
      fractional_share_text_percentage_or_unit: new FormControl(''),
      offering_Price_fractional_ownership: new FormControl(''),
      Registration_Number: new FormControl(''),
      
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
    this.UserService.getHorsesLiveAllCount().subscribe(result => {
      this.loading = false;
      let getStr1 = JSON.stringify(10001);
      if (result['count'] == undefined) {
        this.getCurrentSerialNumber = JSON.parse(getStr1);
      } else {
        this.getCurrentSerialNumber = (10001 + result['count']);
      }
    });
  }

    // for get selected sub Categorys
    changeSubCategory(item) {
      //$('.general').show();
      if (item == "Race Horses") {
        $('.draftHorses').hide();
        $('.showHorses').hide();
        $('.cattle').hide();
        $('.sheep').hide();
        $('.otherLiveStocks').hide();
        $('.raceHorses').show();
      } else if (item == "Draft Horses") {
        $('.raceHorses').hide();
        $('.showHorses').hide();
        $('.cattle').hide();
        $('.sheep').hide();
        $('.otherLiveStocks').hide();
        $('.draftHorses').show();
      } else if (item == "Show Horses") {
        $('.draftHorses').hide();
        $('.raceHorses').hide();
        $('.cattle').hide();
        $('.sheep').hide();
        $('.otherLiveStocks').hide();
        $('.showHorses').show();
      } else if (item == "Cattle") {
        $('.draftHorses').hide();
        $('.showHorses').hide();
        $('.raceHorses').hide();
        $('.sheep').hide();
        $('.otherLiveStocks').hide();
        $('.cattle').show();
      } else if (item == "Sheep") {
        $('.draftHorses').hide();
        $('.showHorses').hide();
        $('.cattle').hide();
        $('.raceHorses').hide();
        $('.otherLiveStocks').hide();
        $('.sheep').show();
      } else if (item == "Other Live Stocks") {
        $('.draftHorses').hide();
        $('.showHorses').hide();
        $('.cattle').hide();
        $('.sheep').hide();
        $('.raceHorses').hide();
        $('.otherLiveStocks').show();
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
      property_type: 'Horses & Live Stocks'
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
          if (this.getData[0].Horses_Livestocks_subtype == "Race Horses") {
            $('.raceHorses').show();
          } else if (this.getData[0].Horses_Livestocks_subtype == "Draft Horses") {
            $('.draftHorses').show();
          } else if (this.getData[0].Horses_Livestocks_subtype == "Show Horses") {
            $('.showHorses').show();
          } else if (this.getData[0].Horses_Livestocks_subtype == "Cattle") {
            $('.cattle').show();
          } else if (this.getData[0].Horses_Livestocks_subtype == "Sheep") {
            $('.sheep').show();
          } else if (this.getData[0].Horses_Livestocks_subtype == "Other Live Stocks") {
            $('.otherLiveStocks').show();
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
          if (this.purpose === "No Ready") {
            this.price = "";
            $("#price").attr('readonly', 'readonly');
          } else {
            $("#price").removeAttr('readonly');
          }
          this.Horses_Livestocks_type = this.getData[0].Horses_Livestocks_type;
          this.Horses_Livestocks_subtype = this.getData[0].Horses_Livestocks_subtype;
          this.Form_Serial_Number = this.getData[0].Form_Serial_Number;
          
          this.prevuiousPdf = this.getData[0].pdf_doc;

          // New fields added
          this.Horses_Name = this.getData[0].Horses_Name;
          this.Category = this.getData[0].Category;
          this.Gender = this.getData[0].Gender;
          this.Colour = this.getData[0].Colour;
          this.County = this.getData[0].County;
          this.Vendor_Details = this.getData[0].Vendor_Details;
          this.Sire = this.getData[0].Sire;
          this.Dam = this.getData[0].Dam;
          this.Dam_Sire = this.getData[0].Dam_Sire;
          this.Skill = this.getData[0].Skill;
          this.Age = this.getData[0].Age;
          this.DOB = this.getData[0].DOB;
          this.COB = this.getData[0].COB;
          this.X_rayed = this.getData[0].X_rayed;
          this.Height = this.getData[0].Height;
          this.Weight_lbs = this.getData[0].Weight_lbs;
          this.AFS_no = this.getData[0].AFS_no;
          this.Rep_no = this.getData[0].Rep_no;
          this.Location = this.getData[0].Location;
          this.Scoped = this.getData[0].Scoped;
          this.livestock_Price = this.getData[0].livestock_Price;
          this.Temperament = this.getData[0].Temperament;
          this.Foal_Date = this.getData[0].Foal_Date;
          this.In_Foal = this.getData[0].In_Foal;
          this.Breed = this.getData[0].Breed;
          this.Markings = this.getData[0].Markings;
          this.Listing_Number = this.getData[0].Listing_Number;
          this.Ship_From = this.getData[0].Ship_From;
          this.Registered = this.getData[0].Registered;
          this.Number_for_Sale = this.getData[0].Number_for_Sale;
          this.Origin = this.getData[0].Origin;
          this.Frame = this.getData[0].Frame;
          this.Condition = this.getData[0].Condition;
          this.Horns = this.getData[0].Horns;
          this.Est_Weight = this.getData[0].Est_Weight;
          this.Bred_To = this.getData[0].Bred_To;
          this.Preg_Checked = this.getData[0].Preg_Checked;
          this.Implanted = this.getData[0].Implanted;
          this.Gathered = this.getData[0].Gathered;
          this.Pasture_Feed = this.getData[0].Pasture_Feed;
          this.OCV = this.getData[0].OCV;
          this.Sell_Part_All = this.getData[0].Sell_Part_All;
          this.Delivery_Date = this.getData[0].Delivery_Date;
          this.Firm_Negotiable = this.getData[0].Firm_Negotiable;
          this.Payment_Terms = this.getData[0].Payment_Terms;
          this.Seller = this.getData[0].Seller;
          this.Lineage = this.getData[0].Lineage;
          this.Ship_Semen = this.getData[0].Ship_Semen;
          this.Vaccination = this.getData[0].Vaccination;
          this.Price_Description = this.getData[0].Price_Description;
          this.Estimated_Weight_Variance = this.getData[0].Estimated_Weight_Variance;
          this.Date_of_Birth = this.getData[0].Date_of_Birth;
          this.Description_Horses = this.getData[0].Description_Horses;
          this.Crossbred_Purebred = this.getData[0].Crossbred_Purebred;
          this.Registry = this.getData[0].Registry;
          this.Registry_Number = this.getData[0].Registry_Number;
          this.State_Breed = this.getData[0].State_Breed;
          this.Birth_Weight = this.getData[0].Birth_Weight;
          this.Fertility = this.getData[0].Fertility;
          this.Head_Count = this.getData[0].Head_Count;
          this.Price_per_head = this.getData[0].Price_per_head;
          this.Average_Weight = this.getData[0].Average_Weight;
          this.Total_Weight = this.getData[0].Total_Weight;
          this.Registration_Number = this.getData[0].Registration_Number;
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
    if (this.createPostingForm.value.Horses_Livestocks_subtype == "") {
      $('#fileDropRef').focus();
      finalString += "Please select horses & live stocks sub-type.<br>";
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
      formData.append("price", this.createPostingForm.value.price);
      formData.append("Horses_Livestocks_type", this.createPostingForm.value.Horses_Livestocks_type.trim());
      formData.append("Horses_Livestocks_subtype", this.createPostingForm.value.Horses_Livestocks_subtype.trim());

      // New fields added
      formData.append("Horses_Name", this.createPostingForm.value.Horses_Name.trim());
      formData.append("Category", this.createPostingForm.value.Category.trim());
      formData.append("Gender", this.createPostingForm.value.Gender.trim());
      formData.append("Colour", this.createPostingForm.value.Colour.trim());
      formData.append("County", this.createPostingForm.value.County.trim());
      formData.append("Vendor_Details", this.createPostingForm.value.Vendor_Details.trim());
      formData.append("Sire", this.createPostingForm.value.Sire.trim());
      formData.append("Dam", this.createPostingForm.value.Dam.trim());
      formData.append("Dam_Sire", this.createPostingForm.value.Dam_Sire.trim());
      formData.append("Skill", this.createPostingForm.value.Skill.trim());
      formData.append("Age", this.createPostingForm.value.Age.trim());
      formData.append("DOB", this.createPostingForm.value.DOB.trim());
      formData.append("COB", this.createPostingForm.value.COB.trim());
      formData.append("X_rayed", this.createPostingForm.value.X_rayed.trim());
      formData.append("Height", this.createPostingForm.value.Height.trim());
      formData.append("Weight_lbs", this.createPostingForm.value.Weight_lbs.trim());
      formData.append("AFS_no", this.createPostingForm.value.AFS_no.trim());
      formData.append("Rep_no", this.createPostingForm.value.Rep_no.trim());
      formData.append("Location", this.createPostingForm.value.Location.trim());
      formData.append("Scoped", this.createPostingForm.value.Scoped.trim());
      formData.append("livestock_Price", this.createPostingForm.value.livestock_Price.trim());
      formData.append("Temperament", this.createPostingForm.value.Temperament.trim());
      formData.append("Foal_Date", this.createPostingForm.value.Foal_Date);
      formData.append("In_Foal", this.createPostingForm.value.In_Foal.trim());
      formData.append("Breed", this.createPostingForm.value.Breed.trim());
      formData.append("Markings", this.createPostingForm.value.Markings.trim());
      formData.append("Listing_Number", this.createPostingForm.value.Listing_Number.trim());
      formData.append("Ship_From", this.createPostingForm.value.Ship_From.trim());
      formData.append("Registered", this.createPostingForm.value.Registered.trim());
      formData.append("Number_for_Sale", this.createPostingForm.value.Number_for_Sale.trim());
      formData.append("Origin", this.createPostingForm.value.Origin.trim());
      formData.append("Frame", this.createPostingForm.value.Frame.trim());
      formData.append("Condition", this.createPostingForm.value.Condition.trim());
      formData.append("Horns", this.createPostingForm.value.Horns.trim());
      formData.append("Est_Weight", this.createPostingForm.value.Est_Weight.trim());
      formData.append("Bred_To", this.createPostingForm.value.Bred_To.trim());
      formData.append("Preg_Checked", this.createPostingForm.value.Preg_Checked.trim());
      formData.append("Implanted", this.createPostingForm.value.Implanted.trim());
      formData.append("Gathered", this.createPostingForm.value.Gathered.trim());
      formData.append("Pasture_Feed", this.createPostingForm.value.Pasture_Feed.trim());
      formData.append("OCV", this.createPostingForm.value.OCV.trim());
      formData.append("Sell_Part_All", this.createPostingForm.value.Sell_Part_All.trim());
      formData.append("Delivery_Date", this.createPostingForm.value.Delivery_Date);
      formData.append("Firm_Negotiable", this.createPostingForm.value.Firm_Negotiable.trim());
      formData.append("Payment_Terms", this.createPostingForm.value.Payment_Terms.trim());
      formData.append("Seller", this.createPostingForm.value.Seller.trim());
      formData.append("Lineage", this.createPostingForm.value.Lineage.trim());
      formData.append("Ship_Semen", this.createPostingForm.value.Ship_Semen.trim());
      formData.append("Vaccination", this.createPostingForm.value.Vaccination.trim());
      formData.append("Price_Description", this.createPostingForm.value.Price_Description.trim());
      formData.append("Estimated_Weight_Variance", this.createPostingForm.value.Estimated_Weight_Variance.trim());
      formData.append("Date_of_Birth", this.createPostingForm.value.Date_of_Birth);
      formData.append("Description_Horses", this.createPostingForm.value.Description_Horses.trim());
      formData.append("Crossbred_Purebred", this.createPostingForm.value.Crossbred_Purebred.trim());
      formData.append("Registry", this.createPostingForm.value.Registry.trim());
      formData.append("Registry_Number", this.createPostingForm.value.Registry_Number.trim());
      formData.append("State_Breed", this.createPostingForm.value.State_Breed.trim());
      formData.append("Birth_Weight", this.createPostingForm.value.Birth_Weight.trim());
      formData.append("Fertility", this.createPostingForm.value.Fertility.trim());
      formData.append("Head_Count", this.createPostingForm.value.Head_Count.trim());
      formData.append("Price_per_head", this.createPostingForm.value.Price_per_head.trim());
      formData.append("Average_Weight", this.createPostingForm.value.Average_Weight.trim());
      formData.append("Total_Weight", this.createPostingForm.value.Total_Weight.trim());
      formData.append("Registration_Number", this.createPostingForm.value.Registration_Number.trim());
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
        this.UserService.UpdateListingHorsesLive(formData, this.getParamsId).subscribe(result => {
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
        formData.append("Form_Serial_Number", this.getCurrentSerialNumber);
        formData.append("created_by", "WeCoOwn");
        this.UserService.CreateHorsesLiveListing(formData).subscribe(result => {
          //console.log("result : ", result);
          this.loading = false;
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // localStorage.setItem('HorsesLiveCurrentSerialNumber', JSON.stringify((result['Form_Serial_Number'] + 1)));
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