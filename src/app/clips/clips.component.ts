import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.css']
})
export class ClipsComponent implements OnInit {
   id = '';
   constructor(public route: ActivatedRoute){
      
   }
   ngOnInit(): void {
      // this.id = this.route.snapshot.params['id'];//it does not update after we inject a service, its great for when we need to grab the router's information when the component is created

      //we can use observables through which we can listen to changes in the route 
      this.route.params.subscribe((params: Params) => 
         this.id = params['id']
      )
   }

}
