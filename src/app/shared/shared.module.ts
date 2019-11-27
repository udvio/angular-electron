import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, LogoutComponent],
  imports: [CommonModule, TranslateModule,MatButtonModule],
  exports: [TranslateModule, WebviewDirective]
})
export class SharedModule {}
