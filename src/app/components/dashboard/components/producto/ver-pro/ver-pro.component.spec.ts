import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProComponent } from './ver-pro.component';

describe('VerProComponent', () => {
  let component: VerProComponent;
  let fixture: ComponentFixture<VerProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
