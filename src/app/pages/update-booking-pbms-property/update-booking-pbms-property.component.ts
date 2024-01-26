import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-update-booking-pbms-property',
  templateUrl: './update-booking-pbms-property.component.html',
  styleUrls: ['./update-booking-pbms-property.component.css']
})
export class UpdateBookingPbmsPropertyComponent implements OnInit {
  momentjs: any = moment;
  loading = false;
  createBookPropertyForm: FormGroup;
  book_property_title: any;
  noDataFound: string;
  user_id: any;
  purpose: any;
  pbms_group_id: any;
  start_date: any;
  end_date: any;
  number_of_persons: any;
  booking_notes: any;
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
  ngOnInit() {
    this.startOfPage();
  }
  startOfPage() {
    let getRentIdParse = localStorage.getItem("BookingPropertyUpdateId");
    let getrentingParseId = JSON.parse(getRentIdParse);
    let rent_title = localStorage.getItem('bookPropertyTitle');
    this.book_property_title = JSON.parse(rent_title);
    if (getRentIdParse != null) {
      this.getOneRentingPropertyData(getrentingParseId)
    }
    this.createBookPropertyForm = new FormGroup({
      pbms_group_id: new FormControl(''),
      purpose: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      number_of_persons: new FormControl(''),
      booking_notes: new FormControl(''),
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
    $('#start_date').attr('min-date', moment().format('MM/DD/YYYY HH:mm'));
    $('#end_date').attr('min-date', moment().format('MM/DD/YYYY HH:mm'));
  }
  getOneRentingPropertyData(getrentingParseId: any) {
    // this.loading = true;
    let dataForForm = {
      id: getrentingParseId
    }
    this.UserService.getOnlyOneBookingPropertyData(dataForForm).subscribe(result => {
      // this.loading = false;
      //console.log("result rent data by id :", result);

      if (result['success'] == true) {
        let getRentingOneData = result['getData'];
        this.user_id = getRentingOneData.user_id;
        this.purpose = getRentingOneData.purpose;
        this.pbms_group_id = getRentingOneData.pbms_group_id;
        this.start_date = getRentingOneData.start_date;
        this.end_date = getRentingOneData.end_date;
        this.previous_start_date = getRentingOneData.start_date;
        this.previous_end_date = getRentingOneData.end_date;
        // start date conversion
        // let isoStartDate = getRentingOneData.start_date;       
        // let splitDot = isoStartDate.split('.');
        // let getSplitBYColon = splitDot[0].split(':');
        // this.start_date = getSplitBYColon[0]+':'+getSplitBYColon[1];
        // // end date conversion
        // let isoEndDate = getRentingOneData.end_date;       
        // let splitDotEnd = isoEndDate.split('.');
        // let getSplitBYColonEnd = splitDotEnd[0].split(':');
        // this.end_date = getSplitBYColonEnd[0]+':'+getSplitBYColonEnd[1];
        this.number_of_persons = getRentingOneData.number_of_persons;
        this.booking_notes = getRentingOneData.booking_notes;
      } else {
        this.noDataFound = "No data found"
      }
    });
  }
  submitBookPropertyForm() {
    let finalString = "";
    let getTodayDate = new Date();
    if (this.createBookPropertyForm.value.purpose == "") {
      finalString += "Please enter purpose.<br>";
    }
    if (this.createBookPropertyForm.value.start_date == "") {
      finalString += "Please select start date & time.<br>";
    }
    if (this.start_date != this.previous_start_date) {
      if (moment() > moment(this.createBookPropertyForm.value.start_date)) {
        finalString += "Please select valid start date & time.<br>";
      }
    }
    if (this.createBookPropertyForm.value.end_date == "") {
      finalString += "Please select end date & time.<br>";
    }
    if (this.end_date != this.previous_end_date) {
      if (moment() > moment(this.createBookPropertyForm.value.end_date)) {
        finalString += "Please select valid end date & time.<br>";
      }
    }
    if (this.createBookPropertyForm.value.booking_notes == "") {
      finalString += "Please enter booking notes.<br>";
    }
    // for checking start and end date
    let getStartDate = Date.parse(this.createBookPropertyForm.value.start_date);
    let getEndDate = Date.parse(this.createBookPropertyForm.value.end_date);
    if (getStartDate >= getEndDate) {
      finalString += "Please select valid start or end date & time.<br>";
    }

    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger').hide();
      this.loading = true;
      if (userLocalId != null) {
        let getRentIdParse = localStorage.getItem("BookingPropertyUpdateId");
        let getrentingParseId = JSON.parse(getRentIdParse);
        let getGroupIdParse = localStorage.getItem("SetBookData");
        let getGroupId = JSON.parse(getGroupIdParse);
        this.createBookPropertyForm.value.pbms_group_id = getGroupId['id'];
        //console.log("all form data : ", this.createBookPropertyForm.value);
        this.UserService.updateBookingPbmsPropertyById(getrentingParseId, this.createBookPropertyForm.value).subscribe(result => {
          this.loading = false;
          //console.log("result of create book pbms group: ", result);
          if (result['success'] == true) {
            $(".booksuccess").html(result['message']);
            $('.booksuccess').show();
            $('.bookdanger').hide();
            setTimeout(() => {
              this.router.navigate(['/book-pbms-property']);
            }, 1000)
            // location.reload();
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

