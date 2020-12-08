import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/file-upload', pathMatch: 'full' },
  {
    path: 'file-upload',
    loadChildren: () =>
      import('./layouts/file-upload/file-upload.module').then(
        (m) => m.FileUploadModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
