import { LogInService } from '../services/log-in-service/log-in.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private logInService: LogInService
  ) { }


  openCaseFormControl = {
    caseType : ["",Validators.required]
  }

  CaseTypeKeys: string[] = []
  caseForm:FormGroup 
  

  async updateForm() {
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
