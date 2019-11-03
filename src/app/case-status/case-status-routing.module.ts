import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../guards/auth-guard/auth.guard';
import { CaseStatusComponent } from './case-status/case-status.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const caseStatusRoutes: Routes = [
  {
    path: 'SHINI BABI',
    component: CaseStatusComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(caseStatusRoutes)
  ]
})
export class CaseStatusRoutingModule { }
