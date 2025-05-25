import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeURL'
})
export class SafeURLPipe implements PipeTransform {
   constructor(private sanitizer : DomSanitizer){

   }

  transform(value: string){
    // I will not be using this as my screeshot are already being displayed without adding this code, so no need to add this bypass kind of this which can be danger in terms of security reasons
    //return this.sanitizer.bypassSecurityTrustUrl(value);
  }

}
