import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsMinimapColumnsComponent } from './sms-minimap-columns.component';

describe('SmsMinimapColumnsComponent', () => {
  let component: SmsMinimapColumnsComponent;
  let fixture: ComponentFixture<SmsMinimapColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsMinimapColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsMinimapColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
