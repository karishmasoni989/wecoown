import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  getAllData: any;
  baseURLofAPi: string;

  constructor( public UserService: UserService) { }

  ngOnInit() {
    this.baseURLofAPi = environment.baseUrl;
    this.getAllVendor();
  }
  getAllVendor(){
    this.UserService.getAllVendorList().subscribe(result => {
      //console.log("result of get user post : ", result);
      if (result['success'] == true) {
        // $('#loader').hide();
        this.getAllData = this.groupBy(result['getData'], "vendor_type");
        //console.log("data grouped : ",this.getAllData);        
      }
    });
  }
  groupBy(list, props) {
    return list.reduce((a, b) => {
      (a[b[props]] = a[b[props]] || []).push(b);
      return a;
    }, {});
  }
}
