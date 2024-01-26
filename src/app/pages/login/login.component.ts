import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../../app.component';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'angular-6-social-login';
import { TranslateStringPipe } from '../../translate.pipe';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    TranslateStringPipe
],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  here: String;
  usernamePre: any;
  LoginUserInfo: string;
  passwordShown: boolean = false;
  @ViewChild('password1', { static: false, })password1: ElementRef;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private AppComponent: AppComponent,
    private socialAuthService: AuthService,
    private translateLang: TranslateStringPipe
  ) {
    this.AppComponent.userProfileHide();
    this.ngOnInit();
  }

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
        // alert(userData)        
        ////console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...

      }
    );
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      password: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      created_by: new FormControl()
    });
    /* start enter button trigger*/
    $(".CheckForm").keypress(function (e) {
      // alert("c;asfdrg")
      if (e.which === 13) {
        $('#formSubmit').trigger('click');
      }
    });
    /* end enter button trigger*/
    // $(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );
  }
  ionViewDidLoad() {
    if (this.passwordShown) {
      this.passwordShown = false;
      document.getElementById('password1').setAttribute('type', 'password');
    }
    else {
      this.passwordShown = true;
      document.getElementById('password1').setAttribute('type', 'text');
    }
  }
  async login() {
    ////console.log("form login val : ", this.loginForm.value);
    let dataShowToHtml = "";
    if ($('#username').val() == '' && $('#password1').val() == '') {
      $('#password1').focus();
      $('#username').focus();
      dataShowToHtml = ".login-danger";
      this.goToTransformLanguage("Please enter username.<br>Please enter password.", dataShowToHtml);
      // $(".login-danger").html(getConvertData);
      // $('.login-danger').show();
    }
    else if ($('#username').val().length < 4 && $('#password1').val() == '') {
      $('#username').focus();
      $(".login-danger").html("Username must be greater than 3 characters.<br>Please enter password.");
      $('.login-danger').show();
    }
    else if ($('#username').val().length < 4) {
      $('#username').focus();
      $(".login-danger").html("Username must be greater than 3 characters.");
      $('.login-danger').show();
    }
    else if ($('#password1').val() == '') {
      // alert($('#password1').val())
      $('#password1').focus();
      $(".login-danger").html("Please enter password.");
      $('.login-danger').show();
    }
    else if ($('#password1').val().length < 6) {
      // alert($('#password1').val().length < 6)
      $('#password1').focus();
      $(".login-danger").html("Password must be greater than 5 characters.");
      $('.login-danger').show();
    }
    // else if ($('#password1').val() == '') {
    //   // $('#usermsg').hide();
    //   $('#password').focus();
    //   $(".login-danger").html("* This field is required.<br>Please Enter Password");
    //   $('.login-danger').show();
    //   // $('#pasMsg').show();
    //   // alert("Please Enter Password");
    // }
    else {
      $('.login-danger').hide();
      this.loginForm.value.created_by = 'WePropertyowners';
      this.UserService.login(this.loginForm.value).subscribe(async result => {
        ////console.log("result : ", result);
        if (result['success'] == true) {
          if (result['code'] == 900) {
            this.usernamePre = result['username'];
            $('#formSubmitModal').attr('data-toggle', 'modal');
            $('#formSubmitModal').attr('data-keyboard', 'false');
            $('#formSubmitModal').attr('data-backdrop', 'static');
            $('#formSubmitModal').attr('data-target', '#confim-role-model');
            // $('.register-success').show();
            $('#modalRoleConfim').html(result['message']);
            $('.login-danger').hide();
            $('#simpleForm')[0].reset();
            $('#formSubmitModal').trigger('click');
            // this.LoginUserInfo = JSON.stringify(result['userInfo']);
            // $(".register-success").html(result['message']);
          }
          else {
            dataShowToHtml = ".login-success";
            await this.goToTransformLanguage(result['message'], dataShowToHtml);
            // $(".login-success").html(result['message']);            
            // $('.login-success').show();
            $('.login-success').focus();
            $('.login-danger').hide();
            localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
            $(location).attr('href', '/')
          }
          // alert(JSON.stringify(result['userInfo']))
        }
        else if (result['success'] == false) {
          $(".login-danger").html(result['message']);
          $('.login-danger').show();
          $('.login-danger').focus();
          $('.login-success').hide();
          // alert(result['message']);
        }
      });
    }
  }
  async goToTransformLanguage(data, whereToShow) {
    await this.translateLang.transform(data).subscribe(result => {
      // console.log("inner method ",result);
      $(whereToShow).html(result);
      $(whereToShow).show();
      // return result
    });
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
        // localStorage.setItem('userInfo', this.LoginUserInfo);
        location.reload();
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

