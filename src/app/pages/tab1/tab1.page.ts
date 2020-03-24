import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private dataLocalService: DataLocalService
  ) {}

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.scan();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  scan(): void {

    this
      .barcodeScanner
      .scan()
      .then((barcodeScanResult: BarcodeScanResult) => {

        if (!barcodeScanResult.cancelled) {
          this.dataLocalService.save(barcodeScanResult.format, barcodeScanResult.text);
        }

      })
      .catch(console.log);

  }

}
