import { RouterTestingModule } from '@angular/router/testing';
import { LogInService } from './../services/log-in-service/log-in.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let service: LogInService
  const routerSpy = jasmine.createSpyObj('Router', ['navigate'])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogInComponent],
      providers: [
        FormBuilder, 
        {provide: Router, useClass: RouterTestingModule}, //checkroutertestingmodule with routes.
        // {provide: Router, useClass: routerSpy},
        // Router,
        LogInService,
        {provide: HttpClient, useClass: HttpClientTestingModule}], 
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
    service = TestBed.get(LogInService)
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('token',"tokenValue")
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with two controls', () => {
    expect(component.logInForm.contains('username')).toBeTruthy()
    expect(component.logInForm.contains('password')).toBeTruthy()
  })

  it('should make the "name" control required', () => {
    let control = component.logInForm.get('username')
    control.setValue("");
    expect(control.valid).toBeFalsy()
  })

  it('should make the "password" control required', () => {
    let control = component.logInForm.get('password')
    control.setValue("");
    expect(control.valid).toBeFalsy()
  })

  it('token should be deleted upon landing', () => {
    component.ngOnInit()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('should attempt to navigate to /opencase', () => {
    spyOn(service, 'getAccess').and.returnValue(of(true))



    component.onSubmit()
    

    // expect(spy).toHaveBeenCalledWith(['/opencase'])



  })

  // Add in html clicking for close app & submit

});
