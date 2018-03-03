import { SmsColumnVisibility } from "./sms-column-visibility.model";
import { isNumeric } from '../common/helpers';

export class SmsColumnDefinition {
    name = '';
    value = '';
    isNumeric = false;
    visibility = new SmsColumnVisibility();

    static buildColumnInfo(data: any[]): SmsColumnDefinition[] {
      const firstRow = data[0];
      const cols = Object.keys(firstRow);
      return cols
        .map((colName, index) => {
          const colDef = new SmsColumnDefinition();
          colDef.name = colName;
          colDef.value = colName;
          colDef.isNumeric = isNumeric(firstRow[colName]);
          if (index >= 0 && index < 2) {
            colDef.visibility.priority = 1;
          } else if (index >= 2 && index < 4) {
            colDef.visibility.priority = 2;
          } else if (index >= 4 && index < 6) {
            colDef.visibility.priority = 3;
          } else if (index >= 6 && index < 8) {
            colDef.visibility.priority = 4;
          } else if (index >= 8 && index < 10) {
            colDef.visibility.priority = 5;
          } else {
            colDef.visibility.priority = 6;
          }
          return colDef;
        });
    }
  }