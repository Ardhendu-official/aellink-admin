import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransPageRoutingModule } from './trans-routing.module';

import { TransPage } from './trans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransPageRoutingModule
  ],
  declarations: [TransPage]
})
export class TransPageModule {}
