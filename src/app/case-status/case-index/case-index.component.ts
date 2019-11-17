import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-index',
  templateUrl: './case-index.component.html',
  styleUrls: ['./case-index.component.scss']
})
export class CaseIndexComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  moveMe(){
    this.router.navigate(["case-status/lawfirmID/acc/CaseID"])
  }

  ngOnInit() {
  }

}
