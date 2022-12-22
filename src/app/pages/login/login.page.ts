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
    public apiservices : ApiServices,
    public loading: LoadingService,
    private fb: FormBuilder,
    public http: HttpClient,
    public storage: Storage,
    private authService: AuthenticationService,
    public alertsToasts: AlertsToastsService,
    private menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false)
   }

  ngOnInit() {
    this.loginForm = this.fb.group({
      // tslint:disable-next-line: max-line-length
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
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
    if(this.loginForm.valid){
      this.loading.presentLoading()

      let data = {
        'admin_email': this.loginForm.value.email,
        'admin_password': this.loginForm.value.password
      }

      // let body = new URLSearchParams();
      // body.set('email', data.email);
      // body.set('password', data.password);

      let httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
      this.http.post(`${this.apiservices.api_url}admin/login/`, data ,httpOptions).pipe(finalize(() => this.loading.dismissLoading()))
      .subscribe(async (res) => {
        const response:any =res;
        await this.storage.set('user', data);
        await this.storage.set('access_token', response?.access_token);
        this.authService.login(data);
        this.alertsToasts.signupSuccessToast('Login Successfully','success');
        if(response.access_token){
        }
        else if(response.Status == 'Failed'){
          await this.storage.set('user', data);
          this.alertsToasts.signupSuccessToast(response.details,'danger');
        }
      },(reserror)=>{
        console.log(reserror.error.detail);
        this.alertsToasts.signupSuccessToast(reserror.error.detail,'danger');
      })
    } else {
      this.alertsToasts.signupSuccessToast('Empty Input Can\'t Accepted','danger');
    }
  }
}
