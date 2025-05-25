import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { AuthService } from './auth.service';
import { of, switchMap, BehaviorSubject, combineLatest } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class ClipsService {
   public clipsCollection : AngularFirestoreCollection<IClip>

  constructor(private db: AngularFirestore, private authService: AuthService, private storage: AngularFireStorage) {
      this.clipsCollection = db.collection('clips')
   }

   createClips(clip :IClip){
      return this.clipsCollection.add(clip);
   }

   getUserClips(sort$: BehaviorSubject<string>){
      return combineLatest([this.authService.getUser$, sort$]).pipe(
         switchMap((values) => {
            const [user, sort] = values;
            if (!user) {
               return of([]);
            } else {
               return this.clipsCollection.ref.where('uid', '==', user.uid).orderBy('timestamp', sort === '1'? 'desc': 'asc').get().then(snapshot => 
                  snapshot.docs.map(doc => ({docID: doc.id, ...doc.data() as IClip})),
               );
            }
         })
      );
   }
   //combine latest helps to subscribe both observable simultaneously

   updateClips(id: string, title: string){
      this.clipsCollection.doc(id).update({
         title
      })
   }

   async deleteClip(clip: IClip){
      const clipRef = this.storage.ref(`clips/${clip.fileName}`);
      const screenshotRef = this.storage.ref(`screenshot/${clip.screenshotFilename}`);

      await clipRef.delete();
      await screenshotRef.delete();

      await this.clipsCollection.doc(clip.docID).delete();
   }
}
