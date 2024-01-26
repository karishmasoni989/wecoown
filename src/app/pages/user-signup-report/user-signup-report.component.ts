import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-signup-report',
  templateUrl: './user-signup-report.component.html',
  styleUrls: ['./user-signup-report.component.css']
})
export class UserSignupReportComponent implements OnInit {
  getMemberData: any;
  loading = false;
  getCurrentUser: any;
  options: any = {};
  data: any[] = [];
  columns: any = {};

  constructor(private UserService: UserService,) { }
  ngOnInit() {
    this.columns = [
      { key: 'firstname', title: "First Name" },
      { key: 'lastname', title: "Last Name" },
      { key: 'email', title: 'Email' },
      { key: 'country', title: 'Country' },
      { key: 'state', title: 'State' },
      { key: 'city', title: 'City' },
      { key: 'designation', title: 'Designation' },
      { key: 'bio', title: 'Intro' },
      { key: 'verfied', title: 'Verified' },
      { key: 'is_admin', title: 'Is Admin' },      
      { key: 'created_at',prop: 'created_at', title: 'Register Date' },      
      { key: 'status', title: 'Status' },      
      { button: "click", name:"button" ,title: 'Details' },      
    ]
    // this.data = [
    //   {
    //     "id": "1",
    //     "name": "Warren",
    //     "phone": "1-412-485-9725",
    //     "company": "Etiam Institute"
    //   },
    //   {
    //     "id": "2",
    //     "name": "Brendan",
    //     "phone": "1-724-406-2487",
    //     "company": "Enim Commodo Limited"
    //   }
    // ]
    let getUserId = localStorage.getItem('userInfo');
    this.getCurrentUser = JSON.parse(getUserId);
    ////console.log("user data tttttttttt: ", parseData['id']);
    if (getUserId != null) {
      if (this.getCurrentUser['is_admin'] === true) {
        this.getUserList(this.getCurrentUser['id']);
      }
      else {
        $(".userReport-Danger").html("You are not authorised person to see this page.");
        $('.userReport-Danger').show();
      }
    }
  }
  getUserList(getId) {
    this.loading = true;
    let dataForForm = {
      user_id: getId
    }
    this.UserService.getAllUserReport(dataForForm).subscribe(result => {
      this.loading = false;
      //console.log("result : ", result);
      if (result['success'] == true) {
        this.getMemberData = result['getdata'];
        this.data = result['getdata'];
      }
      else if (result['success'] == false) {
        $(".userReport-Danger").html(result['message']);
        $('.userReport-Danger').show();
      }
    });
  }
  goTodetail(id) {
    localStorage.setItem('viewProfileDetail', JSON.stringify(id));
    location.href = '/profile-detail'
  }
  download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
  }

  export_table_to_csv(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++)
        row.push(cols[j]['innerText']);
      csv.push(row.join(","));
    }

    // Download CSV
    this.download_csv(csv.join("\n"), filename);
  }
  CreateCsv() {
    var html = document.querySelector("table").outerHTML;
    this.export_table_to_csv(html, "table.csv");
  }
}
