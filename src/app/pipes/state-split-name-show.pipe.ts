import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateSplitNameShow'
})
export class StateSplitNameShowPipe implements PipeTransform {
  transform(value: any): any {
    let getStateSplitName = value.split('||');
    if (getStateSplitName.length === 3) {
      return getStateSplitName[2];    
    } else {
      return value;
    }
  }
}
