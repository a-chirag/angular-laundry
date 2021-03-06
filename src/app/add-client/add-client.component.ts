import {ClientService} from '../client.service';
import {Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import {AddClient} from '../addclient';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper} from '@agm/core';
import {FormControl} from '@angular/forms';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  sex = [
    {value: '0', viewValue: 'Male'},
    {value: '1', viewValue: 'Female'}
  ];
  igst = [
    {value: '0', viewValue: 'SGST'},
    {value: '1', viewValue: 'IGST'}
  ];
  ageRange = [
    {value: '0', viewValue: 'Below 25'},
    {value: '1', viewValue: '25-40'},
    {value: '2', viewValue: 'Above 40'}
  ];
  clientdetails: AddClient;
  searchControl: FormControl;
  submitDisabled= false;
  zoom: number;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private clientService: ClientService, private route: ActivatedRoute,
    private router: Router) {}
autocomplete: any;
  ngOnInit() {
    this.zoom = 16;
    this.searchControl = new FormControl();
    this.setCurrentPosition();
    this.clientdetails = new AddClient();
    this.clientdetails.regDate = new Date();
    this.clientdetails.lat = 22.2267825;
    this.clientdetails.lng = 84.8486653;
    this.mapsAPILoader.load().then(() => {
       this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.clientdetails.lat = place.geometry.location.lat();
          this.clientdetails.lng = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }
  submitClient(): void {
    this.submitDisabled = true;
    this.clientService.postAddClient(this.clientdetails).subscribe(data => {console.log(data); this.router.navigate(['/']);});
  }
  MapReady($event){
      this.autocomplete.setBounds($event);
  }
  placeMarker($event) {
    this.clientdetails.lat = $event.coords.lat;
    this.clientdetails.lng = $event.coords.lng;
    console.log(this.clientdetails.lat);
    console.log(this.clientdetails.lng);
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.clientdetails.lat = position.coords.latitude;
        this.clientdetails.lng = position.coords.longitude;
        this.zoom = 18;
      });
    } else{
      this.clientdetails.lat = 22.2267825;
        this.clientdetails.lng = 84.8486653;
        this.zoom = 18;
    }
  }

}
