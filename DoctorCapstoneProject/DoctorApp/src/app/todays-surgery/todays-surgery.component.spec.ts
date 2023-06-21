import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysSurgeryComponent } from './todays-surgery.component';

describe('TodaysSurgeryComponent', () => {
  let component: TodaysSurgeryComponent;
  let fixture: ComponentFixture<TodaysSurgeryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodaysSurgeryComponent]
    });
    fixture = TestBed.createComponent(TodaysSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
