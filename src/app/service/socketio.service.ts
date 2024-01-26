import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import * as $ from 'jquery';
import { PushNotificationsService} from 'ng-push';

@Injectable({providedIn: 'root'})
export class SocketioService {
    socket;
    userID : any;
    constructor(private router : Router, private _pushNotifications: PushNotificationsService) {}

    private customSubject = new Subject < any > ();
    private customSubjectMore = new Subject < any > ();
    customObservable = this.customSubject.asObservable();
    customObservableAgain = this.customSubjectMore.asObservable();

    callComponentMethod(value:any) {
      this.customSubject.next(value);
    }

    callComponentMethodAgain(value:any) {
        this.customSubjectMore.next(value)
      }

    setupSocketConnection() {
        let userLocalId = localStorage.getItem('userInfo');
        let parseData = JSON.parse(userLocalId);
        this.userID = parseData['id'];
        this.socket = io(environment.SOCKET_ENDPOINT);
        this.socket.on('Mybroadcast', (data : string) => {
                var params = data['message'];
                var new_id = data['new_id'];
                var senderName = data['sender_name'];
                if (params) { //this means logged in user has received a message from other user
                    if (this.router.url == '/chat-message') {
                      console.log(params, "broadcasted data")
                      this.callComponentMethod(data)
                    } else if(params['recevier_id'] == this.userID) {
                        //openbots
                        let options = { //set options
                            body: params.message,
                            icon: "assets/images/Original.png",
                            sound: "assets/sounds/new_message.mp3"
                          }
                           this._pushNotifications.create(senderName, options).subscribe( //creates a notification
                            res => {
                                if (res.event.type === 'click') {
                                    // You can do anything else here
                                    res.notification.close();
                                    $(location).attr('href', '/chat-message')
                                }
                            },
                              err => console.log(err)
                          );
                    }
                }
            })
        this.socket.on('messageRead', (data: string) => {
            this.callComponentMethodAgain(data)
        })
    }

    sendMessage(postData) {
        this.socket.emit('data', JSON.stringify(postData));
    }

    markMessageRead(postData) {
        this.socket.emit('receivedMark', JSON.stringify(postData));
    }
}