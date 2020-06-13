import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRecargasComponent } from './filtro-recargas.component';

describe('FiltroRecargasComponent', () => {
  let component: FiltroRecargasComponent;
  let fixture: ComponentFixture<FiltroRecargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroRecargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRecargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
