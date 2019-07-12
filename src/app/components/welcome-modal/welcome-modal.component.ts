import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html'
})
export class WelcomeModalComponent implements OnInit {

  @ViewChild('welcomeModal', { static: true }) welcomeModal: ModalDirective;

  constructor() { }

  closeModal() {
    this.welcomeModal.hide();
  }

  openModal() {
    this.welcomeModal.show();
  }

  ngOnInit() {
  }

}
