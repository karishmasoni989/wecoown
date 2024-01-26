import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { $ } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {
  userResponse: any = {};
  logUserName: any;
  loginPass: any;
  //url = 'http://107.21.235.191:3000';
  url = 'https://api.wecoown.com';
  getAuth: any;
  headers = {
    headers: new HttpHeaders({
      "Accept": "application/json",
      "api-token": "TnPTTQ3xIe0gAPpPzfGcANfbQLQpP3NspCZlqtpEspLp-yOM8tfvqjk3FKjwRYXTnKg",
      "user-email": "techdev@wecoown.com"
    })
  };
  getAuthNew: Observable<Object>;
  constructor(private http: HttpClient, private FormsModule: FormsModule, private ReactiveFormsModule: ReactiveFormsModule) {
  }
  // countryAuth(){
  //   this.getAuthNew;
  //   this.http.get("https://www.universal-tutorial.com/api/getaccesstoken", this.headers).subscribe(result => {
  //     ////console.log("result od countryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy: ", result);
  //     alert("in country")
  //     localStorage.setItem('CountryAuthToken', JSON.stringify(result));
  //   });   
  // }
  getCountryAuth() {
    return this.http.get("https://www.universal-tutorial.com/api/getaccesstoken", this.headers);
  }

  GetAllCountryData() {
    let getAuthhh = localStorage.getItem('CountryAuthToken');
    if (getAuthhh != null) {
      let parseDDD = JSON.parse(getAuthhh)
      this.getAuth = parseDDD['auth_token'];
    }
    var header2 = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.getAuth,
        "Accept": "application/json"
      })
    }
    return this.http.get("https://www.universal-tutorial.com/api/countries/", header2);
  }

  GetAllStateData(data) {
    let getAuthhh = localStorage.getItem('CountryAuthToken');
    if (getAuthhh != null) {
      let parseDDD = JSON.parse(getAuthhh)
      this.getAuth = parseDDD['auth_token'];
    }
    var header2 = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.getAuth,
        "Accept": "application/json"
      })
    }
    let checkStatus = this.http.get("https://www.universal-tutorial.com/api/states/"+data, header2);
    ////console.log("cccccccc ",checkStatus);
    
    return this.http.get("https://www.universal-tutorial.com/api/states/"+data, header2);
  }

  GetAllCityData(data) {
    let getAuthhh = localStorage.getItem('CountryAuthToken');
    if (getAuthhh != null) {
      let parseDDD = JSON.parse(getAuthhh)
      this.getAuth = parseDDD['auth_token'];
    }
    var header2 = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.getAuth,
        "Accept": "application/json"
      })
    }
    return this.http.get("https://www.universal-tutorial.com/api/cities/"+data, header2);
  }
  // var req = unirest("GET", "https://www.universal-tutorial.com/api/getaccesstoken");

  // req.headers({
  //   "Accept": "application/json",
  //   "api-token": "TnPTTQ3xIe0gAPpPzfGcANfbQLQpP3NspCZlqtpEspLp-yOM8tfvqjk3FKjwRYXTnKg",
  //   "user-email": "techdev@wecoown.com"
  // });
}


