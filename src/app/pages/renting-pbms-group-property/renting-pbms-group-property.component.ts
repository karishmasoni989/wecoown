import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { CalendarOptions } from '@fullcalendar/angular';
// import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-renting-pbms-group-property',
  templateUrl: './renting-pbms-group-property.component.html',
  styleUrls: ['./renting-pbms-group-property.component.css']
})
export class RentingPbmsGroupPropertyComponent implements OnInit {
  loading = false;
  createRentingPropertyForm: FormGroup;
  datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo"};
  baseURLofAPi: string;
  enddateMebershipPre: any;
  startdateMebershipPre: any;
  memberShipTypePre: string;
  users = [
    { id: 'anjmao', name: 'Anjmao' },
    { id: 'varnas', name: 'Tadeus Varnas' }
  ];
  selectedUserIds: String[];
  getAllMembersdata: any;
  getCurrentUser: any;
  getBookedPostDD: any;
  parseData: any;
  purpose: any;
  bookPropertyTitle: any;
  getRentingPropertyDataById: any;
  todayDate: any;
  getAllReuestForBookedProperty: any;
  options: any;
  AllBookingDates: { title: string; start: string; end: string; }[];
  cancelBookingId: any;
  resultStatus: number;
  uploadAgreementFile: any;
  constructor(
    private UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  // };

  ionViewWillEnter() {
    this.startOfPage();
  }
  ngOnInit(){
    this.startOfPage();
  }
  startOfPage() {
    // let getCurrentDateTime = new Date();
    // let dates      =  getCurrentDateTime.getDate();
    // let month      =  (getCurrentDateTime.getMonth() + 1).toString();
    // let year       =  getCurrentDateTime.getFullYear();
    // let hours      = getCurrentDateTime.getHours(); 
    // let minutes    = getCurrentDateTime.getMinutes(); 
    // let newformat  = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12;  
    // To display "0" as "12" 
    // hours = hours ? hours : 12;  
    // minutes = minutes < 10 ? '0' + minutes : minutes; 
    // month + '/' + dates + '/' + year + ' ' +hours + ':' + minutes + ' ' + newformat;  
    // datePickerId.max = new Date().toISOString().split("T")[0];
    let getGroupIdParse = localStorage.getItem("SetBookData");
    let getGroupId = JSON.parse(getGroupIdParse);
    this.bookPropertyTitle = getGroupId['title'];
    this.baseURLofAPi = environment.baseUrl;
    let userLocalId = localStorage.getItem('userInfo');
    this.parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.getCurrentUser = this.parseData['id']
    }
    this.checkAlreadymembership(this.parseData['id']);
    this.createRentingPropertyForm = new FormGroup({
      pbms_group_id: new FormControl(''),
      reference_user_id: new FormControl(''),
      deposit_recevied_from: new FormControl(''),
      amount: new FormControl(''),
      current_address: new FormControl(''),
      property_located_at: new FormControl(''),
      rent_amount: new FormControl(''),
      first_month_rent_before_date: new FormControl(''),
      property_available_move_date: new FormControl(''),
      landlord_responsible_for: new FormControl(''),
      broker_amount_pay_by: new FormControl(''),
      broker_amount: new FormControl(''),
      broker_name: new FormControl(''),
      landlord_name: new FormControl(''),
      tenant_name: new FormControl(''),
      broker_sign: new FormControl(''),
      landlord_sign: new FormControl(''),
      tenant_sign: new FormControl(''),
      broker_date: new FormControl(''),
      landlord_date: new FormControl(''),
      tenant_date: new FormControl(''),
      security_deposit: new FormControl(''),
      rental_period: new FormControl(''),
      late_fee: new FormControl('')
    });
    this.getAllRentedDataByProperty(getGroupId['id']);
    // for full calender
    this.options = {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      theme: 'Sandstone',
      lazyFetching: true,
      timeZone: 'local',
      locale: 'es',
      // add other plugins
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin]
    };
    // let month = (getDate.getMonth() + 1).toString();
    // let day = (getDate.getDate()).toString();
    // let year = getDate.getFullYear();
    // if (Number(month) < 10) { month = '0' + month.toString(); }
    // if (Number(day) < 10) { day = '0' + day.toString(); }
    // let maxDate = year + '-' + month + '-' + day;
    // alert(maxDate);
    // for show start end date selected
    let getDate = new Date();
    let getDateOnly = new Date().toISOString().split("T")[0];
    // for hours set start padd
    let getCourrentHour = (getDate.getHours()).toString();
    if (Number(getCourrentHour) < 10) {
      getCourrentHour = '0' + getCourrentHour;
    }
    // for hours set start padd
    let getCourrentMinutes = (getDate.getMinutes()).toString();
    if (Number(getCourrentMinutes) < 10) {
      getCourrentMinutes = '0' + getCourrentMinutes;
    }
    this.todayDate = getDateOnly + 'T' + getCourrentHour + ':' + getCourrentMinutes;
    // alert(this.todayDate)
    $('#start_date').attr('min', this.todayDate);
    $('#end_date').attr('min', this.todayDate);
    // this.todayDate = getDate.getFullYear() + '-' + (getDate.getMonth() + 1) + '-' + getDate.getDate() + 'T' + getDate.getHours() + ':' + getDate.getMinutes();
    // for choose only one checkbox in rental period
    $('input.rental_period_checkbox').bind('click', function () {
      if ($(this).prop('checked') === false) {
        $(this).prop('checked', true);
      }
      $('input.rental_period_checkbox').not(this).prop("checked", false);
    });
    // $('input.rental_period_checkbox').bind('click', function () {
    //   console.log("this : ",this);
    //   console.log("this ttttt: ",this.id);
    //   console.log("this : ",typeof(this));
      
