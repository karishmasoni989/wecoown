import { Component } from '@angular/core';
import { UserService } from '../app/service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import {
  SocketioService
} from './service/socketio.service';
import { PushNotificationsService} from 'ng-push';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weCoOwn';
  newsSubscribeForm: FormGroup;
  getSearchMember: any;
  imgageOfUser: "";
  localCurrentUserId: any;
  baseURLofAPi: string;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private socketService: SocketioService,
    private _pushNotifications: PushNotificationsService
  ) {
    document.addEventListener('click', this.offClickHandler.bind(this)); // bind on doc
  }
  ngOnInit() {
    this.baseURLofAPi = environment.baseUrl;
    this.userProfileHide();
    this.newsSubscribeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    /* start enter button trigger*/
    $(".CheckFormNews").keypress(function (e) {
      if (e.which === 13) {
        $('#NewsformSubmit').trigger('click');
      }
    });
    /* end enter button trigger*/
    // window.addEventListener("click", function(){
    //   if (document.getElementById("mySidenav").style.width) {
    //     // alert(document.getElementById("mySidenav").style.width)
    //   } else {        
    //     document.getElementById("mySidenav").style.width = "0";
    //   }
    // });

    //set up socket connection if user logged in 
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    
    if (parseData && parseData['id']) {
      Notification.requestPermission(function(permission){
        if(permission !== 'granted'){
          $('#allow_notify').show();
        }else{
          $('#allow_notify').hide();
        }
    });
      this.socketService.setupSocketConnection();
    }
    /* end enter button trigger*/
    // window.addEventListener("click", function(){
    //   if (document.getElementById("mySidenav").style.width) {
    //     // alert(document.getElementById("mySidenav").style.width)
    //   } else {        
    //     document.getElementById("mySidenav").style.width = "0";
    //   }
    // });
  }

  public userProfileHide() {
    // /for user profile
    let checkUserProfile = localStorage.getItem('userInfo');
    let JsUserProfile = JSON.parse(checkUserProfile);
    if (checkUserProfile != null) {
      this.localCurrentUserId = JsUserProfile['id'];
      if (JsUserProfile['profile_pic'].length != 0) {
        if (JsUserProfile['profile_pic'][0].src != undefined) {
          this.imgageOfUser = JsUserProfile['profile_pic'][0].src;
        }
        else {
          this.imgageOfUser = "";
        }
      }
      else {
        this.imgageOfUser = "";
      }
      document.getElementById("userProfileImg").style.display = "inline-block";
      // document.getElementById("profileMobileView").style.display = "inline-block";      
      document.getElementById("EditButtonShow").style.display = "inline-block";
      document.getElementById("settingButtonShow").style.display = "inline-block";
      document.getElementById("SignoutButtonShow").style.display = "inline-block";
      document.getElementById("login1").style.display = "none";
      document.getElementById("login1").style.display = "none";
      document.getElementById("login2").style.display = "none";
      // document.getElementById("login3").style.display = "none";
      document.getElementById("register1").style.display = "none";
      document.getElementById("register2").style.display = "none";
      // document.getElementById("register3").style.display = "none";
      // $('.dashboardNoneLog').hide();
      // $('#userProfileImg').show();
    }
    else {
      this.imgageOfUser = "";
    }
    // else{
    //   location.reload();
    // }
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
          panel.style.maxHeight = "470px";
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
    localStorage.removeItem('userInfo');
    $(location).attr('href', '/')
    // this.router.navigate(['/']);
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
        console.log("result : ", result);
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
      console.log("iffffffffffff");
      this.UserService.searchForMembers(formVal).subscribe(result => {
        console.log("result : ", result);
        if (result['success'] == true) {
          if (result['dataCount'] == 0) {
            console.log("ifffffff datacountttttt");
            this.getSearchMember = [];
            $('#no-search-result').show();
          }
          else if (result['dataCount'] != 0) {
            $('#no-search-result').hide();
            this.getSearchMember = result['getData'];
            console.log(this.getSearchMember[0].profile_pic);
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
      $(location).attr('href', '/member-detail/' + val)
    }
  }

  offClickHandler(event: any) {
    if (event.target.id != 'search-input-bar') {
      $('.all-search-list').hide();
    }
    else {
      $('.all-search-list').show();
    }
  }
}
