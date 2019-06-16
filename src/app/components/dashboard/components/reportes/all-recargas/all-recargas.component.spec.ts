import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecargasComponent } from './all-recargas.component';

describe('AllRecargasComponent', () => {
  let component: AllRecargasComponent;
  let fixture: ComponentFixture<AllRecargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRecargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRecargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
