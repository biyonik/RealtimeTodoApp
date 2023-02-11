import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(module => module.PublicModule)
  },
  {
    path: 'private',
    loadChildren: () => import('./private/private.module').then(module => module.PrivateModule)
  },
  {
    path: '**',
    redirectTo: 'public',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
