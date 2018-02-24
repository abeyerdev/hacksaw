import TestData from './test.data';
import SmsTableColumnDefinition from './sms-table-col-def.model';
import SmsTableConfig from './sms-table-config.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const TestOptions = {
    records: Observable.of(TestData),
    columns: [
        { name: 'id', value: 'id', binding: '' },
        { name: 'name', value: 'name', binding: '' },
        { name: 'age', value: 'age', binding: '' },
        { name: 'movie', value: 'movie', binding: '' },
    ],
    rowDefns: [],
    config: new SmsTableConfig(),
    callbacks: null
};

export default TestOptions;