import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartosClientesComponent } from './repartos-clientes.component';

describe('RepartosClientesComponent', () => {
  let component: RepartosClientesComponent;
  let fixture: ComponentFixture<RepartosClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepartosClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
