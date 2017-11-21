import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaStandingsComponent } from './nba-standings.component';

describe('NbaStandingsComponent', () => {
  let component: NbaStandingsComponent;
  let fixture: ComponentFixture<NbaStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbaStandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
