import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../service/country-state-city.service';
@Component({
  selector: 'app-i-am-buyer',
  templateUrl: './i-am-buyer.component.html',
  styleUrls: ['./i-am-buyer.component.css']
})
export class IAmBuyerComponent implements OnInit {
  buyerForm: FormGroup;
  steps: any;
  categoryArray: any;
  FinalArray: any;
  ImgArray: [];
  // fileOver: boolean;
  @HostBinding('class.fileover') fileOver: boolean;
  //fileDropped: any;
  @Output() fileDropped = new EventEmitter<any>();
  files: any[] = [];
  pdfFileUploadd: any[] = [];
  getAllCountry: Object;
  getAllStates: Object;
  getAllCities: Object;
  loading = false;
  category: string;
  // percent: any;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    public CountryStateCityService: CountryStateCityService,
  ) {

  }

  ngOnInit() {
    this.category = "";
    // this.EventPublishService.publishFormRefresh(); 
    this.getCategory();
    this.buyerForm = new FormGroup({
      category: new FormControl(),
      title: new FormControl(''),
      property_desciption: new FormControl('', [Validators.required]),
      property_photos: new FormControl('', [Validators.required]),
      url_property: new FormControl('',),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      // all_images: new FormControl('',),
      // i_am_buyer_id: new FormControl(this.getIpaddress)
    });
    $('#first_form_card').css('display', 'none');
    // for first click
    let current_fs, next_fs, previous_fs, previous_fs_first; //fieldsets
    let opacity;
    let current = 1;
    this.steps = $("fieldset").length;
    // alert($("fieldset").length)
    setProgressBar(current);
    $(".next").click(function () {
      // alert("next click");
      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      if ($('#have_a_property').is(':checked')) {
        next_fs.show();
        $('#second_form_card').hide();
        $('#first_form_card').show();
      }
      else if ($('#i_like_search').is(':checked')) {
        $('#first_form_card').css('display', 'none !important');
        $('#second_form_card').show();

        let userLocalId = localStorage.getItem('userInfo');
        let parseData = JSON.parse(userLocalId);
        if (userLocalId != null) {
          $('.sec-go-register').hide();
          $('.sec-go-home').show();
          // location.reload();
          // this.router.navigate(['/i-am-buyer']);
          // var url = $(this).attr('href');
          // window.open('http://localhost:4200/all-posting?purpose=For%20Sale', '_blank');

          // window.open('https://wepropertyowners.com/all-posting?purpose=For%20Sale', '_blank');
          // $(location).attr('href', '/');
        } else {
          $('.sec-go-register').show();
          $('.sec-go-home').hide();
        }
      } 1
      next_fs.show();
      $('#first_form_card .form-card').css('opacity', '1');
      $('#first_form_card .form-card').css('display', 'block');
      $('#first_form_card .form-card').focus();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          next_fs.css({ 'opacity': opacity });
        },
        duration: 500
      });
      setProgressBar(++current);
    });

    $(".previous").click(function () {

      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();
      //Remove class active
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
      $('#first_form_card').hide();
      //show the previous fieldset
      if ($('#have_a_property').is(':checked')) {
        // $('#second_form_card').hide();
        // $('#first_form_card').show();
        $('#starting_fieldset').show();
      }

      else if ($('#i_like_search').is(':checked')) {
        $('#starting_fieldset').show();

        // $('#first_form_card').css('display', 'none !important');
      }
      previous_fs.show();
      $('#starting_fieldset').css('opacity', '1');
      $('#msform').focus();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          previous_fs.css({ 'opacity': opacity });
        },
        duration: 500
      });
      setProgressBar(--current);
    });

    function setProgressBar(curStep) {
      let percent = (100 / 2) * curStep;
      // percent = percent.toFixed();
      // alert(percent);
      $(".progress-bar")
        .css("width", percent + "%")
    }
    //  for country state city
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
    let dataForm = {
      country_code: country_code
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
    let splitCountryState = mergeName.split('-');
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
  goTowepo() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      let formDataSend = {};
      this.UserService.updateUserRolewhenWebsiteChange(formDataSend, parseData['id']).subscribe(result => {
        //console.log("result : ", result);
        if (result['success'] == true) {
          window.open('https://wepropertyowners.com/all-listing?purpose=For%20Sale', '_blank');
        }
      });
    }
  }
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
    // this.files = event;
    ////console.log("araay filessss : ", this.files);
    for (let item of event) {
      this.files.push(item)
    }
  }
  PdfFileDropped(event) {
    ////console.log("profile filessss : ", event);
    this.pdfFileUploadd = event;
    ////console.log("name of photo : ", this.profilePhotoName);
  }
  delteFile(i) {
    ////console.log("this.files", this.files);
    ////console.log("typedoffffffff : ", typeof (this.files));
    this.files.splice(i, 1);
    ////console.log("here are finallllll : ", this.files);
  }
  // for cover pic checkbox
  getCheckedValCo() {
    $('input.MakeCoverPhotoPost').bind('click', function () {
      if ($(this).prop('checked') === false) {
        $(this).prop('checked', true);
      }
      $('input.MakeCoverPhotoPost').not(this).prop("checked", false);
    });
  }
  submitBuyerForm() {
    // alert(this.files.length == 0)
    // alert($('#category').val() == "")
    // alert($('#property_desciption').val() == '')
    ////console.log(this.files.length);
    let fieldsOfCheckedArray = $("input[class='MakeCoverPhotoPost']").serializeArray();
    let finalString = "";
    if (this.buyerForm.value.category == '') {
      finalString += "Please select category name.<br>";
    }
    if (this.buyerForm.value.title == "") {
      finalString += "Please enter title.<br>";
    }
    if (this.buyerForm.value.country == '') {
      finalString += "Please select country.<br>";
    }
    if (this.buyerForm.value.state == '') {
      finalString += "Please select state.<br>";
    }
    if (this.buyerForm.value.city == '') {
      finalString += "Please select city.<br>";
    }
    if (this.buyerForm.value.property_desciption == '') {
      finalString += "Please enter property description.<br>";
    }
    if (this.pdfFileUploadd.length != 0) {
      if (this.pdfFileUploadd[0].name.substring(this.pdfFileUploadd[0].name.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
        finalString += "Please select document in pdf format.<br>";
      }
    }
    if (this.files.length == 0) {
      finalString += "Please select property photos.<br>";
    }
    if (this.files.length != 0) {
      let types = /(\.|\/)(jpeg|mp4|jpg|png|webm|mov)$/i;
      for (let i = 0; i < this.files.length; i++) {
        if (types.test(this.files[i].type) || types.test(this.files[i].name)) {
          // alert("file is valid");
        }
        else {
          finalString += "Please select property photos/videos only images in jpg/jpeg/png & videos in mp4/mov/webm.<br>";
          break;
        }
      }
    }
    if (fieldsOfCheckedArray.length === 0) {
      finalString += "Please check on 1 checkbox to be make photo as a cover photo.";
    }


    // if ($('#category').val() == "" && $('#property_desciption').val() == '' && this.files.length == 0) {

    //   $('#fileDropRef').focus();
    //   $('#property_desciption').focus();
    //   $('#category').focus();
    //   $(".BuyerDanger").html("Please select category name.<br>Please enter property desciption.<br>Please select property photos.");
    //   $('.BuyerDanger').show();
    // }
    // else if ($('#category').val() == "" && $('#property_desciption').val() == '') {
    //   $('#property_desciption').focus();
    //   $('#category').focus();
    //   $(".BuyerDanger").html("Please select category name.<br>Please enter property desciption.");
    //   $('.BuyerDanger').show();
    // }
    // else if ($('#category').val() == "" && this.files.length == 0) {
    //   $('#fileDropRef').focus();
    //   $('#category').focus();
    //   $(".BuyerDanger").html("Please select category name.<br>Please select property photos.");
    //   $('.BuyerDanger').show();
    // }
    // else if ($('#category').val() == "") {
    //   $('#category').focus();
    //   $(".BuyerDanger").html("Please select category name.");
    //   $('.BuyerDanger').show();
    // }
    // else  if ($('#property_desciption').val() == '' && this.files.length == 0) {
    //   $('#fileDropRef').focus();
    //   $('#property_desciption').focus();
    //   $(".BuyerDanger").html("Please enter property desciption.<br>Please select property photos.");
    //   $('.BuyerDanger').show();
    // }
    // else if ($('#property_desciption').val() == '') {
    //   $('#property_desciption').focus();
    //   $(".BuyerDanger").html("Please enter property desciption.");
    //   $('.BuyerDanger').show();
    // }
    // else if (this.files.length == 0) {
    //   $('#fileDropRef').focus();
    //   $(".BuyerDanger").html("Please select property photos.");
    //   $('.BuyerDanger').show();
    // }


    ////console.log("alertHtml", finalString);
    $(".BuyerDanger").html(finalString);
    $('.BuyerDanger').show();
    $('.property_head').focus();
    if (finalString == "") {
      this.loading = true;
      $('#loader').show();
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
      // for check status
      let cid1 = document.getElementById("status-public")['checked'];
      let cid2 = document.getElementById("status-cohorts")['checked'];
      let cid3 = document.getElementById("status-private")['checked'];
      let checkStatus = "";
      if (cid1 === true) {
        checkStatus = "Public";
      }
      if (cid2 === true) {
        checkStatus = "Cohorts";
      }
      if (cid3 === true) {
        checkStatus = "Private";
      }
      //console.log("checkstatus value", checkStatus)
      formData.append("category", this.buyerForm.value.category);
      formData.append("title", this.buyerForm.value.title);
      formData.append("country", this.buyerForm.value.country);
      formData.append("state", this.buyerForm.value.state);
      formData.append("city", this.buyerForm.value.city);
      formData.append("property_desciption", this.buyerForm.value.property_desciption);
      formData.append("url_property", this.buyerForm.value.url_property);
      formData.append("showPostToUser", checkStatus);
      if (this.pdfFileUploadd.length != 0) {
        formData.append("pdfFile", this.pdfFileUploadd[0]);
      }
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      // for cover photo

      for (var i = 0; i < this.files.length; i++) {
        if (fieldsOfCheckedArray[0].value == i) {
          formData.append("is_cover_photo", this.files[i].name);
        }
      }
      // ***********************************************
      // $('.BuyerDanger').hide();
      // let formData = new FormData();
      // formData.append("category",$('#category').val());
      // formData.append("property_desciption",this.buyerForm.value.property_desciption);
      // formData.append("url_property",this.buyerForm.value.url_property);
      // for (var i = 0; i < this.files.length; i++) {
      //   formData.append("all_images", this.files[i], this.files[i].name);
      // }

      ////console.log("form register val : ", formData);
      this.UserService.setIAmBuyer(formData).subscribe(result => {
        this.loading = false;
        ////console.log("result : ", result);
        if (result['success'] == true) {
          $(".BuyerSuccess").html(result['message']);
          $('.BuyerSuccess').show();
          $('.BuyerDanger').hide();
          $('.property_head').focus();
          if (userLocalId != null) {
            $(location).attr('href', '/category-by-name/' + this.buyerForm.value.category);
          } else {
            localStorage.setItem('peropertyId', JSON.stringify(result['id']));
            $(location).attr('href', '/register');
          }
        }
        else if (result['success'] == false) {
          $(".BuyerDanger").html(result['message']);
          $('.BuyerDanger').show();
          $('.BuyerSuccess').hide();
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