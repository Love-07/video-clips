import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy {

   constructor(public modal: ModalService) { }
   
   ngOnInit(): void {
      this.registerModal(); //as soon as the component is initialized we will register the modal
   }

   //as this is the parent component for the modal so we will notifiy our model service for regestring the new model in the modal array 
   registerModal() {
      this.modal.registerModal('auth-modal');
   }

   ngOnDestroy(): void {
      this.modal.unRegisterModal('auth-modal'); //when the component is destroyed we will unregister the modal
   }

}
