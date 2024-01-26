import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate  } from '@angular/router';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';
import { HomeComponent } from './pages/home/home.component'
import { ContactComponent } from './pages/contact/contact.component';
import { PrivatePolicyComponent } from './pages/private-policy/private-policy.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { TermsCondition2Component } from './pages/terms-condition2/terms-condition2.component';
import { CaliforniaPrivacyComponent } from './pages/california-privacy/california-privacy.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { IAmBuyerComponent } from './pages/i-am-buyer/i-am-buyer.component';
import { IAmSellerComponent } from './pages/i-am-seller/i-am-seller.component';
import { ForgetUsernameComponent } from './pages/forget-username/forget-username.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { SearchForSellerComponent } from './pages/search-for-seller/search-for-seller.component';
import { SearchForBuyerComponent } from './pages/search-for-buyer/search-for-buyer.component';
import { AllCategoryComponent } from './pages/all-category/all-category.component';
import { CategoryByNameComponent } from './pages/category-by-name/category-by-name.component';
import { ChatMessageComponent } from './pages/chat-message/chat-message.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { UserProfileTimelineComponent } from './pages/user-profile-timeline/user-profile-timeline.component';
import { CreateAdsComponent } from './pages/create-ads/create-ads.component';
import { ManageAdsComponent } from './pages/manage-ads/manage-ads.component';
import { EditAdComponent } from './pages/edit-ad/edit-ad.component';
import { VendorListComponent } from './pages/vendor-list/vendor-list.component';
import { BookPostingComponent } from './pages/book-posting/book-posting.component';
import { UserSignupReportComponent } from './pages/user-signup-report/user-signup-report.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { PmbsComponent } from './pages/pmbs/pmbs.component';
import { MyPortfolioComponent } from './pages/my-portfolio/my-portfolio.component';
import { RealEstateSaleComponent } from './pages/listings/real-estate-sale/real-estate-sale.component';
import { AircraftSaleComponent } from './pages/listings/aircraft-sale/aircraft-sale.component';
import { CrowdFundingSaleComponent } from './pages/listings/crowd-funding-sale/crowd-funding-sale.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { YachtsSaleComponent } from './pages/listings/yachts-sale/yachts-sale.component';
import { BookPbmsGroupPropertyComponent } from './pages/book-pbms-group-property/book-pbms-group-property.component';
import { PbmsActionsComponent } from './pages/pbms-actions/pbms-actions.component';
import { RentingPbmsGroupPropertyComponent } from './pages/renting-pbms-group-property/renting-pbms-group-property.component';
import { UpdateRentingPbmsGroupComponent } from './pages/update-renting-pbms-group/update-renting-pbms-group.component';
import { CharteringPbmsGroupPropertyComponent } from './pages/chartering-pbms-group-property/chartering-pbms-group-property.component';
import { ManagingCashflowsPbmsGroupPropertyComponent } from './pages/managing-cashflows-pbms-group-property/managing-cashflows-pbms-group-property.component';
import { UpdateCharteringPbmsPropertyComponent } from './pages/update-chartering-pbms-property/update-chartering-pbms-property.component';
import { UpdateBookingPbmsPropertyComponent } from './pages/update-booking-pbms-property/update-booking-pbms-property.component';
import { FractionalShareListingComponent } from './pages/fractional-share-listing/fractional-share-listing.component';
import { BusinessPropertySaleComponent } from './pages/listings/business-property-sale/business-property-sale.component';
import { ArtworksSaleComponent } from './pages/listings/artworks-sale/artworks-sale.component';
import { CarsSaleComponent } from './pages/listings/cars-sale/cars-sale.component';
import { CryptoAssetsSaleComponent } from './pages/listings/crypto-assets-sale/crypto-assets-sale.component';
import { HorsesLivestockSaleComponent } from './pages/listings/horses-livestock-sale/horses-livestock-sale.component';
import { MyVouchersComponent } from './pages/my-vouchers/my-vouchers.component';
import { AllCohortComponent } from './pages/all-cohort/all-cohort.component';
import { ForumComponent } from './pages/forum/forum.component';
import { AllNotificationComponent } from './pages/all-notification/all-notification.component';


const routes: Routes = [
  {path:"", pathMatch:"full", component:HomeComponent },
  {path:"contact-us", component:ContactComponent },
  {path:"privacy-policy", component:PrivatePolicyComponent }, 
  {path:"terms-conditions", component:TermsConditionComponent },
  {path:"our-services", component:OurServicesComponent },
  {path:"membership", component:MembershipComponent },
  {path:"login", component:LoginComponent },
  {path:"register", component:RegisterComponent },
  {path:"dashboard", component:DashboardComponent },
  {path:"account-settings", component:ProfileComponent, canActivate: [AuthGuard] },
  {path:"sign-out", component:SignOutComponent },
  {path:"verifyEmailLink", component:VerifyEmailComponent },
  {path:"i-am-buyer", component:IAmBuyerComponent },
  {path:"i-am-seller", component:IAmSellerComponent },
  {path:"forgotPassword", component:ForgetPasswordComponent },
  {path:"forgotUsername", component:ForgetUsernameComponent },
  {path:"search-for-seller", component: SearchForSellerComponent},
  {path:"search-for-buyer", component:SearchForBuyerComponent },
  {path:"all-category", component:AllCategoryComponent },
  {path:"category-by-name/:category_name", component: CategoryByNameComponent },
  {path:"chat-message", component:ChatMessageComponent },
  {path:"member-detail", component: MemberDetailComponent },
  {path:"user-profile", component: UserProfileTimelineComponent },
  {path:"create-ads", component: CreateAdsComponent },
  {path:"manage-ads", component: ManageAdsComponent },
  {path:"edit-ad", component: EditAdComponent },
  {path:"vendor-list", component: VendorListComponent },
  {path:"book-posting", component: BookPostingComponent },
  {path:"user-signup-report", component: UserSignupReportComponent },
  {path:"profile-detail", component: ProfileDetailComponent },
  {path:"my-portfolio", component: MyPortfolioComponent },
  {path:"my-vouchers", component:MyVouchersComponent },
  {path:"pbms", component: PmbsComponent },
  {path:"listing-real-estate", component: RealEstateSaleComponent },
  {path:"listing-aircraft", component: AircraftSaleComponent },
  {path:"listing-yachts", component: YachtsSaleComponent },
  {path:"listing-crowdfunding", component: CrowdFundingSaleComponent },
  {path:"listing-business", component: BusinessPropertySaleComponent },
  {path:"listing-artworks", component: ArtworksSaleComponent },
  {path:"listing-cars-rv", component: CarsSaleComponent },
  {path:"listing-crypto-asset", component: CryptoAssetsSaleComponent },
  {path:"listing-horses-livestocks", component: HorsesLivestockSaleComponent },
  {path:"listing-detail/:id", component:PostDetailComponent },
  {path:"book-pbms-property", component:BookPbmsGroupPropertyComponent },
  {path:"rent-pbms-property", component:RentingPbmsGroupPropertyComponent },
  {path:"update-rent-pbms-property", component:UpdateRentingPbmsGroupComponent },
  {path:"update-booking-pbms-property", component:UpdateBookingPbmsPropertyComponent },
  {path:"update-chartering-pbms-property", component:UpdateCharteringPbmsPropertyComponent },
  {path:"chartering-pbms-property", component:CharteringPbmsGroupPropertyComponent },
  {path:"managing-cashflows-pbms-property", component:ManagingCashflowsPbmsGroupPropertyComponent },
  {path:"pbms-actions", component:PbmsActionsComponent },
  {path:"fractional-shares-listing", component:FractionalShareListingComponent },
  {path:"all-cohort", component:AllCohortComponent },
  {path:"forum", component:ForumComponent },
  {path:"all-notication", component:AllNotificationComponent },

  {path:"terms-of-use", component:TermsCondition2Component },
  {path:"california-privacy", component:CaliforniaPrivacyComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
