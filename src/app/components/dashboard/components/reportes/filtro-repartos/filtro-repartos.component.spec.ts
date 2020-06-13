import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRepartosComponent } from './filtro-repartos.component';

describe('FiltroRepartosComponent', () => {
  let component: FiltroRepartosComponent;
  let fixture: ComponentFixture<FiltroRepartosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroRepartosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRepartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
