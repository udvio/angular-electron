import { LogInService } from './../services/log-in.service';
import { CaseTypeKeys } from './caseFields';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


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


  CaseTypeKeys=CaseTypeKeys //Need this, to allow Angular to read the values in html
  caseForm:FormGroup 
  

  async updateForm() {
    this.router.navigate(['opencase',this.caseForm.get('accidentType').value])
  }


  ngOnInit() {
    this.caseForm = this.fb.group({
      accidentType : ["",Validators.required]
    })
    this.caseForm.valueChanges.subscribe(newVal => console.info(newVal))
  }

}
