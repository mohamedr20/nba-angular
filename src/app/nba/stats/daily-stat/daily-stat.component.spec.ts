import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStatComponent } from './daily-stat.component';

describe('DailyStatComponent', () => {
  let component: DailyStatComponent;
  let fixture: ComponentFixture<DailyStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
