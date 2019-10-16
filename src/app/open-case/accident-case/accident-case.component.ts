import { AppConfig } from './../../../environments/environment';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accident-case',
  templateUrl: './accident-case.component.html',
  styleUrls: ['./accident-case.component.scss']
})
export class AccidentCaseComponent implements OnInit {

  accidentForm: FormGroup = this.fb.group({
    clientName: ["", Validators.required],
    identityCardNumber: ["", Validators.required],
    accidentDate: ["", Validators.required],
    licensePlateNumber: ["", Validators.required]

  })

  isProduction = AppConfig.production

  constructor(
    private fb: FormBuilder,
    private router: Router
    ) { }
  
  
  submit() {
    console.info('Tried to do something')
  }  

  resetForm(){
    this.accidentForm.reset({
      clientName: "",
      identityCardNumber: "",
      accidentDate: "",
      licensePlateNumber: ""
    })
  }

  ngOnInit() {
    
  }

}
