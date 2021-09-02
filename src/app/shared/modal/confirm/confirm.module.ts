import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from './confirm.service';
import { ConfirmComponent } from './confirm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  providers: [ConfirmService],
  entryComponents: [ConfirmComponent]
})
export class ConfirmModule { }
