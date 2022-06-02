import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastController, Platform, NavController } from '@ionic/angular';
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
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }

  async ifLoggedIn() {
    await this.storage.get('user').then((response) => {
      if(response != null){
        this.validate(response.username, response.password);
      }
      else{
        this.authState.next(false);
      }
    });
  }

  async login(userdata) {
    await this.storage.set('user', userdata).then((response) => {
      console.log(JSON.stringify(response));
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
  }

  async validate(username, pass){
    var data = {
      'username': username,
      'password': pass
    }
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);

    this.http.post(`${this.apiservice.api_url}login/`,body, httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
    .subscribe(async res => {
      const response: any = res;
      if (response.access_token) {
        this.authState.next(true);
        await this.storage.set('user', data);
      }
      else {
        this.authState.next(false);
      }
    });
    this.authState.next(true);
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
