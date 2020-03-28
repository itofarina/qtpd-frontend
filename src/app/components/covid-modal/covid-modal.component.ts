import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-covid-modal',
  templateUrl: './covid-modal.component.html'
})
export class CovidModalComponent implements OnInit {

  @ViewChild('CovidModal', { static: true }) covidModal: ModalDirective;

  constructor() { }

  closeModal() {
    this.covidModal.hide();
  }

  openModal() {
    this.covidModal.show();
  }

  ngOnInit() {
  }

}
