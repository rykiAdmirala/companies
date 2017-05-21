import { Pipe, PipeTransform } from '@angular/core';


// Couldn't find a way to implement filtering as a service
// Got stuck with a problem of maintaining and interacting with original list of companies, when displaying a copied list
@Pipe({name: 'searchFilter'})
export class SearchFilter implements PipeTransform {
  transform(collection: any, searchQuery: string): any {

    function _ifValueConsistQuery(value): boolean {
      // Return true if given value is a string, isn't empty and matches search text
      if (typeof value === 'string' && value) {
        return value.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
      }
    }  

    function _deepSearch(item) {
      // At first checks in string values of given object, e.g. 'companyName'
      // if no, then goes recursivly and checks in nested object/arrays, e.g. 'companyGoods'
      for (var key in item) {
        if (item.hasOwnProperty(key)) {

          if (
            _ifValueConsistQuery(item[key]) ||
            typeof item[key] === 'object' && _deepSearch(item[key])
          ) return true;

        }
      }
      
    }
    
    return collection && searchQuery ? collection.filter(_deepSearch) : collection;

  }
}
