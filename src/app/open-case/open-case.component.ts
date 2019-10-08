import { OpenCaseService } from './../open-case.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-open-case',
  templateUrl: './open-case.component.html',
  styleUrls: ['./open-case.component.scss']
})
export class OpenCaseComponent implements OnInit {
  caseForm:FormGroup


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private openCaseService: OpenCaseService
  ) { }
  CaseTypeKeys = []
  CaseTypes

  goForward() {
    console.warn(this.router.url)
    this.openCaseService.sendFormItems(this.caseForm)
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
    for (let caseFields of this.CaseTypes[this.caseForm.get('accidentType').value]) {
      this.caseForm.addControl(caseFields.fieldIdentifier, new FormControl("",Validators.required))
    }

  }

  ngOnInit() {
    this.caseForm = this.openCaseService.getFormItems();
    this.CaseTypes = this.openCaseService.getCaseTypes();
    for (let keyValue in this.CaseTypes){
      this.CaseTypeKeys.push(keyValue)
    }
    
    

  }

}