    //   if ($(this).prop('checked') === false) {
    //     // $(this).prop('checked', true);
    //     $(this.id).attr("checked", 'checked');
    //   }
    //   // $("#"+item).removeAttr("checked");
    //   $('input.rental_period_checkbox').not(this.id).removeAttr("checked");
    // });
  }
  // for upload photos
  onUploadAgrrementFile(event) {
    ////console.log("araay filessss : ", event);
    this.uploadAgreementFile = event;
  }
  checkAlreadymembership(item: any) {
    this.loading = true;
    let dataFormm = {
      user_id: item
    }
    this.UserService.checkUserMembership(dataFormm).subscribe(result => {
      this.loading = false;
      //console.log("result of add membership: ", result);
      if (result['success'] == true) {
        if (result['getdata']) {
          this.startdateMebershipPre = result['getdata'].membership_start_date;
          this.enddateMebershipPre = result['getdata'].membership_end_date;
          $('.alreadymembership').show();
          $('.notAlreadymembership').hide();
        }
      }
      else if (result['success'] == false) {
        $('.alreadymembership').hide();
        $('.notAlreadymembership').show();
      }
    });
  }
  getAllRentedDataByProperty(id) {
    let sendData = {
      pbms_group_id: id,
      user_id: this.getCurrentUser
    }
    this.UserService.getOneRentingPbmsPropertyById(sendData).subscribe(result => {
      this.loading = false;
      //console.log("result of add getData: ", result);
      if (result['success'] == true) {
        this.getRentingPropertyDataById = result['getData'];
        // //console.log("getAllReuestForBookedProperty :", this.getAllReuestForBookedProperty);

        let arrayOfbookedEvent = [];
        this.getRentingPropertyDataById.forEach(element => {
          // let SplitStartdate = element.start_date.split('.');
          // let SplitEnddate = element.end_date.split('.');
          // arrayOfbookedEvent.push({
          //   title: element.purpose,
          //   start: SplitStartdate[0],
          //   // start: element.start_date,
          //   end: SplitEnddate[0],
          //   color: "orange",
          //   textColor: "white",
          // })
        });
        this.AllBookingDates = arrayOfbookedEvent;
        // this.calendarOptions = {
        //   initialView: 'dayGridMonth',
        //   events: arrayOfbookedEvent,
        // };
        this.options = {
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          theme: 'Sandstone',
          lazyFetching: true,
          timeZone: 'local',
          locale: 'es',
          // add other plugins
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin]
        };
      }
    })
  }
  submitRentingPropertyForm() {
    var docDefinition = {
      content: [{
					text: 'H D Wire (P) Ltd.',
					style: 'subheader'
      }]
    }
    let rental_pdf= pdfMake.createPdf(docDefinition);
    //console.log("rental pdf :",rental_pdf);
    let finalString = "";
    let getTodayDate = new Date();
    if (this.createRentingPropertyForm.value.deposit_recevied_from.trim() == "") {
      finalString += "Please enter deposit recevied from.<br>";
    }
    if (this.createRentingPropertyForm.value.amount.trim() == "") {
      finalString += "Please enter amount.<br>";
    }
    if (this.createRentingPropertyForm.value.current_address.trim() == "") {
      finalString += "Please enter current address.<br>";
    }
    if (this.createRentingPropertyForm.value.property_located_at.trim() == "") {
      finalString += "Please enter property located at.<br>";
    }
    if (this.createRentingPropertyForm.value.rent_amount.trim() == "") {
      finalString += "Please enter rent amount.<br>";
    }
    // rental_period
    if ($('.rental_period_checkbox').is(':checked') === false) {
      finalString += "Please check on checkbox of rental period.<br>";
    }
    if (this.createRentingPropertyForm.value.late_fee.trim() == "") {
      finalString += "Please enter late fee.<br>";
    }
    if (this.createRentingPropertyForm.value.first_month_rent_before_date.trim() == "") {
      finalString += "Please select first month rent balance to be paid on or before date.<br>";
    }
    if (this.createRentingPropertyForm.value.security_deposit.trim() == "") {
      finalString += "Please enter security deposit.<br>";
    }
    if (this.createRentingPropertyForm.value.property_available_move_date.trim() == "") {
      finalString += "Please select property will be made available date.<br>";
    }
    // landlord_responsible_for
    if ($('.landlord-responsible-checkboxes').is(':checked') === false) {
      finalString += "Please check on checkbox of landlord is responsible for.<br>";
    }
    // if (this.createRentingPropertyForm.value.broker_amount_pay_by == "") {
    //   finalString += "Please enter booking notes.<br>";
    // }
    // if (this.createRentingPropertyForm.value.broker_amount == "") {
    //   finalString += "Please enter booking notes.<br>";
    // }

    // if (this.createRentingPropertyForm.value.landlord_name == "") {
    //   finalString += "Please enter booking notes.<br>";
    // }
    // if (this.createRentingPropertyForm.value.tenant_name == "") {
    //   finalString += "Please enter booking notes.<br>";
    // }
    // for checking start and end date
    // let getStartDate = Date.parse(this.createRentingPropertyForm.value.start_date);
    // let getEndDate = Date.parse(this.createRentingPropertyForm.value.end_date);
    // if (getStartDate >= getEndDate) {
    //   finalString += "Please select valid start or end date & time.<br>";
    // }
    let getGroupIdParse = localStorage.getItem("SetBookData");
    let getGroupId = JSON.parse(getGroupIdParse);
    this.createRentingPropertyForm.value.pbms_group_id = getGroupId['id'];
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    this.createRentingPropertyForm.value.user_id = parseData['id'];
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();    
    if (finalString === "") {
      // for rental responsible checkbox
      let day_rental_period = document.getElementById("rental_period_number_of_days")['checked'];
      let month_rental_period = document.getElementById("rental_period_month")['checked'];
      let year_rental_period = document.getElementById("rental_period_year")['checked'];
      let landlord_checked_array = [];
      if (day_rental_period == true) {
        this.createRentingPropertyForm.value.rental_period = "days";
      }else if(month_rental_period == true){
        this.createRentingPropertyForm.value.rental_period = "month";
      }else if(year_rental_period == true){
        this.createRentingPropertyForm.value.rental_period = "year";
      }
      $('.bookdanger').hide();
      this.loading = true;
      if (userLocalId != null) {
        // check for user is admin of property or not
        let getBookData = localStorage.getItem("SetBookData");
        let getParseBookData = JSON.parse(getBookData);
        this.createRentingPropertyForm.value.reference_user_id = parseData['id'];
        //console.log("all form data : ", this.createRentingPropertyForm.value);

        // let formData = new FormData();
        // formData.append("purpose", this.createRentingPropertyForm.value.purpose);
        // formData.append("pbms_group_id", this.createRentingPropertyForm.value.pbms_group_id);
        // formData.append("reference_user_id", parseData['id']);

        // formData.append("deposit_recevied_from", this.createRentingPropertyForm.value.deposit_recevied_from);
        // formData.append("amount", this.createRentingPropertyForm.value.amount);
        // formData.append("current_address", this.createRentingPropertyForm.value.current_address);
        // formData.append("property_located_at", this.createRentingPropertyForm.value.property_located_at);
        // formData.append("rent_amount", this.createRentingPropertyForm.value.rent_amount);
        // formData.append("first_month_rent_before_date", this.createRentingPropertyForm.value.first_month_rent_before_date);
        // formData.append("property_available_move_date", this.createRentingPropertyForm.value.property_available_move_date);
        // formData.append("landlord_responsible_for", this.createRentingPropertyForm.value.landlord_responsible_for);
        // formData.append("end_date", this.createRentingPropertyForm.value.end_date);
        // formData.append("late_fee", this.createRentingPropertyForm.value.late_fee);
        // formData.append("security_amount", this.createRentingPropertyForm.value.security_amount);
        // formData.append("rental_period", this.createRentingPropertyForm.value.rental_period); 

        // if(this.uploadAgreementFile != undefined){
        //   formData.append("all_images", this.uploadAgreementFile);
        // }
        let gas_landlord = document.getElementById("gas_landlord")['checked'];
        let electricity_landlord = document.getElementById("electricity_landlord")['checked'];
        let cable_landlord = document.getElementById("cable_landlord")['checked'];
        let water_landlord = document.getElementById("water_landlord")['checked'];
        let lawn_landlord = document.getElementById("lawn_landlord")['checked'];
        let snow_landlord = document.getElementById("snow_landlord")['checked'];
        let internet_landlord = document.getElementById("internet_landlord")['checked'];
        let heat_landlord = document.getElementById("heat_landlord")['checked'];
        let landlord_checked_array = [];
        if (gas_landlord == true) {
          landlord_checked_array.push('gas_landlord');
        }
        if (electricity_landlord == true) {
          landlord_checked_array.push('electricity_landlord');
        }
        if (cable_landlord == true) {
          landlord_checked_array.push('cable_landlord');
        }
        if (water_landlord == true) {
          landlord_checked_array.push('water_landlord');
        }
        if (lawn_landlord == true) {
          landlord_checked_array.push('lawn_landlord');
        }
        if (snow_landlord == true) {
          landlord_checked_array.push('snow_landlord');
        }
        if (internet_landlord == true) {
          landlord_checked_array.push('internet_landlord');
        }
        if (heat_landlord == true) {
          landlord_checked_array.push('heat_landlord');
        }
        this.createRentingPropertyForm.value.landlord_responsible_for = landlord_checked_array;
        // if (!this.createRentingPropertyForm.value.pbms_group_id || !this.createRentingPropertyForm.value.reference_user_id || !this.createRentingPropertyForm.value.deposit_recevied_from || !this.createRentingPropertyForm.value.amount || !this.createRentingPropertyForm.value.current_address || !this.createRentingPropertyForm.value.property_located_at || !this.createRentingPropertyForm.value.rent_amount || !this.createRentingPropertyForm.value.first_month_rent_before_date || !this.createRentingPropertyForm.value.property_available_move_date || !this.createRentingPropertyForm.value.landlord_responsible_for || !this.createRentingPropertyForm.value.broker_amount_pay_by) {

        // } else {

        // }

        this.UserService.createRentingPbmsProperty(this.createRentingPropertyForm.value).subscribe(result => {
          this.loading = false;
          //console.log("result of create book pbms group: ", result);
          if (result['success'] == true) {
            $(".booksuccess").html(result['message']);
            $('.booksuccess').show();
            $('.bookdanger').hide();
            location.reload();
          }
          else if (result['success'] == false) {
            $(".bookdanger").html(result['message']);
            $('.bookdanger').show();
            $('.booksuccess').hide();
          }
        });
      }
    }
  }
  setResponseOfMemberBookPropertyReq(booki_id, item) {
    this.loading = true;
    let statusOfBookProperty = '';
    if (item === 'accept') {
      statusOfBookProperty = 'Active'
    } else {
      statusOfBookProperty = 'Reject'
    }
    let dataform = {
      book_property_event_id: booki_id,
      status: statusOfBookProperty
    }
    this.UserService.updateStatusbookPbmsPropertyById(dataform).subscribe(result => {
      this.loading = false;
      //console.log("result of create book pbms group: ", result);
      if (result['success'] == true) {
        $(".booksuccess").html(result['message']);
        $('.booksuccess').show();
        $('.bookdanger').hide();
        location.reload();
      }
      else if (result['success'] == false) {
        $(".bookdanger").html(result['message']);
        $('.bookdanger').show();
        $('.booksuccess').hide();
      }
    });
  }
  // sendBookReq() {
  //   this.loading = true;
  //   let sendData = {
  //     post_id: this.getBookedPostDD.post_id,
  //     sender_id: this.getCurrentUser,
  //     recevier_id: this.getBookedPostDD.user_id
  //   }
  //   this.UserService.sendRequestForBookPost(sendData).subscribe(result => {
  //     this.loading = false;
  //     //console.log("result of add invitation: ", result);
  //     if (result['success'] == true) {
  //       $(".bookReqSuccess").html(result['message']);
  //       $('.bookReqSuccess').show();
  //       $('.bookReqDanger').hide();
  //     }
  //     else if (result['success'] == false) {
  //       $(".bookReqDanger").html(result['message']);
  //       $('.bookReqDanger').show();
  //       $('.bookReqSuccess').hide();
  //     }
  //   })
  // }
  SaveCancelBookingId(book_id) {
    this.cancelBookingId = book_id;
  }
  confirmCancelBooking() {
    this.loading = true;
    let dataForForm = {
      book_property_event_id: this.cancelBookingId,
      status: 'Inactive'
    }
    this.UserService.updateStatusbookPbmsPropertyById(dataForForm).subscribe(result => {
      this.loading = false;
      //console.log("result of create book pbms group: ", result);
      if (result['success'] == true) {
        $(".cancelBookSuccess").html('Your booking has been canceled successfully.');
        $('.cancelBookSuccess').show();
        $('.cancelBookdanger').hide();
        location.reload();
      }
      else if (result['success'] == false) {
        $(".cancelBookdanger").html(result['message']);
        $('.cancelBookdanger').show();
        $('.cancelBookSuccess').hide();
      }
    });
  }
  checkStartDate(start_date) {
    let getStartTime = new Date(start_date);
    let getTodayTime = new Date();
    if (getStartTime > getTodayTime) {
      return true;
    } else {
      return false;
    }
  }
  updateRentingProperty(id){
    localStorage.setItem('rentingPropertyUpdateId',JSON.stringify(id));
    localStorage.setItem('bookPropertyTitle',JSON.stringify(this.bookPropertyTitle));    
    this.router.navigate(['/update-rent-pbms-property']);  
  }
  checkboxClassAdd(item){
    let getCheckboxAttribute = $("#"+item).attr("checked");
    if (getCheckboxAttribute == undefined) {      
      $("#"+item).attr("checked", 'checked');
    } else{
      $("#"+item).removeAttr("checked");
    }
  }
}