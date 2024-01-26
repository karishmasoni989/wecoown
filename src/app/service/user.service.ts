import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userResponse: any = {};
  logUserName: any;
  loginPass: any;
  //url = 'http://107.21.235.191:3000';
  url = 'https://api.wecoown.com';
  headers = {
    headers: new HttpHeaders({
      // 'Content-Type':"application/json"
      // tslint:disable-next-line: max-line-length
      // Type:
      // 'Basic Auth',
      // Authorization: 'Basic UmFodWw6U3dhcEAxMjM0NQ== ${Username} ${Password}',
      // Username: JSON.parse(localStorage.getItem('loginUsername')),
      // Password: JSON.parse(localStorage.getItem('loginPassword'))
    })
  };

  constructor(private http: HttpClient, private FormsModule: FormsModule, private ReactiveFormsModule: ReactiveFormsModule) {

  }
  // public getIPAddress(){
  //   return this.http.get("http://api.ipify.org/?format=json");
  // }

  userRegister(data) {
    console.log('user data : ', data);
    return this.http.post(`${environment.baseUrl}user`, data);
  }

  login(data) {
    console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}login`, data);
  }

  getUserDataById(data) {
    console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}getUserById`, data);
  }

  updateUserProfile(data, user_id) {
    console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserProfile?id=` + user_id, data);
  }

  changePassword(data) {
    console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}userChangePassword`, data);
  }

  verifyEmailLink(data, id) {
    console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}verifyEmailLink?tokenVerify=` + id, data);
  }

  verifyEmailLinkForNewsletter(data, id) {
    console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}confirmNewsSubscribe?VerifyNewsSubscription=` + id, data);
  }

  NewsLetterSubscription(data) {
    console.log('news data : ', data);
    return this.http.post(`${environment.baseUrl}newsSubscribe`, data);
  }

  contactFormEmail(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}contactUsMsg`, data);
  }

  getAllCategory() {
    return this.http.get(`${environment.baseUrl}getAllCategory`);
  }

  setIAmBuyer(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}setIAmBuyer`, data);
  }

  forgetPassword(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}forgetUserPassword`, data);
  }

  verifyOTPForgetPassword(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}verifyOTPForgetUserPassword`, data);
  }

  forgetUserPasswordUpdate(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}forgetUserPasswordUpdate`, data);
  }

  forgetUsername(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}forgetUsername`, data);
  }

  getAllBuyerData() {
    return this.http.get(`${environment.baseUrl}getAllBuyerData`);
  }

  SearchBuyerFilter(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}searchForBuyer`, data);
  }

  getCategoryByName(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}getCategoryByNameAndBuyer`, data);
  }

  SearchFilterFor1Category(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}searchByCategoryName`, data);
  }

  showInterestUser(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}showInterestEmail`, data);
  }

  uploadCategoryPhotos(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}uploadCategoryPhotos`, data);
  }

  getCategoryPhotos(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}getCategoryPhotos`, data);
  }

  getUserPostByCategory(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}getUserPostByCategory`, data);
  }

  deleteUserPost(data) {
    console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}deleteUserPostByCategory`, data);
  }

  chatMessage(data) {
    console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}chatMessage`, data);
  }

  getAllChatByUserId(data) {
    console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getAllChatByUserId`, data);
  }

  markRead(data){
    console.log("Marked Chat As Read")
    return this.http.post( `http://107.21.235.191:3000/markRead`, data);
  }

  listAllChats(data){
    console.log('chat msg data : ', data);
    return this.http.post( `http://107.21.235.191:3000/listAllChats`, data);
  }

  listAllContacts(data){
    console.log('chat msg data : ', data);
    return this.http.post( `http://107.21.235.191:3000/listAllContacts`, data);
  }
  
  searchForMembers(data) {
    console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}searchForMembers`, data);
  }

  getUserAllPost(data) {
    console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getUserAllPostById`, data);
  }

  getUserAllPhotos(data) {
    console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getUserAllPostPhotosById`, data);
  }

  updateUserProfilePic(data, user_id) {
    console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserProfilePic?id=` + user_id, data);
  }

  updateUserCoverPic(data, user_id) {
    console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserCoverPic?id=` + user_id, data);
  }

  updateUserBio(data, user_id) {
    console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserBio?id=` + user_id, data);
  }

  updateUserProfilePublic(data, user_id) {
    console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserProfilePublic?id=` + user_id, data);
  }

  updateUserSocialLink(data, user_id) {
    console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserSocialLink?id=` + user_id, data);
  }

  updateUserVendor(data, user_id) {
    console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateVendorInfo?id=` + user_id, data);
  }

  updateUserVendorUntick(data, user_id) {
    console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateVendorInfoUntick?id=` + user_id, data);
  }

  BuyerPostLikeComment(data) {
    console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}postLikeComment`, data);
  }

  getPostLikeComment(data) {
    console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getLikeOfPost`, data);
  }

  getPostMediaLikeComment(data) {
    console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getMediaLikeOfPost`, data);
  }

  getOnePostById(data) {
    console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getOnePostById`, data);
  }

  wishlist(data) {
    console.log("wish list ", data);
    return this.http.post(`${environment.baseUrl}addtowishlist`, data);
  }

  loadLikeOfUser(data) {
    console.log(" load user like datat ", data);
    return this.http.post(`${environment.baseUrl}getUserLikeData`, data);
  }

  UnlikePost(data) {
    console.log(" unlike User Post ", data);
    return this.http.post(`${environment.baseUrl}unlikeUserPost`, data);
  }

  loadMediaLikeOfUser(data) {
    console.log(" load user like datat ", data);
    return this.http.post(`${environment.baseUrl}getUserMediaLikeData`, data);
  }

  UnlikeMediaPost(data) {
    console.log(" unlike User Post ", data);
    return this.http.post(`${environment.baseUrl}unlikeUserMediaPost`, data);
  }
  // getAllCategory() {
  //   return this.http.get( `${environment.baseUrl}getAllCategory`);
  // }
  // getCart() {
  //   return this.http.get(
  //     `https://anandtradingcompany.in/wp-json/cocart/v1/get-cart`,
  //     this.headers);
  // }
}