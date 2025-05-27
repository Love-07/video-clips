import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None //this is needed to apply the video.js styles globally
})
export class ClipsComponent implements OnInit {
   id = '';
   @ViewChild('videoPlayer', {static: true}) target?: ElementRef
   player?: any;
   clip?: IClip
   constructor(public route: ActivatedRoute, private datePipe: DatePipe) {
      
   }
   ngOnInit(): void {
      this.player = videojs(this.target?.nativeElement, {
         controls: true,
         autoplay: false,
         preload: 'auto',
         fluid: true
      });
      // this.id = this.route.snapshot.params['id'];//it does not update after we inject a service, its great for when we need to grab the router's information when the component is created

      //we can use observables through which we can listen to changes in the route 
      // this.route.params.subscribe((params: Params) => 
      //    this.id = params['id']
      // )

      //resolve data get stored in the data property of the route
      this.route.data.subscribe((data) => {
         this.clip = data.clip as IClip;
         this.player?.src({
            src: this.clip?.url,
            type: 'video/mp4'
         });
      });
   }

}
