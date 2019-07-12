import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
// Models
import { Center } from '../../models/center';

@Component({
  selector: 'app-center-info',
  templateUrl: './center-info.component.html'
})
export class CenterInfoComponent {

  center: Center = new Center();
  @ViewChild('centerInfoModal', { static: true }) centerInfoModal: ModalDirective;

  constructor() { }

  closeModal() {
    this.centerInfoModal.hide();
  }

  openModal() {
    this.centerInfoModal.show();
  }

}
