import { Component, ViewChild } from '@angular/core';
import { IonicPage, Searchbar, NavController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import 'rxjs/add/operator/first';
import { Song } from '../../interfaces/Song';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {

  keyword: string = ""
  result = []
  public searchMode: boolean = false
  @ViewChild('searchbar') searchbar:  Searchbar
  private searchList: Song[] = []

  constructor(
    public appProvider: AppProvider,
    private navCtrl: NavController
  ) { }

  ionViewDidEnter() {
    setTimeout(()=>{
      this.searchbar.setFocus();
    }, 150);
  }

  searchbarGenerate(ev: any) {
    // set val to the value of the searchbar
    //if (!ev.target.value) return false
    let val = ev.target.value ? ev.target.value.trim() : '';

    // if the value is an empty string don't filter
    if (!val || val.length < 1) {
      this.searchMode = false
      return
    }

    this.searchMode = true

    this.appProvider.searchbarGenerate(val)
      .subscribe(value => {
        this.searchList = value
        //console.log(value)
      })
  }

  search() {
    console.log('triggered')
  }

  play(song: Song) {   
    this.navCtrl.setRoot('TabsPage', {song: song})
  }
  
  closeSearchList() {
    this.searchMode = false
  }

}
