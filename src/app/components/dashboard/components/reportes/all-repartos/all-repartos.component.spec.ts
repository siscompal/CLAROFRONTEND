import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRepartosComponent } from './all-repartos.component';

describe('AllRepartosComponent', () => {
  let component: AllRepartosComponent;
  let fixture: ComponentFixture<AllRepartosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRepartosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRepartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
