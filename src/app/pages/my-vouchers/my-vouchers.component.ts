import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import * as moment from 'moment';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-my-vouchers',
  templateUrl: './my-vouchers.component.html',
  styleUrls: ['./my-vouchers.component.css']
})
export class MyVouchersComponent implements OnInit {
  getMemberData: any;
  loading = false;
  getCurrentUser: any;
  options: any = {};
  data: any[] = [];
  columns: any = {};

  constructor(private UserService: UserService,) { }
  ionViewWillEnter(){
    this.startOfPage();
  }
  ngOnInit(){
    this.startOfPage();
  }
  startOfPage() {
    let getUserId = localStorage.getItem('userInfo');
    this.getCurrentUser = JSON.parse(getUserId);
    ////console.log("user data tttttttttt: ", parseData['id']);
    if (getUserId != null) {
      this.getUserClaimHistory(this.getCurrentUser['id']);
    }
  }
  getUserClaimHistory(getId) {
    this.loading = true;
    let dataForForm = {
      user_id: getId
    }
    this.UserService.getOneUserClaimKeyHistory(dataForForm).subscribe(result => {
      this.loading = false;
      console.log("result : ", result);
      if (result['success'] == true) {
        this.getMemberData = result['getData'];
        this.data = result['getdata'];
      }
      else if (result['success'] == false) {
        $(".userReport-Danger").html(result['message']);
        $('.userReport-Danger').show();
      }
    });
  }
  goToDownloadPdf(token_price, claim_key, created_date) {
    // for create pdf for user
    let doc = new jsPDF();
    let userClaimKeytext = `<h3 style="padding-top: 10px; color:#0b3655;font-size: 25px !important;">WePropertyowners Management</h3>
          <h5 style="margin: 0px 0px !important; color:#0b3655;font-size: 21px !important;">Claim key: `+ claim_key + `</h5>
          <p style="margin-top:0px;color:#0b3655 !important;line-height: 50px !important;font-size: 21px !important;">
          This is a voucher to certify that `+ this.getCurrentUser['firstname'] + ` ` + this.getCurrentUser['lastname'] + ` has earned ` + token_price + ` of WeCoOwn Rewards Tokens(WCX) and redeemed the tokens
          from the WeCoOwn platform at `+ moment(created_date).format('hh:mm a') + ` on ` + moment(created_date).format('MM/DD/YYYY') + `. The voucher entitles ` + this.getCurrentUser['firstname'] + ` ` + this.getCurrentUser['lastname'] + ` to claim ` + token_price + ` WCX at following
          exchanges:<br> 1) Tokpie.</p>`
    doc.fromHTML(userClaimKeytext, 15, 15, {
      width: 180,
    });
    doc.save('Redeem Claim Key.pdf');
  }
}
