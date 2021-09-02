import { DepFlags } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmService } from './confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input() text!: string;
  @Input() isOK!: boolean;

  constructor() { }

  ngOnInit() {
  }

}
