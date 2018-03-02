import { Component, Input, OnInit } from '@angular/core';
import { SmsColumnDefinition } from '../sms-column-definition.model';

@Component({
  selector: 'sms-minimap',
  templateUrl: './sms-minimap.component.html',
  styleUrls: ['./sms-minimap.component.css']
})
export class SmsMinimapComponent implements OnInit {

  constructor() { }

  @Input() data;
  columns: SmsColumnDefinition[];
  showDropdown = false;

  ngOnInit() {
    this.columns = SmsColumnDefinition.buildColumnInfo(this.data);
  }

  toggleColumn(columnName: string) {
    const columnToToggle = this.columns.find((column) => column.value === columnName);
    if (columnToToggle) {
      columnToToggle.visibility.hidden = !columnToToggle.visibility.hidden;
      columnToToggle.visibility.manuallyHidden = !columnToToggle.visibility.manuallyHidden;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
