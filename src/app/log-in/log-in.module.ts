import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './log-in-routing.module';

import { LogInComponent } from './log-in.component';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [LogInComponent],
  imports: [CommonModule, SharedModule, LoginRoutingModule, BrowserModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, MatSnackBarModule]
})
export class LogInModule {}
