import { Injectable } from '@angular/core';

interface IModal {
   id: string;
   visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
//the root tells us that the service will be injected from the root and any of the components can use it
//there are other two ways also two inject service, one is to the module and the other is to the component
//for the module we have to add the service to the providers array in the module
//for the component we have to add the service to the providers array in the component (now only this component can use the service)
//but the root is the most common way to inject a service

export class ModalService {

   constructor() { }

   private visible = false;

   private modals: IModal[] = [];

   //register the modal
   registerModal(modalId: string) {
       this.modals.push({
          id: modalId,
          visible: false
       });
       console.log(this.modals);
   }

   unRegisterModal(modalId: string) { 
      this.modals = this.modals.filter(element => element.id !== modalId);// i am letting the element to be in the array if the id is not equal to the modalId
   }

   isModalVisible(id: string) : boolean {
     return !!this.modals.find(element => element.id === id)?.visible;
   }

   toggleModal(id: string) {
      const modal = this.modals.find(element => element.id === id);
      if(modal){
         modal.visible = !modal.visible;
      }
   }
}

//this service is used to open and close the modal
//anything that is related to the data of the modal should be handled by this service

//external components can interact with our service using the methods we created 
