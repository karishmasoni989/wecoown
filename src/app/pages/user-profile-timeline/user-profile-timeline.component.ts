import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import { UserService } from '../../service/user.service';
import { LikeOfPostService } from '../../service/like-of-post.service'
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile-timeline',
  templateUrl: './user-profile-timeline.component.html',
  styleUrls: ['./user-profile-timeline.component.css']
})
export class UserProfileTimelineComponent implements OnInit {
  buyerForm: FormGroup;
  showInterestForm: FormGroup;
  sendMsgForm: FormGroup;
  CreatePostForm: FormGroup;
  UploadPhotosForm: FormGroup;
  BuyerData: any;
  categoryData: any;
  selctedVal: any;
  searchData: any;
  BuyerUserID: any;
  PageCategoryName: string;
  steps: any;
  categoryArray: any;
  FinalArray: any;
  ImgArray: [];

  // fileOver: boolean;
  @HostBinding('class.fileover') fileOver: boolean;
  //fileDropped: any;
  @Output() fileDropped = new EventEmitter<any>();
  files: any[] = [];
  uploadPhotosfiles: any[] = [];
  UploadedCategoryPhotos: any;
  AllUploadedPhotos: any[] = [];
  getUserPostedData: any;
  getMyPostData: any;
  confirmDeletePostt: string;
  myPostLength: any;
  checkUserProfilee: string;
  getMemberData: any;
  profilePhoto: any;
  profilePhotoName: any;
  coverPhoto: any;
  coverPhotoName: any;
  LikeStorage: any;
  MemberIdURL: string;
  getPostMediaData: any;
  getCommentCount: any;
  getMediaCommentCount: any;
  getPostMediaAllData: any;
  getOnePostData: any;
  getLikePostData: any;
  getCommentPostData: any;
  getLikeCount: any;
  getCurrentMediaPhotoID: any;
  getMediaLikePostData: any;
  getMediaCommentPostData: any;
  getMediaLikeCount: any;
  LikeId: any;
  likeAction: any;
  ionicColor: string;
  MediaLikeStorage: any;
  MediaLikeId: any;
  MedialikeAction: any;
  MediaIDD: any;
  baseURLofAPi: string;
  // percent: any;
  constructor(
    public UserService: UserService,
    private likeService: LikeOfPostService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private AppComponent: AppComponent,
  ) {
    this.AppComponent.userProfileHide();
  }
  ionViewWillEnter() {
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId != null) {
      this.wishlist();
      this.wishlistMedia();
      this.LikeStorage = JSON.parse(localStorage.getItem('LikeDataData'));
    }    
  }
  ngOnInit() {
    this.baseURLofAPi = environment.baseUrl;
    $('#loader').hide();
    this.wishlist();
    this.wishlistMedia();
    // let getParamsId = this.activatedRoute.snapshot.url;
    // console.log("getParamsId : ", getParamsId[1].path);
    // this.MemberIdURL = getParamsId[1].path;
    this.getMemberDataById();
    this.getMyPost();
    this.getCategoryPhotos();
    this.getCategory();
    // this.getCategoryPhotos();
    // this.myPostCount();
    this.buyerForm = new FormGroup({
      category: new FormControl(''),
      property_desciption: new FormControl('')
    });


    this.showInterestForm = new FormGroup({
      current_user_id: new FormControl('', [Validators.required]),
      buyer_user_id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_text: new FormControl('', [Validators.required]),
      send_me_copy: new FormControl(''),
    });

    this.CreatePostForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      property_desciption: new FormControl('', [Validators.required]),
      property_photos: new FormControl('', [Validators.required]),
      url_property: new FormControl('',),
    });

    this.UploadPhotosForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      property_photos: new FormControl('', [Validators.required]),
      url_property: new FormControl('',),
    });

    this.sendMsgForm = new FormGroup({
      current_user_id: new FormControl('', [Validators.required]),
      buyer_user_id: new FormControl(''),
      chatmsg: new FormControl('', [Validators.required])
    });
    // $(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );
  }

  ngAfterViewInit() {

  }

  getCheckedValCo() {
    $('input.MakeCoverPhotoPost').bind('click', function () {
      if ($(this).prop('checked') === false) {
        $(this).prop('checked', true);
      }
      $('input.MakeCoverPhotoPost').not(this).prop("checked", false);
    });
  }
  // /* is cover pic checkbox buttons*/
  // selectOnlyThis(id) {
  //   console.log(id);    
  //   var myCheckbox = document.getElementsByName("myCheckbox");
  //   Array.prototype.forEach.call(myCheckbox, function (el) {
  //     el.checked = false;
  //   });
  //   id.checked = true;
  // }
  // /*end is cover pic checkbox buttons*/

  getMemberDataById() {
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    console.log("user data tttttttttt: ", parseData['id']);
    let dataForForm = {
      id: parseData['id']
    }
    this.UserService.getUserDataById(dataForForm).subscribe(result => {
      console.log("result : ", result);
      if (result['success'] == true) {
        this.getMemberData = result['getData'];
        console.log("member data : ", this.getMemberData);
        // if (this.getMemberData.profile_public == 'Yes') {
        //   $('#hide-timeline-btn').show();
        //   $('#public-timeline-btn').hide();
        // }
        // else if (this.getMemberData.profile_public == 'No') {
        //   $('#public-timeline-btn').show();
        //   $('#hide-timeline-btn').hide();
        // }
      }
      else if (result['success'] == false) {
        $(".verify-danger").html(result['message']);
        $('.verify-danger').show();
        $('.verify-success').hide();
      }
    });
  }

  hideTimeline() {
    $('#loader').show();
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    let formVal = {
      profile_public: 'No'
    }
    this.UserService.updateUserProfilePublic(formVal, parseData['id']).subscribe(result => {
      console.log("result of get user post : ", result);
      if (result['success'] == true) {
        $('#loader').hide();
        location.reload();
      }
    });
  }

  publicTimeline() {
    $('#loader').show();
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    let formVal = {
      profile_public: 'Yes'
    }
    this.UserService.updateUserProfilePublic(formVal, parseData['id']).subscribe(result => {
      console.log("result of get user post : ", result);
      if (result['success'] == true) {
        $('#loader').hide();
        location.reload();
      }
    });
  }

  getMyPost() {
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    let dataForForm = {
      user_id: parseData['id']
    }
    this.UserService.getUserAllPost(dataForForm).subscribe(result => {
      console.log("result of get user posttttttttttttttttttt : ", result);
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
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    let dataForForm = {
      user_id: parseData['id']
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

  getCategory() {
    this.UserService.getAllCategory().subscribe(result => {
      console.log("result : ", result);
      if (result['success'] == true) {
        console.log(result['message']);
        console.log(result['categoryData']);
        this.categoryArray = (result['categoryData']);
      }
      else if (result['success'] == false) {
        console.log(result['message']);
      }
    });
  }

  profilePhotosDropped(event) {
    console.log("profile filessss : ", event);
    this.profilePhoto = event;
    this.profilePhotoName = this.profilePhoto[0].name;
    console.log("name of photo : ", this.profilePhotoName);
  }

  coverPhotosDropped(event) {
    console.log("profile filessss : ", event);
    this.coverPhoto = event;
    this.coverPhotoName = this.coverPhoto[0].name;
    console.log("name of photo : ", this.coverPhotoName);
  }

  submitProfilePic() {
    if (this.profilePhoto == undefined) {
      $('#profilePicInput').focus();
      $(".profile-pic-Danger").html("Please select profile picture.");
      $('.profile-pic-Danger').show();
    }
    else {
      $('.profile-pic-Danger').hide();
      let formData = new FormData();
      let profileArr = [];
      let profile_data;
      profileArr.push(this.profilePhoto)
      if (this.profilePhoto) {
        profile_data = this.profilePhoto[0]
      }
      else {
        profile_data = [];
      }
      let getUserId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(getUserId);
      formData.append("all_images", profile_data);
      this.UserService.updateUserProfilePic(formData, parseData['id']).subscribe(result => {
        console.log("result of get user post : ", result);
        if (result['success'] == true) {
          $(".profile-pic-success").html(result['message']);
          $('.profile-pic-Danger').hide();
          $('.profile-pic-success').show();
          localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
          this.AppComponent.userProfileHide();
          location.reload();
        }
        else if (result['success'] == false) {
          $('.profile-pic-success').hide();
          $(".profile-pic-Danger").html(result['message']);
          $('.profile-pic-Danger').show();
        }
      });
    }
  }

  submitCoverPic() {
    if (this.coverPhoto == undefined) {
      $('#coverPicInput').focus();
      $(".cover-pic-Danger").html("Please select cover picture.");
      $('.cover-pic-Danger').show();
    }
    else {
      $('.cover-pic-Danger').hide();
      let formData = new FormData();
      let profileArr = [];
      let profile_data;
      profileArr.push(this.coverPhoto)
      if (this.coverPhoto) {
        profile_data = this.coverPhoto[0]
      }
      else {
        profile_data = [];
      }
      let getUserId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(getUserId);
      formData.append("all_images", profile_data);
      this.UserService.updateUserCoverPic(formData, parseData['id']).subscribe(result => {
        console.log("result of get user post : ", result);
        if (result['success'] == true) {
          $(".cover-pic-success").html(result['message']);
          $('.cover-pic-Danger').hide();
          $('.cover-pic-success').show();
          location.reload();
        }
        else if (result['success'] == false) {
          $('.cover-pic-success').hide();
          $(".cover-pic-Danger").html(result['message']);
          $('.cover-pic-Danger').show();
        }
      });
    }
  }

  submitBio() {
    let bioVal = $('#bio').val()
    if (bioVal == "") {
      $('#bio').focus();
      $(".bio-Danger").html("Please enter your introduction.");
      $('.bio-Danger').show();
    }
    else {
      $('.bio-Danger').hide();
      let cid4 = document.getElementById("check-Intro-public")['checked'];
      let checkPublicIntro;
      if (cid4 === true) {
        checkPublicIntro = 'Yes'
      } else {
        checkPublicIntro = 'No'
      }
      let getUserId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(getUserId);
      let formVal = {
        bio: bioVal,
        intro_public: checkPublicIntro
      }
      this.UserService.updateUserBio(formVal, parseData['id']).subscribe(result => {
        console.log("result of get user post : ", result);
        if (result['success'] == true) {
          $(".bio-success").html(result['message']);
          $('.bio-Danger').hide();
          $('.bio-success').show();
          location.reload();
        }
        else if (result['success'] == false) {
          $('.bio-success').hide();
          $(".bio-Danger").html(result['message']);
          $('.bio-Danger').show();
        }
      });
    }
  }

  submitSocialLinks() {
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    let formVal = {
      facebook_link: $('#facebook_link').val(),
      twitter_link: $('#twitter_link').val(),
      linkedin_link: $('#linkedin_link').val(),
      instagram_link: $('#instagram_link').val(),
    }
    this.UserService.updateUserSocialLink(formVal, parseData['id']).subscribe(result => {
      console.log("result of get user post : ", result);
      if (result['success'] == true) {
        $(".social-link-success").html(result['message']);
        $('.social-link-Danger').hide();
        $('.social-link-success').show();
        location.reload();
      }
      else if (result['success'] == false) {
        $('.social-link-success').hide();
        $(".social-link-Danger").html(result['message']);
        $('.social-link-Danger').show();
      }
    });
  }

  myPostCount() {
    $('.my-post-count').hide();
    let getParamsId = this.activatedRoute.snapshot.url;
    console.log("getParamsId : ", getParamsId[1].path);
    this.PageCategoryName = getParamsId[1].path;
    //  for user id

    if (this.checkUserProfilee != null) {
      let dataForForm = {
        category: getParamsId[1].path,
        user_id: this.checkUserProfilee
      }
      this.UserService.getUserPostByCategory(dataForForm).subscribe(result => {
        console.log("result of get user post : ", result);
        if (result['success'] == true) {
          let checkLength = result['BuyerData'];
          console.log("get my post count : ", checkLength);
          this.myPostLength = checkLength.length
          $('.my-post-count').show();
        }
        else if (result['success'] == false) {
          $('.my-post-count').hide();
          console.log("error in get user post : ", result['message']);
        }
      });
    }
  }

  phtoSlider() {
    // for slider   
    this.AllUploadedPhotos.forEach(element => {
      $('<div class="carousel-item" ><img alt="Image is loading" src="' + (this.baseURLofAPi+element.src) + '" width="100%" height="300px"></div>').appendTo('#carouselExample .carousel-inner');
    });
    $('#carouselExample .carousel-item').first().addClass('active');
  }

  // nottttttttttttttttttttt
  submitShowInterestForm() {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let emailVal = $('#email').val();
    if ($('#name').val() == '' && ($('#email').val() == '' || !regex.test(emailVal)) && $('#email_text').val() == '') {
      $('#email_text').focus();
      $('#email').focus();
      $('#name').focus();
      $(".chatWithEmailDanger").html("Please enter name.<br>Please enter email eddress.<br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#name').val() == '' && ($('#email').val() == '' || !regex.test(emailVal))) {
      $('#email').focus();
      $('#name').focus();
      $(".chatWithEmailDanger").html("Please enter name.<br>Please enter email eddress.");
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
      $(".chatWithEmailDanger").html("Please enter email eddress.<br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#email').val() == '') {
      $('#email').focus();
      $(".chatWithEmailDanger").html("Please enter email eddress.");
      $('.chatWithEmailDanger').show();
    }
    else if (!regex.test(emailVal) && $('#email_text').val() == '') {
      $('#email_text').focus();
      $('#email').focus();
      $(".chatWithEmailDanger").html("Please enter valid email address.<br>Please enter email text.");
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
        console.log("user data tttttttttt: ", this.checkUserProfilee);
        this.showInterestForm.value.current_user_id = this.checkUserProfilee;
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

  deletePost(postId) {
    localStorage.setItem("deletePostId", JSON.stringify(postId))
  }

  confirmDeletePost() {
    let getID = localStorage.getItem('deletePostId')
    //  alert(getID)
    let dataForForm = {
      post_id: JSON.parse(getID)
    }
    this.UserService.deleteUserPost(dataForForm).subscribe(result => {
      console.log("result of delete post : ", result);
      if (result['success'] == true) {
        $(".postDelete-success").html(result['message']);
        $('.postDelete-success').show();
        location.reload();
      }
      else {
        $('.postDelete-success').hide();
      }
    });
  }

  // for create post
  onFileDropped(event) {
    console.log("araay filessss : ", this.files);
    for (let item of event) {
      this.files.push(item)
    }
  }

  delteFile(i) {
    console.log("this.files", this.files);
    console.log("typedoffffffff : ", typeof (this.files));
    this.files.splice(i, 1);
    console.log("here are finallllll : ", this.files);
  }

  // for upload photos
  onUploadPhotosDropped(event) {
    console.log("araay filessss : ", event);
    for (let item of event) {
      this.uploadPhotosfiles.push(item)
    }
  }

  deleteUploadPhotos(i) {
    console.log("this.uploadPhotosfiles", this.uploadPhotosfiles);
    console.log("typedoffffffff : ", typeof (this.uploadPhotosfiles));
    this.uploadPhotosfiles.splice(i, 1);
    console.log("here are finallllll : ", this.uploadPhotosfiles);
  }

  submitCreatePostForm() {
    console.log(this.files.length);
    let fieldsOfCheckedArray = $("input[class='MakeCoverPhotoPost']").serializeArray();
    if ($('#category-create-post').val() == "" && $('#property_desciption').val() == '' && this.files.length == 0) {
      // alert("hereeeeeeeee")
      $('#fileDropRef').focus();
      $('#property_desciption').focus();
      $('#category-create-post').focus();
      $(".CreatePost-Danger").html("Please select category name.<br>Please enter property desciption.<br>Please select property photos.");
      $('.CreatePost-Danger').show();
    }
    else if ($('#category-create-post').val() == "" && $('#property_desciption').val() == '') {
      $('#property_desciption').focus();
      $('#category-create-post').focus();
      $(".CreatePost-Danger").html("Please select category name.<br>Please enter property desciption.");
      $('.CreatePost-Danger').show();
    }
    else if ($('#category-create-post').val() == "" && this.files.length == 0) {
      $('#fileDropRef').focus();
      $('#category-create-post').focus();
      $(".CreatePost-Danger").html("Please select category name.<br>Please select property photos.");
      $('.CreatePost-Danger').show();
    }
    else if ($('#category-create-post').val() == "") {
      $('#category-create-post').focus();
      $(".CreatePost-Danger").html("Please select category name.");
      $('.CreatePost-Danger').show();
    }
    else if ($('#property_desciption').val() == '' && this.files.length == 0) {
      $('#fileDropRef').focus();
      $('#property_desciption').focus();
      $(".CreatePost-Danger").html("Please enter property desciption.<br>Please select property photos.");
      $('.CreatePost-Danger').show();
    }
    else if ($('#property_desciption').val() == '') {
      $('#property_desciption').focus();
      $(".CreatePost-Danger").html("Please enter property desciption.");
      $('.CreatePost-Danger').show();
    }
    else if (this.files.length === 0) {
      $('#fileDropRef').focus();
      $(".CreatePost-Danger").html("Please select property photos.");
      $('.CreatePost-Danger').show();
    }
    else if (fieldsOfCheckedArray.length === 0){
      $('#fileDropRef').focus();
      $(".CreatePost-Danger").html("Please check on 1 checbox to be make photo as a cover photo.");
      $('.CreatePost-Danger').show();    
    }
    else {
      $('#loader').show();
      $('.CreatePost-Danger').hide();
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);     
      // form for buyer post
      let formData = new FormData();
      formData.append("user_id", parseData['id']);
      formData.append("category", $('#category-create-post').val());
      formData.append("property_desciption", this.CreatePostForm.value.property_desciption);
      formData.append("url_property", this.CreatePostForm.value.url_property);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
       // for cover photo
       
       for (var i = 0; i < this.files.length; i++) {
         if(fieldsOfCheckedArray[0].value == i){
           formData.append("is_cover_photo", this.files[i].name);
         }
       }

      console.log("form register val : ", formData);
      this.UserService.setIAmBuyer(formData).subscribe(result => {
        $('#loader').hide();
        console.log("result : ", result);
        if (result['success'] == true) {
          $(".CreatePost-Success").html(result['message']);
          $('.CreatePost-Success').show();
          $('.CreatePost-Danger').hide();
          location.reload();         
        }
        else if (result['success'] == false) {
          $(".CreatePost-Danger").html(result['message']);
          $('.CreatePost-Danger').show();
          $('.CreatePost-Success').hide();
        }
      });
    }
  }

  submitUploadPhotosForm() {
    console.log(this.uploadPhotosfiles.length);
    if ($('#category-upload-photos').val() == "" && this.files.length == 0) {
      $('#fileDropRef').focus();
      $('#category-upload-photos').focus();
      $(".uploadPhotos-Danger").html("Please select category name.<br>Please select property photos.");
      $('.uploadPhotos-Danger').show();
    }
    else if ($('#category-upload-photos').val() == "") {
      $('#category-upload-photos').focus();
      $(".uploadPhotos-Danger").html("Please select category name");
      $('.uploadPhotos-Danger').show();
    }
    else if (this.uploadPhotosfiles.length == 0) {
      $('#fileUploadPhoto').focus();
      $(".uploadPhotos-Danger").html("Please select property photos.");
      $('.uploadPhotos-Danger').show();
    }
    else {
      $('.uploadPhotos-Danger').hide();
      $('.uploadPhotos-Success').hide();
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      console.log("user data tttttttttt: ", this.checkUserProfilee);
      let formData = new FormData();
      formData.append("user_id", parseData['id']);

      formData.append("category", $('#category-upload-photos').val());
      // formData.append("category",this.buyerForm.value.category);
      for (var i = 0; i < this.uploadPhotosfiles.length; i++) {
        formData.append("all_images", this.uploadPhotosfiles[i], this.uploadPhotosfiles[i].name);
      }

      console.log("form register val : ", formData);
      this.UserService.uploadCategoryPhotos(formData).subscribe(result => {
        console.log("result : ", result);
        if (result['success'] == true) {
          $(".uploadPhotos-Success").html(result['message']);
          $('.uploadPhotos-Success').show();
          $('.uploadPhotos-Danger').hide();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".uploadPhotos-Danger").html(result['message']);
          $('.uploadPhotos-Success').hide();
          $('.uploadPhotos-Danger').show();
        }
      });
    }
  }

  // getPostImageArrayy(index) {
  //   $('#carousel-one-post .carousel-item').remove();
  //   console.log("alll post imagesssssssssssssssss", index[0].src);
  //   index.forEach(element => {
  //     $('<div class="carousel-item"><img alt="Image is loading" src="' + element.src + '" width="100%" height="300px"></div>').appendTo('#carousel-one-post .carousel-inner');
  //   });
  //   $('#carousel-one-post .carousel-item').first().addClass('active');
  // }

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

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    console.log("Drag Over");
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log("Drag Leave");
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      console.log("you drop files : ", files.length);
      this.fileDropped.emit(files);
      for (let item of files) {
        this.files.push(item)
      }
    }
    console.log("Drag Over");
  }
}
