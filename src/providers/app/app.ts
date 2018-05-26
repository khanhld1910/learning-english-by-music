import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import firebase from 'firebase/app'
import { Song } from '../../interfaces/Song'

@Injectable()
export class AppProvider {
  private db = firebase.database()

  constructor(
    private afdb: AngularFireDatabase
  ) { }

  search(keyWord) {
    return this.afdb.list<Song>('/songs', ref => ref
      .orderByChild('playcounts')
      .limitToLast(1000)
    ).valueChanges()
      .first()
      .map(songs =>
        songs.filter(
          song => !keyWord
            || song.title.toLowerCase().includes(keyWord)
            || song.artist.toLowerCase().includes(keyWord)
        )
          .reverse()
      )
  }

}
