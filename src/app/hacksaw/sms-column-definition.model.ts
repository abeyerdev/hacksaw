import { SmsColumnVisibility } from "./sms-column-visibility.model";

export class SmsColumnDefinition {
    name = '';
    value = '';
    binding = '';
    filter = '';
    isNumeric = false;
    visibility = new SmsColumnVisibility();
  }