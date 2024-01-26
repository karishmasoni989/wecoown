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
@Component({
  selector: 'app-all-notification',
  templateUrl: './all-notification.component.html',
  styleUrls: ['./all-notification.component.css']
})
export class AllNotificationComponent implements OnInit {
  baseURLofAPi: string;
  getAllMyUserCohorts: any;
  getSearchMemberList: any;
  getCohortMemberId: any;
  loading = false;
  getNotificationData: any;
  getRequestForAdminApprovalData: any;
  getRequestForProperty: any;
  getCohortRequest: any;
  showNoNotification: boolean;
  currentLocalUserData: any;
  getAdminOnePbmsData: any;
  recevierUserIdWantsAdmin: any;
  getAdminApproveProfileMemberData: any;
  Accept_Reject_Check: boolean;
  PortfolioMemberData: any[];
  getOnePortfolioData: any;
  localCurrentUserId: any;
  constructor(private UserService: UserService,
    private likeService: LikeOfPostService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  ionViewWillEnter() {
    this.startOfPage();
  }
  ngOnInit() {
    this.startOfPage();
  }
  startOfPage() {
    this.baseURLofAPi = environment.baseUrl;
    let getUserId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(getUserId);
    this.currentLocalUserData = parseData;
    this.localCurrentUserId = parseData['id'];
    this.getUserNotifications(parseData['id']);
  }

  goToMemberPage(val) {
    let getUserId = localStorage.getItem('userInfo');
    if (getUserId != null) {
      let parseData = JSON.parse(getUserId);
      if (val === parseData['id']) {
        $(location).attr('href', '/user-profile');
      } else {
        localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
        window.open('/member-detail', '/member-detail');
        return false;
      }
    } else {
      localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
      window.open('/member-detail', '/member-detail');
      return false;
    }
  }

  getUserNotifications(getId) {
    this.loading = true;
    let dataForm = {
      user_id: getId
    }
    this.UserService.getNotifications(dataForm).subscribe(result => {
      this.loading = false;
      // console.log("resulttttttttttttttttttt of notifications in: ", result);
      if (result['success'] == true) {
        // this.NotificationUnreadCount = 0;
        let NotificationUnreadCount = result['dataCount'];
        this.getNotificationData = result['getData'];
        this.getRequestForAdminApprovalData = result['requestForAdminApproval'];
        this.getRequestForProperty = result['getRequestForProperty'];
        this.getCohortRequest = result['getAllrequestForCohorts'];
        if (result['getData'].length == 0 && result['requestForAdminApproval'].length == 0 && result['getRequestForProperty'].length == 0 && result['getAllrequestForCohorts'].length == 0) {
          this.showNoNotification = true;
        }else{
          this.showNoNotification = false;
        }    
        if (NotificationUnreadCount != 0) {          
          this.setReadNotification(dataForm);  
        }  
      }
    });
  }
  setReadNotification(dataForm) {
    this.UserService.setReadAtUserAllNotification(dataForm).subscribe(result => {
      console.log("set read notification : ",result);      
    });
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
          this.updateAcceptRejectRequestCohort(dataForForm,parseData['id']);
        }
        else if (result['success'] == false) {
        }
      });
    } else if (action === 2) {
      let dataForForm = {
        request_id: req_id,
        action: 'Reject'
      }
      this.updateAcceptRejectRequestCohort(dataForForm,parseData['id']);
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
  goToMemberPage11(val) {
    if (val === this.localCurrentUserId) {
      $(location).attr('href', '/user-profile');
    } else {
      localStorage.setItem('GoTomemberSearchPage', JSON.stringify(val));
      window.open('/member-detail','/member-detail');
      return false;
    }
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
}
