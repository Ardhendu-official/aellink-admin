import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public value = this.navParams.get('data');
  constructor(private navParams: NavParams) {
    console.log(navParams.get('data'));
   }

  ngOnInit() {
    console.log(this.value)
  }

}
