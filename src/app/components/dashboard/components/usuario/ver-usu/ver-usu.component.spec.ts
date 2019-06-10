import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuComponent } from './ver-usu.component';

describe('VerUsuComponent', () => {
  let component: VerUsuComponent;
  let fixture: ComponentFixture<VerUsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerUsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
