import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   alertMssg = 'Your Request is being processed, we will be LoginIn you soon..';
   alertColor = 'blue';
   showAlert = false;
   isRequestProcessing = false; //when the user send the request, we will disable the form with the help of this variable
   constructor(private auth: AngularFireAuth) {

   }

   email = new FormControl('', [Validators.required, Validators.email]);
   password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),]);

   loginForm = new FormGroup({
      email: this.email,
      password: this.password,
   });

   async onSubmit() {
      // Handle form submission
      this.showAlert = true;
      this.alertMssg = 'Your Request is being processed, we will be LoginIn you soon..';
      this.alertColor = 'blue';
      this.isRequestProcessing = true;
      console.log(this.loginForm.value);
      console.log(typeof this.loginForm.value.email); 
      const email = this.loginForm.value.email ?? '';
      const password = this.loginForm.value.password ?? '';
      await this.auth.signInWithEmailAndPassword(email, password)
         .then((userCredential) => {
            console.log('userCredential', userCredential);
            this.alertMssg = 'Login Successful';
            this.alertColor = 'green';
            this.loginForm.reset();//reset only after sucessful login
            
         }).catch((error) => {
            console.log('error', error);
            this.isRequestProcessing = false;
            this.alertMssg = error.message;
            this.alertColor = 'red';
            return;
         })
      
   }

}
