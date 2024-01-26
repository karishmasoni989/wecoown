import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CarouselModule } from 'ngx-owl-carousel-o';
import {DpDatePickerModule} from 'ng2-date-picker';
import { TranslateStringPipe } from './translate.pipe';

// for social media login
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

// import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider } from "angular-6-social-login";
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
import { IsLoggedInInterceptService } from './service/is-logged-in-intercept.service';
import { BookPostingComponent } from './pages/book-posting/book-posting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserSignupReportComponent } from './pages/user-signup-report/user-signup-report.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import { PushNotificationsModule } from 'ng-push';
import { PmbsComponent } from './pages/pmbs/pmbs.component';
import { MyPortfolioComponent } from './pages/my-portfolio/my-portfolio.component';
import { RealEstateSaleComponent } from './pages/listings/real-estate-sale/real-estate-sale.component';
import { AircraftSaleComponent } from './pages/listings/aircraft-sale/aircraft-sale.component';
import { YachtsSaleComponent } from './pages/listings/yachts-sale/yachts-sale.component';
import { CrowdFundingSaleComponent } from './pages/listings/crowd-funding-sale/crowd-funding-sale.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { BookPbmsGroupPropertyComponent } from './pages/book-pbms-group-property/book-pbms-group-property.component';
// for FullCalendarModule
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { PbmsActionsComponent } from './pages/pbms-actions/pbms-actions.component';
import { RentingPbmsGroupPropertyComponent } from './pages/renting-pbms-group-property/renting-pbms-group-property.component';
import { NgxPrintModule } from 'ngx-print';
import { UpdateRentingPbmsGroupComponent } from './pages/update-renting-pbms-group/update-renting-pbms-group.component';
import { CharteringPbmsGroupPropertyComponent } from './pages/chartering-pbms-group-property/chartering-pbms-group-property.component';
import { ManagingCashflowsPbmsGroupPropertyComponent } from './pages/managing-cashflows-pbms-group-property/managing-cashflows-pbms-group-property.component';
import { UpdateBookingPbmsPropertyComponent } from './pages/update-booking-pbms-property/update-booking-pbms-property.component';
import { UpdateCharteringPbmsPropertyComponent } from './pages/update-chartering-pbms-property/update-chartering-pbms-property.component';
import { FractionalShareListingComponent } from './pages/fractional-share-listing/fractional-share-listing.component';
import { BusinessPropertySaleComponent } from './pages/listings/business-property-sale/business-property-sale.component';
import { CarsSaleComponent } from './pages/listings/cars-sale/cars-sale.component';
import { ArtworksSaleComponent } from './pages/listings/artworks-sale/artworks-sale.component';
import { HorsesLivestockSaleComponent } from './pages/listings/horses-livestock-sale/horses-livestock-sale.component';
import { CryptoAssetsSaleComponent } from './pages/listings/crypto-assets-sale/crypto-assets-sale.component';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { MyVouchersComponent } from './pages/my-vouchers/my-vouchers.component';
import { CountrySplitNameShowPipe } from './pipes/country-split-name-show.pipe';
import { StateSplitNameShowPipe } from './pipes/state-split-name-show.pipe';
import { AllCohortComponent } from './pages/all-cohort/all-cohort.component';
import { ForumComponent } from './pages/forum/forum.component';
import { AllNotificationComponent } from './pages/all-notification/all-notification.component';
import {ImageCropperModule} from 'ng2-img-cropper';
// import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
// import { ShareIconsModule } from 'ngx-sharebuttons/icons';
// 720kb.socialshare
// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);
// Configs 
// export function getAuthServiceConfigs() {
//   let config = new AuthServiceConfig(
//     [
//       {
//         id: FacebookLoginProvider.PROVIDER_ID,
//         provider: new FacebookLoginProvider("702306723667171")
//       },
//       {
//         id: GoogleLoginProvider.PROVIDER_ID,
//         provider: new GoogleLoginProvider("AIzaSyDew-PBDv8WYmj4fYrCiqu-DYBCBARYzw8")
//       },
//       {
//         id: LinkedinLoginProvider.PROVIDER_ID,
//         provider: new LinkedinLoginProvider("789pw2zsit2a47")
//       }
//     ]
//   );
//   return config;
// }

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
    MemberDetailComponent, UserProfileTimelineComponent, CreateAdsComponent, ManageAdsComponent, EditAdComponent,TranslateStringPipe,
    VendorListComponent, BookPostingComponent, UserSignupReportComponent, ProfileDetailComponent,
    PmbsComponent, MyPortfolioComponent, RealEstateSaleComponent, AircraftSaleComponent, YachtsSaleComponent,
    CrowdFundingSaleComponent, PostDetailComponent, BookPbmsGroupPropertyComponent, PbmsActionsComponent,
    RentingPbmsGroupPropertyComponent, UpdateRentingPbmsGroupComponent, CharteringPbmsGroupPropertyComponent,
    ManagingCashflowsPbmsGroupPropertyComponent, UpdateBookingPbmsPropertyComponent, UpdateCharteringPbmsPropertyComponent, 
    FractionalShareListingComponent, BusinessPropertySaleComponent, CarsSaleComponent, ArtworksSaleComponent, 
    HorsesLivestockSaleComponent, CryptoAssetsSaleComponent, MyVouchersComponent, CountrySplitNameShowPipe, StateSplitNameShowPipe, AllCohortComponent, ForumComponent, AllNotificationComponent
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
    NgSelectModule,
    NgxDatatableModule,
    PushNotificationsModule,
    FullCalendarModule,
    NgxPrintModule,
    DpDatePickerModule,
    Ng2DatetimePickerModule,
    PickerModule,
    EmojiModule,
    ImageCropperModule
    // ShareButtonsModule.withConfig({
    //   debug: true
    // }),
    // ShareIconsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '666291937612-27oc2be739h3vvhulrtcojh1f4mo82d5.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('872736406624698')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  // providers: [
  //   // { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
  //   // { provide: HTTP_INTERCEPTORS, useClass: IsLoggedInInterceptService, multi: true }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
