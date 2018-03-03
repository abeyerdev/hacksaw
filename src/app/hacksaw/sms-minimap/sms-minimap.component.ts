import { Component, Input, OnInit } from '@angular/core';
import { SmsColumnDefinition } from '../sms-column-definition.model';
import { SmsMinimapService } from './sms-minimap.service';
import { ScreenService } from '../screen.service';
import ColumnBreakpoints from '../../common/column-breakpoints';

@Component({
  selector: 'sms-minimap',
  templateUrl: './sms-minimap.component.html',
  styleUrls: ['./sms-minimap.component.css'],
})
export class SmsMinimapComponent implements OnInit {

  constructor(private screenService: ScreenService, private smsMinimapService: SmsMinimapService) { }

  @Input() data;
  columns: SmsColumnDefinition[];
  showDropdown = false;

  ngOnInit() {
    this.columns = SmsColumnDefinition.buildColumnInfo(this.data);   
    this.smsMinimapService.initColumnInfo(this.columns);

    this.screenService.screenResized
      .subscribe((dimensions) => {
        for (const col of this.columns) {
          const {alwaysShow, manuallyHidden, priority} = col.visibility;
          if (alwaysShow) {
            col.visibility.hidden = false;       
            this.smsMinimapService.setColumnInfo(col);
          } else if (!manuallyHidden && dimensions.screenWidth < ColumnBreakpoints[priority]) {
              col.visibility.hidden = true;                     
              this.smsMinimapService.setColumnInfo(col);
          } else if (!manuallyHidden) {
              col.visibility.hidden = false;                       
              this.smsMinimapService.setColumnInfo(col);
          }
        }
      });
  }

  toggleColumn(columnName: string) {
    const columnToToggle = this.columns.find((column) => column.value === columnName);
    if (columnToToggle) {
      columnToToggle.visibility.hidden = !columnToToggle.visibility.hidden;
      columnToToggle.visibility.manuallyHidden = !columnToToggle.visibility.manuallyHidden;
      this.smsMinimapService.setColumnInfo(columnToToggle);
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
