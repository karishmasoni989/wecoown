import { Component, OnInit, Directive, EventEmitter, Output, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { environment } from 'src/environments/environment';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.css']
})
export class MyPortfolioComponent implements OnInit {
  getMyAllPortfolioData: any;
  baseURLofAPi: string;
  getCurrentUser: any;
  PortfolioMemberCount = 1;
  loading = false;
  selectedUserIds: String[];
  createMyPortfolio: FormGroup;
  files: any[];
  getAllMembersdata: any;
  coverPhoto: any;
  coverPhotoName: any;
  getMemberData: any;
  allPostdata: any;
  ErrorImagesFiles = false;
  cover_pic_cropper_data: any;
  cropperSettings1: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  constructor(public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private AppComponent: AppComponent) {
    document.addEventListener('click', this.clickHandlerDoc.bind(this)); // bind on doc
    this.baseURLofAPi = environment.baseUrl;
  }
  // for find data dismiss call or not
  clickHandlerDoc(event: any) {
    if (event.target.dataset.dismiss === "modal") {
      $('.ModalCloseClick')[0].reset();
      $('#myPortfolioCreateFormTag')[0].reset();
      this.selectedUserIds = [];
      this.files = [];
      $('.alert').hide();
    }
  }
  ionViewWillEnter() {
    this.loading = false;
    //console.log("In user profile component");
    let getUserId11 = localStorage.getItem('userInfo');
    if (getUserId11 == null) {
      let getLoginToken = this.activatedRoute.snapshot.queryParamMap.get('logToken');
      let dataForm = { login_token: getLoginToken, website: 'WeCoOwn' }
      this.UserService.checkForIsLoggedIn(dataForm).subscribe(result => {
        //console.log("resulttttttttttttttttttt in user component: ", result);
        if (result['success'] == true) {
          localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
          this.AppComponent.userProfileHide();
          this.startOfPage();
        } else {
          location.href = '/';
        }
      });
    } else {
      this.startOfPage();
    }
  }
  ngOnInit() {
    this.loading = false;
    //console.log("In user profile component");
    let getUserId11 = localStorage.getItem('userInfo');
    if (getUserId11 == null) {
      let getLoginToken = this.activatedRoute.snapshot.queryParamMap.get('logToken');
      let dataForm = { login_token: getLoginToken, website: 'WeCoOwn' }
      this.UserService.checkForIsLoggedIn(dataForm).subscribe(result => {
        //console.log("resulttttttttttttttttttt in user component: ", result);
        if (result['success'] == true) {
          localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
          this.AppComponent.userProfileHide();
          this.startOfPage();
        } else {
          location.href = '/';
        }
      });
    } else {
      this.startOfPage();
    }
  }
  startOfPage() {
    this.getMyPortfolio();
    this.getMemberDataById();
    this.getAllMyPortFolio();
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    this.getCurrentUser = parseData['id'];
    this.createMyPortfolio = new FormGroup({
      property_url: new FormControl(''),
      title: new FormControl(''),
    });
    // for cover picture
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 735;
    this.cropperSettings1.height = 300;

    this.cropperSettings1.croppedWidth = 735;
    this.cropperSettings1.croppedHeight = 300;
    this.cropperSettings1.canvasHeight = 300;
    let sizeOfCurrentWindow = window.innerWidth;
    if (sizeOfCurrentWindow <= 420) {
      this.cropperSettings1.canvasWidth = 300;
    } else if (sizeOfCurrentWindow <= 991) {
      this.cropperSettings1.canvasWidth = 400;
    } else {
      this.cropperSettings1.canvasWidth = 500;
    }

    this.cropperSettings1.minWidth = 100;
    this.cropperSettings1.minHeight = 100;

    this.cropperSettings1.rounded = false;

    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    this.cover_pic_cropper_data = {};
  }
  getAllMyPortFolio() {
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    ////console.log("user data tttttttttt: ", parseData['id']);
    if (getUserId != null) {
      let dataForForm = {
        id: parseData['id']
      }
      this.UserService.getAllMyPortFolioDataOfwepo(dataForForm).subscribe(result => {
        // //console.log("result getMemberDataById: ", result);
        if (result['success'] == true) {
          this.allPostdata = (result['getData']);
        }
      });
    }
  }
  openDropdownList() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  goTocatrgpyList(name) {
    let checkUserProfile = JSON.parse(localStorage.getItem('userInfo'));
    if (checkUserProfile != null) {
      this.router.navigate([name]);
      // location.href = "/category-listing/" + name ;
    } else {
      this.router.navigate(['/login']);
    }
  }
  getMemberDataById() {
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    ////console.log("user data tttttttttt: ", parseData['id']);
    if (getUserId != null) {
      let dataForForm = {
        id: parseData['id']
      }
      this.UserService.getUserDataById(dataForForm).subscribe(result => {
        //console.log("result getMemberDataById: ", result);
        if (result['success'] == true) {
          this.getMemberData = result['getData'].portfolio_pic;
          //console.log("member data : ", this.getMemberData);
        }
      });
    }
  }
  goToMemberPage11(val) {
    if (val === this.getCurrentUser) {
      $(location).attr('href', '/user-profile');
    } else {
      localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
      window.open('/member-detail', '_blank');
    }
  }
  getMyPortfolio() {
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    if (getUserId != null) {
      let dataForForm = {
        user_id: parseData['id']
      }
      this.UserService.getMyPbmsById(dataForForm).subscribe(result => {
        //console.log("result of get user portfolio oooooooooooo: ", result);
        if (result['success'] == true) {
          this.getMyAllPortfolioData = result['getData'];
          // //console.log("this.getMyPortfolioName : ", this.getMyAllPortfolioData.recevier_id);
          // this.PortfolioMemberCount = 1 + (this.getMyAllPortfolioData.recevier_id.length);

          // if (this.getMyPostData.length == 0) {
          //   // $(".notFoundPost").show();
          // }
          // else {
          //   $(".notFoundPost").hide();
          // }
          ////console.log("this.getMyPostData", this.getMyPostData);
        }
        else if (result['success'] == false) {
          ////console.log("error in get user post : ", result['message']);
        }
      });
    }
  }
  checkmembership() {
    this.selectedUserIds = [];
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.loading = true;
      let dataFormm = {
        user_id: parseData['id']
      }
      this.UserService.checkUserMembership(dataFormm).subscribe(result => {
        this.loading = false;
        // //console.log("result of add membership: ", result);
        if (result['success'] == true) {
          if (result['getdata']) {
            this.getAllVerifiedUserss();
            $('.alreadymembership').show();
            $('.notAlreadymembership').hide();
          }
          else {
            $('.alreadymembership').hide();
            $('.notAlreadymembership').show();
          }
        }
        else if (result['success'] == false) {
          $('.alreadymembership').hide();
          $('.notAlreadymembership').show();
        }
      });
    }
  }
  getAllVerifiedUserss() {
    this.loading = true;
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      let formData = {
        user_id: parseData['id']
      }
      this.UserService.getAllVeirifiedUserList(formData).subscribe(result => {
        this.loading = false;
        // //console.log("result of get all members: ", result);
        if (result['success'] == true) {
          this.getAllMembersdata = result['getdata'];
          // //console.log("get data : ",this.getAllMembersdata);
        }
      })
    }
  }
  submitMyPortfolio() {
    //console.log("before data : ",this.selectedUserIds);
    let finalString = "";
    if (this.createMyPortfolio.value.property_url == "") {
      finalString += "Please enter property url.<br>";
    }
    if (this.createMyPortfolio.value.title == "") {
      finalString += "Please enter title.<br>";
    }
    if (this.selectedUserIds == undefined) {
      finalString += "Please select members.<br>";
    }
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger').hide();
      // this.loading = true;
      let sendData = {
        property_url: this.createMyPortfolio.value.property_url,
        title: this.createMyPortfolio.value.title,
        group_creater_id: this.getCurrentUser,
        getAllUser: this.selectedUserIds
      }

      this.UserService.createMyPbmsGroup(sendData).subscribe(result => {
        this.loading = false;
        //console.log("result of add invitation: ", result);
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
      })
    }
  }
  goToMemberPage(val) {
    // alert(val)
    if (val === this.getCurrentUser) {
      $(location).attr('href', '/user-profile');
    } else {
      localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
      window.open('/member-detail', '_blank');
    }
  }
  submitCoverPic() {
    // alert(this.ErrorImagesFiles)
    // if (this.ErrorImagesFiles === true) {
    //   $('#coverPicInput').focus();
    //   $(".cover-pic-Danger").html("This portfolio picture is too small. Please choose a different picture(950 x 400).");
    //   $('.cover-pic-Danger').show();
    //   $('.property_head').focus();
    // }
    // if (this.coverPhoto == undefined) {
    //   $('#coverPicInput').focus();
    //   $(".cover-pic-Danger").html("Please select portfolio picture.");
    //   $('.cover-pic-Danger').show();
    //   $('.property_head').focus();
    // }
    // if(this.ErrorImagesFiles === false && this.coverPhoto != undefined) {
    $('.cover-pic-Danger').hide();
    this.loading = true;
    let cropped_pic;
    // console.log("this dat :", this.cover_pic_cropper_data);
    // for create image name
    var ts = String(new Date().getTime()),
      i = 0,
      out = '';
    for (i = 0; i < ts.length; i += 2) {
      out += Number(ts.substr(i, 2)).toString(36);
    }
    let coverImageName = 'portfolio_cover_image' + out;
    fetch(this.cover_pic_cropper_data.image).then(res => res.blob()).then(blob => {
      cropped_pic = new File([blob], coverImageName, { type: "image/png" })
      // console.log("file cover: ", cropped_pic);
      $('.cover-pic-Danger').hide();
      let formData = new FormData();
      let profile_data;
      if (this.cover_pic_cropper_data.image) {
        profile_data = cropped_pic
      }
      else {
        profile_data = [];
      }
      let getUserId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(getUserId);
      formData.append("all_images", profile_data);
      this.UserService.updateUserPortfolioPic(formData, parseData['id']).subscribe(result => {
        this.loading = false;
        ////console.log("result of get user post : ", result);
        if (result['success'] == true) {
          $(".cover-pic-success").html(result['message']);
          $('.cover-pic-Danger').hide();
          $('.cover-pic-success').show();
          $('.property_head').focus();
          location.reload();
        }
        else if (result['success'] == false) {
          $('.cover-pic-success').hide();
          $(".cover-pic-Danger").html(result['message']);
          $('.cover-pic-Danger').show();
          $('.property_head').focus();
        }
      });
    })
  }
  coverPhotosDropped(event) {
    this.coverPhoto = event;
    this.coverPhotoName = this.coverPhoto[0].name;
    //console.log("profile filessss : ", event);
    this.ErrorImagesFiles = false;
    let img = new Image()
    img.src = window.URL.createObjectURL(event[0])
    img.onload = () => {
      // alert(img.width + typeof(img.width) +" : hhhhhhhhhhhhhhhhh :" + img.height);
      if (950 > img.width || 400 > img.height) {
        this.ErrorImagesFiles = true;
      }
    }
    ////console.log("name of photo : ", this.coverPhotoName);
  }
  onFileDropped(event) {
    for (let item of event) {
      let img = new Image()
      img.src = window.URL.createObjectURL(item)
      img.onload = () => {
        // alert(img.width + typeof(img.width) +" : hhhhhhhhhhhhhhhhh :" + img.height);
        if (750 > img.width || 400 > img.height) {
          // this.ErrorImagesFiles.push(item.name);
        } else {
          this.files.push(item)
        }
      }
    }
  }
  cropped(bounds: Bounds) {
    //console.log(bounds);
  }
}
