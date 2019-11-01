import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser'
import { LogInService } from './../services/log-in-service/log-in.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';

class routerStub {
  navigate(params) {

  }
}

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let service: LogInService
  let snackService: MatSnackBar
  let routeService: any

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogInComponent],
      providers: [
        FormBuilder, 
        { provide: Router, useClass:routerStub },
        // {provide: Router, useClass: RouterTestingModule}, //checkroutertestingmodule with routes.
        // {provide: Router, useClass: routerSpy},
        // Router,
        LogInService,
        {provide: HttpClient, useClass: HttpClientTestingModule}], 
      imports: [TranslateModule.forRoot(), MatSnackBarModule]
    }).compileComponents();
    service = TestBed.get(LogInService)
    snackService = TestBed.get(MatSnackBar)
    routeService = TestBed.get(Router)
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
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

  it('should delete log in token upon loading page/component', () => {
    component.ngOnInit()
    expect(localStorage.getItem('token')).toBeNull()
  })

  xit('should attempt to navigate to /opencase after key in correct credentials', () => {
    spyOn(service, 'getAccess').and.returnValue(of(true))
    spyOn(routeService, 'navigate')
    
    let de = fixture.debugElement.query(By.css('#logInButton'))

    component.logInForm.controls['username'].setValue("test")
    component.logInForm.controls['password'].setValue("test")

    de.triggerEventHandler('click',null)

    expect(routeService.navigate).toHaveBeenCalled()

  })

  it('should render SnackBar with correct ErrorMessage when wrong credentials keyed in', () => {
    let de = fixture.debugElement.query(By.css('#logInButton'))
    let myErrorValue: string = "ERROR STRING"
    spyOn(component, 'onSubmit').and.callThrough()
    spyOn(service, 'getAccess').and.returnValue(throwError(myErrorValue))
    spyOn(snackService, 'open')
    

    component.logInForm.controls['username'].setValue("test")
    component.logInForm.controls['password'].setValue("test")

    expect(component.logInForm.valid).toBe(true)
    de.triggerEventHandler('click',null)

    
    expect(service.getAccess).toHaveBeenCalled()
    expect(snackService.open).toHaveBeenCalledWith(myErrorValue, "Close", {duration: 5000})
  })

  // Add in html clicking for close app & submit

});
