import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCliComponent } from './ver-cli.component';

describe('VerCliComponent', () => {
  let component: VerCliComponent;
  let fixture: ComponentFixture<VerCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
