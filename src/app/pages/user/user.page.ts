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
import { AddproductPage } from "src/app/modals/addproduct/addproduct.page";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  ELEMENT_DATA: UserDatas[];
  displayedColumns: string[] = [
    "user_id",
    "user_image",
    "user_fname",
    "user_balence",
    "user_status",
    "actions",
  ];
  dataSource;
  openModal;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public http: HttpClient,
    public loading: LoadingService,
    public apiservices: ApiServices,
    public modalCtrl: ModalController
  ) { 
    this.dataSource = new MatTableDataSource<UserDatas>(this.ELEMENT_DATA);
    this.openModal=false;
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

  async open(){
    this.openModal = true;
    const popover = await this.modalCtrl.create({
      component: AddproductPage,
      cssClass: 'show_user',
      mode: 'md',
      // showBackdrop: false,
    });
    await popover.present();
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
        user_id: 1,
        user_fname: 'Pusendu',
        user_lname: 'Das',
        user_image: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
        user_balence: '1275.75',
        user_status: 'active',
      },
      { 
        user_id: 1,
        user_fname: 'Taniya',
        user_lname: 'Roy',
        user_image: 'https://i.imgur.com/JgYD2nQ.jpg',
        user_balence: '1275.75',
        user_status: 'active',
      },
      { 
        user_id: 1,
        user_fname: 'Pusendu',
        user_lname: 'Das',
        user_image: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
        user_balence: '1275.75',
        user_status: 'active',
      },
      { 
        user_id: 1,
        user_fname: 'Taniya',
        user_lname: 'Roy',
        user_image: 'https://i.imgur.com/JgYD2nQ.jpg',
        user_balence: '1275.75',
        user_status: 'active',
      },
      { 
        user_id: 1,
        user_fname: 'Pusendu',
        user_lname: 'Das',
        user_image: 'https://lh3.googleusercontent.com/ogw/ADea4I6fHXYVg2s9BeTgNgFzCPUckrTIOW4KIx8aajU_pA=s64-c-mo',
        user_balence: '1275.75',
        user_status: 'active',
      },
    ]

    this.dataSource.data = res as UserDatas[]
  }
}
