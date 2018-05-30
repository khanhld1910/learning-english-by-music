import { Injectable } from '@angular/core';


@Injectable()
export class YoutubeServiceProvider {

  youtube: any = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '100%',
    playerWidth: '100%'
  }

  constructor() {
    
    
  }  

}
