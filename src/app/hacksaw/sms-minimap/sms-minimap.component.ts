import { Component, Input, OnInit } from '@angular/core';
import { SmsColumnDefinition } from '../sms-column-definition.model';
import { SmsMinimapService } from './sms-minimap.service';

@Component({
  selector: 'sms-minimap',
  templateUrl: './sms-minimap.component.html',
  styleUrls: ['./sms-minimap.component.css'],
})
export class SmsMinimapComponent implements OnInit {

  constructor(private smsMinimapService: SmsMinimapService) { }

  @Input() data;
  columns: SmsColumnDefinition[];
  showDropdown = false;

  ngOnInit() {
    this.columns = SmsColumnDefinition.buildColumnInfo(this.data);
    // console.log(`Initializing MinimapComponent with columns ${JSON.stringify(this.columns, null, 2)}`);    
    this.smsMinimapService.initColumnInfo(this.columns);
    // console.log(`Columns generated, ${JSON.stringify(this.columns, null, 2)}`);
  }

  toggleColumn(columnName: string) {
    // console.log(`Trying to toggle ${columnName}`);
    const columnToToggle = this.columns.find((column) => column.value === columnName);
    if (columnToToggle) {
      columnToToggle.visibility.hidden = !columnToToggle.visibility.hidden;
      columnToToggle.visibility.manuallyHidden = !columnToToggle.visibility.manuallyHidden;
      this.smsMinimapService.setColumnInfo(columnToToggle);
      // console.log(`Successfully toggled ${columnToToggle.value}`);
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
