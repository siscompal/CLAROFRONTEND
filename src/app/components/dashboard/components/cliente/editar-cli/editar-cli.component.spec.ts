import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCliComponent } from './editar-cli.component';

describe('EditarCliComponent', () => {
  let component: EditarCliComponent;
  let fixture: ComponentFixture<EditarCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
