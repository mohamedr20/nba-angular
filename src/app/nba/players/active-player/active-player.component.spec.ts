import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlayerComponent } from './active-player.component';

describe('ActivePlayerComponent', () => {
  let component: ActivePlayerComponent;
  let fixture: ComponentFixture<ActivePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
