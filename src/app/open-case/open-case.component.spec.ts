import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCaseComponent } from './open-case.component';

describe('OpenCaseComponent', () => {
  let component: OpenCaseComponent;
  let fixture: ComponentFixture<OpenCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
