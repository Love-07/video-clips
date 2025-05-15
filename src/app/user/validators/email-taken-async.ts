import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
   providedIn : "root"
})

export class EmailTakenAsync implements AsyncValidator {
   //classes cannot be injected with a services, (dependency injection won't work) we need to manyally inform angular that we need dependency injection
   //we can add dependency injection support by decorating the class with the injective decorator 
   constructor(private afs: AngularFirestore){

   }
   validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value?.trim().toLowerCase();
    if (!email) {
      return new Observable<null>(observer => {
        observer.next(null);
        observer.complete();
      });
    }

    return this.afs
      .collection('users', ref => ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        take(1),
        map(users => {
          return users.length > 0 ? { emailTaken: true } : null;
        })
      );
  };
}
