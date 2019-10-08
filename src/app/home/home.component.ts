
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName:string = "None";
  passWord:string = "None";
  logInForm = this.fb.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router) { }

  onSubmit(){
    console.warn("Username: ", this.logInForm.get('userName').value)
    console.warn("Password: ", this.logInForm.get('passWord').value)
    this.router.navigate(['/opencase'])
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
  }

}
