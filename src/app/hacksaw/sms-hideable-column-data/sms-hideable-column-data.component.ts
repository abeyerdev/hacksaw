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
          const thisColumn = newColumnInfo.find((col) => col.value === this.columnName);
          if (thisColumn !== undefined) {
            this.hidden = thisColumn.visibility.hidden;        
          }
        });
  }

}
