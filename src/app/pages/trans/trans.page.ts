import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ApiServices } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { DetailsPage } from 'src/app/modals/details/details.page';

@Component({
  selector: 'app-trans',
  templateUrl: './trans.page.html',
  styleUrls: ['./trans.page.scss'],
})
export class TransPage implements OnInit {

  public rows: any;
  message:any;
  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    public apiservices : ApiServices,
    public loading: LoadingService,) { }

  ngOnInit() {
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    
    this.http.get(`${this.apiservices.api_url}trans/all`,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
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
