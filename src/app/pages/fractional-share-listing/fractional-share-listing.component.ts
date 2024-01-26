import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fractional-share-listing',
  templateUrl: './fractional-share-listing.component.html',
  styleUrls: ['./fractional-share-listing.component.css']
})
export class FractionalShareListingComponent implements OnInit {
  allPostdata: any;
  baseURLofAPi: any;
  CurrentUserIDD: any;
  loading = false;
  showInterestForm: FormGroup;
  recevier_user_id: any;
  constructor(public UserService: UserService, private router: Router, private FormBuilder: FormBuilder) { 
    this.baseURLofAPi = environment.baseUrl;
  }
  ionViewWillEnter() {
    this.startOfPage();
  }
  ngOnInit() {
    this.startOfPage();
  }
  startOfPage(){
    this.getAllFractionalShareListing();
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.CurrentUserIDD = parseData['id'];
    }
    this.showInterestForm = new FormGroup({
      current_user_id: new FormControl('', [Validators.required]),
      recevier_user_id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_text: new FormControl('', [Validators.required]),
      send_me_copy: new FormControl(''),
    });
  }
  getAllFractionalShareListing() {
    this.UserService.getAllFractionalShareListing().subscribe(result => {
      //console.log("result getMemberDataById: ", result);
      if (result['success'] == true) {
        this.allPostdata = (result['getData']);
      }
    });
  }
  openPopupForShowInteerest(user_id, listing_id, category_name){
    this.recevier_user_id = user_id;
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
     $('.not-logged-in').hide();
     $('.logged-in-user').show();
    }else{
      $('.not-logged-in').show();
      $('.logged-in-user').hide();
    }
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
  submitShowInterestForm() {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let emailVal = $('#email').val();
    let finalString = "";
    if (this.showInterestForm.value.name == '') {
      finalString += "Please enter name.<br>";
    }
    if (this.showInterestForm.value.email == '') {
      if (!regex.test(emailVal)) {
        finalString += "Please enter email address.<br>";
      } else {
        finalString += "Please enter valid email address.<br>";
      }
    }
    if (this.showInterestForm.value.email_text == "") {
      finalString += "Please enter email text.<br>";
    }
    if ($('#accept-terms').prop("checked") == false) {
      finalString += "Please check on checkbox of accept terms and condition.";
    }
    $(".chatWithEmailDanger").html(finalString);
    $('.chatWithEmailDanger').show();
    $('.property_head').focus();
    if(finalString == "") {
      $('.chatWithEmailDanger').hide();
      this.loading = true
      let checked_accept = document.getElementById("accept-terms")['checked'];
      if (checked_accept === true) {
        //  for user id
        let userLocalId = localStorage.getItem('userInfo');
        let parseData = JSON.parse(userLocalId);
        ////console.log("user data tttttttttt: ", parseData['id']);
        this.showInterestForm.value.current_user_id = parseData['id'];
        this.showInterestForm.value.recevier_user_id = this.recevier_user_id;

        //  for send copy of email
        let checked_semdEmailCopy = document.getElementById("sned_me_email")['checked'];
        if (checked_semdEmailCopy === true) {
          this.showInterestForm.value.send_me_copy = 'Yes';
        } else {
          this.showInterestForm.value.send_me_copy = 'No';
        }
        ////console.log("form register val : ", this.showInterestForm.value);
        this.UserService.showInterestFractionalListingEmail(this.showInterestForm.value).subscribe(result => {
          this.loading = false;
          ////console.log("result : ", result);
          if (result['success'] == true) {
            $(".chatWithEmailSuccess").html(result['message']);
            $('.chatWithEmailSuccess').show();
            $('.chatWithEmailDanger').hide();
            $('.property_head').focus();           
            location.reload();
          }
          else if (result['success'] == false) {
            $(".chatWithEmailDanger").html(result['message']);
            $('.chatWithEmailDanger').show();
            $('.chatWithEmailSuccess').hide();
            $('.property_head').focus();
          }
        });
      }
    }
  }
}
