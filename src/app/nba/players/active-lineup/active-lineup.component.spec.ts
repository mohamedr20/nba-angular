import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLineupComponent } from './active-lineup.component';

describe('ActiveLineupComponent', () => {
  let component: ActiveLineupComponent;
  let fixture: ComponentFixture<ActiveLineupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveLineupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveLineupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
