import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCaseConfirmComponent } from './open-case-confirm.component';

describe('OpenCaseConfirmComponent', () => {
  let component: OpenCaseConfirmComponent;
  let fixture: ComponentFixture<OpenCaseConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCaseConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCaseConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
