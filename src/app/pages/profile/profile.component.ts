import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from '../../app.component';
import * as $ from 'jquery';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { userInfo } from 'os';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editUserForm: FormGroup;
  changePsswordForm: FormGroup;
  addEditForm: FormGroup;
  selectedItemsList = [];
  checkedIDs = [];
  UserData: any;
  here: string;
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
  Vendor_company_name: any;
  Vendor_company_email: any;
  Vendor_company_website: any;
  Vendor_company_address: any;
  deleteVendorName: any;

  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private AppComponent: AppComponent,
  ) {
    this.AppComponent.userProfileHide();
  }

  ngOnInit() {
    $('#loader').hide();
    this.getUserData();
    this.getUserIDstorage();
    // this.UserData = this.PreUserData;
    // alert(this.UserData);
    this.editUserForm = new FormGroup({
      role: new FormControl(this.checkedIDs),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      designation: new FormControl(''),
      company_name: new FormControl(''),
      company_email: new FormControl(''),
      company_address: new FormControl(''),
      // password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      // confirm_password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
    this.changePsswordForm = new FormGroup({
      id: new FormControl(this.userId),
      old_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.addEditForm = new FormGroup({
      bio: new FormControl('', [Validators.required]),
    });
    /* start enter button trigger*/
    $(".CheckForm").keypress(function (e) {
      if (e.which === 13) {
        $('#formSubmit').trigger('click');
      }
    });
    /* end enter button trigger*/
    /* start enter button for chenge password form trigger*/
    $(".ChangePasswordCheckForm").keypress(function (e) {
      if (e.which === 13) {
        $('#chengePassSubmitForm').trigger('click');
      }
    });
    /* end enter button for chenge password form trigger*/
  }

  ngAfterViewInit() {
    // CKEDITOR.replace('editor1');
    // this.UserData = this.PreUserData;
    // $('.textarea').wysihtml5()
    // 
    // $('.textarea').data('wysihtml5').editor()

    $(".nav-tabs a").click(function () {
      $(this).tab('show');
    });
  }

  profilePhotosDropped(event) {
    console.log("profile filessss : ", event);
    this.profilePhoto = event;
    this.profilePhotoName = this.profilePhoto[0].name;
    console.log("name of photo : ", this.profilePhotoName);
  }

  coverPhotosDropped(event) {
    console.log("cover filessss : ", event);
    this.coverPhoto = event;
    this.coverPhotoName = this.coverPhoto[0].name;
    console.log("name of photo : ", this.coverPhotoName);
  }
  // deleteUploadPhotos(i) {
  //   console.log("this.uploadPhotosfiles", this.uploadPhotosfiles);
  //   console.log("typedoffffffff : ", typeof (this.uploadPhotosfiles));
  //   this.uploadPhotosfiles.splice(i, 1);
  //   console.log("here are finallllll : ", this.uploadPhotosfiles);
  // }
  getUserIDstorage() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    console.log("user data tttttttttt: ", parseData['id']);
    this.userId = parseData['id'];
  }

  getUserData() {
    $('.profile-danger').hide();
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    console.log("user data tttttttttt: ", parseData['id']);
    let ObjSend = {
      id: parseData['id']
    }
    this.UserService.getUserDataById(ObjSend).subscribe(result => {
      console.log("result getttttttttttttttttttt : ", result);
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
        this.getProfileImage = this.PreUserData.profile_pic[0].src;
        this.getCoverImage = this.PreUserData.cover_pic[0].src;
        this.getCheckPublicProfile = this.PreUserData.profile_public;
        // if (this.getCheckPublicProfile == 'Yes') {
        //   document.getElementById("profile-public")['checked'] = true;
        // }
        localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
        this.AppComponent.userProfileHide();
        console.log("this.PreUserData : ", this.PreUserData);
        this.getUserCheckedValues();
        this.getUserVeondor();
        // alert(this.UserData);
      }
      else if (result['success'] == false) {
        $(".profile-danger").html(result['message']);
        $('.profile-danger').show();
        $('.profile-success').hide();
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
        console.log("this.vender1 this.vender1vvvvvvvvvvvvvvvvvvvvvv : ", this.vender1);
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
      }
      else if (getRoleValue[i] == $('#role_3').val()) {
        document.getElementById("role_3")['checked'] = true;
      }
      else if (getRoleValue[i] == $('#role_4').val()) {
        document.getElementById("role_4")['checked'] = true;
      }
    }
  }

  chengePassword() {
    if ($('#old_password').val() == '' && ($('#new_password').val() == '' || $('#new_password').val().length < 6) && $('#confirm_password').val() == '') {
      $('#confirm_password').focus();
      $('#new_password').focus();
      $('#old_password').focus();
      $(".passwordValidDanger").html("Please enter old password.<br>Please enter new password.<br>Please enter confirm password.");
      $('.passwordValidDanger').show();
    }
    else if ($('#old_password').val() == '' && ($('#new_password').val() == '' || $('#new_password').val().length < 6)) {
      $('#new_password').focus();
      $('#old_password').focus();
      $(".passwordValidDanger").html("Please enter old password.<br>Please enter new password.");
      $('.passwordValidDanger').show();
    }
    else if ($('#old_password').val() == '' && $('#confirm_password').val() == '') {
      $('#confirm_password').focus();
      $('#old_password').focus();
      $(".passwordValidDanger").html("Please enter old password.<br>Please enter confirm password.");
      $('.passwordValidDanger').show();
    }
    else if ($('#old_password').val() == '') {
      $('#confirm_password').focus();
      $('#old_password').focus();
      $(".passwordValidDanger").html("Please enter old password.");
      $('.passwordValidDanger').show();
    }
    else if ($('#new_password').val() == '' && $('#confirm_password').val() == '') {
      $('#confirm_password').focus();
      $('#new_password').focus();
      $(".passwordValidDanger").html("Please enter new password.<br>Please enter confirm password.");
      $('.passwordValidDanger').show();
    }
    else if ($('#new_password').val() == '') {
      $('#new_password').focus();
      $(".passwordValidDanger").html("Please enter new password.");
      $('.passwordValidDanger').show();
    }
    else if ($('#new_password').val().length < 6 && $('#confirm_password').val() == '') {
      $('#confirm_password').focus();
      $('#new_password').focus();
      $(".passwordValidDanger").html("New password must greater than 5 character.<br>Please enter confirm password.");
      $('.passwordValidDanger').show();
    }
    else if ($('#new_password').val().length < 6) {
      $('#new_password').focus();
      $(".passwordValidDanger").html("New password must greater than 5 character.");
      $('.passwordValidDanger').show();
    }
    else if ($('#confirm_password').val() != $('#new_password').val()) {
      $('#confirm_password').focus();
      $(".passwordValidDanger").html("New password not match with confirm password.");
      $('.passwordValidDanger').show();
    }
    // else if($('#old_password').val() == '' && $('#new_password').val() == ''){
    //   $('#old_password').focus();
    //   // alert("Please enter old password.");
    // }
    // else if($('#new_password').val() == '' ){
    //   $('#new_password').focus();
    //   // alert("Please enter old password.");
    // }
    // else if($('#confirm_password').val() == '' ){
    //   $('#confirm_password').focus();
    //   // alert("Please enter confirm password.");
    // }
    // else if($('#confirm_password').val() !=  $('#new_password').val()){
    //   $('#confirm_password').focus();
    //   // alert("Password not match with Confirm Password");
    // }
    else {

      $('.passwordValidDanger').hide();
      console.log("form register val : ", this.changePsswordForm.value);
      this.UserService.changePassword(this.changePsswordForm.value).subscribe(result => {
        console.log("result : ", result);
        if (result['success'] == true) {
          $(".passwordValidSuccess").html(result['message']);
          $('.passwordValidSuccess').show();
          $('.passwordValidDanger').hide();
          // let check111 =  localStorage.removeItem('userInfo');
          //  window.location.replace("http://stackoverflow.com");
          //  this.AppComponent.userProfileHide();
          location.reload();
          //  $(location).attr('href', '/')
          //  this.router.navigate(['/']);
        }
        else if (result['success'] == false) {
          $(".passwordValidDanger").html(result['message']);
          $('.passwordValidDanger').show();
          $('.passwordValidSuccess').hide();
        }
      });
    }
  }

  editUserProfile() {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let emailVal = $('#company_email').val();
    if (emailVal != '' && !regex.test(emailVal)) {
      $('#company_email').focus();
      $(".profile-danger").html("Please enter valid company email address.");
      $('.profile-danger').show();
    }

    else {
      // for role checkbox
      let cid1 = document.getElementById("role_1")['checked'];
      let cid2 = document.getElementById("role_2")['checked'];
      let cid3 = document.getElementById("role_3")['checked'];
      let cid4 = document.getElementById("role_4")['checked'];
      if (cid1 === true) {
        let checkedValue1 = $('#role_1').val();
        console.log(checkedValue1);
        this.checkedIDs.push(checkedValue1)
      }
      if (cid2 === true) {
        let checkedValue2 = $('#role_2').val();
        console.log(checkedValue2);
        this.checkedIDs.push(checkedValue2)
      }
      if (cid3 === true) {
        let checkedValue3 = $('#role_3').val();
        console.log(checkedValue3);
        this.checkedIDs.push(checkedValue3)
      }
      if (cid4 === true) {
        let checkedValue4 = $('#role_4').val();
        console.log(checkedValue4);
        this.checkedIDs.push(checkedValue4)
      }
      // for vendor checkbox
      // if ($('#vendor_1').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_1').val());
      // }
      // if ($('#vendor_2').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_2').val());
      // }
      // if ($('#vendor_3').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_3').val());
      // }
      // if ($('#vendor_4').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_4').val());
      // }
      // if ($('#vendor_5').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_5').val());
      // }
      // if ($('#vendor_6').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_6').val());
      // }
      // if ($('#vendor_7').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_7').val());
      // }
      // if ($('#vendor_8').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_8').val());
      // }
      // if ($('#vendor_9').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_9').val());
      // }
      // if ($('#vendor_10').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_10').val());
      // }
      // if ($('#vendor_11').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_11').val());
      // }
      // if ($('#vendor_12').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_12').val());
      // }
      // if ($('#vendor_13').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_13').val());
      // }
      // if ($('#vendor_14').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_14').val());
      // }
      // if ($('#vendor_15').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_15').val());
      // }
      // if ($('#vendor_16').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_16').val());
      // }
      // if ($('#vendor_17').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_17').val());
      // }
      // if ($('#vendor_18').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_18').val());
      // }
      // if ($('#vendor_19').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_19').val());
      // }
      // if ($('#vendor_20').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_20').val());
      // }
      // if ($('#vendor_21').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_21').val());
      // }
      // if ($('#vendor_22').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_22').val());
      // }
      // if ($('#vendor_23').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_23').val());
      // }
      // if ($('#vendor_24').prop("checked") == true) {
      //   this.VendorArray.push($('#vendor_24').val());
      // }
      // this.editUserForm.value.vendor = this.VendorArray;

      let getUserId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(getUserId);
      console.log("user data tttttttttt: ", parseData['id']);
      console.log("form register val : ", this.editUserForm.value);
      this.UserService.updateUserProfile(this.editUserForm.value, parseData['id']).subscribe(result => {
        console.log("result : ", result);
        if (result['success'] == true) {
          $(".profile-success").html(result['message']);
          $('.profile-success').show();
          $('.profile-danger').hide();
          this.AppComponent.userProfileHide();
          $(location).attr('href', '/');
        }
        else if (result['success'] == false) {
          $(".profile-danger").html(result['message']);
          $('.profile-danger').show();
          $('.profile-success').hide();
        }
      });
    }
  }

  // addEditSubmit() {
  //   let getUserId = localStorage.getItem('userInfo');
  //   let parseData = JSON.parse(getUserId);
  //   console.log("user data tttttttttt: ", parseData['id']);
  //   console.log("form register val : ", this.addEditForm.value);
  //   let cid4 = document.getElementById("profile-public")['checked'];
  //   let checkPublicProfile;
  //   if (cid4 === true) {
  //     checkPublicProfile = 'Yes'
  //   } else {
  //     checkPublicProfile = 'No'
  //   }
  //   let formData = new FormData();
  //   let profileArr = [];
  //   let profile_data;
  //   let cover_data;
  //   profileArr.push(this.profilePhoto)
  //   if (this.profilePhoto) {
  //     profile_data = this.profilePhoto[0]
  //   }
  //   else {
  //     profile_data = [];
  //   }
  //   if (this.coverPhoto) {
  //     cover_data = this.coverPhoto[0]
  //   }
  //   else {
  //     cover_data = [];
  //   }
  //   let bioValue = "";
  //   if (this.addEditForm.value.bio != null) {
  //     bioValue = this.addEditForm.value.bio;
  //   }
  //   formData.append("profile_pic", profile_data);
  //   formData.append("cover_pic", cover_data);
  //   formData.append("bio", bioValue);
  //   formData.append("profile_public", checkPublicProfile);
  //   console.log("form register val : ", formData);
  //   this.UserService.updateUserProfile(formData, parseData['id']).subscribe(result => {
  //     console.log("result : ", result);
  //     if (result['success'] == true) {
  //       $(".add-edit-success").html(result['message']);
  //       $('.add-edit-success').show();
  //       $('.add-edit-danger').hide();
  //       location.reload();
  //       this.AppComponent.userProfileHide();
  //     }
  //     else if (result['success'] == false) {
  //       $(".add-edit-danger").html(result['message']);
  //       $('.add-edit-danger').show();
  //       $('.add-edit-success').hide();
  //     }
  //   });
  // }

  venderCheckedVal(checkVal, checkId, checkName) {
    this.modalVendorValue = checkVal;
    this.modalVendorId = checkId;
    this.modalVendorName = checkName;
    if ($('#' + checkId + '').prop("checked") == true) {
      $('#' + checkId + '').attr('data-toggle', 'modal');
      $('#' + checkId + '').attr('data-target', '#vendor-checkbox-modal');
    }
    else if ($('#' + checkId + '').prop("checked") == false) {
      // $("#singlechatpanel-1").is(':visible');
      // $('#div-vender-' + checkVal + '').hide();
      $('#' + checkId + '').removeAttr('data-toggle');
      $('#' + checkId + '').removeAttr('data-target');
      // if ($('#div-vender-' + checkVal + '').is(':visible') === true) {
      //   $('#' + checkId + '').attr('data-toggle', 'modal');
      //   $('#' + checkId + '').attr('data-target', '#delete-checkbox-modal');
      //   this.getVendorIDD(checkVal, checkName);
      // }     
    }
  }

  submitvendorForm() {
    // alert("venozsc")
    $('.vendor-danger').hide();
    $('.vendor-success').hide();
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    let vendorArray = [{
      vendor_id: $('#vendor_checked_id').val(),
      company_name: $('#company_name').val(),
      company_email: $('#company_email').val(),
      company_website: $('#company_website').val(),
      company_address: $('#company_address').val(),
    }]
    let formVal = {
      vendor: vendorArray
    }
    this.UserService.updateUserVendor(formVal, parseData['id']).subscribe(result => {
      console.log("result of get user post : ", result);
      if (result['success'] == true) {
        $(".vendor-success").html(result['message']);
        $('.vendor-danger').hide();
        $('.vendor-success').show();
        location.reload();
      }
      else if (result['success'] == false) {
        $('.vendor-success').hide();
        $(".vendor-danger").html(result['message']);
        $('.vendor-danger').show();
      }
    });
  }

  goToVendorModal(checkVal, checkName, vend) {
    this.modalVendorValue = checkVal;
    this.modalVendorName = checkName;
    this.Vendor_company_name = vend.company_name;
    this.Vendor_company_email = vend.company_email;
    this.Vendor_company_website = vend.company_website;
    this.Vendor_company_address = vend.company_address;
  }

  getVendorIDD(vendor_id, val){
    this.deleteVendorName = val;
    localStorage.setItem("setvendorIdConfirm",JSON.stringify(vendor_id));
  }

  ConfirmDeleteVendor(){
    let getVendorId = localStorage.getItem('setvendorIdConfirm');
    let parseData = JSON.parse(getVendorId); 
    this.callDeleteVedordata(parseData);
  }

  callDeleteVedordata(checkVal){
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    let formVal = {
      vendor_id: checkVal
    }
    $('#div-vender-' + checkVal + '').hide();
    this.UserService.updateUserVendorUntick(formVal, parseData['id']).subscribe(result => {
      console.log("result of get user post : ", result);
      if (result['success'] == true) {
        $(".delete-vendor-success").html(result['message']);
        $('.delete-vendor-success').show();
        $('.delete-vendor-danger').hide();
        // $('#div-vender-' + checkVal + '').hide();
        location.reload();
      } 
      else if (result['success'] == false) {
        $(".delete-vendor-danger").html(result['message']);
        $('.delete-vendor-danger').show();
        $('.delete-vendor-success').hide();
      }       
    });
  }
}