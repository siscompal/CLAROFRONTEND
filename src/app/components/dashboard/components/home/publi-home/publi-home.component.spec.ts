import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliHomeComponent } from './publi-home.component';

describe('PubliHomeComponent', () => {
  let component: PubliHomeComponent;
  let fixture: ComponentFixture<PubliHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubliHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubliHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
