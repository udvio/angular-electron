import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterOutlet } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCaseComponent } from './open-case.component';
import { By } from '@angular/platform-browser';
import { routes } from './open-case-routing.module'
import { MatSelect, MatSelectModule, MatSelectTrigger } from '@angular/material/select';
import { MatOptionModule, MatOption } from '@angular/material/core';
import { DebugElement } from '@angular/core';

class routerStub {
  navigate(params) {

  }
}

describe('OpenCaseComponent', () => {
  let component: OpenCaseComponent;
  let fixture: ComponentFixture<OpenCaseComponent>;
  let routerService: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCaseComponent ],
      imports: [ RouterTestingModule.withRoutes([]), MatSelectModule, MatOptionModule, BrowserAnimationsModule ],
      providers: [
        // { provide: Router, useClass: RouterTestingModule},
        {provide: Router, useClass: routerStub},
        FormBuilder
      ]

    })
    .compileComponents();
    routerService = TestBed.get(Router)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router outlet', () => {
    let routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet))
    expect(routerOutlet).not.toBeNull()
  })

  it('should create a Form with caseType as a FormControl', () => {
    expect(component.caseForm.contains('caseType')).toBeTruthy()
  })

  it('should populate mat-select with the correct number of options', () => {
    // component.ngOnInit()
    const options: MatOption[] = component.matSelect.options.toArray()
    expect(options.length).toBe(component.CaseTypeKeys.length)


  })

  it('should run updateForm when user selects a new value', () => {
    // component.ngOnInit()
    const options: MatOption[] = component.matSelect.options.toArray()
    spyOn(component,'updateForm').and.callThrough()
    spyOn(routerService, 'navigate')
    let randomIndex:number = Math.floor(Math.random() * component.CaseTypeKeys.length)


    options[randomIndex]._selectViaInteraction();
    fixture.detectChanges()


    expect(component.updateForm).toHaveBeenCalled()
    

  })

  it('should navigate to the chosen casetype Value', () => {
    // spyOn(component, 'updateForm').and.callThrough()
    spyOn(routerService,'navigate')
    let fakeValue: string = "FakeValue"

    component.caseForm.get('caseType').setValue(fakeValue)

    
    component.updateForm()
    expect(routerService.navigate).toHaveBeenCalledWith(['opencase',fakeValue])

  })

});
