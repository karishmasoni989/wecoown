import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SocketioService } from '../../service/socketio.service';
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
import { interval } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
@Component({
  selector: 'app-category-by-name',
  templateUrl: './category-by-name.component.html',
  styleUrls: ['./category-by-name.component.css']
})
export class CategoryByNameComponent implements OnInit {
  buyerForm: FormGroup;
  addMembershipForm: FormGroup;
  showInterestForm: FormGroup;
  sendMsgForm: FormGroup;
  CreatePostForm: FormGroup;
  UploadPhotosForm: FormGroup;
  BuyerData: any;
  categoryData: any;
  showBannerAdData = false;
  showSidebarAdData = false;
  showPosterAdData = false;
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
  pdfFileUploadd: any[] = [];
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
  getCuurentCatNameee: any;
  startdateMebershipPre: string;
  memberShipTypePre: string;
  enddateMebershipPre: any;
  showInterestPostCategory: any;
  showInterestPostId: any;
  UserFirstLastName: string;
  imgageOfCurrentUser: string;
  bannerAdData: any;
  sidebarAdData: any;
  posterAdData: any;
  user_email = "";
  // percent: any;
  constructor(
    public UserService: UserService,
    private likeService: LikeOfPostService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private AppComponent: AppComponent,
    private socketService: SocketioService,
    public CountryStateCityService: CountryStateCityService,
    // public AppComponent: AppComponent
  ) {

    // alert(this.getCatNamee);
  }
  clickHandlerDoc(event: any) {
    if (event.target.dataset.dismiss === "modal") {
      for (let index = 0; index < $('.ModalCloseClick').length; index++) {
        if (index != 3) {
          $('.ModalCloseClick')[index].reset();      
        }
      }
      $('.alert').hide();
      let getParamsId = this.activatedRoute.snapshot.url;
      this.getCuurentCatNameee = getParamsId[1].path;
      $('#category-create-post').val(this.getCuurentCatNameee);
      $('#category').val(this.getCuurentCatNameee);
      this.files = [];
      this.uploadPhotosfiles = [];
    }
  }
  // ionViewWillEnter() {
  //   let getParamsId = this.activatedRoute.snapshot.url;
  //   this.getCuurentCatNameee = getParamsId[1].path;
  //   let userLocalId = localStorage.getItem('userInfo');
  //   if (userLocalId != null) {
  //     this.wishlist();
  //     this.wishlistMedia();
  //     this.LikeStorage = JSON.parse(localStorage.getItem('LikeDataData'));
  //   }
  // }
  ngOnInit() {
    // alert("ngonit");
    let getUserId11 = localStorage.getItem('userInfo');
    if (getUserId11 == null) {
      let getLoginToken = this.activatedRoute.snapshot.queryParamMap.get('logToken');
      let dataForm = { login_token: getLoginToken, website: 'WeCoOwn' }
      if (getLoginToken != null) {
        this.UserService.checkForIsLoggedIn(dataForm).subscribe(result => {
          //console.log("resulttttttttttttttttttt in user component: ", result);
          if (result['success'] == true) {
            localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
            this.AppComponent.userProfileHide();
            this.StartOfPage();
          } else {
            this.StartOfPage();
          }
        });
      } else {
        this.StartOfPage();
      }
    } else {
      this.StartOfPage();
    }
  }

