import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ICaseFields } from './open-case/caseFields';

@Injectable({
  providedIn: 'root'
})
export class OpenCaseService {
  constructor(public fb: FormBuilder) { }
  
  caseForm = this.fb.group({
    accidentType : ["",Validators.required]
  }
  )


  CaseTypes = {
    "Accident":[
      {
        fieldDisplay: "Name",
        priority: 1,
        fieldIdentifier: "clientName",
        fieldType: "string"
      },
      {
        fieldDisplay: "Identity Card #",
        priority: 2,
        fieldIdentifier: "accidentDate",
        fieldType: "string"
      },
      {
        fieldDisplay: "License Plate #",
        priority: 4,
        fieldIdentifier: "licensePlateNumber",
        fieldType: "string"
      },
      {
        fieldDisplay: "Accident Date",
        priority: 3,
        fieldIdentifier: "accidentDate",
        fieldType: "date"
      }],
    
    "Other": [
      {
        fieldDisplay: "Dummy 1",
        priority: 1,
        fieldIdentifier: "dummy1",
        fieldType: "string"
      },
      {
        fieldDisplay: "Dummy 2",
        priority: 2,
        fieldIdentifier: "dummy2",
        fieldType: "date"
      },
      {
        fieldDisplay: "Dummy 3",
        priority: 3,
        fieldIdentifier: "dummy3",
        fieldType: "string"
      }
    ]
  }




  
  getFormItems(){
    return this.caseForm
  }

  getCaseTypes(){
    return this.CaseTypes
  }

  checkValues() {
    console.info(this.caseForm.value) //Tochange
  }

  removeGroups() {
    let exv = this.caseForm.value
    for (var i in exv) {
      if (i != "accidentType") {
        this.caseForm.removeControl(i)
        console.warn("removed ", i)
      }
    }
  }
  
  
  sendFormItems(input:FormGroup){
    this.caseForm = input
  }
}