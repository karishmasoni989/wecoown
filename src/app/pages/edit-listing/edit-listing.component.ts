import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CountryStateCityService } from '../../service/country-state-city.service';
@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
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
  baseURLofAPi: string;
  MemberIdURL: string;
  getData: any;
  getPhtosALL: any[] = [];
  invesment_summary: any;
  executive_summary: any;
  links: any;
  address: any;
  sale_condition: any;
  sale_type: any;
  property_type: any;
  property_subtype: any;
  building_class: any;
  lot_size: any;
  rentable_building_area: any;
  no_stories: any;
  parking_ratio: any;
  oppotunity_zone: any;
  year_built: any;
  claer_ceiling_height: any;
  no_dock_high_doors: any;
  no_drive_in: any;
  land_acres: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.baseURLofAPi = environment.baseUrl;
    let getParamsId = this.activatedRoute.snapshot.url;
    this.MemberIdURL = getParamsId[1].path;
    this.getDataPostById();
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
  getDataPostById() {
    let dataForForm = {
      id: this.MemberIdURL
    }
    this.UserService.wePogetPostingById(dataForForm).subscribe(result => {
      //console.log("result : ", result);
      if (result['success'] == true) {
        this.getData = result['getData'];
        this.getPhtosALL = this.getData[0].property_photos;
        this.invesment_summary = this.getData[0].invesment_summary;
        this.executive_summary = this.getData[0].executive_summary;
        this.links = this.getData[0].links;
        this.address = this.getData[0].address;
        this.sale_condition = this.getData[0].sale_condition;
        this.sale_type = this.getData[0].sale_type;
        this.property_type = this.getData[0].property_type;
        this.property_subtype = this.getData[0].property_subtype;
        this.building_class = this.getData[0].building_class;
        this.lot_size = this.getData[0].lot_size;
        this.rentable_building_area = this.getData[0].rentable_building_area;
        this.no_stories = this.getData[0].no_stories;
        this.parking_ratio = this.getData[0].parking_ratio;
        this.oppotunity_zone = this.getData[0].oppotunity_zone;
        this.year_built = this.getData[0].year_built;
        this.claer_ceiling_height = this.getData[0].claer_ceiling_height;
        this.no_dock_high_doors = this.getData[0].no_dock_high_doors;
        this.no_drive_in = this.getData[0].no_drive_in;
        this.land_acres = this.getData[0].land_acres;
      }
    });
  }
  onFileDropped(event) {
    for (let item of event) {
      this.files.push(item)
    }
  }

  delteFile(i) {
    this.files.splice(i, 1);
  }
  deltePreviousFile(i) {
    this.getPhtosALL.splice(i, 1);
  }

  submit() {
    // //console.log("form : ",this.createPostingForm.value);
    // //console.log("files : ",this.files);

    let fieldsOfCheckedArray = $("input[class='MakeCoverPhotoPost']").serializeArray();
    let finalString = "";
    // if (this.files.length == 0) {
    //   $('#fileDropRef').focus();
    //   finalString += "Please select property photos.<br>";
    // }
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
      // for (var i = 0; i < this.getPhtosALL.length; i++) {
        formData.append("previous_images", JSON.stringify(this.getPhtosALL));
      // }
      // formData.append("previous_images", this.getPhtosALL);

      for (var i = 0; i < this.files.length; i++) {
        formData.append("all_images", this.files[i], this.files[i].name);
      }
      //console.log("data before : ", formData);
      
      this.UserService.wePoUpdateListing(formData, this.MemberIdURL).subscribe(result => {
        //console.log("result : ", result);
        if (result['success'] == true) {
          $(".BuyerSuccess").html(result['message']);
          $('.BuyerSuccess').show();
          $('.BuyerDanger').hide();
          // location.reload();
          // this.router.navigate(['/all-posting']);
          location.href = "/all-posting"
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