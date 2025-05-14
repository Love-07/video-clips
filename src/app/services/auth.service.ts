import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  public async createUser(userData: any) {
   const {email,password,name,age,phoneNumber} = userData;
   await this.auth.createUserWithEmailAndPassword(email, password)
         .then((userCredential) => {
            this.firestore.collection('users').add({
               name: name,
               email: email,
               age: age,
               phoneNumber: phoneNumber,
            })
         }
         ).catch((error) => {
            throw error;
         });
  }
}
// Rather than teaching the component how to use the angularfire library services, we will create a centralized logic and inject into components for creating a user 
//we are adding a abstraction between the component and library services 
