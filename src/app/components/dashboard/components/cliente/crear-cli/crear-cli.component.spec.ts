import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCliComponent } from './crear-cli.component';

describe('CrearCliComponent', () => {
  let component: CrearCliComponent;
  let fixture: ComponentFixture<CrearCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
