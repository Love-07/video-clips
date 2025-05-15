import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

   constructor(public modal: ModalService, public auth: AuthService, public afAuth: AngularFireAuth) {
    }

   ngOnInit(): void {
   }

   openModal($event: Event) {
      $event.preventDefault();//prevent the default action of the browser as we are using a anchor tag which can redirect to other page so thats why we are preventing the default action
      this.modal.toggleModal("auth-modal");//now if for some other link in the future we want to open the modal we can just call this method and pass the id of the modal as of now it is hardcoded but if some other link is there we can just pass the id of that element 
   }

   
}
