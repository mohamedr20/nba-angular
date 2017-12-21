import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeStatsComponent } from './cumulative-stats.component';

describe('CumulativeStatsComponent', () => {
  let component: CumulativeStatsComponent;
  let fixture: ComponentFixture<CumulativeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativeStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
