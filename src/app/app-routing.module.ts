import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { OpenCaseComponent } from './open-case/open-case/open-case.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'opencase',
    loadChildren: () => import('./open-case/open-case.module').then(module => module.OpenCaseModule)
    // component: OpenCaseComponent,
    // pathMatch:'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