  StartOfPage() {
    // constructor 
    let getParamsIdee = this.activatedRoute.snapshot.url;
    this.getCatNamee = getParamsIdee[1].path;
    this.baseURLofAPi = environment.baseUrl;
    this.wishlist();
    this.wishlistMedia();
    this.getAllData();
    this.getCategoryPhotos();
    this.myPostCount();
    this.getAllBannerPosterSidebarAds(this.getCatNamee)
    document.addEventListener('click', this.clickHandlerDoc.bind(this)); // bind on doc
    // constructor
    let userLocalId = localStorage.getItem('userInfo');
    $('#show-hide-my-post-count').hide();
    if (userLocalId != null) {
      let parseData = JSON.parse(userLocalId);
      this.CurrentUserIDD = parseData['id'];
      this.user_email = parseData['email'];
      $('#show-hide-my-post-count').show();
    }
    // $('#show-hide-my-post-count').hide();
    // let userLocalId = localStorage.getItem('userInfo');
    // if (userLocalId != null) {
    //   $('#show-hide-my-post-count').show();
    // }
    this.buyerForm = new FormGroup({
      category: new FormControl(''),
      property_desciption: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      showPostToUser: new FormControl(''),
      user_id: new FormControl('')
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
      category: new FormControl(''),
      title: new FormControl(''),
      property_desciption: new FormControl('', [Validators.required]),
      property_photos: new FormControl('', [Validators.required]),
      url_property: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
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
    // for country state city
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
    // ********************
    // get country data from databse
    // $(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );
    this.getAllCountrydataFromWecoownServer()
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
  //   }, error => {
  //     ////console.log("errorrrrrrrrrrrrrr",error);
  //     if (error) {
  //       this.CountryStateCityService.getCountryAuth().subscribe(result => {
  //         localStorage.setItem('CountryAuthToken', JSON.stringify(result));
  //         // this.getAllCountryData();
  //         // location.reload();
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
    this.loading = true;
    let getParamsId = this.activatedRoute.snapshot.url;
    ////console.log("getParamsId : ", getParamsId[1].path);
    this.PageCategoryName = getParamsId[1].path;
    // for check user logged in or not
    let checkUserProfilee = localStorage.getItem('userInfo');
    let LoginCheckArray = [];
    let current_user_id = "";
    if (checkUserProfilee != null) {
      let parseData = JSON.parse(checkUserProfilee);
      LoginCheckArray = ['Public', 'Cohorts'];
      current_user_id = parseData['id'];
    }
    else {
      LoginCheckArray = ['Public'];
      current_user_id = "";
    }
    let dataForForm = {
      category_name: getParamsId[1].path,
      showPostToUser: LoginCheckArray,
      user_id: current_user_id
    }
    this.UserService.getCategoryByName(dataForForm).subscribe(result => {
      //console.log("result of get allllllllllllllllll dataaaaaaaaaaaaaaaaaaaaaa: ", result);
      this.loading = false;
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
        // for merge advertisement array
        let dataForm = {
          category: getParamsId[1].path
        }
        this.UserService.getAllPosterAdByCategory(dataForm).subscribe(result => {
          //console.log("result of get user poster ad : ", result);
          if (result['success'] == true) {
            let posterAd = [];
            posterAd = result['getData'];
            if (posterAd.length != 0 && this.BuyerData.length >= 3) {
              let countForPosting = 0;
              for (let ijk = 0; ijk < posterAd.length; ijk++) {
                // //console.log("countForPosting : ",countForPosting)
                // //console.log("this.BuyerData.length : ",this.BuyerData.length);                  
                // //console.log("ijk ",ijk)
                // //console.log("posterAd.length ",posterAd.length)
                if ((ijk + 1) == posterAd.length && countForPosting < this.BuyerData.length) {
                  this.BuyerData[countForPosting + 3].poster_ad_image = posterAd[ijk].ad_image
                  this.BuyerData[countForPosting + 3].poster_ad_url = posterAd[ijk].url_button
                  this.BuyerData[countForPosting + 3].poster_headline = posterAd[ijk].headline
                  this.BuyerData[countForPosting + 3].poster_description = posterAd[ijk].description
                  countForPosting = countForPosting + 3;
                }
                if ((ijk + 1) == posterAd.length && countForPosting < this.BuyerData.length) {
                  for (let innerLoop = 0; innerLoop < posterAd.length; innerLoop++) {
                    this.BuyerData[countForPosting + 3].poster_ad_image = posterAd[innerLoop].ad_image
                    this.BuyerData[countForPosting + 3].poster_ad_url = posterAd[innerLoop].url_button
                    this.BuyerData[countForPosting + 3].poster_headline = posterAd[innerLoop].headline
                    this.BuyerData[countForPosting + 3].poster_description = posterAd[innerLoop].description
                    countForPosting = countForPosting + 3;
                  }
                } else {
                  if (ijk != 0) {
                    this.BuyerData[countForPosting + 3].poster_ad_image = posterAd[ijk].ad_image
                    this.BuyerData[countForPosting + 3].poster_ad_url = posterAd[ijk].url_button
                    this.BuyerData[countForPosting + 3].poster_headline = posterAd[ijk].headline
                    this.BuyerData[countForPosting + 3].poster_description = posterAd[ijk].description
                    countForPosting = countForPosting + 3;
                  } else {
                    this.BuyerData[countForPosting + 2].poster_ad_image = posterAd[ijk].ad_image
                    this.BuyerData[countForPosting + 2].poster_ad_url = posterAd[ijk].url_button
                    this.BuyerData[countForPosting + 2].poster_headline = posterAd[ijk].headline
                    this.BuyerData[countForPosting + 2].poster_description = posterAd[ijk].description
                    countForPosting = countForPosting + 2;
                  }
                }
                //  Object.assign({}, posterAd[ijk], o2, o3);
                //  var a3 = Array.from(hash.values());
              }
              //console.log("after fffffffffffffffff : ", this.BuyerData);

              // var hash = new Map();
              // this.BuyerData.concat(this.posterAdData).forEach(function (obj) {
              //   // hash.set(obj.id, Object.assign(hash.get(obj.id) || {}, obj))
              // });
            } else if (posterAd.length != 0) {
              let countForPosterAd = 0;
              if (posterAd.length != 0) {
                this.showPosterAdData = true;
              }
              interval(2000).pipe(startWith(0)).subscribe(() => {
                if (countForPosterAd === posterAd.length) {
                  countForPosterAd = 0;
                }
                this.posterAdData = posterAd[countForPosterAd]
                countForPosterAd++
              });
            }
          }
        });
        ////console.log("buyer dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa", this.BuyerData);
        this.getPostMediaData = this.groupBy(result['postMediaData'], "post_id");
        ////console.log("this.getPostMediaData mediaa : ", this.getPostMediaData);
      }
      else if (result['success'] == false) {
        $(".verify-danger").html(result['message']);
        $('.verify-danger').show();
        $('.verify-success').hide();
        $('.property_head').focus();
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
      this.loading = true
      let dataForForm = {
        category: getParamsId[1].path,
        user_id: parseData['id']
      }
      this.UserService.getUserPostByCategory(dataForForm).subscribe(result => {
        this.loading = false;
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
          this.loading = false
          $('.property_head').focus();
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

  saveInterestData(buyerDId, newBuyerId, newbuyerName) {
    this.BuyerUserID = buyerDId,
      this.showInterestPostId = newBuyerId;
    this.showInterestPostCategory = newbuyerName;
  }

  submitBuyerForm() {
    this.loading = true
    let getParamsId = this.activatedRoute.snapshot.url;
    // for check user logged in or not
    let checkUserProfilee = localStorage.getItem('userInfo');
    let LoginCheckArray = [];
    let current_user_id = "";
    if (checkUserProfilee != null) {
      let parseData = JSON.parse(checkUserProfilee);
      LoginCheckArray = ['Public', 'Cohorts'];
      current_user_id = parseData['id'];
    }
    else {
      LoginCheckArray = ['Public'];
      current_user_id = "";
    }

    ////console.log("getParamsId : ", getParamsId[1].path);
    // alert($('#category').val())   

    this.buyerForm.value.user_id = current_user_id;
    this.buyerForm.value.category = getParamsId[1].path;
    this.buyerForm.value.country = $('#country-select').val();
    this.buyerForm.value.state = $('#state-select').val();
    this.buyerForm.value.city = $('#city-select').val()
    this.buyerForm.value.showPostToUser = LoginCheckArray;

    ////console.log("form register val : ", this.buyerForm.value);
    this.UserService.SearchFilterFor1Category(this.buyerForm.value).subscribe(result => {
      this.loading = false;
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
        this.loading = false
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
      $('.property_head').focus();
      $(".chatWithEmailDanger").html("Please enter name.<br>Please enter email eddress.<br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#name').val() == '' && ($('#email').val() == '' || !regex.test(emailVal))) {
      $('#email').focus();
      $('#name').focus();
      $('.property_head').focus();
      $(".chatWithEmailDanger").html("Please enter name.<br>Please enter email eddress.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#name').val() == '' && $('#email_text').val() == '') {
      $('#email_text').focus();
      $('#name').focus();
      $('.property_head').focus();
      $(".chatWithEmailDanger").html("Please enter name.<br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#name').val() == '') {
      $('#email_text').focus();
      $('#name').focus();
      $('.property_head').focus();
      $(".chatWithEmailDanger").html("Please enter name.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#email').val() == '' && $('#email_text').val() == '') {
      $('#email_text').focus();
      $('#email').focus();
      $('.property_head').focus();
      $(".chatWithEmailDanger").html("Please enter email eddress.<br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#email').val() == '') {
      $('#email').focus();
      $('.property_head').focus();
      $(".chatWithEmailDanger").html("Please enter email eddress.");
      $('.chatWithEmailDanger').show();
    }
    else if (!regex.test(emailVal) && $('#email_text').val() == '') {
      $('#email_text').focus();
      $('#email').focus();
      $('.property_head').focus();
      $(".chatWithEmailDanger").html("Please enter valid email address.<br>Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if (!regex.test(emailVal)) {
      $('#email').focus();
      $('.property_head').focus();
      $(".chatWithEmailDanger").html("Please enter valid email address.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#email_text').val() == "") {
      $('#email_text').focus();
      $('.property_head').focus();
      $(".chatWithEmailDanger").html("Please enter email text.");
      $('.chatWithEmailDanger').show();
    }
    else if ($('#accept-terms').prop("checked") == false) {
      $(".chatWithEmailDanger").html("Please check on checkbox of accept terms and condition.");
      $('.chatWithEmailDanger').show();
      $('.property_head').focus();
    }
    else {
      $('.chatWithEmailDanger').hide();
      this.loading = true
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
          this.loading = false;
          ////console.log("result : ", result);
          if (result['success'] == true) {
            $(".chatWithEmailSuccess").html(result['message']);
            $('.chatWithEmailSuccess').show();
            $('.chatWithEmailDanger').hide();
            $('.property_head').focus();
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
            $('.property_head').focus();
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
        $('.property_head').focus();
        location.reload();
      }
      else {
        $('.postDelete-success').hide();
        $('.property_head').focus();
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

  PdfFileDropped(event) {
    ////console.log("profile filessss : ", event);
    this.pdfFileUploadd = event;
    ////console.log("name of photo : ", this.profilePhotoName);
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
    if (this.CreatePostForm.value.category == "") {
      finalString += "Please select category name.<br>";
    }
    if (this.CreatePostForm.value.title == "") {
      finalString += "Please enter title.<br>";
    }
    if (this.CreatePostForm.value.country == "") {
      finalString += "Please select country.<br>";
    }
    if (this.CreatePostForm.value.state == "") {
      finalString += "Please select state.<br>";
    }
    if (this.CreatePostForm.value.city == "") {
      finalString += "Please select city.<br>";
    }
    if (this.CreatePostForm.value.property_desciption == "") {
      finalString += "Please enter property description.<br>";
    }
    if (this.pdfFileUploadd.length != 0) {
      if (this.pdfFileUploadd[0].name.substring(this.pdfFileUploadd[0].name.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
        finalString += "Please select document in pdf format.<br>";
      }
    }
    if (this.files.length == 0) {
      finalString += "Please select property photos.<br>";
    }
    if (this.files.length != 0) {
      let types = /(\.|\/)(jpeg|mp4|jpg|png|webm|mov)$/i;
      for (let i = 0; i < this.files.length; i++) {
        if (types.test(this.files[i].type) || types.test(this.files[i].name)) {
          // alert("file is valid");
        }
        else {
          // alert("file is invalid");
          finalString += "Please select property photos/videos only images in jpg/jpeg/png & videos in mp4/mov/webm.<br>";
          break;
        }
      }
    }
    if (fieldsOfCheckedArray.length === 0) {
      finalString += "Please check on 1 checkbox to be make photo as a cover photo.";
    }

    $(".CreatePost-Danger").html(finalString);
    $('.CreatePost-Danger').show();
    $('.property_head').focus();
    if (finalString === "") {
      this.loading = true
      $('.CreatePost-Danger').hide();
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      // for send status
      let cid1 = document.getElementById("status-public")['checked'];
      let cid2 = document.getElementById("status-cohorts")['checked'];
      let cid3 = document.getElementById("status-private")['checked'];
      let checkStatus = "";
      if (cid1 === true) {
        checkStatus = "Public";
      }
      if (cid2 === true) {
        checkStatus = "Cohorts";
      }
      if (cid3 === true) {
        checkStatus = "Private";
      }
      //console.log("checkstatus value", checkStatus)
      // form for buyer post
      let formData = new FormData();
      formData.append("user_id", parseData['id']);
      formData.append("category", this.getCatNamee);
      formData.append("title", this.CreatePostForm.value.title);
      formData.append("country", this.CreatePostForm.value.country);
      formData.append("state", this.CreatePostForm.value.state);
      formData.append("city", this.CreatePostForm.value.city);
      formData.append("property_desciption", this.CreatePostForm.value.property_desciption);
      formData.append("url_property", this.CreatePostForm.value.url_property);
      formData.append("showPostToUser", checkStatus);
      if (this.pdfFileUploadd.length != 0) {
        formData.append("pdfFile", this.pdfFileUploadd[0]);
      }
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }

      for (var i = 0; i < this.files.length; i++) {
        if (fieldsOfCheckedArray[0].value == i) {
          formData.append("is_cover_photo", this.files[i].name);
        }
      }

      //console.log("form register val : ", formData);
      this.UserService.setIAmBuyer(formData).subscribe(result => {
        this.loading = false;
        ////console.log("result : ", result);
        if (result['success'] == true) {
          $(".CreatePost-Success").html(result['message']);
          $('.CreatePost-Success').show();
          $('.CreatePost-Danger').hide();
          $('.property_head').focus();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".CreatePost-Danger").html(result['message']);
          $('.CreatePost-Danger').show();
          $('.CreatePost-Success').hide();
          $('.property_head').focus();
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
      $('.property_head').focus();
    }
    else {
      this.loading = true
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
        this.loading = false;
        ////console.log("result : ", result);
        if (result['success'] == true) {
          $(".uploadPhotos-Success").html(result['message']);
          $('.uploadPhotos-Success').show();
          $('.uploadPhotos-Danger').hide();
          $('.property_head').focus();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".uploadPhotos-Danger").html(result['message']);
          $('.uploadPhotos-Success').hide();
          $('.uploadPhotos-Danger').show();
          $('.property_head').focus();
        }
      });
    }
  }

  submitSendMsgForm() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    this.UserFirstLastName = parseData['firstname'] + ' ' + parseData['lastname'];
    if (parseData['profile_pic'].length != 0) {
      ////console.log("profile imageeeeeeeeee");
      if (parseData['profile_pic'][0].src != undefined) {
        ////console.log("innerrr");
        this.imgageOfCurrentUser = this.baseURLofAPi + parseData['profile_pic'][0].src;
      }
      else {
        this.imgageOfCurrentUser = '/assets/images/user1.png';
      }
      ////console.log("this.imgageOfUser", this.imgageOfUser);
    }
    else {
      this.imgageOfCurrentUser = '/assets/images/user1.png';
    }
    this.sendMsgForm.value.current_user_id = parseData['id'];
    this.sendMsgForm.value.buyer_user_id = this.BuyerUserID;
    let dataForForm = {
      user_id: parseData['id'],
      buyer_id: this.BuyerUserID,
      property_id: this.showInterestPostId,
    }
    if (userLocalId != null) {
      //console.log("form data: ", dataForForm);
      this.UserService.CreateChat(dataForForm).subscribe(result => {
        //console.log("result : ", result);
        if (result['success'] == true) {
          if (result['chat_id']) {
            var newID = Math.random();
            let dataForSendChatMessage = {
              sender_id: parseData['id'],
              recevier_id: this.BuyerUserID,
              chat_message: "Hi, I'm interested in your property.",
              chat_id: result['chat_id'],
              sender_name: this.UserFirstLastName,
              new_id: newID,
              sender_image: this.imgageOfCurrentUser,
              property_id: this.showInterestPostId,
            }
            this.callNotificationMsg(dataForSendChatMessage);
            let setVar = {
              chat_id: result['chat_id'],
              recevier_id: this.BuyerUserID
            }
            localStorage.setItem('CurrentChatToBeOpen', JSON.stringify(setVar));
          }
          location.href = '/chat-message?FromOther=yes';
        }
      });
    }
  }

  callNotificationMsg(dataForMessage) {
    // alert(dataForMessage);
    // Notification.requestPermission(function (permission) {
    //   if (permission !== 'granted') {
    //     $('#allow_notify').show();
    //   } else {
    //     $('#allow_notify').hide();
    //   }
    // });
    this.socketService.sendMessage(dataForMessage);
  }
  // submitSendMsgForm() {
  //   $('.chatSuccess').hide();
  //   $('.chatDanger').hide();
  //   let chatmsg = $('#chatmsg').val();
  //   if (chatmsg == '' || chatmsg == undefined) {
  //     $('#chatmsg').focus();
  //     $(".chatDanger").html("Please enter chat message.");
  //     $('.chatDanger').show();
  //   }
  //   else {
  //     $('.chatDanger').hide();
  //     let userLocalId = localStorage.getItem('userInfo');
  //     let parseData = JSON.parse(userLocalId);
  //     this.sendMsgForm.value.current_user_id = parseData['id'];
  //     this.sendMsgForm.value.buyer_user_id = this.BuyerUserID;
  //     let dataForForm = {
  //       user_id: parseData['id'],
  //       buyer_id: this.BuyerUserID,
  //       property_name: this.showInterestPostCategory,
  //       property_id: "",
  //       chat_message: chatmsg
  //     }
  //     //console.log("form data: ", dataForForm);
  //     this.UserService.chatMessage(dataForForm).subscribe(result => {
  //       //console.log("result : ", result);
  //       if (result['success'] == true) {
  //         $(".chatSuccess").html(result['message']);
  //         $('.chatSuccess').show();
  //         $('.chatDanger').hide();
  //         $('#chatmsg').val('');
  //       }
  //       else if (result['success'] == false) {
  //         $(".chatDanger").html(result['message']);
  //         $('.chatSuccess').hide();
  //         $('.chatDanger').show();
  //         $('#chatmsg').val('');
  //       }
  //     });
  //   }
  // }

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
        $('.property_head').focus();
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
        $('.property_head').focus();
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

  // getPostImageArrayy(index) {
  //   this.getPostMediaAllData = index;
  //   $('#carousel-one-post .carousel-item').remove();
  //   ////console.log("alll post imagesssssssssssssssss", index[0].src);
  //   index.forEach(element => {
  //     $('<div class="carousel-item"><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" style="height: 400px;"></div>').appendTo('#carousel-one-post .carousel-inner');
  //   });
  //   $('#carousel-one-post .carousel-item').first().addClass('active');
  // }

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
          //console.log("result of like post in mediaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa: ", result);
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
        //console.log("result of media like wish : ", result);
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
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId != null) {

    } else{
      $('#show-not-login-model').show();
    }
  }
  getAllBannerPosterSidebarAds(category_name) {
    let dataForm = {
      category: category_name
    }
    this.UserService.getAllBannerAdByCategory(dataForm).subscribe(result => {
      // //console.log("result of get user post : ", result);
      if (result['success'] == true) {
        let bannerAd = [];
        bannerAd = result['getData'];
        let count = 0;
        if (bannerAd.length != 0) {
          this.showBannerAdData = true;
        }
        interval(20000).pipe(startWith(0)).subscribe(() => {
          if (count === bannerAd.length) {
            count = 0;
          }
          this.bannerAdData = bannerAd[count]
          count++
        });
      }
    });
    this.UserService.getAllSidebarAdByCategory(dataForm).subscribe(result => {
      //console.log("result of get user post sidebar : ", result);
      if (result['success'] == true) {
        let sidebarAd = [];
        sidebarAd = result['getData'];
        let count = 0;
        if (sidebarAd.length != 0) {
          this.showSidebarAdData = true;
        }
        interval(20000).pipe(startWith(0)).subscribe(() => {
          if (count === sidebarAd.length) {
            count = 0;
          }
          this.sidebarAdData = sidebarAd[count]
          count++
        });
      }
    });
    // this.UserService.getAllPosterAdByCategory(dataForm).subscribe(result => {
    //   //console.log("result of get user poster ad : ", result);
    //   if (result['success'] == true) {
    //     let posterAd = [];
    //     posterAd = result['getData'];
    //     let count = 0;
    //     if (posterAd.length != 0) {
    //       this.showPosterAdData = true;
    //       this.posterAdData = posterAd
    //     }
    //   }
    // });
  }
  goToExternalUrl(other_url) {
    window.open(other_url, other_url);
    return false;
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