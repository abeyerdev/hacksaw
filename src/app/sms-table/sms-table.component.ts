import { ApplicationRef, ChangeDetectorRef, Component, Input, OnInit, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import SmsTableOptions from './sms-table-options.model';
import SmsTableColumnDefinition from './sms-table-col-def.model';
import TestData from './test.data';

@Component({
  selector: 'sms-table',
  templateUrl: './sms-table.component.html',
  styleUrls: ['./sms-table.component.css']
})
export class SmsTableComponent implements OnInit {

  @Input() options;
  data: any[] = TestData;
  sorting = false;
  start = 0;
  end = 0;
  subscription: Subscription;
  public filteredData: any[];
  public filteredDataObservable: Observable<any[]>;

  constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef) {
    // let LoremIpsum: any;
    // this._lipsum = new LoremIpsum();
  }

  isSorting(name: string) {
    return this.options.config.sortBy !== name && name !== '';
  };
   
  isSortAsc(name: string) {
    const isSortAsc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'asc';
    return isSortAsc;
  };
   
  isSortDesc(name: string) {
    const isSortDesc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'desc';
    return isSortDesc;
  };
 
  getCellValue(row: any, column: SmsTableColumnDefinition): string {
    // if (column.isComputed) {
    //   let evalfunc = new Function ('r', 'return ' + column.binding);
    //   let evalresult:string = evalfunc(row);
    //   return evalresult;
    // } else {
      // console.log(`Entering getCellValue with row: ${JSON.stringify(row, null, 2)},
      //   column: ${JSON.stringify(column, null, 2)}`);
      return row[column.value];
      // return column.binding
      //   .split('.')
      //   .reduce((prev:any, curr:string) => prev[curr], row);
    // }
  }

  private sort(array: Array<any>, fieldName: string, direction: string, isNumeric: boolean) {
    const sortFunc = (field, rev, primer) => {
        // Return the required a,b function
        return function (a, b) {
            // Reset a, b to the field
            a = primer(pathValue(a, field)), b = primer(pathValue(b, field));
            // Do actual sorting, reverse as needed
            return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
        }
    };
  
    // Have to handle deep paths
    const pathValue = function (obj, path) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        };
        return obj;
    };
  
    const primer = isNumeric ? (a) => {
      const retValue = parseFloat(String(a).replace(/[^0-9.-]+/g, ''));
      return isNaN(retValue) ? 0.0 : retValue;
    } : (a) => String(a).toUpperCase();
  
    this.sorting = true;
    this.start = new Date().getTime();
    array.sort(sortFunc(fieldName, direction === 'desc', primer));
    this.end = new Date().getTime();
    var time = this.end - this.start;
    this.sorting = false;
  }

  sortHeaderClicked(columnName) {
    if (columnName) {
      if (this.options.config.sortBy === columnName) {
        this.options.config.sortDirection = this.options.config.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.options.config.sortBy = columnName;
      // Get the matching column
      const column: SmsTableColumnDefinition = this.options.columns
        .filter((column) => column.value === this.options.config.sortBy)[0];

      const isNumeric: boolean = column.isNumeric === true;
      this.sort(this.filteredData, this.options.config.sortBy, this.options.config.sortDirection, isNumeric);
    }
  }
  
  ngOnInit() {
    this.subscription = this.options.records
      .subscribe(res => {
         this.filteredDataObservable = Observable.of(res); 
         this.filteredData = res; 
      });
  }
}
