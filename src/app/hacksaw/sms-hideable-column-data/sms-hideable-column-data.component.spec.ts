import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsHideableColumnDataComponent } from './sms-hideable-column-data.component';

describe('SmsHideableColumnDataComponent', () => {
  let component: SmsHideableColumnDataComponent;
  let fixture: ComponentFixture<SmsHideableColumnDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsHideableColumnDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsHideableColumnDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
