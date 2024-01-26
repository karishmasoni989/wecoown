import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient,
    private FormsModule: FormsModule,
    private ReactiveFormsModule: ReactiveFormsModule) { }

    errorMessgae(data_message){
        
    }
    successMessgae(data_message){
    }
}
