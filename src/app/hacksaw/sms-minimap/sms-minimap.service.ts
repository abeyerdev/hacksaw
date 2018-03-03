import { Injectable, OnInit } from '@angular/core';
import { SmsColumnDefinition } from '../sms-column-definition.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class SmsMinimapService {

    constructor() { }

    private columnInfo: SmsColumnDefinition[];
    columnInfoChanged: BehaviorSubject<SmsColumnDefinition[]> = new BehaviorSubject<SmsColumnDefinition[]>([]);
    
    initColumnInfo(columnInfo: SmsColumnDefinition[]) {
        this.columnInfo = columnInfo;
        this.columnInfoChanged.next(this.columnInfo);
    }

    getColumnInfo(): BehaviorSubject<SmsColumnDefinition[]> {
        return this.columnInfoChanged;
    }

    setColumnInfo(column: SmsColumnDefinition) {
        const columnInfo = this.columnInfo.find((col) => col.value == column.value);
        if (columnInfo !== undefined) {
            this.columnInfo = this.columnInfo.filter((col) => col.value !== columnInfo.value);
            this.columnInfo.push(columnInfo);
            this.columnInfoChanged.next(this.columnInfo);
        }
    }
}