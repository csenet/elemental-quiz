import {
  PagesComponent
} from './pages.component';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'hoge',
        loadChildren: () =>
          import('./hoge/hoge.module').then((m) => m.HogeModule),
      },
      {
        path: 'show',
        loadChildren: () =>
          import('./question-show/question-show.module').then((m) => m.QuestionShowModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
