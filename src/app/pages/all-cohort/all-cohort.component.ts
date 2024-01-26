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
  selector: 'app-all-cohort',
  templateUrl: './all-cohort.component.html',
  styleUrls: ['./all-cohort.component.css']
})
export class AllCohortComponent implements OnInit {
  baseURLofAPi: string;
  getAllMyUserCohorts: any;
  getSearchMemberList: any;
  getCohortMemberId: any;
  loading = false;
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
    let checValll = localStorage.getItem('GoToMyCohortPage');
    this.getCohortMemberId = JSON.parse(checValll);
    this.getAllMyCohort(this.getCohortMemberId);
  }
  getAllMyCohort(MemberIdURL) {
    let getUserId = localStorage.getItem('userInfo');
    let dataForm = {};
    let parseData = JSON.parse(getUserId);
    if (getUserId != null && MemberIdURL != parseData['id']) {
      dataForm = {
        my_id: MemberIdURL,
        current_login_user_id: parseData['id']
      }
    } else {
      dataForm = {
        my_id: MemberIdURL,
        current_login_user_id: ""
      }
    }
    // getCurrentUserMembersId
    console.log(dataForm);
    this.UserService.getAllCohortsByUserId(dataForm).subscribe(result => {
      // console.log("getAllMyUserCohorts: ", result);
      if (result['getAllCohort'].length == 1) {
        // this.getAllMyUserCohorts = result['getAllCohort'][0].all_cohorts_user_id;
        let memberData = result['getAllCohort'][0].all_cohorts_user_id;
        let currentUserData = result['getCurrentUserMembersId'];
        // console.log("currentUserData",currentUserData);
        // add key
        if (currentUserData != undefined && currentUserData.length != 0) {
          for (let kk = 0; kk < memberData.length; kk++) {
            let flag = false;
            for (let pp = 0; pp < currentUserData.length; pp++) {
              if (currentUserData[pp].user_id == memberData[kk].user_id._id) {
                memberData[kk]['checkCohortOrNot'] = 'Yes';
                flag = true;
                break;
              }
            }
            if (!flag) {
              if (memberData[kk].user_id._id == parseData['id']) {
                memberData[kk]['checkCohortOrNot'] = 'LoginUserIsCohort';
              } else {
                memberData[kk]['checkCohortOrNot'] = 'No';
              }
            }
          }
        } else if (getUserId != null && MemberIdURL == parseData['id']) {
          for (let kk = 0; kk < memberData.length; kk++) {
            memberData[kk].checkCohortOrNot = 'Yes';
          }
        } else {
          for (let kk = 0; kk < memberData.length; kk++) {
            memberData[kk].checkCohortOrNot = 'No';
          }
        }
        // console.log(memberData);
        this.getAllMyUserCohorts = memberData;
      }
    });
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
  onSearch(event) {
    $('#no-search-result').hide();
    // alert(event.target.value);
    if (this.getCohortMemberId != null) {
      let formVal = {
        searchMember: event.target.value,
        user_id: this.getCohortMemberId
      }
      if (event.target.value != "") {
        //////console.log("iffffffffffff");
        this.UserService.searchListCohortOfLoginUser(formVal).subscribe(result => {
          // //console.log("result : ", result);
          if (result['success'] == true) {
            if (result['dataCount'] == 0) {
              //////console.log("ifffffff datacountttttt");
              this.getSearchMemberList = [];
              $('#no-search-result').show();
            }
            else if (result['dataCount'] != 0) {
              $('#no-search-result').hide();
              this.getSearchMemberList = result['getData'];
              //////console.log(this.getSearchMemberList[0].profile_pic);
            }
          }
          else if (result['success'] == false) {
            this.getSearchMemberList = [];
            $('#no-search-result').hide();
          }
        })
      }
      else {
        $('#no-search-result').hide();
        this.getSearchMemberList = []
      }
    }
  }
  addUserToCohorts(receiver_id) {
    $('.cohortDanger').show();
    let userLocalId = localStorage.getItem('userInfo');
    if (userLocalId === null || userLocalId === undefined) {
      // show login message to user
      $('.cohortDanger').html('You are not logged in. You must first login for more information.');
      $('.cohortDanger').show();
    } else {
      this.loading = true;
      let parseData = JSON.parse(userLocalId);
      let dataForForm = {
        sender_id: parseData['id'],
        receiver_id: receiver_id
      }
      this.UserService.sendRequestForCohorts(dataForForm).subscribe(result => {
        this.loading = false;
        console.log("result getOneUserHadCohortsOrNot : ", result);
        if (result['success'] == true) {
          $(".cohortSuccess").html('<button type="button" class="close" data-dismiss="alert">&times;</button>' + result['message']);
          $('.cohortSuccess').show();
          $('.cohortDanger').hide();
        }
        else if (result['success'] == false) {
          $(".cohortDanger").html('<button type="button" class="close" data-dismiss="alert">&times;</button>' + result['message']);
          $('.cohortDanger').show();
          $('.cohortSuccess').hide();
        }
      });
    }
  }
  unfriendCohort(receiver_id) {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    let dataForCreateCohort = {
      my_id: parseData['id'],
      receiver_id: receiver_id
    }
    this.loading = true;
    this.UserService.unfriendCohortUser(dataForCreateCohort).subscribe(result => {
      this.loading = false;
      console.log("result createUserCohortConnection : ", result);
      if (result['success'] == true) {
        // $(".cohortSuccess").html('<button type="button" class="close" data-dismiss="alert">&times;</button>' + result['message']);
        // $('.cohortSuccess').show();
        // $('.cohortDanger').hide();
        location.reload();
      }
      else if (result['success'] == false) {
        $(".cohortDanger").html('<button type="button" class="close" data-dismiss="alert">&times;</button>' + result['message']);
        $('.cohortDanger').show();
        $('.cohortSuccess').hide();
      }
    });
  }
}
