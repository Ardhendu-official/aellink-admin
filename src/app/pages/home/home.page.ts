import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiServices } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { finalize } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Recipes } from "src/app/interface/recipe";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  recipes

  public rows: any;

  constructor(
    private authenticationService: AuthenticationService,
    public apiservices : ApiServices,
    public http: HttpClient,
    public storage: Storage,
    public loading: LoadingService,
    private router:Router,
    private menuCtrl: MenuController
  ) { 
    this.menuCtrl.enable(true)
  }

  ngOnInit() {
    this.fetchdata();
    this.fechUser();
  }

  refresh(ev) {
    setTimeout(() => {
      this.fetchdata();
      this.fechUser();
      ev.target.complete();
    }, 1000);
  }

  async fetchdata(){
    await this.loading.presentLoading();

    let access_token = await this.storage.get('access_token');

      let httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
      };

      this.http.get(`${this.apiservices.api_url}admin/details/`,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe(async (res) => {
        const response:any =res;
        this.recipes = response as Recipes;
        console.log(this.recipes)
      },(reserror)=>{
        console.log(reserror.error.detail);
        this.loading.dismissLoading()
      })
  }

  async fechUser(){
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    
    this.http.get(`${this.apiservices.api_url}admin/wallet/list/`,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe((res) => {
        console.log(res)
        this.rows = res;
        this.rows.length = 10
        this.loading.dismissLoading()
      });
  }

  viewRecipe(id, name){
    let navigationExtras: NavigationExtras = {
      state: {
        rcp_id: id,
        rcp_name: name
      }
    }
    this.router.navigate(['recipe'], navigationExtras);
  }

  logout(){
    this.authenticationService.logout();
  }

  detail(){
    console.log("new route");
    
  }

}
