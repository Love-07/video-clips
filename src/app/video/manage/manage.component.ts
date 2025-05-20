import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClipsService } from 'src/app/services/clips.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
   videoOrder = '1'
   constructor(private router: Router, private route: ActivatedRoute, private clipsService: ClipsService){
      
   }
   ngOnInit(): void {
      this.route.queryParamMap.subscribe((params : Params) =>{
         //this observable will push values whenever the query parameter changes in the URL 
         //it might be possible that change in any other query parameter can cause the observable to push a new value
         // this.videoOrder = params.sort === '2' ? params.sort : '1' //so we are delibarately check the value
         const sort = params.get('sort');      // ← use get()
         this.videoOrder = sort === '2' ? sort! : '1';
      })
      
      this.clipsService.getUserClips().subscribe((data) =>{
         console.log(data);
      });

   }

   sort(e: Event){
      const {value} = (e.target as HTMLSelectElement);
      // this.router.navigateByUrl(`/manage?sort=${value}`);
      this.router.navigate([],{
         relativeTo: this.route,
         queryParams: {
            sort: value
         }
      })
   }

}
