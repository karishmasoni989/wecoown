import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-renting-pbms-group',
  templateUrl: './update-renting-pbms-group.component.html',
  styleUrls: ['./update-renting-pbms-group.component.css']
})
export class UpdateRentingPbmsGroupComponent implements OnInit {
  loading = false;
  createRentingPropertyForm: FormGroup;
  datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo"};
  noDataFound= "";
  deposit_recevied_from: any;
  amount: any;
  current_address: any;
  property_located_at: any;
  rent_amount: any;
  first_month_rent_before_date: any;
  property_available_move_date: any;
  landlord_responsible_for: any;
  broker_amount_pay_by: any;
  broker_amount: any;
  broker_name: any;
  landlord_name: any;
  tenant_name: any;
  broker_sign: any;
  landlord_sign: any;
  tenant_sign: any;
  broker_date: any;
  landlord_date: any;
  tenant_date: any;
  security_deposit: any;
  rental_period: any;
  late_fee: any;
  rent_property_title: any;
  constructor(private UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  ionViewWillEnter() {
    let getRentIdParse = localStorage.getItem("rentingPropertyUpdateId");
    let getrentingParseId = JSON.parse(getRentIdParse);
    let rent_title= localStorage.getItem('bookPropertyTitle');
    this.rent_property_title = JSON.parse(rent_title);
    if (getRentIdParse != null) {
      this.getOneRentingPropertyData(getrentingParseId)
    }
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
  }
  ngOnInit() {
    let getRentIdParse = localStorage.getItem("rentingPropertyUpdateId");
    let getrentingParseId = JSON.parse(getRentIdParse);
    let rent_title= localStorage.getItem('bookPropertyTitle');
    this.rent_property_title = JSON.parse(rent_title);
    if (getRentIdParse != null) {
      this.getOneRentingPropertyData(getrentingParseId)
    }
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
  }
  getOneRentingPropertyData(getrentingParseId: any) {
    // this.loading = true;
    let dataForForm = {
      id: getrentingParseId
    }
    this.UserService.getOnlyOneRentingPropertyData(dataForForm).subscribe(result => {
      // this.loading = false;
      //console.log("result rent data by id :",result);
      
      if (result['success'] == true) {
        let getRentingOneData = result['getData'];
        this.deposit_recevied_from = getRentingOneData.deposit_recevied_from;
        this.amount = getRentingOneData.amount;
        this.current_address = getRentingOneData.current_address;
        this.property_located_at = getRentingOneData.property_located_at;
        this.rent_amount = getRentingOneData.rent_amount;
        this.first_month_rent_before_date = getRentingOneData.first_month_rent_before_date;
        this.property_available_move_date = getRentingOneData.property_available_move_date;
        this.landlord_responsible_for = getRentingOneData.landlord_responsible_for;
        this.broker_amount_pay_by = getRentingOneData.broker_amount_pay_by;
        this.broker_amount = getRentingOneData.broker_amount;
        this.broker_name = getRentingOneData.broker_name;
        this.landlord_name = getRentingOneData.landlord_name;
        this.tenant_name = getRentingOneData.tenant_name;
        this.broker_sign = getRentingOneData.broker_sign;
        this.landlord_sign = getRentingOneData.landlord_sign;
        this.tenant_sign = getRentingOneData.tenant_sign;
        this.broker_date = getRentingOneData.broker_date;
        this.landlord_date = getRentingOneData.landlord_date;
        this.tenant_date = getRentingOneData.tenant_date;
        this.security_deposit = getRentingOneData.security_deposit;
        this.rental_period = getRentingOneData.rental_period;
        this.late_fee = getRentingOneData.late_fee;
        // for rental period checkbox
        if (this.rental_period == "days") {
          document.getElementById("rental_period_number_of_days")['checked'] = true;
        }else if(this.rental_period == "month"){
          document.getElementById("rental_period_month")['checked'] = true;
        }else if(this.rental_period == "year"){
          document.getElementById("rental_period_year")['checked'] = true;  
        }
        // for landlord responsible
        for (let landlord_loop = 0; landlord_loop < this.landlord_responsible_for.length; landlord_loop++) {
          if (this.landlord_responsible_for[landlord_loop] == "gas_landlord") {
            document.getElementById("gas_landlord")['checked'] = true;
          } else if (this.landlord_responsible_for[landlord_loop] == "electricity_landlord") {
            document.getElementById("electricity_landlord")['checked'] = true;
          } else if (this.landlord_responsible_for[landlord_loop] == "cable_landlord") {
            document.getElementById("cable_landlord")['checked'] = true;
          }else if (this.landlord_responsible_for[landlord_loop] == "water_landlord") {
            document.getElementById("water_landlord")['checked'] = true;
          }else if (this.landlord_responsible_for[landlord_loop] == "lawn_landlord") {
            document.getElementById("lawn_landlord")['checked'] = true;
          }else if (this.landlord_responsible_for[landlord_loop] == "snow_landlord") {
            document.getElementById("snow_landlord")['checked'] = true;
          }else if (this.landlord_responsible_for[landlord_loop] == "internet_landlord") {
            document.getElementById("internet_landlord")['checked'] = true;
          }else if (this.landlord_responsible_for[landlord_loop] == "heat_landlord") {
            document.getElementById("heat_landlord")['checked'] = true;
          }
        }
        // if (cid2 === true) {
        //   let checkedValue2 = $('#role_2').val();
        //   ////console.log(checkedValue2);
        //   this.checkedIDs.push(checkedValue2)
        // }
        // if (cid3 === true) {
        //   let checkedValue3 = $('#role_3').val();
        //   ////console.log(checkedValue3);
        //   this.checkedIDs.push(checkedValue3)
        // }
      }else{
        this.noDataFound = "No data found"
      }
    });
  }
  submitRentingPropertyForm() {
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
    // for checking start and end date
    let getGroupIdParse = localStorage.getItem("SetBookData");
    let getGroupId = JSON.parse(getGroupIdParse);
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();    
    if (finalString === "") {
      this.loading = true;
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
      if (userLocalId != null) {
        // check for user is admin of property or not
        let getBookData = localStorage.getItem("SetBookData");
        let getParseBookData = JSON.parse(getBookData);
        //console.log("all form data : ", this.createRentingPropertyForm.value);
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
        //console.log("habsfcn sdf : ",this.createRentingPropertyForm.value);        
        let getRentIdParse = localStorage.getItem("rentingPropertyUpdateId");
        let getrentingParseId = JSON.parse(getRentIdParse);
        this.UserService.updateRentingPbmsPropertyById(getrentingParseId,this.createRentingPropertyForm.value).subscribe(result => {
          this.loading = false;
          //console.log("result of create book pbms group: ", result);
          if (result['success'] == true) {
            $(".booksuccess").html(result['message']);
            $('.booksuccess').show();
            $('.bookdanger').hide();
            setTimeout(()=>{
              this.router.navigate(['/rent-pbms-property']);
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
  checkboxClassAdd(item){
    let getCheckboxAttribute = $("#"+item).attr("checked");
    if (getCheckboxAttribute == undefined) {      
      $("#"+item).attr("checked", 'checked');
    } else{
      $("#"+item).removeAttr("checked");
    }
  }
}
