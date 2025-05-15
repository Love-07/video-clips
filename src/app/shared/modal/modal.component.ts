import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
   @Input() modalId: string = ''; //this will be passed from the parent component

   constructor(public modal: ModalService, public elementRef: ElementRef) { }

   ngOnInit(): void {
      document.body.appendChild(this.elementRef.nativeElement); //this will append the modal to the body of the document
      //wherever the browser is rendering the modal it will be now shifted to the body of the document
   }

   ngOnDestroy(): void {
      document.body.removeChild(this.elementRef.nativeElement); //this will remove the modal from the body of the document
   }

   closeModal(id: string) {
      this.modal.toggleModal(id); //we can't hardcode the value of auth-modal, it should gets is value from the parent component
   }

}
