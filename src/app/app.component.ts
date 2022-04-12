import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from './services/Authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  adminInfo:any;

  constructor(
    public storage: Storage,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.initializeApp();
  }

  ionViewWillEnter(){
    this.initializeApp();
  }

  async initializeApp() {
    this.adminInfo = await this.storage.get('savefulladmin');
    this.authenticationService.authState.subscribe(state => {
      console.log(state);
      if (state) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  logout(){
    this.authenticationService.logout();
  }
}
