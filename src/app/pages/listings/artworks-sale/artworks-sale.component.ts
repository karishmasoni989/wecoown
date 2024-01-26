import { Component, OnInit, Directive, EventEmitter, Output, HostListener  } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../../service/user.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../../service/country-state-city.service';

@Component({
  selector: 'app-artworks-sale',
  templateUrl: './artworks-sale.component.html',
  styleUrls: ['./artworks-sale.component.css']
})
export class ArtworksSaleComponent implements OnInit {

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
  Artwork_subtype: string;
  Artwork_type: string;
  price: any;
  Provenance: any;
  Medium: any;
  Subject: any;
  Country_Region_Manufacture: any;
  Style: any;
  Listed_By: any;
  Region_of_Origin: any;
  Painting_Surface: any;
  Features: any;
  Width_Inches: any;
  Date_of_Creation: any;
  Originality: any;
  Height_Inches: any;
  Artist: any;
  Size: any;
  Color: any;
  Signed: any;
  Original_Reproduction: any;
  Placement: any;
  Culture: any;
  Quantity_Type: any;
  Type: any;
  MPN: any;
  Weight: any;
  Material_used: any;
  Print_Surface: any;
  Measurements: any;
  Condition: any;
  History: any;
  Maker: any;
  Circulated_Uncirculated: any;
  Modified_Item: any;
  Grade: any;
  Material: any;
  Dimensions: any;
  Model_number: any;
  Artwork_Description: any;
  Printing_Technique: any;
  fractional_share_choice_percentage_or_unit: string;
  fractional_share_text_percentage_or_unit: any;
  offering_Price_fractional_ownership: any;
  Title: any;
  Artist_History: any;
  Shape: any;
  Period: any;
  Origin: any;
  Current_Location: any;
  Painting_Overview: any;
  Sculpture_Overview: any;
  History_of_Item: any;
  Year_Built_Made: any;
  Artwork_Serial_Number: any;

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
    $('.westernPaintings').hide();
    $('.orientalPaintings').hide();
    $('.Sculptures').hide();
    $('.contemporaryArtworks').hide();
    $('.modernArtworks').hide();
    $('.digitalArtworks').hide();
    $('.Antiques').hide();
    $('.Collectibles').hide();
    this.country = "";
    this.state = "";
    this.city = "";
    this.Artwork_subtype = "";
    this.purpose = "";
    this.Signed = "";
    this.Artwork_type = "Artworks & Antiques";
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
      Artwork_type: new FormControl(''),
      Artwork_subtype: new FormControl(''),
      Form_Serial_Number: new FormControl(''),

