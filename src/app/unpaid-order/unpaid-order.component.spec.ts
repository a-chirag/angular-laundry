import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidOrderComponent } from './unpaid-order.component';

describe('UnpaidOrderComponent', () => {
  let component: UnpaidOrderComponent;
  let fixture: ComponentFixture<UnpaidOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
