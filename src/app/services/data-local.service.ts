import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private registros: Registro[] = [];

  public registrosChanged = new Subject<void>();

  constructor(
    private storage: Storage
  ) { }

  getRegistros(): Registro[] {
    return this.registros.slice();
  }

  async save(format: string, text: string) {

    const registro = new Registro(format, text);

    this.registros.unshift(registro);
    this.registrosChanged.next();

    await this.storage.set('registros', this.registros);

    console.log(this.registros);

  }

  async load(): Promise<void> {

    const registros = (await this.storage.get('registros') as Registro[]) || [];

    this.registros = registros;
    this.registrosChanged.next();

  }

}
