import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenCaseComponent } from './open-case.component';


const routes: Routes = [
  {
    path: '',
    component: OpenCaseComponent,
    // component: OpenCaseConfirmComponent

    // children: [
    //   {
    //     path:'opencaseconfirm',
    //     component: OpenCaseConfirmComponent
    //   }
    // ]
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenCaseRoutingModule { }
