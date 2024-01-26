import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.goForVerifyEmail();
    // $(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );
  }

  goForVerifyEmail() {    
    let nullVar = "nullVar";
    let getParamsId = this.activatedRoute.snapshot.queryParamMap.get('tokenVerify');
    let getParamsIdForNewsletter = this.activatedRoute.snapshot.queryParamMap.get('VerifyNewsSubscription');
    // alert(getParamsId)
    console.log("getParamsId : ", getParamsId);
    console.log("getParamsIdForNewsletter : ", getParamsIdForNewsletter);
    this.UserService.verifyEmailLink(nullVar,getParamsId).subscribe(result => {
      console.log("result : ", result);
      if (result['success'] == true) {
        $(".verify-success").html(result['message']);
          $('.verify-success').show();
          $('.verify-danger').hide();
        // alert(JSON.stringify(result['userInfo']))
      }
      else if (result['success'] == false) {
        $(".verify-danger").html(result['message']);
        $('.verify-danger').show();
        $('.verify-success').hide();
      }
    });  
    if(getParamsIdForNewsletter != null)
    {
      $('#verifyLoginBtn').hide();
      this.UserService.verifyEmailLinkForNewsletter(nullVar,getParamsIdForNewsletter).subscribe(result => {
        console.log("result : ", result);
        if (result['success'] == true) {
          $(".verify-success").html(result['message']);
            $('.verify-success').show();
            $('.verify-danger').hide();
          // alert(JSON.stringify(result['userInfo']))
        }
        else if (result['success'] == false) {
          $(".verify-danger").html(result['message']);
          $('.verify-danger').show();
          $('.verify-success').hide();
        }
      }); 
    }
  }
}