import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-update-chartering-pbms-property',
  templateUrl: './update-chartering-pbms-property.component.html',
  styleUrls: ['./update-chartering-pbms-property.component.css']
})
export class UpdateCharteringPbmsPropertyComponent implements OnInit {
  loading = false;
  createCharteringPropertyForm: FormGroup;
  datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo", min: '' };
  book_property_title: any;
  noDataFound: string;
  full_Name: any;
  contact_name: any;
  address: any;
  work_tel: any;
  postcode: any;
  fax: any;
  email: any;
  mobile: any;
  vessel: any;
  type: any;
  loa: any;
  embarkation_point: any;
  disembarkation_point: any;
  cruising_limits: any;
  start_date: any;
  end_date: any;
  crew: any;
  vessel_fee: any;
  miscellaneous_amount: any;
  miscellaneous_reason: any;
  sub_total: any;
  tax: any;
  total_charter_fees: any;
  booking_deposit: any;
  booking_deposit_due_date: any;
  booking_deposit_paid: any;
  security_bond: any;
  security_bond_due_date: any;
  security_bond_paid: any;
  other_deposit: any;
  other_deposit_due_date: any;
  other_deposit_paid: any;
  total_deposit_received: any;
  balance_due: any;
  previous_start_date: any;
  previous_end_date: any;
  constructor(private UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  ionViewWillEnter() {
    this.startOfPage();
  }
  ngOnInit(){
    this.startOfPage();
  }
  startOfPage() {
    let getRentIdParse = localStorage.getItem("CharteringPropertyUpdateId");
    let getrentingParseId = JSON.parse(getRentIdParse);
    let rent_title = localStorage.getItem('bookPropertyTitle');
    this.book_property_title = JSON.parse(rent_title);
    if (getRentIdParse != null) {
      this.getOneCharteringPropertyData(getrentingParseId)
    }
    this.createCharteringPropertyForm = new FormGroup({
      pbms_group_id: new FormControl(''),
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
    let todayDate = getDateOnly + 'T' + getCourrentHour + ':' + getCourrentMinutes;
    // alert(this.todayDate)
    $('#start_date').attr('min-date',  moment().format('MM/DD/YYYY HH:mm'));
    $('#end_date').attr('min-date',  moment().format('MM/DD/YYYY HH:mm'));
    // $('#booking_deposit_due_date').attr('min', getDateOnly);
    // $('#security_bond_due_date').attr('min', getDateOnly);
    // $('#other_deposit_due_date').attr('min', getDateOnly);
  }
  getOneCharteringPropertyData(getrentingParseId: any) {
    // this.loading = true;
    let dataForForm = {
      id: getrentingParseId
    }
    this.UserService.getOnlyOneCharteringPropertyData(dataForForm).subscribe(result => {
      // this.loading = false;
      //console.log("result rent data by id :", result);

      if (result['success'] == true) {
        let getRentingOneData = result['getData'];
        this.full_Name = getRentingOneData.full_Name;
        this.contact_name = getRentingOneData.contact_name;
        this.address = getRentingOneData.address;
        this.work_tel = getRentingOneData.work_tel;
        this.postcode = getRentingOneData.postcode;
        this.fax = getRentingOneData.fax;
        this.email = getRentingOneData.email;
        this.mobile = getRentingOneData.mobile;
        this.vessel = getRentingOneData.vessel;
        this.type = getRentingOneData.type;
        this.loa = getRentingOneData.loa;
        this.embarkation_point = getRentingOneData.embarkation_point;
        this.disembarkation_point = getRentingOneData.disembarkation_point;
        this.cruising_limits = getRentingOneData.cruising_limits;
        this.start_date = getRentingOneData.start_date;
        this.end_date = getRentingOneData.end_date;
        this.previous_start_date = getRentingOneData.start_date;
        this.previous_end_date = getRentingOneData.end_date;
        // start date conversion
        // let isoStartDate = getRentingOneData.start_date;
        // let splitDot = isoStartDate.split('.');
        // let getSplitBYColon = splitDot[0].split(':');
        // this.start_date = getSplitBYColon[0] + ':' + getSplitBYColon[1];
        // end date conversion
        // let isoEndDate = getRentingOneData.end_date;
        // let splitDotEnd = isoEndDate.split('.');
        // let getSplitBYColonEnd = splitDotEnd[0].split(':');
        // this.end_date = getSplitBYColonEnd[0] + ':' + getSplitBYColonEnd[1];
        this.crew = getRentingOneData.crew;
        this.vessel_fee = getRentingOneData.vessel_fee;
        this.miscellaneous_amount = getRentingOneData.miscellaneous_amount;
        this.miscellaneous_reason = getRentingOneData.miscellaneous_reason;
        this.sub_total = getRentingOneData.sub_total;
        this.tax = getRentingOneData.tax;
        this.total_charter_fees = getRentingOneData.total_charter_fees;
        this.booking_deposit = getRentingOneData.booking_deposit;
        this.booking_deposit_due_date = getRentingOneData.booking_deposit_due_date;
        this.booking_deposit_paid = getRentingOneData.booking_deposit_paid;
        this.security_bond = getRentingOneData.security_bond;
        this.security_bond_due_date = getRentingOneData.security_bond_due_date;
        this.security_bond_paid = getRentingOneData.security_bond_paid;
        this.other_deposit = getRentingOneData.other_deposit;
        this.other_deposit_due_date = getRentingOneData.other_deposit_due_date;
        this.other_deposit_paid = getRentingOneData.other_deposit_paid;
        this.total_deposit_received = getRentingOneData.total_deposit_received;
        this.balance_due = getRentingOneData.balance_due;
      } else {
        this.noDataFound = "No data found"
      }
    });
  }
  // submitBookPropertyForm() {
  //   let finalString = "";
  //   let getTodayDate = new Date();
  //   if (this.createBookPropertyForm.value.purpose == "") {
  //     finalString += "Please enter purpose.<br>";
  //   }
  //   if (this.createBookPropertyForm.value.start_date == "") {
  //     finalString += "Please select start date & time.<br>";
  //   }
  //   if (this.createBookPropertyForm.value.end_date == "") {
  //     finalString += "Please select end date & time.<br>";
  //   }
  //   if (this.createBookPropertyForm.value.booking_notes == "") {
  //     finalString += "Please enter booking notes.<br>";
  //   }
  //   // for checking start and end date
  //   let getStartDate = Date.parse(this.createBookPropertyForm.value.start_date);
  //   let getEndDate = Date.parse(this.createBookPropertyForm.value.end_date);
  //   if (getStartDate >= getEndDate) {
  //     finalString += "Please select valid start or end date & time.<br>";
  //   }

  //   let userLocalId = localStorage.getItem('userInfo');
  //   let parseData = JSON.parse(userLocalId);
  //   $(".bookdanger").html(finalString);
  //   $('.bookdanger').show();
  //   $('.property_head').focus();
  //   if (finalString === "") {
  //     $('.bookdanger').hide();
  //     this.loading = true;
  //     if (userLocalId != null) {
  //       // check for user is admin of property or not
  //       let getBookData = localStorage.getItem("SetBookData");
  //       let getParseBookData = JSON.parse(getBookData);
  //       let getIsAdmin = getParseBookData['isAdmin'];

  //       let getRentIdParse = localStorage.getItem("CharteringPropertyUpdateId");
  //       let getrentingParseId = JSON.parse(getRentIdParse);
  //       //console.log("all form data : ", this.createBookPropertyForm.value);
  //       this.UserService.updateBookingPbmsPropertyById(getrentingParseId, this.createBookPropertyForm.value).subscribe(result => {
  //         this.loading = false;
  //         //console.log("result of create book pbms group: ", result);
  //         if (result['success'] == true) {
  //           $(".booksuccess").html(result['message']);
  //           $('.booksuccess').show();
  //           $('.bookdanger').hide();
  //           setTimeout(()=>{
  //             this.router.navigate(['/book-pbms-property']);
  //           }, 1000)
  //           // location.reload();
  //         }
  //         else if (result['success'] == false) {
  //           $(".bookdanger").html(result['message']);
  //           $('.bookdanger').show();
  //           $('.booksuccess').hide();
  //         }
  //       });
  //     }
  //   }
  // }
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
    if (this.start_date != this.previous_start_date) {
      if (moment() > moment(this.createCharteringPropertyForm.value.start_date)) {
        finalString += "Please select valid start date & time.<br>";
      }
    }
    if (this.createCharteringPropertyForm.value.end_date == "") {
      finalString += "Please select end date & time.<br>";
    }
    if (this.end_date != this.previous_end_date) {
      if (moment() > moment(this.createCharteringPropertyForm.value.end_date)) {
        finalString += "Please select valid end date & time.<br>";
      }
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
        let getGroupIdParse = localStorage.getItem("SetBookData");
        let getGroupId = JSON.parse(getGroupIdParse);
        this.createCharteringPropertyForm.value.pbms_group_id = getGroupId['id'];
        let getCharteringIdParse = localStorage.getItem("CharteringPropertyUpdateId");
        let getCharteringParseId = JSON.parse(getCharteringIdParse);
        //console.log("all form data : ", this.createCharteringPropertyForm.value);
        this.UserService.updateCharteringPbmsPropertyById(getCharteringParseId, this.createCharteringPropertyForm.value).subscribe(result => {
          this.loading = false;
          //console.log("result of create book pbms group: ", result);
          if (result['success'] == true) {
            $(".booksuccess").html(result['message']);
            $('.booksuccess').show();
            $('.bookdanger').hide();
            // location.reload();
            setTimeout(() => {
              this.router.navigate(['/chartering-pbms-property']);
            }, 1000)
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
}