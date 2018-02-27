import SmsTableColumnVisibility from './sms-col-visibility.model';

export default class SmsTableColumnDefinition {
    name = '';
    value = '';
    binding = '';
    filter = '';
    isNumeric = false;
    visibility = new SmsTableColumnVisibility();    
    // computedClass: any;
    // isComputed:boolean = false;
    // isAnchor:boolean = false;
    // srefBinding: string = '';
  }
