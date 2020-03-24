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
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.longitud, this.latitud],
      zoom: 15.5,
      pitch: 45,
      bearing: 17.6,
      antialias: true
    });

    const marker = new mapboxgl.Marker({
      draggable: false
    })
    .setLngLat([this.longitud, this.latitud])
    .addTo(map);

    map.on('load', () => {

      map.resize();

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      let labelLayerId: any;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < layers.length; i++) {

        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }

      }

      map.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {

            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6

          }

        },

        labelLayerId

      );

    });

  }

}
