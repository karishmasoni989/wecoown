import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-ads',
  templateUrl: './manage-ads.component.html',
  styleUrls: ['./manage-ads.component.css']
})

export class ManageAdsComponent implements OnInit {
  bannerForm: FormGroup;
  steps: any;
  categoryArray: any;
  FinalArray: any;
  ImgArray: [];
  // fileOver: boolean;
  @HostBinding('class.fileover') fileOver: boolean;
  //fileDropped: any;
  @Output() fileDropped = new EventEmitter<any>();
  files: any[] = [];
  CurrentUserId: any;
  posterForm: FormGroup;
  sidebarForm: FormGroup;
  AdText: any;
  vendorPageListingForm: FormGroup;
  getAllAdData: any;
  getAllVendorData: any;
  StatusFrom: { name: any; id: any; status: any; };
  // percent: any;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.CurrentUserId = parseData['id'];
    }
    this.getAllAd();
    // $('.js-example-basic-multiple').select2();
  }

  getAllAd() { 
    let dataForm = {
      id: this.CurrentUserId
    }
    this.UserService.getAllAd(dataForm).subscribe(result => {
      ////console.log("result : ", result);
      if (result['success'] == true) {        
        this.getAllAdData = result['getBanner'].concat(result['getSidebar'],result['getPoster']);
        this.getAllVendorData = result['getVendor']
      }
    });
  }

  // for radio buttons check
  checkRadio(checkId) {
    if (checkId === 1) {     
      $('#all-ads-table').show();
      $('#vendor-ads-table').hide();    
    } else if (checkId === 2) {     
      $('#all-ads-table').hide();
      $('#vendor-ads-table').show();      
    }   
  }

  actionEdit(name, id){
    let setD = {
      name: name,
      id: id
    }
    localStorage.setItem("setAdEditId", JSON.stringify(setD));
    location.href = '/edit-ad';
  }

  actionStatus(name, id, status){
    var changeStatus = status;
    if (changeStatus === "Active") {
      changeStatus = "Inactive"
    } else {
      changeStatus = "Active";
    }
    this.StatusFrom = {
      name: name,
      id: id,
      status: changeStatus
    }
  }

  confirmStatus(){
    this.UserService.updateStatusOfAds(this.StatusFrom).subscribe(result => {
      ////console.log("result : ", result);
      if (result['success'] == true) {
          $(".ad-Success").html(result['message']);
          $('.ad-Success').show();
          $('.ad-danger').hide();
          location.reload();
        }
        else if (result['success'] == false) {
          $(".ad-danger").html(result['message']);
          $('.ad-danger').show();
          $('.ad-danger').hide();
        }    
    });
  }
}
