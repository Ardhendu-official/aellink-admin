import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatCardModule} from '@angular/material/card';

import { HomePageRoutingModule } from './home-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatIconModule} from '@angular/material/icon'
import { HomePage } from './home.page';
import { ShortNumberPipe } from 'src/app/pipes/short-number.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HighchartsChartModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [HomePage, ShortNumberPipe]
})
export class HomePageModule {}
