import { Injectable } from '@angular/core';
// const { Translate } = require('@google-cloud/translate').v2;
// const projectId = 'weco-wepo';
const API_KEY = 'AIzaSyBqVZZr2P7-uWrN_3fGGqzLCciI7_2tY1E';
// const translate = new Translate({projectId});
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class GoogletranslateService {
  constructor(private http: HttpClient) { }
  // Instantiates a client

  translateText(text, target, source) {
    //console.log(text, target, source)
    try {     
        // return new Promise((resolve, reject) => {
          var url = "https://translation.googleapis.com/language/translate/v2?key=" + API_KEY;
          if (source && target != source) {
            url += "&source=" + source;
            url += "&target=" + target;
            url += "&q=" + escape(text);
            //console.log(url, "url")
            return this.http.get<any>(url)
          } else {
            return text
          }      
    } catch (error) {
      //console.log(error);
      return text;
    }
  }

  async translateStr(str) {
    let defaultLang = 'en';
    let toLang = localStorage.dropDownSelectedLanguage || 'en';
    let convertedStr = await this.translateText(str, JSON.parse(toLang), defaultLang);
    //console.log("type of : ",typeof(convertedStr))
    //console.log(`converted ${str} to ${convertedStr}`);
    return convertedStr
  }
}
