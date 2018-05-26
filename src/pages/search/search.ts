import { Component, ViewChild } from '@angular/core';
import { IonicPage, Searchbar } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import 'rxjs/add/operator/first';


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

  constructor(
    public appProvider: AppProvider
  ) { }

  ionViewDidLoad() {
  }

  seachingSongs(ev: any) {
    // set val to the value of the searchbar
    if (!ev) return false
    let val = ev.target.value;

    // if the value is an empty string or value's length is less than 2 don't filter
    if (!val || val.length < 2) {
      this.searchMode = false
      return
    }

    this.searchMode = true

    this.appProvider.search(val.trim())
      .subscribe(value => {
        console.log(value)
      })
  }

  onCancel(ev: any) {
    this.searchMode = false
    this.searchbar.clearInput(null)
  }

  closeSearchList() {
    this.searchMode = false
    this.searchbar.clearInput(null)
  }

}
