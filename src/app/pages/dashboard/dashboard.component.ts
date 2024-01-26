import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../../app.component';
// import { MessageService } from '../../service/message.service'
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  registerForm: FormGroup;
  selectedItemsList = [];
  checkedIDs = [];
  interests = []; bChecked; wChecked; oChecked;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private AppComponent: AppComponent,
  ) {
    this.AppComponent.userProfileHide();
    this.ngOnInit();
   }
  //  ionViewWillEnter(){
  //   this.ngOnInit();
  //  }
  ngOnInit() {
   
  }


}


