import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import IClip from '../../models/clip.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipsService } from '../../services/clips.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
   @Input() activeClip :IClip | null = null;
   @Output() editFormDataEvent = new EventEmitter()
   showAlert: boolean = false;
   alertMessage: string = 'Please wait!, Updating clips.';
   alertColor: string = 'blue';
   isRequestProcessing: boolean = false;
   
   clipID = new FormControl('', {nonNullable: true})
   title = new FormControl('',{validators: [Validators.required, Validators.minLength(3)], nonNullable: true})

   editFormGroup = new FormGroup({
      title: this.title,
      id: this.clipID
   })
   constructor(private modalService: ModalService, private clipsService: ClipsService){

   }

   ngOnInit(): void {
      this.modalService.registerModal('edit-modal');
   } 

   //this is basically when i tries to click on another clips 
   ngOnChanges(changes: SimpleChanges): void {
      if(!this.activeClip){
         return;
      }
      this.isRequestProcessing = false;
      this.showAlert = false;
      this.title.setValue(this.activeClip.title)
      this.clipID.setValue(this.activeClip.docID ?? '');
   }

   async onSubmit(){
      if(!this.activeClip){
         return;
      }
      this.showAlert= true;
      this.isRequestProcessing= true;
      this.alertColor = 'blue';

      try{
         await this.clipsService.updateClips(this.clipID.value, this.title.value)
      }
      catch(err){
         this.isRequestProcessing = false;
         this.alertColor = 'red';
         this.alertMessage = 'Something went wrong. Try again Later';
         return
      }

      this.alertColor = 'green';
      this.alertMessage = 'Success!!';
      this.activeClip.title = this.title.value;
      this.isRequestProcessing = false;//i am now up for another request
      setTimeout(() => {
         this.showAlert = false;
      }, 1500);
      
      this.editFormGroup.reset();
   }

   ngOnDestroy(): void {
      this.modalService.unRegisterModal('edit-modal');
   }

}
