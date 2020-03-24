import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private registros: Registro[] = [];

  public registrosChanged = new Subject<void>();

  constructor(
    private storage: Storage,
    private navController: NavController,
    private inAppBrowser: InAppBrowser
  ) { }

  getRegistros(): Registro[] {
    return this.registros.slice();
  }

  async save(format: string, text: string) {

    const registro = new Registro(format, text);

    this.registros.unshift(registro);
    this.registrosChanged.next();

    await this.storage.set('registros', this.registros);
    this.openRegistro(registro);

    console.log(this.registros);

  }

  async load(): Promise<void> {

    const registros = (await this.storage.get('registros') as Registro[]) || [];

    this.registros = registros;
    this.registrosChanged.next();

  }

  openRegistro(registro: Registro): void {

    this.navController.navigateForward('/tabs/tab2');

    switch (registro.type) {

      case 'http':
        const browser = this.inAppBrowser.create(registro.text, '_system');
        break;

      case 'geo':
        this.navController.navigateForward(`/tabs/tab2/map/${registro.text}`);
        break;

      default:

    }

  }

}
