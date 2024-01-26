import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countrySplitNameShow'
})
export class CountrySplitNameShowPipe implements PipeTransform {
  transform(value: any): any {    
    let getCountrySplitName = value.split('||');
    if (getCountrySplitName.length === 2) {
      return getCountrySplitName[1];    
    } else {
      return value;
    }
  }
}
