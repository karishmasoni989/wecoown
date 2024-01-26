import { Pipe, PipeTransform } from '@angular/core';
//import { GoogletranslateService } from '../app/service/googletranslate.service';
import { UserService } from './service/user.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
@Pipe({ name: 'translateString' })
export class TranslateStringPipe implements PipeTransform {
    constructor(public UserService: UserService) { }
    transform(value: any): Observable<any> {
      //console.log("value" + value);
        let checkPreviousLang = localStorage.getItem('CurrentLanguage');
        // console.log("checkPreviousLang" + checkPreviousLang);
        let sourceLanguage = "";
        if (checkPreviousLang != null) {
            let parseData = JSON.parse(checkPreviousLang);
            sourceLanguage = parseData['language'];
        } else {
            sourceLanguage = 'en';
        }
      //console.log("sourceLanguage : " + sourceLanguage);
        let checkNewLang = localStorage.getItem('SelectedLanguage');
        // console.log("checkNewLang" + checkNewLang);
        let targetLanguage = "";
        if (checkNewLang != null) {
            let parseData = JSON.parse(checkNewLang);
            targetLanguage = parseData['language'];
        } else {
            targetLanguage = 'en';
        }
      //console.log("targetLanguage : " + targetLanguage);
        let dataForm = {
            targetLanguage: targetLanguage,
            sourceLanguage: sourceLanguage,
            text: value
        }
        // console.log("dataForm" + dataForm);
        if (sourceLanguage != targetLanguage) {
            return this.UserService.googleTranslate(dataForm).pipe(
                map((data) => {
                    // return timeZones.find(x => x.utc.indexOf(timezone) > -1).text;
                    if (data['success'] == true) {
                        if (data['dataForm']) {
                          //console.log("resulttttttttttttttttttt result['dataForm'] : ", data['dataForm']);
                            let convertData = data['dataForm'].data.translations[0].translatedText
                          //console.log("convertData : ", typeof(convertData));
                            return convertData;
                        } else {
                            return of(value);
                        }
                    } else if (data['success'] == false) {
                        return of(value);
                    }
                })
            );
        } else {
          //console.log("convertData sourceLanguage = targetLanguage : ", value);
            let ff = 'value';
            return of(value);
        }
    }
}