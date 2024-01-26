import { Component, OnInit, Directive, EventEmitter, Output, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { SocketioService } from '../../service/socketio.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  chatArray: any;
  chatbox = false;
  getChatGroup: any;
  chatOfUser: any;
  chatOfChatIDD: any;
  currentChatID: any;
  userIDDDD: any;
  constructor(
    public UserService: UserService,
    private FormBuilder: FormBuilder,
    private HttpClient: HttpClient,
    private router: Router,
   // private socketService: SocketioService
  ) {
   // this.socketService.setupSocketConnection();
   }

  ngOnInit() {
    //this.getAllChat();
    //this.socketService.setupSocketConnection();
  }

  openchatBox(index) {
    // alert(index)  
    this.chatOfUser = this.getChatGroup[index];
    this.chatOfChatIDD = index
  }

  
}