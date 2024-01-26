import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { UserService } from '../../app/service/user.service';
import { takeUntil } from 'rxjs/operators';
@Injectable()
export class IsLoggedInInterceptService {
  constructor(private UserService: UserService, private activatedRoute: ActivatedRoute) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // alert("INTERCEPTOR")
    //console.log('INTERCEPTOR');
    const getLoginToken = this.activatedRoute.snapshot.queryParamMap.get('logToken');
    let checkUserProfile = localStorage.getItem('userInfo');
    //console.log("get log item : ", getLoginToken, checkUserProfile);
    // call API for islogged in user
    if (checkUserProfile != null) {
      return next.handle(req);
    } else if (getLoginToken != null) {
      //console.log("else if");
      let dataForm = { login_token: getLoginToken }
      this.UserService.checkForIsLoggedIn(dataForm).subscribe(result => {
        //console.log("resulttttttttttttttttttt : ", result);
        if (result['success'] == true) {
          localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
        }
      });
      return next.handle(req);
    } else {
      //console.log("else");
      let dataForm = {}
      this.UserService.checkForIsLoggedIn(dataForm).subscribe(result => {
        //console.log("resulttttttttttttttttttt : ", result);
        if (result['success'] == true) {
          localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
        }
      });
      return next.handle(req);
    }
    // All HTTP requests are going to go through this method
  }
}
