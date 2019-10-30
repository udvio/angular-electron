import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenCaseRoutingModule } from './open-case-routing.module';
import { OpenCaseComponent } from './open-case.component';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AccidentCaseComponent } from './accident-case/accident-case.component';
import { DummyCaseComponent } from './dummy-case/dummy-case.component';



@NgModule({
  declarations: [OpenCaseComponent, AccidentCaseComponent, DummyCaseComponent],
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
