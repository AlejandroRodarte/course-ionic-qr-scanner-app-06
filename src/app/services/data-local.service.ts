import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private registros: Registro[] = [];

  public registrosChanged = new Subject<void>();

  constructor() { }

  getRegistros(): Registro[] {
    return this.registros.slice();
  }

  save(format: string, text: string) {

    const registro = new Registro(format, text);

    this.registros.unshift(registro);
    this.registrosChanged.next();

    console.log(this.registros);

  }

}
