import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../../app.component';
import * as $ from 'jquery';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../service/country-state-city.service';
// import { userInfo } from 'os';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  editUserForm: FormGroup;
  changePsswordForm: FormGroup;
  addEditForm: FormGroup;
  selectedItemsList = [];
  checkedIDs = [];
  UserData: any;
  PreUserData: any;
  userId: String;
  username: any;
  firstname: any;
  lastname: any;
  designation: any;
  email: any;
  uploadPhotosfiles: any;
  profilePhoto: any;
  coverPhoto: any;
  bio: any;
  getProfileImage: any;
  getCoverImage: any;
  profilePhotoName: any;
  coverPhotoName: any;
  getCheckPublicProfile: any;
  company_name: any;
  company_email: any;
  company_address: any;
  vendor: any;
  VendorArray: any[] = [];
  modalVendorId: any;
  modalVendorValue: any;
  modalVendorName: any;
  vender1: any = [];
  vender2: any = [];
  vender3: any = [];
  vender4: any = [];
  vender5: any = [];
  vender6: any = [];
  vender7: any = [];
  vender8: any = [];
  vender9: any = [];
  vender10: any = [];
  vender11: any = [];
  vender12: any = [];
  vender13: any = [];
  vender14: any = [];
  vender15: any = [];
  vender16: any = [];
  vender17: any = [];
  vender18: any = [];
  vender19: any = [];
  vender20: any = [];
  vender21: any = [];
  vender22: any = [];
  vender23: any = [];
  vender24: any = [];
  vender25: any = [];
  Vendor_company_name: any;
  Vendor_company_email: any;
  Vendor_company_website: any;
  Vendor_company_address: any;
  deleteVendorName: any;
  getAllCountry: Object;
  getAllStates: Object;
  getAllCities: Object;
  getcountry: any;
  getstate: any;
  getcity: any;
 
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private AppComponent: AppComponent,
    public CountryStateCityService: CountryStateCityService,
  ) {
    this.AppComponent.userProfileHide();
  }

  ngOnInit() {
    this.getcountry = "";
    this.getstate = "";
    this.getcity = "";
    // this.EventPublishService.publishFormRefresh();    
    this.getUserData();
  }

  getUserData() {
    let userLocalId = localStorage.getItem('viewProfileDetail');
    let parseData = JSON.parse(userLocalId);
    ////console.log("user data tttttttttt: ", parseData['id']);
    let ObjSend = {
      id: parseData
    }
    this.UserService.getUserDataById(ObjSend).subscribe(result => {
      //console.log("result getttttttttttttttttttt : ", result);
      if (result['success'] == true) {
        this.PreUserData = result['getData'];
        this.username = this.PreUserData.username;
        this.email = this.PreUserData.email;
        this.firstname = this.PreUserData.firstname;
        this.lastname = this.PreUserData.lastname;
        this.designation = this.PreUserData.designation;
        this.bio = this.PreUserData.bio;
        this.company_name = this.PreUserData.company_name;
        this.company_email = this.PreUserData.company_email;
        this.company_address = this.PreUserData.company_address;
        this.vendor = this.PreUserData.vendor;
        // this.getProfileImage = this.PreUserData.profile_pic[0].src;
        // this.getCoverImage = this.PreUserData.cover_pic[0].src;
        this.getCheckPublicProfile = this.PreUserData.profile_public;
        this.getcountry = this.PreUserData.country;
        this.getstate = this.PreUserData.state;
        this.getcity = this.PreUserData.city;
        ////console.log("this.PreUserData : ", this.PreUserData);
        this.getUserCheckedValues();
        this.getUserVeondor();
        // alert(this.UserData);
      }
      else if (result['success'] == false) {
        $(".profile-danger").html(result['message']);
        $('.profile-danger').show();
        $('.profile-success').hide();
        $('.property_head').focus();
      }
    });
  }
  getUserVeondor() {
    let getVendor = this.PreUserData.vendor;
    for (let i = 0; i < getVendor.length; i++) {
      if (getVendor[i].vendor_id == $('#vendor_1').val()) {
        document.getElementById("vendor_1")['checked'] = true;
        $("#vendor_1").attr("disabled", true);
        $('#div-vender-1').show();
        this.vender1 = getVendor[i];
        ////console.log("this.vender1 this.vender1vvvvvvvvvvvvvvvvvvvvvv : ", this.vender1);
      }
      else if (getVendor[i].vendor_id == $('#vendor_2').val()) {
        document.getElementById("vendor_2")['checked'] = true;
        $("#vendor_2").attr("disabled", true);
        $('#div-vender-2').show();
        this.vender2 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_3').val()) {
        document.getElementById("vendor_3")['checked'] = true;
        $("#vendor_3").attr("disabled", true);
        $('#div-vender-3').show();
        this.vender3 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_4').val()) {
        document.getElementById("vendor_4")['checked'] = true;
        $("#vendor_4").attr("disabled", true);
        $('#div-vender-4').show();
        this.vender4 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_5').val()) {
        document.getElementById("vendor_5")['checked'] = true;
        $("#vendor_5").attr("disabled", true);
        $('#div-vender-5').show();
        this.vender5 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_6').val()) {
        document.getElementById("vendor_6")['checked'] = true;
        $("#vendor_6").attr("disabled", true);
        $('#div-vender-6').show();
        this.vender6 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_7').val()) {
        document.getElementById("vendor_7")['checked'] = true;
        $("#vendor_7").attr("disabled", true);
        $('#div-vender-7').show();
        this.vender7 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_8').val()) {
        document.getElementById("vendor_8")['checked'] = true;
        $("#vendor_8").attr("disabled", true);
        $('#div-vender-8').show();
        this.vender8 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_9').val()) {
        document.getElementById("vendor_9")['checked'] = true;
        $("#vendor_9").attr("disabled", true);
        $('#div-vender-9').show();
        this.vender9 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_10').val()) {
        document.getElementById("vendor_10")['checked'] = true;
        $("#vendor_10").attr("disabled", true);
        $('#div-vender-10').show();
        this.vender10 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_11').val()) {
        document.getElementById("vendor_11")['checked'] = true;
        $("#vendor_11").attr("disabled", true);
        $('#div-vender-11').show();
        this.vender11 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_12').val()) {
        document.getElementById("vendor_12")['checked'] = true;
        $("#vendor_12").attr("disabled", true);
        $('#div-vender-12').show();
        this.vender12 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_13').val()) {
        document.getElementById("vendor_13")['checked'] = true;
        $("#vendor_13").attr("disabled", true);
        $('#div-vender-13').show();
        this.vender13 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_14').val()) {
        document.getElementById("vendor_14")['checked'] = true;
        $("#vendor_14").attr("disabled", true);
        $('#div-vender-14').show();
        this.vender14 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_15').val()) {
        document.getElementById("vendor_15")['checked'] = true;
        $("#vendor_15").attr("disabled", true);
        $('#div-vender-15').show();
        this.vender15 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_16').val()) {
        document.getElementById("vendor_16")['checked'] = true;
        $("#vendor_16").attr("disabled", true);
        $('#div-vender-16').show();
        this.vender16 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_17').val()) {
        document.getElementById("vendor_17")['checked'] = true;
        $("#vendor_17").attr("disabled", true);
        $('#div-vender-17').show();
        this.vender17 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_18').val()) {
        document.getElementById("vendor_18")['checked'] = true;
        $("#vendor_18").attr("disabled", true);
        $('#div-vender-18').show();
        this.vender18 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_19').val()) {
        document.getElementById("vendor_19")['checked'] = true;
        $("#vendor_19").attr("disabled", true);
        $('#div-vender-19').show();
        this.vender19 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_20').val()) {
        document.getElementById("vendor_20")['checked'] = true;
        $("#vendor_20").attr("disabled", true);
        $('#div-vender-20').show();
        this.vender20 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_21').val()) {
        document.getElementById("vendor_21")['checked'] = true;
        $("#vendor_21").attr("disabled", true);
        $('#div-vender-21').show();
        this.vender21 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_22').val()) {
        document.getElementById("vendor_22")['checked'] = true;
        $("#vendor_22").attr("disabled", true);
        $('#div-vender-22').show();
        this.vender22 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_23').val()) {
        document.getElementById("vendor_23")['checked'] = true;
        $("#vendor_23").attr("disabled", true);
        $('#div-vender-23').show();
        this.vender23 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_24').val()) {
        document.getElementById("vendor_24")['checked'] = true;
        $("#vendor_24").attr("disabled", true);
        $('#div-vender-24').show();
        this.vender24 = getVendor[i];
      }
      else if (getVendor[i].vendor_id == $('#vendor_25').val()) {
        document.getElementById("vendor_25")['checked'] = true;
        $("#vendor_25").attr("disabled", true);
        $('#div-vender-25').show();
        this.vender25 = getVendor[i];
      }
    }
  }
  getUserCheckedValues() {
    let getRoleValue = this.PreUserData.role;
    for (let i = 0; i < getRoleValue.length; i++) {
      if (getRoleValue[i] == $('#role_1').val()) {
        document.getElementById("role_1")['checked'] = true;
      }
      else if (getRoleValue[i] == $('#role_2').val()) {
        document.getElementById("role_2")['checked'] = true;
        $("#role_2").attr("disabled", true);
      }
      else if (getRoleValue[i] == $('#role_3').val()) {
        document.getElementById("role_3")['checked'] = true;
      }
      else if (getRoleValue[i] == $('#role_4').val()) {
        document.getElementById("role_4")['checked'] = true;
      }
    }
  }
}