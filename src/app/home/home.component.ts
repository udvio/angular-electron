import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  constructor(private fb: FormBuilder) { }

  onSubmit(){
    console.warn("User tried to log in")
    this.userName = this.logInForm.get('userName').value
    this.passWord = this.logInForm.get('passWord').value
  }

  closeApp(){
    console.warn("User tried to close app")
  }

  ngOnInit() {
  }

}
