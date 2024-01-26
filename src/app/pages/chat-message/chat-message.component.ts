import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketioService } from '../../service/socketio.service';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../../app.component';
import * as moment from 'moment';

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
  currentChatIDActive: any;
  listChatByChatID = new Array();
  currentPropertyName: any;
  activeReceiverID: any;
  allChatIDs = new Array();
  unreadCurrentchat = new Array();
  toShowUnreadBanner = false;
  selectedIndex = 0
  format: string;
  url: string | ArrayBuffer;
  finalDeleteArr: any[] = [];
  imgageOfCurrentUser: any;
  baseURLofAPi: string;
  UserFirstLastName: any;
  RecevierFirstLastName: any;
  imgageOfReceiverUser: string;
  getRightClickId: any;
  showSelectedMsgCount = 0;
  OneDeleteId = "";
  MessageUnreadCount = 5
  getNewMsgIds: any[] = [];
  UnreadMsgIdsAppend: any[] = [];
  getSearchMemberList: any[];
  selectedEmoji: any;
  @ViewChild('appendhotspot', { static: false, }) spot: ElementRef;
  openCreateEmojiPicker = false;
  openUpdateEmojiPicker = false;
  submitReplyCountObj = [];
  newUnreadyChatBox: any[];
  todayDate = moment().format('MM/DD/YYYY');
  getChatIdAndLastDate = [];
  constructor(
    public UserService: UserService,
    private socketService: SocketioService,
    private activatedRoute: ActivatedRoute,
    private AppComponent: AppComponent,
    private router: Router,
  ) {
    document.addEventListener('contextmenu', this.offRightClickOnMessageHandler.bind(this)); // bind on doc 
    this.socketService.customObservable.subscribe((res) => {
      this.myFunction(res)
    });

    this.socketService.customObservableAgain.subscribe((res) => {
      this.myFunctionMark(res)
    });
    // for delete msg check
    this.socketService.customObservableAgainDelete.subscribe((res) => {
      this.myFunctionDeleteMessage(res)
    });
    // for edit msg check
    this.socketService.customObservableAgainUpdate.subscribe((res) => {
      this.myFunctionEditMessage(res)
    });
    document.addEventListener('click', this.offClickHandlerTo.bind(this));
  }
  ionViewWillEnter() {
    this.startOfPage();
  }
  ngOnInit() {
    this.startOfPage();
  }
  startOfPage() {
    this.baseURLofAPi = environment.baseUrl;
    this.loading = true;
    this.listAllContacts();
  }
  offRightClickOnMessageHandler(event: any) {
    event.preventDefault();
    event.stopPropagation();
    ////console.log("Right click ", event);
    ////console.log("iffffffffff event.target.id", event.target.id);
    ////console.log("iffffffffff event.target.id", this.getNewMsgIds);
    ////console.log("iffffffffff event.target.id", typeof (this.getNewMsgIds));
    for (let kk = 0; kk < this.getNewMsgIds.length; kk++) {
      ////console.log(this.getNewMsgIds[kk]);
      if (event.target.id == this.getNewMsgIds[kk]) {
        ////console.log("iffffffffff");
        this.AppendMsgRightlick(event, this.getNewMsgIds, "chat-right");
        break;
      }
    }
    for (let kk = 0; kk < this.UnreadMsgIdsAppend.length; kk++) {
      ////console.log(this.UnreadMsgIdsAppend[kk]);
      if (event.target.id == this.UnreadMsgIdsAppend[kk]) {
        this.onRightClick(event);
        break;
      }
    }
  }
  offClickHandlerTo(event: any) {
    // ////console.log("event.path[0].classList : ",event.path[0].classList[0]);
    if (event.target.id == 'selectMsgDropdown' || (event.target.id == 'deleteMsgDropdown') || (event.target.id == 'editMesgDropdown')) {
      $('.showOptions').show();
    }
    else {
      // this.OneDeleteId = "";
      $('.showOptions').hide();
    }
    if (event.target.id != 'search-user-input') {
      $('.all-user-search-list').hide();
    }
    else {
      $('.all-user-search-list').show();
    }
    // clickOnOptions
  }
  currentDate() {
    var d = new Date();
    var hr = d.getHours();
    var min = d.getMinutes();
    var m;
    if (min < 10) {
      m = "0" + min;
    } else {
      m = min
    }
    var ampm = "am";
    if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    return (hr + ":" + m + ampm)
  }
  myFunctionMark(res: any) {
    ////console.log("here in myfunction mark", res)
    if (res['chat_id'] == this.currentChatIDActive && res['receiver_id'] == this.userIDDDD) {
      for (const iterator of res['ids']) {
        $('#chat_message_' + iterator).prepend('<i class="fa fa-check-circle" aria-hidden="true"></i>')
      }
    }
  }
  myFunctionDeleteMessage(res: any) {
    ////console.log("here in myfunction delete", res)
    if (res['chat_id'] == this.currentChatIDActive && res['recevier_id'] == this.userIDDDD) {
      for (const iterator of res['ids']) {
        $("#chat_message_" + iterator).hide();
      }
    }
  }
  myFunctionEditMessage(res: any) {
    ////console.log("here in myfunction edit", res)
    if (res['chat_id'] == this.currentChatIDActive && res['recevier_id'] == this.userIDDDD) {
      $('#chat_message_' + res['message_id'] + ' .chat-text').html(res['chat_message']);

      // for (const iterator of res['ids']) {
      //   $("#chat_message_" + iterator).hide();
      // }    
    }
  }
  myFunction(message: any) {
    //console.log("get message : ", message);
    //console.log("get message : ", this.listAllC[0]);
    let splitImageUrl = message['sender_image'].split('/');
    //console.log("splitImageUrl :",splitImageUrl);
    var res = message['message'];
    var new_id = message['new_id'];
    ////console.log("here is myfuntion")
    if (res['chat_id'] == this.currentChatIDActive) {
      if (res['recevier_id'] == this.userIDDDD) {
        ////console.log("here inside chat", res)
        $('head').append('<style>.chat_foorloop{display: flex;}.chat_foorloop li .chat-text:before{content: "";position: absolute; width: 0; height: 0; top: 10px; left: -20px; border: 10px solid; border-color: transparent #ec7834 transparent transparent;}.chat_foorloop li.chat-right > .chat-text:before {right: -20px; border-color: transparent transparent transparent #ec7834;left: inherit; }.display-None{display: none;}.checkSelectBoc{' +
          'margin-right: 20px;margin-top: 10px;}</style>');
        $('#chat_box_' + this.currentChatIDActive + ' .chat-box').append('<div class="chat_foorloop"><input type="checkbox" (click)="goToSelectedMsg(' + res['_id'] + ')" class="checkSelectBoc showSelectOptionsAll display-None"><li class="chat-left" id="chat_message_' + res['_id'] + '" style="justify-content: flex-start;display:flex;flex:1;flex-direction:row;margin-bottom:10px"><div class="chat-text" id="' + new_id + '" style="font-weight: 500;color:white;padding: .4rem .5rem; border-radius: 4px; background:#ec7834;  line-height:150%; position:relative;white-space: pre-wrap;">' + res.message + '</div><div class="chat-hour" style="margin: 0 0 0 15px; padding: 0;font-size: 12px;display:flex;flex-direction:row;align-items:center;justify-content: center;">' + this.currentDate() + '</div></li></div>');
        $('.chat-box').scrollTop($('.chat-box')[this.selectedIndex].scrollHeight);
        this.socketService.markMessageRead({
          ids: [res['_id']],
          chat_id: this.currentChatIDActive,
          receiver_id: this.activeReceiverID
        });
      } else if (res['sender_id'] == this.userIDDDD) {
        //console.log("new_id :", new_id);
        //console.log("res['_id'] :", res['_id']);

        ////console.log("here i come in sender id part", res['_id'], new_id)
        document.getElementById(new_id).id = "chat_message_" + res['_id'];
      }
      this.getNewMsgIds.push(new_id);
      this.UnreadMsgIdsAppend.push('chat_message_' + res['_id']);
    } else if (res['recevier_id'] == this.userIDDDD) {
      var chatIDS = this.listAllC.map(e => {
        return e.chat_id
      })
      if (chatIDS.includes(res['chat_id'])) {
        let getIndex = this.findArrayIndex(this.listAllC, 'chat_id', res['chat_id']);
        this.array_move(this.listAllC, getIndex, 0)
        if ($('#count_number_' + res['chat_id']).html()) {
          var existing = $('#count_number_' + res['chat_id']).html()
          $('#count_number_' + res['chat_id']).html((+existing) + (+1));
        } else {
          $('#count_number_' + res['chat_id']).html(1)
          // for check unread chatid notification count
          let getUnreadChat = localStorage.getItem('unreadMsg');
          let getUnreadLocalChat = JSON.parse(getUnreadChat);
          ////console.log("getUnreadLocalChat", getUnreadLocalChat);
          if (getUnreadChat != null && getUnreadLocalChat.length != 0) {
            ////console.log("nulll");
            let findIndexOfAdd;
            for (let cc = 0; cc < getUnreadLocalChat.length; cc++) {
              if (getUnreadLocalChat[cc] == res['chat_id']) {
                findIndexOfAdd = cc;
                this.AppComponent.MessageUnreadCount = this.AppComponent.MessageUnreadCount + 1;
              }
              break;
            }
          }
          else {
            ////console.log("pure esle");
            let testAA = [];
            testAA.push(res['chat_id'])
            this.AppComponent.MessageUnreadCount = this.AppComponent.MessageUnreadCount + 1;
            localStorage.setItem('unreadMsg', JSON.stringify(testAA));
          }
          // this.ChangeUnreadMsgCount(res['chat_id'], 1, 'plus');
        }
        $('#count_number_' + res['chat_id']).show();
      } else {
        // add new chat box
        let splitName = message['sender_name'].split(' ');
        let splitImageUrl = message['sender_image'].split('/');
        //console.log("splitImageUrl :",splitImageUrl);        
        let setNewChatDataToContactList = {
          chat_id: res['chat_id'],
          created_at: res['created_at'],
          created_by: res['created_by'],
          receiver_user: { _id: this.userIDDDD },
          start_chat_user_id: {
            _id: res['sender_id'],
            firstname: splitName[0],
            lastname: splitName[1],
            profile_pic: [{
              orgName: splitImageUrl[4],
              src: splitImageUrl[3] + '/' + splitImageUrl[4]
            }]
          },
          status: res['status']
        }
        this.listAllC.unshift(setNewChatDataToContactList);
        setTimeout(() => {
          $('#count_number_' + res['chat_id']).html(1);
          $('#count_number_' + res['chat_id']).show();
        }, 1000)
        // this.listAllC.push();
        // console.log("else part", this.listAllC[0]);
      }
    }
  }
  // for check Unread ChatId is active
  ChangeUnreadMsgCount(chat_id, getTime, operation) {
    ////console.log(operation);

    let getUnreadChat = localStorage.getItem('unreadMsg');
    let getUnreadLocalChat = JSON.parse(getUnreadChat);
    ////console.log("getUnreadLocalChat", getUnreadLocalChat);
    if (getUnreadChat != null) {
      if (getUnreadChat.length != 0) {
        let findIndexOfAdd;
        if (operation === 'minus') {
          ////console.log("mmmmmmmmmmmmmm");

          for (let cc = 0; cc < getUnreadLocalChat.length; cc++) {
            if (getUnreadLocalChat[cc] == chat_id) {
              findIndexOfAdd = cc;
              if (getTime === 2) {
                setTimeout(() => {
                  if (this.AppComponent.MessageUnreadCount != 0) {
                    this.AppComponent.MessageUnreadCount = this.AppComponent.MessageUnreadCount - 1;
                  }
                }, 2000)
              } else {
                if (this.AppComponent.MessageUnreadCount != 0) {
                  this.AppComponent.MessageUnreadCount = this.AppComponent.MessageUnreadCount - 1;
                }
              }
              break;
            }
          }
          getUnreadLocalChat.splice(findIndexOfAdd, 1);
          localStorage.setItem('unreadMsg', JSON.stringify(getUnreadLocalChat))
        } else {
          ////console.log("essssssssss");
          ////console.log("getUnreadLocalChat", getUnreadLocalChat);
          for (let cc = 0; cc < getUnreadLocalChat.length; cc++) {
            if (getUnreadLocalChat[cc] == chat_id) {
              ////console.log("cc");
              findIndexOfAdd = cc;
              if (getTime === 2) {
                ////console.log("iff for");

                setTimeout(() => {
                  this.AppComponent.MessageUnreadCount = this.AppComponent.MessageUnreadCount + 1;
                }, 2000)
              } else {
                ////console.log("for else");

                this.AppComponent.MessageUnreadCount = this.AppComponent.MessageUnreadCount + 1;
              }
              break;
            }
          }
          // getUnreadLocalChat.push(chat_id);
          // localStorage.setItem('unreadMsg',JSON.stringify(getUnreadLocalChat))
        }
      }
    }
  }
  // for chat contact move
  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  };
  findArrayIndex(array, attree, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][attree] == value) {
        return i;
      }
    }
    return -1;
  }
  openchatBox(index) {
    // for show selected
    this.finalDeleteArr = [];
    this.showSelectedMsgCount = 0;
    $('input:checkbox').removeAttr('checked');
    $("li").removeClass("Msgselected");
    $('.showSelectOptionsAll').hide();
    // for show sleetcted
    this.selectedIndex = index;
    this.currentChatIDActive = this.listAllC[index].chat_id;
    localStorage.setItem("CurrentChatActive", JSON.stringify(this.currentChatIDActive));
    this.currentPropertyName = this.listAllC[index].property_name;

    if (this.listAllC[index].start_chat_user_id._id == this.userIDDDD) {
      this.activeReceiverID = this.listAllC[index].receiver_user._id;
      this.RecevierFirstLastName = this.listAllC[index].receiver_user['firstname'] + ' ' + this.listAllC[index].receiver_user['lastname'];
      if (this.listAllC[index].receiver_user['profile_pic'].length != 0) {
        if (this.listAllC[index].receiver_user['profile_pic'][0].src != undefined) {
          this.imgageOfReceiverUser = this.baseURLofAPi + this.listAllC[index].receiver_user['profile_pic'][0].src;
        }
        else {
          this.imgageOfReceiverUser = '/assets/images/user1.png';
        }
      }
      else {
        this.imgageOfReceiverUser = '/assets/images/user1.png';
      }
    } else if (this.listAllC[index].receiver_user._id == this.userIDDDD) {
      this.activeReceiverID = this.listAllC[index].start_chat_user_id._id;
      this.RecevierFirstLastName = this.listAllC[index].start_chat_user_id['firstname'] + ' ' + this.listAllC[index].start_chat_user_id['lastname'];
      if (this.listAllC[index].start_chat_user_id['profile_pic'].length != 0) {
        if (this.listAllC[index].start_chat_user_id['profile_pic'][0].src != undefined) {
          this.imgageOfReceiverUser = this.baseURLofAPi + this.listAllC[index].start_chat_user_id['profile_pic'][0].src;
        }
        else {
          this.imgageOfReceiverUser = '/assets/images/user1.png';
        }
      }
      else {
        this.imgageOfReceiverUser = '/assets/images/user1.png';
      }
    }
    // this.array_move(this.listAllC, index, 0)
    // for check unread chatid notification count
    let getUnreadChat = localStorage.getItem('unreadMsg');
    let getUnreadLocalChat = JSON.parse(getUnreadChat);
    ////console.log("getUnreadLocalChat", getUnreadLocalChat);
    if (getUnreadChat != null) {
      let findIndexOfAdd;
      if (getUnreadChat.length != 0) {
        for (let cc = 0; cc < getUnreadLocalChat.length; cc++) {
          if (getUnreadLocalChat[cc] == this.currentChatIDActive) {
            findIndexOfAdd = cc;
            if (this.AppComponent.MessageUnreadCount != 0) {
              this.AppComponent.MessageUnreadCount = this.AppComponent.MessageUnreadCount - 1;
            }
            break;
          }
        }
        getUnreadLocalChat.splice(findIndexOfAdd, 1);
        localStorage.setItem('unreadMsg', JSON.stringify(getUnreadLocalChat));
      }
    }
    // this.ChangeUnreadMsgCount(this.currentChatIDActive, 1, 'minus');
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
    this.UserFirstLastName = parseData['firstname'] + ' ' + parseData['lastname'];
    if (parseData['profile_pic'].length != 0) {
      //////console.log("profile imageeeeeeeeee");
      if (parseData['profile_pic'][0].src != undefined) {
        //////console.log("innerrr");
        this.imgageOfCurrentUser = this.baseURLofAPi + parseData['profile_pic'][0].src;
      }
      else {
        this.imgageOfCurrentUser = '/assets/images/user1.png';
      }
      //////console.log("this.imgageOfUser", this.imgageOfUser);
    }
    else {
      this.imgageOfCurrentUser = '/assets/images/user1.png';
    }

    if (this.userIDDDD) {
      let dataForForm = {
        user_id: parseData['id']
      }
      this.UserService.listAllContacts(dataForForm).subscribe(result => {
        this.loading = false;
        if (result['success'] == true) {
          this.listAllC = result['userContacts']
          if (this.listAllC.length == 0) {
            this.noChat = true
          }
          else {
            let getLoginToken = this.activatedRoute.snapshot.queryParamMap.get('FromOther');
            ////console.log("getLoginToken", getLoginToken);
            if (getLoginToken != null) {
              let getcheckLocal = localStorage.getItem('CurrentChatToBeOpen');
              let parseChatId = JSON.parse(getcheckLocal);
              if (getcheckLocal != null) {
                this.currentChatIDActive = parseChatId['chat_id'];
                //  localStorage.setItem("CurrentChatActive",JSON.stringify(this.currentChatIDActive));
                for (let ijk = 0; ijk < this.listAllC.length; ijk++) {
                  if (this.listAllC[ijk].receiver_user._id == parseChatId['recevier_id']) {
                    this.activeReceiverID = this.listAllC[ijk].receiver_user._id;
                    this.RecevierFirstLastName = this.listAllC[ijk].receiver_user['firstname'] + ' ' + this.listAllC[ijk].receiver_user['lastname'];
                    if (this.listAllC[ijk].receiver_user['profile_pic'].length != 0) {
                      if (this.listAllC[ijk].receiver_user['profile_pic'][0].src != undefined) {
                        this.imgageOfReceiverUser = this.baseURLofAPi + this.listAllC[ijk].receiver_user['profile_pic'][0].src;
                      }
                      else {
                        this.imgageOfReceiverUser = '/assets/images/user1.png';
                      }
                    }
                    else {
                      this.imgageOfReceiverUser = '/assets/images/user1.png';
                    }
                    setTimeout(() => {
                      $('#contact_number_' + ijk.toString()).addClass('active_contact')
                    }, 1000)
                    break;
                  }
                }
              }
              else {
                this.currentChatIDActive = this.listAllC[0].chat_id;
                this.activeReceiverID = this.listAllC[0].receiver_user._id;
                this.RecevierFirstLastName = this.listAllC[0].receiver_user['firstname'] + ' ' + this.listAllC[0].receiver_user['lastname'];
                if (this.listAllC[0].receiver_user['profile_pic'].length != 0) {
                  if (this.listAllC[0].receiver_user['profile_pic'][0].src != undefined) {
                    this.imgageOfReceiverUser = this.baseURLofAPi + this.listAllC[0].receiver_user['profile_pic'][0].src;
                  }
                  else {
                    this.imgageOfReceiverUser = '/assets/images/user1.png';
                  }
                }
                else {
                  this.imgageOfReceiverUser = '/assets/images/user1.png';
                }
                setTimeout(() => {
                  $('#contact_number_0').addClass('active_contact')
                }, 2000)
              }
            }
            else {
              this.currentChatIDActive = this.listAllC[0].chat_id;
              // for recevier photo and name
              if (this.listAllC[0].start_chat_user_id._id == this.userIDDDD) {
                this.activeReceiverID = this.listAllC[0].receiver_user._id;
                this.RecevierFirstLastName = this.listAllC[0].receiver_user['firstname'] + ' ' + this.listAllC[0].receiver_user['lastname'];
                if (this.listAllC[0].receiver_user['profile_pic'].length != 0) {
                  if (this.listAllC[0].receiver_user['profile_pic'][0].src != undefined) {
                    this.imgageOfReceiverUser = this.baseURLofAPi + this.listAllC[0].receiver_user['profile_pic'][0].src;
                  }
                  else {
                    this.imgageOfReceiverUser = '/assets/images/user1.png';
                  }
                }
                else {
                  this.imgageOfReceiverUser = '/assets/images/user1.png';
                }
              } else if (this.listAllC[0].receiver_user._id == this.userIDDDD) {
                this.activeReceiverID = this.listAllC[0].start_chat_user_id._id;
                this.RecevierFirstLastName = this.listAllC[0].start_chat_user_id['firstname'] + ' ' + this.listAllC[0].start_chat_user_id['lastname'];
                if (this.listAllC[0].start_chat_user_id['profile_pic'].length != 0) {
                  if (this.listAllC[0].start_chat_user_id['profile_pic'][0].src != undefined) {
                    this.imgageOfReceiverUser = this.baseURLofAPi + this.listAllC[0].start_chat_user_id['profile_pic'][0].src;
                  }
                  else {
                    this.imgageOfReceiverUser = '/assets/images/user1.png';
                  }
                }
                else {
                  this.imgageOfReceiverUser = '/assets/images/user1.png';
                }
              }
              setTimeout(() => {
                $('#contact_number_0').addClass('active_contact')
              }, 2000)
            }
            // for check Unread ChatId is active
            // this.ChangeUnreadMsgCount(this.currentChatIDActive, 2, 'minus');
            let getUnreadChat = localStorage.getItem('unreadMsg');
            let getUnreadLocalChat = JSON.parse(getUnreadChat);
            if (getUnreadChat != null) {
              let findIndexOfAdd;
              if (getUnreadChat.length != 0) {
                for (let cc = 0; cc < getUnreadLocalChat.length; cc++) {
                  if (getUnreadLocalChat[cc] == this.currentChatIDActive) {
                    setTimeout(() => {
                      if (this.AppComponent.MessageUnreadCount != 0) {
                        this.AppComponent.MessageUnreadCount = this.AppComponent.MessageUnreadCount - 1;
                      }
                    }, 2000)
                    break;
                  }
                }
                getUnreadLocalChat.splice(findIndexOfAdd, 1);
                localStorage.setItem('unreadMsg', JSON.stringify(getUnreadLocalChat));
              }
            }
            this.listChats();
          }
        } else {
          this.noChat = true
        }
      })
    }
  }
  listChats() {
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
      if (result['success'] == true) {
        var chatIDChatArray = result['userChats'];

        var readChatids = [];
        for (const iterator of this.allChatIDs) {
          var groupedArray = chatIDChatArray.filter(e => {
            return e.chat_id == iterator;
          })
          var unreadMessges = groupedArray.filter(e => {
            if (e.chat_id == this.currentChatIDActive && e.read == false) {
              if (this.userIDDDD == e.recevier_id._id) {
                readChatids.push(e._id);
                this.toShowUnreadBanner = true;
              }
              this.unreadCurrentchat.push(e);
            } else {
              return e.chat_id != this.currentChatIDActive && e.read == false && this.userIDDDD == e.recevier_id._id;
            }
          })

          //console.log(groupedArray, "groupedArray");
          var message = groupedArray.filter(e => {
            return e.read == true;
          })
          if (this.unreadCurrentchat.length != 0) {
            // for group unread messages by date
            // this gives an object with dates as keys
            let groups = this.unreadCurrentchat.reduce((groups, game) => {
              // //console.log("game.created_at : ",game.created_at);
              if (game.created_at != undefined) {
                let getdate = game.created_at.split('T')[0];
                let date = moment(getdate).format('MM/DD/YYYY')
                if (!groups[date]) {
                  groups[date] = [];
                }
                groups[date].push(game);
              }
              return groups;
            }, {});

            // Edit: to add it in the array format instead
            this.newUnreadyChatBox = Object.keys(groups).map((date) => {
              return {
                date,
                messages: groups[date]
              };
            });
          }
          console.log(this.newUnreadyChatBox, "newUnreadyChatBox")
          //console.log(this.unreadCurrentchat, "unreadCurrentchat")
          //// //console.log(unreadMessges, "unreadMessges")
          if (unreadMessges.length > 0) {
            $('#count_number_' + iterator).html(unreadMessges.length)
            $('#count_number_' + iterator).show();
          }
          // for group messages by date
          // this gives an object with dates as keys
          let groups = message.reduce((groups, game) => {
            let getdate = game.created_at.split('T')[0];
            let date = moment(getdate).format('MM/DD/YYYY')
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(game);
            return groups;
          }, {});

          // Edit: to add it in the array format instead
          let groupArrays = Object.keys(groups).map((date) => {
            return {
              date,
              messages: groups[date]
            };
          });
          // //console.log(groupArrays, "groupArrays");
          // //console.log(message, " : message");
          this.listChatByChatID.push({
            messages: message,
            allMessageGroupBydate: groupArrays,
            chat_id: iterator
          })
        }

        if (readChatids.length > 0) {
          this.socketService.markMessageRead({
            ids: readChatids,
            chat_id: this.currentChatIDActive,
            receiver_id: this.activeReceiverID
          });
        }
        //console.log(this.listChatByChatID, "listChatByChatID")
        setTimeout(() => {
          $('.chat-container').hide();
          $('#chat_box_' + this.currentChatIDActive).show();
          $('.chat-box').scrollTop($('.chat-box')[this.selectedIndex].scrollHeight);
        }, 100)
      } else {
        ////console.log(result, "listChatByChatID")
      }
      // $('#loader').hide();
    })
  }
  async submitReply() {
    ////console.log("submit replay");
    // let getCurrentChatDateText = $('#chat_box_'+this.currentChatIDActive+' .date-line').text().split('/');
    // console.log("getCurrentChatDateText :",getCurrentChatDateText);
    // let getLength = getCurrentChatDateText.length;
    // console.log("length : ",getLength);    
    // if (getLength >= 3) {
    //   let getLastElementAndSplit = getCurrentChatDateText[getLength-3];
    //   let properLastDay = getLastElementAndSplit.charAt(4)+getLastElementAndSplit.charAt(5)
    //   let combinedate = getCurrentChatDateText[getLength-1]+'/'+getCurrentChatDateText[getLength-2]+'/'+properLastDay;
    // console.log("combinedate :",combinedate);
    // }
    let checkPreviousCC = true;
    for (let abc = 0; abc < this.submitReplyCountObj.length; abc++) {
      if (this.submitReplyCountObj[abc].chat_id == this.currentChatIDActive) {
        this.submitReplyCountObj[abc].count = 1
        checkPreviousCC = false;
        break;
      }
    }
    if (checkPreviousCC == true) {
      this.submitReplyCountObj.push({
        chat_id: this.currentChatIDActive,
        count: 0
      });
    }
    let userLocalId = localStorage.getItem('userInfo');
    let parseData = JSON.parse(userLocalId);
    this.UserFirstLastName = parseData['firstname'] + ' ' + parseData['lastname'];
    this.toShowUnreadBanner = false;
    var value = $('#reply_textarea_' + this.currentChatIDActive).val();
    ////console.log(value, "value")
    var newID = Math.floor((Math.random() * 1000000) + 1);
    if (value.trim() != "") {
      let dataForMessage = {
        sender_id: this.userIDDDD,
        recevier_id: this.activeReceiverID,
        chat_message: value,
        chat_id: this.currentChatIDActive,
        sender_name: this.UserFirstLastName,
        new_id: newID,
        sender_image: this.imgageOfCurrentUser
      }
      this.socketService.sendMessage(dataForMessage);
      // check and append date line above message
      for (let abc = 0; abc < this.submitReplyCountObj.length; abc++) {
        if (this.submitReplyCountObj[abc].chat_id == this.currentChatIDActive) {

          // if (this.submitReplyCountObj[abc].count == 0) {
          //   let getLengthOfLastEle = this.listChatByChatID[this.selectedIndex].allMessageGroupBydate.length;
          // console.log("getLengthOfLastEle :", getLengthOfLastEle);
          //   let getLastElementDate = this.listChatByChatID[this.selectedIndex].allMessageGroupBydate[getLengthOfLastEle - 1].date;
          // console.log("getLastElementDate :", getLastElementDate);
          //   if (moment().format('MM/DD/YYYY') != getLastElementDate) {
          //     $('#chat_box_' + this.currentChatIDActive + ' .chat-box').append(`<div style="color: #ec7834; text-align: center; font-size: 14px; margin-bottom: 10px; display: flex;">
          //       <hr style="margin: 0; width: 45%; border: 1px solid;"><span style="margin-top: -10px; padding: 0px 13px;" class="date-line">`+ moment().format('MM/DD/YYYY') + `</span>
          //       <hr style="margin: 0; width: 45%; border: 1px solid;">
          //     </div>`);
          //   }
          //   this.submitReplyCountObj[abc].count = 1
          //   break;
          // }
        }
      }
      $('#reply_textarea_' + this.currentChatIDActive).val('');
      $('head').append('<style>.chat_foorloop{display: flex;}.chat_foorloop li .chat-text:before{content: "";position: absolute; width: 0; height: 0; top: 10px; left: -20px; border: 10px solid; border-color: transparent #ec7834 transparent transparent;}.chat_foorloop li.chat-right > .chat-text:before {right: -20px; border-color: transparent transparent transparent #ec7834;left: inherit; }.display-None{display: none;}.checkSelectBoc{' +
        'margin-right: 20px;margin-top: 10px;}</style>');
      $('#chat_box_' + this.currentChatIDActive + ' .chat-box').append('<div class="chat_foorloop"><input type="checkbox" class="checkSelectBoc showSelectOptionsAll display-None" (click)="goToSelectedMsg(' + newID + ')"><li class="chat-right" id="' +
        newID + '" style="justify-content: flex-end;display:flex;flex:1;flex-direction:row;margin-bottom:10px">' +
        '<div class="chat-hour" style="margin: 0 15px 0 0; padding: 0;font-size: 12px;display:flex;flex-direction:row;align-items:center;justify-content: center;">' +
        this.currentDate() + '</div><div class="chat-text" id="' + newID + '" style="font-weight: 500;color:white;white-space: pre-wrap;padding: .4rem .5rem; border-radius: 4px; background:#ec7834;  line-height:150%; position:relative;">' +
        value + '</div></li></div>');
      ////console.log("hjbbbb;;;;;;;;;;;;;;;", this.listAllC);
      ////console.log("hjbbbb;;;;;;;;;;;;;;;", this.currentChatIDActive);
      this.getNewMsgIds.push(newID);
      let getIndex = this.findArrayIndex(this.listAllC, 'chat_id', this.currentChatIDActive);
      this.array_move(this.listAllC, getIndex, 0);
      $('.chat-box').scrollTop($('.chat-box')[this.selectedIndex].scrollHeight);
      // setTimeout(() => {
      //   this.listChats();
      // }, 1000)
    } else {
      //please provide text
    }
  }
  // $('#registered_participants').on('click', '.new_participant_form', function() {});
  submitUpdateMsg() {
    ////console.log("submit update msg")
    // this.toShowUnreadBanner = false;
    var value = $('#update_reply_textarea_' + this.currentChatIDActive).val();
    ////console.log(value, "value")
    var newID = Math.random();
    if (value.trim() != '') {
      if (this.OneDeleteId != "") {
        let dataForForm = {
          sender_id: this.userIDDDD,
          recevier_id: this.activeReceiverID,
          chat_id: this.currentChatIDActive,
          message_id: [this.OneDeleteId],
          chat_message: value,
        }
        this.socketService.editChatMessage(dataForForm);
        $('#update_reply_textarea_' + this.currentChatIDActive).val('');
        let getCurrentMsgId = this.OneDeleteId;
        $("#chat_message_" + getCurrentMsgId).removeClass("Msgselected");
        $('#chat_message_' + getCurrentMsgId + ' .chat-text').html(value);
        $('.chat-box').scrollTop($('.chat-box')[this.selectedIndex].scrollHeight);
        this.OneDeleteId = "";
        $('.CreateMessageText').show();
        $('.editMessageText').hide();
        $('.deleteMsg').hide();
        $('.editMsg').hide();
        this.openCreateEmojiPicker = false;
        this.openUpdateEmojiPicker = false;
        // setTimeout(() => {
        //   this.listChats();
        // }, 1000)
      }
    } else {
      //please provide text
    }
  }
  GotoUpdateText() {
    $('.CreateMessageText').hide();
    $('.editMessageText').show();
    let getPreText = $('#chat_message_' + this.OneDeleteId + ' .chat-text').html();
    if (getPreText.search('<img') === -1) {
      $('#update_reply_textarea_' + this.currentChatIDActive).val(getPreText);
      $('#update_reply_textarea_' + this.currentChatIDActive).focus();
    }
  }
  onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }
  onRightClick(e) {
    console.log("event : ", e);
    let windowSizee;
    var WindowsSize = function () {
      var h = $(window).height(),
        w = $(window).width();
      $("#winSize").html("<p>Width: " + w + "<br>Height: " + h + "</p>");
      console.log("width : ", w);
      windowSizee = w;
    };
    $(document).ready(WindowsSize);
    $(window).resize(WindowsSize);
    if (windowSizee >= 678) {
      $(".showOptions").css({ 'top': e.pageY - 180, 'left': e.offsetX });
    } else {
      $(".showOptions").css({ 'top': e.pageY - 310, 'left': e.offsetX });
    }
    e.preventDefault();
    e.stopPropagation();
    ////console.log(e);
    this.MessageSelect(e.target.id, e.target.className, e)
  }
  AppendMsgRightlick(e, getId, getClass) {
    //console.log("event in append : ", e);
    ////console.log("getId append : ", getId);
    ////console.log("getClass in append : ", getClass);
    ////console.log("paresnt id : ", ($("#" + getId).parent().attr('id')));
    let getParentId = $("#" + getId).parent().attr('id');
    if ($("#" + getId).hasClass('chat-left')) {
      $(".showOptions").css({ 'top': e.pageY - 180, 'left': 60 });
    } else {
      $(".showOptions").css({ 'top': e.pageY - 180, 'left': 580 });
    }
    e.preventDefault();
    e.stopPropagation();
    ////console.log(e);
    this.MessageSelect(getParentId, getClass, e)
  }
  MsgRightlick(e, getId, getClass) {
    if ($("#chat_message_" + getId).hasClass('chat-left')) {
      $(".showOptions").css({ 'top': e.pageY - 180, 'left': 60 });
    } else {
      $(".showOptions").css({ 'top': e.pageY - 180, 'left': 580 });
    }
    e.preventDefault();
    e.stopPropagation();
    ////console.log(e);
    this.MessageSelect('chat_message_' + getId, getClass, e)
  }
  MessageSelect(getId, cl, fullevent) {
    this.getRightClickId = getId;
    ////console.log(fullevent);
    // alert(getId + "           " +cl)
    // getEvent.preventDefault();
    // getEvent.stopPropagation();
    // let getId = getEvent.target.id;
    // let cl = getEvent.target.className;
    // ////console.log(cl);
    var id = getId.replace('chat_message_', '');
    // if (cl == 'chat-right' || cl == 'chat-left') {
    //   // $("#" + getId).addClass("showPopup");
    // } 
    if ($("#" + getId).hasClass('chat-right') || $("#" + getId).hasClass('chat-left')) {
      this.OneDeleteId = id;
    }
    // else if (cl == 'chat-right showPopup' || cl == 'chat-left showPopup') {
    //   $("#" + getId).removeClass("showPopup");
    //   let indexOfDD = this.finalDeleteArr.indexOf(id);
    //   this.finalDeleteArr.splice(indexOfDD, 1);
    // }
    // alert(this.OneDeleteId)
    if (this.OneDeleteId != "") {
      $('.deleteMsg').show();
      if ($("#" + getId).hasClass('chat-right')) {
        let getPreText = $('#' + getId + ' .chat-text').html();
        if (getPreText.search('<img') === -1) {
          $('.editMsg').show();
        }
        else {
          $('.editMsg').hide();
        }
      } else {
        $('.editMsg').hide();
      }
      $('.showOptions').show();
    } else {
      $('.deleteMsg').hide();
      $('.editMsg').hide();
      $('.showOptions').hide();
    }
  }
  submitDeleteMessage(checkType) {
    let dataForForm = {};
    if (checkType == 1) {
      dataForForm = {
        sender_id: this.userIDDDD,
        recevier_id: this.activeReceiverID,
        chat_id: this.currentChatIDActive,
        ids: [this.OneDeleteId]
      }
      if (this.OneDeleteId != "") {
        // ////console.log("before send = ", dataForForm);
        this.socketService.deleteChatMessage(dataForForm);
        $("#chat_message_" + this.OneDeleteId).remove();
        $("#checkbox_select_id_" + this.OneDeleteId).remove();
        this.finalDeleteArr = [];
        this.OneDeleteId = "";
        this.showSelectedMsgCount = 0;
        $('input:checkbox').removeAttr('checked');
        $("li").removeClass("Msgselected");
        $('.showSelectOptionsAll').hide();
      }
    } else if (checkType == 2) {
      dataForForm = {
        sender_id: this.userIDDDD,
        recevier_id: this.activeReceiverID,
        chat_id: this.currentChatIDActive,
        ids: this.finalDeleteArr
      }
      if (this.finalDeleteArr != []) {
        // ////console.log("before send = ", dataForForm);
        this.socketService.deleteChatMessage(dataForForm);
        for (let ijk = 0; ijk < this.finalDeleteArr.length; ijk++) {
          $("#chat_message_" + this.finalDeleteArr[ijk]).hide();
          $("#checkbox_select_id_" + this.finalDeleteArr[ijk]).hide();
        }
        this.finalDeleteArr = [];
        this.showSelectedMsgCount = 0;
        $('input:checkbox').removeAttr('checked');
        $("li").removeClass("Msgselected");
        $('.showSelectOptionsAll').hide();
      }
    }
    // this.UserService.deleteChatMessage(dataForForm).subscribe(result => {
    //   this.loading = false;
    //   if (result['success'] == true) {
    //     $('.edit-delete-success').html('<button type="button" class="close" data-dismiss="alert">&times;</button>' + result['message']);
    //     $('.edit-delete-success').show();
    //     $('.edit-delete-danger').hide();
    //     // $("#"+id).removeClass( "Msgselected" );  
    //     // $("#"+id).removeClass( "Msgselected" );  
    //     // $("#"+id).removeClass( "Msgselected" );  

    //   } else if (result['success'] == false) {
    //     $('.edit-delete-danger').html('<button type="button" class="close" data-dismiss="alert">&times;</button>' + result['message']);
    //     $('.edit-delete-danger').show();
    //     $('.edit-delete-success').hide();
    //   }
    // })
  }
  goToSelectedMsg(id) {
    // this.getRightClickId = getId;
    //console.log(id);
    // alert(getId + "           " +cl)
    // getEvent.preventDefault();
    // getEvent.stopPropagation();
    // let getId = getEvent.target.id;
    // let cl = getEvent.target.className;
    // ////console.log(cl);
    // var id = getId.replace('chat_message_', '');
    if ($('#chat_message_' + id).hasClass('Msgselected')) {
      $("#chat_message_" + id).removeClass("Msgselected");
      let indexOfDD = this.finalDeleteArr.indexOf(id);
      this.finalDeleteArr.splice(indexOfDD, 1);
    } else if ($('#chat_message_' + id).hasClass('chat-right') || $('#chat_message_' + id).hasClass('chat-left')) {
      $("#chat_message_" + id).addClass("Msgselected");
      this.finalDeleteArr.push(id);
    }
    this.showSelectedMsgCount = this.finalDeleteArr.length;
    if (this.finalDeleteArr.length == 0) {
      $('.showSelectOptionsAll').hide();
    } else {
      $('.showSelectOptionsAll').show();
    }
  }
  selectMessage() {
    this.finalDeleteArr = [];
    $('.showSelectOptionsAll').toggle('show');
  }
  goToCloseSelected() {
    $('input:checkbox').prop('checked', false);
    this.finalDeleteArr = [];
    this.showSelectedMsgCount = 0;
    // $('input:checkbox').removeAttr('checked');
    $("li").removeClass("Msgselected");
    $('.showSelectOptionsAll').hide();
  }
  GoToMemberDetail(id) {
    localStorage.setItem('GoTomemberSearchPage', JSON.stringify(id));
    $(location).attr('href', '/member-detail');
  }
  onSearch(event) {
    $('#no-search-result').hide();
    // alert(event.target.value);
    let formVal = {
      searchMember: event.target.value,
      user_id: this.userIDDDD
    }
    if (event.target.value != "") {
      //////console.log("iffffffffffff");
      this.UserService.searchForMembersWithoutCurrentUser(formVal).subscribe(result => {
        // //console.log("result : ", result);
        if (result['success'] == true) {
          if (result['dataCount'] == 0) {
            //////console.log("ifffffff datacountttttt");
            this.getSearchMemberList = [];
            $('#no-search-result').show();
          }
          else if (result['dataCount'] != 0) {
            $('#no-search-result').hide();
            this.getSearchMemberList = result['getData'];
            //////console.log(this.getSearchMemberList[0].profile_pic);
          }
        }
        else if (result['success'] == false) {
          this.getSearchMemberList = [];
          $('#no-search-result').hide();
        }
      })
    }
    else {
      $('#no-search-result').hide();
      this.getSearchMemberList = []
    }
  }
  goToChatBot(selected_user_id) {
    this.getSearchMemberList = [];
    $('#no-search-result').hide();
    this.loading = true;
    let dataForForm = {
      user_id: this.userIDDDD,
      buyer_id: selected_user_id,
    }
    ////console.log("form data: ", dataForForm);
    this.UserService.CreateChat(dataForForm).subscribe(result => {
      // //console.log("result : ", result);
      if (result['success'] == true) {
        if (result['chat_id']) {
          let chat_id = result['chat_id'];
          if (result['code'] === 401) {
            // open chat box
            let getIndex = this.findArrayIndex(this.listAllC, 'chat_id', result['chat_id']);
            this.loading = false;
            this.openchatBox(getIndex);
          } else if (result['code'] === 501) {
            // refresh the list all contact
            let setVar = {
              chat_id: result['chat_id'],
              recevier_id: selected_user_id
            }
            localStorage.setItem('CurrentChatToBeOpen', JSON.stringify(setVar));
            // location.href = '/chat-message?FromOther=yes';
            this.router.navigate(['/chat-message'], {
              queryParams: {
                FromOther: 'yes'
              },
              //queryParamsHandling: 'merge',
            });
            this.listAllContacts();
          }
        }
      } else {
        this.loading = false;
      }
    });
  }
  addEmoji($event) {
    //// //console.log($event);
    // this.selectedEmoji = $event.emoji;
    let getTextareaValue = $('#reply_textarea_' + this.currentChatIDActive).val();
    let finalEmoji = getTextareaValue + $event.emoji.native;
    // //console.log("final : ", finalEmoji);
    $('#reply_textarea_' + this.currentChatIDActive).val(finalEmoji);
    //Appending to node
    // this.spot.nativeElement.insertAdjacentHTML('beforeend', "<ngx-emoji [emoji]='selectedEmoji' size='16'></ngx-emoji>");
    //Insert within a node
    // this.insert("<ngx-emoji [emoji]='selectedEmoji' size='16'></ngx-emoji>");
  }
  editEmoji($event) {
    let getTextareaValue = $('#update_reply_textarea_' + this.currentChatIDActive).val();
    let finalEmoji = getTextareaValue + $event.emoji.native;
    // //console.log("final : ", finalEmoji);
    $('#update_reply_textarea_' + this.currentChatIDActive).val(finalEmoji);
  }
  insert(html) {
    let sel, range;
    if (window.getSelection) {
      // //console.log("Window Selection => ", window.getSelection)
      // IE9 and non-IE
      sel = window.getSelection();
      // //console.log("Sel => ", sel);
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        // //console.log("Range =>", range);
        range.deleteContents();
        var el = document.createElement("div");//create element directly ?
        el.innerHTML = html;
        // //console.log("EL => ", el);
        var frag = document.createDocumentFragment(), node, lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);

        // Preserve the selection
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }
  openAddEmojiPicker() {
    this.openCreateEmojiPicker = true;
    $(".emoji-mart").css("width", "100%");
  }
  openEditEmojiPicker() {
    this.openUpdateEmojiPicker = true;
  }
  closeEmojiPicker() {
    this.openCreateEmojiPicker = false;
    this.openUpdateEmojiPicker = false;
  }
  async getUnreadIndexAndDate(index, date) {
    console.log("index : ",index);
    console.log("date : ",date);    
    if (index === 0) {
      console.log("ifff run");
      
      // find List of Previous chat last date
      await this.isLastDateOfListIsMatch(date);
    } else {
      console.log("else run");
      
      return true;
    }
  }
  isLastDateOfListIsMatch(date: any) {
    console.log("date in fun : ",date);
    
    let getLengthOfLastEle = this.listChatByChatID[this.selectedIndex].allMessageGroupBydate.length;
    console.log("getLengthOfLastEle :", getLengthOfLastEle);
    let getLastElementDate = this.listChatByChatID[this.selectedIndex].allMessageGroupBydate[getLengthOfLastEle - 1].date;
    console.log("getLastElementDate :", getLastElementDate);
    if (date == getLastElementDate) {
      console.log("log if date");
      
      return false;
    }else{
      console.log("log else date");
      
      return true;
    }
  }
}