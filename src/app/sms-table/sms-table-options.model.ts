import { Observable } from 'rxjs/Observable';
import SmsTableColumnDefinition from './sms-table-col-def.model';
import SmsTableConfig from './sms-table-config.model';
import { isNumeric } from './helpers';

export default class SmsTableOptions {
    public records: Observable<Array<any>>;
    public columns: Array<SmsTableColumnDefinition>;
    public rowDefns: Array<any>;
    public config: SmsTableConfig;
    public callbacks: any;

    constructor(data) {
        this.records = Observable.of(data);
        this.columns = this.getColumns(data);
        this.rowDefns = [];
        this.config = new SmsTableConfig();
        this.callbacks = null;
    }

    getColumns(data: any[]) {
        const firstRow = data[0];
        const cols = Object.keys(firstRow);

        return cols
            .map((colName) => {
                const colDef = new SmsTableColumnDefinition();
                colDef.name = colName;
                colDef.value = colName;
                colDef.isNumeric = isNumeric(firstRow[colName]);
                return colDef;
            });
    }
  }
