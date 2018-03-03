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
    if (this.smsMinimapService) {
      this.smsMinimapService.getColumnInfo()
        .subscribe((newColumnInfo) => {       
          const thisColumn = newColumnInfo.find((col) => col.value === this.columnName);
          if (thisColumn !== undefined) {
            this.hidden = thisColumn.visibility.hidden;     
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
