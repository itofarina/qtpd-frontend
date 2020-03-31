import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Services
import { CentersService } from '../../services/centers/centers.service';
// Models
import { CenterFilter, DonationsAndDistanceFilter } from '../../models/center-filter';
import { LocationLatLng, Center } from '../../models/center';
// Components
import { CenterInfoComponent } from '../../components/center-info/center-info.component';
import { WelcomeModalComponent } from '../../components/welcome-modal/welcome-modal.component';
import { CovidModalComponent } from '../../components/covid-modal/covid-modal.component';
import { CenterTypeEnum } from '../../models/enums';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {

  @ViewChild('centerInfoModal', { static: true }) centerInfoModal: CenterInfoComponent;
  @ViewChild('welcomeModal', { static: true }) welcomeModal: WelcomeModalComponent;
  @ViewChild('covidModal', { static: true }) covidModal: CovidModalComponent;
  // initial values for the filters (1000 kms to show all)
  centersFilter: CenterFilter = new CenterFilter([], new LocationLatLng(), 1000);
  keyWelcomeModalKeyWasShown = 'keyWelcomeModalKeyWasShown';
  filteredCenters: Center[] = [];
  initialPosition: LocationLatLng = new LocationLatLng();
  userPosition: LocationLatLng = new LocationLatLng();
  // ====================================
  // map vars - to animate, hide and show information
  // this is a workaround until gam library fixes it, we need to set the animation once the map is ready
  // ====================================
  bounceAnimation: any;
  dropAnimation: any;
  loadingMap = false;
  showMarkerInfo: boolean[] = [];
  showYouAreHereMsg = true;

  constructor(
    public _centersService: CentersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadingMap = true;

    // this feature was added to show only centers by type due to the emergencies of the covid-19
    const centerType = this.route.snapshot.queryParamMap.get('centerType');
    if (centerType && CenterTypeEnum[centerType]) {
      this._centersService.searchCentersByType(centerType)
        .subscribe(centersFiltered => {
          this.filteredCenters = centersFiltered;
        });
    }
    else {
      // show using default location
      this.showFilteredCenters();
      // ask the user for location, if the user allows, we will filter again based in that location and re center the map
      this.getBrowserLocationAndFilter();

      // this.showWelcomeModalIfApplies();
      setTimeout(() => {
        // this timeout is a workaround, if we don't put it, the page fails to render the modal
        this.covidModal.openModal();
      });
    }

  }

  getBrowserLocationAndFilter() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.userPosition.latitude = this.initialPosition.latitude = position.coords.latitude;
          this.userPosition.longitude = this.initialPosition.longitude = position.coords.longitude;
          this.updateFilters();
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    } else {
      this.updateFilters();
    }
  }

  mapIsReady(e) {
    this.bounceAnimation = 'BOUNCE';
    this.dropAnimation = 'DROP';
    this.loadingMap = false;
  }

  newUserPosition(newPosition) {
    this.userPosition.latitude = newPosition.coords.lat;
    this.userPosition.longitude = newPosition.coords.lng;
    this.updateFilters();
  }

  showCenterInfo(center: Center) {
    this.centerInfoModal.center = center;
    this.centerInfoModal.openModal();
  }

  showFilteredCenters() {
    this._centersService.getFilteredCenters(this.centersFilter)
      .subscribe(centersFiltered => {
        this.filteredCenters = centersFiltered;
      });
  }

  showWelcomeModalIfApplies() {
    // we only show the welcome modal if we haven't shown it yet
    const wasShown = localStorage.getItem(this.keyWelcomeModalKeyWasShown) || false;
    if (!wasShown) {
      setTimeout(() => {
        // this timeout is a workaround, if we don't put it, the page fails to render the modal
        this.welcomeModal.openModal();
        localStorage.setItem(this.keyWelcomeModalKeyWasShown, JSON.stringify(true));
      });
    }
  }

  updateFilters(donationsAndDistanceFilter?: DonationsAndDistanceFilter) {
    if (donationsAndDistanceFilter) {
      this.centersFilter.donationTypes = donationsAndDistanceFilter.donationTypes;
      this.centersFilter.maxDistance = donationsAndDistanceFilter.maxDistance;
    }
    this.centersFilter.locationLatLng = this.userPosition;
    // once we have updated the filters, refresh the centers list
    this.showFilteredCenters();
  }

  userMarkerDragging() {
    this.filteredCenters = [];
  }

}
