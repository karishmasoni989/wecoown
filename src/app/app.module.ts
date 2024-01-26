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
import {SocketioService} from '../app/service/socketio.service';
import { CreateAdsComponent } from './pages/create-ads/create-ads.component';
import { ManageAdsComponent } from './pages/manage-ads/manage-ads.component';

import { PushNotificationsModule } from 'ng-push'
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
    MemberDetailComponent, UserProfileTimelineComponent, CreateAdsComponent, ManageAdsComponent,   
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
    PushNotificationsModule 
  ],
  providers: [SocketioService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
