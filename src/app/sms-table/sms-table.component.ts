import { ApplicationRef, ChangeDetectorRef, Component, HostListener, Input, OnInit, TemplateRef, ElementRef, ContentChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import SmsTableOptions from './sms-table-options.model';
import SmsTableColumnDefinition from './sms-table-col-def.model';
import ColumnBreakpoints from '../common/column-breakpoints';

@Component({
  selector: 'sms-table',
  templateUrl: './sms-table.component.html',
  styleUrls: ['./sms-table.component.css']
})
export class SmsTableComponent implements OnInit {
  @Input() options: SmsTableOptions;
  @ContentChild('name') override: TemplateRef<ElementRef>;
  @Input() data;
  overrideTemplates = [];
  showDropdown = false;
  sorting = false;
  subscription: Subscription;
  public filteredData: any[];
  public filteredDataObservable: Observable<any[]>;

  constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      const width = event.target.innerWidth;
      const height = event.target.innerHeight;
      const cols = this.options.columns;
      for (const col of cols) {
          const {alwaysShow, manuallyHidden, priority} = col.visibility;
          if (alwaysShow) {
            col.visibility.hidden = false;
          } else if (!manuallyHidden && width < ColumnBreakpoints[priority]) {
              col.visibility.hidden = true;
          } else if (!manuallyHidden){
              col.visibility.hidden = false;
          }
      }
  }

  isSorting(name: string) {
      return this.options.config.sortBy !== name && name !== '';
  }

  isSortAsc(name: string) {
      const isSortAsc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'asc';
      return isSortAsc;
  }

  isSortDesc(name: string) {
      const isSortDesc: boolean = this.options.config.sortBy === name && this.options.config.sortDirection === 'desc';
      return isSortDesc;
  }

  getCellValue(row: any, column: SmsTableColumnDefinition): string {
      let returnVal = row[column.value];
      if (returnVal instanceof Date) {
        returnVal = returnVal.toLocaleDateString('en-US');
      }
      return returnVal;
  }

  getHideableCols() {
    return this.options.columns.filter((col) => !col.visibility.alwaysShow);
  }

  private sort(array: Array<any>, fieldName: string, direction: string, isNumeric: boolean) {
      const sortFunc = (field, rev, primerFn) => {
          // Return the required a,b function
          return (a, b) => {
              // Reset a, b to the field
              a = primerFn(pathValue(a, field)), b = primerFn(pathValue(b, field));
              // Do actual sorting, reverse as needed
              return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
          };
      };

      // Have to handle deep paths
      const pathValue = function (obj, path) {
          path = path.split('.');
          const len = path.length;
          for (let i = 0; i < len; i++) {
              obj = obj[path[i]];
          }
          return obj;
      };

      const primer = isNumeric ? (a) => {
        const retValue = parseFloat(String(a).replace(/[^0-9.-]+/g, ''));
        return isNaN(retValue) ? 0.0 : retValue;
      } : (a) => String(a).toUpperCase();

      this.sorting = true;
      array.sort(sortFunc(fieldName, direction === 'desc', primer));
  }

    sortHeaderClicked(columnName) {
        if (columnName) {
            if (this.options.config.sortBy === columnName) {
              this.options.config.sortDirection = this.options.config.sortDirection === 'asc' ? 'desc' : 'asc';
            }
            this.options.config.sortBy = columnName;

            const matchingColumn = this.options.columns
              .filter((column) => column.value === this.options.config.sortBy)[0];

            this.sort(this.filteredData, this.options.config.sortBy, this.options.config.sortDirection, matchingColumn.isNumeric);
      }
  }

    toggleColumn(column) {
        column.visibility.hidden = !column.visibility.hidden;
        column.visibility.manuallyHidden = column.visibility.hidden === true;        
    }

    toggleDropdown() {
        this.showDropdown = !this.showDropdown;
    }

    ngOnInit() {
        if (!this.options) {
            this.options = new SmsTableOptions(this.data);
        }

        if(this.override) {
            // console.log(JSON.stringify(this.override.elementRef, null, 2));
        }

        // Testing visibility priorities
        this.options.columns[0].visibility.priority = 1;
        this.options.columns[1].visibility.alwaysShow = true;
        this.options.columns[1].visibility.priority = 2;
        this.options.columns[2].visibility.priority = 3;
        this.options.columns[3].visibility.priority = 3;
        this.options.columns[4].visibility.priority = 4;
        this.options.columns[5].visibility.priority = 4;
        this.options.columns[6].visibility.priority = 5;
        this.options.columns[7].visibility.priority = 5;
        this.options.columns[8].visibility.priority = 6;

        this.subscription = this.options.records
            .subscribe(res => {
                this.filteredDataObservable = Observable.of(res);
                this.filteredData = res;
            });
  }
}
