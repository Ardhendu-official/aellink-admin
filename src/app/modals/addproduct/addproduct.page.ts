import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { LoadingService } from "src/app/services/loading.service";
import { ApiServices } from "src/app/services/api.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TransDatas } from "src/app/interface/transactions";
import { ModalController } from "@ionic/angular";
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {

  ELEMENT_DATA: TransDatas[];
  displayedColumns: string[] = [
    'trans_id',
    'trans_ammount',
    'trans_before_wallet_ammount',
    'trans_after_wallet_ammount',
    'trans_datetime',
    'trans_status',
    // 'actions',
  ];
  dataSource;


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public http: HttpClient,
    public loading: LoadingService,
    public apiservices: ApiServices,
    public modalCtrl: ModalController
  ) { 
    this.dataSource = new MatTableDataSource<TransDatas>(this.ELEMENT_DATA);
  }

  ngOnInit() {
    this.getallUser();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue) {
    var value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getallUser(){


    // this.loading.presentLoading();
    // this.http
    //   .get(`${this.apiservices.api_url}parentcategory/`)
    //   .pipe(finalize(() => this.loading.dismissLoading()))
    //   .subscribe(
    //     (res) => (this.dataSource.data = res as UserDatas[]),
    //     (reserror) => {
    //       console.log(reserror.error.detail);
    //       this.dataSource.data = [] as UserDatas[];
    //     }
    //   );

    var res = [
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      },
      { 
        trans_id:1,
        trans_ammount:'1200',
        trans_before_wallet_ammount:'5260',
        trans_after_wallet_ammount:'4060',
        trans_status:'success',
        trans_datetime:'2022-02-01 23:21:03',
      }
    ]

    this.dataSource.data = res as TransDatas[]
  }

}
