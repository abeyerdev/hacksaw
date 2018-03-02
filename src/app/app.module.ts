import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HacksawModule } from './hacksaw/hacksaw.module';

import { AppComponent } from './app.component';
import { SmsTableComponent } from './sms-table/sms-table.component';
import { SmsSortableColumnComponent } from './hacksaw/sms-sortable-column/sms-sortable-column.component';
import { SmsSortableTableDirective } from './hacksaw/sms-sortable-table/sms-sortable-table.directive';
import { SmsSortService } from './hacksaw/sms-sortable-column/sms-sort.service';

@NgModule({
  declarations: [
    AppComponent,
    SmsSortableColumnComponent,
    SmsSortableTableDirective,
    SmsTableComponent,
  ],
  imports: [
    BrowserModule,
    HacksawModule,
  ],
  providers: [SmsSortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
