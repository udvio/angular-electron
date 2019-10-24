import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCaseComponent } from './open-case.component';

describe('OpenCaseComponent', () => {
  let component: OpenCaseComponent;
  let fixture: ComponentFixture<OpenCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCaseComponent ],
      providers: [
        { provide: Router, useClass: RouterTestingModule},
        FormBuilder
      ]

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
