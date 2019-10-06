import { Fields } from './../caseFields';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ICaseFields } from '../caseFields';



@Component({
  selector: 'app-open-case',
  templateUrl: './open-case.component.html',
  styleUrls: ['./open-case.component.scss']
})
export class OpenCaseComponent implements OnInit {
  caseForm = this.formBuilder.group({
    accidentType : ["",Validators.required],
    somethingTrial : [""]
    })

  activeCaseTypeFormFields : Fields[]
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  CaseTypes: ICaseFields[] = [
    {
        caseType: "Accident",
        fields: [{
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
        },
        ]
    },
    {
        caseType: "Other",
        fields: [{
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
        ]}
] 


  goForward() {
    console.warn(this.router.url)
    this.router.navigate(['opencaseconfirm'], {relativeTo: this.route})
  }

  checkValues() {
    console.info(this.caseForm.value)
  }

  resetForm(){
    this.removeGroups()
    this.caseForm.reset({accidentType : ""})
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

  async updateForm() {
    console.warn("the new value is", this.caseForm.get('accidentType').value)
    await this.removeGroups()
    let chosenCaseType 
    for (let CASES of this.CaseTypes) {
      if (CASES.caseType.valueOf() == this.caseForm.value.accidentType) {
        chosenCaseType = CASES
        this.activeCaseTypeFormFields = CASES.fields
      }
    }

    for (let caseFields of chosenCaseType.fields) {
      this.caseForm.addControl(caseFields.fieldIdentifier, new FormControl("",Validators.required))
    }

  }

  ngOnInit() {

  }

}
