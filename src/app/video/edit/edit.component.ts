import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import IClip from '../../models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
   @Input() activeClip :IClip | null = null;
   clipID = new FormControl('', {nonNullable: true})
   title = new FormControl('',{validators: [Validators.required, Validators.minLength(3)], nonNullable: true})

   editFormGroup = new FormGroup({
      title: this.title,
      id: this.clipID
   })
   constructor(private modalService: ModalService){

   }
   ngOnChanges(changes: SimpleChanges): void {
      if(!this.activeClip){
         return;
      }
      this.title.setValue(this.activeClip.title)
      this.clipID.setValue(this.activeClip.docID ?? '');
   }

   ngOnInit(): void {
      this.modalService.registerModal('edit-modal');
   } 

   ngOnDestroy(): void {
      this.modalService.unRegisterModal('edit-modal');
   }

}
