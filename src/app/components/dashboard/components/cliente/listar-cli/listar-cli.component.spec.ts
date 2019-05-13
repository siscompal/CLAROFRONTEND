import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCliComponent } from './listar-cli.component';

describe('ListarCliComponent', () => {
  let component: ListarCliComponent;
  let fixture: ComponentFixture<ListarCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
