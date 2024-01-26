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
    ////console.log('user data : ', data);
    return this.http.post(`${environment.baseUrl}user`, data);
  }

  login(data) {
    ////console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}login`, data);
  }

  getUserDataById(data) {
    ////console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}getUserById`, data);
  }

  updateUserProfile(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserProfile?id=` + user_id, data);
  }

  changePassword(data) {
    ////console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}userChangePassword`, data);
  }

  verifyEmailLink(data, id) {
    ////console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}verifyEmailLink?tokenVerify=` + id, data);
  }

  verifyEmailLinkForNewsletter(data, id) {
    ////console.log('login data : ', data);
    return this.http.post(`${environment.baseUrl}confirmNewsSubscribe?VerifyNewsSubscription=` + id, data);
  }

  NewsLetterSubscription(data) {
    ////console.log('news data : ', data);
    return this.http.post(`${environment.baseUrl}newsSubscribe`, data);
  }

  contactFormEmail(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}contactUsMsg`, data);
  }

  getAllCategory() {
    return this.http.get(`${environment.baseUrl}getAllCategory`);
  }

  setIAmBuyer(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}setIAmBuyer`, data);
  }

  forgetPassword(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}forgetUserPassword`, data);
  }

  verifyOTPForgetPassword(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}verifyOTPForgetUserPassword`, data);
  }

  forgetUserPasswordUpdate(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}forgetUserPasswordUpdate`, data);
  }

  forgetUsername(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}forgetUsername`, data);
  }

  getAllBuyerData() {
    return this.http.get(`${environment.baseUrl}getAllBuyerData`);
  }

  SearchBuyerFilter(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}searchForBuyer`, data);
  }

  getCategoryByName(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}getCategoryByNameAndBuyer`, data);
  }

  SearchFilterFor1Category(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}searchByCategoryName`, data);
  }

  showInterestUser(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}showInterestEmail`, data);
  }

  uploadCategoryPhotos(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}uploadCategoryPhotos`, data);
  }

  getCategoryPhotos(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}getCategoryPhotos`, data);
  }

  getUserPostByCategory(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}getUserPostByCategory`, data);
  }

  deleteUserPost(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}deleteUserPostByCategory`, data);
  }

  chatMessage(data) {
    ////console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}chatMessage`, data);
  }

  getAllChatByUserId(data) {
    ////console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getAllChatByUserId`, data);
  }

  searchForMembers(data) {
    ////console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}searchForMembers`, data);
  }

  getUserAllPost(data) {
    ////console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getUserAllPostById`, data);
  }

  getUserAllPhotos(data) {
    ////console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getUserAllPostPhotosById`, data);
  }

  updateUserProfilePic(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserProfilePic?id=` + user_id, data);
  }

  updateUserCoverPic(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserCoverPic?id=` + user_id, data);
  }

  updateUserBio(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserBio?id=` + user_id, data);
  }

  updateUserProfilePublic(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserProfilePublic?id=` + user_id, data);
  }

  updateUserSocialLink(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserSocialLink?id=` + user_id, data);
  }

  updateUserVendor(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateVendorInfo?id=` + user_id, data);
  }

  updateUserVendorUntick(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateVendorInfoUntick?id=` + user_id, data);
  }

  BuyerPostLikeComment(data) {
    ////console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}postLikeComment`, data);
  }

  getPostLikeComment(data) {
    ////console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getLikeOfPost`, data);
  }

  getPostMediaLikeComment(data) {
    ////console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getMediaLikeOfPost`, data);
  }

  getOnePostById(data) {
    ////console.log('chat msg data : ', data);
    return this.http.post(`${environment.baseUrl}getOnePostById`, data);
  }

  wishlist(data) {
    ////console.log("wish list ", data);
    return this.http.post(`${environment.baseUrl}addtowishlist`, data);
  }

  loadLikeOfUser(data) {
    ////console.log(" load user like datat ", data);
    return this.http.post(`${environment.baseUrl}getUserLikeData`, data);
  }

  UnlikePost(data) {
    ////console.log(" unlike User Post ", data);
    return this.http.post(`${environment.baseUrl}unlikeUserPost`, data);
  }

  loadMediaLikeOfUser(data) {
    ////console.log(" load user like datat ", data);
    return this.http.post(`${environment.baseUrl}getUserMediaLikeData`, data);
  }

  UnlikeMediaPost(data) {
    ////console.log(" unlike User Post ", data);
    return this.http.post(`${environment.baseUrl}unlikeUserMediaPost`, data);
  }

  setBannerAd(data) {
    ////console.log(" unlike User Post ", data);
    return this.http.post(`${environment.baseUrl}setBannerAd`, data);
  }

  setPosterAd(data) {
    ////console.log(" unlike User Post ", data);
    return this.http.post(`${environment.baseUrl}setPosterAd`, data);
  }

  setSidebarAd(data) {
    ////console.log(" unlike User Post ", data);
    return this.http.post(`${environment.baseUrl}setSidebarAd`, data);
  }

  setVendorPageListingAd(data) {
    ////console.log(" unlike User Post ", data);
    return this.http.post(`${environment.baseUrl}setVendorPageListingAd`, data);
  }
  getAdText() {
    return this.http.get(`${environment.baseUrl}getAdTest`);
  }
  getAllAd(id) {
    return this.http.post(`${environment.baseUrl}getAllAd`, id);
  }
  getAdByIDAndName(data) {
    return this.http.post(`${environment.baseUrl}getAdByIdAndName`, data);
  }
  updateStatusOfAds(data) {
    return this.http.post(`${environment.baseUrl}updateStatusOfAds`, data);
  }
  updateBannerAd(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateBannerAds?id=` + user_id, data);
  }
  updatePosterAd(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updatePosterAds?id=` + user_id, data);
  }
  updateSidebarAd(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateSidebarAds?id=` + user_id, data);
  }
  updateVendorAd(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateVendorAds?id=` + user_id, data);
  }
  getAllVendorList() {
    ////console.log('login data : ', data);
    return this.http.get(`${environment.baseUrl}getAllVendorAd`);
  }
  getVendorType() {
    return this.http.get(`${environment.baseUrl}getVendorType`);
  }
  /*******************WePo Api************* */

  getPropertyType() {
    ////console.log('login data : ', data);
    return this.http.get(`${environment.baseUrl}wePoPropertyType`);
  }
  confirmRole(data) {
    return this.http.post(`${environment.baseUrl}updateUserRole`, data);
  }
  createwePoPosting(data) {
    //console.log("data : ", data);
    return this.http.post(`${environment.baseUrl}wePoPosting`, data);
  }
  wePogetAllPosting(data) {
    return this.http.post(`${environment.baseUrl}wePogetAllPosting`, data);
  }
  wePogetAllUserListingByID(data) {
    //console.log("uss : ", data);
    return this.http.post(`${environment.baseUrl}wePogetAllPostingByUserId`, data);
  }
  wePogetPostingById(data) {
    return this.http.post(`${environment.baseUrl}wePogetPostingById`, data);
  }
  wePoDeletePostingById(data) {
    return this.http.post(`${environment.baseUrl}wePodeletePosting`, data);
  }
  wePoUpdateListing(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdatePosting?id=` + user_id, data);
  }
  // create listing by property type
  createListingOffice(data) {
    // //console.log("data : ",data);    
    return this.http.post(`${environment.baseUrl}wePoListingOffice`, data);
  }
  createListingIndustrial(data) {
    return this.http.post(`${environment.baseUrl}wePoListingIndustrial`, data);
  }
  createListingRetail(data) {
    return this.http.post(`${environment.baseUrl}wePoListingRetail`, data);
  }
  createListingRestaurant(data) {
    return this.http.post(`${environment.baseUrl}wePoListingRestaurant`, data);
  }
  createListingShopping(data) {
    return this.http.post(`${environment.baseUrl}wePoListingShopping`, data);
  }
  createListingMultifamily(data) {
    return this.http.post(`${environment.baseUrl}wePoListingMultifamily`, data);
  }
  createListingSpecaility(data) {
    return this.http.post(`${environment.baseUrl}wePoListingSpecaility`, data);
  }
  createListingHospitility(data) {
    return this.http.post(`${environment.baseUrl}wePoListingHospitility`, data);
  }
  createListingHealthCare(data) {
    return this.http.post(`${environment.baseUrl}wePoListingHealthCare`, data);
  }
  createListingSport(data) {
    return this.http.post(`${environment.baseUrl}wePoListingSports`, data);
  }
  createListingLand(data) {
    return this.http.post(`${environment.baseUrl}wePoListingLand`, data);
  }
  createListingresidential(data) {
    return this.http.post(`${environment.baseUrl}wePoListingTResidential`, data);
  }
  // update listing by property type
  UpdateListingOffice(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingOffice?id=` + user_id, data);
  }
  UpdateListingIndustrial(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingIndustrial?id=` + user_id, data);
  }
  UpdateListingRetail(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingRetail?id=` + user_id, data);
  }
  UpdateListingRestaurant(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingRetaurant?id=` + user_id, data);
  }
  UpdateListingShopping(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingShopping?id=` + user_id, data);
  }
  UpdateListingMultifamily(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingMultifamily?id=` + user_id, data);
  }
  UpdateListingSpecaility(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingSpecaility?id=` + user_id, data);
  }
  UpdateListingHospitility(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingHospitility?id=` + user_id, data);
  }
  UpdateListingHealthCare(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingHealthCare?id=` + user_id, data);
  }
  UpdateListingSport(data, user_id) {
    //console.log("data : ", data);

    return this.http.put(`${environment.baseUrl}wePoUpdateListingOSports?id=` + user_id, data);
  }
  UpdateListingLand(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingland?id=` + user_id, data);
  }
  UpdateListingResidential(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingResidential?id=` + user_id, data);
  }
  // delete listing by property type
  DeletePostingOffice(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingOffice`, data);
  }
  DeletePostingindustrial(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingIndustrial`, data);
  }
  DeletePostingRetail(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingRetail`, data);
  }
  DeletePostingRestaurant(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingRestaurant`, data);
  }
  DeletePostingShopping(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingShopping`, data);
  }
  DeletePostingMultifamily(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingMultifamily`, data);
  }
  DeletePostingSpeciality(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingSpecaility`, data);
  }
  DeletePostingHospitility(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingHospitility`, data);
  }
  DeletePostingHealthCare(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingHealthCare`, data);
  }
  DeletePostingSport(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingSports`, data);
  }
  DeletePostingLand(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingLand`, data);
  }
  DeletePostingResidential(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingResidential`, data);
  }
  CreateRealEstateListing(data) {
    return this.http.post(`${environment.baseUrl}wePoListingRealEstate`, data);
  }
  CreateAircraftListing(data) {
    return this.http.post(`${environment.baseUrl}wePoListingAircraft`, data);
  }
  CreateYachtListing(data) {
    return this.http.post(`${environment.baseUrl}wePoListingYachts`, data);
  }
  CreateCrowdFundingListing(data) {
    return this.http.post(`${environment.baseUrl}wePoListingCrowdFunding`, data);
  }
  CreateBusinessListing(data) {
    return this.http.post(`${environment.baseUrl}wePoListingBusiness`, data);
  }
  CreateArtworkListing(data) {
    return this.http.post(`${environment.baseUrl}wePoListingArtwork`, data);
  }
  CreateCarsRvListing(data) {
    return this.http.post(`${environment.baseUrl}wePoListingCarsRv`, data);
  }
  CreateCryptoListing(data) {
    return this.http.post(`${environment.baseUrl}wePoListingCrypto`, data);
  }
  CreateHorsesLiveListing(data) {
    return this.http.post(`${environment.baseUrl}wePoListingHorsesLive`, data);
  }
  UpdateListingrealEstate(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingRealEstate?id=` + user_id, data);
  }
  UpdateListingAircraft(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingAircraft?id=` + user_id, data);
  }
  UpdateListingyacht(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingYachts?id=` + user_id, data);
  }
  UpdateListingCrowdFunding(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingCrowdFunding?id=` + user_id, data);
  }
  UpdateListingBusiness(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingBusiness?id=` + user_id, data);
  }
  UpdateListingArtwork(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingArtwork?id=` + user_id, data);
  }
  UpdateListingCarsRv(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingCarsRv?id=` + user_id, data);
  }
  UpdateListingCrypto(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingCrypto?id=` + user_id, data);
  }
  UpdateListingHorsesLive(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateListingHorsesLive?id=` + user_id, data);
  }
  updateListingSoldOut(data, user_id) {
    return this.http.put(`${environment.baseUrl}wePoUpdateSoldOutListing?id=` + user_id, data);
  }
  DeletePostingRealestate(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingRealEstate`, data);
  }
  DeletePostingAircraft(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingAircraft`, data);
  }
  DeletePostingYacht(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingYachts`, data);
  }
  DeletePostingCrowdFunding(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingCrowdFunding`, data);
  }
  DeletePostingBusiness(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingBusiness`, data);
  }
  DeletePostingArtwork(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingArtwork`, data);
  }
  DeletePostingCarsRv(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingCars`, data);
  }
  DeletePostingHorses(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingHorses`, data);
  }
  DeletePostingCrypto(data) {
    return this.http.post(`${environment.baseUrl}wePodeleteListingCrypto`, data);
  }
  getSubPropertyType(data) {
    return this.http.post(`${environment.baseUrl}wePoGetSubPropertyType`, data);
  }
  getSubCategoryListing(data) {
    return this.http.post(`${environment.baseUrl}wePoGetSubCategoryListing`, data);
  }
  getRealEstaeAllCount() {
    return this.http.get(`${environment.baseUrl}wePogetRealEsateCount`);
  }
  getAircraftAllCount() {
    return this.http.get(`${environment.baseUrl}wePogetAircraftCount`);
  }
  getYachtsAllCount() {
    return this.http.get(`${environment.baseUrl}wePogetYachtsCount`);
  }
  getCrowdFundingAllCount() {
    return this.http.get(`${environment.baseUrl}wePogetCrowdFundingCount`);
  }
  getBusinessAllCount() {
    return this.http.get(`${environment.baseUrl}wePogetBusinessCount`);
  }
  getArtworkAllCount() {
    return this.http.get(`${environment.baseUrl}wePogetArtworkCount`);
  }
  getCarsRVAllCount() {
    return this.http.get(`${environment.baseUrl}wePogetCarsRvCount`);
  }
  getCryptoAllCount() {
    return this.http.get(`${environment.baseUrl}wePogetCryptoCount`);
  }
  getHorsesLiveAllCount() {
    return this.http.get(`${environment.baseUrl}wePogetHorsesLiveCount`);
  }
  searchFilterofWepoListing(data) {
    return this.http.post(`${environment.baseUrl}wePoSerachForAllSaleAndLease`, data);
  }
  // for user signout 
  signOutUser(data) {
    return this.http.post(`${environment.baseUrl}signOutUser`, data);
  }
  checkForIsLoggedIn(data) {
    return this.http.post( `${environment.baseUrl}IsUserLoggedIn`, data);
  }
  updateUserRolewhenWebsiteChange(data, user_id) {
    ////console.log('login data : ', data);
    return this.http.put(`${environment.baseUrl}updateUserRolewhenWebsiteChange?id=` + user_id, data);
  }
  setIAmBuyerByWePo(data) {
    ////console.log('contact form data : ', data);
    return this.http.post(`${environment.baseUrl}setIAmBuyerByWePo`, data);
  }
  getAllUserReport(data){
    return this.http.post(`${environment.baseUrl}getAllUserForAdmin`, data);
  }
  checkUserMembership(data) {
    return this.http.post(`${environment.baseUrl}checkAlreadyUserMembership`, data);
  }
  createMyPbmsGroup(data){
    return this.http.post(`${environment.baseUrl}createMyPbmsGroup`, data);
  }
  getMyPbmsById(data){
    return this.http.post(`${environment.baseUrl}getMyPbmsById`, data);
  }
  changeStatusAndReadPbms(data){
    return this.http.post(`${environment.baseUrl}updatePbmsInvitaionReadStatus`, data);
  }
  getOnePbmsById(data){
    return this.http.post(`${environment.baseUrl}getOnePbmsById`, data);
  }
  wePoGetAllListingForWecownPbmsGroup(){
    return this.http.get(`${environment.baseUrl}wePoGetAllListingForWecownPbmsGroup`);
  }
  getAllMyPortFolioDataOfwepo(data){
    return this.http.post(`${environment.baseUrl}getAllMyPortFolioDataOfwepo`, data);
  }
  getAllVeirifiedUserList(data) {
    return this.http.post(`${environment.baseUrl}getAllVerfiedUserForInvitation`, data);
  }
  addmembershipUser(data) {
    return this.http.post(`${environment.baseUrl}setUserMembership`, data);
  }
  sendInvitationForBookPost(data) {
    return this.http.post(`${environment.baseUrl}sendInvitationForBookPost`, data);
  }
  sendRequestForBookPost(data) {
    return this.http.post(`${environment.baseUrl}sendRequestForBookPost`, data);
  }
  addMoreMebersInGroup(data){
    return this.http.post(`${environment.baseUrl}AddMoreNewMemberInGroup`, data);
  }
  DeleteMebersInGroup(data){
    return this.http.post(`${environment.baseUrl}deletedMemberInGroup`, data);
  }
  sendRequestForBecomeAdminOfPbms(data){
    return this.http.post(`${environment.baseUrl}sendRequestForBecomeAdminOfPbms`, data);
  }
  deletedPbmsGroupById(data){
    return this.http.post(`${environment.baseUrl}deletedPbmsGroupById`, data);
  }
  memberLeaveTheGroup(data){
    return this.http.post(`${environment.baseUrl}memberLeaveTheGroup`, data);
  }
  getNotifications(data){
    return this.http.post(`${environment.baseUrl}getUserAllInvitationForPortfolio`, data);
  }
  SendAdminAprrovalResponse(data){
    return this.http.post(`${environment.baseUrl}ChangeStatusOfRequestForBecomeAdminOfPbms`, data);
  }
  getOnebookPbmsPropertyById(data) {
    return this.http.post(`${environment.baseUrl}getOnebookPbmsPropertyById`, data);
  }
  updateStatusbookPbmsPropertyById(data) {
    return this.http.post(`${environment.baseUrl}updateStatusbookPbmsPropertyById`, data);
  }
  updateBookingPbmsPropertyById(user_id, data) {
    return this.http.put(`${environment.baseUrl}updatebookPbmsPropertyById?id=` + user_id, data);
  }
  getOnlyOneBookingPropertyData(data) {
    return this.http.post(`${environment.baseUrl}getOnlyOnebookPbmsPropertyById`, data);
  }
  createRentingPbmsProperty(data) {
    return this.http.post(`${environment.baseUrl}rentingPbmsProperty`, data);
  }
  getOneRentingPbmsPropertyById(data) {
    return this.http.post(`${environment.baseUrl}getOneRentingPbmsPropertyById`, data);
  }
  updateRentingPbmsPropertyById(user_id, data) {
    return this.http.put(`${environment.baseUrl}updateRentingPbmsPropertyById?id=` + user_id, data);
  }
  getOnlyOneRentingPropertyData(data) {
    return this.http.post(`${environment.baseUrl}getOnlyOneRentingPropertyData`, data);
  }
  createCharteringPbmsProperty(data) {
    return this.http.post(`${environment.baseUrl}createCharteringPbmsProperty`, data);
  }
  getOneCharteringPbmsPropertyById(data) {
    return this.http.post(`${environment.baseUrl}getOnecharteringPbmsPropertyById`, data);
  }
  updateCharteringPbmsPropertyById(user_id, data) {
    return this.http.put(`${environment.baseUrl}updateChateringPbmsPropertyById?id=` + user_id, data);
  }
  getOnlyOneCharteringPropertyData(data) {
    return this.http.post(`${environment.baseUrl}getOnlyOneChateringPropertyData`, data);
  }
  updateStatusCharteringPbmsPropertyById(data) {
    return this.http.post(`${environment.baseUrl}updateStatusCharteringPbmsPropertyById`, data);
  }
  createManagingCashflowsPbmsProperty(data) {
    return this.http.post(`${environment.baseUrl}createManagingCashflowsPbmsProperty`, data);
  }
  getOneManagingCashflowsByPbmsPropertyId(data) {
    return this.http.post(`${environment.baseUrl}getOneManagingCashflowsByPbmsPropertyId`, data);
  }
  updateMnanagingCashflowPbmsPropertyById(user_id, data) {
    return this.http.put(`${environment.baseUrl}updateMnanagingCashflowPbmsPropertyById?id=` + user_id, data);
  }  
  getAllFractionalShareListing() {
    return this.http.get(`${environment.baseUrl}getAllFractionalShareListing`);
  }
  showInterestFractionalListingEmail(data){    
    return this.http.post(`${environment.baseUrl}showInterestFractionalListingEmail`, data);
  }
  createBookPbmsProperty(data) {
    return this.http.post(`${environment.baseUrl}bookPbmsProperty`, data);
  }
  GetAllCountryData() {
    return this.http.get(`${environment.baseUrl}getAllCountry`);
  }
  GetAllStateData(data) {
    return this.http.post(`${environment.baseUrl}getStateByCountry`, data);
  }
  getAllCityData(data) {
    return this.http.post(`${environment.baseUrl}getCityByCountryAndState`, data);
  }
  redeemUserClaimKey(data) {
    return this.http.post(`${environment.baseUrl}redeemUserClaimKey`, data);
  }
  getOneUserClaimKeyHistory(data) {
    return this.http.post(`${environment.baseUrl}getOneUserClaimKeyHistory`, data);
  }
  googleTranslate(data) {
    // console.log("USER SERVICE data"+data);
    return this.http.post(`${environment.baseUrl}wepo-translate-string`, data);
  }
  // showInterest(user_id,interest_person_id){
  //   return this.http.get(`${environment.url}interest_user?user_id=${user_id}&interest_person_id=${interest_person_id}`)
  // }
  // getAllCategory() {
  //   return this.http.get( `${environment.baseUrl}getAllCategory`);
  // }
  // getCart() {
  //   return this.http.get(
  //     `https://anandtradingcompany.in/wp-json/cocart/v1/get-cart`,
  //     this.headers);
  // }
}