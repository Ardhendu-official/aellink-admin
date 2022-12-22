import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  adminInfo:any;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Wallet', url: '/wallet', icon: 'wallet' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work'];

  constructor(
    public storage: Storage,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.initializeApp();
    let user = await this.storage.get("user")
    console.log(user)
  }

  ionViewWillEnter(){
    this.initializeApp();
  }

  async initializeApp() {
    this.adminInfo = await this.storage.get('user');
    console.log(this.adminInfo)
    this.authenticationService.authState.subscribe(state => {
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
