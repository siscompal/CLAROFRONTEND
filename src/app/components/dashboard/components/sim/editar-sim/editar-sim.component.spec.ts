import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSimComponent } from './editar-sim.component';

describe('EditarSimComponent', () => {
  let component: EditarSimComponent;
  let fixture: ComponentFixture<EditarSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
