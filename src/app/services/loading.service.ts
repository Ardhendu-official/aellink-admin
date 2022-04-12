import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    public loadingCtrl: LoadingController
  ) { }

  async dismissLoading() {
    this.loadingCtrl.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }

  async presentLoading() {

    this.loadingCtrl.create({
      spinner: 'crescent',
      cssClass: 'loading-class',
      mode: 'ios',
      message: 'Please wait...'
    }).then((res) => {
      res.present();
    });
  }
}
