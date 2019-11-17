import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStatusRoutingModule } from './case-status-routing.module';
import { CaseStatusComponent } from './case-status/case-status.component';
import { CaseIndexComponent } from './case-index/case-index.component';
// import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [CaseStatusComponent, CaseIndexComponent],
  imports: [
    CommonModule,
    CaseStatusRoutingModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    // MatTableModule
  ]
})
export class CaseStatusModule { }
