import {
  Component,
  OnInit,
} from '@angular/core';
import * as $ from 'jquery';
import {
  UserService
} from '../../service/user.service';
import {
  FormBuilder,
} from '@angular/forms';
import {
  Router,
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import {
  SocketioService
} from '../../service/socketio.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  loading = false;
  userIDDDD: any;
  userName: any;
  noChat = false;
  listAllC = new Array();
  currentChatIDActive:any;
  listChatByChatID = new Array();
  currentPropertyName:any;
  activeReceiverID: any;
  allChatIDs = new Array();
  unreadCurrentchat = new Array();
  toShowUnreadBanner = false;
  selectedIndex = 0
  constructor(
    public UserService: UserService,
    private socketService: SocketioService,
  ) {
    this.socketService.customObservable.subscribe((res) => {
      this.myFunction(res)
    });

    this.socketService.customObservableAgain.subscribe((res) => {
      this.myFunctionMark(res)
    });
  }

  ngOnInit() {
    this.loading = true;
    this.listAllContacts();
  }

  currentDate(){
    var d = new Date();
    var hr = d.getHours();
    var min = d.getMinutes();
    var m;
    if (min < 10) {
        m = "0" + min;
    }else{
      m = min
    }
    var ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    return(hr + ":" + m + ampm)
  }

  myFunctionMark(res: any){
    console.log("here in myfunction mark", res)
    if(res['chat_id'] == this.currentChatIDActive && res['receiver_id'] == this.userIDDDD){
      for (const iterator of res['ids']) {
        $('#chat_message_' + iterator).prepend('<i class="fa fa-check-circle" aria-hidden="true"></i>')
      }
    }
  }


  myFunction(message:any)
  {
    var res = message['message'];
    var new_id = message['new_id']
    console.log("here is myfuntion")
    if(res['chat_id'] == this.currentChatIDActive){
      if(res['recevier_id'] == this.userIDDDD){
        console.log("here inside chat" ,res)
        $('#chat_box_'+ this.currentChatIDActive +' .chat-box').append('<div class="chat_foorloop"><li class="chat-left" id="chat_message_'+ res['_id'] +'" style="justify-content: flex-start;display:flex;flex:1;flex-direction:row;margin-bottom:40px"><div class="chat-text" style="padding: .4rem 1rem; border-radius: 4px; background:#ffffff; font-weight: 300; line-height:150%; position:relative;white-space: pre-wrap;">'+ res.message +'</div><div class="chat-hour" style="margin: 0 15px 0 0; padding: 0;font-size: 12px;display:flex;flex-direction:row;align-items:center;justify-content: center;">'+ this.currentDate() +'</div></li></div>');
        $('.chat-box').scrollTop($('.chat-box')[this.selectedIndex].scrollHeight);
        this.socketService.markMessageRead({
          ids: [res['_id']],
          chat_id: this.currentChatIDActive,
          receiver_id: this.activeReceiverID
        });
      }else if(res['sender_id'] == this.userIDDDD){
        console.log("here i come in sender id part", res['_id'], new_id)
        document.getElementById(new_id).id = "chat_message_" + res['_id'];

      }
    }else if(res['recevier_id'] == this.userIDDDD){
      var chatIDS = this.listAllC.map(e => {
        return e.chat_id
      })
      if(chatIDS.includes(res['chat_id'])){
        if($('#count_number_' + res['chat_id']).html()){
          var existing = $('#count_number_' + res['chat_id']).html()
          $('#count_number_' + res['chat_id']).html((+existing) + (+1));
        }else{
          $('#count_number_' + res['chat_id']).html(1)
        }
        $('#count_number_' + res['chat_id']).show();
      }else{
        //new number
      }
    }
  }

  openchatBox(index) {
    this.selectedIndex= index;
    this.currentChatIDActive = this.listAllC[index].chat_id;
    this.currentPropertyName = this.listAllC[index].property_name;

    if(this.listAllC[index].start_chat_user_id._id == this.userIDDDD){
      this.activeReceiverID = this.listAllC[index].receiver_user._id;
    }else if(this.listAllC[index].receiver_user._id == this.userIDDDD){
      this.activeReceiverID = this.listAllC[index].start_chat_user_id._id;
    }

    $('.contacts_all').removeClass('active_contact')
    $('#contact_number_' + index).addClass('active_contact')

    $('#count_number_' + this.currentChatIDActive).html('')
    $('#count_number_' + this.currentChatIDActive).hide();

    

    this.unreadCurrentchat = [];
    this.listChats();
  }

  listAllContacts() {
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    this.userIDDDD = parseData['id'];
    this.userName = parseData['username']

    if (this.userIDDDD) {
      let dataForForm = {
        user_id: parseData['id']
      }
      this.UserService.listAllContacts(dataForForm).subscribe(result => {
        if(result['success'] == true){
          this.listAllC = result['userContacts']
          if(this.listAllC.length == 0){
            this.noChat = true
          }else{
            this.currentChatIDActive = this.listAllC[0].chat_id;
            this.currentPropertyName = this.listAllC[0].property_name;

            if(this.listAllC[0].start_chat_user_id._id == this.userIDDDD){
              this.activeReceiverID = this.listAllC[0].receiver_user._id;
            }else if(this.listAllC[0].receiver_user._id == this.userIDDDD){
              this.activeReceiverID = this.listAllC[0].start_chat_user_id._id;
            }

            setTimeout(() => {
              $('#contact_number_0').addClass('active_contact')
            }, 2000)

            this.listChats();
          }
        }else{
          this.noChat = true
        }
      })
    }
  }

  listChats(){
    this.loading = true;
    // $('#loader').show();
    this.listChatByChatID = [];
    this.toShowUnreadBanner = false;
    
    this.allChatIDs = this.listAllC.map(e => {
      return e.chat_id
    })
      let dataForForm = {
        chat_id: this.allChatIDs
      }
      this.UserService.listAllChats(dataForForm).subscribe(result => {
        if(result['success'] == true){
          var chatIDChatArray = result['userChats'];

          var readChatids = [];
          for (const iterator of this.allChatIDs) {
            var groupedArray = chatIDChatArray.filter(e => {
              return e.chat_id == iterator;
            }) 

            var unreadMessges = groupedArray.filter(e => {
              if(e.chat_id == this.currentChatIDActive && e.read == false){
                if(this.userIDDDD == e.recevier_id._id){
                  readChatids.push(e._id);
                  this.toShowUnreadBanner = true;
                }
                this.unreadCurrentchat.push(e);
                console.log(this.unreadCurrentchat, "unreadCurrentchat")
              }else{
                return e.chat_id != this.currentChatIDActive && e.read == false && this.userIDDDD == e.recevier_id._id;
              }
            })

            console.log(groupedArray, "groupedArray")
            var message = groupedArray.filter(e => {
              return e.read == true;
            })
  
            console.log(unreadMessges, "unreadMessges")
            
  
            if(unreadMessges.length > 0){
              $('#count_number_' + iterator).html(unreadMessges.length)
              $('#count_number_' + iterator).show();
            }

            this.listChatByChatID.push({
              messages : message,
              chat_id: iterator
            })
          }

          if(readChatids.length > 0){
            this.socketService.markMessageRead({
              ids: readChatids,
              chat_id: this.currentChatIDActive,
              receiver_id: this.activeReceiverID
            });
          }
          console.log(this.listChatByChatID, "listChatByChatID")
          setTimeout(() => {
            $('.chat-container').hide();
            $('#chat_box_' + this.currentChatIDActive).show();
            $('.chat-box').scrollTop($('.chat-box')[this.selectedIndex].scrollHeight);
          }, 100)
        }else{
          console.log(result, "listChatByChatID")
        }
        this.loading = false;
        // $('#loader').hide();
      })
  }

  async submitReply() {
    console.log("submit replay")
    this.toShowUnreadBanner = false;
    var value = $('#reply_textarea_' + this.currentChatIDActive).val();
    console.log(value, "value")
    var newID = Math.random();
    if (value.trim()) {
      let dataForMessage = {
        sender_id: this.userIDDDD,
        recevier_id: this.activeReceiverID,
        chat_message: value,
        chat_id: this.currentChatIDActive,
        sender_name: this.userName,
        new_id: newID
      }

      this.socketService.sendMessage(dataForMessage);
      $('#reply_textarea_' + this.currentChatIDActive).val('');
      $('head').append('<style>.chat_foorloop li .chat-text:before{content: "";position: absolute; width: 0; height: 0; top: 10px; left: -20px; border: 10px solid; border-color: transparent #ffffff transparent transparent;}.chat_foorloop li.chat-right > .chat-text:before {right: -20px; border-color: transparent transparent transparent #ffffff;left: inherit; }</style>');
      $('#chat_box_'+ this.currentChatIDActive +' .chat-box').append('<div class="chat_foorloop"><li class="chat-right" id="'+
       newID +'" style="justify-content: flex-end;display:flex;flex:1;flex-direction:row;margin-bottom:10px">'+
       '<div class="chat-hour" style="margin: 0 15px 0 0; padding: 0;font-size: 12px;display:flex;flex-direction:row;align-items:center;justify-content: center;">'+
        this.currentDate() +'</div><div class="chat-text" style="white-space: pre-wrap;padding: .4rem 1rem; border-radius: 4px; background:#ffffff; font-weight: 300; line-height:150%; position:relative;">'+ 
        value +'</div></li></div>');
      $('.chat-box').scrollTop($('.chat-box')[this.selectedIndex].scrollHeight);
      // setTimeout(() => {
      //   this.listChats();
      // }, 1000)
    }else{
      //please provide text
    }
  }

}
