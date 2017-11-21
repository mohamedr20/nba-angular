import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallRankComponent } from './overall-rank.component';

describe('OverallRankComponent', () => {
  let component: OverallRankComponent;
  let fixture: ComponentFixture<OverallRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
