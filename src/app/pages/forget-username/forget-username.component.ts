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
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.css']
})
export class ForgetUsernameComponent implements OnInit {
  firstForgetForm: FormGroup; 
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
      email: new FormControl('', [Validators.required,Validators.email]), 
    });
  
  }
  submitFirst(){   
      console.log("form register val : ", this.firstForgetForm.value);
      this.UserService.forgetUsername(this.firstForgetForm.value).subscribe(result => {
        console.log("result : ", result);
        if (result['success'] == true) {
         $(".firstForget-success").html(result['message']);
         $('.firstForget-success').show();
         $('.firstForget-danger').hide();
         $('#simpleForm')[0].reset();
         $('#afterLogin').show();
        //  alert("jkansfm,dg")
        //  $(location).attr('href', '/')
        }
        else if (result['success'] == false) {
         $(".firstForget-danger").html(result['message']);
         $('#email').focus();
         $('.firstForget-danger').show();
         $('.firstForget-success').hide();
        }
      });   
  }
}