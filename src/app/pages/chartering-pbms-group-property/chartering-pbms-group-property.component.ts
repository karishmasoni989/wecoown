import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { CalendarOptions } from '@fullcalendar/angular';
// import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import * as moment from 'moment';

@Component({
  selector: 'app-chartering-pbms-group-property',
  templateUrl: './chartering-pbms-group-property.component.html',
  styleUrls: ['./chartering-pbms-group-property.component.css']
})
export class CharteringPbmsGroupPropertyComponent implements OnInit {
  loading = false;
  createCharteringPropertyForm: FormGroup;
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
  getBookedPropertyDataById: any;
  todayDate: any;
  getAllReuestForBookedProperty: any;
  options: any;
  AllBookingDates: { title: string; start: string; end: string; }[];
  cancelCharteringId: any;
  resultStatus: number;
  datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo", min: '' };
  datetimePickerConfig = { format: "MM/DD/YYYY hh:mm A", firstDayOfWeek: "mo", min: '' };
  // settings = {
  //   defaultOpen: false,
  //   bigBanner: false,
  //   timePicker: true,
  //   format: 'MM-dd-yyyy hh:mm a',
  // }
  constructor(
    private UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    document.addEventListener('click', this.clickHandlerDoc.bind(this)); // bind on doc
  }
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  // };
  clickHandlerDoc(event: any) {
    if (event.target.dataset.dismiss === "modal") {
      $('.ModalCloseClick')[0].reset();
      $('.alert').hide();
    }
  }
  ionViewWillEnter() {
    this.startOfPage();
  }
  ngOnInit() {
    this.startOfPage();
  }
  startOfPage() {
    // 2021-01-05T08:30
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
    this.createCharteringPropertyForm = new FormGroup({
      pbms_group_id: new FormControl(''),
      reference_user_id: new FormControl(''),
      full_Name: new FormControl(''),
      contact_name: new FormControl(''),
      address: new FormControl(''),
      work_tel: new FormControl(''),
      postcode: new FormControl(''),
      fax: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      vessel: new FormControl(''),
      type: new FormControl(''),
      loa: new FormControl(''),
      embarkation_point: new FormControl(''),
      disembarkation_point: new FormControl(''),
      cruising_limits: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      crew: new FormControl(''),
      vessel_fee: new FormControl(''),
      miscellaneous_amount: new FormControl(''),
      miscellaneous_reason: new FormControl(''),
      sub_total: new FormControl(''),
      tax: new FormControl(''),
      total_charter_fees: new FormControl(''),
      booking_deposit: new FormControl(''),
      booking_deposit_due_date: new FormControl(''),
      booking_deposit_paid: new FormControl(''),
      security_bond: new FormControl(''),
      security_bond_due_date: new FormControl(''),
      security_bond_paid: new FormControl(''),
      other_deposit: new FormControl(''),
      other_deposit_due_date: new FormControl(''),
      other_deposit_paid: new FormControl(''),
      total_deposit_received: new FormControl(''),
      balance_due: new FormControl(''),
    });
    this.getAllBookedDataByProperty(getGroupId['id']);
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
    this.datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo", min: moment().format('MM/DD/YYYY') };
    this.datetimePickerConfig = { format: "MM/DD/YYYY hh:mm A", firstDayOfWeek: "mo", min: moment().format('MM/DD/YYYY hh:mm A') };

    $('#start_date').attr('min-date', moment().format('MM/DD/YYYY HH:mm'));
    $('#end_date').attr('min-date', moment().format('MM/DD/YYYY HH:mm'));

    // $('#booking_deposit_due_date').attr('min', getDateOnly);
    // $('#security_bond_due_date').attr('min', getDateOnly);
    // $('#other_deposit_due_date').attr('min', getDateOnly);
    // this.todayDate = getDate.getFullYear() + '-' + (getDate.getMonth() + 1) + '-' + getDate.getDate() + 'T' + getDate.getHours() + ':' + getDate.getMinutes();
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
  getAllBookedDataByProperty(id) {
    let sendData = {
      pbms_group_id: id,
      user_id: this.getCurrentUser
    }
    this.UserService.getOneCharteringPbmsPropertyById(sendData).subscribe(result => {
      this.loading = false;
      //console.log("result of add getData: ", result);
      if (result['success'] == true) {
        this.getBookedPropertyDataById = result['getData'];
        this.getAllReuestForBookedProperty = result['getRequestForProperty'];
        //console.log("getAllReuestForBookedProperty :", this.getAllReuestForBookedProperty);

        let arrayOfbookedEvent = [];
        this.getBookedPropertyDataById.forEach(element => {
          let SplitStartdate = element.start_date.split('.');
          let SplitEnddate = element.end_date.split('.');
          arrayOfbookedEvent.push({
            title: element.purpose,
            start: SplitStartdate[0],
            // start: element.start_date,
            end: SplitEnddate[0],
            color: "orange",
            textColor: "white",
          })
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
  submitCharteringPropertyForm() {
    let finalString = "";
    let getTodayDate = new Date();
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let emailVal = this.createCharteringPropertyForm.value.email;
    if (this.createCharteringPropertyForm.value.full_Name == "") {
      finalString += "Please enter full name.<br>";
    }
    if (this.createCharteringPropertyForm.value.address == "") {
      finalString += "Please enter address.<br>";
    }
    if (this.createCharteringPropertyForm.value.postcode == "") {
      finalString += "Please enter postcode.<br>";
    }
    if (this.createCharteringPropertyForm.value.email == "") {
      finalString += "Please enter email address.<br>";
    }
    if (this.createCharteringPropertyForm.value.email != '') {
      if (!regex.test(emailVal)) {
        finalString += "Please enter valid email address.<br>";
      }
    }
    if (this.createCharteringPropertyForm.value.mobile == "") {
      finalString += "Please enter mobile number.<br>";
    }
    if (this.createCharteringPropertyForm.value.mobile != "") {
      if (this.createCharteringPropertyForm.value.mobile.length != 10) {
        finalString += "Please enter valid mobile number. Mobile number should be of 10 digits.<br>";
      }
    }
    if (this.createCharteringPropertyForm.value.start_date == "") {
      finalString += "Please select start date & time.<br>";
    }
    if (moment() > moment(this.createCharteringPropertyForm.value.start_date)) {
      finalString += "Please select valid start date & time.<br>";
    } 
    if (this.createCharteringPropertyForm.value.end_date == "") {
      finalString += "Please select end date & time.<br>";
    }
    if (moment() > moment(this.createCharteringPropertyForm.value.end_date)) {
      finalString += "Please select valid end date & time.<br>";
    } 
    // for checking start and end date
    let getStartDate = Date.parse(this.createCharteringPropertyForm.value.start_date);
    let getEndDate = Date.parse(this.createCharteringPropertyForm.value.end_date);
    if (getStartDate >= getEndDate) {
      finalString += "Please select valid start or end date & time.<br>";
    }
    if (this.createCharteringPropertyForm.value.total_charter_fees == "") {
      finalString += "Please enter total charter fees.<br>";
    }
    let getGroupIdParse = localStorage.getItem("SetBookData");
    let getGroupId = JSON.parse(getGroupIdParse);
    this.createCharteringPropertyForm.value.pbms_group_id = getGroupId['id'];
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    this.createCharteringPropertyForm.value.reference_user_id = parseData['id'];
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger').hide();
      this.loading = true;
      if (userLocalId != null) {
        // check for user is admin of property or not
        let getBookData = localStorage.getItem("SetBookData");
        let getParseBookData = JSON.parse(getBookData);
        let getIsAdmin = getParseBookData['isAdmin'];
        // if (getIsAdmin === 'Yes') {
        //   this.createCharteringPropertyForm.value.request_to_admin = null;
        //   this.createCharteringPropertyForm.value.status = 'Active';
        // } else {
        //   let all_chat_ids = getParseBookData['allAdmin'].map(e => {
        //     return e.user_id
        //   })
        //   this.createCharteringPropertyForm.value.request_to_admin = all_chat_ids;
        //   this.createCharteringPropertyForm.value.status = 'Pending';
        // }
        //console.log("all form data : ", this.createCharteringPropertyForm.value);
        this.UserService.createCharteringPbmsProperty(this.createCharteringPropertyForm.value).subscribe(result => {
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
  SaveCancelCharteringId(book_id) {
    this.cancelCharteringId = book_id;
  }
  confirmCancelChartering() {
    this.loading = true;
    let dataForForm = {
      charted_property_id: this.cancelCharteringId,
      status: 'Inactive'
    }
    this.UserService.updateStatusCharteringPbmsPropertyById(dataForForm).subscribe(result => {
      this.loading = false;
      //console.log("result of create book pbms group: ", result);
      if (result['success'] == true) {
        $(".cancelBookSuccess").html('Your chartering has been canceled successfully.');
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
  updateCharteringProperty(id) {
    localStorage.setItem('CharteringPropertyUpdateId', JSON.stringify(id));
    localStorage.setItem('bookPropertyTitle', JSON.stringify(this.bookPropertyTitle));
    this.router.navigate(['/update-chartering-pbms-property']);
  }
}