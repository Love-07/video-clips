import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipsService } from 'src/app/services/clips.service';
import { ModalService } from 'src/app/services/modal.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
   videoOrder = '1';
   clips: IClip[] = [];
   activeClip: IClip | null = null;
   sort$: BehaviorSubject<string>
   constructor(private router: Router, private route: ActivatedRoute, private clipsService: ClipsService, private modalService: ModalService){
      this.sort$ = new BehaviorSubject(this.videoOrder);
   }
   ngOnInit(): void {
      this.route.queryParamMap.subscribe((params : Params) =>{
         //this observable will push values whenever the query parameter changes in the URL 
         //it might be possible that change in any other query parameter can cause the observable to push a new value
         // this.videoOrder = params.sort === '2' ? params.sort : '1' //so we are delibarately check the value
         const sort = params.get('sort');      // ← use get()
         this.videoOrder = sort === '2' ? sort! : '1'; // '!' is a non-null assertion operator in TypeScript, guaranteed that sort is not null or undefined here
         this.sort$.next(this.videoOrder);
      })
      
      this.clipsService.getUserClips(this.sort$).subscribe((data) =>{
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

   update(event: IClip){
      this.clips.forEach((element, index) =>{
         if(element.docID === event.docID){
            element.title = event.title;
         }
      })
   }

   deleteClip(e: Event, inputClip: IClip){
      e.preventDefault();
      this.clipsService.deleteClip(inputClip)
      this.clips = this.clips.filter((clip) =>{
         return clip.docID != inputClip.docID
      })
   }
   async copyToClipboard(e: MouseEvent, id: string | undefined){
      e.preventDefault();
      if (!id) return; // Ensure id is defined
      
      const url = `${location.origin}/clip/${id}`;
      await navigator.clipboard.writeText(url).then(() =>{
         alert('Link copied to clipboard');
      }).catch((err) =>{
         console.error('Failed to copy: ', err);
      })
   }

}
