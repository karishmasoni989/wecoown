import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CountryStateCityService } from '../../service/country-state-city.service';

@Component({
  selector: 'app-sub-category-listing',
  templateUrl: './sub-category-listing.component.html',
  styleUrls: ['./sub-category-listing.component.css']
})
export class SubCategoryListingComponent implements OnInit {
  allPostdata: any;
  baseURLofAPi: string;
  MemberNameURL: string;
  MemberSubCatURL: string;
  loading = false;
  getKeywords: string;
  getFinalPurpose: string;
  searchSelectCountry: string;
  searchSelectState: string;
  searchSelectCity: string;
  getAllCountry: any;
  getAllStates: Object;
  getAllCities: Object;

  // percent: any;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public CountryStateCityService: CountryStateCityService,
  ) { }
  ionViewWillEnter() {
    this.startOfPage();
  }
  ngOnInit(){
    this.startOfPage();
  }
  startOfPage() {
    this.baseURLofAPi = environment.baseUrl;
    this.getKeywords = "";
    this.getFinalPurpose = "";    
    this.searchSelectCountry = "";
    this.searchSelectState = "";
    this.searchSelectCity = "";
    let getParamsId = this.activatedRoute.snapshot.url;
    let splitDATA = getParamsId[1].path.split('||');
    this.MemberNameURL = splitDATA[0];
    this.MemberSubCatURL = splitDATA[1];
    this.getAllPostingg();
    // for country state city
    this.getAllCountrydataFromWecoownServer()
    // let checkAUTT = localStorage.getItem("CountryAuthToken");
    // let checkCountryy = localStorage.getItem("AllCountries");
    // if (checkAUTT != null) {
    //   if (checkCountryy != null) {
    //     this.getAllCountry = JSON.parse(checkCountryy);
    //     let getIndex = this.findArrayIndex(this.getAllCountry, 'country_name', 'United States');
    //     this.array_move(this.getAllCountry, getIndex, 0)
    //   }
    //   else {
    //     this.getAllCountryData();
    //   }
    // } else {
    //   this.getCountryAuthh();
    // }
  }
  getAllPostingg() {
    this.loading = true;
    let formDataa = {
      property_type: this.MemberNameURL,
      property_subtype: this.MemberSubCatURL
    }
    this.UserService.getSubCategoryListing(formDataa).subscribe(result => {
      this.loading = false;
      //console.log("all result :", result);
      if (result['success'] == true) {
        this.allPostdata = (result['getData']);
        if (this.allPostdata.length == 0) {
          $('#no-post-list').show();
        }
        else {
          $('#no-post-list').hide();
        }
      }
    });
  }
  gotoCreateListing() {
    let checkUserProfile = JSON.parse(localStorage.getItem('userInfo'));
    if (checkUserProfile != null) {
      if (this.MemberNameURL == 'Real Estate') {
        this.router.navigate(['/listing-real-estate']);
      }
      else if (this.MemberNameURL == 'Yachts & Ships') {
        this.router.navigate(['/listing-yachts']);
      }
      else if (this.MemberNameURL == 'Jets & Aircraft') {
        this.router.navigate(['/listing-aircraft']);
      }
      else if (this.MemberNameURL == 'Crowdfunding Projects') {
        this.router.navigate(['/listing-crowdfunding']);
      }
      else if (this.MemberNameURL == 'Crypto-Assets') {
        this.router.navigate(['/listing-crypto-asset']);
      }
      else if (this.MemberNameURL == 'Horses & Live Stocks') {
        this.router.navigate(['/listing-horses-livestocks']);
      }
      else if (this.MemberNameURL == 'Artworks & Antiques') {
        this.router.navigate(['/listing-artworks']);
      }
      else if (this.MemberNameURL == 'Cars & RVs') {
        this.router.navigate(['/listing-cars-rv']);
      }
      else if (this.MemberNameURL == 'Business Properties') {
        this.router.navigate(['/listing-business']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  openDropdownList() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  // start Country state city
  // for country
  getAllCountrydataFromWecoownServer() {
    this.UserService.GetAllCountryData().subscribe(result => {
      //console.log("result of get allllllllllllllllll country: ", result);
      if (result['success'] == true) {
        this.getAllCountry = result['countryData'];
      }
    })
  }
  changeCoutry(country_code) {
    let dataForm = {
      country_code: country_code
    }
    this.UserService.GetAllStateData(dataForm).subscribe(result => {
      //console.log("result of get allllllllllllllllll states: ", result);
      if (result['success'] == true) {
        this.getAllStates = result['stateData'];
      }
    })
  }
  changeState(mergeName) {
    //console.log("mergeName :", mergeName);
    //     this.getAllCities = result111
    let splitCountryState = mergeName.split('-');
    let dataForm = {
      country_code: splitCountryState[0],
      region_iso_code: splitCountryState[1]
    }
    //console.log("dataForm :", dataForm);
    this.UserService.getAllCityData(dataForm).subscribe(result => {
      //console.log("result of get allllllllllllllllll cities: ", result);
      if (result['success'] == true) {
        this.getAllCities = result['cityData'];
      }
    })
  }
  // getCountryAuthh() {
  //   let checkAuthh = localStorage.getItem("CountryAuthToken")
  //   if (checkAuthh == null) {
  //     this.CountryStateCityService.getCountryAuth().subscribe(result => {
  //       ////console.log("result od countryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy: ", result);
  //       localStorage.setItem('CountryAuthToken', JSON.stringify(result));
  //       this.getAllCountryData();
  //     })
  //   }
  // }
  // getAllCountryData() {
  //   this.CountryStateCityService.GetAllCountryData().subscribe(result111 => {
  //     localStorage.setItem('AllCountries', JSON.stringify(result111));
  //     this.getAllCountry = result111;
  //     let getIndex = this.findArrayIndex(this.getAllCountry, 'country_name', 'United States');
  //     this.array_move(this.getAllCountry, getIndex, 0)
  //   })
  // }
  // // for United states at 1 position
  // array_move(arr, old_index, new_index) {
  //   if (new_index >= arr.length) {
  //     var k = new_index - arr.length + 1;
  //     while (k--) {
  //       arr.push(undefined);
  //     }
  //   }
  //   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  //   return arr; // for testing
  // };
  // findArrayIndex(array, attr, value) {
  //   for (var i = 0; i < array.length; i++) {
  //     if (array[i].country_name == value) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
  // changeCoutry(country_name) {
  //   this.CountryStateCityService.GetAllStateData(country_name).subscribe(result111 => {
  //     this.getAllStates = result111
  //   }, error => {
  //     ////console.log("errorrrrrrrrrrrrrr",error);
  //     if (error) {
  //       this.CountryStateCityService.getCountryAuth().subscribe(result => {
  //         localStorage.setItem('CountryAuthToken', JSON.stringify(result));
  //         this.getAllCountryData();
  //         // location.reload();
  //       })
  //     }
  //   })
  // }
  // here(name) {
  //   this.CountryStateCityService.GetAllCityData(name).subscribe(result111 => {
  //     this.getAllCities = result111
  //   })
  // }
  // end country state city
  goToSearchFilter() {
    this.loading = true;
    let formDD = {
      "keyword": this.getKeywords,
      "purpose": this.getFinalPurpose,
      "property_type": this.MemberNameURL,
      "property_subtype": this.MemberSubCatURL,
      "country": this.searchSelectCountry,
      "state": this.searchSelectState,
      "city": this.searchSelectCity
    }
    // alert(JSON.stringify(formDD));
    this.UserService.searchFilterofWepoListing(formDD).subscribe(result => {
      this.loading = false;
      //console.log("all result :", result);
      if (result['success'] == true) {
        this.allPostdata = (result['getData']);
        if (result['dataCount'] == 0) {
          $('.notFoundPost').show();
        } else {
          $('.notFoundPost').hide();
        }
      }
    });
  }
}