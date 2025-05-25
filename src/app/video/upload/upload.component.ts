import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last, map, Observable, switchMap, timestamp } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app'
import { ClipsService } from 'src/app/services/clips.service';
import { Router } from '@angular/router';
import { FfmpegService } from 'src/app/services/ffmpeg.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {
   isDragging = false;
   isFileUploaded = false;
   file : File | null = null;
   showAlert = false;
   alertColor = 'blue'
   alertMessage= "Please wait!! Your Clip is being uploaded."
   isRequestProcessing = false;
   percentage = 0;
   showPercentage = false;
   user: firebase.User | null = null;
   uploadTask?: AngularFireUploadTask;
   screenshots: string[] = [];
   
   

   title = new FormControl('', {validators: [Validators.required, Validators.minLength(3)], nonNullable:true});

   uploadForm = new FormGroup({
      title: this.title
   })

   constructor(private storage: AngularFireStorage, private auth: AuthService, private clipsService: ClipsService, private router: Router, public ffmpegService: FfmpegService){
      //as soon as the component is initialized i want to get the user detail handy with me 
      this.auth.getUser$.subscribe((user)=>{
         this.user = user
      })

      this.ffmpegService.init();
   }
   
   

   ngOnInit(): void {
   }

   async storeFile(e:Event){ 
      this.isDragging = false;
      this.file = (e as DragEvent).dataTransfer ? (e as DragEvent).dataTransfer?.files.item(0) ?? null : (e.target as HTMLInputElement).files?.item(0) ?? null  //this function will handle the grabbing of the file which come over the event 

      if(!this.file || this.file.type != 'video/mp4'){
         return;
      }

      this.screenshots = await this.ffmpegService.getScreenshots(this.file);
      
      this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
      console.log(this.file);
      this.isFileUploaded=true;
   }

   uploadFile(){
      this.uploadForm.disable();
      this.showAlert = true;
      this.alertColor = 'blue'
      this.alertMessage = "Please wait!! Your clip is being uploaded."
      this.isRequestProcessing = true;
      this.showPercentage = true;

      let clipName = uuid()
      const filePath = `clips/${clipName}.mp4`
      this.uploadTask = this.storage.upload(filePath,this.file);

      const clipRef = this.storage.ref(filePath);

      this.uploadTask.percentageChanges().pipe(map((progress) => {
         return (progress as number) / 100;
      })).subscribe(percent => {
         this.percentage = percent;
      })

      this.uploadTask.snapshotChanges().pipe(
         last(),
         switchMap(() => clipRef.getDownloadURL())
      ).subscribe({
         next: async (url) =>{
            this.alertColor = 'green',
            this.alertMessage = 'Upload Sucessfull !!'
            this.showPercentage = false;
            const clips ={
               uid: this.user?.uid as string,
               displayName: this.user?.displayName as string,
               title: this.title.value,
               fileName: `${clipName}.mp4`,
               url,
               timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
            const clipDocRef = await this.clipsService.createClips(clips)
            console.log('clipsss',clips);
            setTimeout(() => {
               this.router.navigate(['clip',clipDocRef.id]);
            }, 1000);
            
         },
         error: (err) =>{
            this.uploadForm.enable()
            this.alertColor = 'red',
            this.alertMessage = 'Upload Failed!, Please try again later.'
            this.isRequestProcessing = false
            this.showPercentage = false
            console.log('Error:',err)
         }
      });
   }

   ngOnDestroy(): void {
      this.uploadTask?.cancel();
   }

}