      //new fields added
      Provenance: new FormControl(''),
      Medium: new FormControl(''),
      Subject: new FormControl(''),
      Country_Region_Manufacture: new FormControl(''),
      Style: new FormControl(''),
      Listed_By: new FormControl(''),
      Region_of_Origin: new FormControl(''),
      Painting_Surface: new FormControl(''),
      Features: new FormControl(''),
      Width_Inches: new FormControl(''),
      Date_of_Creation: new FormControl(''),
      Originality: new FormControl(''),
      Height_Inches: new FormControl(''),
      Artist: new FormControl(''),
      Size: new FormControl(''),
      Color: new FormControl(''),
      Signed: new FormControl(''),
      Original_Reproduction: new FormControl(''),
      Placement: new FormControl(''),
      Culture: new FormControl(''),
      Quantity_Type: new FormControl(''),
      Type: new FormControl(''),
      MPN: new FormControl(''),
      Weight: new FormControl(''),
      Material_used: new FormControl(''),
      Print_Surface: new FormControl(''),
      Measurements: new FormControl(''),
      Condition: new FormControl(''),
      History: new FormControl(''),
      Maker: new FormControl(''),
      Circulated_Uncirculated: new FormControl(''),
      Modified_Item: new FormControl(''),
      Grade: new FormControl(''),
      Material: new FormControl(''),
      Dimensions: new FormControl(''),
      Model_number: new FormControl(''),
      Artwork_Description: new FormControl(''),
      Printing_Technique: new FormControl(''),
      Title: new FormControl(''),
      Artist_History: new FormControl(''),
      Shape: new FormControl(''),
      Period: new FormControl(''),
      Origin: new FormControl(''),
      Current_Location: new FormControl(''),
      Painting_Overview: new FormControl(''),
      Sculpture_Overview: new FormControl(''),
      History_of_Item: new FormControl(''),
      Year_Built_Made: new FormControl(''),
      Artwork_Serial_Number: new FormControl(''),
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
    this.UserService.getArtworkAllCount().subscribe(result => {
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
      if (item == "Western Paintings") {
        $('.orientalPaintings').hide();
        $('.Sculptures').hide();
        $('.contemporaryArtworks').hide();
        $('.modernArtworks').hide();
        $('.digitalArtworks').hide();
        $('.Antiques').hide();
        $('.Collectibles').hide();
        $('.westernPaintings').show();
      } else if (item == "Oriental Paintings") {
        $('.westernPaintings').hide();
        $('.Sculptures').hide();
        $('.contemporaryArtworks').hide();
        $('.modernArtworks').hide();
        $('.digitalArtworks').hide();
        $('.Antiques').hide();
        $('.Collectibles').hide();
        $('.orientalPaintings').show();
      } else if (item == "Sculptures") {
        $('.orientalPaintings').hide();
        $('.westernPaintings').hide();
        $('.contemporaryArtworks').hide();
        $('.modernArtworks').hide();
        $('.digitalArtworks').hide();
        $('.Antiques').hide();
        $('.Collectibles').hide();
        $('.Sculptures').show();
      } else if (item == "Contemporary Artworks") {
        $('.orientalPaintings').hide();
        $('.Sculptures').hide();
        $('.westernPaintings').hide();
        $('.modernArtworks').hide();
        $('.digitalArtworks').hide();
        $('.Antiques').hide();
        $('.Collectibles').hide();
        $('.contemporaryArtworks').show();
      } else if (item == "Modern Artworks") {
        $('.orientalPaintings').hide();
        $('.Sculptures').hide();
        $('.contemporaryArtworks').hide();
        $('.westernPaintings').hide();
        $('.digitalArtworks').hide();
        $('.Antiques').hide();
        $('.Collectibles').hide();
        $('.modernArtworks').show();
      } else if (item == "Digital Artworks") {
        $('.orientalPaintings').hide();
        $('.Sculptures').hide();
        $('.contemporaryArtworks').hide();
        $('.modernArtworks').hide();
        $('.westernPaintings').hide();
        $('.Antiques').hide();
        $('.Collectibles').hide();
        $('.digitalArtworks').show();
      } else if (item == "Antiques") {
        $('.orientalPaintings').hide();
        $('.Sculptures').hide();
        $('.contemporaryArtworks').hide();
        $('.modernArtworks').hide();
        $('.digitalArtworks').hide();
        $('.westernPaintings').hide();
        $('.Collectibles').hide();
        $('.Antiques').show();
      } else if (item == "Collectibles") {
        $('.orientalPaintings').hide();
        $('.Sculptures').hide();
        $('.contemporaryArtworks').hide();
        $('.modernArtworks').hide();
        $('.digitalArtworks').hide();
        $('.Antiques').hide();
        $('.westernPaintings').hide();
        $('.Collectibles').show();
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
  getSelectedPurpose(item) {
    if (item === "No Ready") {
      this.price = 0;
      $("#price").attr('readonly', 'readonly');
    } else {
      $("#price").removeAttr('readonly');
    }
  }
  changePurposeSigned(val) {
    if (val === 'Yes') {
      $('.SignedYes').show();
      $('.SignedNo').hide();
    } else if (val === 'No') {
      $('.SignedYes').hide();
      $('.SignedNo').show();
    }
  }

  // for get sub property type
  getPropertyType() {
    let dataForForm = {
      property_type: 'Artworks & Antiques'
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
          if (this.getData[0].Artwork_subtype == "Western Paintings") {
            $('.westernPaintings').show();
          } else if (this.getData[0].Artwork_subtype == "Oriental Paintings") {
            $('.orientalPaintings').show();
          } else if (this.getData[0].Artwork_subtype == "Sculptures") {
            $('.Sculptures').show();
          } else if (this.getData[0].Artwork_subtype == "Contemporary Artworks") {
            $('.contemporaryArtworks').show();
          } else if (this.getData[0].Artwork_subtype == "Modern Artworks") {
            $('.modernArtworks').show();
          } else if (this.getData[0].Artwork_subtype == "Digital Artworks") {
            $('.digitalArtworks').show();
          } else if (this.getData[0].Artwork_subtype == "Antiques") {
            $('.Antiques').show();
          } else if (this.getData[0].Artwork_subtype == "Collectibles") {
            $('.Collectibles').show();
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
          this.Artwork_type = this.getData[0].Artwork_type;
          this.Artwork_subtype = this.getData[0].Artwork_subtype;
          this.prevuiousPdf = this.getData[0].pdf_doc;

          // New fields added
          this.Provenance = this.getData[0].Provenance;
          this.Medium = this.getData[0].Medium;
          this.Subject = this.getData[0].Subject;
          this.Country_Region_Manufacture = this.getData[0].Country_Region_Manufacture;
          this.Style = this.getData[0].Style;
          this.Listed_By = this.getData[0].Listed_By;
          this.Region_of_Origin = this.getData[0].Region_of_Origin;
          this.Painting_Surface = this.getData[0].Painting_Surface;
          this.Features = this.getData[0].Features;
          this.Width_Inches = this.getData[0].Width_Inches;
          this.Date_of_Creation = this.getData[0].Date_of_Creation;
          this.Originality = this.getData[0].Originality;
          this.Height_Inches = this.getData[0].Height_Inches;
          this.Artist = this.getData[0].Artist;
          this.Size = this.getData[0].Size;
          this.Color = this.getData[0].Color;
          this.Signed = this.getData[0].Signed;
          this.Original_Reproduction = this.getData[0].Original_Reproduction;
          this.Placement = this.getData[0].Placement;
          this.Culture = this.getData[0].Culture;
          this.Quantity_Type = this.getData[0].Quantity_Type;
          this.Type = this.getData[0].Type;
          this.MPN = this.getData[0].MPN;
          this.Weight = this.getData[0].Weight;
          this.Material_used = this.getData[0].Material_used;
          this.Print_Surface = this.getData[0].Print_Surface;
          this.Measurements = this.getData[0].Measurements;
          this.Condition = this.getData[0].Condition;
          this.History = this.getData[0].History;
          this.Maker = this.getData[0].Maker;
          this.Circulated_Uncirculated = this.getData[0].Circulated_Uncirculated;
          this.Modified_Item = this.getData[0].Modified_Item;
          this.Grade = this.getData[0].Grade;
          this.Material = this.getData[0].Material;
          this.Dimensions = this.getData[0].Dimensions;
          this.Model_number = this.getData[0].Model_number;
          this.Artwork_Description = this.getData[0].Artwork_Description;
          this.Printing_Technique = this.getData[0].Printing_Technique;
          this.Title = this.getData[0].Title;
          this.Artist_History = this.getData[0].Artist_History;
          this.Shape = this.getData[0].Shape;
          this.Period = this.getData[0].Period;
          this.Origin = this.getData[0].Origin;
          this.Current_Location = this.getData[0].Current_Location;
          this.Painting_Overview = this.getData[0].Painting_Overview;
          this.Sculpture_Overview = this.getData[0].Sculpture_Overview;
          this.History_of_Item = this.getData[0].History_of_Item;
          this.Year_Built_Made = this.getData[0].Year_Built_Made;
          this.Artwork_Serial_Number = this.getData[0].Artwork_Serial_Number;
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
    if (this.createPostingForm.value.Artwork_subtype == "") {
      $('#fileDropRef').focus();
      finalString += "Please select Artworks & Antiques sub-type.<br>";
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
      formData.append("Artwork_type", this.createPostingForm.value.Artwork_type.trim());
      formData.append("Artwork_subtype", this.createPostingForm.value.Artwork_subtype.trim());

      // New forms added

      formData.append("Provenance", this.createPostingForm.value.Provenance.trim());
      formData.append("Medium", this.createPostingForm.value.Medium.trim());
      formData.append("Subject", this.createPostingForm.value.Subject.trim());
      formData.append("Country_Region_Manufacture", this.createPostingForm.value.Country_Region_Manufacture.trim());
      formData.append("Style", this.createPostingForm.value.Style.trim());
      formData.append("Listed_By", this.createPostingForm.value.Listed_By.trim());
      formData.append("Region_of_Origin", this.createPostingForm.value.Region_of_Origin.trim());
      formData.append("Painting_Surface", this.createPostingForm.value.Painting_Surface.trim());
      formData.append("Features", this.createPostingForm.value.Features.trim());
      formData.append("Width_Inches", this.createPostingForm.value.Width_Inches.trim());
      formData.append("Date_of_Creation", this.createPostingForm.value.Date_of_Creation.trim());
      formData.append("Originality", this.createPostingForm.value.Originality.trim());
      formData.append("Height_Inches", this.createPostingForm.value.Height_Inches.trim());
      formData.append("Artist", this.createPostingForm.value.Artist.trim());
      formData.append("Size", this.createPostingForm.value.Size.trim());
      formData.append("Color", this.createPostingForm.value.Color.trim());
      formData.append("Signed", this.createPostingForm.value.Signed.trim());
      formData.append("Original_Reproduction", this.createPostingForm.value.Original_Reproduction.trim());
      formData.append("Placement", this.createPostingForm.value.Placement.trim());
      formData.append("Culture", this.createPostingForm.value.Culture.trim());
      formData.append("Quantity_Type", this.createPostingForm.value.Quantity_Type.trim());
      formData.append("Type", this.createPostingForm.value.Type.trim());
      formData.append("MPN", this.createPostingForm.value.MPN.trim());
      formData.append("Weight", this.createPostingForm.value.Weight.trim());
      formData.append("Material_used", this.createPostingForm.value.Material_used.trim());
      formData.append("Print_Surface", this.createPostingForm.value.Print_Surface.trim());
      formData.append("Measurements", this.createPostingForm.value.Measurements.trim());
      formData.append("Condition", this.createPostingForm.value.Condition.trim());
      formData.append("History", this.createPostingForm.value.History.trim());
      formData.append("Maker", this.createPostingForm.value.Maker.trim());
      formData.append("Circulated_Uncirculated", this.createPostingForm.value.Circulated_Uncirculated.trim());
      formData.append("Modified_Item", this.createPostingForm.value.Modified_Item.trim());
      formData.append("Grade", this.createPostingForm.value.Grade.trim());
      formData.append("Material", this.createPostingForm.value.Material.trim());
      formData.append("Dimensions", this.createPostingForm.value.Dimensions.trim());
      formData.append("Model_number", this.createPostingForm.value.Model_number.trim());
      formData.append("Artwork_Description", this.createPostingForm.value.Artwork_Description.trim());
      formData.append("Printing_Technique", this.createPostingForm.value.Printing_Technique.trim());
      formData.append("Title", this.createPostingForm.value.Title.trim());
      formData.append("Artist_History", this.createPostingForm.value.Artist_History.trim());
      formData.append("Shape", this.createPostingForm.value.Shape.trim());
      formData.append("Period", this.createPostingForm.value.Period.trim());
      formData.append("Origin", this.createPostingForm.value.Origin.trim());
      formData.append("Current_Location", this.createPostingForm.value.Current_Location.trim());
      formData.append("Painting_Overview", this.createPostingForm.value.Painting_Overview.trim());
      formData.append("Sculpture_Overview", this.createPostingForm.value.Sculpture_Overview.trim());
      formData.append("History_of_Item", this.createPostingForm.value.History_of_Item.trim());
      formData.append("Year_Built_Made", this.createPostingForm.value.Year_Built_Made.trim());
      formData.append("Artwork_Serial_Number", this.createPostingForm.value.Artwork_Serial_Number.trim());
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
        this.UserService.UpdateListingArtwork(formData, this.getParamsId).subscribe(result => {
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
        this.UserService.CreateArtworkListing(formData).subscribe(result => {
          //console.log("result : ", result);
          this.loading = false;
          if (result['success'] == true) {
            $(".BuyerSuccess").html(result['message']);
            $('.BuyerSuccess').show();
            $('.BuyerDanger').hide();
            $('#fileDropRef').focus();
            // localStorage.setItem('ArtworkCurrentSerialNumber', JSON.stringify((result['Form_Serial_Number'] + 1)));
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