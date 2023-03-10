import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { DetailsPage } from 'src/app/modals/details/details.page';
import { ApiServices } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  public rows: any;
  message:any;
  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    public apiservices : ApiServices,
    public loading: LoadingService,
  ) { }

  ngOnInit() {

    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    
    this.http.get(`${this.apiservices.api_url}admin/wallet/list/`,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe((res) => {
        console.log(res)
        this.rows = res;
        // this.rows.length = 50
      });
  }


  async openModal(details) {
    console.log(details)
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: {data: details},
      cssClass: "ae-modal"
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

}
