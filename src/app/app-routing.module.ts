import { CaseIndexComponent } from './case-status/case-index/case-index.component';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { CaseStatusComponent } from './case-status/case-status/case-status.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'opencase',
    loadChildren: () => import('./open-case/open-case.module').then(module => module.OpenCaseModule)
    // component: OpenCaseComponent,
    // pathMatch:'full'
  },
  {
    path:'case-index',
    component: CaseIndexComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path:'case-status/:firm/:typ/:id',
    component: CaseStatusComponent,
    canActivate: [AuthGuard],
    // pathMatch: 'full'
    // loadChildren: () => import('./case-status/case-status.module').then(module => module.CaseStatusModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],  // enableTracing: true
  exports: [RouterModule]
})
export class AppRoutingModule {}
