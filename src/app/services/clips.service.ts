import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { AuthService } from './auth.service';
import { of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClipsService {
   public clipsCollection : AngularFirestoreCollection<IClip>

  constructor(private store: AngularFirestore, private authService: AuthService) {
      this.clipsCollection = store.collection('clips')
   }

   createClips(clip :IClip){
      return this.clipsCollection.add(clip);
   }

   getUserClips(){
      return this.authService.getUser$.pipe(
         switchMap((user) => {
            if (!user) {
               return of([]);
            } else {
               return this.clipsCollection.ref.where('uid', '==', user.uid).get().then(snapshot => 
                  snapshot.docs.map(doc => ({docID: doc.id, ...doc.data() as IClip})),
               );
            }
         })
      );
   }
}
