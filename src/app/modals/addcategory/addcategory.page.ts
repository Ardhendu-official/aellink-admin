import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service'
import { ApiServices } from 'src/app/services/api.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.page.html',
  styleUrls: ['./addcategory.page.scss'],
})
export class AddcategoryPage implements OnInit {
  addCategory: FormGroup;
  isParent:Boolean;
  parent_cats:any;
  croppedImagepath: any;
  constructor(
    public modalCtrl : ModalController,
    private fb: FormBuilder,
    public http: HttpClient,
    public loading: LoadingService,
    public apiservices : ApiServices,
  ) {
    this.isParent = true;
   }

  ngOnInit() {
    this.addCategory = this.fb.group({
      // tslint:disable-next-line: max-line-length
      category_name: ['', [Validators.required]],
      category_description: ['', [Validators.required]],
      category_status: ['active', [Validators.required]],
      category_parent: [0, [Validators.required]],
      category_image: ['', [Validators.required]],
    });
    this.getallParentCategory()
  }

  getallParentCategory(){
    // this.loading.presentLoading()
    this.http.get(`${this.apiservices.api_url}parentcategory/`).pipe(finalize(() => this.loading.dismissLoading()))
    .subscribe((res)=>{
      console.log(res)
      this.parent_cats = res;
    },(reserror)=>{
      console.log(reserror.error.detail);
      this.parent_cats = []
    })
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  markFieldsDirty() {
    const controls = this.addCategory.controls;
    for (const field in controls) {
      if (controls[field]) {
        controls[field].markAsDirty();
      }
    }
  }

  addCategoryApi(){
    console.log(this.addCategory.value)
    // console.log(this.croppedImagepath)
  }

  async closeModel() {
    await this.modalCtrl.dismiss();
  }
}
