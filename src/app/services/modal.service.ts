import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//the root tells us that the service will be injected from the root and any of the components can use it
//there are other two ways also two inject service, one is to the module and the other is to the component
//for the module we have to add the service to the providers array in the module
//for the component we have to add the service to the providers array in the component (now only this component can use the service)
//but the root is the most common way to inject a service
export class ModalService {
   private visible = false;

   isModalVisible() {
     return this.visible;
   }

   toggleModal() {
     this.visible = !this.visible;
   }

  constructor() { }
}

//this service is used to open and close the modal
//anything that is related to the data of the modal should be handled by this service

//external components can interact with our service using the methods we created 
