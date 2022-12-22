import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastController, Platform, NavController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiServices } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    public navCtrl: NavController,
    public loading: LoadingService,
    public http: HttpClient,
    public apiservice: ApiServices,
    private menuCtrl: MenuController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }

  async ifLoggedIn() {
    await this.storage.get('user').then((response) => {
      if(response != null){
        this.validate(response.admin_email, response.admin_password);
      }
      else{
        this.authState.next(false);
      }
    });
  }

  async login(userdata) {
    await this.storage.set('user', userdata).then((response) => {
      console.log(JSON.stringify(response));
      this.menuCtrl.enable(true)
      this.authState.next(true);
      this.navCtrl.navigateRoot(['home']);
   });

  }

  async logout() {
    await this.storage.remove('user').then(() => {
      this.authState.next(false);
      this.navCtrl.navigateRoot(['login']);
    });
    await this.storage.remove('access_token').then(() => {
      this.authState.next(false);
      this.navCtrl.navigateRoot(['login']);
    });
    this.menuCtrl.enable(false)
  }

  async validate(username, pass){
    var data = {
      'admin_email': username,
      'admin_password': pass
    }
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // let body = new URLSearchParams();
    // body.set('admin_email', data.admin_email);
    // body.set('admin_password', data.admin_password);

    this.http.post(`${this.apiservice.api_url}admin/login/`,data, httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
    .subscribe({
      next: async (res) => {
        const response: any = res;
        this.authState.next(true);
        await this.storage.set('user', data);
        this.menuCtrl.enable(true)
      },
      error: (e) =>{
        this.authState.next(false);
      }
    });
    this.authState.next(true);
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
