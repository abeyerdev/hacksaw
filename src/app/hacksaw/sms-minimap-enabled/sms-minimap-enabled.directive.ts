import { Directive } from '@angular/core';
import { SmsMinimapService } from '../sms-minimap/sms-minimap.service';

@Directive({ selector: '[sms-minimap-enabled]' })
export class SmsMinimapEnabledDirective {
    constructor(private smsMinimapService: SmsMinimapService) { }
}