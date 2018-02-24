import { Component } from '@angular/core';
import SmsTableOptions from './sms-table/sms-table-options.model';
import TestOptions from './sms-table/test-options.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sms-table';
  tableOptions: SmsTableOptions = TestOptions;
}
