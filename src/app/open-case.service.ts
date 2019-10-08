import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ICaseFields, CaseTypes } from './open-case/caseFields';

@Injectable({
  providedIn: 'root'
})
export class OpenCaseService {
  constructor(public fb: FormBuilder) { }
  
  caseForm = this.fb.group({
    accidentType : ["",Validators.required]
  }
  )

  getFormItems(){
    return this.caseForm
  }

  getCaseTypes(){
    return CaseTypes
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