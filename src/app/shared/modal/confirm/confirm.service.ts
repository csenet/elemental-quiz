import { ConfirmComponent } from './confirm.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(public modalService: NgbModal) { }

  modalRef!: NgbModalRef;

  public async show(flag: boolean) {
    // Modalを表示する
    this.modalRef = this.modalService.open(ConfirmComponent);
    const component = this.modalRef.componentInstance as ConfirmComponent;
    if (component != null) {
      component.text = flag ? '○正解！' : '☓不正解'
      component.isOK = flag
    }
    await new Promise(resolve => setTimeout(resolve, 800))
    this.modalRef.close()
  }
}

