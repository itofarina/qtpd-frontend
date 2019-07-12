import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-no-map',
  templateUrl: './footer-no-map.component.html',
  styleUrls: []
})
export class FooterNoMapComponent implements OnInit {

  currentDate = new Date();
  constructor() { }

  ngOnInit() {
  }

}
