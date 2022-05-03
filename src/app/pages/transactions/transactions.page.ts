import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { LoadingService } from "src/app/services/loading.service";
import { ApiServices } from "src/app/services/api.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UserDatas } from "src/app/interface/user";
import { AllTransDatas } from "src/app/interface/alltransactions";
import { AddproductPage } from "src/app/modals/addproduct/addproduct.page";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  ELEMENT_DATA: AllTransDatas[];
  displayedColumns: string[] = [
    'trans_id',
    'trans_ammount',
    'trans_before_wallet_ammount',
    'trans_after_wallet_ammount',
    'trans_status',
    'trans_datetime',
    'trans_send_account',
    'trans_send_ifsc',
    'trans_send_name',
    'trans_send_bank_name',
    'name',
    'photo',
    'userid',
    'actions',
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
    this.dataSource = new MatTableDataSource<AllTransDatas>(this.ELEMENT_DATA);
   }

   ngOnInit() {
    this.getallTrans();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue) {
    var value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getallTrans(){


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
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      },
      {
        trans_id: 1,
        trans_ammount: '1000',
        trans_before_wallet_ammount: '5000',
        trans_after_wallet_ammount: '4000',
        trans_status: 'success',
        trans_datetime: '2022-02-01 23:21:03',
        trans_send_account: '1234567890567',
        trans_send_ifsc: 'UTIB0000123',
        trans_send_name: 'Pusendu Das',
        trans_send_bank_name: 'Axis Bank',
        user: {
          name: 'Puspendu Das',
          photo: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
          userid: '9412VV79878'
        }
      }
    ]

    this.dataSource.data = res as unknown as AllTransDatas[]
  }

  
}