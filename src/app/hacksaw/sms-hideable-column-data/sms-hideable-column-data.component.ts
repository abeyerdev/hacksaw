import { Component, OnInit, Input } from '@angular/core';
import { SmsMinimapService } from '../sms-minimap/sms-minimap.service';

@Component({
  selector: '[sms-hideable-column-data]',
  templateUrl: './sms-hideable-column-data.component.html',
  styleUrls: ['./sms-hideable-column-data.component.css']
})
export class SmsHideableColumnDataComponent implements OnInit {

  constructor(private smsMinimapService: SmsMinimapService) { }
  
  @Input('sms-hideable-column-data')
  columnName: string;
  
  hidden = false;

  ngOnInit() {
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

}
