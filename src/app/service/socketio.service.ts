import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as $ from 'jquery';
import { PushNotificationsService } from 'ng-push';
import { AppComponent } from '../app.component'
@Injectable({ providedIn: 'root' })
export class SocketioService {
    socket;
    userID: any;
    constructor(private router: Router, private _pushNotifications: PushNotificationsService) { }
    private AppComponent: AppComponent
    private customSubject = new Subject<any>();
    private customSubjectMore = new Subject<any>();
    private customSubjectDelete = new Subject<any>();
    private customSubjectEdit = new Subject<any>();
    customObservable = this.customSubject.asObservable();
    customObservableAgain = this.customSubjectMore.asObservable();
    customObservableAgainDelete = this.customSubjectDelete.asObservable();
    customObservableAgainUpdate = this.customSubjectEdit.asObservable();
    callComponentMethod(value: any) {
        this.customSubject.next(value);
    }
    callComponentMethodAgain(value: any) {
        this.customSubjectMore.next(value)
    }
    callComponentMethodAgainDelete(value: any) {
        this.customSubjectDelete.next(value)
    }
    callComponentMethodEdit(value: any) {
        this.customSubjectEdit.next(value)
    }

    setupSocketConnection() {
        let userLocalId = localStorage.getItem('userInfo');
        let parseData = JSON.parse(userLocalId);
        this.userID = parseData['id'];
        this.socket = io(environment.SOCKET_ENDPOINT);
        //console.log("this.socket :", this.socket);

        this.socket.on('Mybroadcast', (data: string) => {
            var params = data['message'];
            var new_id = data['new_id'];
            var senderName = data['sender_name'];
            var senderImage = data['sender_image'];
            // //console.log(senderImage)
            if (params) { //this means logged in user has received a message from other user
                if (this.router.url == '/chat-message') {
                    //console.log(params, "broadcasted data")
                    this.callComponentMethod(data)
                } 
                if (params['recevier_id'] == this.userID) {
                    // alert("new msg")
                    //openbots
                    let options = { //set options
                        body: params.message,
                        icon: senderImage,
                        sound: "assets/sounds/new_message.mp3"
                    }
                    this._pushNotifications.create(senderName, options).subscribe( //creates a notification
                        res => {
                            //console.log(res);
                            if (res.event.type === 'click') {
                                // You can do anything else here
                                res.notification.close();
                                $(location).attr('href', '/chat-message')
                            }
                        },
                        err => {
                            //console.log(err);
                            Notification.requestPermission(function (permission) {
                                //console.log(permission)
                                if (permission !== 'granted') {
                                    $('#allow_notify').show();
                                } else {
                                    $('#allow_notify').hide();
                                }
                            });
                        }
                    );

                    setTimeout(() => {
                        this.AppComponent.UnreadMsgCount(this.userID)
                      }, 3000)
                }
            }
        })
        this.socket.on('messageRead', (data: string) => {
            this.callComponentMethodAgain(data)
        })
        this.socket.on('messageDelete', (data: string) => {
            this.callComponentMethodAgainDelete(data)
        })
        this.socket.on('messageEdit', (data: string) => {
            this.callComponentMethodEdit(data)
        })
    }

    sendMessage(postData) {
        this.socket.emit('data', JSON.stringify(postData));
    }

    markMessageRead(postData) {
        this.socket.emit('receivedMark', JSON.stringify(postData));
    }
    deleteChatMessage = (postData) => {
        this.socket.emit('deleteChatMessage', JSON.stringify(postData));
    }
    editChatMessage = (postData) => {
        this.socket.emit('editChatMessage', JSON.stringify(postData));
    }
}