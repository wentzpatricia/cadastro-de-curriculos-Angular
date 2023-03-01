import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: 'resume-list',
    loadChildren: () =>
      import('./resume-list/resume-list.module').then(
        (m) => m.ResumeListModule
      ),
  },
  {
    path: '**',
    redirectTo: '/form',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
