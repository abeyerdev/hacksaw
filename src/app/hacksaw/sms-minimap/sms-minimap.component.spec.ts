import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsMinimapComponent } from './sms-minimap.component';

describe('SmsMinimapComponent', () => {
  let component: SmsMinimapComponent;
  let fixture: ComponentFixture<SmsMinimapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsMinimapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsMinimapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
