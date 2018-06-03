import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import firebase from 'firebase/app'
import { Song } from '../../interfaces/Song'
import LRC from 'lrc.js'

@Injectable()
export class AppProvider {
  private db = firebase.database()

  constructor(
    private afdb: AngularFireDatabase
  ) { }

  searchbarGenerate(keyWord?: string) {
    let query = keyWord ? keyWord.toLowerCase() : ''

    return this.afdb.list<Song>('/songs', ref =>
      ref.orderByChild('playcounts')
    ).valueChanges()
      .first()
      .map(songs =>
        songs.filter(song => song.searchfield.includes(query))
          .sort((a, b) => b.playcounts - a.playcounts)
          .slice(0, 10) //get top 10 results
      )
  }

  lyricParse(lrcString) {
    let formated = lrcString.replace(/([^\]])\[/g, "$1\n[")
    const lyrics = LRC.parse(formated)
    return lyrics
  }

}
