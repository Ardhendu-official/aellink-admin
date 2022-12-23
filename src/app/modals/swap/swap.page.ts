import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-swap',
  templateUrl: './swap.page.html',
  styleUrls: ['./swap.page.scss'],
})
export class SwapPage implements OnInit {

  public value = this.navParams.get('data');
  constructor(private navParams: NavParams) {
    console.log(navParams.get('data'));
   }
  ngOnInit() {
    console.log(this.value)
  }

}
