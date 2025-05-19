import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipsService {
   public clipsCollection : AngularFirestoreCollection<IClip>

  constructor(private store: AngularFirestore) {
      this.clipsCollection = store.collection('clips')
   }

   async createClips(clip :IClip){
      await this.clipsCollection.add(clip);
   }
}
