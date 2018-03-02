import { Directive, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SmsSortService } from '../sms-sortable-column/sms-sort.service';
import { isNumeric } from '../../common/helpers';
import { SmsColumnDefinition } from '../sms-column-definition.model';

@Directive({
  selector: '[sms-sortable-table]'
})
export class SmsSortableTableDirective implements OnInit, OnDestroy {

  constructor(private sortService: SmsSortService) {}

  @Input()
  data: any[] = null;
  
  private columnSortedSubscription: Subscription;
  private columnInfo: SmsColumnDefinition[];

  ngOnInit() {
    if (!this.data) {
      console.error('No data found for sms-sortable-table! Try binding the [data] property to a dataset.')
    } else {
      this.columnInfo = SmsColumnDefinition.buildColumnInfo(this.data);
      this.columnSortedSubscription = this.sortService.columnSorted$
        .subscribe((event) => {
          const columnInfo = this.getColumnInfo(event.sortColumn);
          if (columnInfo) {
            // console.log(event.sortColumn, columnInfo);
            this.sort(this.data, event.sortColumn, event.sortDirection, columnInfo.isNumeric);
          }        
        });
    }
  }

  ngOnDestroy() {
      this.columnSortedSubscription.unsubscribe();
  }

  private getColumnInfo(columnName: string) : SmsColumnDefinition {
    return this.columnInfo.find((column) => column.value === columnName);
  }

  private sort(array: Array<any>, fieldName: string, direction: string, isNumeric: boolean) {
    // Return the required a,b function
    const sortFunc = (field, rev, primerFn) => {
        return (a, b) => {
            // console.log(`Sorting ${field}: ${a} vs ${b}`);
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
      // if we're dealing with dates, return the numeric representation (ms)
      if (a instanceof Date) {
          return +a;
      }
      const retValue = parseFloat(String(a).replace(/[^0-9.-]+/g, ''));
      return isNaN(retValue) ? 0.0 : retValue;
    } : (a) => String(a).toUpperCase();

    array.sort(sortFunc(fieldName, direction === 'desc', primer));
}

}
