import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
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
  selector: 'app-pmbs',
  templateUrl: './pmbs.component.html',
  styleUrls: ['./pmbs.component.css']
})
export class PmbsComponent implements OnInit {
  loading = false;
  addMembershipForm: FormGroup;
  baseURLofAPi: string;
  wepoUrl: string;
  enddateMebershipPre: any;
  startdateMebershipPre: any;
  memberShipTypePre: string;
  users = [
    { id: 'anjmao', name: 'Anjmao' },
    { id: 'varnas', name: 'Tadeus Varnas' }
  ];
  selectedUserIds: any[] = [];
  selectedWePoTitle: any;
  getAllMembersdata: any;
  createMyPortfolio: FormGroup;
  createMyPortfolio2: FormGroup;
  createMyPortfolio3: FormGroup;
  createMyPortfolio4: FormGroup;
  getCurrentUser: any;
  getBookedPostDD: any;
  PortfolioMemberCount: any;
  getMyAllPortfolioData: any;
  getAllUnSelectedUser: any;
  CurrentOpenPopupId: any;
  getRecevierdataForDelete: any[] = [];
  finalDeleteMemberArr: any[] = [];
  deleteConfirmId: any;
  getRequestForAdminApprovalData: any;
  getAdminOnePbmsData: any;
  recevierUserIdWantsAdmin: any;
  getAdminApproveProfileMemberData: any[] = [];
  Accept_Reject_Check: boolean;
  groupOwnerIdForDeleteArray: any;
  preProfessionalCardNumber: any;
  getPreProfesionalMemberData: any;
  files: any[] = [];
  upgradeMembership: FormGroup;
  property_url: any;
  // fileOver: boolean;
  @HostBinding('class.fileover') fileOver: boolean;
  //fileDropped: any;
  @Output() fileDropped = new EventEmitter<any>();
  wePoAllListing: any;
  getSelectedWePoTitlee: any;
  getItemForShowRequestForAdminList: any;
  CurrentBoxOfAdminRequest: any;
  WeCoOwnUrl: string;
  getSelectedWeCoOwnTitleee: any;
  selectedWeCoOwnTitle: any[];
  allMyCreatedPortfolio_Property: any;
  getPostMediaAllData: any;
  allMyListings_Property: any;
  selectedPropertyAllPhotos: any;
  selectedPropertyIDOfWepo: any;
  selectedPropertyNameOfWepo: any;
  FlagOfValWepoImg: any;
  selectedMyListingTitle: any[];
  getSelectedWePoTitlee3: any;
  category: any;
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
      this.category = "";
      this.files = [];
      this.selectedUserIds = [];
      this.selectedWePoTitle = [];
      this.selectedWeCoOwnTitle = [];
      this.selectedMyListingTitle = [];
      for (let ihh = 0; ihh < $('.ModalCloseClick').length; ihh++) {
        $('.ModalCloseClick')[ihh].reset();
      }
      $('.alert').hide();
    }
  }
  ngOnInit(){
    this.startOfPage();
  }
  startOfPage(){    
    $(window).scrollTop(0);
    $('.showMembershipCards').hide();
    this.property_url = "";
    this.category = "";
    this.baseURLofAPi = environment.baseUrl;
    this.wepoUrl = environment.WePoUrl;
    this.WeCoOwnUrl = environment.WeCoOwnUrl;
    this.checkAlreadymembership();
    this.getMyPortfolio();
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
    this.createMyPortfolio = new FormGroup({
      property_url: new FormControl(''),
      title: new FormControl(''),
      property_text: new FormControl(''),
      property_photos: new FormControl('')
    });
    this.createMyPortfolio2 = new FormGroup({
      property_url: new FormControl(''),
      title: new FormControl(''),
      category: new FormControl(''),
      property_text: new FormControl(''),
      property_photos: new FormControl('')
    });
    this.createMyPortfolio3 = new FormGroup({
      property_url: new FormControl(''),
      title: new FormControl(''),
      property_text: new FormControl(''),
      property_photos: new FormControl('')
    });
    this.createMyPortfolio4 = new FormGroup({
      property_url: new FormControl(''),
      title: new FormControl(''),
      property_text: new FormControl(''),
      property_photos: new FormControl('')
    });
    this.upgradeMembership = new FormGroup({
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
            this.getUserNotifications(parseData['id']);
            this.getAllVerifiedUserss([parseData['id']]);
            this.getAllWePoListing(parseData['id']);
            // this.checkUserPostId();
            if (result['getdata'].membership_type == '1') {
              this.memberShipTypePre = 'Premium';
            } else {
              this.memberShipTypePre = 'Professional';
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
          if (result['code'] === 800) {
            $(".expired_membership_msg").html('<button type="button" class="close" data-dismiss="alert">&times;</button>' + result['message']);
            $(".expired_membership_msg").show();
          } else {
            $('.expired_membership_msg').hide();
          }
        }
        $('.create-membership-form').hide();
      });
    } else {
      $('.not-logged-in').show();
      $('.logged-in-user').hide();
      $('.create-membership-form').hide();
    }
  }
  getAllWePoListing(id) {
    let dataForForm = {
      id: id
    }
    this.UserService.wePoGetAllListingForWecownPbmsGroup().subscribe(result => {
      //console.log("result of get all members wePoAllListing: ", result);
      if (result['success'] == true) {
        this.wePoAllListing = result['getData'];
      }
    });
    this.UserService.getAllMyPortFolioDataOfwepo(dataForForm).subscribe(result => {
      //console.log("result getMemberDataById allMyCreatedPortfolio_Property: ", result);
      if (result['success'] == true) {
        this.allMyCreatedPortfolio_Property = (result['getData']);
      }
    });
    this.UserService.wePogetAllUserListingByID(dataForForm).subscribe(result => {
      //console.log("result getMemberDataById: ", result);
      if (result['success'] == true) {
        this.allMyListings_Property = (result['getData']);
      }
    });
  }
  checkUserPostId() {
    let check1 = localStorage.getItem('bookPostId');
    this.getBookedPostDD = JSON.parse(check1);

    if (check1 != null) {
      if (this.getBookedPostDD.user_id == this.getCurrentUser) {
        this.getAllVerifiedUserss([this.getCurrentUser]);
        $('.samePostUserId').show();
        $('.notSamePostUserId').hide();
      } else {
        $('.samePostUserId').hide();
        $('.notSamePostUserId').show();
      }
    }
  }
  getAllVerifiedUserss(ids) {
    this.selectedUserIds = [];
    this.getAllMembersdata = [];
    this.loading = true;
    // let userLocalId = localStorage.getItem('userInfo');
    // let parseData = JSON.parse(userLocalId);
    if (ids != null) {
      let formData = {
        user_id: ids
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
  checkPbmsForm(checkVal) {
    $('.booksuccess').hide();
    $('.bookdanger').hide();
    this.category = "";
    this.files = [];
    this.selectedWePoTitle = [];
    this.selectedWeCoOwnTitle = [];
    this.selectedMyListingTitle = [];
    this.selectedUserIds = [];
    this.selectedPropertyAllPhotos = [];
    this.property_url = "";
    this.selectedPropertyIDOfWepo = "";
    this.selectedPropertyNameOfWepo = "";
    if (checkVal == 1) {
      $('.search-on-wepo-form').show();
      $('.search-on-thirdParty-form').hide();
      $('.search-my-portfolio-form').hide();
      $('.search-my-listings-form').hide();
    } else if (checkVal == 2) {
      $('.search-on-wepo-form').hide();
      $('.search-on-thirdParty-form').show();
      $('.search-my-portfolio-form').hide();
      $('.search-my-listings-form').hide();
    } else if (checkVal == 3) {
      $('.search-on-wepo-form').hide();
      $('.search-on-thirdParty-form').hide();
      $('.search-my-portfolio-form').show();
      $('.search-my-listings-form').hide();
    } else if (checkVal == 4) {
      $('.search-on-wepo-form').hide();
      $('.search-on-thirdParty-form').hide();
      $('.search-my-portfolio-form').hide();
      $('.search-my-listings-form').show();
    }
  }
  getSelectedWePoTitle(data) {
    let getData11 = data.split('-');
    this.getSelectedWePoTitlee = getData11[0];
    this.property_url = this.wepoUrl + 'listing-detail/' + getData11[2] + '%7C%7C' + getData11[1];
    this.selectedPropertyIDOfWepo = getData11[2];
    this.selectedPropertyNameOfWepo = getData11[1];
  }
  getSelectedWeCoOwnTitle(data) {
    let getData11 = data.split('-');
    this.getSelectedWeCoOwnTitleee = getData11[0];
    this.property_url = this.WeCoOwnUrl + 'listing-detail/' + getData11[2] + '%7C%7C' + getData11[1];
    this.selectedPropertyIDOfWepo = getData11[2];
    this.selectedPropertyNameOfWepo = getData11[1];
    // alert(JSON.stringify(getData11[3]))
  }
  getSelectedWePoMyListingTitle(data) {
    let getData11 = data.split('-');
    this.getSelectedWePoTitlee3 = getData11[0];
    this.property_url = this.wepoUrl + 'listing-detail/' + getData11[2] + '%7C%7C' + getData11[1];
    this.selectedPropertyIDOfWepo = getData11[2];
    this.selectedPropertyNameOfWepo = getData11[1];
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
      finalString += "Please enter CVV.<br>";
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
    $(".bookdanger123").html(finalString);
    $('.bookdanger123').show();
    // $(".bookdanger").html(finalString);
    // $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger123').hide();
      this.loading = true;
      let check1 = document.getElementById("premier-check")['checked'];
      let check2 = document.getElementById("professional-check")['checked'];
      if (check1 === true) {
        this.addMembershipForm.value.membership_type = '1'
      } else if (check2 === true) {
        this.addMembershipForm.value.membership_type = '2'
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
            $(".booksuccess123").html(result['message']);
            $('.booksuccess123').show();
            $('.bookdanger123').hide();
            location.reload();
          }
          else if (result['success'] == false) {
            $(".bookdanger123").html(result['message']);
            $('.bookdanger123').show();
            $('.booksuccess123').hide();
          }
        });
      }
    }
  }
  submitUpgradeMemberShip() {
    let finalString = "";
    let getTodayDate = new Date();
    if (this.upgradeMembership.value.Card_Type == "") {
      finalString += "Please select card type.<br>";
    }
    if (this.upgradeMembership.value.Card_Number == "") {
      finalString += "Please enter card number.<br>";
    }
    if (this.upgradeMembership.value.card_holder_name == "") {
      finalString += "Please enter card holder name.<br>";
    }
    if (this.upgradeMembership.value.cvv == "") {
      finalString += "Please enter CVV.<br>";
    }
    if (this.upgradeMembership.value.exp_month == "") {
      finalString += "Please select expiration month.<br>";
    }
    if (this.upgradeMembership.value.exp_year == "") {
      finalString += "Please select expiration year.<br>";
    }
    if (this.upgradeMembership.value.exp_year != '') {
      if (Number('20' + this.upgradeMembership.value.exp_year) < Number(getTodayDate.getFullYear())) {
        finalString += "Please select valid year.<br>";
      }
    }
    if (Number('20' + this.upgradeMembership.value.exp_year) == getTodayDate.getFullYear()) {
      if (Number(this.upgradeMembership.value.exp_month) < Number(getTodayDate.getMonth() + 1)) {
        finalString += "Please select valid expiration date.<br>";
      }
    }
    $(".bookdanger11").html(finalString);
    $('.bookdanger11').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger11').hide();
      this.loading = true;
      // let check1 = document.getElementById("premier-check11")['checked'];
      this.upgradeMembership.value.membership_type = '2'
      this.upgradeMembership.value.expiration_card_date = this.upgradeMembership.value.exp_month + '/' + this.upgradeMembership.value.exp_year
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      if (userLocalId != null) {
        this.upgradeMembership.value.user_id = parseData['id'];
        this.UserService.addmembershipUser(this.upgradeMembership.value).subscribe(result => {
          this.loading = false;
          //console.log("result of add membership: ", result);
          if (result['success'] == true) {
            $(".booksuccess11").html(result['message']);
            $('.booksuccess11').show();
            $('.bookdanger11').hide();
            location.reload();
          }
          else if (result['success'] == false) {
            $(".bookdanger11").html(result['message']);
            $('.bookdanger11').show();
            $('.booksuccess11').hide();
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
  sendBookReq() {
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
  getMyPortfolio() {
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    if (getUserId != null) {
      let dataForForm = {
        user_id: parseData['id']
      }
      this.UserService.getMyPbmsById(dataForForm).subscribe(result => {
        //console.log("result of get user portfolio oooooooooooo: ", result);
        if (result['success'] == true) {
          this.getMyAllPortfolioData = result['getData'];
          //console.log("this.getMyPortfolioName : ", this.getMyAllPortfolioData.length);
          if (this.getMyAllPortfolioData.length == 0) {
            this.getMyAllPortfolioData = null
          }
          // this.PortfolioMemberCount = 1 + (this.getMyAllPortfolioData.recevier_id.length);

          // if (this.getMyPostData.length == 0) {
          //   // $(".notFoundPost").show();
          // }
          // else {
          //   $(".notFoundPost").hide();
          // }
          ////console.log("this.getMyPostData", this.getMyPostData);
        }
        else if (result['success'] == false) {
          ////console.log("error in get user post : ", result['message']);
        }
      });
    }
  }
  checkmembership() {
    this.selectedUserIds = [];
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.loading = true;
      let dataFormm = {
        user_id: parseData['id']
      }
      this.UserService.checkUserMembership(dataFormm).subscribe(result => {
        this.loading = false;
        // //console.log("result of add membership: ", result);
        if (result['success'] == true) {
          if (result['getdata']) {
            this.getAllVerifiedUserss([parseData['id']]);
            $('.alreadymembership').show();
            $('.notAlreadymembership').hide();
          }
          else {
            $('.alreadymembership').hide();
            $('.notAlreadymembership').show();
          }
        }
        else if (result['success'] == false) {
          $('.alreadymembership').hide();
          $('.notAlreadymembership').show();          
        }
      });
    }
  }
  onFileDropped(event) {
    for (let item of event) {
      this.files.push(item)
    }
  }
  delteFile(i) {
    this.files.splice(i, 1);
  }
  // wepo all listing form
  async submitMyPortfolio() {
    //console.log("before data selcteddddddddddddddd: ", this.selectedUserIds);
    this.createMyPortfolio.value.title = this.getSelectedWePoTitlee;
    let finalString = "";
    if (this.createMyPortfolio.value.title == "" || this.createMyPortfolio.value.title == undefined) {
      finalString += "Please select title.<br>";
    }
    // if (this.createMyPortfolio.value.property_url == "") {
    //   finalString += "Please enter property URL.<br>";
    // }
    if (this.selectedUserIds == undefined) {
      finalString += "Please select members.<br>";
    }
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger').hide();
      let dataForForm = {
        id: this.selectedPropertyIDOfWepo,
        name: this.selectedPropertyNameOfWepo
      }
      // alert(JSON.stringify(dataForForm))
      await this.UserService.wePogetPostingById(dataForForm).subscribe(result => {
        //console.log("result wwww: ", result);
        if (result['success'] == true) {
          this.FlagOfValWepoImg = 1;
          let getData = result['getData'];
          // if (getData[0].property_photos.length > 1) {
          this.selectedPropertyAllPhotos = getData[0].property_photos;
          $('.bookdanger').hide();
          // this.loading = true;
          // let sendData = {
          //   property_url: this.createMyPortfolio.value.property_url,
          //   title: this.createMyPortfolio.value.title,
          //   group_creater_id: this.getCurrentUser,
          //   getAllUser: this.selectedUserIds
          // }
          // form for CREATE PBMS GROUP
          let formData = new FormData();
          if (this.selectedPropertyNameOfWepo == 'Real Estate') {
            formData.append("property_text", getData[0].executive_summary);
          } else {
            formData.append("property_text", getData[0].Description);
          }
          formData.append("category", this.selectedPropertyNameOfWepo);
          formData.append("property_url", this.createMyPortfolio.value.property_url);
          formData.append("title", this.createMyPortfolio.value.title);
          formData.append("group_creater_id", this.getCurrentUser);
          // formData.append("property_text", this.createMyPortfolio.value.property_text);
          formData.append("typeOfForm", "wepo-all-listing");
          // for (var j = 0; j < this.selectedUserIds.length; j++) {
          formData.append("getAllUser", JSON.stringify(this.selectedUserIds));
          formData.append("property_photos", JSON.stringify(this.selectedPropertyAllPhotos));
          // formData.append("property", JSON.stringify(this.selectedUserIds));
          // }
          // for (var i = 0; i < this.files.length; i++) {
          //   formData.append("all_images", this.files[i]);
          // }
          //console.log(formData.get('property_url'), " : property_url");
          //console.log(formData.get('title'), " : title");
          //console.log(formData.get('group_creater_id'), " : group_creater_id");
          //console.log(formData.get('property_text'), " : property_text");
          //console.log(formData.get('getAllUser'), " : getAllUser");
          // //console.log(formData.get('all_images'), " : all_images");
          this.SendCreateGroupData(formData);
        }
      })
    }
  }
  // third property form
  submitMyPortfolio2() {
    //console.log("before data : ", this.selectedUserIds);
    let finalString = "";
    if (this.createMyPortfolio2.value.title == "") {
      finalString += "Please enter title.<br>";
    }
    if (this.createMyPortfolio2.value.property_url == "") {
      finalString += "Please enter property URL.<br>";
    }
    if (this.createMyPortfolio2.value.category == "") {
      finalString += "Please select category.<br>";
    }
    if (this.selectedUserIds == undefined) {
      finalString += "Please select members.<br>";
    }
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger').hide();
      // this.loading = true;
      // let sendData = {
      //   property_url: this.createMyPortfolio.value.property_url,
      //   title: this.createMyPortfolio.value.title,
      //   group_creater_id: this.getCurrentUser,
      //   getAllUser: this.selectedUserIds
      // }
      // form for CREATE PBMS GROUP
      let formData = new FormData();
      formData.append("category", this.createMyPortfolio2.value.category);
      formData.append("property_url", this.createMyPortfolio2.value.property_url);
      formData.append("title", this.createMyPortfolio2.value.title);
      formData.append("group_creater_id", this.getCurrentUser);
      formData.append("property_text", this.createMyPortfolio2.value.property_text);
      formData.append("typeOfForm", "third-property");
      // for (var j = 0; j < this.selectedUserIds.length; j++) {
      formData.append("getAllUser", JSON.stringify(this.selectedUserIds));
      // }
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i]);
      }
      //console.log(this.files);
      //console.log(this.createMyPortfolio2.value);
      this.SendCreateGroupData(formData);
    }
  }
  // async getWepoListingImageById(id, name) {
  //   let dataForForm = {
  //     id: id,
  //     name: name
  //   }
  //   // alert(JSON.stringify(dataForForm))
  //   this.UserService.wePogetPostingById(dataForForm).subscribe(result => {
  //     //console.log("result wwww: ", result);
  //     if (result['success'] == true) {
  //       this.FlagOfValWepoImg = 1;
  //       let getData = result['getData'];
  //       if (getData[0].property_photos.length > 1) {
  //         this.selectedPropertyAllPhotos = getData[0].property_photos;
  //       }
  //     }
  //   })
  // }
  // my portfolio form
  async submitMyPortfolio3() {
    //console.log("before data selcteddddddddddddddd: ", this.selectedUserIds);
    this.createMyPortfolio3.value.title = this.getSelectedWeCoOwnTitleee;
    let finalString = "";
    if (this.createMyPortfolio3.value.title == "" || this.createMyPortfolio3.value.title == undefined) {
      finalString += "Please select title.<br>";
    }
    // if (this.createMyPortfolio3.value.property_url == "") {
    //   finalString += "Please enter property URL.<br>";
    // }
    if (this.selectedUserIds == undefined) {
      finalString += "Please select members.<br>";
    }
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger').hide();
      //  let xyz = await this.getWepoListingImageById(, );
      let dataForForm = {
        id: this.selectedPropertyIDOfWepo,
        name: this.selectedPropertyNameOfWepo
      }
      // alert(JSON.stringify(dataForForm))
      await this.UserService.wePogetPostingById(dataForForm).subscribe(result => {
        //console.log("result wwww: ", result);
        if (result['success'] == true) {
          this.FlagOfValWepoImg = 1;
          let getData = result['getData'];
          // if (getData[0].property_photos.length > 1) {
          this.selectedPropertyAllPhotos = getData[0].property_photos;
          //console.log("wefsdfg : ", this.selectedPropertyAllPhotos);
          $('.bookdanger').hide();
          // this.loading = true;
          // let sendData = {
          //   property_url: this.createMyPortfolio.value.property_url,
          //   title: this.createMyPortfolio.value.title,
          //   group_creater_id: this.getCurrentUser,
          //   getAllUser: this.selectedUserIds
          // }
          // form for CREATE PBMS GROUP
          let formData = new FormData();
          formData.append("category", this.selectedPropertyNameOfWepo);
          formData.append("property_url", this.createMyPortfolio3.value.property_url);
          formData.append("title", this.createMyPortfolio3.value.title);
          formData.append("group_creater_id", this.getCurrentUser);
          formData.append("property_text", this.createMyPortfolio3.value.property_text);
          formData.append("typeOfForm", "my-portfolio");
          // for (var j = 0; j < this.selectedUserIds.length; j++) {
          formData.append("property_photos", JSON.stringify(this.selectedPropertyAllPhotos));
          formData.append("getAllUser", JSON.stringify(this.selectedUserIds));
          formData.append("property", JSON.stringify(this.selectedUserIds));
          // }
          // for (var i = 0; i < this.files.length; i++) {
          //   formData.append("all_images", this.files[i]);
          // }
          // //console.log(this.files);
          // //console.log(this.createMyPortfolio3.value);
          // //console.log(this.getCurrentUser);
          // //console.log(this.selectedUserIds);
          // //console.log("all pho : ", this.selectedPropertyAllPhotos);

          //console.log(formData.get('property_url'), " : property_url");
          //console.log(formData.get('title'), " : title");
          //console.log(formData.get('group_creater_id'), " : group_creater_id");
          //console.log(formData.get('property_text'), " : property_text");
          //console.log(formData.get('getAllUser'), " : getAllUser");
          //console.log(formData.get('typeOfForm'), " : typeOfForm");
          //console.log(formData.get('property_photos'), " : property_photos");
          this.SendCreateGroupData(formData);
        }
      })
      // //console.log("xyz : ", xyz);
      // //console.log("FlagOfValWepoImg : ", this.FlagOfValWepoImg);
    }
  }
  // my listing form
  async submitMyPortfolio4() {
    //console.log("before data selcteddddddddddddddd: ", this.selectedUserIds);
    this.createMyPortfolio4.value.title = this.getSelectedWePoTitlee3;
    let finalString = "";
    if (this.createMyPortfolio4.value.title == "" || this.createMyPortfolio4.value.title == undefined) {
      finalString += "Please select title.<br>";
    }
    // if (this.createMyPortfolio4.value.property_url == "") {
    //   finalString += "Please enter property URL.<br>";
    // }
    if (this.selectedUserIds == undefined) {
      finalString += "Please select members.<br>";
    }
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger').hide();
      let dataForForm = {
        id: this.selectedPropertyIDOfWepo,
        name: this.selectedPropertyNameOfWepo
      }
      // alert(JSON.stringify(dataForForm))
      await this.UserService.wePogetPostingById(dataForForm).subscribe(result => {
        //console.log("result wwww: ", result);
        if (result['success'] == true) {
          this.FlagOfValWepoImg = 1;
          let getData = result['getData'];
          // if (getData[0].property_photos.length > 1) {
          this.selectedPropertyAllPhotos = getData[0].property_photos;
          //console.log("wefsdfg : ", this.selectedPropertyAllPhotos);
          // FOR  PROPERTY TEXT
          // this.loading = true;
          // let sendData = {
          //   property_url: this.createMyPortfolio.value.property_url,
          //   title: this.createMyPortfolio.value.title,
          //   group_creater_id: this.getCurrentUser,
          //   getAllUser: this.selectedUserIds
          // }
          // form for CREATE PBMS GROUP
          let formData = new FormData();
          if (this.selectedPropertyNameOfWepo == 'Real Estate') {
            formData.append("property_text", getData[0].executive_summary);
          } else {
            formData.append("property_text", getData[0].Description);
          }
          formData.append("category", this.selectedPropertyNameOfWepo);
          formData.append("property_url", this.createMyPortfolio4.value.property_url);
          formData.append("title", this.createMyPortfolio4.value.title);
          formData.append("group_creater_id", this.getCurrentUser);
          // formData.append("property_text", this.createMyPortfolio4.value.property_text);
          formData.append("typeOfForm", "my-listing");
          // for (var j = 0; j < this.selectedUserIds.length; j++) {
          formData.append("property_photos", JSON.stringify(this.selectedPropertyAllPhotos));
          formData.append("getAllUser", JSON.stringify(this.selectedUserIds));
          formData.append("property", JSON.stringify(this.selectedUserIds));
          // }
          // for (var i = 0; i < this.files.length; i++) {
          //   formData.append("all_images", this.files[i]);
          // }

          //console.log(formData.get('property_url'), " : property_url");
          //console.log(formData.get('title'), " : title");
          //console.log(formData.get('group_creater_id'), " : group_creater_id");
          //console.log(formData.get('property_text'), " : property_text");
          //console.log(formData.get('getAllUser'), " : getAllUser");
          // //console.log(formData.get('all_images'), " : all_images");
          this.SendCreateGroupData(formData);
        }
      })
    }
  }
  SendCreateGroupData(formData: any) {
    this.loading = true;
    this.UserService.createMyPbmsGroup(formData).subscribe(result => {
      this.loading = false;
      //console.log("result of add invitation: ", result);
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
        if (result['code'] === 901) {
          $('#myPortfolioCreateFormTag').hide();
          $('#myPortfolioCreateFormTag2').hide();
          $('#myPortfolioCreateFormTag3').hide();
          $('.upgrade-professional').show();
          this.getPreProfesionalMemberData = result['pre_membership_data'];
        }
      }
    })
  }
  goToMemberPage(val) {
    // alert(val)
    if (val === this.getCurrentUser) {
      $(location).attr('href', '/user-profile');
    } else {
      localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
      // window.open('/member-detail', '_blank');
      window.open('/member-detail','/member-detail');
      return false;
    }
  }
  OpenOneGroup(id, evt) {
    this.CurrentOpenPopupId = id;
    this.loading = true;
    let dataForm = {
      id: id
    }
    //console.log("before : ", dataForm);
    this.UserService.getOnePbmsById(dataForm).subscribe(result => {
      this.loading = false;
      //console.log("resulttttttttttttttttttt of one portfolio: ", result);
      if (result['success'] == true) {
        let getOnePortfolioData = result['getData'];
        let allArray = [];
        allArray = getOnePortfolioData['recevier_id'].map(function (val) {
          return val.user_id._id
        });
        if (evt === 1) {
          allArray.push(getOnePortfolioData['group_creater_id']._id);
          //console.log("all array : ", allArray);
          this.getAllVerifiedUserss(allArray);
        } else {
          this.groupOwnerIdForDeleteArray = {};
          this.getRecevierdataForDelete = getOnePortfolioData['recevier_id'];
          let data123 = getOnePortfolioData['recevier_id'];
          let dataForDeletemember = [];
          // for (let kkk = 0; kkk < data123.length; kkk++) {
          //   alert("in loop")
          //   if (this.getCurrentUser === data123[kkk].user_id._id && data123[kkk].is_admin === true) { 
          //     alert("iner if");
          //     this.groupOwnerIdForDeleteArray = getOnePortfolioData['group_creater_id'];
          //   }
          //   else{
          //     alert("iner else");              
          //     this.getRecevierdataForDelete.push(data123[kkk]);
          //   }
          // }
        }
      }
    });
  }
  submitAddMoremember() {
    let dataform = {
      user_id: this.getCurrentUser,
      portfolio_id: this.CurrentOpenPopupId,
      user_id_array: this.selectedUserIds
    }
    //console.log("add dataaaaaaaaaaaa : ", dataform);
    if (this.selectedUserIds != []) {
      this.UserService.addMoreMebersInGroup(dataform).subscribe(result => {
        this.loading = false;
        //console.log("result of add membership: ", result);
        if (result['success'] == true) {
          $(".booksuccess1").html(result['message']);
          $('.booksuccess1').show();
          $('.bookdanger1').hide();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".bookdanger1").html(result['message']);
          $('.bookdanger1').show();
          $('.booksuccess1').hide();
        }
      });
    }
  }
  submitRemoveMemberFromgroup() {
    let dataform = {
      portfolio_id: this.CurrentOpenPopupId,
      user_id_array: this.finalDeleteMemberArr
    }
    //console.log("finalDeleteMemberArr dataaaaaaaaaaaa : ", dataform);
    if (this.finalDeleteMemberArr != []) {
      this.UserService.DeleteMebersInGroup(dataform).subscribe(result => {
        this.loading = false;
        //console.log("result of finalDeleteMemberArr membership: ", result);
        if (result['success'] == true) {
          $(".booksuccess1").html(result['message']);
          $('.booksuccess1').show();
          $('.bookdanger1').hide();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".bookdanger1").html(result['message']);
          $('.bookdanger1').show();
          $('.booksuccess1').hide();
        }
      });
    }
  }
  DeleteSelectedArrayId(id) {
    //console.log(id);

    if ($('#' + id).hasClass('userSelected')) {
      //console.log("ifff");

      $("#" + id).removeClass("userSelected");
      let indexOfDD = this.finalDeleteMemberArr.indexOf(id);
      this.finalDeleteMemberArr.splice(indexOfDD, 1);
    } else {
      //console.log("else");

      $("#" + id).addClass("userSelected");
      this.finalDeleteMemberArr.push(id);
    }
    //console.log("this.finalDeleteMemberArr :", this.finalDeleteMemberArr);

  }
  goToUpdateStatus(id, eve, adminVal) {
    // this.Accept_Reject_Check = false;
    // let checkUserProfile11 = localStorage.getItem('userInfo');
    // let JsUserProfile11 = JSON.parse(checkUserProfile11);
    //   let userFistLastName = JsUserProfile11['firstname']+" "+JsUserProfile11['lastname'];
    //   ////console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", JsUserProfile['profile_pic']);
    //   if (JsUserProfile11['profile_pic'].length != 0) {
    //     ////console.log("profile imageeeeeeeeee");
    //     if (JsUserProfile11['profile_pic'][0].src != undefined) {
    //       ////console.log("innerrr");
    //       this.imgageOfUser = JsUserProfile11['profile_pic'][0].src;
    //     }
    //     else {
    //       this.imgageOfUser = "";
    //     }
    //     ////console.log("this.imgageOfUser", this.imgageOfUser);
    //   }
    //   else {
    //     this.imgageOfUser = "";
    //   }
    // $('#about-member-portfolio-id').append('<span class="spanForAllImageWithUsername"><a href="javascript:void(0)" target="_blank" (click)="goToMemberPage(getOnePortfolioData.sender_id._id)"><img alt="Image is loading" class="border-radious50"'+
    // 'src="{{ getOnePortfolioData.sender_id.profile_pic.length != 0 ? (baseURLofAPi+getOnePortfolioData.sender_id.profile_pic[0].src) : "../../../assets/images/user1.png" }}"'+
    // 'width="30px" height="30px">userFistLastName</a></span>');
    let checkUserProfile = localStorage.getItem('userInfo');
    let JsUserProfile = JSON.parse(checkUserProfile);
    let dataForm = {};
    if (eve === 1) {
      dataForm = {
        user_id: JsUserProfile['id'],
        action: 1,
        portfolio_id: id,
        status: 'Accept'
      }
    } else {
      dataForm = {
        user_id: JsUserProfile['id'],
        action: 1,
        portfolio_id: id,
        status: 'Reject',
      }
    }
    this.updateReadStatusPortfolio(dataForm, 1, adminVal);
  }
  updateReadStatusPortfolio(dataForm, val, adminVal) {
    this.UserService.changeStatusAndReadPbms(dataForm).subscribe(result => {
      //console.log("resulttttttttttttttttttt of update status portfolio: ", result);
      if (result['success'] == true) {
        if (val == 1) {
          location.reload();
        }
      }
    });
  }
  goToReuestForAdmin(id) {
    this.loading = true;
    let dataFormm = {
      user_id: this.getCurrentUser
    }
    this.UserService.checkUserMembership(dataFormm).subscribe(result => {
      this.loading = false;
      // //console.log("result of add membership: ", result);
      if (result['success'] == true) {
        this.loading = true;
        if (result['getdata']) {
          $('.purchaseMembershipText').hide();
          let dataForm = {
            group_id: id,
            user_id: this.getCurrentUser
          }
          this.UserService.sendRequestForBecomeAdminOfPbms(dataForm).subscribe(result => {
            this.loading = false;
            //console.log("resulttttttttttttttttttt of send request for become admin: ", result);
            if (result['success'] == true) {
              $('.sent-request-become-admin-danger').hide();
              $('.sent-request-become-admin-success').html(result['message']);
              $('.sent-request-become-admin-success').show();
              location.reload();
            }
          });
        }
      }
      else if (result['success'] == false) {
        $('.purchaseMembershipText').show();
      }
    })
  }
  goToMemberPage11(val) {
    if (val === this.getCurrentUser) {
      $(location).attr('href', '/user-profile');
    } else {
      localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
      window.open('/member-detail','/member-detail');
      return false;
    }
  }
  openDeleteConfirm(id) {
    this.deleteConfirmId = id;
  }
  confirmDeleteGroup() {
    let dataform = {
      portfolio_id: this.deleteConfirmId
    }
    this.UserService.deletedPbmsGroupById(dataform).subscribe(result => {
      this.loading = false;
      //console.log("resulttttttttttttttttttt of one portfolio: ", result);
      if (result['success'] == true) {
        $('.postDelete-danger').hide();
        $('.postDelete-success').html(result['message']);
        $('.postDelete-success').show();
        location.reload();
      }
      else {
        $('.postDelete-danger').show();
        $('.postDelete-success').hide();
      }
    });
  }
  confirmLeaveGroup() {
    let dataform = {
      portfolio_id: this.deleteConfirmId,
      user_id: this.getCurrentUser
    }
    this.UserService.memberLeaveTheGroup(dataform).subscribe(result => {
      this.loading = false;
      //console.log("resulttttttttttttttttttt of leave portfolio: ", result);
      if (result['success'] == true) {
        $('.postDelete-danger').hide();
        $('.postDelete-success').html(result['message']);
        $('.postDelete-success').show();
        location.reload();
      }
      else {
        $('.postDelete-danger').show();
        $('.postDelete-success').hide();
      }
    });
  }
  getUserNotifications(getId) {
    let dataForm = {
      user_id: getId
    }
    this.UserService.getNotifications(dataForm).subscribe(result => {
      //console.log("resulttttttttttttttttttt of notifications in secccccccccccc: ", result);
      if (result['success'] == true) {
        this.getRequestForAdminApprovalData = result['requestForAdminApproval'];
        if (this.getRequestForAdminApprovalData.length === 0) {
          $('.NoDataReqFound').show();
        }
      }
    });
  }
  openDialogAdminApproval(group_id, recevier_user_id) {
    this.loading = true;
    let dataForm = {
      id: group_id
    }
    //console.log("before : ", dataForm);
    this.UserService.getOnePbmsById(dataForm).subscribe(result => {
      this.loading = false;
      //console.log("resulttttttttttttttttttt of one portfolio: ", result);
      if (result['success'] == true) {
        this.getAdminOnePbmsData = result['getData'];
        this.recevierUserIdWantsAdmin = recevier_user_id;
        $('.showAdminApprovalBox').show();
        let getRec = this.getAdminOnePbmsData['recevier_id'];
        for (let ijk = 0; ijk < getRec.length; ijk++) {
          if (getRec[ijk].status === 'Accept') {
            // this.PortfolioMemberCount = this.PortfolioMemberCount + 1;
            this.getAdminApproveProfileMemberData.push(getRec[ijk]);
            if (getRec[ijk].user_id._id == this.getCurrentUser) {
              this.Accept_Reject_Check = false;
            }
          }
        }
      }
    });
  }
  sendResponseForBecomeAdmin(group_id, reqciver_user_id, action) {
    let dataForm = {};
    if (action === 1) {
      dataForm = {
        user_id: this.getCurrentUser,
        recevier_user_id: reqciver_user_id,
        group_id: group_id,
        status: 'Accept',
        action: 'Yes'
      }
    } else {
      dataForm = {
        user_id: this.getCurrentUser,
        recevier_user_id: reqciver_user_id,
        group_id: group_id,
        status: 'Reject',
        action: 'No'
      }
    }
    this.UserService.SendAdminAprrovalResponse(dataForm).subscribe(result => {
      // //console.log("resulttttttttttttttttttt : ", result);
      if (result['success'] == true) {
        $('.sent-request-become-admin-danger').hide();
        $('.response-become-admin-success').html(result['message']);
        $('.response-become-admin-success').show();
        location.reload();
      } else if (result['success'] == false) {
        $('.response-become-admin-success').hide();
        $('.sent-request-become-admin-danger').html(result['message']);
        $('.sent-request-become-admin-danger').show();
      }
    });
  }
  getObjectOfRecevierForShowAdminBtn(Obj) {
    let stopParam = false;
    for (let ijk = 0; ijk < Obj.length; ijk++) {
      if (Obj[ijk].invited_by_user_id == this.getCurrentUser && Obj[ijk].request_for_admin.status === 'Pending') {
        stopParam = true;
        break;
      } else {
        stopParam = false;
      }
    }
    return stopParam;
  }
  openListOfRequestForAdmin(item_id, item_user_list) {
    this.CurrentBoxOfAdminRequest = item_id;
    this.getItemForShowRequestForAdminList = item_user_list;
  }
  // for image show 
  getAllImagesOfPbmsOneGroup(index) {
    this.getPostMediaAllData = index;
    $('#carouselExample11 .carousel-item').remove();
    ////console.log("alll post imagesssssssssssssssss", index[0].src);
    index.forEach(element => {
      if (element.orgName.substring(element.orgName.lastIndexOf(".") + 1) == (("mp4") || ("MOV") || ("webm"))) {
        $('<div class="carousel-item"><video controls autoplay="autoplay" loop="loop" preload="true" volume="0" onloadedmetadata="this.muted = true" [muted]="true" playsinline src="' + (this.baseURLofAPi + element.src) + '" width="100%" style="height: 350px;"></video></div>').appendTo('#carouselExample11 .carousel-inner');
      } else {
        $('<div class="carousel-item"><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" style="height: 350px;"></div>').appendTo('#carouselExample11 .carousel-inner');
      }
      // $('<div class="carousel-item"><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" style="height: 400px;"></div>').appendTo('#carouselExample11 .carousel-inner');
    });
    $('#carouselExample11 .carousel-item').first().addClass('active');
  }
  // phtoSlider() {
  //   // for slider   
  //   this.AllUploadedPhotos.forEach(element => {
  //     $('<div class="carousel-item" ><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" height="300px"></div>').appendTo('#carouselExample .carousel-inner');
  //   });
  //   $('#carouselExample .carousel-item').first().addClass('active');
  //   // $('.carousel-indicators > li').first().addClass('active');
  // }
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    ////console.log("Drag Over");
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    ////console.log("Drag Leave");
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      ////console.log("you drop files : ", files.length);
      this.fileDropped.emit(files);
      for (let item of files) {
        this.files.push(item)
      }
    }
    ////console.log("Drag Over");
  }
  CloseMembershipModal(){
    $('#show-not-have-membership-modal').hide();
  }
   // go to booking page
   goToPbmsActions(item){
    // checkMemberShip
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
            //console.log("all admin array : ",item.all_admins);    
            let checkIsAdmin = "No";
            for (let adminLoop = 0; adminLoop < item.all_admins.length; adminLoop++) {
              if(this.getCurrentUser == item.all_admins[adminLoop].user_id){
                checkIsAdmin = 'Yes';
                break;
              }      
            }
            let BookData = {
              id: item._id,
              title: item.title,
              property_url: item.property_url,
              isAdmin: checkIsAdmin,
              allAdmin: item.all_admins,
              category: item.category,
              TotalMember: item.TotalMember,
              admindata: item.group_creater_id,
              MemberData: item.recevier_id
            }
            localStorage.setItem("SetBookData",JSON.stringify(BookData));
            this.router.navigate(['/pbms-actions']);            
          }
        }else{
          $('#show-not-have-membership-modal').show();
        }
      });
    }
  }
  GoToCreateMembershipForm(item){
    $(window).scrollTop(0);
    if (item == 1) {
      // $('#premier-check').prop('checked', true);
      document.getElementById("premier-check")['checked'] = true;
      $('.label-premier-membership').show();
      $('.label-professional-membership').hide();
    } else {
      document.getElementById("professional-check")['checked'] = true;
      $('.label-premier-membership').hide();
      $('.label-professional-membership').show();
    }
    $('.showMembershipCards').hide();
    $('.create-membership-form').show();
  }
  goToShowMembershipCards(){
    $('.ModalCloseClick')[0].reset();
    $('.bookdanger123').hide();
    $('.booksuccess123').hide();
    $('.bookdanger').hide();
    $('.create-membership-form').hide();
    $('.showMembershipCards').show();
  }
  goToOpenPropertyUrl(property_url){
    window.open(property_url, property_url);
    return false;
  }
}
