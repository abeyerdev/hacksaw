import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSortableColumnComponent } from './sms-sortable-column.component';

describe('SmsSortableColumnComponent', () => {
  let component: SmsSortableColumnComponent;
  let fixture: ComponentFixture<SmsSortableColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsSortableColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSortableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
