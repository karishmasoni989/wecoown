import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-ads',
  templateUrl: './create-ads.component.html',
  styleUrls: ['./create-ads.component.css']
})
export class CreateAdsComponent implements OnInit {
  buyerForm: FormGroup;
  steps: any;
  categoryArray: any;
  FinalArray: any;
  ImgArray: [];
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
    console.log("this.files", this.files);
    console.log("typedoffffffff : ", typeof (this.files));
    this.files.splice(i, 1);
    console.log("here are finallllll : ", this.files);
  }
  submitBuyerForm() {
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
    else if ($('#property_desciption').val() == '' && this.files.length == 0) {
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
      formData.append("category", $('#category').val());
      formData.append("property_desciption", this.buyerForm.value.property_desciption);
      formData.append("url_property", this.buyerForm.value.url_property);
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
          localStorage.setItem('peropertyId', JSON.stringify(result['id']));
          $(location).attr('href', '/register');
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