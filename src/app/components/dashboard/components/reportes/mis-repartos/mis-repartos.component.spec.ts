import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRepartosComponent } from './mis-repartos.component';

describe('MisRepartosComponent', () => {
  let component: MisRepartosComponent;
  let fixture: ComponentFixture<MisRepartosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisRepartosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRepartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
