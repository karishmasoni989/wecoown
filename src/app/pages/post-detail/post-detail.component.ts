import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { LikeOfPostService } from '../../service/like-of-post.service'
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  updateMarkSoldOutForm: FormGroup 
  datePickerConfig = { format: "MM/DD/YYYY", firstDayOfWeek: "mo" };
  baseURLofAPi: string;
  MemberIdURL: string;
  getData: any;
  getPhtosALL: any;
  currentUSERR: any;
  customOptions: OwlOptions = {
    loop: true,
    // margin: 10,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    // navSpeed: 700,
    autoplayHoverPause: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
  }
  MemberNameURL: any;
  loading = false;
  mark_sold_out_date: any;
  selling_price: any;
  constructor(private UserService: UserService,
    private likeService: LikeOfPostService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }
  ionViewWillEnter() {
    this.baseURLofAPi = environment.baseUrl;
    let getParamsId = this.activatedRoute.snapshot.url;
    let splitDATA = getParamsId[1].path.split('||');
    this.MemberNameURL = splitDATA[1];
    this.MemberIdURL = splitDATA[0];
    this.getDataPostById();
    ////console.log("local user profile : ", JSON.stringify(checkUserProfile));
    let checkUserProfile = localStorage.getItem('userInfo');
    ////console.log("local user profile : ", JSON.stringify(checkUserProfile));
    let JsUserProfile = JSON.parse(checkUserProfile);    
    if (checkUserProfile != null) {
      this.currentUSERR = JsUserProfile['id'];
    }
  }
  ngOnInit() {
    this.baseURLofAPi = environment.baseUrl;
    let getParamsId = this.activatedRoute.snapshot.url;
    let splitDATA = getParamsId[1].path.split('||');
    this.MemberNameURL = splitDATA[1];
    this.MemberIdURL = splitDATA[0];
    this.getDataPostById();
    let checkUserProfile = localStorage.getItem('userInfo');
    ////console.log("local user profile : ", JSON.stringify(checkUserProfile));
    let JsUserProfile = JSON.parse(checkUserProfile);
    if (checkUserProfile != null) {
      this.currentUSERR = JsUserProfile['id'];
    }
    this.updateMarkSoldOutForm = new FormGroup({
      selling_price: new FormControl(),
      selling_date: new FormControl(),
      Sold_out: new FormControl(),
      property_type: new FormControl()
    });
  }
  getDataPostById() {
    this.loading = true;
    let dataForForm = {
      id: this.MemberIdURL,
      name: this.MemberNameURL
    }
    this.UserService.wePogetPostingById(dataForForm).subscribe(result => {
      //console.log("result : ", result);
      this.loading = false;
      if (result['success'] == true) {
        this.getData = result['getData'];
        if (this.getData[0].selling_date == null) {          
          this.mark_sold_out_date = "";
        } else {
          this.mark_sold_out_date = this.getData[0].selling_date;
        }
        //console.log("this.mark_sold_out_date",this.mark_sold_out_date);
        this.selling_price = this.getData[0].selling_price;
        if (this.getData[0].property_photos.length > 1) {
          this.getPhtosALL = this.getData[0].property_photos;
          //console.log("get photossss");
          $('#only-one-photo').hide();
        }
        this.getPostImageArrayy();
      }
    });
  }
  getPostImageArrayy() {

    //   let string:string
    //   for(let i=0;i<=this.getPhtosALL.length -1;i++){
    //     string += '<div class="item"><div style="display: inline-block; position: relative; text-align: center;" class="lab-grid-cell w-third--d w-half--t w-full--m"> <div style="    background: #222f3e; height: 200px; overflow: hidden; margin: 2px;    " class="img-hover-zoom img-hover-zoom--brightness"> <img style="cursor:pointer;filter: brightness(80%); width: 100%; height: 100%;" src=" '+this.backend_url+'/assets/pdf/images/'+this.getPhtosALL[i].thumbnail+' "> </div> <a href="javascript:void(0);" > <h3 class="doc-category" id="'+this.getPhtosALL[i].id+'"  style="position: absolute; bottom: 0; color: #fff; text-align: center; width: 100%;">'+this.getPhtosALL[i].name+'</h3></a> </div> </div>';
    //   }
    //  string = string.replace('undefined','');
    //  $('.documentation').append(string);


    // $('#carousel-one-post .carousel-item').remove();
    ////console.log("alll post imagesssssssssssssssss", index[0].src);
    // //console.log("all phot : ", this.getPhtosALL);
    // let string11 :string
    // for(let i=0;i<=this.getPhtosALL.length -1;i++){
    //   string11 += '<div class="item"><div ><img alt="Image is loading" src="' + (this.baseURLofAPi + this.getPhtosALL[i].src) + '"></div></div>'

    // }
    // string11 = string11.replace('undefined','');
    // $('.listingDetailSpecificPhoto').append(string11);
    // this.getPhtosALL.forEach(element => {
    //   //console.log("srcc : ", this.baseURLofAPi + element.src);
    //   $('<div class="item"><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" style="height: 500px;"></div>').appendTo('.listingDetailSpecificPhoto');
    // });
    // this.getPhtosALL.forEach(element => {
    //   //console.log("srcc : ", this.baseURLofAPi + element.src);
    //   $('<div class="carousel-item"><img alt="Image is loading" src="' + (this.baseURLofAPi + element.src) + '" width="100%" style="height: 500px;"></div>').appendTo('#carousel-one-post .carousel-inner');
    // });
    // $('#carousel-one-post .carousel-item').first().addClass('active');
  }
  // deletePost(postId, name) {
  //   localStorage.setItem("deleteListingID", JSON.stringify(postId))
  // }
  confirmDeletePost() {
    this.loading = true;
    let dataForForm = {
      id: this.MemberIdURL
    }
    if (this.MemberNameURL == 'Real Estate') {
      this.UserService.DeletePostingRealestate(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
    else if (this.MemberNameURL == 'Jets & Aircraft') {
      this.UserService.DeletePostingAircraft(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
    else if (this.MemberNameURL == 'Yachts & Ships') {
      this.UserService.DeletePostingYacht(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
    else if (this.MemberNameURL == 'Crowdfunding Projects') {
      this.UserService.DeletePostingCrowdFunding(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
    else if (this.MemberNameURL == 'Artworks & Antiques') {
      this.UserService.DeletePostingArtwork(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
    else if (this.MemberNameURL == 'Cars & RVs') {
      this.UserService.DeletePostingCarsRv(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
    else if (this.MemberNameURL == 'Business Properties') {
      this.UserService.DeletePostingBusiness(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
    else if (this.MemberNameURL == 'Crypto-Assets') {
      this.UserService.DeletePostingCrypto(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
    else if (this.MemberNameURL == 'Horses & Live Stocks') {
      this.UserService.DeletePostingHorses(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
    else if (this.MemberNameURL == 'Health Care') {
      this.UserService.DeletePostingHealthCare(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Hospitality') {
      this.UserService.DeletePostingHospitility(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Industrial') {
      this.UserService.DeletePostingindustrial(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Land') {
      this.UserService.DeletePostingLand(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Multifamily') {
      this.UserService.DeletePostingMultifamily(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Office') {
      this.UserService.DeletePostingOffice(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Residential Income') {
      this.UserService.DeletePostingResidential(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Restaurant') {
      this.UserService.DeletePostingRestaurant(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Retail') {
      this.UserService.DeletePostingRetail(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Shopping Center') {
      this.UserService.DeletePostingShopping(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Specialty') {
      this.UserService.DeletePostingSpeciality(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          // this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    } else if (this.MemberNameURL == 'Sports & Entertainment') {
      this.UserService.DeletePostingSport(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          $(".postDelete-success").html(result['message']);
          $('.postDelete-success').show();
          this.router.navigate(['/all-listing']);
          location.href = "/";
        }
      });
    }
  }
  editListing() {
    if (this.MemberNameURL == 'Real Estate') {
      this.router.navigate(['/listing-real-estate'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Yachts & Ships') {
      this.router.navigate(['/listing-yachts'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Jets & Aircraft') {
      this.router.navigate(['/listing-aircraft'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Crowdfunding Projects') {
      this.router.navigate(['/listing-crowdfunding'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Business Properties') {
      this.router.navigate(['/listing-business'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Horses & Live Stocks') {
      this.router.navigate(['/listing-horses-livestocks'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Crypto-Assets') {
      this.router.navigate(['/listing-crypto-asset'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Cars & RVs') {
      this.router.navigate(['/listing-cars-rv'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Artworks & Antiques') {
      this.router.navigate(['/listing-artworks'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Health Care') {
      this.router.navigate(['/listing-healthcare'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
    else if (this.MemberNameURL == 'Hospitality') {
      this.router.navigate(['/listing-hospitality'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Industrial') {
      this.router.navigate(['/listing-industrial'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Land') {
      this.router.navigate(['/listing-land'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Multifamily') {
      this.router.navigate(['/listing-multifamily'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Office') {
      this.router.navigate(['/listing-office'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Residential Income') {
      this.router.navigate(['/listing-residential'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Restaurant') {
      this.router.navigate(['/listing-restaurant'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Retail') {
      this.router.navigate(['/listing-retail'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Shopping Center') {
      this.router.navigate(['/listing-shopping'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Specialty') {
      this.router.navigate(['/listing-specaility'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    } else if (this.MemberNameURL == 'Sports & Entertainment') {
      this.router.navigate(['/listing-sport'], {
        queryParams: {
          id: this.MemberIdURL,
          name: this.MemberNameURL,
        },
        //queryParamsHandling: 'merge',
      });
    }
  }
  goTocreatePosting() {
    this.loading = true;
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    let userid = null;
    if (userLocalId != null) {
      userid = parseData['id'];
    }
    // for description value
    let descriptionVal = '';
    if (this.MemberNameURL == 'Real Estate') {
      descriptionVal = this.getData[0].executive_summary
    } else {
      descriptionVal = this.getData[0].Description
    }
    // for category name
    let categoryNameNew = '';
    if (this.MemberNameURL == 'Real Estate') {
      categoryNameNew = this.getData[0].property_subtype
    }
    else if (this.MemberNameURL == 'Jets & Aircraft') {
      categoryNameNew = this.getData[0].Aircraft_subtype
    }
    else if (this.MemberNameURL == 'Yachts & Ships') {
      categoryNameNew = this.getData[0].yachts_subtype
    }
    else if (this.MemberNameURL == 'Crowdfunding Projects') {
      categoryNameNew = this.getData[0].CrowdFunding_subtype
    }
    else if (this.MemberNameURL == 'Horses & Live Stocks') {
      categoryNameNew = this.getData[0].Horses_Livestocks_subtype
    }
    else if (this.MemberNameURL == 'Crypto-Assets') {
      categoryNameNew = this.getData[0].Crypto_Assets_subtype
    }
    else if (this.MemberNameURL == 'Business Properties') {
      categoryNameNew = this.getData[0].Business_subtype
    }
    else if (this.MemberNameURL == 'Cars & RVs') {
      categoryNameNew = this.getData[0].Cars_Rv_subtype
    }
    else if (this.MemberNameURL == 'Artworks & Antiques') {
      categoryNameNew = this.getData[0].Artwork_subtype
    }
    let sendFormdata = {
      user_id: userid,
      category: categoryNameNew,
      country: this.getData[0].country,
      state: this.getData[0].state,
      city: this.getData[0].city,
      property_desciption: descriptionVal,
      url_property: this.getData[0].links,
      pdf_doc: this.getData[0].pdf_doc,
      title: this.getData[0].Tittle_Name,
      all_previous_images: this.getData[0].property_photos,
      is_cover_photo: this.getData[0].property_photos[0].orgName,
    }
    this.UserService.setIAmBuyerByWePo(sendFormdata).subscribe(result => {
      this.loading = false;
      //console.log("result setIAmBuyerByWePo : ", result);
      if (result['success'] == true) {
        $(".postDetailSuccess").html('<button type="button" class="close" data-dismiss="alert">&times;</button>'+result['message']);
        $('.postDetailSuccess').show();
        $('.postDetailDanger').hide();
        // window.open('http://localhost:4200/category-by-name/'+categoryNameNew+'?logToken=' + parseData['login_token'], '_blank');
        window.open('https://wecoown.com/category-by-name/'+categoryNameNew, '_blank');
        // window.open('https://wecoown.com/category-by-name/'+categoryNameNew+'?logToken=' + parseData['login_token'], '_blank');
        // window.open('https://wecoown.com/category-by-name/'+this.getData[0].property_subtype+'?logToken=' + parseData['login_token'], '_blank');
        // window.open('https://wecoown.com/user-profile?logToken=' + parseData['login_token'], '_blank');
        // $(location).attr('href', '/register');
      }
      else if (result['success'] == false) {
        $(".postDetailDanger").html('<button type="button" class="close" data-dismiss="alert">&times;</button>'+result['message']);
        $('.postDetailDanger').show();
        $('.postDetailSuccess').hide();
      }
    });
  }
  submitMarkSoldOut(){
    // this.loading = true;
    let finalString = "";
    let cid4 = document.getElementById("mark-sold-out-checkbox")['checked'];
    if (cid4 === true) {
      if (this.updateMarkSoldOutForm.value.selling_price == null) {
        finalString = "Please enter selling price."
        $(".ad-danger").html(finalString);
        $('.ad-danger').show();
      }
    }
    if (finalString === "") {      
      $('.ad-danger').hide();
      // //console.log("cid4",cid4);
      this.updateMarkSoldOutForm.value.Sold_out = cid4;
      this.updateMarkSoldOutForm.value.property_type = this.MemberNameURL
      //console.log("frm :",this.updateMarkSoldOutForm.value);
      this.UserService.updateListingSoldOut(this.updateMarkSoldOutForm.value,this.MemberIdURL).subscribe(result => {
        //console.log("result : ", result);
        this.loading = false;
        if (result['success'] == true) {
          $('.ad-Success').html(result['message']);
          $('.ad-Success').show();
          $('.ad-danger').hide();
          location.reload();
        }
        else{
          $(".ad-danger").html(result['message']);
          $('.ad-danger').show();
          $('.ad-Success').hide();
        }
      });
    }
  }
  // if (name === 'Office') {
  //   // routerLink="/create-listing?id=jjj"
  //   this.router.navigate(['/listing-office'], {
  //     queryParams: {
  //       id: id,
  //       name: name,
  //     },
  //     //queryParamsHandling: 'merge',
  //   });
  // }   
}
