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
        .map((colName) => {
          const colDef = new SmsColumnDefinition();
          colDef.name = colName;
          colDef.value = colName;
          colDef.isNumeric = isNumeric(firstRow[colName]);
          return colDef;
        });
    }
  }