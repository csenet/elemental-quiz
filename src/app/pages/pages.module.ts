import { ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HogeComponent } from './hoge/hoge.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './shared/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { QuestionShowComponent } from './question-show/question-show.component';


@NgModule({
  declarations: [
    PagesComponent,
    HogeComponent,
    NavComponent,
    QuestionShowComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule { }
