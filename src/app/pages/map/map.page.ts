import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

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

}
