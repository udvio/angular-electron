import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentCaseComponent } from './accident-case.component';

describe('AccidentCaseComponent', () => {
  let component: AccidentCaseComponent;
  let fixture: ComponentFixture<AccidentCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentCaseComponent ],
      providers: [
        FormBuilder, 
        { provide: Router, useClass: RouterTestingModule}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
