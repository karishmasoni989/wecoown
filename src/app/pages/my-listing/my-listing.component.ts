import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CountryStateCityService } from '../../service/country-state-city.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css']
})
export class MyListingComponent implements OnInit {
  allPostdata: any;
  baseURLofAPi: string;
  getKeywords: string;
  getFinalPurpose: string;
  getPropertyTYee: string;
  getSubPropertyTypeName: string;
  searchSelectCountry: string;
  searchSelectState: string;
  searchSelectCity: string;
  loading = false;
  getAllCountry: any;
  getAllCities: Object;
  propertyType: any;
  subpropertyType: any;
  getAllStates: Object;
  // percent: any;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public CountryStateCityService: CountryStateCityService,
    private AppComponent: AppComponent,
  ) {
    this.getAllPostingg();
    // for login crediential
    // let checkUserProfile = localStorage.getItem('userInfo');
    // if (checkUserProfile == null) {
    //   let dataForm = { }
    //   this.UserService.checkForIsLoggedIn(dataForm).subscribe(result => {
    //     //console.log("resulttttttttttttttttttt : ", result);       
    //     if (result['success'] == true) {
    //       localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
    //       this.AppComponent.userProfileHide();
    //     }     
    //   });
    // }
  }
  ionViewWillEnter() {
    //console.log("In user profile component");
    let getUserId11 = localStorage.getItem('userInfo');
    if (getUserId11 == null) {
      let getLoginToken = this.activatedRoute.snapshot.queryParamMap.get('logToken');
      let dataForm = { login_token: getLoginToken, website: 'WePropertyowners' }
      this.UserService.checkForIsLoggedIn(dataForm).subscribe(result => {
        //console.log("resulttttttttttttttttttt in user component: ", result);
        if (result['success'] == true) {
          localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
          this.AppComponent.userProfileHide();
          this.StartOfPage();
        } else {
          location.href = '/';
        }
      });
    } else {
      this.StartOfPage();
    }
  }
  ngOnInit() {
    //console.log("In user profile component");
    let getUserId11 = localStorage.getItem('userInfo');
    if (getUserId11 == null) {
      let getLoginToken = this.activatedRoute.snapshot.queryParamMap.get('logToken');
      let dataForm = { login_token: getLoginToken, website: 'WePropertyowners'}
      this.UserService.checkForIsLoggedIn(dataForm).subscribe(result => {
        //console.log("resulttttttttttttttttttt in user component: ", result);
        if (result['success'] == true) {
          localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
          this.AppComponent.userProfileHide();
          this.StartOfPage();
        } else {
          location.href = '/';
        }
      });
    } else {
      this.StartOfPage();
    }
  }
  StartOfPage() {
    this.baseURLofAPi = environment.baseUrl;
    this.getKeywords = "";
    this.getFinalPurpose = "";
    this.getPropertyTYee = "";
    this.getSubPropertyTypeName = "";
    this.searchSelectCountry = "";
    this.searchSelectState = "";
    this.searchSelectCity = "";
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
    this.getPropertyType();
  }
  getAllPostingg() {
    // this.loading = true;
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    if (userLocalId != null) {
      let formData = {
        id: parseData['id']
      }
      this.UserService.wePogetAllUserListingByID(formData).subscribe(result => {
        // this.loading = false;
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
  }
  gotoCreate() {
    // routerLink="/create-listing?id=jjj"
    this.router.navigate(['/create-listing'], {
      queryParams: {
        newOrdNum: '123'
      },
      // //queryParamsHandling: 'merge',
    });
  }
  // start Country state city
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
  // for country
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
  openDropdownList() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

}
