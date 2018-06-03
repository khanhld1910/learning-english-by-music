import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Song } from '../../interfaces/Song';
import { AppProvider } from '../../providers/app/app';
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
  lyric: any
  isPlaying: boolean
  currIndex: number

  @ViewChild('content') content: Content

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appProvider: AppProvider
  ) {
    this.playerData = this.navParams.data
    this.lyric = Object.assign({}, {
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
    })
  }

  ionViewDidLoad() {
    this.mode = 'play'
    this.presentPlayer()
    this.presentLyric()
    this.isPlaying = false
    this.currIndex = 0
  }

  presentPlayer() {
    this.player = new Plyr('#player', {
      fullscreen: false,
      controls: [],
      ratio: '16:9',
      keyboard: { focused: false, global: false }
    })

    this.player.on('ready', event => {
      this.player.play()
    })

    this.player.on('playing', event => {
      console.log('playing')
      this.isPlaying = true
    })

    this.player.on('pause', event => {
      console.log('pause')
      this.isPlaying = false
    })

    this.player.on('timeupdate', event => {
      // video is playing
      const currentTime = this.player.currentTime
      let newIndex = this.lyric.findIndex(currentTime)
      if (this.currIndex == newIndex) return
      this.currIndex = newIndex
      //---------------------->
      if (!this.lyric.lines[newIndex+1]) return
      //---------------------->
      if (newIndex == 0 || newIndex == 1) return
      let nextLineTime = this.lyric.lines[newIndex+1].time
      let duration = Math.round(nextLineTime-currentTime) // seconds
      //console.log('duration', duration)
      let scrollHeight = this.content.getContentDimensions().scrollHeight - 460 * 9/16

      let scrollLength = Math.round(scrollHeight/this.player.duration)// per second

      let YValue = this.content.getContentDimensions().scrollTop
      this.content.scrollTo(0, YValue + duration*scrollLength, duration*700)
    })

  }

  presentLyric() {
    let rawLyric = this.playerData.song.lyric
    this.lyric = this.appProvider.lyricParse(rawLyric)

  }

  test() {
    let lyric = this.playerData.song.lyric
    this.appProvider.lyricParse(lyric)
  }

}
