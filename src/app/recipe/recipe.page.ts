import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiServices } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Recipes } from "src/app/interface/recipe";
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  rcp:any = {
    id: '',
    name: ''
  }

  recipe:any

  constructor(
    private authenticationService: AuthenticationService,
    public apiservices : ApiServices,
    public http: HttpClient,
    private route: ActivatedRoute,
    public storage: Storage,
    public loading: LoadingService,
    private router:Router,
  ) { 
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.rcp.id = this.router.getCurrentNavigation().extras.state.rcp_id;
        this.rcp.name = this.router.getCurrentNavigation().extras.state.rcp_name;
      }
    });
  }

  ngOnInit() {
    this.fetchdata(this.rcp.id)
  }

  async fetchdata(id){
    await this.loading.presentLoading();

    let access_token = await this.storage.get('access_token');

      let httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${access_token}`})
      };

      this.http.get(`${this.apiservices.api_url}recipe/${id}`,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe(async (res) => {
        const response:any =res;
        this.recipe = response;
      },(reserror)=>{
        console.log(reserror.error.detail);
      })
  }

}
