import { Component, OnInit, ViewChild } from '@angular/core';
import { CentersService } from '../../services/centers/centers.service';
import { CenterInfoComponent } from '../../components/center-info/center-info.component';
import { Center } from '../../models/center';

@Component({
  selector: 'app-search-center',
  templateUrl: './search-center.component.html',
})
export class SearchCenterComponent implements OnInit {
  @ViewChild('centerInfoModal', { static: true }) centerInfoModal: CenterInfoComponent;
  centersResult = [];
  loading = false;
  query = '';

  constructor(private _centersService: CentersService) { }

  ngOnInit() {
    this.searchCentersByQuery();
  }

  getIdSummary(id: string): string {
    return id.length > 6 ? id.slice(0, 6) : id;
  }

  searchCentersByQuery() {
    this.loading = true;
    this._centersService.searchCentersByQuery(this.query).subscribe(centers => {
      this.centersResult = centers;
      this.loading = false;
    });
  }

  showCenterInfo(center: any) {
    this.centerInfoModal.center = center;
    this.centerInfoModal.openModal();
  }

}
