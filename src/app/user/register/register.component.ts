import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidators } from '../validators/register-validators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   alertMssg = 'Your Request is being processed, we will be registering you soon..';
   alertColor = 'blue';
   showAlert = false;
   isRequestProcessing = false; //if the network is slow, then this will not let the user to submit the form multiple times

   constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
   }

   name = new FormControl('', [Validators.required, Validators.minLength(3)]);
   email = new FormControl('', [Validators.required, Validators.email]);
   age = new FormControl('', [Validators.required]);
   password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),]);
   confirmPassword = new FormControl('', [Validators.required]);
   phoneNumber = new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]);

   
   registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
   },
   [RegisterValidators.match('password', 'confirmPassword')]);

   async onSubmit() {
      this.isRequestProcessing = true;
      this.showAlert = true;
      const {email, password} = this.registerForm.value;
      await this.auth.createUserWithEmailAndPassword(email as string, password as string)
         .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            this.alertMssg = 'User registered successfully';
            this.alertColor = 'green';
            this.showAlert = true;
            console.log('userCred',user);
            this.firestore.collection('users').add({
               name: this.name.value,
               email: this.email.value,
               age: this.age.value,
               phoneNumber: this.phoneNumber.value,
            })
         }
         ).catch((error) => {
            this.isRequestProcessing = false;
            const errorCode = error.code;
            const errorMessage = error.message;
            this.alertMssg = errorMessage;
            this.alertColor = 'red';
            this.showAlert = true;
            console.log(errorCode);
            console.log(errorMessage);
         }
         );
   }
}
