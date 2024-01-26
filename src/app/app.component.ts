import { Component, Injectable } from '@angular/core';
import { UserService } from '../app/service/user.service';
import { CountryStateCityService } from '../app/service/country-state-city.service';
import { Router, ActivatedRoute, ParamMap, NavigationStart, Event } from '@angular/router';
import * as $ from 'jquery';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { interval, Observable } from 'rxjs';
import { SocketioService } from './service/socketio.service';
import { PushNotificationsService } from 'ng-push';
// for social lgoin
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
// import 'rxjs/add/operator/do';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weCoOwn';
  newsSubscribeForm: FormGroup;
  getSearchMember: any;
  imgageOfUser: "";
  localCurrentUserId: any;
  baseURLofAPi: string;
  subscription: any;
  WePoLink: string;
  getNotificationData: any;
  loading = false;
  MessageUnreadCount = 0;
  NotificationUnreadCount = 0;
  getOnePortfolioData: any;
  // PortfolioMemberCount = 1;
  PortfolioMemberData: any[] = [];
  getAdminApproveProfileMemberData: any[] = [];
  Accept_Reject_Check: boolean;
  currentLocalUserData: any;
  getRequestForAdminApprovalData: any;
  recevierUserIdWantsAdmin: any;
  getAdminOnePbmsData: any;
  getRequestForProperty: any;
  getCohortRequest: any;
  showNoNotification: boolean;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    public CountryStateCityService: CountryStateCityService,
    private socketService: SocketioService,
    private _pushNotifications: PushNotificationsService,
    private authService: SocialAuthService
  ) {
    // this.checkUserLoggedInterval();
    document.addEventListener('click', this.offClickHandler.bind(this)); // bind on doc 
    window.addEventListener('load', this.loadHadler.bind(this));
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        document.documentElement.scrollTop = 0;
      }
    });
    // set value for language
    let getPreviousCurrentLang = localStorage.getItem('CurrentLanguage');
    let dataForLanguage = {
      language: 'en'
    }
    // console.log('getPreviousCurrentLang'+getPreviousCurrentLang);
    if (getPreviousCurrentLang === null || getPreviousCurrentLang === undefined) {
      localStorage.setItem('CurrentLanguage',JSON.stringify(dataForLanguage));
    }
    let getPreviousSelectLang = localStorage.getItem('SelectedLanguage');
    // console.log('getPreviousSelectLang'+getPreviousSelectLang);
    if (getPreviousSelectLang === null || getPreviousSelectLang === undefined) {
      localStorage.setItem('SelectedLanguage',JSON.stringify(dataForLanguage));
    }
  }
  ngOnInit() {
    // if (environment.production) {
    //   if (location.protocol === 'http:') {
    //     window.location.href = location.href.replace('http', 'https');
    //   }
    // }
    this.baseURLofAPi = environment.baseUrl;
    this.WePoLink = environment.WePoUrl;
    this.userProfileHide();
    this.newsSubscribeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      website_name: new FormControl("WeCoOwn")
    });
    /* start enter button trigger*/
    $(".CheckFormNews").keypress(function (e) {
      if (e.which === 13) {
        $('#NewsformSubmit').trigger('click');
      }
    });
    // global user id
    let userLocalId33 = localStorage.getItem('userInfo');
    this.currentLocalUserData = JSON.parse(userLocalId33);
    // this.getCurrentLoggedInUserId = this.currentLocalUserData['id']
    //set up socket connection if user logged in 
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);

    if (parseData && parseData['id']) {
      Notification.requestPermission(function (permission) {
        if (permission !== 'granted') {
          // $('#allow_notify').show();
        } else {
          // $('#allow_notify').hide();
        }
      });
      this.socketService.setupSocketConnection();
    }
    //end set up socket connection if user logged in 
    // this.getCountryAuthh();
    // this.getAllCountryData();
    // for country state city
    //  this.subscription = this.EventPublishService.formRefreshSource$.subscribe(data => {
    //   this.getCountryAuthh();
    //   ////console.log('event callllllllllssssssssssssssssssssssssssssssssssss');
    // });
    /* end enter button trigger*/
    // window.addEventListener("click", function(){
    //   if (document.getElementById("mySidenav").style.width) {
    //     // alert(document.getElementById("mySidenav").style.width)
    //   } else {        
    //     document.getElementById("mySidenav").style.width = "0";
    //   }
    // });
  }
  checkUserLoggedInterval() {
    // alert("Method calll")
    let checkIn = interval(3000).subscribe(x => {
      let checkUserProfile = localStorage.getItem('userInfo');
      let dataForm = {};
      if (checkUserProfile != null) {
        let parseDD = JSON.parse(checkUserProfile);
        dataForm = {
          login_token: parseDD['login_token'],
          website: 'WeCoOwn'
        }
      } else {
        dataForm = {
          website: 'WeCoOwn'
        }
      }
      this.UserService.checkForIsLoggedIn(dataForm).subscribe(result => {
        // //console.log("resulttttttttttttttttttt : ", result);
        if (result['success'] == true) {
          if (result['userInfo']) {
            localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
            this.userProfileHide();
          }
        } else if (result['success'] == false) {
          let checkUserProfile = localStorage.getItem('userInfo');
          if (checkUserProfile != null) {
            localStorage.removeItem('userInfo');
            this.userProfileHide();
            location.reload();
          }
        }
      });
    });
  }
  public userProfileHide() {
    // /for user profile
    let checkUserProfile = localStorage.getItem('userInfo');
    ////console.log("local user profile : ", JSON.stringify(checkUserProfile));
    let JsUserProfile = JSON.parse(checkUserProfile);
    if (checkUserProfile != null) {
      this.UnreadMsgCount(JsUserProfile['id']);
      this.getUserNotifications(JsUserProfile['id']);
      this.localCurrentUserId = JsUserProfile['id'];
      ////console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", JsUserProfile['profile_pic']);
      if (JsUserProfile['profile_pic'].length != 0) {
        ////console.log("profile imageeeeeeeeee");
        if (JsUserProfile['profile_pic'][0].src != undefined) {
          ////console.log("innerrr");
          this.imgageOfUser = JsUserProfile['profile_pic'][0].src;
        }
        else {
          this.imgageOfUser = "";
        }
        ////console.log("this.imgageOfUser", this.imgageOfUser);
      }
      else {
        this.imgageOfUser = "";
      }
      let windowSizee;
      var WindowsSize = function () {
        var h = $(window).height(),
          w = $(window).width();
        $("#winSize").html("<p>Width: " + w + "<br>Height: " + h + "</p>");
        // console.log("width : ", w);
        windowSizee = w;
        if (windowSizee <= 991) {
          document.getElementById("userNofication1").style.display = "none";
          document.getElementById("userMessage1").style.display = "none";
          document.getElementById("userNofication2").style.display = "inline-block";
          document.getElementById("userMessage2").style.display = "inline-block";
        } else {
          document.getElementById("userNofication1").style.display = "inline-block";
          document.getElementById("userMessage1").style.display = "inline-block";
          document.getElementById("userNofication2").style.display = "none";
          document.getElementById("userMessage2").style.display = "none";
        }
      };
      $(document).ready(WindowsSize);
      $(window).resize(WindowsSize);
      // call notification API
      document.getElementById("userProfileImg").style.display = "inline-block";
      // document.getElementById("profileMobileView").style.display = "inline-block";      
      document.getElementById("EditButtonShow").style.display = "inline-block";
      document.getElementById("myVouchersButtonShow").style.display = "inline-block";
      document.getElementById("settingButtonShow").style.display = "inline-block";
      document.getElementById("forumButtonShow").style.display = "inline-block";
      document.getElementById("messageButton").style.display = "inline-block";
      document.getElementById("createAdButtonShow").style.display = "inline-block";
      document.getElementById("manageAdButtonShow").style.display = "inline-block";
      document.getElementById("SignoutButtonShow").style.display = "inline-block";
      document.getElementById("forum-list").style.display = "inline-block";
      document.getElementById("myCohortButtonShow").style.display = "inline-block";
      // document.getElementById("pmbs1").style.display = "inline-block";
      // document.getElementById("pmbs2").style.display = "inline-block";
      document.getElementById("portfolioButtonShow").style.display = "inline-block";
      document.getElementById("login1").style.display = "none";
      document.getElementById("login1").style.display = "none";
      document.getElementById("login2").style.display = "none";
      // document.getElementById("login3").style.display = "none";
      document.getElementById("register1").style.display = "none";
      document.getElementById("register2").style.display = "none";
      // document.getElementById("register3").style.display = "none";
      // $('.dashboardNoneLog').hide();
      // $('#userProfileImg').show();
      if (JsUserProfile['role'].length != 0) {
        for (let kk = 0; kk < JsUserProfile['role'].length; kk++) {
          if (JsUserProfile['role'][kk] === '2') {
            document.getElementById("my-posting1").style.display = "inline-block";
            document.getElementById("my-posting2").style.display = "inline-block";
          }
        }
      }
      if (JsUserProfile['is_admin'] === true) {
        document.getElementById("user-sigup-report1").style.display = "inline-block";
        document.getElementById("user-sigup-report2").style.display = "inline-block";
      }
    }
    else {
      this.imgageOfUser = "";
    }
    // else{
    //   location.reload();
    // }
  }
  UnreadMsgCount(getId) {
    let dataForm = {
      user_id: getId
    }
    this.UserService.getMessageUnreadCount(dataForm).subscribe(result => {
      ////console.log("resulttttttttttttttttttt of notifications: ", result);
      if (result['success'] == true) {
        if (result['notifyCount']) {
          this.MessageUnreadCount = result['notifyCount'];
          if (result['notifyCount'].length != 0) {
            localStorage.setItem("unreadMsg", JSON.stringify(result['countChatIds']))
          }
        }
      }
    });
  }
  ngAfterViewInit() {
    window.addEventListener('click', function (e) {
      // alert(document.getElementById("mySidenav").style.left)
      if (document.getElementById("mySidenav").style.left == '0px') {
        // alert("here inner")
        $('body,html').click(function (e) {
          document.getElementById("mySidenav").setAttribute(
            "style", "width: 275px; left: -275px; position: absolute;");
        });
      }
    })
    // for cookie
    const cookieContainer = document.querySelector(".cookie-container");
    const cookieButton = document.querySelector(".cookie-btn-accept");
    const cookieDeclineButton = document.querySelector(".cookie-btn-decline");

    cookieButton.addEventListener("click", () => {
      cookieContainer.classList.remove("active");
      localStorage.setItem("cookieBannerDisplayed", "true");
    });
    cookieDeclineButton.addEventListener("click", () => {
      cookieContainer.classList.remove("active");
      localStorage.setItem("cookieBannerDisplayed", "Decline");
    });

    setTimeout(() => {
      if (!localStorage.getItem("cookieBannerDisplayed")) {
        cookieContainer.classList.add("active");
      }
    }, 2000);
    // end cookie
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      // event.stopPropagation();
      acc[i].addEventListener("click", function () {
        event.stopPropagation();
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = "500px";
        }
      });
    }

    //Get the button for bottom to top
    var mybutton = document.getElementById("myBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    // window.onscroll = function () { scrollFunction() };

    // function scrollFunction() {
    //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //     mybutton.style.display = "block";
    //   } else {
    //     mybutton.style.display = "none";
    //   }
    // }

  }
  ChangeLanguageGlo(lang) {
    let data = {
      language: lang
    }
    localStorage.setItem('SelectedLanguage', JSON.stringify(data));
    location.reload();
  }
  loadHadler(event: any) {
    // let checkCountryAuth = localStorage.getItem('CountryAuthToken');
    // if (checkCountryAuth == null) {
    //   this.getCountryAuthh();
    //   this.getAllCountryData();
    // }
  }
  getCountryAuthh() {
    let checkAuthh = localStorage.getItem("CountryAuthToken")
    if (checkAuthh == null) {
      this.CountryStateCityService.getCountryAuth().subscribe(result => {
        ////console.log("result od countryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy: ", result);
        localStorage.setItem('CountryAuthToken', JSON.stringify(result));
        this.getAllCountryData();
      })
    }
  }
  getAllCountryData() {
    this.CountryStateCityService.GetAllCountryData().subscribe(result111 => {
      localStorage.setItem('AllCountries', JSON.stringify(result111));
    })
  }
  openNav(event) {
    $('.sidenav').css('width', '275px');
    document.getElementById("mySidenav").setAttribute(
      "style", "width: 275px ; left: 0px; position: absolute;");
    // document.getElementById("mySidenav").style.width = "275px";
    event.stopPropagation();
  }
  closeNav() {
    document.getElementById("mySidenav").setAttribute(
      "style", "width: 275px; left: -275px; position: absolute;");
    // document.getElementById("mySidenav").style.width = "0", left="0", position = "absolute"; 
  }
  signOut() {
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    let dataForForm = {
      email: parseData['email']
    }
    this.UserService.signOutUser(dataForForm).subscribe(result => {
      // //console.log("result : ", result);
      if (result['success'] == true) {
        localStorage.removeItem('userInfo');
        this.authService.signOut();
        this.checkUserLoggedInterval();
        $(location).attr('href', '/');
      }
    });
  }
  newsSubscribeSubmit() {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let newsEemailVal = $('#newsEmail').val();
    if ($('#newsName').val() == '' && ($('#newsEmail').val() == '' || !regex.test(newsEemailVal))) {
      $('#newsEmail').focus();
      $('#newsName').focus();
      $(".news-danger").html("Please enter name.<br>Please enter email address.");
      $('.news-danger').show();
    }
    else if ($('#newsName').val() == '') {
      $('#newsName').focus();
      $(".news-danger").html("Please enter name.");
      $('.news-danger').show();
    }
    else if ($('#newsName').val().length < 3 && ($('#newsEmail').val() == '' || !regex.test(newsEemailVal))) {
      $('#newsName').focus();
      $(".news-danger").html("Name must be greater than 2 character.<br>Please enter email address.");
      $('.news-danger').show();
    }
    else if ($('#newsName').val().length < 3) {
      $('#newsName').focus();
      $(".news-danger").html("Name must be greater than 2 character.");
      $('.news-danger').show();
    }
    else if ($('#newsEmail').val() == '') {
      $('#newsEmail').focus();
      $(".news-danger").html("Please enter email address.");
      $('.news-danger').show();
    }
    else if (!regex.test(newsEemailVal)) {
      $('#newsEmail').focus();
      $(".news-danger").html("Please enter valid email address.");
      $('.news-danger').show();
    }
    else {
      $('.news-danger').hide();
      this.UserService.NewsLetterSubscription(this.newsSubscribeForm.value).subscribe(result => {
        ////console.log("result : ", result);
        if (result['success'] == true) {
          $(".news-success").html(result['message']);
          $('.news-success').show();
          $('.news-success').focus();
          $('.news-danger').hide();
          $('#newsForm')[0].reset();
          // alert(JSON.stringify(result['userInfo']))
        }
        else if (result['success'] == false) {
          $(".news-danger").html(result['message']);
          $('.news-danger').show();
          $('.news-danger').focus();
          $('.news-success').hide();
          // alert(result['message']);
        }
      });
    }
  }
  onSearch(event) {
    $('#no-search-result').hide();
    // alert(event.target.value);
    let formVal = {
      searchMember: event.target.value
    }
    if (event.target.value != "") {
      ////console.log("iffffffffffff");
      this.UserService.searchForMembers(formVal).subscribe(result => {
        ////console.log("result : ", result);
        if (result['success'] == true) {
          if (result['dataCount'] == 0) {
            ////console.log("ifffffff datacountttttt");
            this.getSearchMember = [];
            $('#no-search-result').show();
          }
          else if (result['dataCount'] != 0) {
            $('#no-search-result').hide();
            this.getSearchMember = result['getData'];
            ////console.log(this.getSearchMember[0].profile_pic);
          }
        }
        else if (result['success'] == false) {
          this.getSearchMember = [];
          $('#no-search-result').hide();
        }
      })
    }
    else {
      $('#no-search-result').hide();
      this.getSearchMember = []
    }
  }
  goToMemberPage(val) {
    // alert(val)
    if (val === this.localCurrentUserId) {
      $(location).attr('href', '/user-profile');
    } else {
      localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
      window.location.href = '/member-detail';
    }
  }
  goToMemberPage11(val) {
    if (val === this.localCurrentUserId) {
      $(location).attr('href', '/user-profile');
    } else {
      localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
      window.open('/member-detail', '/member-detail');
      return false;
    }
  }
  goToMyCohorts() {
    localStorage.setItem('GoToMyCohortPage', JSON.stringify(this.localCurrentUserId));
    window.location.href = '/all-cohort';
  }
  offClickHandler(event: any) {
    if (event.target.id != 'search-input-bar') {
      $('.all-search-list').hide();
    }
    else {
      $('.all-search-list').show();
    }
    if (event.target.id != 'language-click-open-dropp') {
      $('#language-drop').hide();
    } else {
      $('#language-drop').show();
    }
    // if (event.target.id != 'userNofication1') {
    //   alert("click")
    //   $('#notication-content').hide();
    // } else {
    //   alert("elsee")
    //   $('#notication-content').show();
    // }
    if (event.target.id == 'userNofication1') {
      $('#notication-content').show();
    }
    else if (event.target.id == 'userNotifyIcon') {
      $('#notication-content').show();
    }
    else if (event.target.id == 'userNotifyICC') {
      $('#notication-content').show();
    }
    else {
      setTimeout(() => {
        $('#notication-content').hide();
      }, 500);
    }
  }
  goToWePo() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    ////console.log("local user profile : ", JSON.stringify(checkUserProfilee));
    if (userLocalId != null) {
      let formDataSend = {};
      this.UserService.updateUserRolewhenWebsiteChange(formDataSend, parseData['id']).subscribe(result => {
        ////console.log("result : ", result);
        if (result['success'] == true) {
          let new_userInfo = {
            id: parseData['id'],
            username: parseData['username'],
            firstname: parseData['firstname'],
            lastname: parseData['lastname'],
            email: parseData['email'],
            role: ['1', '2'],
            profile_pic: parseData['profile_pic'],
            login_token: parseData['login_token']
          }
          localStorage.setItem('userInfo', JSON.stringify(new_userInfo));
          this.userProfileHide();
          window.open(this.WePoLink, this.WePoLink);
          return false;
        }
      });
    } else {
      window.open(this.WePoLink, this.WePoLink);
      return false;
      // window.open(this.WePoLink, '_blank');
    }
  }
  goTocatrgpyList(name, sub_category) {
    // location.href = "/category-listing/" + name + '||' + sub_category;
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    ////console.log("local user profile : ", JSON.stringify(checkUserProfilee));
    if (userLocalId != null) {
      let formDataSend = {};
      this.UserService.updateUserRolewhenWebsiteChange(formDataSend, parseData['id']).subscribe(result => {
        ////console.log("result : ", result);
        if (result['success'] == true) {
          let new_userInfo = {
            id: parseData['id'],
            username: parseData['username'],
            firstname: parseData['firstname'],
            lastname: parseData['lastname'],
            email: parseData['email'],
            role: ['1', '2'],
            profile_pic: parseData['profile_pic'],
            login_token: parseData['login_token']
          }
          localStorage.setItem('userInfo', JSON.stringify(new_userInfo));
          this.userProfileHide();
          window.open(this.WePoLink + "category-listing/" + name + '||' + sub_category, this.WePoLink + "category-listing/" + name + '||' + sub_category);
          // window.open(this.WePoLink + "category-listing/" + name + '||' + sub_category, '_blank');
        }
      });
    } else {
      window.open(this.WePoLink + "category-listing/" + name + '||' + sub_category, this.WePoLink + "category-listing/" + name + '||' + sub_category);
    }
  }
  goToMyListing() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    ////console.log("local user profile : ", JSON.stringify(checkUserProfilee));
    if (userLocalId != null) {
      // location.href = 'http://localhost:4200/user-profile?logToken='+parseData['login_token'];
      // window.open('http://localhost:4200/category-by-name/Apartment%20Buildings?logToken='+parseData['login_token'], '_blank');      
      window.open(this.WePoLink + 'my-listing?logToken=' + parseData['login_token'], '_blank');
      // window.open('https://wecoown.com/user-profile?logToken='+parseData['login_token'], '_blank');      
    }
  }
  getUserNotifications(getId) {
    let dataForm = {
      user_id: getId
    }
    this.UserService.getNotifications(dataForm).subscribe(result => {
      // console.log("resulttttttttttttttttttt of notifications: ", result);
      if (result['success'] == true) {
        this.NotificationUnreadCount = 0;
        this.NotificationUnreadCount = result['dataCount'];
        this.getNotificationData = result['getData'];
        this.getRequestForAdminApprovalData = result['requestForAdminApproval'];
        this.getRequestForProperty = result['getRequestForProperty'];
        this.getCohortRequest = result['getAllrequestForCohorts'];
        if (result['getData'].length == 0 && result['requestForAdminApproval'].length == 0 && result['getRequestForProperty'].length == 0 && result['getAllrequestForCohorts'].length == 0) {
          this.showNoNotification = true;
          // $('#showNoNotification').show();
        } else {
          this.showNoNotification = false;
          // $('#showNoNotification').hide();
        }
        // if (this.getNotificationData.length != 0) {
        //   this.getNotificationData.forEach(element => {
        //       let getRec = element.recevier_id
        //       //console.log("rrrrrrrrr : ",getRec);
        //       for (let ijk = 0; ijk < getRec.length; ijk++) {
        //         //console.log(getRec[ijk].user_id._id, this.currentLocalUserData['id']);
        //         //console.log(getRec[ijk].read );
        //         if (getRec[ijk].user_id._id == this.currentLocalUserData['id']) {                  
        //           if (getRec[ijk].read == true) {
        //           }else{
        //             //console.log("hereeeeeeeeeeeeeeeeeeeeeee");                    
        //             this.NotificationUnreadCount = this.NotificationUnreadCount + 1;
        //           }
        //         }             
        //       }
        //   });
        // }

        // if (this.getNotificationData.length != 0) {
        //   this.getNotificationData.forEach(element => {
        //     element.recevier_id.forEach(elem2 => {
        //       if(elem2.read = false){
        //         count = count + 1;
        //       }
        //     });
        //   });
        // }
        // this.NotificationUnreadCount = count;
      }
    });
  }
  OpenNotificationindow() {
    let checkUserProfile = localStorage.getItem('userInfo');
    let JsUserProfile = JSON.parse(checkUserProfile);
    if (this.NotificationUnreadCount != 0) {
      // this.getNotificationData.forEach(element => {
      //   let dataForm = {
      //     user_id: JsUserProfile['id'],
      //     action: 2,
      //     portfolio_id: element._id
      //   }
      //   this.UserService.changeStatusAndReadPbms(dataForm).subscribe(result => {
      //     //console.log("resulttttttttttttttttttt of update portfolio readddddddddddddddddd: ", result);
      //   });
      // });
      this.NotificationUnreadCount = 0;
      let dataForm = {
        user_id: JsUserProfile['id']
      }
      this.UserService.setReadAtUserAllNotification(dataForm).subscribe(result => { });
    }
    // $('#notication-content').show();
  }
  openPortfolioPopup(id) {
    this.Accept_Reject_Check = true;
    this.loading = true;
    let dataForm = {
      id: id
    }
    //console.log("before : ", dataForm);
    this.UserService.getOnePbmsById(dataForm).subscribe(result => {
      this.loading = false;
      //console.log("resulttttttttttttttttttt of one portfolio: ", result);
      if (result['success'] == true) {
        this.PortfolioMemberData = [];
        this.getOnePortfolioData = result['getData'];
        // this.PortfolioMemberCount = 1;
        let getRec = this.getOnePortfolioData['recevier_id'];
        for (let ijk = 0; ijk < getRec.length; ijk++) {
          if (getRec[ijk].status === 'Accept') {
            // this.PortfolioMemberCount = this.PortfolioMemberCount + 1;
            this.PortfolioMemberData.push(getRec[ijk]);
            if (getRec[ijk].user_id._id == this.currentLocalUserData['id']) {
              this.Accept_Reject_Check = false;
            }
          }
        }
      }
    });
  }
  goToUpdateStatus(id, eve, adminVal) {
    this.Accept_Reject_Check = false;
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
        is_admin: adminVal,
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
    this.updateReadStatusPortfolio(dataForm, eve);
  }
  updateReadStatusPortfolio(dataForm, val) {
    this.UserService.changeStatusAndReadPbms(dataForm).subscribe(result => {
      //console.log("resulttttttttttttttttttt of update status portfolio: ", result);
      if (val == 1) {
        $(location).attr('href', '/pbms');
      } else {
        location.reload();
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
            if (getRec[ijk].user_id._id == this.currentLocalUserData['id']) {
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
        user_id: this.currentLocalUserData['id'],
        recevier_user_id: reqciver_user_id,
        group_id: group_id,
        status: 'Accept',
        action: 'Yes'
      }
    } else {
      dataForm = {
        user_id: this.currentLocalUserData['id'],
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
  goToReuestForAdmin(id) {
    this.loading = true;
    let dataFormm = {
      user_id: this.currentLocalUserData['id']
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
            user_id: this.currentLocalUserData['id']
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
    // let dataForm = {
    //   group_id: id,
    //   user_id: this.currentLocalUserData['id']
    // }
    // this.UserService.sendRequestForBecomeAdminOfPbms(dataForm).subscribe(result => {
    //   //console.log("resulttttttttttttttttttt of send request for become admin: ", result);
    //   if (result['success'] == true) {
    //         $('.sent-request-become-admin-danger').hide();
    //         $('.sent-request-become-admin-success').html(result['message']);
    //         $('.sent-request-become-admin-success').show();
    //       location.reload();
    //   }
    // });
  }
  // go to booking page
  goToBooking(item, title, all_admin_array) {
    //console.log("all admin array : ", all_admin_array);
    let checkIsAdmin = "No";
    for (let adminLoop = 0; adminLoop < all_admin_array.length; adminLoop++) {
      if (this.currentLocalUserData['id'] == all_admin_array[adminLoop].user_id) {
        checkIsAdmin = 'Yes';
        break;
      }
    }
    let BookData = {
      id: item,
      title: title,
      isAdmin: checkIsAdmin,
      allAdmin: all_admin_array
    }
    localStorage.setItem("SetBookData", JSON.stringify(BookData));
    this.router.navigate(['/book-pbms-property']);
  }
  sendResponseOfCohortRequest(action, req_id, memebrId) {
    // for accept request
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (action === 1) {
      // update cohort request to action
      let dataForForm = {
        request_id: req_id,
        action: 'Accept'
      }
      let dataForCreateCohort = {
        my_id: parseData['id'],
        receiver_id: memebrId
      }
      this.loading = true;
      this.UserService.createUserCohortConnection(dataForCreateCohort).subscribe(result => {
        this.loading = false;
        //console.log("result createUserCohortConnection : ", result);
        if (result['success'] == true) {
          this.updateAcceptRejectRequestCohort(dataForForm, parseData['id']);
        }
        else if (result['success'] == false) {
        }
      });
    } else if (action === 2) {
      let dataForForm = {
        request_id: req_id,
        action: 'Reject'
      }
      this.updateAcceptRejectRequestCohort(dataForForm, parseData['id']);
    }
  }
  updateAcceptRejectRequestCohort(data, currentId) {
    this.loading = true;
    this.UserService.setAcceptRejectResponseToCohort(data).subscribe(result => {
      this.loading = false;
      location.reload();
      // this.getUserNotifications(currentId);
      //console.log("accept or reject req : ", result);
    });
  }
}