import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarProComponent } from './filtrar-pro.component';

describe('FiltrarProComponent', () => {
  let component: FiltrarProComponent;
  let fixture: ComponentFixture<FiltrarProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrarProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
