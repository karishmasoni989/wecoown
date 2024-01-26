import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
declare global {
  interface Date {
    addDays: (d) => any;
  }
}
Date.prototype.addDays = function (d) {
  this.setHours(this.getHours() + d * 24);
  return this;
};
@Component({
  selector: 'app-create-ads',
  templateUrl: './create-ads.component.html',
  styleUrls: ['./create-ads.component.css']
})

export class CreateAdsComponent implements OnInit {
  bannerForm: FormGroup;
  steps: any;
  categoryArray: any;
  ShowPreviousPosterStartDate = false;
  FinalArray: any;
  loading = false;
  ImgArray: [];
  // fileOver: boolean;
  @HostBinding('class.fileover') fileOver: boolean;
  //fileDropped: any;
  @Output() fileDropped = new EventEmitter<any>();
  files: any[] = [];
  CurrentUserId: any;
  posterForm: FormGroup;
  sidebarForm: FormGroup;
  AdText: any;
  vendorPageListingForm: FormGroup;
  endDateBanner: any;
  endDateSidebar: any;
  endDatePoster: any;
  endDateVender: any;
  VenderTypeArray: any;
  poster_start_date: any;
  sidebar_start_date: any;
  todayDate: string;
  getDateOnly: any;
  banner_days = 0;
  sidebar_days = 0;
  poster_days = 7;
  vendor_days = 0;
  endDatePosterForGroupData: any;
  getPosterPreviousGroupDataId: any;
  datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo", min: '' };
  banner_start_date: any
  vendor_start_date: any;
  previous_poster_start_date: string;
  // percent: any;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.CurrentUserId = parseData['id'];
      this.getPosterAdGroupData(parseData['id']);
    }
    this.bannerForm = new FormGroup({
      user_id: new FormControl(this.CurrentUserId),
      url_button: new FormControl('', [Validators.required]),
      coupon: new FormControl(''),
      days: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      country_currency: new FormControl(''),
      estimated_tax: new FormControl(''),
      total_amount: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      total_budget: new FormControl('', [Validators.required]),
    });
    this.posterForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      headline: new FormControl('', [Validators.required]),
      user_id: new FormControl(this.CurrentUserId),
      url_button: new FormControl('', [Validators.required]),
      coupon: new FormControl(''),
      days: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      country_currency: new FormControl(''),
      estimated_tax: new FormControl(''),
      total_amount: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      total_budget: new FormControl('', [Validators.required]),
    });
    this.sidebarForm = new FormGroup({
      user_id: new FormControl(this.CurrentUserId),
      url_button: new FormControl('', [Validators.required]),
      coupon: new FormControl(''),
      days: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      country_currency: new FormControl(''),
      estimated_tax: new FormControl(''),
      total_amount: new FormControl(''),
      category: new FormControl('', [Validators.required]),
      total_budget: new FormControl('', [Validators.required]),
    });
    this.vendorPageListingForm = new FormGroup({
      user_id: new FormControl(this.CurrentUserId),
      days: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      start_date: new FormControl('', [Validators.required]),
      vendor_name: new FormControl('', [Validators.required]),
      vendor_email: new FormControl('', [Validators.required]),
      vendor_address: new FormControl('', [Validators.required]),
      vendor_url: new FormControl('', [Validators.required]),
      vendor_type: new FormControl('', [Validators.required]),
    });
    this.getCategory();
    this.getADText();
    // $('.js-example-basic-multiple').select2();
    let getDateOnly = new Date().toISOString().split("T")[0];
    this.todayDate = getDateOnly;
    this.datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo", min: moment().format('MM/DD/YYYY') };
    // this.datePickerPosterConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo", min: moment().format('MM/DD/YYYY') ,disabled: true };
    // alert(this.todayDate)
    // this.banner_start_date = moment().format('MM/DD/YYYY');
    // $('#start-date-banner').attr('min', this.todayDate);
    // $('#start-date-vender').attr('min', this.todayDate);
    // $('#start-date-sidebar').attr('min', this.todayDate);
    // $('#start-date-poster').attr('min', this.todayDate);
    // width: 100%;
    // padding: .375rem .75rem;
    // border: 0;
  }
  getPosterAdGroupData(user_id) {
    let dataForm = {
      user_id: user_id
    }
    this.UserService.getPosterAdGroupDataByUserId(dataForm).subscribe(result => {
      //console.log("result getPosterAdGroupDataByUserId: ", result);
      if (result['success'] == true) {
        let previous_group_data = (result['posterAdGroupData']);
        $('#start-date-poster').removeAttr("min");
        // 
        // let getStartPosterDate = previous_group_data[0].start_date.split('T')
        // let getEndPosterDate = previous_group_data[0].end_date.split('T')
        // this.poster_start_date = getStartPosterDate[0];
        // this.endDatePoster = getEndPosterDate[0];
        let getStartDate = moment(previous_group_data.start_date).format("MM/DD/YYYY");
        let getEndDate = moment(previous_group_data.end_date).format("MM/DD/YYYY");
        this.ShowPreviousPosterStartDate = true;
        this.previous_poster_start_date = getStartDate;
        // $("#start-date-poster input").prop("disabled", true);
        // $('#start-date-poster').attr('disabled', 'true');
        // $("#poster-div dp-date-picker").attr('disabled', 'true');
        // document.getElementById("start-date-poster").setAttribute(
        //   "disabled", "true");
        //console.log("getStartDate : ", getStartDate);
        // $('#start-date-poster').val(getStartDate);
        // $("#start-date-poster").prop("disabled", true);
        this.endDatePosterForGroupData = getEndDate;
        this.endDatePoster = getEndDate;
        $('#end-date-poster').val(getEndDate);
        //console.log("getEndDate : ", getEndDate);
        this.getPosterPreviousGroupDataId = previous_group_data._id;
      }
    });
  }
  getADText() {
    this.UserService.getAdText().subscribe(result => {
      ////console.log("result : ", result);
      if (result['success'] == true) {
        this.AdText = result['getData'][0].text;
      }
    });
  }

  ngAfterViewInit() {

  }
  // for increment decrement input value
  increaseValue(id) {
    var value = parseInt(document.getElementById(id)['value'], 10);
    value = isNaN(value) ? 0 : value;
    value++;
    if (id == 'vender-number') {
      this.vendor_days = value;
    } else if (id == 'banner-number') {
      this.banner_days = value;
    } else if (id == 'sidebar-number') {
      this.sidebar_days = value;
    } else if (id == 'poster-number') {
      this.poster_days = value;
    }
    document.getElementById(id)['value'] = value;
    this.getDays(value, 2);
    this.getDaysPoster(value, 2);
    this.getDaysSidebar(value, 2);
    this.getDaysVendor(value, 2);
  }

  decreaseValue(id) {
    var value = parseInt(document.getElementById(id)['value'], 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    if (id == 'vender-number') {
      this.vendor_days = value;
    } else if (id == 'banner-number') {
      this.banner_days = value;
    } else if (id == 'sidebar-number') {
      this.sidebar_days = value;
    } else if (id == 'poster-number') {
      this.poster_days = value;
    }
    document.getElementById(id)['value'] = value;
    this.getDays(value, 2);
    this.getDaysPoster(value, 2);
    this.getDaysSidebar(value, 2);
    this.getDaysVendor(value, 2);
  }

  // for radio buttons check
  checkRadio(checkId) {
    this.endDateBanner = "";
    this.endDateSidebar = "";
    if (this.endDatePosterForGroupData == undefined) {
      this.endDatePoster = "";
    }
    this.endDateVender = "";
    if (checkId === 1) {
      $('.ad-danger').hide();
      this.files = [];
      $('#banner-div').show();
      $('#poster-div').hide();
      $('#sidebar-div').hide();
      $('#vendor-div').hide();
    } else if (checkId === 2) {
      $('.ad-danger').hide();
      this.files = [];
      $('#banner-div').hide();
      $('#poster-div').show();
      $('#sidebar-div').hide();
      $('#vendor-div').hide();
    }
    else if (checkId === 3) {
      $('.ad-danger').hide();
      this.files = [];
      $('#banner-div').hide();
      $('#poster-div').hide();
      $('#sidebar-div').show();
      $('#vendor-div').hide();
    }
    else if (checkId === 4) {
      this.getVenderType();
      $('.ad-danger').hide();
      this.files = [];
      $('#banner-div').hide();
      $('#poster-div').hide();
      $('#sidebar-div').hide();
      $('#vendor-div').show();
    }
  }
  getVenderType() {
    this.UserService.getVendorType().subscribe(result => {
      //  //console.log("result : ", result);
      if (result['success'] == true) {
        this.VenderTypeArray = (result['getData']);
      }
    });
  }

  getCategory() {
    this.UserService.getAllCategory().subscribe(result => {
      ////console.log("result : ", result);
      if (result['success'] == true) {
        ////console.log(result['message']);
        ////console.log(result['categoryData']);
        this.categoryArray = (result['categoryData']);
      }
      else if (result['success'] == false) {
        ////console.log(result['message']);
      }
    });
  }
  fileBroswerHandler(event) {
  }
  onFileDropped(event) {
    this.files = [];
    ////console.log("araay filessss : ", this.files);
    for (let item of event) {
      this.files.push(item)
    }
  }

  delteFile(i) {
    ////console.log("this.files", this.files);
    ////console.log("typedoffffffff : ", typeof (this.files));
    this.files.splice(i, 1);
    ////console.log("here are finallllll : ", this.files);
  }

  getDays(val, ch) {
    //console.log(val)
    if (this.banner_start_date != undefined) {
      if (ch == 1 && val != "") {
        let getStartD = this.banner_start_date;
        val = $('#banner-number').val();
        if (val == 0) {
          let setSt = new Date(getStartD);
          //console.log(setSt);
          let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
          this.endDateBanner = finalStr;
          $('#end-date-banner').val(this.endDateBanner);
        } else {
          let setSt = new Date(getStartD).addDays(parseInt(val));
          //console.log(setSt);
          let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
          this.endDateBanner = finalStr;
          $('#end-date-banner').val(this.endDateBanner);
        }
      } else if (ch == 2 && val != "") {
        let getStartD = this.banner_start_date;
        let setSt = new Date(getStartD).addDays(parseInt(val));
        //console.log(setSt);
        let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
        this.endDateBanner = finalStr;
        $('#end-date-banner').val(this.endDateBanner);
      }
    }
  }

  getDaysPoster(val, ch) {
    if (this.poster_start_date != undefined) {
      if (ch == 1 && val != "") {
        let getStartD = this.poster_start_date;
        val = 7;
        if (val == 0) {
          let setSt = new Date(getStartD);
          let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
          this.endDatePoster = finalStr;
          $('#end-date-poster').val(this.endDatePoster);
        } else {
          let setSt = new Date(getStartD).addDays(7);
          let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
          this.endDatePoster = finalStr;
          $('#end-date-poster').val(this.endDatePoster);
        }
      } else if (ch == 2 && val != "") {
        let getStartD = this.poster_start_date;
        let setSt = new Date(getStartD).addDays(parseInt(val));
        let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
        this.endDatePoster = finalStr;
        $('#end-date-poster').val(this.endDatePoster);
      }
    }
  }

  // getDaysPoster(val, ch) {
  //   if (ch == 1 && val != "") {
  //     let getStartD = $('#start-date-poster').val();
  //     val = $('#poster-number').val();
  //     if (val == 0) {
  //       let setSt = new Date(getStartD);
  //       let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate()   + '/' + setSt.getFullYear();
  //       this.endDatePoster = finalStr;
  //       $('#end-date-poster').val(this.endDatePoster);
  //     } else {        
  //       let setSt = new Date(getStartD).addDays(parseInt(val));
  //       let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate()   + '/' + setSt.getFullYear();
  //       this.endDatePoster = finalStr;
  //       $('#end-date-poster').val(this.endDatePoster);
  //     }
  //   } else if (ch == 2 && val != ""){      
  //     let getStartD = $('#start-date-poster').val();
  //     let setSt = new Date(getStartD).addDays(parseInt(val));
  //     let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate()   + '/' + setSt.getFullYear();
  //     this.endDatePoster = finalStr;
  //     $('#end-date-poster').val(this.endDatePoster);
  //   }
  // }

  getDaysSidebar(val, ch) {
    if (this.sidebar_start_date != undefined) {
      if (ch == 1 && val != "") {
        let getStartD = this.sidebar_start_date;
        val = $('#sidebar-number').val();
        if (val == 0) {
          let setSt = new Date(getStartD);
          let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
          this.endDateSidebar = finalStr;
          $('#end-date-sidebar').val(this.endDateSidebar);
        } else {
          let setSt = new Date(getStartD).addDays(parseInt(val));
          let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
          this.endDateSidebar = finalStr;
          $('#end-date-sidebar').val(this.endDateSidebar);
        }
      } else if (ch == 2 && val != "") {
        let getStartD = this.sidebar_start_date;
        let setSt = new Date(getStartD).addDays(parseInt(val));
        let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
        this.endDateSidebar = finalStr;
        $('#end-date-sidebar').val(this.endDateSidebar);
      }
    }
  }

  getDaysVendor(val, ch) {
    if (this.vendor_start_date != undefined) {
      if (ch == 1 && val != "") {
        let getStartD = this.vendor_start_date;
        val = $('#vender-number').val();
        if (val == 0) {
          let setSt = new Date(getStartD);
          let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
          this.endDateVender = finalStr;
          $('#end-date-vendor').val(this.endDateVender);
        } else {
          let setSt = new Date(getStartD).addDays(parseInt(val));
          let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
          this.endDateVender = finalStr;
          $('#end-date-vendor').val(this.endDateVender);
        }
      } else if (ch == 2 && val != "") {
        let getStartD = this.vendor_start_date;
        let setSt = new Date(getStartD).addDays(parseInt(val));
        let finalStr = (setSt.getMonth() + 1) + '/' + setSt.getDate() + '/' + setSt.getFullYear();
        this.endDateVender = finalStr;
        $('#end-date-vendor').val(this.endDateVender);
      }
    }
  }

  bannerSubmit() {
    // alert(this.bannerForm.value.total_amount)
    // alert($('#banner-calculate-total-amount').val())
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let emailVal = $('#email').val();
    let finalString = "";
    if (this.files.length == 0) {
      $('#fileDropRef').focus();
      finalString += "Please select image/video : 728 x 90 pixel for banner ads.<br>";
    }
    if ($('#url-banner').val() == '') {
      $('#url-banner').focus();
      finalString += "Please enter url for button click.<br>";
    }
    if ($('#category-banner').val() == '') {
      $('#category-banner').focus();
      finalString += "Please select category name.<br>";
    }
    // if ($('#coupon-banner').val() == '') {
    //   $('#coupon-banner').focus();
    //   finalString += "Please enter last name.<br>";
    // }
    if (this.bannerForm.value.start_date == '' || this.bannerForm.value.start_date == undefined) {
      $('#start-date-banner').focus();
      finalString += "Please select start date.<br>";
    }
    if ($('#banner-number').val() == '') {
      $('#banner-number').focus();
      finalString += "Please enter days.<br>";
    }
    if ($('#end-date-banner').val() == '') {
      $('#end-date-banner').focus();
      finalString += "Please select end date.<br>";
    }
    // if ($('#banner-total-budget').val() == '') {
    //   $('#banner-total-budget').focus();
    //   finalString += "Please select total budget.<br>";
    // }
    // if ($('#username').val() == '') {
    //   $('#username').focus();
    //   if ($('#username').val().length == 1 || $('#username').val().length == 2 || $('#username').val().length == 3) {
    //     finalString += "Username must be greater than 3 character.<br>";
    //   } else {
    //     finalString += "Please enter username.<br>";
    //   }
    // }
    // if ($('#email').val() == '') {
    //   $('#email').focus();
    //   if (!regex.test(emailVal)) {
    //     finalString += "Please enter email address.<br>";
    //   } else {
    //     finalString += "Please enter valid email address.<br>";
    //   }
    // }
    $(".ad-danger").html(finalString);
    $('.ad-danger').show();
    $('.property_head').focus();
    if (finalString == '') {
      this.loading = true;
      let convertDate = this.bannerForm.value.end_date;
      let che = convertDate.split("/");
      let finalDater = che[2] + '/' + che[0] + '/' + che[1];
      this.bannerForm.value.end_date = finalDater;
      $('.ad-danger').hide();
      ////console.log("banne r fomr : ", this.bannerForm.value);
      let formData = new FormData();
      formData.append("user_id", this.bannerForm.value.user_id);
      formData.append("category", $('#category-banner').val());
      formData.append("url_button", this.bannerForm.value.url_button);
      formData.append("coupon", this.bannerForm.value.coupon);
      formData.append("days", $('#banner-number').val());
      formData.append("start_date", this.bannerForm.value.start_date);
      formData.append("end_date", this.bannerForm.value.end_date);
      formData.append("country_currency", this.bannerForm.value.country_currency);
      formData.append("total_budget", $('#banner-total-budget').val());
      formData.append("estimated_tax", this.bannerForm.value.estimated_tax);
      formData.append("total_amount", $('#banner-calculate-total-amount').val());
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      ////console.log("form register val : ", formData);
      this.UserService.setBannerAd(formData).subscribe(result => {
        this.loading = false;
        ////console.log("result : ", result);
        if (result['success'] == true) {
          $(".ad-Success").html(result['message']);
          $('.ad-Success').show();
          $('.ad-danger').hide();
          $('.property_head').focus();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".ad-danger").html(result['message']);
          $('.ad-danger').show();
          $('.ad-Success').hide();
          $('.property_head').focus();
        }
      });
    }
  }

  PosterSubmit() {
    // alert($('#category-poster').val())    
    let finalString = "";
    if ($('#desc-poster').val() == '') {
      $('#desc-poster').focus();
      finalString += "Please enter description.<br>";
    }
    if (this.files.length == 0) {
      $('#fileDropRef').focus();
      finalString += "Please select image/video.<br>";
    }
    if ($('#headline-poster').val() == '') {
      $('#headline-poster').focus();
      finalString += "Please enter headline.<br>";
    }
    if ($('#url-poster').val() == '') {
      $('#url-poster').focus();
      finalString += "Please enter url for button click.<br>";
    }
    if ($('#category-poster').val() == '') {
      $('#category-poster').focus();
      finalString += "Please select category name.<br>";
    }
    // if ($('#coupon-banner').val() == '') {
    //   $('#coupon-banner').focus();
    //   finalString += "Please enter last name.<br>";
    // }
    if (this.posterForm.value.start_date == '' || this.posterForm.value.start_date == undefined) {
      $('#start-date-poster').focus();
      finalString += "Please select start date.<br>";
    }
    // if ($('#poster-number').val() == '') {
    //   $('#poster-number').focus();
    //   finalString += "Please enter days.<br>";
    // }
    if ($('#end-date-poster').val() == '') {
      $('#end-date-poster').focus();
      finalString += "Please select end date.<br>";
    }
    if ($('#poster-total-budget').val() == '') {
      $('#poster-total-budget').focus();
      finalString += "Please select total budget.<br>";
    }
    $(".ad-danger").html(finalString);
    $('.ad-danger').show();
    $('.property_head').focus();
    if (finalString == '') {
      this.loading = true;
      if (this.endDatePoster != this.posterForm.value.end_date) {
        let convertDate = this.posterForm.value.end_date;
        let che = convertDate.split("/");
        let finalDater = che[2] + '/' + che[0] + '/' + che[1];
        this.posterForm.value.end_date = finalDater;
      }
      $('.ad-danger').hide();
      ////console.log("poster fomr : ", this.posterForm.value);
      let formData = new FormData();
      formData.append("description", this.posterForm.value.description);
      formData.append("headline", this.posterForm.value.headline);
      formData.append("user_id", this.posterForm.value.user_id);
      formData.append("category", $('#category-poster').val());
      formData.append("url_button", this.posterForm.value.url_button);
      formData.append("coupon", this.posterForm.value.coupon);
      formData.append("days", "7");
      formData.append("start_date", this.posterForm.value.start_date);
      formData.append("end_date", this.posterForm.value.end_date);
      formData.append("country_currency", this.posterForm.value.country_currency);
      formData.append("total_budget", $('#poster-total-budget').val());
      formData.append("estimated_tax", this.posterForm.value.estimated_tax);
      formData.append("total_amount", this.posterForm.value.total_amount);
      if (this.getPosterPreviousGroupDataId != undefined && this.getPosterPreviousGroupDataId != "") {
        formData.append("previous_group_data_id", this.getPosterPreviousGroupDataId);
      }
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      ////console.log("form banner val : ", formData);
      this.UserService.setPosterAd(formData).subscribe(result => {
        this.loading = false;
        ////console.log("result : ", result);
        if (result['success'] == true) {
          $(".ad-Success").html(result['message']);
          $('.ad-Success').show();
          $('.ad-danger').hide();
          $('.property_head').focus();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".ad-danger").html(result['message']);
          $('.ad-danger').show();
          $('.ad-Success').hide();
          $('.property_head').focus();
        }
      });
    }
  }

  SidebarSubmit() {
    // alert($('#category-sidebar').val())   
    let finalString = "";
    if (this.files.length == 0) {
      $('#fileDropRef').focus();
      finalString += "Please select image/Video : 300 x 250 pixel for sidebar ads.<br>";
    }
    if ($('#url-sidebar').val() == '') {
      $('#url-sidebar').focus();
      finalString += "Please enter url for button click.<br>";
    }
    if ($('#category-sidebar').val() == '') {
      $('#category-sidebar').focus();
      finalString += "Please select category name.<br>";
    }
    // if ($('#coupon-banner').val() == '') {
    //   $('#coupon-banner').focus();
    //   finalString += "Please enter last name.<br>";
    // }
    if (this.sidebarForm.value.start_date == '' || this.sidebarForm.value.start_date == undefined) {
      $('#start-date-sidebar').focus();
      finalString += "Please select start date.<br>";
    }
    if ($('#sidebar-number').val() == '') {
      $('#sidebar-number').focus();
      finalString += "Please enter days.<br>";
    }
    if ($('#end-date-sidebar').val() == '') {
      $('#end-date-sidebar').focus();
      finalString += "Please select end date.<br>";
    }
    // if ($('#sidebar-total-budget').val() == '') {
    //   $('#sidebar-total-budget').focus();
    //   finalString += "Please select total budget.<br>";
    // }
    $(".ad-danger").html(finalString);
    $('.ad-danger').show();
    $('.property_head').focus();
    if (finalString == '') {
      this.loading = true;
      let convertDate = this.sidebarForm.value.end_date;
      let che = convertDate.split("/");
      let finalDater = che[2] + '/' + che[0] + '/' + che[1];
      this.sidebarForm.value.end_date = finalDater;
      $('.ad-danger').hide();
      ////console.log("sidebar form : ", this.sidebarForm.value);
      let formData = new FormData();
      formData.append("user_id", this.sidebarForm.value.user_id);
      formData.append("category", $('#category-sidebar').val());
      formData.append("url_button", this.sidebarForm.value.url_button);
      formData.append("coupon", this.sidebarForm.value.coupon);
      formData.append("days", $('#sidebar-number').val());
      formData.append("start_date", this.sidebarForm.value.start_date);
      formData.append("end_date", this.sidebarForm.value.end_date);
      formData.append("country_currency", this.sidebarForm.value.country_currency);
      formData.append("total_budget", $('#sidebar-total-budget').val());
      formData.append("estimated_tax", this.sidebarForm.value.estimated_tax);
      // formData.append("total_amount", this.sidebarForm.value.total_amount);
      formData.append("total_amount", $('#sidebar-calculate-total-amount').val());
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      ////console.log("form register val : ", formData);
      this.UserService.setSidebarAd(formData).subscribe(result => {
        this.loading = false;
        ////console.log("result : ", result);
        if (result['success'] == true) {
          $(".ad-Success").html(result['message']);
          $('.ad-Success').show();
          $('.ad-danger').hide();
          $('.property_head').focus();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".ad-danger").html(result['message']);
          $('.ad-danger').show();
          $('.ad-Success').hide();
          $('.property_head').focus();
        }
      });
    }
  }

  VendorPageListingSubmit() {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let emailVal = $('#vendor-email').val();
    let finalString = "";
    if ($('#vendor-name').val() == '') {
      $('#vendor-name').focus();
      finalString += "Please enter vendor name.<br>";
    }
    if ($('#vendor-email').val() == '') {
      $('#vendor-email').focus();
      if (!regex.test(emailVal)) {
        finalString += "Please enter vendor email address.<br>";
      } else {
        finalString += "Please enter valid vendor email address.<br>";
      }
    }
    if ($('#vendor-url').val() == '') {
      $('#vendor-url').focus();
      finalString += "Please enter vendor url.<br>";
    }
    if (this.files.length == 0) {
      $('#fileDropRef').focus();
      finalString += "Please select image/logo.<br>";
    }
    if ($('#vendor_type').val() == '') {
      $('#vendor_type').focus();
      finalString += "Please select vendor type.<br>";
    }
    if ($('#vendor-address').val() == '') {
      $('#vendor-address').focus();
      finalString += "Please enter vendor address.<br>";
    }
    if (this.vendorPageListingForm.value.start_date == '' || this.vendorPageListingForm.value.start_date == undefined) {
      $('#start-date-vender').focus();
      finalString += "Please select start date.<br>";
    }
    if ($('#vender-number').val() == '') {
      $('#vender-number').focus();
      finalString += "Please enter days.<br>";
    }
    if ($('#end-date-vendor').val() == '') {
      $('#end-date-vendor').focus();
      finalString += "Please select end date.<br>";
    }
    $(".ad-danger").html(finalString);
    $('.ad-danger').show();
    $('.property_head').focus();
    if (finalString == "") {
      this.loading = true;
      // alert($('#category-sidebar').val())
      let convertDate = this.vendorPageListingForm.value.end_date;
      let che = convertDate.split("/");
      let finalDater = che[2] + '/' + che[0] + '/' + che[1];
      this.vendorPageListingForm.value.end_date = finalDater;
      $('.ad-danger').hide();
      ////console.log("sidebar form : ", this.vendorPageListingForm.value);
      let formData = new FormData();
      formData.append("user_id", this.vendorPageListingForm.value.user_id);
      formData.append("vendor_name", this.vendorPageListingForm.value.vendor_name);
      formData.append("vendor_email", this.vendorPageListingForm.value.vendor_email);
      formData.append("vendor_address", this.vendorPageListingForm.value.vendor_address);
      formData.append("vendor_url", this.vendorPageListingForm.value.vendor_url);
      formData.append("days", $('#vender-number').val());
      formData.append("start_date", this.vendorPageListingForm.value.start_date);
      formData.append("end_date", this.vendorPageListingForm.value.end_date);
      formData.append("vendor_type", this.vendorPageListingForm.value.vendor_type);
      formData.append("total_amount", $('#vendor-calculate-total-amount').val());
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      ////console.log("form vendor page val : ", formData);
      this.UserService.setVendorPageListingAd(formData).subscribe(result => {
        this.loading = false;
        //  //console.log("result : ", result);
        if (result['success'] == true) {
          $(".ad-Success").html(result['message']);
          $('.ad-Success').show();
          $('.ad-danger').hide();
          $('.property_head').focus();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".ad-danger").html(result['message']);
          $('.ad-danger').show();
          $('.ad-Success').hide();
          $('.property_head').focus();
        }
      });
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
    ////console.log("Drag Leave");
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      ////console.log("you drop files : ", files.length);
      this.fileDropped.emit(files);
      for (let item of files) {
        this.files.push(item)
      }
    }
    ////console.log("Drag Over");
  }
}