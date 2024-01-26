import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-i-am-seller',
  templateUrl: './i-am-seller.component.html',
  styleUrls: ['./i-am-seller.component.css']
})
export class IAmSellerComponent implements OnInit {
  steps: any;
  // percent: any;
  constructor() { }

  ngOnInit() {
      let current_fs, next_fs, previous_fs; //fieldsets
      let opacity;
      let current = 1;
      this.steps = $("fieldset").length;
      // alert($("fieldset").length)
      setProgressBar(current);
      
      $(".next").click(function(){
      // alert("next click");
      current_fs = $(this).parent();
      next_fs = $(this).parent().next();
      
      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
      
      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({opacity: 0}, {
      step: function(now) {
      // for making fielset appear animation
      opacity = 1 - now;
      
      current_fs.css({
      'display': 'none',
      'position': 'relative'
      });
      next_fs.css({'opacity': opacity});
      },
      duration: 500
      });
      setProgressBar(++current);
      });
      
      $(".previous").click(function(){
      
      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();
      
      //Remove class active
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
      
      //show the previous fieldset
      previous_fs.show();
      
      //hide the current fieldset with style
      current_fs.animate({opacity: 0}, {
      step: function(now) {
      // for making fielset appear animation
      opacity = 1 - now;
      
      current_fs.css({
      'display': 'none',
      'position': 'relative'
      });
      previous_fs.css({'opacity': opacity});
      },
      duration: 500
      });
      setProgressBar(--current);
      });
      
      function setProgressBar(curStep){
      let percent = (100/ 2) * curStep;
      // percent = percent.toFixed();
      // alert(percent);
      $(".progress-bar")
      .css("width",percent+"%")
      }
      
      $(".submit").click(function(){
      return false;
      })
      
    
  }


}
