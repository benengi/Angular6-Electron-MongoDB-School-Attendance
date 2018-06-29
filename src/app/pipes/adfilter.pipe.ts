import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adfilter'
})

export class AdfilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {


    if (!items) {
         return [];
    }
    if (!searchText) {
      return items;
    }
searchText = searchText.toLowerCase();

console.log('classfilter');
return items.filter( it => {
      return it.studentid.toString().toLowerCase().includes(searchText);
    });
   }
}
