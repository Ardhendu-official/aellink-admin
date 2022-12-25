import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ApiServices } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public subcatagory = [
    { title: 'Sent', id: "1", icon: 'home' },
    { title: 'Recive', id: "2", icon: 'wallet' },
    { title: 'Swap', id: "3", icon: 'swap-horizontal' },
    { title: 'Portfolio', id: "4", icon: 'shuffle' },
  ];

  rows: any;

  public value = this.navParams.get('data');
  constructor(
    private navParams: NavParams,
    private http: HttpClient,
    private modalCtrl: ModalController,
    public apiservices : ApiServices,
    public loading: LoadingService,
    ) {
    console.log(navParams.get('data'));
   }

  ngOnInit() {
    console.log(this.value)
  }

  segmentChanged(event){
    console.log(event.target.value);
    if(event.target.value === '1'){
      this.one()
    }else if(event.target.value === '2'){
      this.two()
    }else if(event.target.value === '3'){
      this.three()
    }else if(event.target.value === '4'){
      this.four()
    }
  }

  one(){
    this.loading.presentLoading()
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    this.http.get(`${this.apiservices.api_url}transaction/send/${this.value.user_address}/0`,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe((res) => {
        console.log(res)
        this.rows = res[1];
        // this.rows.length = 50
      });
  }

  two(){
    this.loading.presentLoading()

    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    this.http.get(`${this.apiservices.api_url}transaction/receive/${this.value.user_address}/0`,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe((res) => {
        console.log(res)
        this.rows = res[1];
        // this.rows.length = 50
      });
  }

  three(){
    this.loading.presentLoading()

    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    this.http.get(`${this.apiservices.api_url}swap/trans/${this.value.user_hash_id}/${this.value.user_address}`,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe((res) => {
        console.log(res)
        this.rows = res;
        // this.rows.length = 50
      });
  }

  four(){
    this.loading.presentLoading()

    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    this.http.get(`${this.apiservices.api_url}token/show/${this.value.user_address}`,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe((res) => {
        console.log(res)
        this.rows = res;
        // this.rows.length = 50
      });
  }
}
