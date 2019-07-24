import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarSimComponent } from './activar-sim.component';

describe('ActivarSimComponent', () => {
  let component: ActivarSimComponent;
  let fixture: ComponentFixture<ActivarSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivarSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivarSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
