import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search-for-buyer',
  templateUrl: './search-for-buyer.component.html',
  styleUrls: ['./search-for-buyer.component.css']
})
export class SearchForBuyerComponent implements OnInit {
  buyerForm: FormGroup;
  steps: any;
  categoryArray: any;
  FinalArray: any;
  ImgArray:[];
  // fileOver: boolean;
  //fileDropped: any;
  files: any[] = [];
  searchData: any;
  allBuyerData: any;
  photosFirst: any;
  selctedVal: any;
  startPhotos: any;
  // percent: any;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buyerForm = new FormGroup({
      category: new FormControl(),
      property_desciption: new FormControl('')     
    });
    this.getCategory();
    this.getAllBuyerData(); 
  }
  ngAfterViewInit() {
  //   $('.owl-carousel-buyer').owlCarousel({
  //     loop:true,
  //     margin:10,
  //     nav:true,
  //     autoplay: true,
  //     autoplayTimeout: 5000,
  //     responsive:{
  //         0:{
  //             items:1
  //         },
  //         600:{
  //             items:3
  //         },
  //         1000:{
  //             items:3
  //         }
  //     }
  // }) 
}
  getCategory() {
    this.UserService.getAllCategory().subscribe(result => {
      ////console.log("result : ", result);
      if (result['success'] == true) {
        ////console.log(result['message']);
        ////console.log(result['categoryData']);
        this.categoryArray = (result['categoryData']);
      }
      else if (result['success'] == false) {
        ////console.log(result['message']);
      }
    });
  }

  getAllBuyerData() {
    this.UserService.getAllBuyerData().subscribe(result => {
      ////console.log("result : ", result);
      if (result['success'] == true) {
        ////console.log(result['message']);
        ////console.log(result['data']);
        this.allBuyerData = (result['data']);
        ////console.log('property photos : ',this.allBuyerData[2].property_photos);  
      }
      else if (result['success'] == false) {
        ////console.log(result['message']);
      }
    });
  }

  submitBuyerForm() {  
    // alert($('#category').val())
    this.buyerForm.value.category = $('#category').val();
    this.selctedVal = $('#category').val();
      $('.BuyerDanger').hide();
      ////console.log("form register val : ", this.buyerForm.value);
      this.UserService.SearchBuyerFilter(this.buyerForm.value).subscribe(result => {
        ////console.log("result : ", result);        
        if (result['success'] == true) {    
             if(result['dataCount'] == 0){
              $('#No-data-found').show();         
             }  
             else{
              $('#No-data-found').hide();         
             } 
          $('.BuyerDanger').hide();   
          this.searchData = result['getData'];  
          $('#first-section-buyer').hide();
          $('#second-section-buyer').show();         
          // this.photosFirst = this.searchData.property_photos    
        }
        else if (result['success'] == false) {
          $(".BuyerDanger").html(result['message']);
          $('.BuyerDanger').show();
          $('.BuyerSuccess').hide();
        }
      });
  }
}