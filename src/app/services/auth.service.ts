import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { delay, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private userCollection: AngularFirestoreCollection<IUser>;
   public isAuthenticated$ : Observable<boolean>;
   public isAuthenticatedWithDelay$ : Observable<boolean>;
   public getUser$ : Observable<any>;
   redirect = false;

   constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router, private route: ActivatedRoute) {
      this.userCollection = this.firestore.collection('users');
      this.isAuthenticated$ = auth.user.pipe(
         map((user) => !!user)
      )
      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
         delay(2000) // delay the authentication check by 2 second
      )

      this.getUser$ = auth.user;

      this.router.events.pipe(
         filter(e => e instanceof NavigationEnd),
         map(() => this.route.firstChild),
         switchMap((route) => route?.data as Observable<{ authOnly?: boolean }> ?? of({}))
      ).subscribe((data: { authOnly?: boolean }) => {
         this.redirect = data?.authOnly ?? false;
      });//by filter we will be listening to specific events from the router
         //switch map is used to subscribe the inner observable
      
   }

  public async createUser(userData: IUser) {
   const {email, password, name, age, phoneNumber} = userData;
   if (!email || !password) {
      throw new Error('Email and password are required to create a user.');
   }
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
      if(this.redirect){
         await this.router.navigateByUrl('/'); // if suppose i am logging out from a route which doesn't need authentication then in that case i will not redirect to the home page
      }
   }
}
// Rather than teaching the component how to use the angularfire library services, we will create a centralized logic and inject into components for creating a user 
//we are adding a abstraction between the component and library services 
