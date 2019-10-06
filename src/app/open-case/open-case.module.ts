import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenCaseRoutingModule } from './open-case-routing.module';
import { OpenCaseComponent } from './open-case/open-case.component';
import { OpenCaseConfirmComponent } from './open-case-confirm/open-case-confirm.component';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [OpenCaseComponent, OpenCaseConfirmComponent],
  imports: [
    CommonModule,
    OpenCaseRoutingModule,
    MatSelectModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OpenCaseModule { }
