import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivatePolicyComponent } from './pages/private-policy/private-policy.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TermsCondition2Component } from './pages/terms-condition2/terms-condition2.component';
import { CaliforniaPrivacyComponent } from './pages/california-privacy/california-privacy.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { HttpClient } from '@angular/common/http';

// for social media login
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider } from "angular-6-social-login";
import { IAmBuyerComponent } from './pages/i-am-buyer/i-am-buyer.component';
import { IAmSellerComponent } from './pages/i-am-seller/i-am-seller.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ForgetUsernameComponent } from './pages/forget-username/forget-username.component';
import { SearchForBuyerComponent } from './pages/search-for-buyer/search-for-buyer.component';
import { SearchForSellerComponent } from './pages/search-for-seller/search-for-seller.component';
import { AllCategoryComponent } from './pages/all-category/all-category.component';
import { CategoryByNameComponent } from './pages/category-by-name/category-by-name.component';
import { ChatMessageComponent } from './pages/chat-message/chat-message.component';

// html editor
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { UserProfileTimelineComponent } from './pages/user-profile-timeline/user-profile-timeline.component';
//import {SocketioService} from '../app/service/socketio.service';
import { CreateAdsComponent } from './pages/create-ads/create-ads.component';
import { ManageAdsComponent } from './pages/manage-ads/manage-ads.component';
import { EditAdComponent } from './pages/edit-ad/edit-ad.component';
import { VendorListComponent } from './pages/vendor-list/vendor-list.component';
import { CreateListingComponent } from './pages/create-listing/create-listing.component';
import { AllPostingComponent } from './pages/all-posting/all-posting.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { EditListingComponent } from './pages/edit-listing/edit-listing.component';
// Import the library
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MyListingComponent } from './pages/my-listing/my-listing.component';
import { RealEstateSaleComponent } from './pages/listing/real-estate-sale/real-estate-sale.component';
import { AircraftSaleComponent } from './pages/listing/aircraft-sale/aircraft-sale.component';
import { YachtsSaleComponent } from './pages/listing/yachts-sale/yachts-sale.component';
import { SubCategoryListingComponent } from './pages/sub-category-listing/sub-category-listing.component';
import { CrowdFundingSaleComponent } from './pages/listing/crowd-funding-sale/crowd-funding-sale.component';
import { TranslateStringPipe } from './translate.pipe';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { UserSignupReportComponent } from './pages/user-signup-report/user-signup-report.component';
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import { PmbsComponent } from './pages/pmbs/pmbs.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PbmsActionsComponent } from './pages/pbms-actions/pbms-actions.component';
import { BookPbmsGroupPropertyComponent } from './pages/book-pbms-group-property/book-pbms-group-property.component';
// for FullCalendarModule
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { RentingPbmsGroupPropertyComponent } from './pages/renting-pbms-group-property/renting-pbms-group-property.component';
import { NgxPrintModule } from 'ngx-print';
import { UpdateRentingPbmsGroupComponent } from './pages/update-renting-pbms-group/update-renting-pbms-group.component';
import { CharteringPbmsGroupPropertyComponent } from './pages/chartering-pbms-group-property/chartering-pbms-group-property.component';
import { ManagingCashflowsPbmsGroupPropertyComponent } from './pages/managing-cashflows-pbms-group-property/managing-cashflows-pbms-group-property.component';
import { UpdateBookingPbmsPropertyComponent } from './pages/update-booking-pbms-property/update-booking-pbms-property.component';
import { UpdateCharteringPbmsPropertyComponent } from './pages/update-chartering-pbms-property/update-chartering-pbms-property.component';
import { FractionalShareListingComponent } from './pages/fractional-share-listing/fractional-share-listing.component';
import { BusinessPropertySaleComponent } from './pages/listing/business-property-sale/business-property-sale.component';
import { CarsSaleComponent } from './pages/listing/cars-sale/cars-sale.component';
import { ArtworksSaleComponent } from './pages/listing/artworks-sale/artworks-sale.component';
import { HorsesLivestockSaleComponent } from './pages/listing/horses-livestock-sale/horses-livestock-sale.component';
import { CryptoAssetsSaleComponent } from './pages/listing/crypto-assets-sale/crypto-assets-sale.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { MyVouchersComponent } from './pages/my-vouchers/my-vouchers.component';
import { CountrySplitNameShowPipe } from './pipes/country-split-name-show.pipe';
import { StateSplitNameShowPipe } from './pipes/state-split-name-show.pipe';
// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("702306723667171")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("AIzaSyDew-PBDv8WYmj4fYrCiqu-DYBCBARYzw8")
      },
      {
        id: LinkedinLoginProvider.PROVIDER_ID,
        provider: new LinkedinLoginProvider("789pw2zsit2a47")
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    PrivatePolicyComponent,
    TermsConditionComponent,
    OurServicesComponent,
    MembershipComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    TermsCondition2Component,
    CaliforniaPrivacyComponent,
    SignOutComponent,
    VerifyEmailComponent,
    IAmBuyerComponent,
    IAmSellerComponent,
    ForgetPasswordComponent,
    ForgetUsernameComponent,
    SearchForBuyerComponent,
    SearchForSellerComponent,
    AllCategoryComponent,
    CategoryByNameComponent,
    ChatMessageComponent,
    MemberDetailComponent, UserProfileTimelineComponent, CreateAdsComponent, ManageAdsComponent, EditAdComponent, VendorListComponent, CreateListingComponent, AllPostingComponent, PostDetailComponent, EditListingComponent, MyListingComponent, RealEstateSaleComponent, AircraftSaleComponent, YachtsSaleComponent, SubCategoryListingComponent, CrowdFundingSaleComponent, TranslateStringPipe, ProfileDetailComponent, UserSignupReportComponent, PmbsComponent,
    PbmsActionsComponent, BookPbmsGroupPropertyComponent, PbmsActionsComponent, RentingPbmsGroupPropertyComponent,
    UpdateRentingPbmsGroupComponent, CharteringPbmsGroupPropertyComponent,
    ManagingCashflowsPbmsGroupPropertyComponent, UpdateBookingPbmsPropertyComponent,
    UpdateCharteringPbmsPropertyComponent, FractionalShareListingComponent,
    BusinessPropertySaleComponent, CarsSaleComponent, ArtworksSaleComponent, HorsesLivestockSaleComponent, CryptoAssetsSaleComponent, MyVouchersComponent, CountrySplitNameShowPipe, StateSplitNameShowPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    AngularEditorModule,
    CarouselModule,
    NgxDatatableModule,
    NgSelectModule,
    FullCalendarModule,
    NgxPrintModule,
    DpDatePickerModule,
    Ng2DatetimePickerModule,
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
