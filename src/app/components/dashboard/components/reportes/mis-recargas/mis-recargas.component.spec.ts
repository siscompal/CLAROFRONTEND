import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRecargasComponent } from './mis-recargas.component';

describe('MisRecargasComponent', () => {
  let component: MisRecargasComponent;
  let fixture: ComponentFixture<MisRecargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisRecargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRecargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
