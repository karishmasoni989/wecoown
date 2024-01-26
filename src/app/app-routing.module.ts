import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  {path:"profile", component:ProfileComponent },
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
  {path:"member-detail/:member_id", component: MemberDetailComponent },
  {path:"user-profile", component: UserProfileTimelineComponent },
  {path:"create-ads", component: CreateAdsComponent },
  {path:"manage-ads", component: ManageAdsComponent },

  {path:"terms-of-use", component:TermsCondition2Component },
  {path:"california-privacy", component:CaliforniaPrivacyComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
