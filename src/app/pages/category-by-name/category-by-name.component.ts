import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CountryStateCityService } from '../../service/country-state-city.service';
import { LikeOfPostService } from '../../service/like-of-post.service'
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-category-by-name',
  templateUrl: './category-by-name.component.html',
  styleUrls: ['./category-by-name.component.css']
})
export class CategoryByNameComponent implements OnInit {
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
  loading = false;
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
  getChatGroup: any;
  CurrentUserIDD: any;
  getPostMediaData: any;
  LikeStorage: any;
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
  getCatNamee: string;
  getAllCountry: Object;
  getAllStates: Object;
  getAllCities: Object;
  // percent: any;
  constructor(
    public UserService: UserService,
    private likeService: LikeOfPostService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public CountryStateCityService: CountryStateCityService,
    public AppComponent: AppComponent
  ) {
    let getParamsIdee = this.activatedRoute.snapshot.url;
    this.getCatNamee = getParamsIdee[1].path;
    this.baseURLofAPi = environment.baseUrl;
    this.wishlist();
    this.wishlistMedia();
    this.getAllData();
    this.getCategoryPhotos();
    this.myPostCount();
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.CurrentUserIDD = parseData['id'];
    }
    // alert(this.getCatNamee);
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
    // alert("ngonit");
    $('#loader').hide();
    this.buyerForm = new FormGroup({
      category: new FormControl(''),
      property_desciption: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl('')
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
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
      country: new FormControl('',),
      state: new FormControl('',),
      city: new FormControl('',),
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
    // for country state city
    this.getAllCountrydataFromWecoownServer()
    // let checkAUTT = localStorage.getItem("CountryAuthToken");
    // let checkCountryy = localStorage.getItem("AllCountries");
    // if (checkAUTT != null) {
    //   if (checkCountryy != null) {
    //     this.getAllCountry = JSON.parse(checkCountryy);
    //     let getIndex = this.findArrayIndex(this.getAllCountry, 'country_name', 'United States');
    //     this.array_move(this.getAllCountry, getIndex, 0)
    //   }
    //   else {
    //     this.getAllCountryData();
    //   }
    // } else {
    //   this.getCountryAuthh();
    // }
    // $(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );
  }

  // getCountryAuthh() {
  //   let checkAuthh = localStorage.getItem("CountryAuthToken")
  //   if (checkAuthh == null) {
  //     this.CountryStateCityService.getCountryAuth().subscribe(result => {
  //       ////console.log("result od countryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy: ", result);
  //       localStorage.setItem('CountryAuthToken', JSON.stringify(result));
  //       this.getAllCountryData();
  //     })
  //   }
  // }

  // getAllCountryData() {
  //   this.CountryStateCityService.GetAllCountryData().subscribe(result111 => {
  //     localStorage.setItem('AllCountries', JSON.stringify(result111));
  //     this.getAllCountry = result111;
  //     let getIndex = this.findArrayIndex(this.getAllCountry, 'country_name', 'United States');
  //     this.array_move(this.getAllCountry, getIndex, 0)
  //   })
  // }
  // // for United states at 1 position
  // array_move(arr, old_index, new_index) {
  //   if (new_index >= arr.length) {
  //     var k = new_index - arr.length + 1;
  //     while (k--) {
  //       arr.push(undefined);
  //     }
  //   }
  //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  //   return arr; // for testing
  // };
  // findArrayIndex(array, attr, value) {
  //   for (var i = 0; i < array.length; i++) {
  //     if (array[i].country_name == value) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }

  // ngOnChanges(){
  //   alert("ngOnChanges")
  // }
  // ngDoCheck(){
  //   alert("ngDoCheck")
  // }
  // ngAfterContentInit(){
  //   alert("ngAfterContentInit")
  // }
  // ngAfterContentChecked(){
  //   alert("ngAfterContentChecked")
  // }
  // ngAfterViewChecked(){
  //   alert("ngAfterViewChecked")
  // }

  ngAfterViewInit() {
    var input = document.getElementById("searchForCategorysearch");
   
    // input.addEventListener("keyup", function (event) {
    //   if (event.keyCode === 13) {
    //     // alert("jkasnc")
    //     event.preventDefault();
    //     document.getElementById("callSubmitFunction").click();
    //   }
    // });
    // $(".CheckFormNews").keypress(function (e) {
    //   if (e.which === 13) {
    //     $('#NewsformSubmit').trigger('click');
    //   }
    // });
  }

  getAllCountrydataFromWecoownServer() {
    this.UserService.GetAllCountryData().subscribe(result => {
      //console.log("result of get allllllllllllllllll country: ", result);
      if (result['success'] == true) {
        this.getAllCountry = result['countryData'];
      }
    })
  }
  changeCoutry(country_code) {
    let dataForm = {
      country_code: country_code
    }
    this.UserService.GetAllStateData(dataForm).subscribe(result => {
      //console.log("result of get allllllllllllllllll states: ", result);
      if (result['success'] == true) {
        this.getAllStates = result['stateData'];
      }
    })
  }
  changeState(mergeName) {
    //console.log("mergeName :", mergeName);
    //     this.getAllCities = result111
    let splitCountryState = mergeName.split('-');
    let dataForm = {
      country_code: splitCountryState[0],
      region_iso_code: splitCountryState[1]
    }
    //console.log("dataForm :", dataForm);
    this.UserService.getAllCityData(dataForm).subscribe(result => {
      //console.log("result of get allllllllllllllllll cities: ", result);
      if (result['success'] == true) {
        this.getAllCities = result['cityData'];
      }
    })
  }

  // changeCoutry(country_name) {    
  //   this.CountryStateCityService.GetAllStateData(country_name).subscribe(result111 => {
  //     this.getAllStates = result111
  //   }, error =>{
  //     ////console.log("errorrrrrrrrrrrrrr",error);
  //     if (error) {
  //       this.CountryStateCityService.getCountryAuth().subscribe(result => {
  //         localStorage.setItem('CountryAuthToken', JSON.stringify(result));
  //         this.getAllCountryData();
  //         location.reload();
  //       })
  //     } 
  //   })
  // }

  // here(name) {
  //   this.CountryStateCityService.GetAllCityData(name).subscribe(result111 => {
  //     this.getAllCities = result111
  //   })
  // }

  submitSearchhh(e) {
    // alert(e)
    ////console.log("event kryu[pppppppppppppppppppppppppppppp", e.key);

    if (e.key == "Enter") {
      document.getElementById("callSubmitFunction").click();
    }
  }

  getAllData() {
    let getParamsId = this.activatedRoute.snapshot.url;
    ////console.log("getParamsId : ", getParamsId[1].path);
    this.PageCategoryName = getParamsId[1].path;
    let dataForForm = {
      category_name: getParamsId[1].path
    }
    this.UserService.getCategoryByName(dataForForm).subscribe(result => {
      ////console.log("result of get allllllllllllllllll dataaaaaaaaaaaaaaaaaaaaaa: ", result);
      if (result['success'] == true) {
        this.categoryData = result['categoryData'][0]
        ////console.log("categoryData : ", this.categoryData);
        this.BuyerData = result['BuyerData']
        if (this.BuyerData.length == 0) {
          $(".notFoundPost").show();
        }
        else {
          $(".notFoundPost").hide();
        }
        ////console.log("buyer dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa", this.BuyerData);
        this.getPostMediaData = this.groupBy(result['postMediaData'], "post_id");
        ////console.log("this.getPostMediaData mediaa : ", this.getPostMediaData);
      }
      else if (result['success'] == false) {
        $(".verify-danger").html(result['message']);
        $('.verify-danger').show();
        $('.verify-success').hide();
      }
    });


    // if(getParamsIdForNewsletter != null)
    // {
    //   $('#verifyLoginBtn').hide();
    //   this.UserService.verifyEmailLinkForNewsletter(nullVar,getParamsIdForNewsletter).subscribe(result => {
    //     ////console.log("result : ", result);
    //     if (result['success'] == true) {
    //       $(".verify-success").html(result['message']);
    //         $('.verify-success').show();
    //         $('.verify-danger').hide();
    //     }
    //     else if (result['success'] == false) {
    //       $(".verify-danger").html(result['message']);
    //       $('.verify-danger').show();
    //       $('.verify-success').hide();
    //     }
    //   }); 
    // }
  }

  groupBy(list, props) {
    return list.reduce((a, b) => {
      (a[b[props]] = a[b[props]] || []).push(b);
      return a;
    }, {});
  }

  myPostCount() {
    $('.my-post-count').hide();
    let getParamsId = this.activatedRoute.snapshot.url;
    ////console.log("getParamsId : ", getParamsId[1].path);
    this.PageCategoryName = getParamsId[1].path;
    //  for user id

    let userLocalId = localStorage.getItem('userInfo');
    ////console.log("usr locallllllllllllll", userLocalId);
    let parseData = JSON.parse(userLocalId);

    if (userLocalId != null) {
      let dataForForm = {
        category: getParamsId[1].path,
        user_id: parseData['id']
      }
      this.UserService.getUserPostByCategory(dataForForm).subscribe(result => {
        ////console.log("result of get user post : ", result);
        if (result['success'] == true) {
          let checkLength = result['BuyerData'];
          ////console.log("get my post count : ", checkLength);
          this.myPostLength = checkLength.length
          $('.my-post-count').show();
        }
        else if (result['success'] == false) {
          $('.my-post-count').hide();
          ////console.log("error in get user post : ", result['message']);
        }
      });
    }
  }

  getMyPost() {
    let getParamsId = this.activatedRoute.snapshot.url;
    ////console.log("getParamsId : ", getParamsId[1].path);
    this.PageCategoryName = getParamsId[1].path;
    //  for user id

    let userLocalId = localStorage.getItem('userInfo');
    ////console.log("usr locallllllllllllll", userLocalId);
    let parseData = JSON.parse(userLocalId);

    if (userLocalId == null) {
      $('.my-post-danger').show();
    } else {
      $('.my-post-danger').hide();
      $('#loader').show();
      let dataForForm = {
        category: getParamsId[1].path,
        user_id: parseData['id']
      }
      this.UserService.getUserPostByCategory(dataForForm).subscribe(result => {
        ////console.log("result of get user post : ", result);
        if (result['success'] == true) {
          this.getUserPostedData = result['BuyerData'];
          this.getPostMediaData = this.groupBy(result['postMediaData'], "post_id");
          if (this.getUserPostedData.length == 0) {
            $(".notFoundPost").show();
          }
          else {
            $(".notFoundPost").hide();
          }
          this.getMyPostData = result['BuyerData'];
          $('#first-div').hide();
          $('#second-div').hide();
          $('#third-div').show();
          $('#loader').hide();
          if (this.getMyPostData.length == 0) {
            $(".notFoundPost").show();
          }
          else {
            $(".notFoundPost").hide();
          }
          ////console.log("this.getMyPostData", this.getMyPostData);
          ////console.log("this.getUserPostedData", this.getUserPostedData);
        }
        else if (result['success'] == false) {
          ////console.log("error in get user post : ", result['message']);
        }
      });
    }
  }

  getCategoryPhotos() {
    let getParamsId = this.activatedRoute.snapshot.url;
    ////console.log("getParamsId : ", getParamsId[1].path);
    this.PageCategoryName = getParamsId[1].path;
    let dataForForm = {
      category: getParamsId[1].path
    }
    this.UserService.getCategoryPhotos(dataForForm).subscribe(result => {
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
    // if(getParamsIdForNewsletter != null)
    // {
    //   $('#verifyLoginBtn').hide();
    //   this.UserService.verifyEmailLinkForNewsletter(nullVar,getParamsIdForNewsletter).subscribe(result => {
    //     ////console.log("result : ", result);
    //     if (result['success'] == true) {
    //       $(".verify-success").html(result['message']);
    //         $('.verify-success').show();
    //         $('.verify-danger').hide();
    //     }
    //     else if (result['success'] == false) {
    //       $(".verify-danger").html(result['message']);
    //       $('.verify-danger').show();
    //       $('.verify-success').hide();
    //     }
    //   }); 
    // }
  }

  phtoSlider() {
    // for slider   
    this.AllUploadedPhotos.forEach(element => {
      $('<div class="carousel-item" ><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" height="300px"></div>').appendTo('#carouselExample .carousel-inner');
    });
    $('#carouselExample .carousel-item').first().addClass('active');
    // $('.carousel-indicators > li').first().addClass('active');
  }

  saveInterestData(buyerDId) {
    this.BuyerUserID = buyerDId
    ////console.log("this.BuyerUserID", this.BuyerUserID);
  }

  submitBuyerForm() {
    $('#loader').show();
    let getParamsId = this.activatedRoute.snapshot.url;
    ////console.log("getParamsId : ", getParamsId[1].path);
    // alert($('#category').val())   
    this.buyerForm.value.category = getParamsId[1].path;
    this.buyerForm.value.country = $('#country-select').val();
    this.buyerForm.value.state = $('#state-select').val();
    this.buyerForm.value.city = $('#city-select').val()
    ////console.log("form register val : ", this.buyerForm.value);
    this.UserService.SearchFilterFor1Category(this.buyerForm.value).subscribe(result => {
      ////console.log("result : ", result);
      if (result['success'] == true) {
        if (result['dataCount'] == 0) {
          //  alert("hereeeeeee")
          $('#No-data-found').show();
        }
        else {
          $('#No-data-found').hide();
        }
        this.searchData = result['getData'];

        this.getPostMediaData = this.groupBy(result['postMediaData'], "post_id");
        $('#first-div').hide();
        $('#third-div').hide();
        $('#loader').hide();
        $('#second-div').show();
        if (this.searchData.length == 0) {
          $(".notFoundPost").show();
        }
        else {
          $(".notFoundPost").hide();
        }
        // this.photosFirst = this.searchData.property_photos    
      }
      else {
        $('#loader').hide();
        // alert(result['message'])
      }
    });
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
      ////console.log("result of delete post : ", result);
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
    ////console.log("araay filessss : ", this.files);
    for (let item of event) {
      this.files.push(item)
    }
  }

  delteFile(i) {
    ////console.log("this.files", this.files);
    ////console.log("typedoffffffff : ", typeof (this.files));
    this.files.splice(i, 1);
    ////console.log("here are finallllll : ", this.files);
  }

  // for upload photos
  onUploadPhotosDropped(event) {
    ////console.log("araay filessss : ", event);
    for (let item of event) {
      this.uploadPhotosfiles.push(item)
    }
  }

  deleteUploadPhotos(i) {
    ////console.log("this.uploadPhotosfiles", this.uploadPhotosfiles);
    ////console.log("typedoffffffff : ", typeof (this.uploadPhotosfiles));
    this.uploadPhotosfiles.splice(i, 1);
    ////console.log("here are finallllll : ", this.uploadPhotosfiles);
  }

  // submitCreatePostForm() {
  //   ////console.log(this.files.length);
  //   if ($('#property_desciption').val() == '' && this.files.length == 0) {
  //     $('#fileDropRef').focus();
  //     $('#property_desciption').focus();
  //     $(".CreatePost-Danger").html("Please enter property desciption.<br>Please select property photos.");
  //     $('.CreatePost-Danger').show();
  //   }
  //   else if ($('#property_desciption').val() == '') {
  //     $('#property_desciption').focus();
  //     $(".CreatePost-Danger").html("Please enter property desciption.");
  //     $('.CreatePost-Danger').show();
  //   }
  //   else if (this.files.length == 0) {
  //     $('#fileDropRef').focus();
  //     $(".CreatePost-Danger").html("Please select property photos.");
  //     $('.CreatePost-Danger').show();
  //   }
  //   else {
  //     $('.CreatePost-Danger').hide();

  //     let userLocalId = localStorage.getItem('userInfo');
  //     let parseData = JSON.parse(userLocalId);
  //     ////console.log("user data tttttttttt: ", parseData['id']);
  //     let formData = new FormData();
  //     formData.append("user_id", parseData['id']);

  //     let getParamsId = this.activatedRoute.snapshot.url;
  //     ////console.log("getParamsId : ", getParamsId[1].path);

  //     formData.append("category", getParamsId[1].path);
  //     formData.append("property_desciption", this.CreatePostForm.value.property_desciption);
  //     formData.append("url_property", this.CreatePostForm.value.url_property);
  //     // formData.append("category",this.buyerForm.value.category);
  //     for (var i = 0; i < this.files.length; i++) {
  //       formData.append("all_images", this.files[i], this.files[i].name);
  //     }

  //     ////console.log("form register val : ", formData);
  //     this.UserService.setIAmBuyer(formData).subscribe(result => {
  //       ////console.log("result : ", result);
  //       if (result['success'] == true) {
  //         $(".CreatePost-Success").html(result['message']);
  //         $('.CreatePost-Success').show();
  //         $('.CreatePost-Danger').hide();
  //         location.reload();          
  //       }
  //       else if (result['success'] == false) {
  //         $(".CreatePost-Danger").html(result['message']);
  //         $('.CreatePost-Danger').show();
  //         $('.CreatePost-Success').hide();
  //       }
  //     });
  //   }
  // }
  getCheckedValCo() {
    $('input.MakeCoverPhotoPost').bind('click', function () {
      if ($(this).prop('checked') === false) {
        $(this).prop('checked', true);
      }
      $('input.MakeCoverPhotoPost').not(this).prop("checked", false);
    });
  }

  submitCreatePostForm() {
    ////console.log(this.files.length);
    let fieldsOfCheckedArray = $("input[class='MakeCoverPhotoPost']").serializeArray();
    let finalString = "";
    alert(this.CreatePostForm.value.country)
    if (this.CreatePostForm.value.country == '') {
      $('#country-select').focus();
      finalString += "Please select country.<br>";
    }
    if ($('#state-select').val() == '') {
      $('#state-select').focus();
      finalString += "Please select state.<br>";
    }
    if ($('#city-select').val() == '') {
      $('#city-select').focus();
      finalString += "Please select city.<br>";
    }
    if ($('#property_desciption').val() == '') {
      $('#property_desciption').focus();
      finalString += "Please enter property description.<br>";
    }
    if (this.files.length == 0) {
      $('#fileDropRef').focus();
      finalString += "Please select property photos.<br>";
    }
    if (fieldsOfCheckedArray.length === 0) {
      $('#fileDropRef').focus();
      finalString += "Please check on 1 checbox to be make photo as a cover photo.";
    }
    ////console.log("alertHtml", finalString);
    $(".CreatePost-Danger").html(finalString);
    $('.CreatePost-Danger').show();
    // if ($('#property_desciption').val() == '' && this.files.length == 0) {
    //   // alert("hereeeeeeeee")
    //   $('#fileDropRef').focus();
    //   $('#property_desciption').focus();
    //   $(".CreatePost-Danger").html("<br>Please select property photos.");
    //   $('.CreatePost-Danger').show();
    // }
    // else if ($('#property_desciption').val() == '') {
    //   $('#property_desciption').focus();
    //   $(".CreatePost-Danger").html("Please enter property desciption.");
    //   $('.CreatePost-Danger').show();
    // }
    // else if (this.files.length == 0) {
    //   $('#fileDropRef').focus();
    //   $(".CreatePost-Danger").html("Please select property photos.");
    //   $('.CreatePost-Danger').show();
    // }
    // else if (fieldsOfCheckedArray.length === 0) {
    //   $('#fileDropRef').focus();
    //   $(".CreatePost-Danger").html("Please check on 1 checbox to be make photo as a cover photo.");
    //   $('.CreatePost-Danger').show();
    // }
    // alert(this.CreatePostForm.value.country)
    if (finalString != "") {
      $('#loader').show();
      $('.CreatePost-Danger').hide();
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);

      let formData = new FormData();
      formData.append("user_id", parseData['id']);
      formData.append("category", $('#category-create-post').val());
      formData.append("country", this.CreatePostForm.value.country);
      formData.append("state", this.CreatePostForm.value.state);
      formData.append("city", this.CreatePostForm.value.city);
      formData.append("property_desciption", this.CreatePostForm.value.property_desciption);
      formData.append("url_property", this.CreatePostForm.value.url_property);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }

      for (var i = 0; i < this.files.length; i++) {
        if (fieldsOfCheckedArray[0].value == i) {
          formData.append("is_cover_photo", this.files[i].name);
        }
      }

      ////console.log("form register val : ", formData);
      this.UserService.setIAmBuyer(formData).subscribe(result => {
        $('#loader').hide();
        ////console.log("result : ", result);
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
    ////console.log(this.uploadPhotosfiles.length);
    if (this.uploadPhotosfiles.length == 0) {
      $('#fileUploadPhoto').focus();
      $(".uploadPhotos-Danger").html("Please select property photos.");
      $('.uploadPhotos-Danger').show();
    }
    else {
      $('.uploadPhotos-Danger').hide();
      $('.uploadPhotos-Success').hide();
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      ////console.log("user data tttttttttt: ", parseData['id']);
      let formData = new FormData();
      formData.append("user_id", parseData['id']);

      let getParamsId = this.activatedRoute.snapshot.url;
      ////console.log("getParamsId : ", getParamsId[1].path);

      formData.append("category", getParamsId[1].path);
      // formData.append("category",this.buyerForm.value.category);
      for (var i = 0; i < this.uploadPhotosfiles.length; i++) {
        formData.append("all_images", this.uploadPhotosfiles[i], this.uploadPhotosfiles[i].name);
      }

      ////console.log("form register val : ", formData);
      this.UserService.uploadCategoryPhotos(formData).subscribe(result => {
        ////console.log("result : ", result);
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
      ////console.log("form data: ", dataForForm);
      this.UserService.chatMessage(dataForForm).subscribe(result => {
        ////console.log("result : ", result);
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
    this.getPostMediaAllData = index;
    $('#carousel-one-post .carousel-item').remove();
    ////console.log("alll post imagesssssssssssssssss", index[0].src);
    index.forEach(element => {
      $('<div class="carousel-item"><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" style="height: 400px;"></div>').appendTo('#carousel-one-post .carousel-inner');
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
        ////console.log("result of one post : ", result);
        if (result['success'] == true) {
          this.getOnePostData = result['BuyerData'];
        }
        else if (result['success'] == false) {
          ////console.log("error in get user post : ", result['message']);
        }
      });
      this.UserService.getPostLikeComment(dataForForm).subscribe(result => {
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
}