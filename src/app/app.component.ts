import { Component, OnInit } from '@angular/core';
import SmsTableOptions from './sms-table/sms-table-options.model';
import TestData from './common/test.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hacksaw';
  tableData = TestData;

  ngOnInit() {
    // setTimeout(() => {
    //     this.tableData = [
    //       { id: 5, name: 'Jerry', age: 60, movie: 'What', food: 'burgers', DOB: new Date(1958, 6, 1), pets: true, color: 'black', city: 'Oconomowoc'},
    //       { id: 6, name: 'Kim', age: 53, movie: 'Hello', food: 'turkey', DOB: new Date(1962, 2, 5), pets: false, color: 'orange', city: 'Marshfield'},
    //     ];      
    // }, 15000); 
  }
}
