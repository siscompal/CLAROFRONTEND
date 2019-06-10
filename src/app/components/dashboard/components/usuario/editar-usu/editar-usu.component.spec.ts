import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuComponent } from './editar-usu.component';

describe('EditarUsuComponent', () => {
  let component: EditarUsuComponent;
  let fixture: ComponentFixture<EditarUsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarUsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
