import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayoDistriHomeComponent } from './mayo-distri-home.component';

describe('MayoDistriHomeComponent', () => {
  let component: MayoDistriHomeComponent;
  let fixture: ComponentFixture<MayoDistriHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayoDistriHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayoDistriHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
