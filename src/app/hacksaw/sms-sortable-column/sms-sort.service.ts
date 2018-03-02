import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ISmsColumnSortedEvent } from './sms-column-sorted-event.model';

@Injectable()
export class SmsSortService {

    constructor() { }

    private columnSortedSource = new Subject<ISmsColumnSortedEvent>();

    columnSorted$ = this.columnSortedSource.asObservable();

    columnSorted(sortColumn: string, sortDirection: string) {
        this.columnSortedSource.next({sortColumn, sortDirection});
    }
}