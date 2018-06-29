import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'classfilter'
})

export class ClassFilterPipe implements PipeTransform {
  transform(items: any[], standardValue: Number, yearValue: Number): any[] {

    console.log('s:' + standardValue + ' Y:' + yearValue);
    if (!items) {
      return [];
 }
 if (standardValue == null || yearValue == null) {
   return items;
 }

return items.filter( it => {
          // tslint:disable-next-line:triple-equals
            if (it.standard == standardValue && it.year == yearValue) {
                return true;
            }
            // tslint:disable-next-line:triple-equals
         /*   if (it.year == yearValue) {
              return true;
          }*/
    });
   }
}
