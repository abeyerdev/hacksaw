import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HacksawModule } from './hacksaw/hacksaw.module';

import { AppComponent } from './app.component';
import { ScreenService } from './hacksaw/screen.service';
import { SmsSortableColumnComponent } from './hacksaw/sms-sortable-column/sms-sortable-column.component';
import { SmsSortableTableDirective } from './hacksaw/sms-sortable-table/sms-sortable-table.directive';
import { SmsSortService } from './hacksaw/sms-sortable-column/sms-sort.service';
import { SmsMinimapComponent } from './hacksaw/sms-minimap/sms-minimap.component';
import { SmsMinimapService } from './hacksaw/sms-minimap/sms-minimap.service';
import { SmsHideableColumnDataComponent } from './hacksaw/sms-hideable-column-data/sms-hideable-column-data.component';

@NgModule({
  declarations: [
    AppComponent,
    SmsMinimapComponent,
    SmsSortableColumnComponent,
    SmsSortableTableDirective,
    SmsHideableColumnDataComponent,
  ],
  imports: [
    BrowserModule,
    HacksawModule,
  ],
  providers: [
    ScreenService,
    SmsMinimapService, 
    SmsSortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
