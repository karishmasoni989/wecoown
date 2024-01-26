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
  MemberIdURL: string;
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
  constructor(
    private UserService: UserService,
    private likeService: LikeOfPostService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  ionViewWillEnter() {
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId != null) {
      this.wishlist();
      this.wishlistMedia();
      this.LikeStorage = JSON.parse(localStorage.getItem('LikeDataData'));
    }
    // this.ngOnInit();
    // this.showItem = false;
    // this.searchText = "";
  }
  ngOnInit() {
    this.baseURLofAPi = environment.baseUrl;
    $('#loader').hide();
    this.wishlist();
    this.wishlistMedia();
    let getParamsId = this.activatedRoute.snapshot.url;
    console.log("getParamsId : ", getParamsId[1].path);
    this.MemberIdURL = getParamsId[1].path;
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

  }

  ngAfterViewInit() {
    // document.getElementById("getbuyerIDD").onload = function() {
    // this.getLikeOfPost("111");
    console.log("valllllllllllllllllllllllllllllllllll : ", $('#getbuyerIDD').val());

    // alert($('#getbuyerIDD').val());
    // };
  }

  getMemberDataById() {
    let dataForForm = {
      id: this.MemberIdURL
    }
    this.UserService.getUserDataById(dataForForm).subscribe(result => {
      console.log("result : ", result);
      if (result['success'] == true) {
        this.getMemberData = result['getData'];
        console.log("member data : ", this.getMemberData);
        this.getIntroYes(this.getMemberData.bio, this.getMemberData.intro_public)
      }
      else if (result['success'] == false) {
        $(".verify-danger").html(result['message']);
        $('.verify-danger').show();
        $('.verify-success').hide();
      }
    });
  }

  getIntroYes(bio, intro_public) {
    if (intro_public == 'No') {
      let userLocalId = localStorage.getItem('userInfo');
      if (userLocalId != null) {
        $('#showIntroOrNot').show();
      } else {
        $('#showIntroOrNot').hide();
      }
    }
    else {
      $('#showIntroOrNot').show();
    }
  }

  getMyPost() {
    let dataForForm = {
      user_id: this.MemberIdURL
    }
    this.UserService.getUserAllPost(dataForForm).subscribe(result => {
      console.log("result of get user postttttttttttttttttttttttttt : ", result);
      if (result['success'] == true) {
        this.getMyPostData = result['BuyerData'];
        this.getPostMediaData = this.groupBy(result['postMediaData'], "post_id");
        console.log("this.getPostMediaData mediaa : ", this.getPostMediaData);
        if (this.getMyPostData.length == 0) {
          $(".notFoundPost").show();
        }
        else {
          $(".notFoundPost").hide();
        }
        console.log("this.getMyPostData", this.getMyPostData);
      }
      else if (result['success'] == false) {
        console.log("error in get user post : ", result['message']);
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
      console.log("result of get Category Photos: ", result);
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
        console.log('this.AllUploadedPhotos', this.AllUploadedPhotos);
      }
      else if (result['success'] == false) {
        console.log("result['message']", result['message']);
      }
    });
  }

  phtoSlider() {
    // for slider   
    this.AllUploadedPhotos.forEach(element => {
      $('<div class="carousel-item" ><img alt="Image is loading" src="' + (this.baseURLofAPi+element.src) + '" width="100%" height="300px"></div>').appendTo('#carouselExample .carousel-inner');
    });
    $('#carouselExample .carousel-item').first().addClass('active');
    // $('.carousel-indicators > li').first().addClass('active');
  }

  FindUserLoggedIn() {
    let checkUserProfilee = localStorage.getItem('userInfo');
    console.log("local user profile : ", JSON.stringify(checkUserProfilee));
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

  saveInterestData(buyerDId) {
    this.BuyerUserID = buyerDId
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
  //       console.log("result : ", result);
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
    $('.chatSuccess').hide();
    $('.chatDanger').hide();
    let chatmsg = $('#chatmsg').val();
    if (chatmsg == '' || chatmsg == undefined) {
      $('#chatmsg').focus();
      $(".chatDanger").html("Please enter chat message.");
      $('.chatDanger').show();
    }
    else {
      $('.chatDanger').hide();
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      this.sendMsgForm.value.current_user_id = parseData['id'];
      this.sendMsgForm.value.buyer_user_id = this.BuyerData[0]._id;
      let dataForForm = {
        user_id: parseData['id'],
        buyer_id: this.BuyerUserID,
        chat_message: chatmsg
      }
      console.log("form data: ", dataForForm);
      this.UserService.chatMessage(dataForForm).subscribe(result => {
        console.log("result : ", result);
        if (result['success'] == true) {
          $(".chatSuccess").html(result['message']);
          $('.chatSuccess').show();
          $('.chatDanger').hide();
          //location.reload();
        }
        else if (result['success'] == false) {
          $(".chatDanger").html(result['message']);
          $('.chatSuccess').hide();
          $('.chatDanger').show();
        }
      });
    }
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
        console.log("user data tttttttttt: ", parseData['id']);
        this.showInterestForm.value.current_user_id = parseData['id'];
        this.showInterestForm.value.buyer_user_id = this.BuyerUserID;

        //  for send copy of email
        let checked_semdEmailCopy = document.getElementById("sned_me_email")['checked'];
        if (checked_semdEmailCopy === true) {
          this.showInterestForm.value.send_me_copy = 'Yes';
        } else {
          this.showInterestForm.value.send_me_copy = 'No';
        }
        console.log("form register val : ", this.showInterestForm.value);
        this.UserService.showInterestUser(this.showInterestForm.value).subscribe(result => {
          console.log("result : ", result);
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
        console.log("rrrrrrrrrrrrrrrrrr : ", parseData['profile_pic'].length);
        let imageOfUser;
        if (parseData['profile_pic'].length == 0) {
          imageOfUser = '/assets/images/user1.png'
        } else {
          imageOfUser = parseData['profile_pic'][0].src
        }
        $("#appendMessage").append("<span style='display: flex; margin-bottom: 10px;'><img alt='Image is loading' width='30px' height='30px' style='float: left; border-radius: 50%;' src='" + (this.baseURLofAPi+imageOfUser) + "'> <span style='border-radius: 5px; padding: 5px; background: #efefef; float: left;margin-left: 3px;' > "
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
    console.log('MediapostLikeShare : ', media_id);
    if (A_type === 1) {
      console.log("media likeeeeeeeeeee : ");
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
      console.log("media comment : ");
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      let getComment = $('#send-media-comment-post').val();
      if ($('#send-media-comment-post').val() == '') {
        $('#send-media-comment-post').focus();
        $(".send-comment-danger").html("Please enter comment text.");
        $('.send-comment-danger').show();
      } else {
        console.log("rrrrrrrrrrrrrrrrrr : ", parseData['profile_pic'].length);
        let imageOfUser;
        if (parseData['profile_pic'].length == 0) {
          imageOfUser = '/assets/images/user1.png'
        } else {
          imageOfUser = parseData['profile_pic'][0].src
        }
        $("#appendMessageMedia").append("<span style='display: flex; margin-bottom: 10px;'><img alt='Image is loading' width='30px' height='30px' style='float: left; border-radius: 50%;' src='" + (this.baseURLofAPi+imageOfUser) + "'> <span style='border-radius: 5px; padding: 5px; background: #efefef; float: left;margin-left: 3px;' > "
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
    console.log("calll methodddddddddd");
    this.UserService.BuyerPostLikeComment(dataForForm).subscribe(result => {
      console.log("result of post like : ", result);
      if (result['success'] == true) {
        console.log("success in post like : ", result['message']);
      }
      else if (result['success'] == false) {
        console.log("error in get user post : ", result['message']);
      }
    });
  }

  getPostImageArrayy(index) {
    this.getPostMediaAllData = index;
    $('#carousel-one-post .carousel-item').remove();
    console.log("alll post imagesssssssssssssssss", index[0].src);
    index.forEach(element => {
      $('<div class="carousel-item"><img alt="Image is loading" src="' + (this.baseURLofAPi+element.src) + '" width="100%" style="height: 400px;"></div>').appendTo('#carousel-one-post .carousel-inner');
    });
    $('#carousel-one-post .carousel-item').first().addClass('active');
  }

  getPostDataAndLike(post_idd) {
    this.wishlist();
    this.wishlistMedia();
    $('#appendMessage').html("");
    $('#send-comment-post').val('');
    if (post_idd != "") {
      let dataForForm = {
        post_id: post_idd
      }
      this.UserService.getOnePostById(dataForForm).subscribe(result => {
        console.log("result of one post : ", result);
        if (result['success'] == true) {
          this.getOnePostData = result['BuyerData'];
        }
        else if (result['success'] == false) {
          console.log("error in get user post : ", result['message']);
        }
      });
      this.UserService.getPostLikeComment(dataForForm).subscribe(result => {
        console.log("result of like post : ", result);
        if (result['success'] == true) {
          this.getLikePostData = result['likeData'];
          this.getCommentPostData = result['CommentData'];
          this.getLikeCount = result['likeCount'];
          this.getCommentCount = result['CommentCount'];
        }
        else if (result['success'] == false) {
          console.log("error in get user post : ", result['message']);
        }
      });
    }
  }

  getPostAndMediaData(buyerDataId, allPostImageId) {
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
        console.log("result of one post in media : ", result);
        if (result['success'] == true) {
          this.getOnePostData = result['BuyerData'];
          console.log("inner : ", this.getOnePostData.category);
        }
        else if (result['success'] == false) {
          console.log("error in get user post : ", result['message']);
        }
      });
      this.UserService.getPostMediaLikeComment(formForMediaLike).subscribe(result => {
        console.log("result of like post in mediaaaaaaaaaaaaaaaa : ", result);
        if (result['success'] == true) {
          this.getMediaLikePostData = result['medialikeData'];
          this.getMediaCommentPostData = result['mediaCommentData'];
          this.getMediaLikeCount = result['medialikeCount'];
          this.getMediaCommentCount = result['mediaCommentCount'];
        }
        else if (result['success'] == false) {
          console.log("error in get user post : ", result['message']);
        }
      });
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
        console.log("result of like wish : ", result);
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
    // console.log("this.LikeStorage : ",this.LikeStorage);

    for (let w of this.LikeStorage) {
      // console.log("w idddddddddd : ",w);      
      this.LikeId = w.post_id;
      this.likeAction = w.action_type;
      // console.log(id == this.LikeId);
      // console.log(action_type == this.likeAction);

      if (id == this.LikeId && action_type == this.likeAction) {
        // console.log("ifffff conditoion of like wishhhhhhhhh");        
        this.ionicColor = 'primary'
        return true;
      }
    }
    return false;
  }
  toggleNamedColor(event, productid, action_type) {
    if (event.target.className == "btn width-Like UnlikeBtnn fa fa-thumbs-o-up") {
      this.getLikeCount = this.getLikeCount + 1;
    } else if (event.target.className == "btn width-Like fb-btn-like likeBUtton fa fa-thumbs-up") {
      if (this.getLikeCount > 0) {
        this.getLikeCount = this.getLikeCount - 1;
      }
    }
    this.likeService.toggleNamedColor(event, productid, action_type);
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
        console.log("result of media like wish : ", result);
        localStorage.setItem('MediaLikeData', JSON.stringify(result['MediaLikeDataByUserId']));
      });
    }
  }
  checkProductMedia(id, post_media_id, action_type) {
    this.MediaLikeStorage = JSON.parse(localStorage.getItem('MediaLikeData'));
    if (!this.MediaLikeStorage) {
      return false;
    }
    // console.log("this.LikeStorage : ",this.LikeStorage);

    for (let w of this.MediaLikeStorage) {
      // console.log("w idddddddddd : ",w);      
      this.MediaLikeId = w.post_id;
      this.MedialikeAction = w.action_type;
      this.MediaIDD = w.post_media_id;
      if (id == w.post_id && action_type == w.action_type && post_media_id == w.post_media_id) {
        console.log("ifffff conditoion of mediaaaaaaaaa like wishhhhhhhhh");
        this.ionicColor = 'primary'
        return true;
      }
    }
    return false;
  }
  toggledMediaColor(event, productid, post_media_id, action_type) {
    // let userLocalId = localStorage.getItem('userInfo');
    // let parseData = JSON.parse(userLocalId);
    // console.log("rrrrrrrrrrrrrrrrrr : ", parseData['profile_pic'].length);
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
}