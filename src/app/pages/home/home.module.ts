import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatCardModule} from '@angular/material/card';

import { HomePageRoutingModule } from './home-routing.module';
import {MatIconModule} from '@angular/material/icon'
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
