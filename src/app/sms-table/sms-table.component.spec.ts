import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTableComponent } from './sms-table.component';

describe('SmsTableComponent', () => {
  let component: SmsTableComponent;
  let fixture: ComponentFixture<SmsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
