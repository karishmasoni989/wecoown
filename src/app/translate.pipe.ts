import { Pipe, PipeTransform } from '@angular/core';
import { GoogletranslateService } from '../app/service/googletranslate.service';

@Pipe({ name: 'translateString' })
export class TranslateStringPipe implements PipeTransform {
    private convertedText: String = '';
    constructor(public GoogletranslateService: GoogletranslateService) { }
    transform(str: String, defaultLang?: String): String {
        // let defaultLang = 'en';
        //console.log(str, defaultLang);        
        if (defaultLang == '') defaultLang = 'en'
        let toLang = localStorage.dropDownSelectedLanguage || 'en';
        // this.GoogletranslateService.translateText(str, JSON.parse(toLang), defaultLang).subscribe(response => {
        //     if (response && response.data && response.data.translations && Array.isArray(response.data.translations) && response.data.translations.length > 0 && response.data.translations[0].translatedText) {
        //         //console.log("translated text", response.data.translations[0].translatedText)
        //         this.convertedText = response.data.translations[0].translatedText;
        //     } else {
        //         this.convertedText = str;
        //     }
        // });
        return this.convertedText;
    }
}