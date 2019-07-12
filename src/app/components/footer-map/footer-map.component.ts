import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-map',
  templateUrl: './footer-map.component.html',
  styleUrls: []
})
export class FooterMapComponent implements OnInit {

  currentDate = new Date();
  constructor() { }

  ngOnInit() {
  }

}
