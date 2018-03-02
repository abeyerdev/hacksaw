import { Directive, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SmsSortService } from '../sms-sortable-column/sms-sort.service'
import { isNumeric } from '../../common/helpers';
import { SmsColumnDefinition } from '../sms-column-definition.model';

@Directive({
  selector: '[sms-sortable-table]'
})
export class SmsSortableTableDirective implements OnInit, OnDestroy {

  constructor(private sortService: SmsSortService) { }

  @Input()
  data: any[] = null;
  
  private columnSortedSubscription: Subscription;  
  private columnInfo: SmsColumnDefinition[];

  ngOnInit() {
    this.columnInfo = this.buildColumnInfo(this.data);
    this.columnSortedSubscription = this.sortService.columnSorted$
      .subscribe((event) => {
        const columnInfo = this.getColumnInfo(event.sortColumn);
        if (columnInfo) {
          this.sort(this.data, event.sortColumn, event.sortDirection, columnInfo.isNumeric);
        }        
      });
  }

  ngOnDestroy() {
      this.columnSortedSubscription.unsubscribe();
  }

  private buildColumnInfo(data: any[]): SmsColumnDefinition[] {
    const firstRow = data[0];
    const cols = Object.keys(firstRow);
    return cols
      .map((colName) => {
        const colDef = new SmsColumnDefinition();
        colDef.name = colName;
        colDef.value = colName;
        colDef.isNumeric = isNumeric(firstRow[colName]);
        return colDef;
      });
  }

  private getColumnInfo(columnName: string) : SmsColumnDefinition {
    return this.columnInfo.find((column) => column.value === columnName);
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

    array.sort(sortFunc(fieldName, direction === 'desc', primer));
}

}
