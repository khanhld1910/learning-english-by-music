import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private song = `Luong<br> Duy Khanh`

  constructor(public navCtrl: NavController) {

  }

}
