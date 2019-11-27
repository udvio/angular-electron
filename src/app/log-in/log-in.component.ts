import { LogInService } from '../services/log-in-service/log-in.service';
import { MatSnackBar } from '@angular/material/snack-bar'

import { FormBuilder, Validators } from '@angular/forms';
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
  logInErrorMessage: string = 'Im hidden! :D';
  logInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private logInService: LogInService,
    private _snackBar: MatSnackBar) { }

  onSubmit(){
    let formObj = this.logInForm.getRawValue()
    console.info("onSubmit logs: ", formObj)
    
    this.logInService.getAccess(formObj)
    .subscribe(
      res => {
        if (res === true) {
          console.info(`${LogInComponent.name}::${this.onSubmit.name}::response -> ${JSON.stringify(res)}`)
          // this.router.navigate(['/opencase'])
          this.router.navigate(['case-index'])
        } 
      },
      err => {
        console.error(`${LogInComponent.name}::${this.onSubmit.name} -> ${JSON.stringify(err)}`)
        this._snackBar.open(err, "Close", {duration : 5000})
      }
      )
  }

  closeApp(){
    if(AppConfig.production){
      window.close()
    }else{
      console.warn(`${LogInComponent.name}::${this.closeApp.name} -> User tried to Close App`)
    }
  }

  ngOnInit() {
    localStorage.removeItem('token')
  }

}
