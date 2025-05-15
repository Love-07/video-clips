import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { delay, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private userCollection: AngularFirestoreCollection<IUser>;
   public isAuthenticated$ : Observable<boolean>;
   public isAuthenticatedWithDelay$ : Observable<boolean>;

   constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
      this.userCollection = this.firestore.collection('users');
      this.isAuthenticated$ = auth.user.pipe(
         map((user) => !!user)
      )
      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
         delay(2000) // delay the authentication check by 2 second
      )
      
   }

  public async createUser(userData: any) {
   const {email,password,name,age,phoneNumber} = userData;
   await this.auth.createUserWithEmailAndPassword(email, password)
         .then((userCredential) => {
            this.userCollection.doc(userCredential.user?.uid).set({
               name: name,
               email: email,
               age: age,
               phoneNumber: phoneNumber,
            })
            userCredential.user?.updateProfile({
               displayName: name,
            })
            console.log('userCredential!!!',userCredential)
         }
         ).catch((error) => {
            throw error;
         });
  }

  public async logout(e?:Event){
      if(e){
         e.preventDefault();
      } 
      await this.auth.signOut();
      await this.router.navigateByUrl('/');
   }
}
// Rather than teaching the component how to use the angularfire library services, we will create a centralized logic and inject into components for creating a user 
//we are adding a abstraction between the component and library services 
