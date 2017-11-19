import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaTableComponent } from './nba-table.component';

describe('NbaTableComponent', () => {
  let component: NbaTableComponent;
  let fixture: ComponentFixture<NbaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
