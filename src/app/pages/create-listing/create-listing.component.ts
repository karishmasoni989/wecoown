// import { MessageService } from '../../service/message.service'
import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountryStateCityService } from '../../service/country-state-city.service';
@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {
  createPostingForm: FormGroup;
  selectedItemsList = [];
  checkedIDs = [];
  interests = []; bChecked; wChecked; oChecked;
  propertyIdd: any;
  usernamePre: any;
  loading: boolean;
  FinalArray: any;
  ImgArray: [];
  // fileOver: boolean;
  @HostBinding('class.fileover') fileOver: boolean;
  //fileDropped: any;
  @Output() fileDropped = new EventEmitter<any>();
  files: any[] = [];
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createPostingForm = new FormGroup({
      invesment_summary: new FormControl(''),
      executive_summary: new FormControl(''),
      links: new FormControl(''),
      address: new FormControl(''),
      sale_type: new FormControl(''),
      sale_condition: new FormControl(''),
      property_type: new FormControl(''),
      property_subtype: new FormControl(''),
      building_class: new FormControl(''),
      lot_size: new FormControl(''),
      rentable_building_area: new FormControl(''),
      no_stories: new FormControl(''),
      parking_ratio: new FormControl(''),
      oppotunity_zone: new FormControl(''),
      year_built: new FormControl(''),
      claer_ceiling_height: new FormControl(''),
      no_dock_high_doors: new FormControl(''),
      no_drive_in: new FormControl(''),
    });
    /* start enter button trigger*/
    // $(".CheckForm").keypress(function (e) {
    //   if (e.which === 13) {
    //     $('#formSubmit').trigger('click');
    //   }
    // });
    /* end enter button trigger*/
  }

  onFileDropped(event) {
    for (let item of event) {
      this.files.push(item)
    }
  }

  delteFile(i) {
    this.files.splice(i, 1);
  }

  submit() {
    // //console.log("form : ",this.createPostingForm.value);
    // //console.log("files : ",this.files);
    
    let fieldsOfCheckedArray = $("input[class='MakeCoverPhotoPost']").serializeArray();
    let finalString = "";
    if (this.files.length == 0) {
      $('#fileDropRef').focus();
      finalString += "Please select property photos.<br>";
    }
    if (this.createPostingForm.value.address == '') {
      $('#fileDropRef').focus();
      finalString += "Please enter address.<br>";
    }

    //console.log("alertHtml", finalString);
    $(".BuyerDanger").html(finalString);
    $('.BuyerDanger').show();
    if (finalString == "") {
      // $('#loader').show();
      $('.BuyerDanger').hide();
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      // form for buyer post
      let formData = new FormData();
      if (userLocalId != null) {
        formData.append("user_id", parseData['id']);
      } else {
        formData.append("user_id", null);
      }
      formData.append("invesment_summary", this.createPostingForm.value.invesment_summary);
      formData.append("executive_summary", this.createPostingForm.value.executive_summary);
      formData.append("links", this.createPostingForm.value.links);
      formData.append("address", this.createPostingForm.value.address);
      formData.append("sale_type", this.createPostingForm.value.sale_type);
      formData.append("sale_condition", this.createPostingForm.value.sale_condition);
      formData.append("property_type", this.createPostingForm.value.property_type);
      formData.append("property_subtype", this.createPostingForm.value.property_subtype);
      formData.append("building_class", this.createPostingForm.value.building_class);
      formData.append("lot_size", this.createPostingForm.value.lot_size);
      formData.append("rentable_building_area", this.createPostingForm.value.rentable_building_area);
      formData.append("no_stories", this.createPostingForm.value.no_stories);
      formData.append("parking_ratio", this.createPostingForm.value.parking_ratio);
      formData.append("oppotunity_zone", this.createPostingForm.value.oppotunity_zone);
      formData.append("year_built", this.createPostingForm.value.year_built);
      formData.append("claer_ceiling_height", this.createPostingForm.value.claer_ceiling_height);
      formData.append("no_dock_high_doors", this.createPostingForm.value.no_dock_high_doors);
      formData.append("no_drive_in", this.createPostingForm.value.no_drive_in);

      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      this.UserService.createwePoPosting(formData).subscribe(result => {
        //console.log("result : ", result);
        if (result['success'] == true) {
          $(".BuyerSuccess").html(result['message']);
          $('.BuyerSuccess').show();
          $('.BuyerDanger').hide();
          this.router.navigate(['/all-posting']);
          // location.href = "/all-posting"
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
    ////console.log("Drag Over");
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    ////console.log("Drag Leave");
  }

  @HostListener('drop', ['$event']) ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      ////console.log("you drop files : ", files.length);
      this.fileDropped.emit(files);
      for (let item of files) {
        this.files.push(item)
      }
    }
  }
}