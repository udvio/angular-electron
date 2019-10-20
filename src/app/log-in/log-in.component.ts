import { LogInService } from '../services/log-in-service/log-in.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  userName:string = "None";
  passWord:string = "None";
  logInError: boolean = false;
  logInErrorMessage: string;
  logInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router, private logInService: LogInService) { }

  async onSubmit(){
    this.logInErrorMessage = ""
    let formObj = this.logInForm.getRawValue()
    console.info("onSubmit logs: ", formObj)
    
    this.logInService.getAccess(formObj)
    .subscribe(
      res => {
        if (res === true) {
          console.info("Response: ", res)
          this.router.navigate(['/opencase'])
        } else {
          this.logInErrorMessage="Wrong Username & Password combo"
        }
      },
      err => {console.error(`${LogInComponent.name}::${this.onSubmit.name} -> ${JSON.stringify(err)}`)}
      )
  }

  closeApp(){
    if(AppConfig.production){
      window.close()
    }else{
      console.warn("User tried to close app")
    }
  }

  ngOnInit() {
    localStorage.removeItem('token')
  }

}
