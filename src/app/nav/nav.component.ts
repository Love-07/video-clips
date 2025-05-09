import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

   constructor(public modal: ModalService) { }

   ngOnInit(): void {
   }

   openModal($event: Event) {
      $event.preventDefault();//prevent the default action of the browser as we are using a anchor tag which can redirect to other page so thats why we are preventing the default action
      this.modal.toggleModal();
   }

}
