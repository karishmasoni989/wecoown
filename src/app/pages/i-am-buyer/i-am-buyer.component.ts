import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-i-am-buyer',
  templateUrl: './i-am-buyer.component.html',
  styleUrls: ['./i-am-buyer.component.css']
})
export class IAmBuyerComponent implements OnInit {
  buyerForm: FormGroup;
  steps: any;
  categoryArray: any;
  FinalArray: any;
  ImgArray:[];
  // fileOver: boolean;
  @HostBinding('class.fileover') fileOver: boolean;
  //fileDropped: any;
  @Output() fileDropped = new EventEmitter<any>();
  files: any[] = [];
  // percent: any;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buyerForm = new FormGroup({
      // category: new FormControl(),
      property_desciption: new FormControl('', [Validators.required]),
      property_photos: new FormControl('', [Validators.required]),
      url_property: new FormControl('',),
      // all_images: new FormControl('',),
      // i_am_buyer_id: new FormControl(this.getIpaddress)
    });
    this.getCategory();
    $('#first_form_card').css('display', 'none');
    // for first click
    let current_fs, next_fs, previous_fs, previous_fs_first; //fieldsets
    let opacity;
    let current = 1;
    this.steps = $("fieldset").length;
    // alert($("fieldset").length)
    setProgressBar(current);

    $(".next").click(function () {
      // alert("next click");
      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      if ($('#have_a_property').is(':checked')) {
        next_fs.show();
        $('#second_form_card').hide();
        $('#first_form_card').show();
      }
      else if ($('#i_like_search').is(':checked')) {
        $('#first_form_card').css('display', 'none !important');
        $('#second_form_card').show();
      }
      next_fs.show();   
      $('#first_form_card .form-card').css('opacity', '1');
      $('#first_form_card .form-card').css('display', 'block');
      $('#first_form_card .form-card').focus();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          next_fs.css({ 'opacity': opacity });
        },
        duration: 500
      });
      setProgressBar(++current);
    });

    $(".previous").click(function () {

      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();
      //Remove class active
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
      $('#first_form_card').hide();
      //show the previous fieldset
      if ($('#have_a_property').is(':checked')) {
        // $('#second_form_card').hide();
        // $('#first_form_card').show();
        $('#starting_fieldset').show();
      }

      else if ($('#i_like_search').is(':checked')) {
        $('#starting_fieldset').show();

        // $('#first_form_card').css('display', 'none !important');
      }
      previous_fs.show();
      $('#starting_fieldset').css('opacity', '1');
      $('#msform').focus();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          previous_fs.css({ 'opacity': opacity });
        },
        duration: 500
      });
      setProgressBar(--current);
    });

    function setProgressBar(curStep) {
      let percent = (100 / 2) * curStep;
      // percent = percent.toFixed();
      // alert(percent);
      $(".progress-bar")
        .css("width", percent + "%")
    }
  }

  getCategory() {
    this.UserService.getAllCategory().subscribe(result => {
      console.log("result : ", result);
      if (result['success'] == true) {
        console.log(result['message']);
        console.log(result['categoryData']);
        this.categoryArray = (result['categoryData']);
      }
      else if (result['success'] == false) {
        console.log(result['message']);
      }
    });
  }
  fileBroswerHandler(event) {
  }
  onFileDropped(event) {
    // this.files = event;
    console.log("araay filessss : ", this.files);
    for (let item of event) {
      this.files.push(item)
    }
  }

  delteFile(i) {
    console.log("this.files",this.files);
    console.log("typedoffffffff : ",typeof(this.files));
    this.files.splice(i, 1);
    console.log("here are finallllll : ", this.files);
  }
  submitBuyerForm() {
    // alert(this.files.length == 0)
    // alert($('#category').val() == "")
    // alert($('#property_desciption').val() == '')
    console.log(this.files.length);
    
    // alert(this.files == undefined)
    if ($('#category').val() == "" && $('#property_desciption').val() == '' && this.files.length == 0) {
      // alert("hereeeeeeeee")
      $('#fileDropRef').focus();
      $('#property_desciption').focus();
      $('#category').focus();
      $(".BuyerDanger").html("Please select category name.<br>Please enter property desciption.<br>Please select property photos.");
      $('.BuyerDanger').show();
    }
    else if ($('#category').val() == "" && $('#property_desciption').val() == '') {
      $('#property_desciption').focus();
      $('#category').focus();
      $(".BuyerDanger").html("Please select category name.<br>Please enter property desciption.");
      $('.BuyerDanger').show();
    }
    else if ($('#category').val() == "" && this.files.length == 0) {
      $('#fileDropRef').focus();
      $('#category').focus();
      $(".BuyerDanger").html("Please select category name.<br>Please select property photos.");
      $('.BuyerDanger').show();
    }
    else if ($('#category').val() == "") {
      $('#category').focus();
      $(".BuyerDanger").html("Please select category name.");
      $('.BuyerDanger').show();
    }
   else  if ($('#property_desciption').val() == '' && this.files.length == 0) {
      $('#fileDropRef').focus();
      $('#property_desciption').focus();
      $(".BuyerDanger").html("Please enter property desciption.<br>Please select property photos.");
      $('.BuyerDanger').show();
    }
    else if ($('#property_desciption').val() == '') {
      $('#property_desciption').focus();
      $(".BuyerDanger").html("Please enter property desciption.");
      $('.BuyerDanger').show();
    }
    else if (this.files.length == 0) {
      $('#fileDropRef').focus();
      $(".BuyerDanger").html("Please select property photos.");
      $('.BuyerDanger').show();
    }
    else {
      $('.BuyerDanger').hide();
      let formData = new FormData();
      formData.append("category",$('#category').val());
      formData.append("property_desciption",this.buyerForm.value.property_desciption);
      formData.append("url_property",this.buyerForm.value.url_property);
      // formData.append("category",this.buyerForm.value.category);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }

      console.log("form register val : ", formData);
      this.UserService.setIAmBuyer(formData).subscribe(result => {
        console.log("result : ", result);
        if (result['success'] == true) {
          $(".BuyerSuccess").html(result['message']);
          $('.BuyerSuccess').show();
          $('.BuyerDanger').hide();
          localStorage.setItem('peropertyId',JSON.stringify(result['id']));     
          $(location).attr('href','/register');
          //  $(location).attr('href', '/')
          //  this.router.navigate(['/login']);
        }
        else if (result['success'] == false) {
          $(".BuyerDanger").html(result['message']);
          $('.BuyerDanger').show();
          $('.BuyerSuccess').hide();
        }
      });
    }
  }

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    console.log("Drag Over");
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log("Drag Leave");
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      console.log("you drop files : ", files.length);
      this.fileDropped.emit(files);    
      for (let item of files) {
        this.files.push(item)
      }  
    }
    console.log("Drag Over");
  }
}
