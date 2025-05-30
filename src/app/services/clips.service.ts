import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { AuthService } from './auth.service';
import { of, switchMap, BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ClipsService implements Resolve<IClip | null> {
   public clipsCollection : AngularFirestoreCollection<IClip>
   pageClips : IClip[] = []; 
   pendingReq = false;

  constructor(private db: AngularFirestore, private authService: AuthService, private storage: AngularFireStorage,private router: Router) {
      this.clipsCollection = db.collection('clips')
   }
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IClip | Observable<IClip | null> | Promise<IClip | null> | null {
      const id = route.paramMap.get('id');
      if (id) {
         return this.clipsCollection.doc(id).get().toPromise().then(doc => {
            if (doc && doc.exists) {
               return doc.data() as IClip;
            }
            this.router.navigate(['/']);
               return null;      
         });
      }
      return null;
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

   async getClips(){
      if(this.pendingReq){
         return;
      }
      this.pendingReq = true;
      let query = this.clipsCollection.ref.orderBy('timestamp', 'desc').limit(6)

      const {length} = this.pageClips

      if(length){
         const lastDocID = this.pageClips[length - 1].docID
         const lastDoc = await this.clipsCollection.doc(lastDocID).get().toPromise();

         query = query.startAfter(lastDoc);
      }
      const snapshot = await query.get();

      snapshot.forEach((doc) =>{
         this.pageClips.push({
            docID: doc.id,
            ...doc.data()
         })
      })
      this.pendingReq = false;
   }
}
