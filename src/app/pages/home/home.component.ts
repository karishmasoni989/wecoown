import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private AppComponent: AppComponent) {
    this.AppComponent.userProfileHide();
   }

  ngOnInit() {
    let checkUserProfilee = localStorage.getItem('userInfo');
    console.log("local user profile : ", JSON.stringify(checkUserProfilee));
    if (checkUserProfilee != null) {
      // $('#buyerHome').hide();
      // $('#sellerHome').hide();
    }
    // setInterval(function(){ $('.carousel-control-next').trigger('click'); }, 1500);

    // alert("jjjjjjjjjj")
    // $('.carousel-control-next').trigger('click');
  //   $('#homeCarousel').carousel({
  //     interval: 1500
  // });
  }
  ngAfterViewInit() {
    // function playcarousel(){
    //   // alert("clickkkk")
    //   // $(".carousel-control-next").click();
   
    //   $('.carousel-control-next').trigger('click');
    // } 
    // window.setInterval(playcarousel, 1500); 
    //   $("#homeCarousel").on('slide.bs.carousel', function () {
    //     alert('A new slide is about to be shown!');
    //     interval: 1000
    // });
  }
}
