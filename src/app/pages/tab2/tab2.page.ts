import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Subscription } from 'rxjs';
import { Registro } from '../../models/registro.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  public registros: Registro[] = [];

  private registrosSub: Subscription;

  constructor(
    private dataLocalService: DataLocalService
  ) {}

  sendMail(): void {
    console.log('sendMail');
  }

  ngOnInit() {
    this.registros = this.dataLocalService.getRegistros();
    this.registrosSub = this.dataLocalService.registrosChanged.subscribe(() => this.registros = this.dataLocalService.getRegistros());
  }

  openRegistro(registro: Registro): void {
    console.log(registro);
  }

  ngOnDestroy() {
    this.registrosSub.unsubscribe();
  }

}
