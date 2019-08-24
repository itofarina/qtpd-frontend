import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from './services/analytics.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public analyticsService: AnalyticsService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
    const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/es|en/) ? browserLang : 'en');
    translate.use('es');
  }

  ngOnInit() {
    if (environment.environment.toLowerCase() === 'production') {
      this.analyticsService.init();
    }
  }
}
