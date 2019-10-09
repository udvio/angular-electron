import { AccidentCaseComponent } from './accident-case/accident-case.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenCaseComponent } from './open-case.component';
import { DummyCaseComponent } from './dummy-case/dummy-case.component';


const routes: Routes = [
  {
    path: '',
    component: OpenCaseComponent,

    children: [
      {
        path:'Accident',
        component: AccidentCaseComponent
      },
      {
        path:'Dummy',
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
