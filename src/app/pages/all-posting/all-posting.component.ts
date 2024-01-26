import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CountryStateCityService } from '../../service/country-state-city.service';

@Component({
  selector: 'app-all-posting',
  templateUrl: './all-posting.component.html',
  styleUrls: ['./all-posting.component.css']
})
export class AllPostingComponent implements OnInit {
  allPostdata: any;
  baseURLofAPi: string;
  getPramsPurpose: string;
  getPramsSearch: string;
  getKeywords: string;
  getPropertyTYee: string;
  getAllCountry: any;
  getAllStates: Object;
  getAllCities: Object;
  propertyType: any;
  subpropertyType: any;
  getSubPropertyTypeName: any;
  searchSelectCountry: any;
  searchSelectState: any;
  searchSelectCity: any;
  loading = false;
  getFinalPurpose: string;
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
    this.getKeywords = "";
    this.getFinalPurpose = "";
    this.getPropertyTYee = "";
    this.getSubPropertyTypeName = "";
    this.searchSelectCountry = "";
    this.searchSelectState = "";
    this.searchSelectCity = "";
    this.baseURLofAPi = environment.baseUrl;
    this.getPramsPurpose = this.activatedRoute.snapshot.queryParamMap.get('purpose');
    this.getPramsSearch = this.activatedRoute.snapshot.queryParamMap.get('searchPurpose');
    if (this.getPramsSearch != null && this.getPramsSearch != '') {
      this.getKeywords = this.activatedRoute.snapshot.queryParamMap.get('keywords');
      this.getPropertyTYee = this.activatedRoute.snapshot.queryParamMap.get('propertyType');
      this.getFinalPurpose = this.getPramsSearch;
      this.goToSearchFilter();
    } else {
      this.getFinalPurpose = this.getPramsPurpose;
      this.getAllPostingg();
    }
    this.getPropertyType();
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
    let splitCountryName = country_code.split('||');
    let dataForm = {
      country_code: splitCountryName[0]
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
    let splitCountryState = mergeName.split('||');
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
  getPropertyType() {
    this.UserService.getPropertyType().subscribe(result => {
      if (result['success'] == true) {
        this.propertyType = (result['data']);
      }
    });
  }
  // for get sub property type
  getSubPropertyType(name) {
    let dataForForm = {
      property_type: name
    }
    this.UserService.getSubPropertyType(dataForForm).subscribe(result => {
      //console.log("ddddddddddddddddd : ", result['data']);
      if (result['success'] == true) {
        this.subpropertyType = (result['data']);
      }
    });
  }
  goToSearchFilter() {
    this.loading = true;
    let formDD = {
      "keyword": this.getKeywords,
      "purpose": this.getFinalPurpose,
      "property_type": this.getPropertyTYee,
      "property_subtype": this.getSubPropertyTypeName,
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
  getAllPostingg() {
    this.loading = true;
    let formDD = {
      purpose: this.getPramsPurpose
    }
    this.UserService.wePogetAllPosting(formDD).subscribe(result => {
      //console.log("result : ",result);
      
      this.loading = false;
      //console.log("all result :", result);
      if (result['success'] == true) {
        this.allPostdata = (result['getData']);
      }
    });
  }
  gotoCreate() {
    // routerLink="/create-listing?id=jjj"
    this.router.navigate(['/create-listing'], {
      queryParams: {
        newOrdNum: '123'
      },
      //queryParamsHandling: 'merge',
    });
  }
  openDropdownList() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  goTocatrgpyList(name) {
    let checkUserProfile = JSON.parse(localStorage.getItem('userInfo'));
    if (checkUserProfile != null) {
      this.router.navigate([name]);
      // location.href = "/category-listing/" + name ;
    } else {
      this.router.navigate(['/login']);
    }
  }
}