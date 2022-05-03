import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { LoadingService } from "src/app/services/loading.service";
import { ApiServices } from "src/app/services/api.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CategoryDatas } from "src/app/interface/category";
import { AddcategoryPage } from "src/app/modals/addcategory/addcategory.page";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit {
  parent_cats: any;
  ELEMENT_DATA: CategoryDatas[];
  displayedColumns: string[] = [
    "category_id",
    "category_image",
    "category_name",
    "category_description",
    "category_status",
    "actions",
  ];
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public http: HttpClient,
    public loading: LoadingService,
    public apiservices: ApiServices,
    public modalCtrl: ModalController
  ) {
    this.dataSource = new MatTableDataSource<CategoryDatas>(this.ELEMENT_DATA);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getallParentCategory();
  }

  applyFilter(filterValue) {
    var value = filterValue.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getallParentCategory() {
    // this.loading.presentLoading()
    this.http
      .get(`${this.apiservices.api_url}parentcategory/`)
      .pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe(
        (res) => {
          console.log(res);
          this.parent_cats = res;
          this.fetchGroceryCategory(res[0].category_id);
        },
        (reserror) => {
          console.log(reserror.error.detail);
          this.parent_cats = [];
        }
      );
  }

  fetchGroceryCategory(category_id) {
    this.loading.presentLoading();
    this.http
      .get(`${this.apiservices.api_url}parentcategory/${category_id}`)
      .pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe(
        (res) => (this.dataSource.data = res as CategoryDatas[]),
        (reserror) => {
          console.log(reserror.error.detail);
          this.dataSource.data = [] as CategoryDatas[];
        }
      );
  }

  segmentChanged(event: MatTabChangeEvent) {
    this.fetchGroceryCategory(this.parent_cats[event.index].category_id);
  }

  async addcategory() {
    const modal = await this.modalCtrl.create({
      component: AddcategoryPage,
      cssClass: "add__deperment",
      swipeToClose: false,
      backdropDismiss: false,
    });

    modal.onDidDismiss().then((modelData) => {});

    return await modal.present();
  }
}
