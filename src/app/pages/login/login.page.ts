import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServices } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service'
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertsToastsService } from 'src/app/services/alerts-toasts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(
    public menuCtrl: MenuController,
    public apiservices : ApiServices,
    public loading: LoadingService,
    private fb: FormBuilder,
    public http: HttpClient,
    public storage: Storage,
    private authService: AuthenticationService,
    public alertsToasts: AlertsToastsService,
  ) {
   }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.loginForm = this.fb.group({
      // tslint:disable-next-line: max-line-length
      email: ['', [Validators.required, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
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
    const controls = this.loginForm.controls;
    for (const field in controls) {
      if (controls[field]) {
        controls[field].markAsDirty();
      }
    }
  }

  login() {
    this.loading.presentLoading()
    
    if(this.loginForm.valid){
      var data = {
        'email': this.loginForm.value.email,
        'password': this.loginForm.value.password
      }

      var httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json; charset=UTF-8'
        })
      };
      console.log(data);
      this.http.post(`${this.apiservices.api_url}login/`,data,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe(async (res) => {
        const response:any =res;
        if(response.Status == 'Success'){
          await this.storage.set('savefulladmin', data);
          this.authService.login(data);
          this.alertsToasts.signupSuccessToast(response.details,'success');
        }
        else if(response.Status == 'Failed'){
          await this.storage.set('savefulladmin', data);
          this.alertsToasts.signupSuccessToast(response.details,'danger');
        }
      },(reserror)=>{
        console.log(reserror.error.detail);
        this.alertsToasts.signupSuccessToast(reserror.error.detail,'danger');
      })
    }
  }
}
