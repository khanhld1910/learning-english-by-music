import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'PlayerPage'

  constructor(
    private navCtrll: NavController
  ) { }

  goToSearchPage() {
    this.navCtrll.push('SearchPage')
  }
}
