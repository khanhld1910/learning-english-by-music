import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Song } from '../../interfaces/Song';
import { AppProvider, Lyric } from '../../providers/app/app';
declare var Plyr
// script imported in assets folder
@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  playerData: {
    song: Song
  }
  mode: string
  player: any
  lyric: Lyric = {
    al: '',
    ar: '',
    au: '',
    ti: '',
    by: '',
    offset: 0,
    length: '',
    re: '',
    ve: '',
    lines: [
      {
        time: 0,
        text: 'xxx'
      }
    ]
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appProvider: AppProvider
  ) {
    this.playerData = this.navParams.data
  }

  ionViewDidEnter() {
    this.mode = 'karaoke'
    this.presentPlayer()
    this.presentLyric()
  }

  presentPlayer() {
    this.player = new Plyr('#player', {
      autoplay: true,
      fullscreen: false,
      controls: ['play', 'progress'],
      clickToPlay: true,
      keyboard: { focused: false, global: false }
    })

    this.player.on('ready', event => {
      this.player.play()
    })

  }

  presentLyric() {
    let rawLyric = this.playerData.song.lyric
    this.lyric = this.appProvider.lyricParse(rawLyric)
  }


  test() {
    //let currTime = this.player.currentTime
    //this.player.forward(5)
    let lyric = this.playerData.song.lyric
    //console.log(lyric)
    this.appProvider.lyricParse(lyric)
  }

}
