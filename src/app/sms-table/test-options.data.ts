import TestData from './test.data';
import SmsTableColumnDefinition from './sms-table-col-def.model';
import SmsTableConfig from './sms-table-config.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const TestOptions = {
    records: Observable.of(TestData),
    columns: [
        { name: 'id', value: 'id', binding: '', filter: '', isNumeric: true },
        { name: 'name', value: 'name', binding: '', filter: '', isNumeric: false },
        { name: 'age', value: 'age', binding: '', filter: '', isNumeric: true },
        { name: 'movie', value: 'movie', binding: '', filter: '', isNumeric: false },
        { name: 'food', value: 'food', binding: '', filter: '', isNumeric: false },
        { name: 'DOB', value: 'DOB', binding: '', filter: '', isNumeric: true },
        { name: 'pets', value: 'pets', binding: '', filter: '', isNumeric: false },
        { name: 'city', value: 'city', binding: '', filter: '', isNumeric: false },
    ],
    rowDefns: [],
    config: new SmsTableConfig(),
    callbacks: null
};

export default TestOptions;