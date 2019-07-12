import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor(private router: Router, public _title: Title) { }

  ngOnInit() {
    this.getRouteData().subscribe(data => {
      this._title.setTitle(`¿Qué tenés para dar? :: ${data.title}`);
    });
  }

  getRouteData() {
    return this.router.events.pipe(filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data));
  }

}
