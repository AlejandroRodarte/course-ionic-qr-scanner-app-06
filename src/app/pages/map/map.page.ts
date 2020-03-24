import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

declare const mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  public latitud: number;
  public longitud: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    const geo = this.route.snapshot.params.geo as string;
    const [, coords] = geo.split(':');
    const [latitud, longitud] = coords.split(',');

    this.latitud = +latitud;
    this.longitud = +longitud;

  }

  ngAfterViewInit() {

    mapboxgl.accessToken = environment.mapboxApiKey;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });

  }

}
