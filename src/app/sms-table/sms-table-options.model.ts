import { Observable } from 'rxjs/Observable';
import SmsTableColumnDefinition from './sms-table-col-def.model';
import SmsTableConfig from './sms-table-config.model';

export default class SmsTableOptions {
    public records : Observable<Array<any>>;
    public columns: Array<SmsTableColumnDefinition>;
    public rowDefns: Array<any>;
    public config: SmsTableConfig;
    public callbacks: any;
  }