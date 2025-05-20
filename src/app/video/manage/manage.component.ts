import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipsService } from 'src/app/services/clips.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
   videoOrder = '1';
   clips: IClip[] = [];
   activeClip: IClip | null = null;
   constructor(private router: Router, private route: ActivatedRoute, private clipsService: ClipsService, private modalService: ModalService){
      
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
         this.clips = data;
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

   openModal(e:Event, clip:IClip){
      e.preventDefault();
      this.activeClip = clip
      this.modalService.toggleModal('edit-modal');
   }

}
