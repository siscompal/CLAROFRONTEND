import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AseHomeComponent } from './ase-home.component';

describe('AseHomeComponent', () => {
  let component: AseHomeComponent;
  let fixture: ComponentFixture<AseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AseHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
