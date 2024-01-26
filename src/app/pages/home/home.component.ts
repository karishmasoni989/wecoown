import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../../app.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  WePoLink: string;
  constructor(private AppComponent: AppComponent,
    public UserService: UserService,    
    ) {
    this.AppComponent.userProfileHide();
   }

  ngOnInit() {
    this.WePoLink = environment.WePoUrl;
  }

  goToWePo(){
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    ////console.log("local user profile : ", JSON.stringify(checkUserProfilee));
    if (userLocalId != null) {
      let formDataSend = { };
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
          window.open(this.WePoLink ,this.WePoLink);
          return false;
        }  
      });
    }else{
      window.open(this.WePoLink ,this.WePoLink);
      return false;
    }
  }
}
