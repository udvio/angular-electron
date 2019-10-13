import { LogInService } from './../services/log-in.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
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
  headers
  async onSubmit(){
    this.logInErrorMessage = ""
    let formObj = this.logInForm.getRawValue()
    console.info("onSubmit logs: ", formObj)
    
    this.logInService.getAccess(formObj)
    .subscribe(
      res => {
        console.info("This is the response", res);
        localStorage.setItem('token', res['token']);
        this.router.navigate(['/opencase'])
      },
      err => {console.log("This is the error", err); this.logInErrorMessage="Wrong Username & Password combo"}
      )
    
    // .subscribe( resp => console.info(resp))
    // .subscribe( resp => this.headers = resp)
   
    // console.warn("Username: ", this.logInForm.get('username').value)
    // console.warn("Password: ", this.logInForm.get('password').value)
    // 
    // this.userName = this.logInForm.get('userName').value
    // this.passWord = this.logInForm.get('passWord').value
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
