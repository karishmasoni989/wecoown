import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgModule } from '@angular/core';
import { Observable, of} from 'rxjs';
import { AppComponent } from '../../app.component';
import * as $ from 'jquery';

// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { userInfo } from 'os';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  firstForgetForm: FormGroup;
  secondForgetForm: FormGroup;
  thirdForgetForm: FormGroup;
  ForgetUserName: any;

  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private AppComponent: AppComponent,
  ) { }

  ngOnInit() {
    this.firstForgetForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.minLength(4)]),     
      created_by: new FormControl('')
    });
    this.secondForgetForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.thirdForgetForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  submitFirst(){    
    if($('#username').val() == ""){
      $('#username').focus();     
      $(".firstForget-danger").html("Please enter username.");
      $('.firstForget-danger').show();  
      $('.property_head').focus();
    }
    else if($('#username').val().length < 4){
      $('#username').focus();     
      $(".firstForget-danger").html("Username must be greater than 3 character.");
      $('.firstForget-danger').show();  
      $('.property_head').focus();
    }
    else{
      $('.firstForget-danger').hide();  
      this.firstForgetForm.value.created_by = 'WeCoOwn';
      ////console.log("form register val : ", this.firstForgetForm.value);
      this.UserService.forgetPassword(this.firstForgetForm.value).subscribe(result => {
        ////console.log("result : ", result);
        if (result['success'] == true) {
         $(".firstForget-success").html(result['message']);
         $('.firstForget-success').show();
         $('.firstForget-danger').hide();
         this.ForgetUserName = result['username'];   
         $('#firstDiv').hide();
         $('#secondDiv').show();
         $('.property_head').focus();
        //  $(location).attr('href', '/')
        }
        else if (result['success'] == false) {
         $(".firstForget-danger").html(result['message']);
         $('.firstForget-danger').show();
         $('.firstForget-success').hide();
         $('.property_head').focus();
        }
      });
    }
  }
  submitSecond(){
    if($('#otp').val() == ""){
      $('.firstForget-success').hide();
      $('#otp').focus();     
      $(".SecondForget-danger").html("Please enter code.");
      $('.SecondForget-danger').show();  
      $('.property_head').focus();
    }
    else if($('#otp').val().length < 6){
      $('.firstForget-success').hide();
      $('#otp').focus();     
      $(".SecondForget-danger").html("Code must be greater than 5 character.");
      $('.SecondForget-danger').show();  
      $('.property_head').focus();
    }
    else{
      $('.firstForget-success').hide();
      $('.SecondForget-danger').hide();
      $('.property_head').focus();
      ////console.log("form register val : ", this.secondForgetForm.value);
      this.UserService.verifyOTPForgetPassword(this.secondForgetForm.value).subscribe(result => {
        ////console.log("result : ", result);
        if (result['success'] == true) {
         $(".firstForget-success").html(result['message']);
         $('.firstForget-success').show();
         $('.SecondForget-danger').hide();
         $('#firstDiv').hide();
         $('#secondDiv').hide();
          $('#thirdDiv').show();
          $('.property_head').focus();
        //  $(location).attr('href', '/')
        }
        else if (result['success'] == false) {
         $(".SecondForget-danger").html(result['message']);
         $('.SecondForget-danger').show();
         $('.firstForget-success').hide();
         $('.property_head').focus();
        }
      });
    }
  }
  submitThird(){
    if($('#new_password').val() == '' && $('#confirm_password').val() == '' ){
    $('.firstForget-success').hide();
      $('#confirm_password').focus();
      $('#new_password').focus();
      $(".thirdForget-danger").html("Please enter new password.<br>Please enter confirm password.");
      $('.thirdForget-danger').show();  
      $('.property_head').focus();
    }
    else if($('#new_password').val() == ''){
    $('.firstForget-success').hide();
      $('#new_password').focus();
      $(".thirdForget-danger").html("Please enter new password.");
      $('.thirdForget-danger').show();  
      $('.property_head').focus();
    }
    else if($('#new_password').val().length < 6 && $('#confirm_password').val() == '' ){
    $('.firstForget-success').hide();
      $('#confirm_password').focus();
      $('#new_password').focus();
      $(".thirdForget-danger").html("New Password must greater than 5 character.<br>Please enter confirm password.");
      $('.thirdForget-danger').show(); 
      $('.property_head').focus(); 
    }
    else if($('#new_password').val().length < 6){
    $('.firstForget-success').hide();
      $('#new_password').focus();
      $(".thirdForget-danger").html("New password must greater than 5 character.");
      $('.thirdForget-danger').show();  
      $('.property_head').focus();
    }
    else if($('#confirm_password').val() !=  $('#new_password').val()){
    $('.firstForget-success').hide();
        $('#confirm_password').focus();
        $(".thirdForget-danger").html("New password does not match with confirm password.");
        $('.thirdForget-danger').show();  
        $('.property_head').focus();
      }
    else{
    $('.firstForget-success').hide();
      ////console.log("form register val : ", this.thirdForgetForm.value);
      this.UserService.forgetUserPasswordUpdate(this.thirdForgetForm.value).subscribe(result => {
        ////console.log("result : ", result);
        if (result['success'] == true) {
         $(".firstForget-success").html(result['message']);
         $('.firstForget-success').show();
         $('.thirdForget-danger').hide();
         $('#simpleForm')[0].reset();
         $('#afterLogin').show();
         $('#firstDiv').show();
         $('#secondDiv').hide();
          $('#thirdDiv').hide();
          $('.property_head').focus();
        //  $(location).attr('href', '/login')
        }
        else if (result['success'] == false) {
         $(".thirdForget-danger").html(result['message']);
         $('.thirdForget-danger').show();
         $('.firstForget-success').hide();
         $('.property_head').focus();
        }
      });
    }
  }
}