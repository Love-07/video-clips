import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   constructor() {

   }

   email = new FormControl('', [Validators.required, Validators.email]);
   password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),]);

   loginForm = new FormGroup({
      email: this.email,
      password: this.password,
   });

   onSubmit() {
      // Handle form submission
      console.log(this.loginForm.value);
      this.loginForm.reset();
   }

}
