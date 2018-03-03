import { Client } from '../client';
import { ClientService } from '../client.service';
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ElementRef, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit{
  client: Client;
  id : string;
 sex = [
    {value: '0', viewValue: 'Male'},
    {value: '1', viewValue: 'Female'}
  ];
  ageRange = [
    {value: '0', viewValue: 'Below 25'},
    {value: '1', viewValue: '25-40'},
    {value: '2', viewValue: 'Above 40'}
  ];
  searchControl: FormControl;
  zoom: number;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private route: ActivatedRoute,private router : Router, private clientService: ClientService) { 
  this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
    this.zoom = 6;
    this.searchControl = new FormControl();
    this.setCurrentPosition();
     this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.client.lat = place.geometry.location.lat();
          this.client.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  placeMarker($event) {
    this.client.lat = $event.coords.lat;
    this.client.lng = $event.coords.lng;
    console.log(this.client.lat);
    console.log(this.client.lng);
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.client.lat = position.coords.latitude;
        this.client.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
    updateClient(): void {
      this.client.regDate = new Date();
    console.log(this.client.regDate);
    this.clientService.putClient(this.client).subscribe(data => {console.log(data); this.router.navigate(['/']); });

  }

}
