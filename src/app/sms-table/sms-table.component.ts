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
  subscription: Subscription;
  public filteredData: Array<any>;
  public filteredDataObservable: Observable<Array<any>>;

  constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef) {
    // let LoremIpsum: any;
    // this._lipsum = new LoremIpsum();
  }
 
  getCellValue(row: any, column: SmsTableColumnDefinition) :string {
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
  
  ngOnInit() {
    this.subscription = this.options.records
      .subscribe(res => {
         this.filteredDataObservable = Observable.of(res); 
         this.filteredData = res; 
      });
  }
}
