import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private registros: Registro[] = [];

  constructor() { }

  save(format: string, text: string) {

    const registro = new Registro(format, text);
    this.registros.unshift(registro);

    console.log(this.registros);

  }

}
