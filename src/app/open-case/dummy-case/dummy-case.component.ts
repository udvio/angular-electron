import { AppConfig } from './../../../environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy-case',
  templateUrl: './dummy-case.component.html',
  styleUrls: ['./dummy-case.component.scss']
})
export class DummyCaseComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  
  
  dummyForm: FormGroup = this.fb.group({
    dummy1: ["", Validators.required],
    dummy2: ["", Validators.required],
    dummy3: ["", Validators.required]

  })

  isProduction = AppConfig.production

  goForward() {
    console.info('Tried to submit')
  }

  resetForm(){
    this.dummyForm.reset({
      dummy1: "",
      dummy2: "",
      dummy3: ""
    })
  }
  ngOnInit() {
  }


}
