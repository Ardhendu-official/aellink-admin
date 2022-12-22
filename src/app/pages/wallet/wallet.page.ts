import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ApiServices } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  public rows: any;

  constructor(
    private http: HttpClient,
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
      });
  }

}
