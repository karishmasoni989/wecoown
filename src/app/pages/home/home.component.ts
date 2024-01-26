import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AppComponent } from '../../app.component';
import { UserService } from '../../service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GoogletranslateService } from '../../service/googletranslate.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  propertyType: any;
  checkClickSale1: string;

  constructor(private AppComponent: AppComponent,
    public UserService: UserService,
    private router: Router,
    public GoogletranslateService: GoogletranslateService,
  ) {
    this.AppComponent.userProfileHide();
  }
  ngOnInit() {
    this.getPropertyType();
    let checkUserProfilee = localStorage.getItem('userInfo');
    ////console.log("local user profile : ", JSON.stringify(checkUserProfilee));
    if (checkUserProfilee != null) {
      // $('#buyerHome').hide();
      // $('#sellerHome').hide();
    }
    // setInterval(function(){ $('.carousel-control-next').trigger('click'); }, 1500);

    // alert("jjjjjjjjjj")
    // $('.carousel-control-next').trigger('click');
    //   $('#homeCarousel').carousel({
    //     interval: 1500
    // });
  }
  ngAfterViewInit() {

  }
  getPropertyType() {
    this.UserService.getPropertyType().subscribe(result => {
      if (result['success'] == true) {
        this.propertyType = (result['data']);
      }
    });
  }
  goToForSale(check) {
    this.checkClickSale1 = '';
    if (check === 1) {
      this.checkClickSale1 = 'For Sale'
    } else {
      this.checkClickSale1 = 'For Lease'
    }
    // location.href = "/all-listing?purpose="+this.checkClickSale;
    this.router.navigate(['/all-listing'], {
      queryParams: {
        purpose: this.checkClickSale1,
      },
    });
  }
  goToSearch(id) {
    if (id === 1) {
      this.router.navigate(['/all-listing'], {
        queryParams: {
          searchPurpose: 'For Sale',
          propertyType: $('#sale-category').val(),
          keywords: $('#sale-keywords').val(),
        },
      });
    } else {
      this.router.navigate(['/all-listing'], {
        queryParams: {
          searchPurpose: 'For Lease',
          propertyType: $('#lease-category').val(),
          keywords: $('#lease-keywords').val(),
        },
      });
    }
  }
  // for google translate
  translateStr(str) {
    let defaultLang = 'en';
    let toLang = localStorage.dropDownSelectedLanguage || 'en';
    return this.GoogletranslateService.translateText(str, JSON.parse(toLang), defaultLang);
    // //console.log("type of : ",typeof(convertedStr))
    // //console.log(`converted ${str} to ${convertedStr}`);
    // return convertedStr
  }
  goToWeCoown() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    ////console.log("local user profile : ", JSON.stringify(checkUserProfilee));
    if (userLocalId != null) {
      let formDataSend = {};
      this.UserService.updateUserRolewhenWebsiteChange(formDataSend, parseData['id']).subscribe(result => {
        //console.log("result : ", result);
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
          this.AppComponent.userProfileHide();
          window.open('http://wecoown.com/','http://wecoown.com/');
          return false;
        }
      });
    } else {
      window.open('http://wecoown.com/','http://wecoown.com/');
      return false;
    }
  }
}

