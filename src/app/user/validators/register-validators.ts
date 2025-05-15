import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//we are using class here to group multiple validators together
//defining all under a single namespace for clearity
export class RegisterValidators {
   //we can call this method without creating an instance of the class
   //if we don't want to maintain the state of the object, converting the method to static is a good idea
   //these static methods can be used to create utility functions that are related to the class but don't require an instance of the class to be used
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) {
        console.error('Form controls can not be found in the form group!');
        return { controlNotFound: false };
      }

      const error =
        control.value === matchingControl.value ? null : { noMatch: true };

      matchingControl.setErrors(error);

      return error;
    };
  }
}

//Limitations of Static Methods:
// 1. Static methods dont have access to properties of the class.
