import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private dataLocalService: DataLocalService
  ) {}

  async ngOnInit() {
    await this.dataLocalService.load();
  }

}
