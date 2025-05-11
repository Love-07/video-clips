import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   constructor() {
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

   onSubmit() {
      console.log(this.registerForm);
   }
}
