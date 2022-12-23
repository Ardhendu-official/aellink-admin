import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-trans',
  templateUrl: './trans.page.html',
  styleUrls: ['./trans.page.scss'],
})
export class TransPage implements OnInit {

  public value = this.navParams.get('data');
  constructor(private navParams: NavParams) {
    console.log(navParams.get('data'));
   }
  ngOnInit() {
    console.log(this.value)
  }

}
