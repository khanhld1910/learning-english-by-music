import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs, NavParams } from 'ionic-angular';
import { Song } from '../../interfaces/Song';

@IonicPage({})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage'
  tab2Root = 'PlayerPage'
  private playData: {
    song: Song
  }
  defaultTabIndex = 0
  @ViewChild('myTabs') myTabs: Tabs

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) { 
    this.navParams = navParams
    this.playData = {
      song: this.navParams.get('song')
    }

    if (!this.playData.song) return
    //this.myTabs.select(1)
    this.defaultTabIndex = 1
  }

  goSearchPage() {
   this.navCtrl.push('SearchPage')
  }
}
