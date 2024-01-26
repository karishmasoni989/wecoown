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
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  loading = false;
  MemberIdURL: string;
  addMembershipForm: FormGroup;
  getMemberData: any;
  getMyPostData: any;
  AllUploadedPhotos: any[] = [];
  BuyerUserID: any;
  sendMsgForm: FormGroup;
  BuyerData: any;
  showInterestForm: FormGroup;
  getOnePostData: any;
  getLikeCount: any;
  getLikePostData: any;
  getCommentCount: any;
  getPostMediaData: any;
  getCommentPostData: any;
  getOneMediaPostData: any;
  getMediaLikePostData: any;
  getMediaCommentPostData: any;
  getMediaLikeCount: any;
  getMediaCommentCount: any;
  getPostMediaAllData: any;
  getCurrentMediaPhotoID: any;
  LIkeWIsh: any;
  LikeDataArray: any;
  getwishdata: any;
  LikeStorage: any;
  LikeId: any;
  ionicColor: string = "grey";
  ionicNamedColor: string = "yellow";
  likeAction: any;
  MediaLikeStorage: any;
  MediaLikeId: any;
  MedialikeAction: any;
  MediaIDD: any;
  baseURLofAPi: string;
  showIntroIfLogin: string;
  memberShipTypePre: string;
  startdateMebershipPre: any;
  enddateMebershipPre: any;
  showInterestPostId: any;
  showInterestPostCategory: any;
  NoCohort = false;
  isentCohort = false;
  showCohortButton = false;
  iacceptCohort = false;
  userNotLoginShowCohortButton = false;
  currentCohortReqId: any;
  getAllMyUserCohorts: any;
  user_email = "";
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
      $('.alert').hide();
    }
  }
  ionViewWillEnter() {
    this.startOfPage();
  }
  ngOnInit() {
    this.startOfPage();
  }
  startOfPage() {
    this.baseURLofAPi = environment.baseUrl;
    $('#loader').hide();
    this.wishlist();
    this.wishlistMedia();
    let checValll = localStorage.getItem('GoTomemberSearchPage');
    let getParamsId = JSON.parse(checValll);

    ////console.log("getParamsId : ", getParamsId[1].path);
    this.MemberIdURL = getParamsId;
    this.getMemberDataById();
    this.getMyPost();
    this.getCategoryPhotos();
    this.sendMsgForm = new FormGroup({
      current_user_id: new FormControl('', [Validators.required]),
      buyer_user_id: new FormControl(''),
      chatmsg: new FormControl('', [Validators.required])
    });
    this.showInterestForm = new FormGroup({
      current_user_id: new FormControl('', [Validators.required]),
      buyer_user_id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_text: new FormControl('', [Validators.required]),
      send_me_copy: new FormControl(''),
    });
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId != null) {
      this.showIntroIfLogin = 'Yes';
      let parseData = JSON.parse(userLocalId);
      this.user_email = parseData['email'];
      this.getCurrentUserHadCohortsOrNot(parseData['id'], this.MemberIdURL);
    } else{
      this.NoCohort = true;
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
    this.getAllMyCohort(this.MemberIdURL);
  }
  getAllMyCohort(MemberIdURL) {
    let dataForm = {
      my_id: MemberIdURL
    }
    this.UserService.getAllCohortsByUserId(dataForm).subscribe(result => {
      console.log("getAllMyUserCohorts: ", result);
      if (result['getAllCohort'].length == 1) {
        this.getAllMyUserCohorts = result['getAllCohort'][0].all_cohorts_user_id;
      }
    });
  }
  getCurrentUserHadCohortsOrNot(current_user_id, receiver_id) {
    let dataForForm = {
      user_id: current_user_id,
      receiver_id: receiver_id
    }
    this.UserService.getOneUserHadCohortsOrNot(dataForForm).subscribe(result => {
      console.log("result getOneUserHadCohortsOrNot : ", result);
      if (result['success'] == true) {
        if (result['checkPreviousRequest'].length > 0) {
          if (result['checkPreviousRequest'][0].status === 'Pending') {
            if (result['checkPreviousRequest'][0].sender_id == current_user_id) {
              this.isentCohort = true;
              this.iacceptCohort = false;
            } else {
              this.isentCohort = false;
              this.iacceptCohort = true;
              this.currentCohortReqId = result['checkPreviousRequest'][0]._id;
            }
          } else if (result['checkPreviousRequest'][0].status === "Accept") {
            this.showCohortButton = true;
            this.NoCohort = false;
            this.isentCohort = false;
            this.iacceptCohort = false;
          }
        } else {
          //console.log("outer else");
          this.NoCohort = true;
          this.isentCohort = false;
          this.iacceptCohort = false;
        }
      }
      else if (result['success'] == false) {
        this.NoCohort = true;
        this.isentCohort = false;
        this.iacceptCohort = false;
      }
    });
  }
  ngAfterViewInit() {
    // document.getElementById("getbuyerIDD").onload = function() {
    // this.getLikeOfPost("111");
    ////console.log("valllllllllllllllllllllllllllllllllll : ", $('#getbuyerIDD').val());

    // alert($('#getbuyerIDD').val());
    // };
  }

  getMemberDataById() {
    let dataForForm = {
      id: this.MemberIdURL
    }
    this.UserService.getUserDataById(dataForForm).subscribe(result => {
      ////console.log("result : ", result);
      if (result['success'] == true) {
        this.getMemberData = result['getData'];
        ////console.log("member data : ", this.getMemberData);
        // this.getIntroYes(this.getMemberData.bio, this.getMemberData.intro_public)
      }
      else if (result['success'] == false) {
        $(".verify-danger").html(result['message']);
        $('.verify-danger').show();
        $('.verify-success').hide();
      }
    });
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

  getMyPost() {
    // for check user logged in or not
    let checkUserProfilee = localStorage.getItem('userInfo');
    let LoginCheckArray = ['Public'];
    let currentLoginUserId = "";
    if (checkUserProfilee != null) {
      let parseData = JSON.parse(checkUserProfilee);
      currentLoginUserId = parseData['id'];
    }
    let dataForForm = {
      user_id: this.MemberIdURL,
      showPostToUser: LoginCheckArray,
      currentLoginUserId: currentLoginUserId
    }
    this.UserService.getUserAndCohortAllPostById(dataForForm).subscribe(result => {
      //console.log("result of get user postttttttttttttttttttttttttt : ", result);
      if (result['success'] == true) {
        this.getMyPostData = result['BuyerData'];
        this.getPostMediaData = this.groupBy(result['postMediaData'], "post_id");
        ////console.log("this.getPostMediaData mediaa : ", this.getPostMediaData);
        if (this.getMyPostData.length == 0) {
          $(".notFoundPost").show();
        }
        else {
          $(".notFoundPost").hide();
        }
        ////console.log("this.getMyPostData", this.getMyPostData);
      }
      else if (result['success'] == false) {
        ////console.log("error in get user post : ", result['message']);
      }
    });
  }

  groupBy(list, props) {
    return list.reduce((a, b) => {
      (a[b[props]] = a[b[props]] || []).push(b);
      return a;
    }, {});
  }

  getCategoryPhotos() {
    let dataForForm = {
      user_id: this.MemberIdURL
    }
    this.UserService.getUserAllPhotos(dataForForm).subscribe(result => {
      ////console.log("result of get Category Photos: ", result);
      if (result['success'] == true) {
        if (result['getdata']) {
          let array = result['getdata'];
          array.forEach(element => {
            for (let index = 0; index < element.property_photos.length; index++) {
              this.AllUploadedPhotos.push(element.property_photos[index]);
            }
          });
          this.phtoSlider();
        }
        ////console.log('this.AllUploadedPhotos', this.AllUploadedPhotos);
      }
      else if (result['success'] == false) {
        ////console.log("result['message']", result['message']);
      }
    });
  }

  phtoSlider() {
    // for slider   
    this.AllUploadedPhotos.forEach(element => {
      $('<div class="carousel-item" ><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" height="300px"></div>').appendTo('#carouselExample .carousel-inner');
    });
    $('#carouselExample .carousel-item').first().addClass('active');
    // $('.carousel-indicators > li').first().addClass('active');
  }

  FindUserLoggedIn() {
    let checkUserProfilee = localStorage.getItem('userInfo');
    ////console.log("local user profile : ", JSON.stringify(checkUserProfilee));
    if (checkUserProfilee != null) {
      // $('#sellerHome').hide();
      $('.logged-in-user').show();
      $('.not-logged-in').hide();
    }
    else {
      $('.logged-in-user').hide();
      $('.not-logged-in').show();
    }
  }

  saveInterestData(buyerDId, newBuyerId, newbuyerName) {
    this.BuyerUserID = buyerDId,
      this.showInterestPostId = newBuyerId;
    this.showInterestPostCategory = newbuyerName;

    //console.log("this.BuyerUserID", this.BuyerUserID);
  }

  // submitSendMsgForm() {
  //   let chatmsg = $('#chatmsg').val();
  //   if (chatmsg == '' || chatmsg == undefined) {
  //     $('#chatmsg').focus();
  //     $(".chatDanger").html("Please enter chat message.");
  //     $('.chatDanger').show();
  //   } else {
  //     $('.chatDanger').hide();
  //     let userLocalId = localStorage.getItem('userInfo');
  //     let parseData = JSON.parse(userLocalId);
  //     this.sendMsgForm.value.current_user_id = parseData['id'];
  //     this.sendMsgForm.value.buyer_user_id = this.BuyerData[0]._id;

  //     let formData = new FormData();
  //     formData.append("user_id", parseData['id']);
  //     formData.append("buyer_id", this.BuyerData[0]._id);
  //     formData.append("chat_message", chatmsg);

  //     this.UserService.chatMessage(formData).subscribe(result => {
  //       ////console.log("result : ", result);
  //       if (result['success'] == true) {
  //         $(".chatSuccess").html(result['message']);
  //         $('.chatSuccess').show();
  //         $('.chatDanger').hide();
  //         location.reload();
  //       }
  //       else if (result['success'] == false) {
  //         $(".chatDanger").html(result['message']);
  //         $('.chatSuccess').hide();
  //         $('.chatDanger').show();
  //       }
  //     });
  //   }
  // }

  submitSendMsgForm() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    this.sendMsgForm.value.current_user_id = parseData['id'];
    this.sendMsgForm.value.buyer_user_id = this.BuyerUserID;
    let dataForForm = {
      user_id: parseData['id'],
      buyer_id: this.MemberIdURL,
      property_id: this.showInterestPostId,
    }
    //console.log("form data: ", dataForForm);
    this.UserService.CreateChat(dataForForm).subscribe(result => {
      //console.log("result : ", result);
      if (result['success'] == true) {
        if (result['chat_id']) {
          let setVar = {
            chat_id: result['chat_id'],
            recevier_id: this.MemberIdURL
          }
          localStorage.setItem('CurrentChatToBeOpen', JSON.stringify(setVar));
        }
        location.href = '/chat-message?FromOther=yes';
      }
    });
  }

  submitShowInterestForm() {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let emailVal = $('#email').val();
    if ($('#name').val() == '' && ($('#email').val() == '' || !regex.test(emailVal)) && $('#email_text').val() == '') {
      $('#email_text').focus();
      $('#email').focus();
      $('#name').focus();
      $(".chatWithEmailDanger").html("Please enter name.<br>Please enter email address.<br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#name').val() == '' && ($('#email').val() == '' || !regex.test(emailVal))) {
      $('#email').focus();
      $('#name').focus();
      $(".chatWithEmailDanger").html("Please enter name.<br>Please enter email address.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#name').val() == '' && $('#email_text').val() == '') {
      $('#email_text').focus();
      $('#name').focus();
      $(".chatWithEmailDanger").html("Please enter name.<br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#name').val() == '') {
      $('#email_text').focus();
      $('#name').focus();
      $(".chatWithEmailDanger").html("Please enter name.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#email').val() == '' && $('#email_text').val() == '') {
      $('#email_text').focus();
      $('#email').focus();
      $(".chatWithEmailDanger").html("Please enter email address.<br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#email').val() == '') {
      $('#email').focus();
      $(".chatWithEmailDanger").html("Please enter email address.");
      $('.chatWithEmailDanger').show();
    }
    else if (!regex.test(emailVal) && $('#email_text').val() == '') {
      $('#email_text').focus();
      $('#email').focus();
      $(".chatWithEmailDanger").html("Please enter valid email address. <br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if (!regex.test(emailVal)) {
      $('#email').focus();
      $(".chatWithEmailDanger").html("Please enter valid email address.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#email_text').val() == "") {
      $('#email_text').focus();
      $(".chatWithEmailDanger").html("Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#accept-terms').prop("checked") == false) {
      $(".chatWithEmailDanger").html("Please check on checkbox of accept terms and condition.");
      $('.chatWithEmailDanger').show();
    }
    else {
      $('.chatWithEmailDanger').hide();
      let checked_accept = document.getElementById("accept-terms")['checked'];
      if (checked_accept === true) {
        //  for user id
        let userLocalId = localStorage.getItem('userInfo');
        let parseData = JSON.parse(userLocalId);
        ////console.log("user data tttttttttt: ", parseData['id']);
        this.showInterestForm.value.current_user_id = parseData['id'];
        this.showInterestForm.value.buyer_user_id = this.BuyerUserID;

        //  for send copy of email
        let checked_semdEmailCopy = document.getElementById("sned_me_email")['checked'];
        if (checked_semdEmailCopy === true) {
          this.showInterestForm.value.send_me_copy = 'Yes';
        } else {
          this.showInterestForm.value.send_me_copy = 'No';
        }
        ////console.log("form register val : ", this.showInterestForm.value);
        this.UserService.showInterestUser(this.showInterestForm.value).subscribe(result => {
          ////console.log("result : ", result);
          if (result['success'] == true) {
            $(".chatWithEmailSuccess").html(result['message']);
            $('.chatWithEmailSuccess').show();
            $('.chatWithEmailDanger').hide();
            // let check111 =  localStorage.removeItem('userInfo');
            //  window.location.replace("http://stackoverflow.com");
            //  this.AppComponent.userProfileHide();
            location.reload();
            //  $(location).attr('href', '/')
            //  this.router.navigate(['/']);
          }
          else if (result['success'] == false) {
            $(".chatWithEmailDanger").html(result['message']);
            $('.chatWithEmailDanger').show();
            $('.chatWithEmailSuccess').hide();
          }
        });
      }
    }
  }
  // for like and comment
  postLikeShare(A_type, post_idd) {
    if (A_type === 2) {
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      let getComment = $('#send-comment-post').val();
      if ($('#send-comment-post').val() == '') {
        $('#send-comment-post').focus();
        $(".send-comment-danger").html("Please enter comment text.");
        $('.send-comment-danger').show();
      } else {
        ////console.log("rrrrrrrrrrrrrrrrrr : ", parseData['profile_pic'].length);
        let imageOfUser;
        if (parseData['profile_pic'].length == 0) {
          imageOfUser = '/assets/images/user1.png'
        } else {
          imageOfUser = parseData['profile_pic'][0].src
        }
        $("#appendMessage").append("<span style='display: flex; margin-bottom: 10px;'><img alt='Image is loading' width='30px' height='30px' style='float: left; border-radius: 50%;' src='" + (this.baseURLofAPi + imageOfUser) + "'> <span style='border-radius: 5px; padding: 5px; background: #efefef; float: left;margin-left: 3px;' > "
          + "<strong><a href=''>" + parseData['firstname'] + "&nbsp;" + parseData['lastname'] + "</a></strong>&nbsp;"
          + getComment + " </span></span>");

        $('.send-comment-danger').hide();
        this.getCommentCount = this.getCommentCount + 1;
        let dataForForm = {
          post_id: post_idd,
          user_id: parseData['id'],
          action_type: '2',
          comment_text: $('#send-comment-post').val()
        }
        this.CommonOnePostLikeComment(dataForForm);
        $('#send-comment-post').val('');
      }
    }
  }

  MediapostLikeShare(A_type, post_idd, media_id) {
    ////console.log('MediapostLikeShare : ', media_id);
    if (A_type === 1) {
      ////console.log("media likeeeeeeeeeee : ");
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      let dataForForm = {
        post_id: post_idd,
        user_id: parseData['id'],
        action_type: '1',
        post_media_id: media_id
      }
      this.CommonOnePostLikeComment(dataForForm);
    }
    else if (A_type === 2) {
      ////console.log("media comment : ");
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      let getComment = $('#send-media-comment-post').val();
      if ($('#send-media-comment-post').val() == '') {
        $('#send-media-comment-post').focus();
        $(".send-comment-danger").html("Please enter comment text.");
        $('.send-comment-danger').show();
      } else {
        ////console.log("rrrrrrrrrrrrrrrrrr : ", parseData['profile_pic'].length);
        let imageOfUser;
        if (parseData['profile_pic'].length == 0) {
          imageOfUser = '/assets/images/user1.png'
        } else {
          imageOfUser = parseData['profile_pic'][0].src
        }
        $("#appendMessageMedia").append("<span style='display: flex; margin-bottom: 10px;'><img alt='Image is loading' width='30px' height='30px' style='float: left; border-radius: 50%;' src='" + (this.baseURLofAPi + imageOfUser) + "'> <span style='border-radius: 5px; padding: 5px; background: #efefef; float: left;margin-left: 3px;' > "
          + "<strong><a href=''>" + parseData['firstname'] + "&nbsp;" + parseData['lastname'] + "</a></strong>&nbsp;"
          + getComment + " </span></span>");

        $('.send-comment-danger').hide();
        this.getMediaCommentCount = this.getMediaCommentCount + 1;
        let dataForForm = {
          post_id: post_idd,
          user_id: parseData['id'],
          action_type: '2',
          comment_text: $('#send-media-comment-post').val(),
          post_media_id: media_id
        }
        this.CommonOnePostLikeComment(dataForForm);
        $('#send-media-comment-post').val('');
      }
    }
  }

  CommonOnePostLikeComment(dataForForm) {
    ////console.log("calll methodddddddddd");
    this.UserService.BuyerPostLikeComment(dataForForm).subscribe(result => {
      ////console.log("result of post like : ", result);
      if (result['success'] == true) {
        ////console.log("success in post like : ", result['message']);
      }
      else if (result['success'] == false) {
        ////console.log("error in get user post : ", result['message']);
      }
    });
  }

  getPostImageArrayy(index) {
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId != null) {
      this.getPostMediaAllData = index;
      $('#carousel-one-post .carousel-item').remove();
      ////console.log("alll post imagesssssssssssssssss", index[0].src);
      index.forEach(element => {
        if (element.name.substring(element.name.lastIndexOf(".") + 1) == (("mp4") || ("MOV") || ("webm"))) {
          $('<div class="carousel-item"><video controls autoplay="autoplay" loop="loop" preload="true" volume="0" onloadedmetadata="this.muted = true" [muted]="true" playsinline src="' + (this.baseURLofAPi + element.src) + '" style="-webkit-flex-shrink:0; max-width: 100%; object-fit: contain; max-height: 100%;"></video></div>').appendTo('#carousel-one-post .carousel-inner');
        } else {
          $('<div class="carousel-item"><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" style="-webkit-flex-shrink:0; max-width: 100%; object-fit: contain; max-height: 100%;"></div>').appendTo('#carousel-one-post .carousel-inner');
        }
        // $('<div class="carousel-item"><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" style="height: 400px;"></div>').appendTo('#carousel-one-post .carousel-inner');
      });
      $('#carousel-one-post .carousel-item').first().addClass('active');
    } else {
      $('#show-not-login-model').show();
    }
  }

  getPostDataAndLike(post_idd) {
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId != null) {
      this.loading = true;
      this.wishlist();
      this.wishlistMedia();
      $('#appendMessage').html("");
      $('#send-comment-post').val('');
      if (post_idd != "") {
        let dataForForm = {
          post_id: post_idd
        }
        this.UserService.getOnePostById(dataForForm).subscribe(result => {
          ////console.log("result of one post : ", result);
          if (result['success'] == true) {
            this.getOnePostData = result['BuyerData'];
          }
          else if (result['success'] == false) {
            ////console.log("error in get user post : ", result['message']);
          }
        });
        this.UserService.getPostLikeComment(dataForForm).subscribe(result => {
          this.loading = false;
          ////console.log("result of like post : ", result);
          if (result['success'] == true) {
            this.getLikePostData = result['likeData'];
            this.getCommentPostData = result['CommentData'];
            this.getLikeCount = result['likeCount'];
            this.getCommentCount = result['CommentCount'];
          }
          else if (result['success'] == false) {
            ////console.log("error in get user post : ", result['message']);
          }
        });
      }
    } else {
      $('#show-not-login-model').show();
    }
  }

  getPostAndMediaData(buyerDataId, allPostImageId) {
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId != null) {
      this.loading = true;
      $('#appendMessageMedia').html("");
      $('#send-media-comment-post').val('');
      this.wishlist();
      this.wishlistMedia();
      this.checkProductMedia(buyerDataId, allPostImageId, '1')
      this.getCurrentMediaPhotoID = allPostImageId;
      if (buyerDataId != "" && allPostImageId != "") {
        let dataForForm = {
          post_id: buyerDataId
        }
        let formForMediaLike = {
          post_id: buyerDataId,
          post_media_id: allPostImageId
        }
        this.UserService.getOnePostById(dataForForm).subscribe(result => {
          ////console.log("result of one post in media : ", result);
          if (result['success'] == true) {
            this.getOnePostData = result['BuyerData'];
            ////console.log("inner : ", this.getOnePostData.category);
          }
          else if (result['success'] == false) {
            ////console.log("error in get user post : ", result['message']);
          }
        });
        this.UserService.getPostMediaLikeComment(formForMediaLike).subscribe(result => {
          this.loading = false;
          ////console.log("result of like post in mediaaaaaaaaaaaaaaaa : ", result);
          if (result['success'] == true) {
            this.getMediaLikePostData = result['medialikeData'];
            this.getMediaCommentPostData = result['mediaCommentData'];
            this.getMediaLikeCount = result['medialikeCount'];
            this.getMediaCommentCount = result['mediaCommentCount'];
          }
          else if (result['success'] == false) {
            ////console.log("error in get user post : ", result['message']);
          }
        });
      }
    } else {
      $('#show-not-login-model').show();
    }
  }
  // for only post like
  wishlist() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      let dataFormm = {
        user_id: parseData['id']
      }
      this.UserService.loadLikeOfUser(dataFormm).subscribe(result => {
        ////console.log("result of like wish : ", result);
        localStorage.setItem('LikeDataData', JSON.stringify(result['LikeDataByUserId']));
      });
    }

    // this.homeService.loadwishlist(this.userObject.id).subscribe(data => {
    //   this.wish = data;
    //   this.getwishdata = this.wish.data;
    //   localStorage.setItem('wishListData', JSON.stringify(this.wish));
    //   this.wishArray = this.wish.data;
    // });
  }
  checkProduct(id, action_type) {

    this.LikeStorage = JSON.parse(localStorage.getItem('LikeDataData'));
    if (!this.LikeStorage) {
      return false;
    }
    // ////console.log("this.LikeStorage : ",this.LikeStorage);

    for (let w of this.LikeStorage) {
      // ////console.log("w idddddddddd : ",w);      
      this.LikeId = w.post_id;
      this.likeAction = w.action_type;
      // ////console.log(id == this.LikeId);
      // ////console.log(action_type == this.likeAction);

      if (id == this.LikeId && action_type == this.likeAction) {
        // ////console.log("ifffff conditoion of like wishhhhhhhhh");        
        this.ionicColor = 'primary'
        return true;
      }
    }
    return false;
  }
  toggleNamedColor(event, productid, action_type) {
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId != null) {
      if (event.target.className == "btn width-Like UnlikeBtnn fa fa-thumbs-o-up") {
        this.getLikeCount = this.getLikeCount + 1;
      } else if (event.target.className == "btn width-Like fb-btn-like likeBUtton fa fa-thumbs-up") {
        if (this.getLikeCount > 0) {
          this.getLikeCount = this.getLikeCount - 1;
        }
      }
      this.likeService.toggleNamedColor(event, productid, action_type);
    } else {
      $('#show-not-login-model').show();
    }
  }

  // for media post like
  wishlistMedia() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      let dataFormm = {
        user_id: parseData['id']
      }
      this.UserService.loadMediaLikeOfUser(dataFormm).subscribe(result => {
        ////console.log("result of media like wish : ", result);
        localStorage.setItem('MediaLikeData', JSON.stringify(result['MediaLikeDataByUserId']));
      });
    }
  }
  checkProductMedia(id, post_media_id, action_type) {
    this.MediaLikeStorage = JSON.parse(localStorage.getItem('MediaLikeData'));
    if (!this.MediaLikeStorage) {
      return false;
    }
    // ////console.log("this.LikeStorage : ",this.LikeStorage);

    for (let w of this.MediaLikeStorage) {
      // ////console.log("w idddddddddd : ",w);      
      this.MediaLikeId = w.post_id;
      this.MedialikeAction = w.action_type;
      this.MediaIDD = w.post_media_id;
      if (id == w.post_id && action_type == w.action_type && post_media_id == w.post_media_id) {
        ////console.log("ifffff conditoion of mediaaaaaaaaa like wishhhhhhhhh");
        this.ionicColor = 'primary'
        return true;
      }
    }
    return false;
  }
  toggledMediaColor(event, productid, post_media_id, action_type) {
    // let userLocalId = localStorage.getItem('userInfo');
    // let parseData = JSON.parse(userLocalId);
    // ////console.log("rrrrrrrrrrrrrrrrrr : ", parseData['profile_pic'].length);
    // let imageOfUser;
    // if (parseData['profile_pic'].length == 0) {
    //   imageOfUser = '/assets/images/user1.png'
    // } else {
    //   imageOfUser = parseData['profile_pic'][0].src
    // }
    // $("#media-like-data-list").append("<img alt="Image is loading" width='30px' style='float: left; border-radius: 50%;' src='" + imageOfUser + "'> <span style='border-radius: 5px; padding: 5px; background: #efefef; float: left;margin-left: 3px;' > "
    //   + "<strong><a href=''>" + parseData['firstname'] + "&nbsp;" + parseData['lastname'] + "</a></strong></span><br><br>");
    if (event.target.className == "btn width-Like UnlikeBtnn fa fa-thumbs-o-up") {
      this.getMediaLikeCount = this.getMediaLikeCount + 1;
    } else if (event.target.className == "btn width-Like fb-btn-like likeBUtton fa fa-thumbs-up") {
      if (this.getMediaLikeCount > 0) {
        this.getMediaLikeCount = this.getMediaLikeCount - 1;
      }
    }
    this.likeService.toggledMediaColor(event, productid, post_media_id, action_type);
  }
  checkAlreadymembership() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.loading = true;
      let dataFormm = {
        user_id: parseData['id']
      }
      this.UserService.checkUserMembership(dataFormm).subscribe(result => {
        this.loading = false;
        //console.log("result of add membership: ", result);
        if (result['success'] == true) {
          if (result['getdata']) {
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
  goToBooking(id, user_id) {
    let data = {
      post_id: id,
      user_id: user_id
    }
    localStorage.setItem("bookPostId", JSON.stringify(data));
    location.href = "/book-posting";
  }
  closeLoginModel(item) {
    $('.modal-backdrop').remove();
    $('#show-not-login-model').hide();
    if (item == 1) {
      this.router.navigate(['/login']);
    }
  }
  GoToSharePosting() {
    $('#show-not-login-model').show();
  }
  addUserToCohorts() {
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId === null || userLocalId === undefined) {
      // show login message to user
      $('.cohortDanger').html('You are not logged in. You must first login for more information.');
      $('.cohortDanger').show();
    } else {
      this.loading = true;
      let parseData = JSON.parse(userLocalId);
      this.sendMsgForm.value.current_user_id = parseData['id'];
      let dataForForm = {
        sender_id: parseData['id'],
        receiver_id: this.MemberIdURL
      }
      this.UserService.sendRequestForCohorts(dataForForm).subscribe(result => {
        this.loading = false;
        //console.log("result getOneUserHadCohortsOrNot : ", result);
        if (result['success'] == true) {
          this.NoCohort = false;
          this.isentCohort = true;
          this.iacceptCohort = false;
        }
        else if (result['success'] == false) {
          this.NoCohort = true;
          this.isentCohort = false;
          this.iacceptCohort = false;
        }
      });
    }
  }
  sendResponseOfCohortRequest(action) {
    // for accept request
    if (action === 1) {
      // update cohort request to action
      let dataForForm = {
        request_id: this.currentCohortReqId,
        action: 'Accept'
      }
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      let dataForCreateCohort = {
        my_id: parseData['id'],
        receiver_id: this.MemberIdURL
      }
      this.loading = true;
      this.UserService.createUserCohortConnection(dataForCreateCohort).subscribe(result => {
        this.loading = false;
        //console.log("result createUserCohortConnection : ", result);
        if (result['success'] == true) {
          this.showCohortButton = true;
          this.NoCohort = false;
          this.isentCohort = false;
          this.iacceptCohort = false;
          this.updateAcceptRejectRequestCohort(dataForForm);
        }
        else if (result['success'] == false) {
          this.NoCohort = true;
          this.isentCohort = false;
          this.iacceptCohort = false;
        }
      });
    } else if (action === 2) {
      let dataForForm = {
        request_id: this.currentCohortReqId,
        action: 'Reject'
      }
      this.updateAcceptRejectRequestCohort(dataForForm);
      this.NoCohort = true;
      this.isentCohort = false;
      this.iacceptCohort = false;
    }
  }
  updateAcceptRejectRequestCohort(data) {
    this.loading = true;
    this.UserService.setAcceptRejectResponseToCohort(data).subscribe(result => {
      this.loading = false;
      location.reload();
      //console.log("accept or reject req : ", result);
    });
  }
  goToOpenAllCohortPage() {
    localStorage.setItem('GoToMyCohortPage', JSON.stringify(this.MemberIdURL));
    this.router.navigate(['/all-cohort']);
  }
  goToMemberPage(val) {
    if (val === this.MemberIdURL) {
      $(location).attr('href', '/user-profile');
    } else {
      localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
      window.open('/member-detail','/member-detail');
      return false;
    }
  }
  unfriendCohort(){
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    let dataForCreateCohort = {
      my_id: parseData['id'],
      receiver_id: this.MemberIdURL
    }
    this.loading = true;
    this.UserService.unfriendCohortUser(dataForCreateCohort).subscribe(result => {
      this.loading = false;
      console.log("result createUserCohortConnection : ", result);
      if (result['success'] == true) {
        this.showCohortButton = false;
        this.NoCohort = true;
        this.isentCohort = false;
        this.iacceptCohort = false;
        location.reload();
      }
      else if (result['success'] == false) {
        this.showCohortButton = true;
        this.NoCohort = true;
        this.isentCohort = false;
        this.iacceptCohort = false;
      }
    });
  }
}