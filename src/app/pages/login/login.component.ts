import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../../app.component';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'angular-6-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  here: String;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private AppComponent: AppComponent,
    private socialAuthService: AuthService
  ) {
    this.AppComponent.userProfileHide(); 
    this.ngOnInit();
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // alert(userData)        
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
            
      }
    );
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
      password: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
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
 
  login() {    
    console.log("form login val : ", this.loginForm.value);
    if ($('#username').val() == '' && $('#password').val() == '') {
      $('#password').focus();
      $('#username').focus();
      $(".login-danger").html("Please enter username.<br>Please enter password.");
      $('.login-danger').show();
    }
    else if ($('#username').val().length < 4  && $('#password').val() == '') {
      $('#username').focus();
      $(".login-danger").html("Username must be greater than 3 character.<br>Please enter password.");
      $('.login-danger').show();
    }
    else if ($('#username').val().length< 4) {
      $('#username').focus();
      $(".login-danger").html("Username must be greater than 3 character.");
      $('.login-danger').show();
    }
    else if ($('#password').val() == '') {
      // alert($('#password').val())
      $('#password').focus();
      $(".login-danger").html("Please enter password.");
      $('.login-danger').show();
    }
    else if ($('#password').val().length < 6) {
      // alert($('#password').val().length < 6)
      $('#password').focus();
      $(".login-danger").html("Password must be greater than 5 character.");
      $('.login-danger').show();
    }
    // else if ($('#password').val() == '') {
    //   // $('#usermsg').hide();
    //   $('#password').focus();
    //   $(".login-danger").html("* This field is required.<br>Please Enter Password");
    //   $('.login-danger').show();
    //   // $('#pasMsg').show();
    //   // alert("Please Enter Password");
    // }
    else{
      $('.login-danger').hide();
      this.UserService.login(this.loginForm.value).subscribe(result => {
        console.log("result : ", result);
        if (result['success'] == true) {
          $(".login-success").html(result['message']);
          $('.login-success').show();
          $('.login-success').focus();
          $('.login-danger').hide();
          localStorage.setItem('userInfo',JSON.stringify(result['userInfo']));          
          $(location).attr('href', '/')
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
}

