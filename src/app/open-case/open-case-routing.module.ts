import { AuthGuard } from './../auth.guard';
import { AccidentCaseComponent } from './accident-case/accident-case.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenCaseComponent, CaseType } from './open-case.component';
import { DummyCaseComponent } from './dummy-case/dummy-case.component';


const routes: Routes = [
  {
    path: '',
    component: OpenCaseComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: CaseType.Accident,
        component: AccidentCaseComponent
      },
      {
        path: CaseType.Dummy,
        component: DummyCaseComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenCaseRoutingModule { }
