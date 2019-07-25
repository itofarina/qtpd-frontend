import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DonationTypesService } from '../../services/donation-types/donation-types.service';
import { DonationTypeFilter } from '../../models/donation-type';
import { DonationsAndDistanceFilter } from '../../models/center-filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: []
})
export class FiltersComponent implements OnInit {

  donationTypesFilter: DonationTypeFilter[] = [];
  donationsAndDistanceFilter: DonationsAndDistanceFilter = new DonationsAndDistanceFilter();
  @Output() filtersUpdated: EventEmitter<DonationsAndDistanceFilter> = new EventEmitter();
  loadingDonationTypes = true;
  showAll = true;

  constructor(public _donationTypesService: DonationTypesService) {
    // subscribe to any changes in the filters  array
    this._donationTypesService.donationTypesNewValue.subscribe((dTypesData: any) => {
      this.loadingDonationTypes = false;
      this.donationTypesFilter = dTypesData as DonationTypeFilter[];
    });
  }

  ngOnInit() {
    // the filters are the ones that are defined in the service
    this.donationTypesFilter = this._donationTypesService.donationTypes as DonationTypeFilter[];
  }


  emitNewFilters() {
    if (this.showAll) {
      this.filtersUpdated.emit(new DonationsAndDistanceFilter([], 10000));
    } else {
      this.filtersUpdated.emit(this.donationsAndDistanceFilter);
    }
  }

  showAllCenters() {
    this.donationsAndDistanceFilter.maxDistance = 100;
    this.showAll = true;
    this.emitNewFilters();
  }

  updateDistance() {
    this.showAll = false;
    this.emitNewFilters();
  }

  updateDonationTypesFilters() {
    this.showAll = false;
    this.donationsAndDistanceFilter.donationTypes = this.donationTypesFilter.filter(x => x.checked).map(x => x._id);
    this.emitNewFilters();
  }
}
