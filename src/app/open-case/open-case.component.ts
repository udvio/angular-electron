import { LogInService } from '../services/log-in-service/log-in.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSelect } from '@angular/material/select';

export const CaseType =
{  
  Accident : 'Accident',
  Dummy: 'Dummy'
}

@Component({
  selector: 'app-open-case',
  templateUrl: './open-case.component.html',
  styleUrls: ['./open-case.component.scss']
})
export class OpenCaseComponent implements OnInit {
  // For testing purposes
  @ViewChild(MatSelect, {static:true}) public matSelect: MatSelect;
  
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }


  openCaseFormControl = {
    caseType : ["",Validators.required]
  }

  CaseTypeKeys: string[] = []
  caseForm:FormGroup 
  

  updateForm() {
    this.router.navigate(['opencase',this.caseForm.get('caseType').value])
  }


  ngOnInit() {

    Object.keys(CaseType).map(eachCase => {
      this.CaseTypeKeys.push(eachCase)
    });
    this.caseForm = this.fb.group(this.openCaseFormControl)
    this.caseForm.valueChanges.subscribe(newVal => console.info(newVal))
  }

}
