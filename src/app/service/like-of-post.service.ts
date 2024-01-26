import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LikeOfPostService {
  dataForForm: { post_id: any; user_id: any; action_type: string; };
  dataMediaForm: { post_id: any; user_id: any; post_media_id: any; action_type: string; };

  constructor(
    private UserService: UserService
  ) { }
  wishfav: any;
  userObject: any;
  toggleNamedColor(event, post_id, action_type) {
    console.log("eventtttttttttttttttttttttttttttttttttttttttttt : ",event.target.className);
    
    if (action_type === 1) {
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      if (userLocalId == null) {
        return false;
      }
      this.dataForForm = {
        post_id: post_id,
        user_id: parseData['id'],
        action_type: '1'
      }
      if (event.target.className == "btn width-Like UnlikeBtnn fa fa-thumbs-o-up") {
        console.log("iffffffffffffffffffffffff loginnnnnnnnnnnnnnnnn postttttttttttttttttttt likeeeeeeeeeeeeeeeeeee");        
        event.target.className = "btn width-Like fb-btn-like likeBUtton fa fa-thumbs-up";
        this.UserService.BuyerPostLikeComment(this.dataForForm).subscribe(result => {
          console.log("result of post likeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee : ", result);
          if (result['success'] == true) {
            console.log("success in post like : ", result['message']);           
          }         
        });
      }
      else if (event.target.className == "btn width-Like fb-btn-like likeBUtton fa fa-thumbs-up") {
        console.log("iffffffffffffffffffffffff loginnnnnnnnnnnnnnnnn postttttttttttttttttttt unnnnnnnnnnnnlikeeeeeeeeeeeeeeeeeee");
        event.target.className = "btn width-Like UnlikeBtnn fa fa-thumbs-o-up";
        this.UserService.UnlikePost(this.dataForForm).subscribe(result => {
          console.log("result of post UN-like : ", result);
          if (result['success'] == true) {
            console.log("success in post Un-like : ", result['message']);           
          }         
        });
      }
    }
  }

  toggledMediaColor(event, post_id, post_media_id, action_type) {
    console.log("eventtttttttttttttttttttttttttttttttttttttttttt : ",event.target.className);    
    if (action_type === 1) {
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      if (userLocalId == null) {
        return false;
      }
      this.dataMediaForm = {
        post_id: post_id,
        user_id: parseData['id'],
        post_media_id: post_media_id,
        action_type: '1'
      }
      if (event.target.className == "btn width-Like UnlikeBtnn fa fa-thumbs-o-up") {
        console.log("Mediaaaaaaaaaa loginnnnnnnnnnnnnnnnn postttttttttttttttttttt likeeeeeeeeeeeeeeeeeee");        
        event.target.className = "btn width-Like fb-btn-like likeBUtton fa fa-thumbs-up";
        this.UserService.BuyerPostLikeComment(this.dataMediaForm).subscribe(result => {
          console.log("result of media post likeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee : ", result);
          if (result['success'] == true) {
            console.log("success in media post like : ", result['message']);           
          }         
        });
      }
      else if (event.target.className == "btn width-Like fb-btn-like likeBUtton fa fa-thumbs-up") {
        console.log("Mediaaaaaaaaaaa loginnnnnnnnnnnnnnnnn postttttttttttttttttttt unnnnnnnnnnnnlikeeeeeeeeeeeeeeeeeee");
        event.target.className = "btn width-Like UnlikeBtnn fa fa-thumbs-o-up";
        this.UserService.UnlikeMediaPost(this.dataMediaForm).subscribe(result => {
          console.log("result of media post UN-like : ", result);
          if (result['success'] == true) {
            console.log("success in media post Un-like : ", result['message']);           
          }         
        });
      }
    }
  }
}
