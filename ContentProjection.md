# "The main container (modal) feels like the 'parent', so why is it technically the child?"

   The component that uses another component is the parent.
   now in my code modal component is child and parent is the auth component 
   my auth component uses this another component called modal component and inside it passes some HTML which will be recieved by modal via ng-content 

# Imagine ModalComponent is like a blank picture frame, and LoginComponent gives it the picture to display.

   Even though the frame surrounds the picture, it still depends on the parent to give it something meaningful to display.


#    *Multicontent Projection* 
   now we can multiple content in the single HTLM file, and for that we need to pass and Id for reference 


I am here taking the usecase for @contentchild decorator 
The @ContentChild() decorator allows a child component (i.e., the one using <ng-content>) to get a reference to the projected content from the parent component.

   # when to use this content child decorator
      access

      manipulate, or

      interact with a DOM element or component projected inside it.

   **let see this with an example**:
   Let’s say you have a modal (ModalComponent) and you want to detect if the header content exists — so you can conditionally render a close button.

   **Modal.component.html**
   <div class="modal">
      <header class="modal-header">
         <ng-content select="[modal-header]"></ng-content>
         <button *ngIf="hasHeader" (click)="close()">X</button>
      </header>
   <section class="modal-body">
      <ng-content select="[modal-body]"></ng-content>
   </section>
   </div>


   **Modal.component.ts**
   
   <import { AfterContentInit, Component, ContentChild, ElementRef } from '@angular/core';>

   @Component({
   selector: 'app-modal',
   templateUrl: './modal.component.html'
   })

   export class ModalComponent implements AfterContentInit {
   @ContentChild('headerRef') headerContent: ElementRef | undefined;
   hasHeader = false;

   ngAfterContentInit() {
      this.hasHeader = !!this.headerContent;
   }

   close() {
    // logic to close modal
   }
}


   **parent.component.html (Parent)**

   <app-modal>
      <div #headerRef modal-header>
         <h2>Login</h2>
      </div>

   <div modal-body>
      <p>Form goes here...</p>
   </div>
   
   </app-modal>


# Explanation

   <app-modal>…</app-modal> is the parent’s host element in the DOM.

   * Everything inside (<div modal-header>…</div>, <div modal-body>…</div>) is considered projected content.
   * After you’ve slotted in any projected content, look for an element inside me that carries the template variable #headerRef, and give me an ElementRef to it.”

      ->this.headerContent is an ElementRef if the parent provided an element with #headerRef; otherwise it’s undefined.

      ->!!this.headerContent converts that to true/false and stores it in hasHeader.




