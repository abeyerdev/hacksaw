import { ApplicationRef, ChangeDetectorRef, Component, Input, OnInit, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import SmsTableOptions from './sms-table-options.model';
import SmsTableColumnDefinition from './sms-table-col-def.model';

@Component({
  selector: 'sms-table',
  templateUrl: './sms-table.component.html',
  styleUrls: ['./sms-table.component.css']
})
export class SmsTableComponent implements OnInit {

  @Input() options: SmsTableOptions;
  @Input() data;
  showDropdown = false;
  sorting = false;
  subscription: Subscription;
  public filteredData: any[];
  public filteredDataObservable: Observable<any[]>;

  constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef) {
    // let LoremIpsum: any;
    // this._lipsum = new LoremIpsum();
  }

  isSorting(name: string) {
    return this.options.config.sortBy !== name && name !== '';
  }

  isSortAsc(name: string) {
    const isSortAsc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'asc';
    return isSortAsc;
  }

  isSortDesc(name: string) {
    const isSortDesc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'desc';
    return isSortDesc;
  }

  getCellValue(row: any, column: SmsTableColumnDefinition): string {
    // if (column.isComputed) {
    //   let evalfunc = new Function ('r', 'return ' + column.binding);
    //   let evalresult:string = evalfunc(row);
    //   return evalresult;
    // } else {
    // console.log(`Entering getCellValue with row: ${JSON.stringify(row, null, 2)},
    //   column: ${JSON.stringify(column, null, 2)}`);
      let returnVal = row[column.value];
      if (returnVal instanceof Date) {
        returnVal = returnVal.toLocaleDateString();
      }
      return returnVal;
      // return column.binding
      //   .split('.')
      //   .reduce((prev:any, curr:string) => prev[curr], row);
      // }
  }

  private sort(array: Array<any>, fieldName: string, direction: string, isNumeric: boolean) {

    const sortFunc = (field, rev, primerFn) => {
        // Return the required a,b function
        return (a, b) => {
            // Reset a, b to the field
            a = primerFn(pathValue(a, field)), b = primerFn(pathValue(b, field));
            // Do actual sorting, reverse as needed
            return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
        };
    };

    // Have to handle deep paths
    const pathValue = function (obj, path) {
        path = path.split('.');
        const len = path.length;
        for (let i = 0; i < len; i++) {
            obj = obj[path[i]];
        }
        return obj;
    };

    const primer = isNumeric ? (a) => {
      const retValue = parseFloat(String(a).replace(/[^0-9.-]+/g, ''));
      return isNaN(retValue) ? 0.0 : retValue;
    } : (a) => String(a).toUpperCase();

    this.sorting = true;
    array.sort(sortFunc(fieldName, direction === 'desc', primer));
  }

  sortHeaderClicked(columnName) {
    if (columnName) {
      if (this.options.config.sortBy === columnName) {
        this.options.config.sortDirection = this.options.config.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.options.config.sortBy = columnName;

      const matchingColumn = this.options.columns
        .filter((column) => column.value === this.options.config.sortBy)[0];

      this.sort(this.filteredData, this.options.config.sortBy, this.options.config.sortDirection, matchingColumn.isNumeric);
    }
  }

    toggleColumn(column) {
        column.hidden = !column.hidden;
    }

    toggleDropdown() {
        this.showDropdown = !this.showDropdown;
    }

  ngOnInit() {
    console.log(`In NgOnInit() with options: ${JSON.stringify(this.options, null, 2)}`);
    if (!this.options) {
        this.options = new SmsTableOptions(this.data);
        console.log(`Just set options: ${JSON.stringify(this.options, null, 2)}`);
    }
    this.subscription = this.options.records
      .subscribe(res => {
         this.filteredDataObservable = Observable.of(res);
         this.filteredData = res;
      });
  }
}
