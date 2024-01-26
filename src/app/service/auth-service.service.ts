import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    
    let token = localStorage.getItem('userInfo');
    let parseToken = JSON.parse(token);
    //console.log("auth service  : ",token);
    if (token != undefined) {
      return true;      
    } else {
      return false;
    }
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(parseToken['login_token']);
  }
}
