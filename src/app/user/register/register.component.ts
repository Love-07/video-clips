import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidators } from '../validators/register-validators';
import { AuthService } from '../../services/auth.service';
import IUser from '../../models/user.model';
import { EmailTakenAsync } from '../validators/email-taken-async';


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

   constructor(private authService: AuthService, private emailTakenService: EmailTakenAsync) {
   }

   name = new FormControl('', [Validators.required, Validators.minLength(3)]);
   email = new FormControl('', [Validators.required, Validators.email], [this.emailTakenService.validate]);
   age = new FormControl<number | null>(null, [Validators.required]); // the type of the form control can be configure using generic type
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
      //whenerver user clicks on the submit button, we will show the alert message and if the request is taking time, we will show the alert message and user click on the submit button again, then this blue message will be shown
      this.showAlert = true;
      this.alertMssg = 'Your Request is being processed, we will be registering you soon..';
      this.alertColor = 'blue';
      this.isRequestProcessing = true;
      this.showAlert = true;
      const userData = this.registerForm.value;

      try{
         await this.authService.createUser(userData as IUser);
      }
      catch (error) {
         this.isRequestProcessing = false;
         const errorCode = (error as any).code;
         const errorMessage = (error as any).message;
         this.alertMssg = errorMessage;
         this.alertColor = 'red';
         console.log(errorCode);
         console.log(errorMessage);
         return;
      }
      this.alertMssg = 'User registered successfully';
      this.alertColor = 'green';
   }
}
