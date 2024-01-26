import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
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
  selector: 'app-pbms-actions',
  templateUrl: './pbms-actions.component.html',
  styleUrls: ['./pbms-actions.component.css']
})
export class PbmsActionsComponent implements OnInit {
  loading = false;
  getPropertyUrl: any;
  constructor(private UserService: UserService,
    private likeService: LikeOfPostService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  ionViewWillEnter() {
    this.checkAlreadymembership();
  }
  property_url
  ngOnInit() {
    this.checkAlreadymembership();
  }
  checkAlreadymembership() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      this.loading = true;
      let dataFormm = {
        user_id: parseData['id']
      }  
      this.UserService.checkUserMembership(dataFormm).subscribe(result => {
        this.loading = false;
        //console.log("result of add membership: ", result);
        if (result['success'] == true) {
          if (result['getdata']) {
            // this.checkUserPostId();   
            $('.alreadymembership').show();
            $('.notAlreadymembership').hide();
            let getBookData = localStorage.getItem("SetBookData");
            let getParseBookData = JSON.parse(getBookData);
            let getCategoryName = getParseBookData['category'];
            this.getPropertyUrl = getParseBookData['property_url'];
            // if (getCategoryName == 'Real Estate' || getCategoryName == 'Crowdfunding Projects') {
            //   $('.showRenting').show();
            //   $('.showChatering').hide();
            // } else {
            //   $('.showRenting').hide();
            //   $('.showChatering').show();
            // }
          }
        }
        else if (result['success'] == false) {
          $('.alreadymembership').hide();
          $('.notAlreadymembership').show();
          if (result['code'] === 800) {
            $(".expired_membership_msg").html('<button type="button" class="close" data-dismiss="alert">&times;</button>' + result['message']);
            $(".expired_membership_msg").show();
          } else {
            $('.expired_membership_msg').hide();
          }
        }
      });
    }
  }
  goToBookingProperty(){
    this.router.navigate(['/book-pbms-property']);
  }
  goToRentingProperty(){
    this.router.navigate(['/rent-pbms-property']);
  } 
  goToCharteringProperty(){
    this.router.navigate(['/chartering-pbms-property']);
  }
  goToManagingCashflowsProperty(){
    this.router.navigate(['/managing-cashflows-pbms-property']);
  } 
  goToOpenPropertyUrl(){
    window.open(this.getPropertyUrl, this.getPropertyUrl);
    return false;
  }
}
