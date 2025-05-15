import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firbase from 'firebase/compat/app';
import 'firebase/compat/auth';



// if(environment.production) {
//    enableProdMode();
//  }

 firbase.initializeApp(environment.firebase);

 let appInit= false;

 firbase.auth().onAuthStateChanged(() =>{
   if(!appInit){
      platformBrowserDynamic().bootstrapModule(AppModule)
         .catch(err => console.error(err));
   }
   appInit = true;
 })



