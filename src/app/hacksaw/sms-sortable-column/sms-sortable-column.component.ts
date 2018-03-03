import { Component, HostListener, Input,  OnDestroy, OnInit, Optional } from '@angular/core';
import { SmsSortService } from './sms-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { SmsMinimapService } from '../sms-minimap/sms-minimap.service';

@Component({
  selector: '[sms-sortable-column]',
  templateUrl: './sms-sortable-column.component.html',
  styleUrls: ['./sms-sortable-column.component.css']
})
export class SmsSortableColumnComponent implements OnInit, OnDestroy {

  constructor(@Optional() private smsMinimapService: SmsMinimapService, private sortService: SmsSortService) { }
  
  @Input('sms-sortable-column')
  columnName: string;

  @Input('sms-sort-direction')
  sortDirection: string = '';

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortService.columnSorted(this.columnName, this.sortDirection);
  }

  private columnSortedSubscription: Subscription;

  hidden = false;

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

  ngOnInit() {
    // console.log(`Initializing SortableColumn`);
    if (this.smsMinimapService) {
      this.smsMinimapService.getColumnInfo()
        .subscribe((newColumnInfo) => {
          // console.log(`Received new column info: ${JSON.stringify(newColumnInfo, null, 2)}`);          
          const thisColumn = newColumnInfo.find((col) => col.value === this.columnName);
          // console.log(`Upon seeing new column info, we found ${JSON.stringify(thisColumn, null, 2)}`);
          if (thisColumn !== undefined) {
            this.hidden = thisColumn.visibility.hidden;
            // console.log(`We should have just hid ${this.columnName}: ${this.hidden}`);          
          }
        });
    }
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.sortService.columnSorted$
      .subscribe((event) => {
        // reset this column's sort direction to hide the sort icons
        if (this.columnName != event.sortColumn) {
            this.sortDirection = '';
        }
  });
  }

}
