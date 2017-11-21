import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayoffComponent } from './playoff.component';

describe('PlayoffComponent', () => {
  let component: PlayoffComponent;
  let fixture: ComponentFixture<PlayoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
