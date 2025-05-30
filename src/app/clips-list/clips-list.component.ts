import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClipsService } from '../services/clips.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy{
   @Input() scrollable: boolean = true;

   constructor(public clipService : ClipsService){
      this.clipService.getClips();
   }

   ngOnInit(): void {
      if(this.scrollable){
         window.addEventListener('scroll', this.handleScroll);
      }
   }

   handleScroll = () =>{
      const {scrollTop, offsetHeight} = document.documentElement;
      const {innerHeight} = window

      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

      if(bottomOfWindow){
         this.clipService.getClips();
      }
   }

   ngOnDestroy(): void {
      if(this.scrollable){
         window.removeEventListener('scroll', this.handleScroll);
      }
      this.clipService.pageClips = [];
   }

}
