import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private registros: Registro[] = [];

  public registrosChanged = new Subject<void>();

  constructor(
    private storage: Storage,
    private navController: NavController,
    private inAppBrowser: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
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

  sendMail(): void {

    const arr: string[] = [];

    const headers = 'Tipo, Formato, Creado en, Texto\n';

    arr.push(headers);

    this.registros.forEach(
      (registro: Registro) => arr.push(`${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`)
    );

    this.createFile(arr.join(''));

  }

  async createFile(csvText: string): Promise<void> {

    try {

      const fileExists = await this.file.checkFile(this.file.dataDirectory, 'registros.csv');
      await this.writeFile(csvText);

    } catch (e) {

      try {
        await this.file.createFile(this.file.dataDirectory, 'registros.csv', false);
        await this.writeFile(csvText);
      } catch (e2) {
        console.log('Error writing to file', e2);
      }

    }

  }

  async writeFile(text: string): Promise<void> {

    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);

    const filePath = `${this.file.dataDirectory}registros.csv`;

    const email = {
      to: 'alejandrorodarte1@gmail.com',
      // cc: '',
      // bcc: [],
      attachments: [
        filePath
      ],
      subject: 'QR Codes backups',
      body: 'Take my QR code backups goddammit - <strong>ScanApp</strong>',
      isHtml: true
    };

    await this.emailComposer.open(email);

  }

}
