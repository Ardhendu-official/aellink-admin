import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ShortNumberPipe } from 'src/app/pipes/short-number.pipe';
import {MatSort} from '@angular/material/sort';
import {MatIcon} from '@angular/material/icon'


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

}
