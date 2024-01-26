import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { LikeOfPostService } from '../../service/like-of-post.service'
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-posting',
  templateUrl: './book-posting.component.html',
  styleUrls: ['./book-posting.component.css']
})
export class BookPostingComponent implements OnInit {
  loading = false;
  addMembershipForm: FormGroup;
  baseURLofAPi: string;
  enddateMebershipPre: any;
  startdateMebershipPre: any;
  memberShipTypePre: string;
  users = [
    { id: 'anjmao', name: 'Anjmao' },
    { id: 'varnas', name: 'Tadeus Varnas' }
  ];
  selectedUserIds: String[];
  getAllMembersdata: any;
  getCurrentUser: any;
  getBookedPostDD: any;
  constructor(
    private UserService: UserService,
    private likeService: LikeOfPostService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    document.addEventListener('click', this.clickHandlerDoc.bind(this)); // bind on doc
  }
  clickHandlerDoc(event: any) {
    if (event.target.dataset.dismiss === "modal") {
      $('.ModalCloseClick')[0].reset();
    }
  }

  ngOnInit() {
    this.baseURLofAPi = environment.baseUrl;
    this.checkAlreadymembership();
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.getCurrentUser = parseData['id']
    }
    this.addMembershipForm = new FormGroup({
      user_id: new FormControl('', [Validators.required]),
      membership_type: new FormControl(''),
      Card_Number: new FormControl('', [Validators.required]),
      Card_Type: new FormControl('', [Validators.required]),
      card_holder_name: new FormControl('', [Validators.required, Validators.email]),
      expiration_card_date: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
      exp_month: new FormControl('', [Validators.required]),
      exp_year: new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewInit() {
    // document.getElementById("getbuyerIDD").onload = function() {
    // this.getLikeOfPost("111");
    ////console.log("valllllllllllllllllllllllllllllllllll : ", $('#getbuyerIDD').val());

    // alert($('#getbuyerIDD').val());
    // };
  }

  // getIntroYes(bio, intro_public) {
  //   if (intro_public == 'No') {
  //     alert("no")
  //     let userLocalId = localStorage.getItem('userInfo');
  //     if (userLocalId != null) {        
  //       $('#showIntroOrNot').show();
  //     } else {
  //       $('#showIntroOrNot').hide();
  //     }
  //   }
  //   else {
  //     alert("yse")
  //     $('#showIntroOrNot').show();
  //   }
  // }

  checkAlreadymembership() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      $('.not-logged-in').hide();
      $('.logged-in-user').show();
      this.loading = true;
      let dataFormm = {
        user_id: parseData['id']
      }
      this.UserService.checkUserMembership(dataFormm).subscribe(result => {
        this.loading = false;
        //console.log("result of add membership: ", result);
        if (result['success'] == true) {
          if (result['getdata']) {
            this.checkUserPostId();
            if (result['getdata'].membership_type == '1') {
              this.memberShipTypePre = 'premier';
            } else {
              this.memberShipTypePre = 'professional';
            }
            this.startdateMebershipPre = result['getdata'].membership_start_date;
            this.enddateMebershipPre = result['getdata'].membership_end_date;
            $('.alreadymembership').show();
            $('.notAlreadymembership').hide();
          }
        }
        else if (result['success'] == false) {
          $('.alreadymembership').hide();
          $('.notAlreadymembership').show();
        }
      });
    } else {
      $('.not-logged-in').show();
      $('.logged-in-user').hide();
    }
  }
  checkUserPostId() {
    let check1 = localStorage.getItem('bookPostId');
    this.getBookedPostDD = JSON.parse(check1);
    if (check1 != null) {
      if (this.getBookedPostDD.user_id == this.getCurrentUser) {
        this.getAllVerifiedUserss();
        $('.samePostUserId').show();
        $('.notSamePostUserId').hide();
      } else {
        $('.samePostUserId').hide();
        $('.notSamePostUserId').show();
      }
    }
  }
  getAllVerifiedUserss() {
    this.loading = true;
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      let formData = {
        user_id: parseData['id']
      }
      this.UserService.getAllVeirifiedUserList(formData).subscribe(result => {
        this.loading = false;
        //console.log("result of get all members: ", result);
        if (result['success'] == true) {
          this.getAllMembersdata = result['getdata'];
        }
      })
    }
  }
  checkRadio(checkVal) {
    if (checkVal == 1) {
      $('.premierVal').show();
      $('.professionalVal').hide();
    } else {
      $('.premierVal').hide();
      $('.professionalVal').show();
    }
  }
  submitMemberShip() {
    let finalString = "";
    let getTodayDate = new Date();
    if (this.addMembershipForm.value.Card_Type == "") {
      finalString += "Please select card type.<br>";
    }
    if (this.addMembershipForm.value.Card_Number == "") {
      finalString += "Please enter card number.<br>";
    }
    if (this.addMembershipForm.value.card_holder_name == "") {
      finalString += "Please enter card holder name.<br>";
    }
    if (this.addMembershipForm.value.cvv == "") {
      finalString += "Please enter cvv.<br>";
    }
    if (this.addMembershipForm.value.exp_month == "") {
      finalString += "Please select expiration month.<br>";
    }
    if (this.addMembershipForm.value.exp_year == "") {
      finalString += "Please select expiration year.<br>";
    }
    if (this.addMembershipForm.value.exp_year != '') {
      if (Number('20' + this.addMembershipForm.value.exp_year) < Number(getTodayDate.getFullYear())) {
        finalString += "Please select valid year.<br>";
      }
    }
    if (Number('20' + this.addMembershipForm.value.exp_year) == getTodayDate.getFullYear()) {
      if (Number(this.addMembershipForm.value.exp_month) < Number(getTodayDate.getMonth() + 1)) {
        finalString += "Please select valid expiration date.<br>";
      }
    }
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger').hide();
      this.loading = true;
      let check1 = document.getElementById("premier-check")['checked'];
      let check2 = document.getElementById("professional-check")['checked'];
      if (check1 === true) {
        this.addMembershipForm.value.membership_type = '1'
      } else if (check2 === true) {
        this.addMembershipForm.value.user_id = '2'
      }
      this.addMembershipForm.value.expiration_card_date = this.addMembershipForm.value.exp_month + '/' + this.addMembershipForm.value.exp_year
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      if (userLocalId != null) {
        this.addMembershipForm.value.user_id = parseData['id'];
        this.UserService.addmembershipUser(this.addMembershipForm.value).subscribe(result => {
          this.loading = false;
          //console.log("result of add membership: ", result);
          if (result['success'] == true) {
            $(".booksuccess").html(result['message']);
            $('.booksuccess').show();
            $('.bookdanger').hide();
            location.reload();
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
  sendInvitation() {
    this.loading = true;
    let sendData = {
      post_id: this.getBookedPostDD.post_id,
      sender_id: this.getCurrentUser,
      getAllUser: this.selectedUserIds
    }
    this.UserService.sendInvitationForBookPost(sendData).subscribe(result => {
      this.loading = false;
      //console.log("result of add invitation: ", result);
      if (result['success'] == true) {
        $(".inviteSuccess").html(result['message']);
        $('.inviteSuccess').show();
        $('.inviteDanger').hide();
        // location.reload();
      }
      else if (result['success'] == false) {
        $(".inviteDanger").html(result['message']);
        $('.inviteDanger').show();
        $('.inviteSuccess').hide();
      }
    })
  }
  sendBookReq(){
    this.loading = true;
    let sendData = {
      post_id: this.getBookedPostDD.post_id,
      sender_id: this.getCurrentUser,
      recevier_id: this.getBookedPostDD.user_id
    }
    this.UserService.sendRequestForBookPost(sendData).subscribe(result => {
      this.loading = false;
      //console.log("result of add invitation: ", result);
      if (result['success'] == true) {
        $(".bookReqSuccess").html(result['message']);
        $('.bookReqSuccess').show();
        $('.bookReqDanger').hide();
        // location.reload();
      }
      else if (result['success'] == false) {
        $(".bookReqDanger").html(result['message']);
        $('.bookReqDanger').show();
        $('.bookReqSuccess').hide();
      }
    })
  }
}