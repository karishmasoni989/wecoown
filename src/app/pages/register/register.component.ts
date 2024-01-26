import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  selectedItemsList = [];
  checkedIDs = [];
  interests = []; bChecked; wChecked; oChecked;
  propertyIdd: any;
  usernamePre: any;
  loading: boolean;
  passwordShown: boolean = false;
  @ViewChild('password', { static: false, })password: ElementRef;
  ConfirmPasswordShow: boolean = false; 
  @ViewChild('confirm_password', { static: false, })confirm_password: ElementRef;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private socialAuthService: AuthService
  ) { }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        ////console.log(socialPlatform + " sign in data : ", userData);
        // Now sign-in with userData
        // ...

      }
    );
  }

  ngOnInit() {
    this.getUserPropertyId();
    this.registerForm = new FormGroup({
      role: new FormControl(),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      i_am_buyer_id: new FormControl(this.propertyIdd),
      created_by: new FormControl(),
    });
    /* start enter button trigger*/
    $(".CheckForm").keypress(function (e) {
      if (e.which === 13) {
        $('#formSubmit').trigger('click');
      }
    });
    /* end enter button trigger*/
  }
  ngAfterViewInit() {
    $(".nav-tabs a").click(function () {
      $(this).tab('show');
    });
  }
  // getIP()  {
  //   this.UserService.getIPAddress().subscribe((res:any)=>{
  //     this.getIpaddress=res.ip;
  //     ////console.log("ip addressssssss : ",this.getIpaddress);      
  //   });
  // }
  // openPage(pageName,elmnt,color) {
  //   var i, tabcontent, tablinks;
  //   tabcontent = document.getElementsByClassName("tabcontent");
  //   for (i = 0; i < tabcontent.length; i++) {
  //     tabcontent[i].style.display = "none";
  //   }
  //   tablinks = document.getElementsByClassName("tablink");
  //   for (i = 0; i < tablinks.length; i++) {
  //     tablinks[i].style.backgroundColor = "";
  //   }
  //   document.getElementById(pageName).style.display = "block";
  //   elmnt.style.backgroundColor = color;
  // }
  ionViewDidLoad() {
    if (this.passwordShown) {
      this.passwordShown = false;
      document.getElementById('password').setAttribute('type', 'password');
    }
    else {
      this.passwordShown = true;
      document.getElementById('password').setAttribute('type', 'text');
    }
  }
  ionViewDidLoad2() {
    if (this.ConfirmPasswordShow) {
      this.ConfirmPasswordShow = false;
      document.getElementById('confirm_password').setAttribute('type', 'password');
    }
    else {
      this.ConfirmPasswordShow = true;
      document.getElementById('confirm_password').setAttribute('type', 'text');
    }
  }
  getUserPropertyId() {
    let userLocalId = localStorage.getItem('peropertyId');
    let parseData = JSON.parse(userLocalId);
    ////console.log("user property id: ", parseData);
    this.propertyIdd = parseData;
  }

  register() {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let emailVal = $('#email').val();
    let finalString = "";
    if ($('#firstname').val() == '') {
      $('#firstname').focus();
      finalString += "Please enter first name.<br>";
    }
    if ($('#lastname').val() == '') {
      $('#lastname').focus();
      finalString += "Please enter last name.<br>";
    }
    if ($('#username').val() == '') {
      $('#username').focus();
      if ($('#username').val().length == 1 || $('#username').val().length == 2 || $('#username').val().length == 3) {
        finalString += "Username must be greater than 3 character.<br>";
      } else {
        finalString += "Please enter username.<br>";
      }
    }
    if ($('#email').val() == '') {
      $('#email').focus();
      if (!regex.test(emailVal)) {
        finalString += "Please enter email address.<br>";
      } else {
        finalString += "Please enter valid email address.<br>";
      }
    }
    if ($('#password').val() == '') {
      $('#password').focus();
      if ($('#password').val().length == 1 || $('#password').val().length == 2 || $('#password').val().length == 3 || $('#password').val().length == 4 || $('#password').val().length == 5) {
        finalString += "Password must be greater than 5 character.<br>";
      } else {
        finalString += "Please enter password.<br>";
      }
    }
    if ($('#confirm_password').val() == '') {
      $('#confirm_password').focus();
      if ($('#confirm_password').val().length == 1 || $('#confirm_password').val().length == 2 || $('#confirm_password').val().length == 3 || $('#confirm_password').val().length == 4 || $('#confirm_password').val().length == 5) {
        finalString += "confirm Password must be greater than 5 character.<br>";
      } else {
        finalString += "Please enter confirm password.<br>";
      }
    }
    if ($('#password').val() != $('#confirm_password').val()) {
      $('#confirm_password').focus();
      $('#password').focus();
      finalString += "Password and confirm password does not match.<br>";
    }
    if ($('#accept-terms').prop("checked") == false) {
      finalString += "Please check on checkbox of accept terms and condition.";
    }
    ////console.log("alertHtml", finalString);

    $(".register-danger").html(finalString);
    $('.register-danger').show();

    // for checkbox
    let cid1 = document.getElementById("role_1")['checked'];
    let cid2 = document.getElementById("role_2")['checked'];
    let cid3 = document.getElementById("role_3")['checked'];
    let cid4 = document.getElementById("role_4")['checked'];
    this.checkedIDs = [];
    if (cid1 === true) {
      let checkedValue1 = $('#role_1').val();
      ////console.log(checkedValue1);
      this.checkedIDs.push(checkedValue1)
    }
    if (cid2 === true) {
      let checkedValue2 = $('#role_2').val();
      ////console.log(checkedValue2);
      this.checkedIDs.push(checkedValue2)
    }
    if (cid3 === true) {
      let checkedValue3 = $('#role_3').val();
      ////console.log(checkedValue3);
      this.checkedIDs.push(checkedValue3)
    }
    if (cid4 === true) {
      let checkedValue4 = $('#role_4').val();
      ////console.log(checkedValue4);
      this.checkedIDs.push(checkedValue4)
    }
    this.registerForm.value.role = this.checkedIDs;
    this.registerForm.value.created_by = 'WePropertyowners';
    let checked_accept = document.getElementById("accept-terms")['checked'];

    if (checked_accept === true && finalString == "") {
      $('.register-danger').hide();
      //console.log("form register val : ", this.registerForm.value);
      this.UserService.userRegister(this.registerForm.value).subscribe(result => {
        //console.log("result : ", result);
        if (result['success'] == true) {
          if (result['code'] == 900) {
            this.usernamePre = result['username'];
            $('#formSubmitModal').attr('data-toggle', 'modal');
            $('#formSubmitModal').attr('data-keyboard', 'false');
            $('#formSubmitModal').attr('data-backdrop', 'static');
            $('#formSubmitModal').attr('data-target', '#confim-role-model');
            // $('.register-success').show();
            $('.register-danger').hide();
            $('#simpleForm')[0].reset();
            $('#modalRoleConfim').html(result['message']);
            $('#formSubmitModal').trigger('click');
            // $(".register-success").html(result['message']);
          }
          else {
            $(".register-success").html(result['message']);
            $('.register-success').show();
            $('.register-danger').hide();
            $('#simpleForm')[0].reset();
          }
          //  this.router.navigate(['/login']);
        }
        else if (result['success'] == false) {
          $(".register-danger").html(result['message']);
          $('.register-danger').show();
          $('.register-success').hide();
        }
      });
    }
  }
  confirmRole() {
    let formDA = {
      username: this.usernamePre,
      created_by: 'WePropertyowners'
    }
    this.UserService.confirmRole(formDA).subscribe(result => {
      //console.log("result : ", result);
      if (result['success'] == true) {
        $(".confirm-role-success").html(result['message']);
        $('.confirm-role-success').show();
        $('.confirm-role-success').focus();
        $('.confirm-role-danger').hide();
        $(location).attr('href', '/login');
        // alert(JSON.stringify(result['userInfo']))
      }
      else if (result['success'] == false) {
        $(".confirm-role-danger").html(result['message']);
        $('.confirm-role-danger').show();
        $('.confirm-role-success').hide();
        // alert
      }
    });
  }
  removeAttribut(){
    $('#formSubmitModal').removeAttr('data-toggle');
    $('#formSubmitModal').removeAttr('data-keyboard');
    $('#formSubmitModal').removeAttr('data-backdrop');
    $('#formSubmitModal').removeAttr('data-target');
  }
}