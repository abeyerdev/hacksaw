import { Component, Input, OnInit } from '@angular/core';
import { SmsColumnDefinition } from '../sms-column-definition.model';

@Component({
  selector: 'app-sms-minimap-columns',
  templateUrl: './sms-minimap-columns.component.html',
  styleUrls: ['./sms-minimap-columns.component.css']
})
export class SmsMinimapColumnsComponent implements OnInit {

  constructor() { }

  @Input('sms-minimap-columns') columns;
  @Input() data;
  private columnInfo: SmsColumnDefinition[];
  showDropdown = false;

  ngOnInit() {
    this.columnInfo = SmsColumnDefinition.buildColumnInfo(this.data);
  }

  toggleColumn(columnName: string) {
    const columnToToggle = this.columnInfo.find((column) => column.value === columnName);
    if (columnToToggle) {
      columnToToggle.visibility.hidden = !columnToToggle.visibility.hidden;
      columnToToggle.visibility.manuallyHidden = !columnToToggle.visibility.manuallyHidden;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
