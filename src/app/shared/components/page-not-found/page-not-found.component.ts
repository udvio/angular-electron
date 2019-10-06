import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private location: Location, private router: Router) {}

  goBack() {
    this.location.back()
  }

  printLocation() {
    console.warn(this.router.url)
  }

  ngOnInit() {}
}
